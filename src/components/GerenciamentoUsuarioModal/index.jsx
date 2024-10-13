import React, { useState } from 'react';
import { StyleSheet, Modal, View, Text, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../Header';
import { modalStyles } from '../CommonStyles/Modal';
import BotaoSubmit from '../BotaoSubmit';
import AvisoDeErro from '../AvisoDeErro';
import { auth, db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { EntradaTexto } from '../BotaoSubmit/EntradaTexto';

export default function GerenciamentoUsuarioModal(props) {
  const [nome, setNome] = useState(null);
  const [cpf, setCpf] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState(null);
  const [emailUsuario, setEmailUsuario] = useState(null);
  const [senha, setSenha] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [avisoErroVisivel, setAvisoErroVisivel] = useState(false);
  const [avisoErroMensagem, setAvisoErroMensagem] = useState('Mensagem de erro genérica');

  const criarUsuario = async (email, password) => {
     createUserWithEmailAndPassword(auth,email,password,)
     .then((response)=>{
      return response;
     })
     .catch(()=>{
      console.log(error.code);
      console.log(error.message);
     })
  
  };

  async function salvarUsuario() {
    const user = { nome, cpf, tipo: tipoUsuario, email: emailUsuario, senha };
    const camposEstaoPreenchidos = Object.values(user).every(value => value);
    
    if (camposEstaoPreenchidos) {      
      const userCredential = await criarUsuario(user.email, user.senha);
      if (userCredential?.user?.uid) {
        user.uid = userCredential.user.uid;
        await armazenarUsuario(user);
      } else {
        setAvisoErroVisivel(false);
        setAvisoErroMensagem('Não foi possível concluir o cadastro do usuário');
      }
      // userData = createUser(user.email, user.senha);
      // console.log('Dados do auth: ', userData);
      // console.log(userData);

      props.setVisivel(false);
      props.setTexto('');
      // setAvisoErroVisivel(false);
      // setAvisoErroMensagem('');
      limparCampos();
    } else {
      setAvisoErroVisivel(true);
      setAvisoErroMensagem('Todos os campos devem ser preenchidos');
    }
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
  }
  const armazenarUsuario = async (user) =>{
    await addDoc(collection(db, 'usuario'), { user })
    .then(() => console.log('Adição de dados concluida'))
    .catch(erro => console.log(erro));
  }
  return (
    <Modal
      visible={props.visivel}
      style={modalStyles.container}
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
      <EntradaTexto  placeholder='Nome do usuario' modelValue={setNome} texto='Nome do Usuário' style={{
          view: styles.areaReclamante,
          text: styles.textoInfoUsuario,
          textInput:modalStyles.input
        }}/>        
        <View style={styles.linha}>        
        <EntradaTexto  placeholder='N° do CPF' modelValue={setCpf} texto='000.000.000-00' style={{
          view: [styles.campoMetade, { marginRight: 5 }],
          text: styles.textoInfoUsuario,
          textInput:[modalStyles.input, modalStyles.inputCPF]
        }}/>        
         <EntradaTexto placeholder='Tipo do Usuário' modelValue={setTipoUsuario} texto='Tipo' style={{
          view: [styles.campoMetade, { marginRight: 5 }],
          text: styles.textoInfoUsuario,
          textInput:[modalStyles.input]
        }}/>         
        </View>
        <EntradaTexto placeholder='E-mail do usuário' modelValue={setEmailUsuario} texto='email@email.com' style={{
          view: styles.areaEmail,
          text: styles.textoInfoUsuario,
          textInput: modalStyles.input
        }}/>     
     <EntradaTexto placeholder='Senha' modelValue={setSenha} texto='***********' style={{
          view: styles.areaSenha,
          text: styles.textoInfoUsuario,
          textInput: modalStyles.input
        }} secureTextEntry={true}/>  
     
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
          sair();
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
    fontSize: 10,
  },
  areaEmail: {
    margin: 10,
  },
  areaSenha: {
    margin: 10,
  },
});
