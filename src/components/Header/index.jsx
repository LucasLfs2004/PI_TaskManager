import React, { useState } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { scale } from '../../functions/scale';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../../store/userStore';

export default function Header({ removePaddingTop }) {
  const { userData, userAuth } = useUserStore();
  const navigation = useNavigation();
  return (
    <View style={[styles.container, { paddingTop: 0 }]}>
      <Text style={styles.nomeUsuario}>
        {userAuth?.displayName ? userAuth.displayName : userData?.nome}
      </Text>
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
    paddingHorizontal: scale(20),
  },

  nomeUsuario: {
    color: '#F5F8FA',
  },
  areaIcone: {
    // flex: 1,
  },
  iconeUsuario: {
    height: 42,
    width: 42,
  },
});
