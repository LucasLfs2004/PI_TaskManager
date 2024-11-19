import moment from 'moment';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { scale } from '../../functions/scale';

const checkIfLate = dateString => {
  const inputDate = moment(dateString, 'DD/MM/YYYY');
  const currentDate = moment();
  return !inputDate.isAfter(currentDate, 'day');
};

const StatusIcon = ({ task }) => {
  const [delayed, setDelayed] = useState(checkIfLate(task?.prazoData));
  return (
    <View
      style={{
        borderRadius: scale(12),
        paddingHorizontal: scale(10),
        paddingVertical: scale(4),
        height: scale(28),
        backgroundColor: task.concluido
          ? '#51B853'
          : !delayed
          ? '#F8B135'
          : '#f00',
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontWeight: '600',
        }}
      >
        {!task?.concluido
          ? delayed
            ? 'Atrasada'
            : 'Em processo'
          : 'Concluída'}
      </Text>
    </View>
  );
};

export default StatusIcon;
