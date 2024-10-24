import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

export function EntradaTexto({
  placeholder,
  modelValue,
  texto,
  style,
  secureTextEntry = false,
}) {
  const [emFoco, estaEmFoco] = useState(false);
  return (
    <View style={style.view}>
      <Text style={style.text}>{placeholder}</Text>
      <TextInput
        placeholder={texto}
        onChangeText={modelValue}
        style={style.textInput}
        placeholderTextColor={emFoco ? '#B0BEC5' : '#D3D3D3'}
        onFocus={() => estaEmFoco(true)}
        onBlur={() => estaEmFoco(false)}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}
