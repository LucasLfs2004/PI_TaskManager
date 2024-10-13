import React from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Text,
  TextInput,
  Image
} from 'react-native';
import Header from '../Header';
import { LinearGradient } from 'expo-linear-gradient';
import { modalStyles } from '../CommonStyles/Modal';
import BotaoSubmit from '../BotaoSubmit';
import { scale } from '../../functions/scale';
import AvisoDeErro from '../AvisoDeErro';
import { useState } from 'react';
import { db } from '../../config/firebase';
import {collection, addDoc } from 'firebase/firestore';
import { EntradaTexto } from '../BotaoSubmit/EntradaTexto';

export default function GerenciamentoChamadoModal(props) {
  const [tituloChamado, setTituloChamado] = useState(null);
  const [reclamanteChamado, setReclamanteChamado] = useState(null);
  const [aberturaData, setAberturaData] = useState(null);
  const [tipoChamado, setTipoChamado] = useState(null);
  const [descricaoChamado, setDescricaoChamado] = useState(null);

  const [avisoErroVisivel, setAvisoErroVisivel] = useState(false);
  const [avisoErroMensagem, setAvisoErroMensagem] = useState('Mensagem de erro genérica');

  async function salvarChamado(){
    let chamado = {
      titulo: tituloChamado,
      reclamante: reclamanteChamado,
      aberturaData: aberturaData,
      tipo: tipoChamado,
      descricao: descricaoChamado
    }

    if(Object.values(chamado).every((value) => value !== null)){
      console.log(chamado)
      await addDoc(collection(db, "tarefa"), {chamado}).catch((erro) => console.log(erro))

      props.setVisivel(false);
      props.setTexto('');
      setAvisoErroVisivel(false);
      setAvisoErroMensagem("");
      setTituloChamado(null);
      setReclamanteChamado(null);
      setAberturaData(null);
      setTipoChamado(null);
      setDescricaoChamado(null);
    }else {
      setAvisoErroVisivel(true);
      setAvisoErroMensagem("Todos os campos devem ser preenchidos");
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
      style={modalStyles.container}
      animationType='slide'
    >
      <Header />
      <AvisoDeErro visivel={avisoErroVisivel} mensagem={avisoErroMensagem}/>
      <LinearGradient
        style={styles.areaTextoPrincipal}
        colors={['#8D9CD3', '#FFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.45, y: 0 }}
      >
        <Text style={styles.textoPrincipal}>{props.titulo}</Text>
      </LinearGradient>
      <View style={styles.formularioTarefa}>
        <EntradaTexto  placeholder='Título' modelValue={setTituloChamado} texto='Título da tarefa' style={{
          view: styles.areaReclamante,
          text: styles.textoInfoChamado,
          textInput:modalStyles.input
        }}/>
      
          <EntradaTexto  placeholder='Reclamante' modelValue={setReclamanteChamado} texto='Usuario Reclamante' style={{
           view: styles.areaReclamante,
           text: styles.textoInfoChamado,
           textInput:modalStyles.input
        }}/>
     <View style={styles.linha}>
            <EntradaTexto  placeholder='Data de abertura do chamado' modelValue={setAberturaData} texto='dd/mm/aaaa' style={{
            view: [styles.campoMetade, { marginRight: 5 }],
            text: styles.textoInfoChamado,
            textInput:modalStyles.input
          }}/>                   
            <EntradaTexto  placeholder='Tipo do chamado' modelValue={setTipoChamado} texto='Tarefa' style={{
            view: [styles.campoMetade, { marginRight: 5 }],
            text: styles.textoInfoChamado,
            textInput:modalStyles.input
          }}/>       
        </View>
         <EntradaTexto  placeholder='Descrição' modelValue={setDescricaoChamado} texto='Descrição' style={{
           view: styles.areaDescricao,
           text: styles.textoInfoChamado,
           textInput:modalStyles.input
        }}/>          
      </View>

      <BotaoSubmit
        text='Criar nova tarefa'
        action={() => {
          salvarChamado()
        }}
      />
      <BotaoSubmit
        text={'Sair'}
        action={() => {
          sair()
        }}
      />
      <View style={styles.aviso}>
        <Image
          source={require('../../../assets/aviso.png')}
          style={{ width: scale(22), height: scale(22) }}
        />
        <Text style={styles.textoInfoChamado}>
          Confira todos os dados com cuidado.
        </Text>
      </View>
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
    borderColor: '#DCE2E5',
    backgroundColor: '#F5F8FA',
    padding: 8,
  },
  tipoChamado: {
    width: 150,
  },
  textoInfoChamado: {
    color: '#617480',
    fontSize: scale(14),
  },
  areaDescricao: {
    margin: 10,
  },
  aviso: {
    marginTop: scale(22),
    rowGap: scale(8),
    alignItems: 'center',
  },
});
