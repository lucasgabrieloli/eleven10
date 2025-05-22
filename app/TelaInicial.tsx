import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import * as ImagePicker from 'expo-image-picker'

export default function TelaInicial (){

    const router = useRouter();
    
    return(
        <View style={styles.root}>   
            <Header/>
            
            <Footer/>
        </View>
    )
}

const styles = StyleSheet.create({
    root:{
        flex: 1,
        backgroundColor: "#fff",
    },
})