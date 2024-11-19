import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import { collection, getDocs, or, query, where } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import BotaoGerenciamento from '../../components/BotaoGerenciamento';
import GerenciamentoChamadoModal from '../../components/GerenciamentoChamadoModal';
import GerenciamentoUsuarioModal from '../../components/GerenciamentoUsuarioModal';
import Header from '../../components/Header';
import TaskCard from '../../components/TaskCard';
import { db } from '../../config/firebase';
import { scale } from '../../functions/scale';
import useTask from '../../hooks/useTask';
import { useUserStore } from '../../store/userStore';

const Home = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useTask();
  const [modalCriaTarefaVisible, setModalCriaTarefaVisible] = useState(false);
  const [
    modalGerenciamentoUsuarioVisible,
    setModalGerenciamentoUsuarioVisible,
  ] = useState(false);
  const [textoTituloModal, setTextoTituloModal] = useState('');
  const [tasks, setTasks] = useState();
  const { userData, userAuth } = useUserStore();

  const fetchTasks = async (userUid = userAuth?.uid) => {
    try {
      const tasksCollection = collection(db, 'tarefa');
      const q = query(
        tasksCollection,
        or(
          where('chamado.uidRequerente', '==', userUid),
          where('chamado.uidResponsavel', '==', userUid),
        ),
      );

      const collectionTask = await getDocs(q);
      let fetchedTasks = [];
      collectionTask.forEach(element => {
        const dadosUsuario = element.data();
        fetchedTasks.push(dadosUsuario.chamado);
      });
      setTasks(fetchedTasks);
      return fetchedTasks;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        fetchTasks();
      };
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header removePaddingTop={true} />
      <ScrollView>
        <BotaoGerenciamento
          texto='Visualizar tarefas em andamento'
          abrir={() => {
            navigation.navigate('Tasks');
            // setModalCriaTarefaVisible(true);
            setTextoTituloModal('Gerenciar tarefa');
          }}
        />
        {userData?.isAdmin && (
          <>
            <BotaoGerenciamento
              texto='Criar novas tarefas'
              abrir={() => {
                setModalCriaTarefaVisible(true);
                setTextoTituloModal('Criar nova tarefa');
              }}
            />

            <BotaoGerenciamento
              texto='Gerenciar Usuario'
              abrir={() => {
                navigation.navigate('Users');
                setTextoTituloModal('Gerenciar Usuario');
              }}
            />
          </>
        )}
        {tasks?.length > 0 ? (
          <View style={{ marginBottom: scale(64) }}>
            {tasks.map((item, key) => {
              if (key < 5) {
                return <TaskCard task={item} key={key} />;
              }
            })}
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              height: scale(700),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator color={'#12486A'} />
          </View>
        )}
      </ScrollView>
      <GerenciamentoChamadoModal
        visivel={modalCriaTarefaVisible}
        titulo={textoTituloModal}
        setVisivel={setModalCriaTarefaVisible}
        setTexto={setTextoTituloModal}
      />
      <GerenciamentoUsuarioModal
        visivel={modalGerenciamentoUsuarioVisible}
        titulo={textoTituloModal}
        setVisivel={setModalGerenciamentoUsuarioVisible}
        setTexto={setTextoTituloModal}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F8FA',
    flex: 1,
    marginTop: 25,
  },
});
