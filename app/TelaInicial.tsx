import { useRouter } from "expo-router";
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Image } from "react-native";

export default function TelaInicial (){

    const router = useRouter();

    return(
        <View style={styles.root}>
        <ImageBackground
            style={styles.container}
            source={require('../assets/images/backgroundinicial.png')}
        ></ImageBackground>    
            <View style={styles.header}>
                <Image 
                    source={require ('../assets/images/logoheader.png')}
                    style={styles.logoheader}
                />
                <View style={styles.divbotao}>
                    <TouchableOpacity
                    style={styles.botpag}
                    />
                </View>
            </View>
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
    },  
    header:{
        width: "100%",
        height: 150,
        opacity: 0.3,
        backgroundColor: "green",
        position: "absolute",
    },
    botpag:{
        backgroundColor: "black",
        width: "20%",
        height: "20%",
    },
    divbotao:{
        width: "100%",
        backgroundColor: "red",
        marginTop: 20,
    },
    logoheader:{
        width: "40%",
        marginLeft: 20,
        height: "20%",
    }
})