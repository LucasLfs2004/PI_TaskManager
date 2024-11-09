import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';
import { scale } from '../../functions/scale';
import BotaoSubmit from '../../components/BotaoSubmit';
import { useNavigation } from '@react-navigation/native';

const TarefaScreen = ({ route }) => {
  const { task } = route.params;
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Header backButton={true} />
      <View style={styles.content}>
        <Text style={styles.titleScreen}>{task.titulo}</Text>
        <View
          style={{
            backgroundColor: '#fff',
            padding: scale(10),
            borderRadius: scale(8),
          }}
        >
          <Text style={styles.desc}>{task.descricao}</Text>
          <Text style={[styles.desc, { marginTop: scale(12) }]}>
            Responsável: {task.responsavel}
          </Text>
          <Text style={styles.desc}>Criado por: {task.requerente}</Text>
          <Text
            style={[styles.text, { textAlign: 'right', marginTop: scale(12) }]}
          >
            Tipo: {task.tipo}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', columnGap: scale(64) }}>
          <View>
            <Text style={styles.desc}>Criado em</Text>
            <View style={styles.prazoView}>
              <Image
                style={{ width: scale(24), height: scale(24) }}
                source={require('../../../assets/calendar.png')}
              />
              <Text style={styles.date}>{task.aberturaData}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.desc}>Prazo</Text>
            <View style={styles.prazoView}>
              <Image
                style={{ width: scale(24), height: scale(24) }}
                source={require('../../../assets/calendar.png')}
              />
              <Text style={styles.date}>{task.prazoData}</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: scale(48) }}>
          {!task.concluido && (
            <BotaoSubmit
              text={'Concluir tarefa'}
              action={() => navigation.goBack()}
            />
          )}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.btn, { backgroundColor: '#115D8Cdd' }]}
          >
            <Text style={styles.textBtn}>Voltar</Text>
          </TouchableOpacity>
          {/* <BotaoSubmit text={'Voltar'} action={() => navigation.goBack()} /> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TarefaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FA',
  },
  content: {
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    flexDirection: 'column',
    rowGap: scale(8),
  },
  desc: {
    // backgroundColor: '#fff',
    borderRadius: scale(13),
    // padding: scale(10),
    fontWeight: '600',
  },
  titleScreen: {
    color: '#000',
    fontWeight: '600',
    fontSize: scale(24),
    textAlign: 'center',
  },
  text: {
    fontWeight: '500',
    fontSize: scale(16),
  },
  prazoView: {
    flexDirection: 'row',
    columnGap: scale(12),
    marginTop: scale(8),
  },
  date: {
    fontWeight: '500',
    fontSize: scale(16),
  },
  btn: {
    marginTop: scale(12),
    backgroundColor: '#51B853',
    borderRadius: scale(10),
    width: scale(280),
    height: scale(34),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 'auto',
  },
  textBtn: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: '500',
  },
});
