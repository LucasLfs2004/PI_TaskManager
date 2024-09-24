import React from "react";
import { StyleSheet, Modal, View, Text, TextInput, Button } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Header from "./Header";

export default function GerenciamentoChamadoModal(props){
    return(
        <Modal visible={props.visivel} animationType='slide'>
        <Header />
        <LinearGradient
        style={styles.areaTextoPrincipal}
        colors={['#8D9CD3', '#FFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.45, y: 0 }}
      >
        <Text style={styles.textoPrincipal}>{props.titulo}</Text>
      </LinearGradient>
        <View style={styles.formularioTarefa}>
          <View style={styles.areaReclamante}>
            <Text style={styles.textoInfoUsuario}>Reclamante</Text>
            <TextInput placeholder='Nome do Usuário' style={styles.input} />
          </View>
          <View style={styles.areaTipoUsuario}>
            <View >
              <Text style={styles.textoInfoUsuario}>
                N° do CPF
              </Text>
              <TextInput placeholder='' style={[styles.input, styles.inputCPF]} />
            </View>
            <View>
              <Text style={styles.textoInfoUsuario}>Tipo do Usuário</Text>
              <TextInput
                placeholder=''
                style={[styles.input, styles.tipoUsuario]}
              />
            </View>
          </View>
          <View style={styles.areaEmail}>
            <Text style={styles.textoInfoUsuario}>E-mail do usuário</Text>
            <TextInput placeholder='' style={styles.input} />
          </View>
          <View style={styles.areaSenha}>
            <Text style={styles.textoInfoUsuario}>Senha</Text>
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
    marginTop: 20,
    marginBottom: 20,
    height: 80,
    justifyContent: 'center',
    paddingLeft: 20
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
    areaTipoUsuario: {
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
    inputCPF:{
      width: 190
    },
    tipoUsuario: {
      width: 150,
    },
    textoInfoUsuario: {
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