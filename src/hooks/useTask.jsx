import { useState } from 'react';

import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useUserStore } from '../store/userStore';
import { db } from '../config/firebase';
import {
  collection,
  getDoc,
  getDocs,
  or,
  query,
  where,
} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useTask = () => {
  const [tasks, setTasks] = useState();

  const fetchTasks = async uid => {
    console.log(uid);
    try {
      console.log('Iniciando fetchTasks');
      const tasksCollection = collection(db, 'tarefa');
      const q = query(
        tasksCollection,
        or(
          where('chamado.uidRequerente', '==', uid),
          where('chamado.uidResponsavel', '==', uid),
        ),
      );

      const collectionTask = await getDocs(q);
      console.log(collection);
      let tasks = [];
      collectionTask.forEach(element => {
        const dadosUsuario = element.data();
        tasks.push(dadosUsuario.chamado);
      });
      console.log('user no listUsers: ', tasks);
      setTasks(tasks);
      return tasks;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return { fetchTasks };
};

export default useTask;
