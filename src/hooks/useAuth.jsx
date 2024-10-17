import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useUserStore } from '../store/userStore';
import { db } from '../config/firebase';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';

const useAuth = () => {
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
      return error;
    }
  };

  const usersCollection = collection(db, 'usuario');
  //   const getUsuario = async () => {

  //   };

  const getUserInDb = async uid => {
    console.log('uid do usuário: ', uid);
    try {
      let user = null;
      const q = query(usersCollection, where('uid', '==', uid));
      const collection = await getDocs(q);
      collection.forEach(element => {
        console.log(element.data());
        user = element.data();
      });
      setUserData(user);
    } catch (error) {
      console.log('Erro em buscar usuário no banco de dados: ', error.message);
    }
  };

  return { autenticarUsuario };
};

export default useAuth;
