import React, { useEffect } from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Text,
  TextInput,
  ImageBackgroundBase,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';
import Header from '../Header';
import { LinearGradient } from 'expo-linear-gradient';
import { modalStyles } from '../CommonStyles/Modal';
import BotaoSubmit from '../BotaoSubmit';
import { scale } from '../../functions/scale';
import AvisoDeErro from '../AvisoDeErro';
import { useState } from 'react';
import { db } from '../../config/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { EntradaTexto } from '../BotaoSubmit/EntradaTexto';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import InputDate from '../inputDate';
import { useUserStore } from '../../store/userStore';

export default function GerenciamentoChamadoModal(props) {
  const [nomeRequerente, setNomeRequerente] = useState();
  const [tituloChamado, setTituloChamado] = useState(null);
  const [reclamanteChamado, setReclamanteChamado] = useState(null);
  const [prazoData, setPrazoData] = useState('');
  const [dateInputValid, setDateInputValid] = useState(false);
  const [tipoChamado, setTipoChamado] = useState(null);
  const [descricaoChamado, setDescricaoChamado] = useState(null);

  const [avisoErroVisivel, setAvisoErroVisivel] = useState(false);
  const [avisoErroMensagem, setAvisoErroMensagem] = useState(
    'Mensagem de erro genérica',
  );
  const [uidRequerente, setUidRequerente] = useState(null);

  const [usuarios, setUsuarios] = useState([]);
  const [uidResponsavel, setUidResponsavel] = useState('');

  useEffect(() => {
    console.log(`Data: ${prazoData}\nData é valida: ${dateInputValid}`);
  }, [prazoData]);

  const { userAuth, userData } = useUserStore();

  useEffect(() => {
    console.log('userAuth', userAuth);
    console.log('userData', userData);

    setNomeRequerente(
      userAuth?.displayName ? userAuth.displayName : userData?.nome,
    );
  }, [userAuth, userData]);

  useEffect(() => {
    const auth = getAuth(); // Inicializa o Firebase Auth
    const buscarUsuarios = () => {
      getDocs(collection(db, 'usuario'))
        .then(querySnapshot => {
          const usuariosData = [];
          querySnapshot.forEach(doc => {
            usuariosData.push({ id: doc.id, ...doc.data().user });
          });
          setUsuarios(usuariosData);
          console.log(usuariosData);
        })
        .catch(erro => {
          console.error('Erro ao recuperar usuários: ', erro);
        });
    };
    const removerListenerAutenticacao = onAuthStateChanged(auth, user => {
      if (user) {
        setUidRequerente(user.uid);
        buscarUsuarios();
      } else {
        setUidRequerente(null);
      }
    });

    return () => removerListenerAutenticacao();
  }, []);
  async function salvarChamado() {
    const chamado = {
      titulo: tituloChamado,
      requerente: nomeRequerente,
      responsavel: reclamanteChamado,
      aberturaData: moment().format('DD/MM/YYYY HH:mm'),
      prazoData: prazoData,
      tipo: tipoChamado,
      descricao: descricaoChamado,
      uidRequerente,
      uidResponsavel,
    };

    if (
      Object.values(chamado).every(value => value !== null) &&
      dateInputValid
    ) {
      console.log(chamado);
      await addDoc(collection(db, 'tarefa'), { chamado }).catch(erro =>
        console.log(erro),
      );

      props.setVisivel(false);
      props.setTexto('');
      setAvisoErroVisivel(false);
      setAvisoErroMensagem('');
      setTituloChamado(null);
      setReclamanteChamado(null);
      setPrazoData('');
      setTipoChamado(null);
      setDescricaoChamado(null);
    } else {
      setAvisoErroVisivel(true);
      setAvisoErroMensagem(
        'Todos os campos devem ser preenchidos e o prazo deve ser uma data válida',
      );
    }
  }

  function sair() {
    props.setVisivel(false);
    props.setTexto('');
    setAvisoErroVisivel(false);
  }

  useEffect(() => {
    console.log(reclamanteChamado);
  }, [reclamanteChamado]);

  return (
    <Modal
      visible={props.visivel}
      style={modalStyles.container}
      animationType='slide'
    >
      <ScrollView
        style={{ flex: 1, paddingTop: scale(Platform.OS === 'ios' ? 60 : 0) }}
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
          <Text style={[styles.textoInfoChamado, { marginLeft: 10 }]}>
            Responsável:
          </Text>
          <Picker
            selectedValue={uidResponsavel}
            style={[styles.picker, styles.input]}
            onValueChange={itemValue => {
              setUidResponsavel(itemValue);
              setReclamanteChamado(
                usuarios.find(objeto => objeto.uid === itemValue).nome,
              );
            }}
          >
            <Picker.Item label='Selecione um usuário' value={null} />
            {usuarios.map(usuario => (
              <Picker.Item
                key={usuario.id}
                label={usuario.nome}
                value={usuario.uid}
              />
            ))}
          </Picker>

          <EntradaTexto
            placeholder='Título'
            modelValue={setTituloChamado}
            texto='Título da tarefa'
            style={{
              view: styles.areaReclamante,
              text: styles.textoInfoChamado,
              textInput: modalStyles.input,
            }}
          />
          <View style={styles.linha}>
            <InputDate
              placeholder='Prazo do chamado'
              value={prazoData}
              modelValue={value => {
                setPrazoData(value);
                console.log('data value: ', value);
              }}
              texto='dd/mm/aaaa'
              style={{
                view: [styles.campoMetade, { marginRight: 5 }],
                text: styles.textoInfoChamado,
                textInput: modalStyles.input,
              }}
              setDateValid={value => setDateInputValid(value)}
            />
            <EntradaTexto
              placeholder='Tipo do chamado'
              modelValue={setTipoChamado}
              texto='Tarefa'
              style={{
                view: [styles.campoMetade, { marginRight: 5 }],
                text: styles.textoInfoChamado,
                textInput: modalStyles.input,
              }}
            />
          </View>

          <View style={styles.areaDescricao}>
            <Text style={styles.textoInfoChamado}>Descrição</Text>
            <TextInput
              placeholder='Descrição'
              onChangeText={setDescricaoChamado}
              multiline={true}
              style={[styles.input, styles.textArea]}
              // placeholderTextColor={emFoco ? '#B0BEC5' : '#D3D3D3'}
              // onFocus={() => estaEmFoco(true)}
              // onBlur={() => estaEmFoco(false)}
              secureTextEntry={false}
            />
          </View>
          {/* <EntradaTexto
            placeholder='Descrição'
            modelValue={setDescricaoChamado}
            texto='Descrição'
            style={{
              view: styles.areaDescricao,
              text: styles.textoInfoChamado,
              textInput: modalStyles.input,
            }}
          /> */}
        </View>

        <BotaoSubmit
          text='Criar nova tarefa'
          action={() => {
            salvarChamado();
          }}
        />
        <BotaoSubmit
          text={'Sair'}
          action={() => {
            sair();
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
      </ScrollView>
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
  textArea: {
    minHeight: scale(60),
  },
  picker: {
    fontSize: scale(14),
    margin: 10,
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
    marginBottom: scale(120),
    rowGap: scale(8),
    alignItems: 'center',
  },
});
