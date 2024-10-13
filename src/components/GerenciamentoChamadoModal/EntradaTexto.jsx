import { View, Text, TextInput } from 'react-native';


export function EntradaTexto({placeholder, modelValue, texto, style}) {
return (
    <View style={style.view}>
      <Text style={style.text}>{placeholder}</Text>
      <TextInput placeholder={texto} onChangeText={modelValue} style={style.textInput} />
    </View>
);
}
