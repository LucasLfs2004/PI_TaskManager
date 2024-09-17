import { useState } from 'react';
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

const Login = ({ navigation }) => {
  const [checkInput, setCheckInput] = useState(false);

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
            placeholder='Email/CPF'
            style={[
              styles.input,
              { borderColor: '#DCE2E5', borderBottomWidth: 1 },
            ]}
          ></TextInput>
          <TextInput placeholder='Senha' style={styles.input}></TextInput>
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
          <Text style={styles.text}>Esqueci minha senha</Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.txtBtn}>Acessar plataforma</Text>
        </TouchableOpacity>
        <View style={styles.rowAviso}>
          <Image source={require('../../../assets/alerta.png')} />
          <Text>Acesso restrito à funcionários</Text>
        </View>
      </View>
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
