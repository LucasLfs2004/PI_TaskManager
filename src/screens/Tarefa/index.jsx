import { useNavigation } from '@react-navigation/native';
import {
  arrayUnion,
  collection,
  deleteDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BotaoSubmit from '../../components/BotaoSubmit';
import CommentCard from '../../components/CommentCard';
import Header from '../../components/Header';
import ModalCommentTask from '../../components/ModalCommentTask';
import StatusIcon from '../../components/StatusIcon';
import { db } from '../../config/firebase';
import { generateRandomId } from '../../functions/generateId';
import { scale } from '../../functions/scale';
import useTask from '../../hooks/useTask';
import { useUserStore } from '../../store/userStore';

const TarefaScreen = ({ route }) => {
  const { task: taskRoute } = route.params;
  const [task, setTask] = useState(taskRoute);
  const [modalCommentVisible, setModalCommentVisible] = useState(false);
  const navigation = useNavigation();
  const { userData, userAuth } = useUserStore();
  const { concludeTask, openTask } = useTask();

  const getTask = async () => {
    const tarefaCollection = collection(db, 'tarefa');
    const q = query(tarefaCollection, where('chamado.id', '==', taskRoute.id));

    try {
      // Executa a consulta
      const querySnapshot = await getDocs(q);

      // Verifica se encontrou documentos correspondentes
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async element => {
          const task = element.data();
          setTask(task.chamado);
        });
      } else {
        console.log('Nenhum documento encontrado com o id especificado.');
      }
    } catch (error) {
      console.error('Erro ao atualizar o campo "chamado.concluido":', error);
    }
  };

  useEffect(() => {
    if (!modalCommentVisible) {
      getTask();
    }
  }, [modalCommentVisible, deleteComment]);

  const addComment = async comentario => {
    const tarefaCollection = collection(db, 'tarefa');

    // Cria uma consulta para encontrar o documento onde "chamado.id" é igual ao valor fornecido
    const q = query(tarefaCollection, where('chamado.id', '==', task.id));
    const comentarioData = {
      id: generateRandomId(), // ID único do comentário
      autor: userData?.nome,
      autorUID: userAuth?.uid,
      texto: comentario,
      dataComentario: moment().format('DD/MM/YYYY hh:mm'),
    };
    console.log('objeto com dados para comentario: ', comentarioData);
    try {
      // Executa a consulta
      const querySnapshot = await getDocs(q);

      // Verifica se encontrou documentos correspondentes
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async docSnapshot => {
          // Atualiza o campo "chamado.concluido" no documento encontrado
          await updateDoc(docSnapshot.ref, {
            'chamado.comentarios': arrayUnion({
              id: generateRandomId(), // ID único do comentário
              autor: userData?.nome,
              autorUID: userAuth?.uid,
              texto: comentario,
              dataComentario: moment().format('DD/MM/YYYY HH:mm'),
            }),
          });
        });
      } else {
        console.log('Nenhum documento encontrado com o id especificado.');
      }
      setModalCommentVisible(false);
    } catch (error) {
      console.error('Erro ao atualizar o campo "chamado.concluido":', error);
    }
  };

  async function deleteComment(comentarioId) {
    const tarefaCollection = collection(db, 'tarefa');

    const q = query(tarefaCollection, where('chamado.id', '==', task.id));
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async docSnapshot => {
          const comentario = docSnapshot.data().chamado;
          console.log('Comentario dentro do for each: ', comentario);

          const updatedComentarios = comentario.comentarios.filter(
            comentario => comentario.id !== comentarioId,
          );
          await updateDoc(docSnapshot.ref, {
            'chamado.comentarios': updatedComentarios,
          });
        });
      } else {
        console.log('Nenhum documento encontrado com o id especificado.');
      }
    } catch (error) {
      console.error('Erro ao atualizar o campo "chamado.concluido":', error);
    }
  }

  async function deleteTask(taskId) {
    const tarefaCollection = collection(db, 'tarefa');

    const q = query(tarefaCollection, where('chamado.id', '==', task.id));
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async docSnapshot => {
          await deleteDoc(docSnapshot.ref);
        });
        navigation.goBack();
      } else {
        console.log('Nenhum documento encontrado com o id especificado.');
      }
    } catch (error) {
      console.error('Erro ao excluir tarefa', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header backButton={true} />
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.titleScreen}>{task?.titulo}</Text>
          <View
            style={{
              backgroundColor: '#fff',
              padding: scale(10),
              borderRadius: scale(8),
            }}
          >
            <Text style={styles.desc}>{task?.descricao}</Text>
            <Text style={[styles.desc, { marginTop: scale(12) }]}>
              Responsável: {task?.responsavel}
            </Text>
            <Text style={styles.desc}>Criado por: {task?.requerente}</Text>
            <View style={styles.statusView}>
              <Text
                style={[
                  styles.text,
                  { textAlign: 'right', marginTop: scale(12) },
                ]}
              >
                Tipo: {task?.tipo}
              </Text>
              <StatusIcon task={task} />
            </View>
          </View>
          <View style={{ flexDirection: 'row', columnGap: scale(64) }}>
            <View>
              <Text style={styles.desc}>Criado em</Text>
              <View style={styles.prazoView}>
                <Image
                  style={{ width: scale(24), height: scale(24) }}
                  source={require('../../../assets/calendar.png')}
                />
                <Text style={styles.date}>{task?.aberturaData}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.desc}>Prazo</Text>
              <View style={styles.prazoView}>
                <Image
                  style={{ width: scale(24), height: scale(24) }}
                  source={require('../../../assets/calendar.png')}
                />
                <Text style={styles.date}>{task?.prazoData}</Text>
              </View>
            </View>
          </View>
          <View style={styles.comentsView}>
            {task?.comentarios?.length > 0 &&
              task.comentarios.map(item => (
                <CommentCard
                  key={item.id}
                  comment={item}
                  isAdmin={userData?.isAdmin ? userData.isAdmin : false}
                  onDelete={id => deleteComment(id)}
                />
              ))}
          </View>
          <View style={{ marginTop: scale(48) }}>
            {!task?.concluido && (
              <BotaoSubmit
                text={'Concluir tarefa'}
                action={() => concludeTask(task.id)}
              />
            )}
            {task?.concluido && (
              <BotaoSubmit
                text={'Reabrir tarefa'}
                action={() => openTask(task.id)}
              />
            )}
            <TouchableOpacity
              onPress={() => setModalCommentVisible(true)}
              style={[styles.btn, { backgroundColor: '#115D8Cdd' }]}
            >
              <Text style={styles.textBtn}>Comentar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[styles.btn, { backgroundColor: '#115D8Cdd' }]}
            >
              <Text style={styles.textBtn}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteTask(task.id)}
              style={[styles.btn, { backgroundColor: '#ff4d4d' }]}
            >
              <Text style={styles.textBtn}>Excluir tarefa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <ModalCommentTask
        visible={modalCommentVisible}
        close={() => setModalCommentVisible(false)}
        action={value => addComment(value)}
      />
    </SafeAreaView>
  );
};

export default TarefaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FA',
  },
  content: {
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    flexDirection: 'column',
    rowGap: scale(8),
  },
  desc: {
    // backgroundColor: '#fff',
    borderRadius: scale(13),
    // padding: scale(10),
    fontWeight: '600',
  },
  titleScreen: {
    color: '#000',
    fontWeight: '600',
    fontSize: scale(24),
    textAlign: 'center',
  },
  text: {
    fontWeight: '500',
    fontSize: scale(16),
  },
  prazoView: {
    flexDirection: 'row',
    columnGap: scale(12),
    marginTop: scale(8),
  },
  date: {
    fontWeight: '500',
    fontSize: scale(16),
  },
  btn: {
    marginTop: scale(12),
    backgroundColor: '#51B853',
    borderRadius: scale(10),
    width: scale(280),
    height: scale(34),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 'auto',
  },
  textBtn: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: '500',
  },
  statusView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(12),
  },
});
