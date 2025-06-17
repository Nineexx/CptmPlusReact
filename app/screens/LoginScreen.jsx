import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = () => {
    if (formData.email && formData.password) {
      Alert.alert('Login realizado!');
      navigation.navigate('Home');
    } else {
      Alert.alert('Erro', 'Preencha e-mail e senha corretamente.');
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Esqueceu a Senha?', 'Entre em contato com o suporte ou cadastre-se novamente.', [
      { text: 'Fechar' },
      { text: 'Cadastrar', onPress: () => navigation.navigate('Cadastro') },
    ]);
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

      {/* Botão Cadastro */}
      <TouchableOpacity style={styles.cadastroBtn} onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.cadastroText}>Não tem login? Cadastre-se</Text>
        <Image source={require('../../assets/images/add-user.png')} style={styles.iconSmall} />
      </TouchableOpacity>

      {/* Formulário de Login */}
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder="E-mail"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />
        <TextInput
          placeholder="Senha"
          style={styles.input}
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
        />
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.link}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
          <Text style={styles.loginText}>Entrar</Text>
        </TouchableOpacity>
      </View>

      {/* Card Promocional */}
      <View style={styles.card}>
        <Image source={require('../../assets/images/cptm2.png')} style={styles.cardImage} />
        <Text style={styles.cardTitle}>Conecte-se com a CPTM do Futuro</Text>
        <Text style={styles.cardText}>Faça login e salve suas preferências, receba alertas sobre suas rotas e aproveite uma experiência personalizada!</Text>
        <TouchableOpacity style={styles.cadastroBtn} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.cadastroText}>Cadastre-se</Text>
        </TouchableOpacity>
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
  cadastroBtn: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  cadastroText: { fontSize: 16, marginRight: 10 },
  iconSmall: { width: 24, height: 24 },
  form: { marginTop: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5, borderRadius: 5 },
  link: { color: '#007bff', textAlign: 'right', marginVertical: 5 },
  loginBtn: { backgroundColor: '#007bff', padding: 12, borderRadius: 5, marginTop: 10 },
  loginText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  card: { backgroundColor: '#f2f2f2', padding: 15, marginVertical: 20, borderRadius: 10, alignItems: 'center' },
  cardImage: { width: 200, height: 100, resizeMode: 'contain' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10, textAlign: 'center' },
  cardText: { textAlign: 'center', fontSize: 14, marginBottom: 10 },
  footer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, borderTopWidth: 1, borderColor: '#ccc' },
  footerIcon: { width: 30, height: 30 },
});

export default LoginScreen;
