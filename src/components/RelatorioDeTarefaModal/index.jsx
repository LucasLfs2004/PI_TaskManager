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

export default function RelatorioDeTarefaModal(props) {
  return (
    <Modal visible={props.visivel} animationType='slide'>
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
            <View>
              <Text>Data inicial</Text>
              <TextInput placeholder='00/00/0000' style={styles.input} />
            </View>
            <View>
              <Text>Data Final</Text>
              <TextInput placeholder='00/00/0000' style={styles.input} />
            </View>
          </View>
        </View>
        <View style={styles.areaRelatorio}>
          <View style={styles.areaCabecalhoRelatorio}>
            <Text style={styles.tituloRelatorio}>
              Quais tarefas deseja consultar ?
            </Text>
            <TextInput style={[styles.input, styles.inputTarefa]} />
          </View>
          <TouchableOpacity style={styles.botaoGerarRelatorio}>
            <Text>Gerar relatório</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => {
            props.setVisivel(false);
            props.setTexto('');
          }}
        >
          <Text>Voltar ao menu inicial</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginLeft: 40,
    marginTop: 20,
  },
  tituloPesquisa: {
    marginBottom: 10,
  },
  areaDatas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 40,
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
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#DCE2E5',
    borderRadius: 8,
    height: 200,
  },
  areaCabecalhoRelatorio: {
    marginTop: -40,
    paddingLeft: 20,
  },
  tituloRelatorio: {},
  botaoGerarRelatorio: {
    marginTop: 10,
    backgroundColor: '#51B853',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  botaoVoltar: {
    marginTop: 10,
    backgroundColor: '#51B853',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    marginRight: 20,
    marginLeft: 20,
  },
});
