import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { scale } from '../../functions/scale';

const BotaoSubmit = ({ text, action }) => {
  return (
    <TouchableOpacity onPress={action} style={styles.btn}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default BotaoSubmit;

const styles = StyleSheet.create({
  btn: {
    marginTop: scale(12),
    backgroundColor: '#51B853',
    borderRadius: scale(10),
    width: scale(280),
    height: scale(34),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 'auto',
  },
  text: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: '500',
  },
});
