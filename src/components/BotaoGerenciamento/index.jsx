import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Button } from 'react-native';
import { scale } from '../../functions/scale';

export default function BotaoGerenciamento(props) {
  return (
    <TouchableOpacity style={styles.botao} onPress={props.abrir}>
      <Text style={styles.texto}>{props.texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#12486A',
    height: 50,
    padding: 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 8,
  },
  texto: {
    fontSize: scale(16),
    fontWeight: '500',
    color: '#F5F8FA',
  },
});
