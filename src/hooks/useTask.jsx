import { useEffect } from 'react';

import {
  collection,
  getDocs,
  or,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useUserStore } from '../store/userStore';
import { useTaskStore } from '../store/useTask';

const useTask = () => {
  const { setTasksGeral, tasksGeral } = useTaskStore();
  const { userAuth } = useUserStore();

  const fetchTasks = async (userUid = userAuth?.uid) => {
    try {
      console.log('Iniciando fetchTasks');
      const tasksCollection = collection(db, 'tarefa');
      const q = query(
        tasksCollection,
        or(
          where('chamado.uidRequerente', '==', userUid),
          where('chamado.uidResponsavel', '==', userUid),
        ),
      );

      const collectionTask = await getDocs(q);
      let fetchedTasks = [];
      collectionTask.forEach(element => {
        const dadosUsuario = element.data();
        fetchedTasks.push(dadosUsuario.chamado);
      });
      setTasksGeral(fetchedTasks);
      return fetchedTasks;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const fetchTasksRequerente = async (userUid = userAuth?.uid) => {
    try {
      const tasksCollection = collection(db, 'tarefa');
      const q = query(
        tasksCollection,
        where('chamado.uidRequerente', '==', userUid),
      );

      const collectionTask = await getDocs(q);
      console.log(collection);
      let fetchedTasks = [];
      collectionTask.forEach(element => {
        const dadosUsuario = element.data();
        fetchedTasks.push(dadosUsuario.chamado);
      });
      console.log('user no listUsers: ', fetchedTasks);
      return fetchedTasks;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  const fetchTasksResponsavel = async (userUid = userAuth?.uid) => {
    console.log(userUid);
    try {
      console.log('Iniciando fetchTasks');
      const tasksCollection = collection(db, 'tarefa');
      const q = query(
        tasksCollection,
        where('chamado.uidResponsavel', '==', userUid),
      );

      const collectionTask = await getDocs(q);
      console.log(collection);
      let fetchedTasks = [];
      collectionTask.forEach(element => {
        const dadosUsuario = element.data();
        fetchedTasks.push(dadosUsuario.chamado);
      });
      console.log('user no listUsers: ', fetchedTasks);
      // setTasksResponsavel(fetchedTasks);
      return fetchedTasks;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const concludeTask = async id => {
    const tarefaCollection = collection(db, 'tarefa');

    // Cria uma consulta para encontrar o documento onde "chamado.id" é igual ao valor fornecido
    const q = query(tarefaCollection, where('chamado.id', '==', id));

    try {
      // Executa a consulta
      const querySnapshot = await getDocs(q);

      // Verifica se encontrou documentos correspondentes
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async docSnapshot => {
          // Atualiza o campo "chamado.concluido" no documento encontrado
          await updateDoc(docSnapshot.ref, {
            'chamado.concluido': true,
          });
          console.log('Campo "chamado.concluido" atualizado com sucesso!');
          fetchTasks();
        });
      } else {
        console.log('Nenhum documento encontrado com o id especificado.');
      }
    } catch (error) {
      console.error('Erro ao atualizar o campo "chamado.concluido":', error);
    }
  };

  const openTask = async id => {
    const tarefaCollection = collection(db, 'tarefa');

    // Cria uma consulta para encontrar o documento onde "chamado.id" é igual ao valor fornecido
    const q = query(tarefaCollection, where('chamado.id', '==', id));

    try {
      // Executa a consulta
      const querySnapshot = await getDocs(q);

      // Verifica se encontrou documentos correspondentes
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async docSnapshot => {
          // Atualiza o campo "chamado.concluido" no documento encontrado
          await updateDoc(docSnapshot.ref, {
            'chamado.concluido': false,
          });
          console.log('Campo "chamado.concluido" atualizado com sucesso!');
          fetchTasks();
        });
      } else {
        console.log('Nenhum documento encontrado com o id especificado.');
      }
    } catch (error) {
      console.error('Erro ao atualizar o campo "chamado.concluido":', error);
    }
  };

  useEffect(() => {
    if (tasksGeral === null) {
      fetchTasks(userAuth.uid);
    }
  }, []);

  return {
    fetchTasks,
    concludeTask,
    fetchTasksRequerente,
    fetchTasksResponsavel,
    openTask,
  };
};

export default useTask;
