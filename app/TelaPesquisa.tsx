import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function TelaPesquisa(){

    const [pesquisa, setPesquisa] = useState('')

    return(
        <View style={styles.root}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconleft}>
                    <Image
                    source={require('../assets/images/setavoltar.png')}
                    style={styles.iconleft}
                    />
                </TouchableOpacity>
                <TextInput
                style={styles.searchinput}
                placeholder="Procurar"
                placeholderTextColor={"#a9a9a9"}
                value={pesquisa}
                onChangeText={setPesquisa}
                />
            </View>

            <Footer/>
        </View>
    )

}

const styles = StyleSheet.create({
    root:{
        flex: 1,
        backgroundColor: "#fff",
    },  
    header:{
        position: "absolute",
        top: 0,
        width: "100%",
        height: "12%",
        justifyContent: "center",
        alignItems: "center",
    },
    searchinput:{
        width: "60%",
        height: "40%",
        borderRadius: 10,
        backgroundColor: "#F8F8FF",
        justifyContent: "center",
        paddingLeft: 20,
        borderColor: "lightgray",
        borderWidth: 0.8,
    },
    iconleft: {
        position: 'absolute',
        left: 16,
        top: '50%',
        transform: [{ translateY: -12 }],
        width: 25,
        height: 25,
        resizeMode: 'contain',
    }
  
})