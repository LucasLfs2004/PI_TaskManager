import React, { useState } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { scale } from '../../functions/scale';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../../store/userStore';

export default function Header({ removePaddingTop, backButton = false }) {
  const { userData, userAuth } = useUserStore();
  const navigation = useNavigation();
  return (
    <View style={[styles.container, { paddingTop: 0 }]}>
      {backButton && (
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.btnBackImg}
            source={require('../../../assets/backIcon.png')}
          />
        </TouchableOpacity>
      )}
      <View>
        <Text style={styles.nomeUsuario}>
          {userAuth?.displayName ? userAuth.displayName : userData?.nome}
        </Text>
        <Text style={styles.cargo}>{userData?.tipo}</Text>
      </View>
      <TouchableOpacity
        style={styles.areaIcone}
        onPress={() => navigation.openDrawer()}
      >
        <Image
          source={require('../../../assets/userIcon.png')}
          style={styles.iconeUsuario}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scale(428),
    flexDirection: 'row',
    backgroundColor: '#29445B',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: scale(70),
    // paddingTop: scale(60),
    paddingHorizontal: scale(16),
  },
  btnBack: {
    width: scale(42),
    height: scale(42),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnBackImg: {
    width: scale(24),
    height: scale(24),
  },

  nomeUsuario: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: '700',
  },
  cargo: {
    color: '#fff',
    fontWeight: '500',
  },

  iconeUsuario: {
    height: scale(42),
    width: scale(42),
  },
});
