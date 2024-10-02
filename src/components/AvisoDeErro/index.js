import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default function AvisoDeErro(props) {

  if (props.visivel === false) {
    return null;
  } else if(props.visivel === true){
    return (
      <View style={styles.container}>
        <Text style={styles.texto}>{props.mensagem}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#de3e3e',
  },
  texto: {
    color: '#F5F8FA',
  },
});
