import { scale } from '../../functions/scale';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

const checkIfLate = dateString => {
  const inputDate = moment(dateString, 'DD/MM/YYYY');

  // console.log(dateString);
  // Obter a data atual
  const currentDate = moment();

  // Verificar se a data de entrada é anterior à data atual
  if (inputDate.isBefore(currentDate, 'day')) {
    return true;
  } else {
    return false;
  }
};
const TaskCard = ({ task }) => {
  const [delayed, setDelayed] = useState(checkIfLate(task.expire_at));
  // console.log(delayed, task.expire_at);

  return (
    <View style={styles.card}>
      <View style={styles.infos}>
        <View style={styles.column}>
          <Text style={styles.title}>{task.title}</Text>
          <View
            style={[
              styles.statusView,
              {
                backgroundColor:
                  task.status === 'Concluída'
                    ? '#51B853'
                    : !delayed
                    ? '#F8B135'
                    : '#f00',
              },
            ]}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: '600',
              }}
            >
              {delayed
                ? task.status !== 'Concluída'
                  ? 'Atrasada'
                  : task.status
                : task.status}
            </Text>
          </View>
        </View>
        <Text style={[styles.desc, { fontWeight: '600' }]}>
          Prazo: {task.expire_at}
        </Text>
        <Text style={styles.desc}>{task.description}</Text>
      </View>
      <View style={styles.btnArea}>
        {task.status !== 'Concluída' && (
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.textBtn}>Concluir Tarefa</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
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
    // maxWidth: scale(300),
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
  statusView: {
    borderRadius: scale(12),
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
  },
});
