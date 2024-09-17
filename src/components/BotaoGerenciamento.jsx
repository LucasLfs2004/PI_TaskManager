import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function BotaoGerenciamento(props){
    return(
        <TouchableOpacity style={styles.botao}>
            <Text style={styles.texto}>{props.texto}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    botao:{
        backgroundColor: '#12486A',
        height: 50,
        padding: 8,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 8
    },
    texto:{
        color: '#F5F8FA'
    }
})