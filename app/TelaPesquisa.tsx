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
                placeholder="Procurar atleta..."
                placeholderTextColor={"gray"}
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
        height: "10%",
        justifyContent: "center",
        alignItems: "center"
    },
    searchinput:{
        borderWidth: 2,
        borderColor: "lightgray",
        width: "90%",
        height: "45%",
        borderRadius: 3,
        backgroundColor: "white",
        justifyContent: "center"
    },
  
})