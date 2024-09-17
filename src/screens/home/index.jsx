import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import BotaoGerenciamento from '../../components/BotaoGerenciamento';
import BotaoChamado from '../../components/BotaoChamado';

const Home = () => {
  return (
      <View>
        <Header/>
        <BotaoGerenciamento texto='Criar novas tarefas'/>
        <BotaoGerenciamento texto='Atribuir tarefas a usuário'/>
        <BotaoGerenciamento texto='Gerenciar tarefas em andamento'/>
        <BotaoChamado/>
        <BotaoChamado/>
      </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F8FA',
  },
});
