import {
  Button,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
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
        </View>
        <View style={styles.formularioTarefa}>
          <Text>Reclamante</Text>
          <TextInput placeholder='Usuario Reclamante'/>
          <View style={styles.aberturaTipoChamado}>
            <View>
              <Text style={textoInfoChamado}>Data de abertura do chamado</Text>
              <TextInput placeholder='17/09/2024'/>
            </View>
            <View>
              <Text style={textoInfoChamado}>Tipo do chamado</Text>
              <TextInput placeholder='Tarefa'/>
            </View>
          </View>
          <Text style={textoInfoChamado}>Descrição</Text>
          <TextInput placeholder='Descrição'/>
        </View>
        <Button
            title='Concluir nova tarefa'
            onPress={() => {
              setModalCriaTarefaVisible(false);
              setTextoTituloModal('');
            }}
          />
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
  formularioTarefa: {

  },
  aberturaTipoChamado:{

  },
  textoInfoChamado:{
    
  }
});
