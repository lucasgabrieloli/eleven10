import { useRouter, usePathname } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function Header (){

    const router = useRouter();
    const pathname = usePathname();

    const isActive = (path : string) => pathname === path

    return(
            <View style={styles.header}>
                <View style={styles.linhaheader}>
                    <Image 
                        source={require ('../assets/images/logoheader.png')}
                        style={styles.logoheader}
                    />
                </View>
                <View style={styles.divbotao}>
                    <TouchableOpacity style={[styles.botaoheader, isActive('/TelaHypados') && styles.botaoativado]}
                    onPress={()=> router.push('/TelaHypados')}>
                        <Text style={[styles.textbotao, isActive('/TelaHypados') && styles.textbotaoativado]}>Hypados</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={[styles.botaoheader, isActive('/TelaInicial') && styles.botaoativado]}
                        onPress={()=> router.push('/TelaInicial')}>
                        <Text style={[styles.textbotao, isActive('/TelaInicial') && styles.textbotaoativado]}>Para você</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={[styles.botaoheader, isActive('/TelaFavoritos') && styles.botaoativado]}
                        onPress={()=> router.push('/TelaFavoritos')}>
                        <Text style={[styles.textbotao, isActive('/TelaFavoritos') && styles.textbotaoativado]}>Favoritos</Text>
                    </TouchableOpacity>  
                </View> 
            </View>
    )
}

const styles = StyleSheet.create({
    header:{
        width: "100%",
        height: 90,
        position: "absolute",
        backgroundColor: "#fff",
        zIndex: 100,
    },
    divbotao:{
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
        height: "45%",
        marginTop: -7
    },
    logoheader:{
        width: "40%",
        height: "40%"
    },
    textbotao:{
        color: "gray"
    },
    textbotaoativado:{
        color: "#3db342",
        fontWeight: 700,
    },
    botaoheader:{
        width: "25%",
        height: "60%",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "gray",
    },
    botaoativado:{
        borderColor: "green",
        fontWeight: 800,
    },
    linhaheader:{
        width: "100%",
        height: "90%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginTop: -15
    },
})