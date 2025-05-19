import { View, Text, StyleSheet, TextInput } from "react-native";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function TelaPesquisa(){

    const [pesquisa, setPesquisa] = useState('')

    return(
        <View style={styles.root}>
            <View style={styles.header}>
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
        width: "90%",
        height: "40%",
        borderRadius: 10,
        backgroundColor: "#F8F8FF",
        justifyContent: "center",
        paddingLeft: 20,
        borderColor: "lightgray",
        borderWidth: 0.8,
    },
  
})