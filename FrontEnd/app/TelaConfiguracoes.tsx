import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function TelaConfiguracoes(){

    const router = useRouter()

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.linhaheader}>
                    <TouchableOpacity style={styles.iconleft}
                    onPress={()=>router.push('/TelaPerfil')}>
                        <Image
                        source={require('../assets/images/setavoltar.png')}
                        style={styles.iconleft}
                        />
                    </TouchableOpacity>
                    <Text style={styles.texttitulo}>Configurações</Text>
                </View>
            </View>

            <View style={styles.boxprincipal}>
                <TouchableOpacity style={styles.config1}><Text>Configurações 1</Text></TouchableOpacity>
                <TouchableOpacity style={styles.config1}><Text>Configurações 2</Text></TouchableOpacity>
                <TouchableOpacity style={styles.config1}><Text>Configurações 3</Text></TouchableOpacity>
                <TouchableOpacity style={styles.config1}><Text>Configurações 4</Text></TouchableOpacity>
                <TouchableOpacity style={styles.config1}><Text>Configurações 5</Text></TouchableOpacity>
                <TouchableOpacity style={styles.config1}><Text>Configurações 6</Text></TouchableOpacity>
                <TouchableOpacity style={styles.config1}><Text>Configurações 7</Text></TouchableOpacity>
                <TouchableOpacity style={styles.config1}><Text>Configurações 8</Text></TouchableOpacity>
                <TouchableOpacity style={styles.config1}><Text>Configurações 9</Text></TouchableOpacity>
                <TouchableOpacity style={styles.config1}><Text>Configurações 10</Text></TouchableOpacity>
                <TouchableOpacity style={styles.config1}><Text>Configurações 11</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: "#ffffff",
    },  
    header:{
        width: "100%",
        height: 90,
        position: "absolute",
    },
    linhaheader:{
        width: "100%",
        height: "90%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginTop: -15
    },
    logoheader:{
        width: "40%",
        height: "40%"
    },
    boxprincipal:{
        borderTopColor: "black",
        width: "100%",
        height: "100%",
        marginTop: 60,
        alignItems: "center"
    },
    texttitulo:{
        fontWeight: 900,
        fontSize: 35
    },
    config1:{
        width: "90%",
        height: "8%",
        borderColor: "black",
        borderWidth: 0.5
    },
    iconleft: {
        position: 'absolute',
        left: 10,
        top: 22,
        transform: [{ translateY: -12 }],
        width: 40,
        height: 40,
        resizeMode: 'contain',
    }
})