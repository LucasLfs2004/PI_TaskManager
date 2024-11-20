import React, { useState } from 'react';
import {
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';

import { LinearGradient } from 'expo-linear-gradient';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { scale } from '../../functions/scale';
import AvisoDeErro from '../AvisoDeErro';
import BotaoSubmit from '../BotaoSubmit';
import { EntradaTexto } from '../BotaoSubmit/EntradaTexto';
import { modalStyles } from '../CommonStyles/Modal';
import Header from '../Header';

export default function GerenciamentoUsuarioModal(props) {
  const [nome, setNome] = useState(null);
  const [cpf, setCpf] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState(null);
  const [emailUsuario, setEmailUsuario] = useState(null);
  const [senha, setSenha] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [avisoErroVisivel, setAvisoErroVisivel] = useState(false);
  const [avisoErroMensagem, setAvisoErroMensagem] = useState(
    'Mensagem de erro genérica',
  );

  const criarUsuario = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(response => {
        return response;
      })
      .catch(e => {
        throw new Error(e.message);
      });
  };

  async function salvarUsuario() {
    const usuario = {
      nome,
      cpf,
      tipo: tipoUsuario,
      email: emailUsuario,
      senha,
    };
    const camposEstaoPreenchidos = Object.values(usuario).every(value => value);

    if (!camposEstaoPreenchidos && cpf?.length < 14) {
      setAvisoErroVisivel(true);
      setAvisoErroMensagem(
        'Todos os campos devem ser preenchidos e o cpf deve ser válido',
      );
      return;
    }
    criarUsuario(usuario.email, usuario.senha)
      .then(response => {
        atualizarPerfilUsuario(response.user);
        armazenarDadosUsuario(response.user);
      })
      .catch(() => {
        setAvisoErroVisivel(false);
        setAvisoErroMensagem('Não foi possível concluir o cadastro do usuário');
      });

    props.setVisivel(false);
    props.setTexto('');
    // setAvisoErroVisivel(false);
    // setAvisoErroMensagem('');
    limparCampos();
  }

  function sair() {
    props.setVisivel(false);
    props.setTexto('');
    setAvisoErroVisivel(false);
  }

  const limparCampos = () => {
    setNome(null);
    setCpf(null);
    setTipoUsuario(null);
    setEmailUsuario(null);
    setSenha(null);
  };
  const armazenarDadosUsuario = usuario => {
    const user = {
      nome,
      cpf,
      isAdmin: false,
      tipo: tipoUsuario,
      uid: usuario.uid,
    };
    return addDoc(collection(db, 'usuario'), { user })
      .then(() => {
        return;
      })
      .catch(erro => console.log(erro));
  };

  const atualizarPerfilUsuario = async usuario => {
    if (usuario) {
      return updateProfile(usuario, { displayName: nome })
        .then(() => {
          console.log('nome atualizado');
        })
        .catch(() => {
          console.log('Ocorreu um erro!');
        });
    }
  };

  return (
    <Modal
      visible={props.visivel}
      style={modalStyles.container}
      animationType='slide'
    >
      <View style={styles.container}>
        <Header />
        <AvisoDeErro visivel={avisoErroVisivel} mensagem={avisoErroMensagem} />
        <LinearGradient
          style={styles.areaTextoPrincipal}
          colors={['#8D9CD3', '#FFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.45, y: 0 }}
        >
          <Text style={styles.textoPrincipal}>{props.titulo}</Text>
        </LinearGradient>

        <View style={styles.formularioTarefa}>
          <EntradaTexto
            placeholder='Nome do usuario'
            modelValue={setNome}
            texto='Nome do Usuário'
            style={{
              view: styles.areaReclamante,
              text: styles.textoInfoUsuario,
              textInput: modalStyles.input,
            }}
          />
          <View style={styles.linha}>
            <View style={[{ width: scale(180) }]}>
              <Text style={styles.textoInfoUsuario}>N° do CPF</Text>

              <MaskedTextInput
                placeholder={'N° do CPF'}
                mask='999.999.999-99'
                onChangeText={(text, rawText) => {
                  console.log(text);
                  console.log(rawText);
                  setCpf(text);
                }}
                style={[modalStyles.input, modalStyles.inputCPF]}
              />
            </View>
            <EntradaTexto
              placeholder='Tipo do Usuário'
              modelValue={setTipoUsuario}
              texto='Tipo'
              style={{
                view: [styles.campoMetade, { marginRight: 5 }],
                text: styles.textoInfoUsuario,
                textInput: [modalStyles.input],
              }}
            />
          </View>
          <View style={styles.linha}>
            <TouchableOpacity
              onPress={() => setIsAdmin(!isAdmin)}
              style={[styles.checkbox, { backgroundColor: '#115D8C' }]}
            >
              {isAdmin && (
                <Image
                  style={{ width: scale(16), height: scale(16) }}
                  source={require('../../../assets/checkIcon.png')}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.text}>Permissões avançadas</Text>
          </View>
          <EntradaTexto
            placeholder='E-mail do usuário'
            modelValue={setEmailUsuario}
            texto='email@email.com'
            style={{
              view: styles.areaEmail,
              text: styles.textoInfoUsuario,
              textInput: modalStyles.input,
            }}
          />
          <EntradaTexto
            placeholder='Senha'
            modelValue={setSenha}
            texto='***********'
            style={{
              view: styles.areaSenha,
              text: styles.textoInfoUsuario,
              textInput: modalStyles.input,
            }}
            secureTextEntry={true}
          />
        </View>
        <BotaoSubmit
          text={'Cadastrar novo usuário'}
          action={() => {
            salvarUsuario();
          }}
        />
        <BotaoSubmit
          text={'Sair'}
          action={() => {
            sair();
          }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F8FA',
    flex: 1,

    marginTop: scale(Platform.OS === 'ios' ? 60 : 0),
  },
  areaTextoPrincipal: {
    marginTop: 20,
    marginBottom: 20,
    height: 80,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  textoPrincipal: {
    color: '#3C3A9B',
    fontSize: 25,
  },
  areaReclamante: {
    margin: 10,
  },
  areaTipoUsuario: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10,
    marginLeft: 10,
  },

  linha: {
    flexDirection: 'row',
    margin: 10,
    columnGap: scale(20),
  },
  campoMetade: {
    flex: 1,
  },
  input: {
    borderStyle: 'solid',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#DCE2E5',
    padding: 8,
  },
  inputCPF: {
    width: 180,
  },
  textoInfoUsuario: {
    color: '#617480',
    fontSize: scale(14),
  },
  areaEmail: {
    margin: 10,
  },
  areaSenha: {
    margin: 10,
  },
  checkbox: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(4),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(22),
  },
});
