import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const CadastroScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  const handleSubmit = () => {
    if (formData.senha !== formData.confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    // Aqui você pode adicionar lógica de envio ao backend
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/cptm.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../../assets/images/user.png')} style={styles.userIcon} />
        </TouchableOpacity>
      </View>

      {/* Título */}
      <Text style={styles.title}>Cadastro</Text>

      {/* Formulário */}
      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={formData.nome}
        onChangeText={(text) => setFormData({ ...formData, nome: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        keyboardType="numeric"
        value={formData.cpf}
        onChangeText={(text) => setFormData({ ...formData, cpf: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={formData.senha}
        onChangeText={(text) => setFormData({ ...formData, senha: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        secureTextEntry
        value={formData.confirmarSenha}
        onChangeText={(text) => setFormData({ ...formData, confirmarSenha: text })}
      />

      {/* Botão de cadastro */}
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Card promocional */}
      <View style={styles.card}>
        <Image source={require('../../assets/images/cptm2.png')} style={styles.cardImage} />
        <Text style={styles.cardTitle}>Conecte-se com a CPTM do Futuro</Text>
        <Text style={styles.cardText}>
          Faça login e salve suas preferências, receba alertas sobre suas rotas e aproveite uma experiência personalizada!
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../../assets/images/homeIcon.png')} style={styles.footerIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Estacoes')}>
          <Image source={require('../../assets/images/location-pin.png')} style={styles.footerIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Rastreamento')}>
          <Image source={require('../../assets/images/trem.png')} style={styles.footerIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Ajuda')}>
          <Image source={require('../../assets/images/siren.png')} style={styles.footerIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: { width: 100, height: 40, resizeMode: 'contain' },
  userIcon: { width: 30, height: 30 },
  title: { fontSize: 22, fontWeight: 'bold', marginVertical: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5, borderRadius: 5
  },
  btn: { backgroundColor: '#007bff', padding: 12, borderRadius: 5, marginTop: 10 },
  btnText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  card: {
    backgroundColor: '#f2f2f2', padding: 15, marginVertical: 20,
    borderRadius: 10, alignItems: 'center'
  },
  cardImage: { width: 200, height: 100, resizeMode: 'contain' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10, textAlign: 'center' },
  cardText: { textAlign: 'center', fontSize: 14, marginBottom: 10 },
  footer: {
    flexDirection: 'row', justifyContent: 'space-around',
    paddingVertical: 15, borderTopWidth: 1, borderColor: '#ccc'
  },
  footerIcon: { width: 30, height: 30 }
});

export default CadastroScreen;
