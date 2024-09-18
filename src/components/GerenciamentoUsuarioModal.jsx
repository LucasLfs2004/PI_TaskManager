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
            <TextInput placeholder='Nome do Usuário' style={styles.input} />
          </View>
          <View style={styles.areaTipoChamado}>
            <View>
              <Text style={styles.textoInfoChamado}>
                N° do CPF
              </Text>
              <TextInput placeholder='' style={styles.input} />
            </View>
            <View>
              <Text style={styles.textoInfoChamado}>Tipo do Usuário</Text>
              <TextInput
                placeholder=''
                style={[styles.input, styles.tipoChamado]}
              />
            </View>
          </View>
          <View style={styles.areaEmail}>
            <Text style={styles.textoInfoChamado}>E-mail do usuário</Text>
            <TextInput placeholder='' style={styles.input} />
          </View>
          <View style={styles.areaSenha}>
            <Text style={styles.textoInfoChamado}>Senha</Text>
            <TextInput placeholder='' style={styles.input} />
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
    areaEmail: {
      margin: 10
    },
    areaSenha:{
        margin: 10
    }
  });