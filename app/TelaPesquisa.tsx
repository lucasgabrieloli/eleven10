import { View, Text, StyleSheet } from "react-native";
import Footer from "@/components/Footer";

export default function TelaPesquisa(){

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