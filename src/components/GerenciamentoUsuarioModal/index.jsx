import React, { useState } from 'react';
import { StyleSheet, Modal, View, Text, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../Header';
import { ModalStyles } from '../CommonStyles/Modal';
import BotaoSubmit from '../BotaoSubmit';
import AvisoDeErro from '../AvisoDeErro';
import { db } from '../../config/firebase';
import {collection, addDoc } from 'firebase/firestore';

export default function GerenciamentoUsuarioModal(props) {
  const [nome, setNome] = useState(null);
  const [cpf, setCpf] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState(null);
  const [emailUsuario, setEmailUsuario] = useState(null);
  const [senha, setSenha] = useState(null);

  const [avisoErroVisivel, setAvisoErroVisivel] = useState(false);
  const [avisoErroMensagem, setAvisoErroMensagem] = useState('Mensagem de erro genérica');

  async function salvarUsuario() {
    let user = {
      nome: nome,
      cpf: cpf,
      tipo: tipoUsuario,
      email: emailUsuario,
      senha: senha,
    };

    //todo validações das entradas
    //todo mensagens de erro

    if (user.nome !== null && user.cpf !== null && user.tipo !== null && user.email !== null && user.senha !== null) {
      console.log(user);
      await addDoc(collection(db, "usuario"), {user}).catch((erro) => {console.log(erro)})

      props.setVisivel(false);
      props.setTexto('');
      setAvisoErroVisivel(false);
      setAvisoErroMensagem('');
      setNome(null);
      setCpf(null);
      setTipoUsuario(null);
      setEmailUsuario(null);
      setSenha(null)
    } else {
      setAvisoErroVisivel(true);
      setAvisoErroMensagem('Todos os campos devem ser preenchidos');
    }
  }

  function sair(){
    props.setVisivel(false);
    props.setTexto('');
    setAvisoErroVisivel(false);
  }

  return (
    <Modal
      visible={props.visivel}
      style={ModalStyles.container}
      animationType='slide'
    >
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
        <View style={styles.areaReclamante}>
          <Text style={styles.textoInfoUsuario}>Nome do usuario</Text>
          <TextInput
            placeholder='Nome do Usuário'
            onChangeText={setNome}
            style={ModalStyles.input}
          />
        </View>
        <View style={styles.areaTipoUsuario}>
          <View>
            <Text style={styles.textoInfoUsuario}>N° do CPF</Text>
            <TextInput
              placeholder='000.000.000-00'
              onChangeText={setCpf}
              style={[ModalStyles.input, ModalStyles.inputCPF, styles.inputCPF]}
            />
          </View>
          <View>
            <Text style={styles.textoInfoUsuario}>Tipo do Usuário</Text>
            <TextInput
              placeholder='Tipo'
              onChangeText={setTipoUsuario}
              style={[ModalStyles.input, styles.tipoUsuario]}
            />
          </View>
        </View>
        <View style={styles.areaEmail}>
          <Text style={styles.textoInfoUsuario}>E-mail do usuário</Text>
          <TextInput
            placeholder='email@email.com'
            onChangeText={setEmailUsuario}
            style={ModalStyles.input}
          />
        </View>
        <View style={styles.areaSenha}>
          <Text style={styles.textoInfoUsuario}>Senha</Text>
          <TextInput
            placeholder='***********'
            onChangeText={setSenha}
            style={ModalStyles.input}
          />
        </View>
      </View>
      <BotaoSubmit
        text={'Concluir nova tarefa'}
        action={() => {
          salvarUsuario();
        }}
      />
      <BotaoSubmit
        text={'Sair'}
        action={() => {
          sair()
        }}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
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
  formularioTarefa: {
    // flex: 1,
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
  tipoUsuario: {
    width: 150,
  },
  textoInfoUsuario: {
    color: '#617480',
    fontSize: 10,
  },
  areaEmail: {
    margin: 10,
  },
  areaSenha: {
    margin: 10,
  },
});
