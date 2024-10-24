import { SafeAreaView, StyleSheet, View, ScrollView } from 'react-native';
import TaskCard from '../../components/TaskCard';
import Header from '../../components/Header';
import BotaoGerenciamento from '../../components/BotaoGerenciamento';
import { useEffect, useState } from 'react';
import GerenciamentoChamadoModal from '../../components/GerenciamentoChamadoModal';
import GerenciamentoUsuarioModal from '../../components/GerenciamentoUsuarioModal';
import RelatorioDeTarefaModal from '../../components/RelatorioDeTarefaModal';
import { falseList } from '../../../assets/falseDb';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../../store/userStore';
import useTask from '../../hooks/useTask';

const Home = props => {
  const navigation = useNavigation();
  const [modalCriaTarefaVisible, setModalCriaTarefaVisible] = useState(false);
  const [
    modalGerenciamentoUsuarioVisible,
    setModalGerenciamentoUsuarioVisible,
  ] = useState(false);
  const [modalRelatorio, setModalRelatorio] = useState(false);
  const [textoTituloModal, setTextoTituloModal] = useState('');
  const [tasks, setTasks] = useState(null);

  const { userAuth } = useUserStore();

  const { fetchTasks } = useTask();

  const getTasks = async () => {
    const tasksFirestore = await fetchTasks(userAuth.uid);
    console.log('tasks from firestore: ', tasksFirestore);
    setTasks(tasksFirestore);
  };

  useEffect(() => {
    getTasks();
  }, [
    modalCriaTarefaVisible,
    modalRelatorio,
    modalGerenciamentoUsuarioVisible,
  ]);

  console.log('USER FROM ZUSTAND: ', userAuth);

  return (
    <SafeAreaView style={styles.container}>
      <Header removePaddingTop={true} />
      <ScrollView>
        <BotaoGerenciamento
          texto='Criar novas tarefas'
          abrir={() => {
            setModalCriaTarefaVisible(true);
            setTextoTituloModal('Criar nova tarefa');
          }}
        />
        <BotaoGerenciamento
          texto='Atribuir tarefas a usuário'
          abrir={() => {
            navigation.navigate('Tasks');
            // setModalCriaTarefaVisible(true);
            setTextoTituloModal('Atribuir tarefa');
          }}
        />
        <BotaoGerenciamento
          texto='Gerenciar tarefas em andamento'
          abrir={() => {
            navigation.navigate('Tasks');
            // setModalCriaTarefaVisible(true);
            setTextoTituloModal('Gerenciar tarefa');
          }}
        />
        <BotaoGerenciamento
          texto='Gerenciar Usuario'
          abrir={() => {
            navigation.navigate('Users');
            // setModalGerenciamentoUsuarioVisible(true);
            setTextoTituloModal('Gerenciar Usuario');
          }}
        />
        <BotaoGerenciamento
          texto='Criar e visualizar relatórios'
          abrir={() => {
            setModalRelatorio(true);
            setTextoTituloModal('Relatório de Tarefas');
          }}
        />
        {tasks?.length > 0 && (
          <View>
            {tasks.map((item, key) => {
              if (key < 5) {
                return <TaskCard task={item} />;
              }
            })}
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

      <RelatorioDeTarefaModal
        visivel={modalRelatorio}
        titulo={textoTituloModal}
        setVisivel={setModalRelatorio}
        setTexto={setTextoTituloModal}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F8FA',
    marginTop: 25,
  },
});
