import { View, StyleSheet, Text, FlatList, TextInput, Image, TouchableOpacity} from "react-native";
import { useState } from "react";

export default function TelaComentários(){


    return(
        <View style={styles.container}>
        <View style={styles.inputlinha}>
            <TextInput
                placeholder = "Comentar..."
                placeholderTextColor="#a9a9a9"
                style={styles.input}
            />
        <TouchableOpacity style={styles.botenviar}>
            <Image 
                source={require('../assets/images/enviarcomentario.png')}
                style={{height: 30, width: 30}}
            />
        </TouchableOpacity>
        </View>  
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
    },
    inputlinha:{
        position: "absolute",
        bottom: 80,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    botenviar:{
        width: 30,
        height: 30,
        marginLeft: 335
    },
    input:{
        borderWidth: 1,
        width: 270,
        height: 40,
        borderColor: "#a9a9a9",
        borderRadius: 20,
        paddingLeft: 20,
        position: "absolute"
    }

})