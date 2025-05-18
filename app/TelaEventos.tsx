import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Footer from "@/components/Footer";

export default function TelaEventos(){

    return(
        <View style={styles.root}>
            <Footer/>
        </View>
    )
}

const styles = StyleSheet.create({
    root:{
        flex: 1,
        backgroundColor: "#fff",
    },
    container:{
        flex: 1,
        backgroundColor: "#3db342",
    } 
})

//FAZER UMA "ABA" ENCONTRE SUA PRÓXIMA OPORTUNIDADE

//