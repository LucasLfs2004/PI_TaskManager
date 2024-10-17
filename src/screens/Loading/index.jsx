import { SafeAreaView, Image, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { scale } from '../../functions/scale';
import useAuth from '../../hooks/useAuth';

const LoadingScreen = () => {
  const { autenticarUsuario } = useAuth();

  const navigation = useNavigation();
  const verifyUser = async () => {
    const loginData = await AsyncStorage.getItem('loginData');
    if (loginData) {
      const loginInfos = JSON.parse(loginData);

      const user = await autenticarUsuario(loginInfos.email, loginInfos.senha);
      console.log('Email do usuario: ', user.email);

      if (user.email) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Login');
      }
    } else {
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Task Manager</Text>
      <Image source={require('../../../assets/banner.png')} />
    </SafeAreaView>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FA',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    paddingTop: scale(160),
    paddingBottom: scale(12),
    color: '#12486A',
    fontSize: scale(28),
    fontWeight: '700',
  },
});
