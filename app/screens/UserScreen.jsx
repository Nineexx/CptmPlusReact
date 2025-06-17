// UsuarioScreen.jsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const UsuarioScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    nome: 'Usuário Exemplo',
    email: 'exemplo@email.com',
    cpf: '000.000.000-00',
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('userData');
        if (data) {
          setUserData(JSON.parse(data));
        }
      } catch (error) {
        console.log('Erro ao carregar dados do usuário', error);
      }
    };
    getUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    await AsyncStorage.removeItem('userData');
    Alert.alert('Logout', 'Você saiu da sua conta.');
    navigation.replace('Home');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/cptm.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../../assets/images/homeIcon.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileCard}>
        <Image source={require('../../assets/images/user.png')} style={styles.avatar} />
        <Text style={styles.name}>{userData.nome}</Text>
        <Text style={styles.email}>{userData.email}</Text>
        <Text style={styles.cpf}>{userData.cpf}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Estacoes')}>
        <Text style={styles.buttonText}>Ver Estações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UsuarioScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  icon: {
    width: 30,
    height: 30,
  },
  profileCard: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    marginTop: 5,
  },
  cpf: {
    fontSize: 14,
    marginTop: 3,
    color: '#666',
  },
  button: {
    backgroundColor: '#EE3338',
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
