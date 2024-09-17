import {
  Button,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from '../../components/Header';
import BotaoGerenciamento from '../../components/BotaoGerenciamento';
import BotaoChamado from '../../components/BotaoChamado';
import { useState } from 'react';

const Home = () => {
  const [modalCriaTarefaVisible, setModalCriaTarefaVisible] = useState(false);
  const [textoTituloModal, setTextoTituloModal] = useState('');

  return (
    <View>
      <Header />
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
          setModalCriaTarefaVisible(true);
          setTextoTituloModal('Atribuir tarefa');
        }}
      />
      <BotaoGerenciamento
        texto='Gerenciar tarefas em andamento'
        abrir={() => {
          setModalCriaTarefaVisible(true);
          setTextoTituloModal('Gerenciar tarefa');
        }}
      />
      <BotaoChamado />
      <BotaoChamado />
      <Modal visible={modalCriaTarefaVisible}>
        <Header />
        <View style={styles.areaTextoPrincipal}>
          <Text style={styles.textoPrincipal}>{textoTituloModal}</Text>
          <Button
            title='Fechar'
            onPress={() => {
              setModalCriaTarefaVisible(false);
              setTextoTituloModal('');
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F8FA',
  },
  areaTextoPrincipal: {
    backgroundColor: '#8D9CD3',
  },
  textoPrincipal: {
    color: '#3C3A9B',
    fontSize: 25,
  },
});
