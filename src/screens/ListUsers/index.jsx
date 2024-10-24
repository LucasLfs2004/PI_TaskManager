import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import { falseList } from '../../../assets/falseDb';
import TaskCard from '../../components/TaskCard';
import Header from '../../components/Header';
import { scale } from '../../functions/scale';
import { collection, getDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import GerenciamentoUsuarioModal from '../../components/GerenciamentoUsuarioModal';

const ListUsers = () => {
  const [usuario, setUsuario] = useState();
  const [
    modalGerenciamentoUsuarioVisible,
    setModalGerenciamentoUsuarioVisible,
  ] = useState(false);

  const usersCollection = collection(db, 'usuario');
  const getUsuario = async () => {
    const q = query(usersCollection);
    const collection = await getDocs(q);
    let user = [];
    collection.forEach(element => {
      const dadosUsuario = element.data();
      user.push(dadosUsuario);
      //   console.log(element.id, ' => ', element.data());
    });
    console.log('user no listUsers: ', user);
    setUsuario(user);
  };

  console.log('usuario no listUsers: ', usuario);

  useEffect(() => {
    console.log('useEffect');
    getUsuario();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header removePaddingTop={true} backButton={true} />
      <ScrollView style={{ marginBottom: scale(120) }}>
        <TouchableOpacity
          style={styles.btnCadastro}
          onPress={() => {
            setModalGerenciamentoUsuarioVisible(true);
          }}
        >
          <Text style={styles.textBtn}>Cadastrar usuário</Text>
        </TouchableOpacity>
        {usuario && usuario.length === 0 ? (
          <Text style={styles.noUsersText}>Nenhum usuário cadastrado.</Text>
        ) : (
          usuario?.map((item, key) => {
            console.log('usuário de indice ', key, ': ', item);
            return (
              <View key={key} style={styles.userCard}>
                <Text style={styles.name}>
                  {item?.user?.nome} - {item?.user?.tipo}
                </Text>
                <Text style={styles.text}>{item?.user?.email}</Text>
                <Text style={styles.text}>CPF: {item?.user?.cpf}</Text>
                {/* <Text>{item?.user?.tipo}</Text> */}
                <Text style={styles.text}>
                  {item?.user?.isAdmin
                    ? 'Acessos de admin'
                    : 'Sem acessos de admin'}
                </Text>
                <View style={styles.btnArea}>
                  <TouchableOpacity style={styles.btnCadastro}>
                    <Text style={styles.textBtn}>Ver tarefas</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.btnCadastro,
                      { backgroundColor: '#ff0000dd' },
                    ]}
                  >
                    <Text style={styles.textBtn}>Excluir usuário</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
      <GerenciamentoUsuarioModal
        visivel={modalGerenciamentoUsuarioVisible}
        titulo={'Gerenciar Usuario'}
        setVisivel={setModalGerenciamentoUsuarioVisible}
        setTexto={() => {}}
      />
    </SafeAreaView>
  );
};

export default ListUsers;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  userCard: {
    backgroundColor: '',
    borderColor: 'transparent',
    borderBlockEndColor: '#12486A',
    borderBottomColor: '#12486A',
    borderEndColor: '#12486A',
    borderWidth: scale(1),
    paddingTop: scale(12),
    paddingHorizontal: scale(12),
  },
  name: {
    color: '#12486A',
    fontWeight: '700',
    fontSize: scale(16),
  },
  text: {
    fontSize: scale(14),
    fontWeight: '500',
  },

  btnCadastro: {
    backgroundColor: '#115D8Cdd',
    // marginTop: scale(12),
    marginVertical: scale(16),
    borderRadius: scale(10),
    width: scale(180),
    height: scale(34),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 'auto',
  },
  textBtn: {
    color: '#fff',
    fontWeight: '600',
  },
  btnArea: {
    flexDirection: 'row',
  },
});
