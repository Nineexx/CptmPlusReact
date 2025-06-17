// EstacoesScreen.jsx
import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const EstacoesScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/cptm.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../../assets/images/user.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Título */}
      <Text style={styles.title}>Estações</Text>

      {/* Texto explicativo */}
      <Text style={styles.paragraph}>
        Confira abaixo a lista de estações disponíveis por linha. Toque em uma estação para mais detalhes.
      </Text>

      {/* Card exemplo de estação */}
      <View style={styles.stationCard}>
        <Text style={styles.stationName}>Estação Luz</Text>
        <Text style={styles.stationLine}>Linha 7 - Rubi</Text>
      </View>

      <View style={styles.stationCard}>
        <Text style={styles.stationName}>Estação Brás</Text>
        <Text style={styles.stationLine}>Linha 11 - Coral</Text>
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
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain'
  },
  icon: {
    width: 30,
    height: 30
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20
  },
  stationCard: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },
  stationName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  stationLine: {
    fontSize: 14,
    color: '#666'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#ccc',
    marginTop: 30
  },
  footerIcon: {
    width: 30,
    height: 30
  }
});

export default EstacoesScreen;
