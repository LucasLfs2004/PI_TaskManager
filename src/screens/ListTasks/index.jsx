import { SafeAreaView, ScrollView, View } from 'react-native';
import { falseList } from '../../../assets/falseDb';
import TaskCard from '../../components/TaskCard';
import Header from '../../components/Header';
import { scale } from '../../functions/scale';
import { useEffect, useState } from 'react';
import useTask from '../../hooks/useTask';
import { useUserStore } from '../../store/userStore';

const ListTasks = () => {
  const [tasks, setTasks] = useState(null);

  const { fetchTasks } = useTask();

  const { userAuth } = useUserStore();

  const getTasks = async () => {
    const tasksFirestore = await fetchTasks(userAuth.uid);
    console.log('tasks from firestore: ', tasksFirestore);
    setTasks(tasksFirestore);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <SafeAreaView style={{ marginTop: 25 }}>
      <Header removePaddingTop={true} backButton={true} />
      <ScrollView style={{ marginBottom: scale(48) }}>
        {tasks?.map((item, key) => (
          <TaskCard task={item} key={key} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListTasks;
