import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Modal, StyleSheet, TextInput, View } from 'react-native';
import { scale, width } from '../../functions/scale';
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';

const ModalResetPass = ({ visible, closeModal }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendResetPassswordEmail = async () => {
    try {
      if (email) {
        const response = await sendPasswordResetEmail(auth, email);
        console.log(response);
        setMessage(
          'Um email foi enviado com as instruções de recuperação de senha.',
        );
      } else {
        setMessage('Por favor preencha um email válido.');
      }
    } catch (error) {
      console.log('Error');
      setMessage(
        'Não foi possível realizar o envio do email, por favor, tente novamente.',
      );
    }
  };

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={styles.modal}>
        <Text style={styles.instrucao}>
          Por favor, digite seu email para que possamos enviar um email com
          instruções de recuperação da conta
        </Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder='Email'
        ></TextInput>
        <Text style={styles.messageError}>{message}</Text>
        <View style={styles.btnArea}>
          <TouchableOpacity
            style={[styles.btnReset, { backgroundColor: '#f5f8fa' }]}
            onPress={() => {
              setEmail('');
              setMessage('');
              closeModal();
            }}
          >
            <Text style={[styles.textBtn, { color: '#115D8Cdd' }]}>Fechar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnReset}
            onPress={() => sendResetPassswordEmail()}
          >
            <Text style={styles.textBtn}>Recuperar senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalResetPass;

const styles = StyleSheet.create({
  modal: {
    margin: 'auto',
    backgroundColor: '#fff',
    borderRadius: scale(16),
    width: scale(400),
    height: 'auto',
    paddingTop: scale(18),
  },
  btnReset: {
    backgroundColor: '#115D8Cdd',
    // marginTop: scale(12),
    marginVertical: scale(16),
    borderRadius: scale(10),
    width: scale(180),
    height: scale(34),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 'auto',
  },
  textBtn: {
    color: '#fff',
    fontWeight: '600',
  },
  instrucao: {
    paddingHorizontal: scale(12),
    textAlign: 'center',
  },
  input: {
    marginVertical: scale(12),
    paddingVertical: scale(8),
    paddingHorizontal: scale(16),
    marginHorizontal: scale(28),
    borderRadius: scale(6),
    backgroundColor: '#f5f8fa',
  },
  btnArea: {
    flexDirection: 'row',
  },
});
