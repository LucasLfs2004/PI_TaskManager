import { useState } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { scale } from '../../functions/scale';
import BotaoSubmit from '../BotaoSubmit';

const ModalCommentTask = ({ visible, close, action }) => {
  const [comment, setComment] = useState('');
  return (
    <Modal transparent visible={visible} animationType='slide'>
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Adicionar comentário</Text>
          <TouchableOpacity
            onPress={() => {
              close();
              setComment('');
            }}
          >
            <Image
              style={styles.iconClose}
              source={require('../../../assets/close.png')}
            />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.placeholder}>Comentário</Text>
          <TextInput
            style={styles.input}
            value={comment}
            onChangeText={setComment}
            multiline={true}
          ></TextInput>
        </View>
        <BotaoSubmit
          text={'Comentar'}
          action={() => {
            action(comment);
            setComment('');
          }}
        />
      </View>
    </Modal>
  );
};

export default ModalCommentTask;

const styles = StyleSheet.create({
  iconClose: {
    width: scale(20),
    height: scale(20),
  },
  container: {
    width: scale(400),
    // height: scale(300),
    marginHorizontal: 'auto',
    marginTop: scale(256),
    backgroundColor: '#fff',
    borderRadius: scale(16),
    elevation: 30,
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(10),
    // marginHorizontal: scale(16),
  },
  headerTitle: {
    // color: '#29445B',
    fontSize: scale(20),
    fontWeight: 'bold',
  },

  input: {
    borderStyle: 'solid',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DCE2E5',
    backgroundColor: '#F5F8FA',
    padding: 8,
    height: scale(72),
    marginBottom: scale(16),
  },
  placeholder: {
    // color: '#DCE2E5',
    fontSize: scale(16),
    fontWeight: '500',
    marginVertical: scale(8),
  },
});
