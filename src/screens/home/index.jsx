import {
  Button,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  View,
  ScrollView,
} from 'react-native';
import TaskCard from '../../components/TaskCard';
import Header from '../../components/Header';
import BotaoGerenciamento from '../../components/BotaoGerenciamento';
import BotaoChamado from '../../components/BotaoChamado';
import { useState } from 'react';
import GerenciamentoChamadoModal from '../../components/GerenciamentoChamadoModal';
import GerenciamentoUsuarioModal from '../../components/GerenciamentoUsuarioModal';
import RelatorioDeTarefaModal from '../../components/RelatorioDeTarefaModal';
import { falseList } from '../../../assets/falseDb';
import { useNavigation } from '@react-navigation/native';
import AvisoDeErro from '../../components/AvisoDeErro';

const Home = props => {
  const navigation = useNavigation();
  const [modalCriaTarefaVisible, setModalCriaTarefaVisible] = useState(false);
  const [
    modalGerenciamentoUsuarioVisible,
    setModalGerenciamentoUsuarioVisible,
  ] = useState(false);
  const [modalRelatorio, setModalRelatorio] = useState(false);
  const [textoTituloModal, setTextoTituloModal] = useState('');

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
            setModalGerenciamentoUsuarioVisible(true);
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
        <View>
          {falseList.map((item, key) => {
            if (key < 5) {
              return <TaskCard task={item} />;
            }
          })}
        </View>
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
