import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';

const Home = () => {
  return (
      <View>
        <Header/>
      </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F8FA',
  },
});
