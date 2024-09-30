import React, { useState } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';

export default function Header() {
  const [nomeUsuario, setNomeUsuario] = useState('Usuário Fulano');

  return (
    <View style={styles.container}>
      <View style={styles.areaBanner}>
        <Image
          source={require('../../../assets/banner.png')}
          style={styles.banner}
        />
      </View>
      <Text style={styles.nomeUsuario}>{nomeUsuario}</Text>
      <View style={styles.areaIcone}>
        <Image 
        source={require('../../../assets/userIcon.png')} 
          style={styles.iconeUsuario}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#29445B',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 100,
  },
  areaBanner: {
    flex: 1,
  },
  banner: {
    width:120,
    height: '50%',
    marginLeft: 14,
  },
  nomeUsuario: {
    color: '#F5F8FA',
    marginLeft: 60
  },
  areaIcone:{
    flex: 1,
  },
  iconeUsuario:{
    height: 50,
    width: 50,
    marginLeft: 20
  }
});
