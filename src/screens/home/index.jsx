import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import BotaoGerenciamento from '../../components/BotaoGerenciamento';

const Home = () => {
  return (
      <View>
        <Header/>
        <BotaoGerenciamento texto='Criar novas tarefas'/>
        <BotaoGerenciamento texto='Atribuir tarefas a usuário'/>
        <BotaoGerenciamento texto='Gerenciar tarefas em andament'/>
        <BotaoGerenciamento texto='Genrenciar usuário'/>
        <BotaoGerenciamento texto='Criar e visualizar relatórios'/>
      </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F8FA',
  },
});
