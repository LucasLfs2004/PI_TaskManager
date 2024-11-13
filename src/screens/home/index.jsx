import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
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
import RelatorioDeTarefaModal from '../../components/RelatorioDeTarefaModal';
import TaskCard from '../../components/TaskCard';
import { scale } from '../../functions/scale';
import useTask from '../../hooks/useTask';
import { useUserStore } from '../../store/userStore';
import { useTaskStore } from '../../store/useTask';

const Home = props => {
  const navigation = useNavigation();
  useTask();
  const [modalCriaTarefaVisible, setModalCriaTarefaVisible] = useState(false);
  const [
    modalGerenciamentoUsuarioVisible,
    setModalGerenciamentoUsuarioVisible,
  ] = useState(false);
  const [modalRelatorio, setModalRelatorio] = useState(false);
  const [textoTituloModal, setTextoTituloModal] = useState('');

  const { userData } = useUserStore();

  const { tasksGeral: tasks } = useTaskStore();

  useEffect(() => {
    console.log('Atualização de tasks na home: ', tasks);
  }, [tasks]);

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
            <BotaoGerenciamento
              texto='Criar e visualizar relatórios'
              abrir={() => {
                setModalRelatorio(true);
                setTextoTituloModal('Relatório de Tarefas');
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
