import { View, TouchableOpacity, Image, StyleSheet } from "react-native"
import { useRouter, usePathname } from "expo-router"
           
export default function Footer() {

    const router = useRouter()
    const pathname = usePathname()

    return(
    <View style={styles.footer}>
        <View style={styles.botoesfooter}>
            <TouchableOpacity style={styles.otherbotao}
            onPress={()=> router.push('/TelaInicial')}>
                <Image
                source={
                    pathname === "/TelaInicial" || 
                    pathname === "/TelaHypados" || 
                    pathname === "/TelaFavoritos"? require('../assets/images/homeicon_ativado.png')
                    : require('../assets/images/homeicon.png')
                }
                style={styles.otherimg}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.otherbotao}
            onPress ={()=> router.push('/TelaEventos')}>
                <Image
                source={
                    pathname === "/TelaEventos" ? require('../assets/images/eventosicon_ativado.png')
                    : require('../assets/images/eventosicon.png')
                }
                style={styles.otherimg}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.maisbotao}>
                <Image
                source={require('../assets/images/maisimg.png')}
                style={styles.maisimg}
                />
            </TouchableOpacity>      
            <TouchableOpacity style={styles.otherbotao}
            onPress={()=> router.push('/TelaPesquisa')}>
                <Image
                    source={
                        pathname === "/TelaPesquisa" ? require('../assets/images/searchicon_ativado.png')
                        : require('../assets/images/searchicon.png')
                    }
                    style={styles.otherimg}
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.otherbotao}
            onPress={()=> router.push('/TelaPerfil')}
            >
                <Image
                source={
                    pathname === "/TelaPerfil" ? require('../assets/images/usericon_ativado.png')
                    : require('../assets/images/usericon.png')
                }
                style={styles.otherimg}
                />
            </TouchableOpacity>
        </View>
    </View>
)
}

const styles = StyleSheet.create({
    footer:{
        backgroundColor: "white",
        width: "100%",
        height: "7%",
        position: "absolute",
        bottom: 0,
        borderTopColor: "lightgray",
        borderTopWidth: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    botoesfooter:{
        width: "92%",
        flexDirection: "row",
        alignItems: "center",
        height: "100%",
        justifyContent: "space-between"
    },
    botaomais:{
        width: 50,
        height: 50,
        backgroundColor: "#3db342",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100
    },
    maisimg:{
        width: "100%",
        height: "100%",
    },
    maisbotao:{
        height: "90%",
        width: "15%"
    },
    otherbotao:{
        height: "52%",
        width: "8%"
    },
    otherimg:{
        width: "100%",
        height: "100%",
    },

})

