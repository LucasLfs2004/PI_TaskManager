import React from "react";
import { StyleSheet, Modal, View, Text, TextInput, Button } from "react-native";
import Header from "./Header";

export default function GerenciamentoChamadoModal(props){
    return(
        <Modal visible={props.visivel} animationType='slide'>
        <Header />
        <View style={styles.areaTextoPrincipal}>
          <Text style={styles.textoPrincipal}>{props.titulo}</Text>
        </View>
        <View style={styles.formularioTarefa}>
          <View style={styles.areaReclamante}>
            <Text style={styles.textoInfoChamado}>Reclamante</Text>
            <TextInput placeholder='Usuario Reclamante' style={styles.input} />
          </View>
          <View style={styles.areaTipoChamado}>
            <View>
              <Text style={styles.textoInfoChamado}>
                Data de abertura do chamado
              </Text>
              <TextInput placeholder='17/09/2024' style={styles.input} />
            </View>
            <View>
              <Text style={styles.textoInfoChamado}>Tipo do chamado</Text>
              <TextInput
                placeholder='Tarefa'
                style={[styles.input, styles.tipoChamado]}
              />
            </View>
          </View>
          <View style={styles.areaDescricao}>
            <Text style={styles.textoInfoChamado}>Descrição</Text>
            <TextInput placeholder='Descrição' style={styles.input} />
          </View>
        </View>
        <Button
          title='Concluir nova tarefa'
          onPress={() => {
            props.setVisivel(false);
            props.setTexto('');
          }}
        />
      </Modal>
    )
}

const styles = StyleSheet.create({
    areaTextoPrincipal: {
      backgroundColor: '#8D9CD3',
    },
    textoPrincipal: {
      color: '#3C3A9B',
      fontSize: 25,
    },
    formularioTarefa: {
      flex: 1,
    },
    areaReclamante: {
      margin: 10,
    },
    areaTipoChamado: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginRight: 10,
      marginLeft: 10,
    },
    input: {
      borderStyle: 'solid',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#000',
      backgroundColor: '#DCE2E5',
      padding: 8,
    },
    tipoChamado: {
      width: 150,
    },
    textoInfoChamado: {
      color: '#617480',
      fontSize: 10,
    },
    areaDescricao: {
      margin: 10
    }
  });