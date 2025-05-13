import { useRouter } from "expo-router";
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Image } from "react-native";
import Footer from "@/components/Footer";

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
                    style={{        
                        width: "25%",
                        height: "60%",
                        borderBottomWidth: 2,
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottomColor: "gray",
                        }}>
                        <Text style={styles.textbotao} onPress={()=> router.push('/TelaHypados')}>Hypados</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={{        
                        width: "25%",
                        height: "60%",
                        borderBottomWidth: 2,
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottomColor: "#3db342",
                        }}>
                        <Text style={styles.textbotaosel} onPress={()=> router.push('/TelaInicial')}>Para você</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={{        
                        width: "25%",
                        height: "60%",
                        borderBottomWidth: 2,
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottomColor: "gray",
                        }}>
                        <Text style={styles.textbotao} onPress={()=> router.push('/TelaFavoritos')}>Favoritos</Text>
                    </TouchableOpacity> 
                </View> 
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
    container:{
        flex: 1,
        backgroundColor: "#3db342",
    },  
    header:{
        width: "100%",
        height: 90,
        position: "absolute",
    },
    divbotao:{
        width: "100%",
        marginTop: 10,
        justifyContent: "center",
        flexDirection: "row",
        height: "45%",
    },
    logoheader:{
        width: "40%",
        marginLeft: 10,
        height: "40%",
        marginTop: 20,
    },
    textbotao:{
        color: "gray"
    },
    textbotaosel:{
        color: "#3db342",
        fontWeight: 600,
    }
})