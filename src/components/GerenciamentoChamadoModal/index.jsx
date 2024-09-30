import React from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from '../Header';
import { LinearGradient } from 'expo-linear-gradient';
import { ModalStyles } from '../CommonStyles/Modal';
import BotaoSubmit from '../BotaoSubmit';
import { scale } from '../../functions/scale';

export default function GerenciamentoChamadoModal(props) {
  return (
    <Modal
      visible={props.visivel}
      style={ModalStyles.container}
      animationType='slide'
    >
      <Header />
      <LinearGradient
        style={styles.areaTextoPrincipal}
        colors={['#8D9CD3', '#FFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.45, y: 0 }}
      >
        <Text style={styles.textoPrincipal}>{props.titulo}</Text>
      </LinearGradient>
      <View style={styles.formularioTarefa}>
        <View style={[styles.areaReclamante, ModalStyles.inputArea]}>
          <Text style={styles.textoInfoChamado}>Título</Text>
          <TextInput placeholder='Título da tarefa' style={ModalStyles.input} />
        </View>
        <View style={[styles.areaReclamante, ModalStyles.inputArea]}>
          <Text style={styles.textoInfoChamado}>Reclamante</Text>
          <TextInput
            placeholder='Usuario Reclamante'
            style={ModalStyles.input}
          />
        </View>
        <View style={styles.areaTipoChamado}>
          <View style={ModalStyles.inputArea}>
            <Text style={styles.textoInfoChamado}>
              Data de abertura do chamado
            </Text>
            <TextInput placeholder='17/09/2024' style={ModalStyles.input} />
          </View>
          <View style={ModalStyles.inputArea}>
            <Text style={styles.textoInfoChamado}>Tipo do chamado</Text>
            <TextInput
              placeholder='Tarefa'
              style={[ModalStyles.input, styles.tipoChamado]}
            />
          </View>
        </View>
        <View style={[styles.areaDescricao, ModalStyles.inputArea]}>
          <Text style={styles.textoInfoChamado}>Descrição</Text>
          <TextInput placeholder='Descrição' style={ModalStyles.input} />
        </View>
      </View>

      <BotaoSubmit
        text='Criar nova tarefa'
        action={() => {
          props.setVisible(false);
          props.setTexto('');
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
  areaTipoChamado: {
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
