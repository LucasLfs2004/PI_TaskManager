import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { scale } from '../../functions/scale';
import { useNavigation } from '@react-navigation/native';

import { useUserStore } from '../../store/userStore';
import useAuth from '../../hooks/useAuth';

const MenuLateral = props => {
  const navigation = useNavigation();

  const { userData, userAuth } = useUserStore();

  const { signOutUser } = useAuth();

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
        <TouchableOpacity style={styles.ItemMenu} onPress={() => signOutUser()}>
          <View style={styles.icon}>
            <Image
              source={require('../../../assets/logout.png')}
              color={styles.ItemMenuColor.color}
            />
          </View>
          <Text style={styles.ItemMenuColor}>Sair</Text>
        </TouchableOpacity>
      </View>
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
