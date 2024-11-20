import moment from 'moment';
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { scale } from '../../functions/scale';

const InputDate = ({
  placeholder,
  modelValue,
  value,
  texto,
  style,
  secureTextEntry = false,
  setDateValid,
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const isValidDate = dateString => {
    // Verifica se a string corresponde ao formato DD/MM/YYYY
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (!regex.test(dateString)) {
      return false;
    }

    const dateMoment = moment(dateString, 'DD/MM/YYYY', true);
    const tomorrow = moment().add(1, 'days').startOf('day');

    const dateIsValid =
      dateMoment.isSameOrAfter(tomorrow) && dateMoment.isValid();
    setDateValid(dateIsValid);
    return dateIsValid;
  };

  const formatDate = input => {
    // Remove qualquer caractere que não seja número
    const cleaned = input.replace(/\D/g, '');

    // Formata a data no padrão DD/MM/YYYY enquanto o usuário digita
    if (cleaned.length <= 2) {
      return cleaned;
    } else if (cleaned.length <= 4) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    } else if (cleaned.length <= 8) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(
        4,
        8,
      )}`;
    }

    // Limita a entrada a 10 caracteres (DD/MM/YYYY)
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(
      4,
      8,
    )}`;
  };

  const handleDateChange = input => {
    const formattedDate = formatDate(input); // Formata a data conforme digitada
    modelValue(formattedDate);

    const dateValid = isValidDate(formattedDate);

    // Valida o formato de data quando o valor é alterado
    if (formattedDate.length === 10) {
      // O formato DD/MM/YYYY tem 10 caracteres
      if (!dateValid) {
        setErrorMessage(
          'Data inválida, a data deve ser posterior ao dia de hoje e no formato dd/mm/yyyy',
        );
      } else {
        setErrorMessage('Data Válida');
      }
    } else {
      setErrorMessage('Por favor insira uma data válida'); // Limpa a mensagem de erro enquanto o usuário digita
    }
  };
  const [emFoco, estaEmFoco] = useState(false);
  return (
    <View style={style.view}>
      <Text style={style.text}>{placeholder}</Text>
      <TextInput
        placeholder={texto}
        onChangeText={input => handleDateChange(input)}
        value={value.toString()}
        style={style.textInput}
        placeholderTextColor={emFoco ? '#B0BEC5' : '#D3D3D3'}
        onFocus={() => estaEmFoco(true)}
        onBlur={() => estaEmFoco(false)}
        secureTextEntry={secureTextEntry}
        maxLength={10}
      />
      <Text style={{ fontSize: scale(10) }}>{errorMessage}</Text>
    </View>
  );
};

export default InputDate;
