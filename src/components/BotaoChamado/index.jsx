import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function BotaoChamado() {
  return (
    <View style={styles.container}>
      <Text style={styles.textoPrincipal}>Gerenciar tarefa 1</Text>
      <TouchableOpacity style={styles.botao}>
        <Text style={styles.textoBotao}>Consulte chamado</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    height: 60,
    shadowColor: 'black',
  },
  textoPrincipal: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  botao: {
    backgroundColor: '#36B236',
    padding: 8,
    borderRadius: 10,
  },
  textoBotao: {
    color: '#F5F8FA',
  },
});
