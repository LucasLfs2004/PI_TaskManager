import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scale } from '../../functions/scale';
import useTask from '../../hooks/useTask';
import StatusIcon from '../StatusIcon';

const TaskCard = ({ task }) => {
  const navigation = useNavigation();
  const { concludeTask } = useTask();

  const handlePressConcludeTask = async () => {
    await concludeTask(task.id);
  };

  return (
    <View style={styles.card}>
      <View style={styles.infos}>
        <View style={styles.column}>
          <Text style={styles.title}>{task.titulo}</Text>
          <StatusIcon task={task} />
        </View>
        <Text style={styles.title}>{task.responsavel}</Text>
        <Text style={[styles.desc, { fontWeight: '600' }]}>
          Prazo: {task.prazoData}
        </Text>
        <Text style={styles.desc}>{task.descricao}</Text>
      </View>
      <View style={styles.btnArea}>
        {!task?.concluido && (
          <TouchableOpacity
            style={styles.btn}
            onPress={handlePressConcludeTask}
          >
            <Text style={styles.textBtn}>Concluir Tarefa</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate('Task', { task: task })}
          style={[styles.btn, { backgroundColor: '#115D8Cdd' }]}
        >
          <Text style={styles.textBtn}>Abrir</Text>
        </TouchableOpacity>
        {/* <BotaoSubmit text={'Ver tarefa'} /> */}
      </View>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderColor: '#E1E3E5',
    marginHorizontal: scale(12),
    marginVertical: scale(16),
    paddingBottom: scale(8),
  },
  infos: {
    rowGap: scale(8),
    flexDirection: 'column',
  },
  title: {
    fontSize: scale(16),
    fontWeight: '600',
    color: '#115D8C',
  },
  column: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  desc: {
    fontSize: scale(14),
    fontWeight: '400',
  },
  btnArea: {
    flexDirection: 'row',
  },
  btn: {
    marginTop: scale(12),
    backgroundColor: '#51B853',
    borderRadius: scale(10),
    width: scale(180),
    height: scale(34),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 'auto',
  },
  textBtn: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: '500',
  },
});
