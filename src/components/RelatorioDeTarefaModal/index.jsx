import react from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import Header from '../Header';
import { LinearGradient } from 'expo-linear-gradient';
import { ModalStyles } from '../CommonStyles/Modal';
import BotaoSubmit from '../BotaoSubmit';
import { scale } from '../../functions/scale';

export default function RelatorioDeTarefaModal(props) {
  return (
    <Modal
      visible={props.visivel}
      style={ModalStyles.container}
      animationType='slide'
    >
      <Header />
      <View style={styles.container}>
        <LinearGradient
          style={styles.areaTextoPrincipal}
          colors={['#8D9CD3', '#FFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.45, y: 0 }}
        >
          <Text style={styles.textoPrincipal}>{props.titulo}</Text>
        </LinearGradient>
        <View style={styles.areaPeriodo}>
          <Text style={styles.tituloPesquisa}>Período da pesquisa</Text>
          <View style={styles.areaDatas}>
            <View style={ModalStyles.inputArea}>
              <Text>Data inicial</Text>
              <TextInput placeholder='00/00/0000' style={ModalStyles.input} />
            </View>
            <View style={ModalStyles.inputArea}>
              <Text>Data Final</Text>
              <TextInput placeholder='00/00/0000' style={ModalStyles.input} />
            </View>
          </View>
        </View>
        <View style={styles.areaRelatorio}>
          <View style={styles.areaCabecalhoRelatorio}>
            <Text style={styles.tituloRelatorio}>
              Quais tarefas deseja consultar?
            </Text>
            <TextInput style={[ModalStyles.input, styles.inputTarefa]} />
          </View>
          <TouchableOpacity style={styles.botaoGerarRelatorio}>
            <Text style={styles.textGerarRelatorio}>Gerar relatório</Text>
          </TouchableOpacity>
        </View>
        <BotaoSubmit
          text={'Voltar ao menu'}
          action={() => {
            props.setVisivel(false);
            props.setTexto('');
          }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: scale(16),
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
  areaPeriodo: {
    marginHorizontal: scale(10),
    marginTop: scale(12),
    marginVertical: scale(8),
  },
  tituloPesquisa: {
    marginBottom: 10,
  },
  areaDatas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: scale(22),
    marginBottom: 20,
  },
  input: {
    borderStyle: 'solid',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#DCE2E5',
    padding: 4,
  },
  inputTarefa: {
    width: '40%',
  },
  areaRelatorio: {
    marginHorizontal: scale(10),
    marginRight: 20,
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#DCE2E5',
    backgroundColor: '#F5F8FA',
    borderRadius: 8,
    height: 200,
  },
  areaCabecalhoRelatorio: {
    marginTop: -40,
    paddingLeft: 20,
  },
  tituloRelatorio: {
    marginBottom: scale(8),
  },
  botaoGerarRelatorio: {
    marginHorizontal: scale(20),
    borderRadius: scale(10),
    marginTop: 10,
    backgroundColor: '#51B853',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  textGerarRelatorio: {
    color: '#fff',
    fontSize: scale(18),
    fontWeight: '500',
  },
});
