import { GlobalStyles } from "@/styles/GlobalStyles";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function VerificacaoOlheiro(){

    const router = useRouter()

    return(
        <View style={styles.container}>
            <View style={styles.boxlogin}>
        
                    <Text style={styles.textotit}>Você é Olheiro ou Atleta?</Text>

                <View style={styles.divbotaos}>
                    <TouchableOpacity style={styles.botaoz} onPress={() => router.push('/TelaCadastroOlheiro')}> 
                            <Text style={styles.textbotao}>Olheiro</Text>
                    </TouchableOpacity>
                    <View style={styles.espacoou}>
                            <Text style={styles.textou}>OU</Text>
                    </View>
                    <TouchableOpacity style={styles.botaoz} onPress={() => router.push('/TelaCadastro')}>
                            <Text style={styles.textbotao}>Atleta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={GlobalStyles.botaologin} onPress={()=> router.push('/TelaLogin')}>
                            <Text style={GlobalStyles.txtbut}>Voltar</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: "#3db342",
        alignItems: "center",
        justifyContent: "center"
    },
    boxlogin: {
        backgroundColor: "white",
        width: '76%',
        height: 450,
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 0.6,
        borderRadius: 10,
        justifyContent: "center"
    },
    textotit:{
        fontSize: 30,
        color: "Black",
        fontWeight: "900",
        textAlign: "center",
        marginBottom: 10
    },
    divbotaos:{
        width: 250,
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: -15,
        marginTop:20
    },
    botaoz:{
        width: 250,
        height: 70,
        backgroundColor: "#3db342",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5
    },
    textbotao:{
        fontSize: 25,
        fontWeight: 700,
        color: "#f1f1f1",
    },
    espacoou:{
        width: 250,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
    },
    textou:{
        fontSize: 15,
        fontWeight: 700,
        color: "darkgreen"
    }
})