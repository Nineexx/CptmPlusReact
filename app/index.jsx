import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {

  const [open, setOpen] = useState(false);

  const options = [
    "Auxílio com Mobilidade",
    "Denúncia Criminal",
    "Problema na Estrutura",
    "Ajuda com Localização",
  ];

  return (
    <View style={styles.container}>
        <View style={styles.navbar}>
          <Image style={styles.logo}source={require('./logocptm.png')}/>
        </View>
        <Text style={styles.text}>Acionamento de Ajuda</Text>
        <Image style={styles.sinal} source={require('./sinal.png')}></Image>

        <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={styles.dropdownHeader}
          onPress={() => setOpen(!open)}
          activeOpacity={0.8}
        >
          <Text style={styles.headerText}>
            Selecione uma opção {open ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>

        {open && (
          <View style={styles.dropdownList}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  console.log("Selecionado:", option);
                  setOpen(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

        <View>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Acionar Ajuda</Text>
          </Pressable>
        </View>
      </View>

  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FFF',
    textAlign:'center',
    alignItems: 'center',
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
    fontWeight: 'bold',
    paddingBottom: 25,
  },
  dropdownContainer:{
    width: '80%',
    marginBottom: 30,
  },
  dropdownHeader: {
    backgroundColor: "#EE3338",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  dropdownList: {
    backgroundColor: "#f1948a",
    marginTop: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  dropdownItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e74c3c",
  },
  dropdownItemText: {
    color: "#000",
    textAlign: "center",
    fontWeight: 'bold',
  },
  button:{
    padding: 23,
    backgroundColor:"#EE3338",
    borderRadius: 100,
    width: '20%',
    textAlign: "center",
    justifyContent:'center',
    borderWidth: 15,
    borderColor: '#D9D9D9',
    height: 175,
    width: 175,
  },
  buttonText:{
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  sinal:{
    marginBottom:40,
  }
})