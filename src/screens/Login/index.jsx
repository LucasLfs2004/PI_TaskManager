import { useState, useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { scale } from '../../functions/scale';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import ModalResetPass from '../../components/RecuperarSenha';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { hashAuth } from '../../config/HashAuth';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [checkInput, setCheckInput] = useState(false);
  const [resetPasseVisible, setResetPassVisible] = useState(false);
  const autenticar = () => {
    if (checkInput) {
      // const senhaEncriptada = criptografarSenha(senha);
      const dataLogin = JSON.stringify({
        email: email,
        senha: senha,
      });
      AsyncStorage.setItem('loginData', dataLogin, error =>
        console.log('Erro ao salvar dados: ', error),
      );
    }
    console.log('Dados para autenticação: ', email, '\n', senha);
    signInWithEmailAndPassword(auth, email, senha)
      .then(userCredential => {
        const user = userCredential.user;
        console.log('Usuário:', user);
        navigation.navigate('Home');
      })
      .catch(error => {
        const errorMessage = error.message;

        console.error('Erro', errorMessage);
      });
  };

  const criptografarSenha = senha => {
    return aes.encrypt(senha, hashAuth).toString();
  };

  // Função para desencriptar a senha
  const desencriptarSenha = senhaCriptografada => {
    const bytes = aes.decrypt(senhaCriptografada, hashAuth);
    return bytes.toString(CryptoJS.enc.Utf8); // Retorna a senha original
  };

  const verifyUser = async () => {
    const loginData = await AsyncStorage.getItem('loginData');
    if (loginData) {
      const loginInfos = JSON.parse(loginData);

      signInWithEmailAndPassword(auth, loginInfos.email, loginInfos.senha)
        .then(userCredential => {
          const user = userCredential.user;
          console.log('Usuário:', user);
          navigation.navigate('Home');
        })
        .catch(error => {
          const errorMessage = error.message;

          console.error('Erro', errorMessage);
        });
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{ marginTop: scale(32) }}
        source={require('../../../assets/banner.png')}
      />
      <View style={styles.formLogin}>
        <Text style={styles.title}>Fazer login</Text>
        <View style={styles.inputArea}>
          <TextInput
            placeholder='Email'
            style={[
              styles.input,
              { borderColor: '#DCE2E5', borderBottomWidth: 1 },
            ]}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder='Senha'
            style={styles.input}
            value={senha}
            secureTextEntry={true}
            onChangeText={setSenha}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.rememberMe}>
            <TouchableOpacity
              onPress={() => setCheckInput(!checkInput)}
              style={[
                styles.checkbox,
                { backgroundColor: checkInput ? '#115D8C' : '#fff' },
              ]}
            ></TouchableOpacity>
            <Text style={styles.text}>Lembrar-me</Text>
          </View>
          <Text onPress={() => setResetPassVisible(true)} style={styles.text}>
            Esqueci minha senha
          </Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={autenticar}>
          <Text style={styles.txtBtn}>Acessar plataforma</Text>
        </TouchableOpacity>
        <View style={styles.rowAviso}>
          <Image source={require('../../../assets/alerta.png')} />
          <Text>Acesso restrito à funcionários</Text>
        </View>
      </View>
      <ModalResetPass
        visible={resetPasseVisible}
        closeModal={() => setResetPassVisible(false)}
      />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f8fa',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  formLogin: {
    marginTop: scale(24),
    flexDirection: 'column',
    rowGap: scale(44),
  },
  title: {
    color: '#123952',
    fontSize: scale(36),
    fontWeight: '600',
  },
  inputArea: {
    borderWidth: 1,
    borderColor: '#DCE2E5',
    borderRadius: scale(10),
    width: scale(380),
    backgroundColor: '#fff',
  },
  input: {
    paddingHorizontal: scale(16),
    height: scale(72),
  },
  text: {
    color: '#A0ACB2',
    fontSize: scale(16),
    fontWeight: '500',
  },
  checkbox: {
    width: scale(16),
    height: scale(16),
    borderRadius: scale(3),
    borderWidth: 1,
    borderColor: '#DCE2E5',
  },
  rememberMe: {
    flexDirection: 'row',
    columnGap: scale(12),
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowAviso: {
    flexDirection: 'row',
    columnGap: scale(18),
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#115D8C',
    borderRadius: scale(10),
    height: scale(72),
    width: scale(380),
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtBtn: {
    color: '#fff',
    fontSize: scale(18),
    fontWeight: '500',
  },
});
