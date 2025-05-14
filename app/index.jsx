import { Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
        <View style={styles.navbar}>
          <Image style={styles.logo}source={require('./logocptm.png')}/>
        </View>
        <Text style={styles.text}>Acionamento de Ajuda</Text>
        <View style={styles.botao}>
          <Text>Acionar Ajuda</Text>
        </View>
      </View>

  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FFF',
    textAlign:'center',
  },
  navbar:{
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor:"#EE3338",
    width: '100%',
    height: '10%',
    justifyContent: "center",
    alignItems: "center",
  },
  logo:{
    width: 70,
    height: 70,
  },
  text:{
    color:'#000',
    paddingTop: 35,
    textAlign: "center",
    fontSize: 30,
  },
  botao:{
    padding: 5,
    backgroundColor:"#EE3338",
    borderRadius: 100,
    width: '20%',
    textAlign: "center",
  }
})