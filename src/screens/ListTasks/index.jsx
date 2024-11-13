import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import Header from '../../components/Header';
import TaskCard from '../../components/TaskCard';
import { db } from '../../config/firebase';
import { scale } from '../../functions/scale';
import { useUserStore } from '../../store/userStore';

const initialLayout = { width: Dimensions.get('window').width };

const ListTasks = () => {
  const [tasks, setTasks] = useState({ requerente: null, responsavel: null });

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'requerente', title: 'Tarefas Criadas' },
    { key: 'responsavel', title: 'Tarefas a Realizar' },
  ]);
  // useTask();

  const { userAuth } = useUserStore();

  const fetchTasksSeparadas = async (userUid = userAuth?.uid, whereArg) => {
    try {
      const tasksCollection = collection(db, 'tarefa');
      const q = query(tasksCollection, where(whereArg, '==', userUid));
      const collectionTask = await getDocs(q);
      let fetchedTasks = [];
      collectionTask.forEach(element => {
        const dadosUsuario = element.data();
        fetchedTasks.push(dadosUsuario.chamado);
      });
      return fetchedTasks;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getTasks = async () => {
    const requerente = await fetchTasksSeparadas(
      userAuth.uid,
      'chamado.uidRequerente',
    );
    const responsavel = await fetchTasksSeparadas(
      userAuth.uid,
      'chamado.uidResponsavel',
    );
    setTasks({ requerente, responsavel });
  };

  useEffect(() => {
    if (userAuth?.uid) {
      getTasks();
    }
  }, [userAuth.uid]);

  const RequerenteRoute = () => (
    <ScrollView style={{ flex: 1, paddingBottom: scale(48) }}>
      {tasks.requerente?.length > 0 ? (
        tasks.requerente.map(item => <TaskCard task={item} key={item.id} />)
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          Nenhuma tarefa criada
        </Text>
      )}
    </ScrollView>
  );

  const ResponsavelRoute = () => (
    <ScrollView style={{ flex: 1, paddingBottom: scale(48) }}>
      {tasks.responsavel?.length > 0 ? (
        tasks.responsavel.map(item => <TaskCard task={item} key={item.id} />)
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          Nenhuma tarefa para realizar
        </Text>
      )}
    </ScrollView>
  );

  const renderScene = SceneMap({
    requerente: RequerenteRoute,
    responsavel: ResponsavelRoute,
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header removePaddingTop={true} backButton={true} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={styles.tabBar}
            indicatorStyle={styles.indicator}
            tabStyle={styles.tabStyle}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default ListTasks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scene: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#29445B',
    height: scale(50),
  },
  indicator: {
    height: scale(3),
    backgroundColor: '#fff',
  },
  label: {
    fontWeight: 600,
    fontSize: scale(12),
  },
  tabStyle: {},
  cardsArea: {
    rowGap: scale(16),
    paddingVertical: scale(24),
    paddingHorizontal: scale(20),
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
