import { SafeAreaView, ScrollView, View } from 'react-native';
import { falseList } from '../../../assets/falseDb';
import TaskCard from '../../components/TaskCard';
import Header from '../../components/Header';
import { scale } from '../../functions/scale';

const ListTasks = () => {
  return (
    <SafeAreaView style={{marginTop: 25}}>
      <Header removePaddingTop={true} />
      <ScrollView style={{ marginBottom: scale(120) }}>
        {falseList.map((item, key) => (
          <TaskCard task={item} key={key} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListTasks;
