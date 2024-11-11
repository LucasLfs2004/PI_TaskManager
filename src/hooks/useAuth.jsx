import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useUserStore } from '../store/userStore';
import { db } from '../config/firebase';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuth = () => {
  const navigation = useNavigation();
  const { setUserAuth, setUserData } = useUserStore.getState();
  const autenticarUsuario = async (email, senha) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        senha,
      );
      setUserAuth(userCredential.user);
      getUserInDb(userCredential.user.uid);
      return userCredential.user;
    } catch (error) {
      console.log('Erro na autenticação do usuário: ', error.message);
      throw error;
    }
  };

  const getUserInDb = async uid => {
    const usersCollection = collection(db, 'usuario');
    try {
      let user = null;
      const q = query(usersCollection, where('user.uid', '==', uid));
      const collection = await getDocs(q);
      collection.forEach(element => {
        user = element.data();
      });
      setUserData(user.user);
    } catch (error) {
      console.log('Erro em buscar usuário no banco de dados: ', error.message);
    }
  };

  const signOutUser = async () => {
    try {
      const response = await auth.signOut();
      console.log('Usuário deslogado: ', response);
      await AsyncStorage.removeItem('loginData');
      setUserAuth(null);
      setUserData(null);
      navigation.navigate('Login');
    } catch (error) {
      console.log('Erro ao deslogar usuário: ', error);
    }
  };

  return { autenticarUsuario, signOutUser };
};

export default useAuth;
