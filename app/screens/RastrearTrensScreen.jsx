import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Rastreamento = () => {
  const navigation = useNavigation();
  const [linhaSelecionada, setLinhaSelecionada] = useState(null);
  const [estacaoSelecionada, setEstacaoSelecionada] = useState(null);
  const [sentidoSelecionado, setSentidoSelecionado] = useState(null);

  const linhas = ['Rubi', 'Turquesa', 'Coral', 'Safira', 'Jade'];

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
      <Text style={styles.title}>Rastreamento de Trens</Text>

      {/* Seleção de Linha */}
      <View style={styles.section}>
        <Text style={styles.label}>Selecione uma Linha:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {linhas.map((linha, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                linhaSelecionada === linha && styles.optionButtonSelected,
              ]}
              onPress={() => setLinhaSelecionada(linha)}
            >
              <Text
                style={[
                  styles.optionButtonText,
                  linhaSelecionada === linha && styles.optionButtonTextSelected,
                ]}
              >
                {linha}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Seleção de Estação (Placeholder) */}
      <View style={styles.section}>
        <Text style={styles.label}>Estação (a ser implementado)</Text>
      </View>

      {/* Seleção de Sentido (Placeholder) */}
      <View style={styles.section}>
        <Text style={styles.label}>Sentido (a ser implementado)</Text>
      </View>

      {/* Resultado (Placeholder) */}
      <View style={styles.resultBox}>
        <Text style={styles.resultText}>Status: (informações serão exibidas aqui)</Text>
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  logo: { width: 100, height: 40, resizeMode: 'contain' },
  userIcon: { width: 30, height: 30 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  section: { marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 10 },
  optionButton: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginRight: 10,
  },
  optionButtonSelected: {
    backgroundColor: '#EE3338',
  },
  optionButtonText: {
    fontSize: 14,
    color: '#333',
  },
  optionButtonTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultBox: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#ccc',
    marginTop: 30,
  },
  footerIcon: {
    width: 30,
    height: 30,
  },
});

export default Rastreamento;
