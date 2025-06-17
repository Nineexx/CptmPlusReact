import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

const AjudaScreen = () => {
  const navigation = useNavigation();
  const [ajuda, setAjuda] = useState({
    nome: '',
    email: '',
    descricao: ''
  });

  const handleSubmit = () => {
    if (ajuda.nome && ajuda.email && ajuda.descricao) {
      Alert.alert('Ajuda enviada!', 'Nossa equipe entrará em contato em breve.');
      setAjuda({ nome: '', email: '', descricao: '' });
    } else {
      Alert.alert('Erro', 'Preencha todos os campos.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ajuda</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={ajuda.nome}
        onChangeText={(text) => setAjuda({ ...ajuda, nome: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={ajuda.email}
        onChangeText={(text) => setAjuda({ ...ajuda, email: text })}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descreva sua solicitação"
        multiline
        numberOfLines={4}
        value={ajuda.descricao}
        onChangeText={(text) => setAjuda({ ...ajuda, descricao: text })}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  button: {
    backgroundColor: '#EE3338',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  link: {
    color: '#007bff',
    textAlign: 'center',
    fontSize: 14
  }
});

export default AjudaScreen;