import React from 'react';
import {
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { scale } from '../../functions/scale';
import { useNavigation } from '@react-navigation/native';

import { Logout } from '../../../assets/svg';
import { auth } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useUserStore } from '../../store/userStore';

const MenuLateral = props => {
  const navigation = useNavigation();

  const { userData, userAuth } = useUserStore();

  //   const handleNavigateLogout = () => {
  //     dispatch(
  //       logout(() => {
  //         navigation.dispatch(
  //           CommonActions.reset({
  //             index: 0,
  //             routes: [
  //               {
  //                 name: 'AreaDeslogada',
  //                 state: {
  //                   routes: [
  //                     { name: 'SelectLogin' }, // Certifique-se que SelectLogin é uma tela no stack correto
  //                   ],
  //                 },
  //               },
  //             ],
  //           }),
  //         );
  //       }),
  //     );
  //   };

  return (
    <View style={styles.ConteinerMenu}>
      <>
        <View style={{ paddingVertical: scale(15) }}>
          <Image
            source={require('../../../assets/userIcon.png')}
            style={{
              width: scale(57),
              height: scale(57),
              borderRadius: scale(28.5),
            }}
          />
        </View>
        <View style={{ justifyContent: 'center', marginBottom: scale(15) }}>
          <Text style={styles.ItemMenuColor}>
            {userAuth?.displayName && userAuth?.displayName !== null
              ? userAuth?.displayName
              : userData?.nome}
          </Text>
          <Text
            style={[
              styles.ItemMenuColor,
              { fontWeight: '400', fontSize: scale(14) },
            ]}
          >
            {userAuth?.email}
          </Text>
        </View>
      </>

      <View style={styles.LineDivisor}>
        <TouchableOpacity style={styles.ItemMenu}>
          <View style={styles.icon}>
            <Image
              source={require('../../../assets/logout.png')}
              color={styles.ItemMenuColor.color}
            />
          </View>
          <Text style={styles.ItemMenuColor}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.LineDivisor}> */}
      {/* <TouchableOpacity
          onPress={() => {
            props.tabUserActive(0);
            navigation.navigate('PerfilUser');
          }}
          style={styles.ItemMenu}
        >
          <View style={styles.icon}>
            <User color={styles.ItemMenuColor.color} />
          </View>
          <Text style={styles.ItemMenuColor}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.setTabActive(0);
            navigation.navigate('ConfiguracoesScreen');
          }}
          style={styles.ItemMenu}
        >
          <View style={styles.icon}>
            <Setings color={styles.ItemMenuColor.color} />
          </View>
          <Text style={styles.ItemMenuColor}>Configurações</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.tabUserActive(3);
            navigation.navigate('PerfilUser');
            // Actions.perfilUser();
          }}
          style={styles.ItemMenu}
        >
          <View style={styles.icon}>
            <Galery color={styles.ItemMenuColor.color} />
          </View>
          <Text style={styles.ItemMenuColor}>Minhas Listas</Text>
        </TouchableOpacity> */}
      {/* <TouchableOpacity style={styles.ItemMenu}>
          <View style={styles.icon}>
            <Logout color={styles.ItemMenuColor.color} />
          </View>
          <Text style={styles.ItemMenuColor}>Sair</Text>
        </TouchableOpacity>
      </View> */}
      {/* <View style={styles.LineDivisor}>
        <TouchableOpacity
          onPress={() => {
            props.tabUserActive(0);
            navigation.navigate('PerfilUser');
          }}
          style={styles.ItemMenu}
        >
          <View style={styles.icon}>
            <User color={styles.ItemMenuColor.color} />
          </View>
          <Text style={styles.ItemMenuColor}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.setTabActive(0);
            navigation.navigate('ConfiguracoesScreen');
          }}
          style={styles.ItemMenu}
        >
          <View style={styles.icon}>
            <Setings color={styles.ItemMenuColor.color} />
          </View>
          <Text style={styles.ItemMenuColor}>Configurações</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.tabUserActive(3);
            navigation.navigate('PerfilUser');
            // Actions.perfilUser();
          }}
          style={styles.ItemMenu}
        >
          <View style={styles.icon}>
            <Galery color={styles.ItemMenuColor.color} />
          </View>
          <Text style={styles.ItemMenuColor}>Minhas Listas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNavigateLogout}
          style={styles.ItemMenu}
        >
          <View style={styles.icon}>
            <Logout color={styles.ItemMenuColor.color} />
          </View>
          <Text style={styles.ItemMenuColor}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.LineDivisor}>
        <TouchableOpacity
          onPress={() => {
            props.setTabBar(false);
            navigation.navigate('AreaDeslogada', { Screen: 'SelectLogin' });
          }}
          style={styles.ItemMenu}
        >
          <View style={styles.icon}>
            <Logout color={styles.ItemMenuColor.color} />
          </View>
          <Text style={styles.ItemMenuColor}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.LineDivisor}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Termos')}
          style={styles.ItemMenu}
        >
          <View style={styles.icon}>
            <Termos color={styles.ItemMenuColor.color} />
          </View>
          <Text style={styles.ItemMenuColor}>Política de Privacidade</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Doubts')}
          style={styles.ItemMenu}
        >
          <View style={styles.icon}>
            <Questions color={styles.ItemMenuColor.color} />
          </View>
          <Text style={styles.ItemMenuColor}>Dúvidas</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default MenuLateral;

const styles = StyleSheet.create({
  ConteinerMenu: {
    flex: 1,
    backgroundColor: '#f5f8fa',
    paddingHorizontal: scale(27),
    paddingVertical: scale(50),
  },
  LineDivisor: {
    paddingVertical: scale(20),
    borderBottomWidth: 2,
    borderBottomColor: '#29445B',
  },
  ItemMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(10),
  },
  ItemMenuColor: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: scale(16),
    color: '#000',
  },
  icon: {
    width: scale(23),
    height: scale(23),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(24),
  },
  iconBig: {
    width: scale(28),
    height: scale(28),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
