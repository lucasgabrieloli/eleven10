import {View, Text, StyleSheet, TextInput, Image, ImageBackground, TouchableOpacity} from 'react-native'
import InputNome, {InputEmail, InputTelefone, InputCPF, InputDataNascimento} from '../other/InputsCadastro'

export default function TelaCadastro(){
    return(
        <View style={styles.container}>
            
                <View style={styles.header}>
                    <Text style={styles.textlogin}>Cadastre-se</Text>
                    <View style={styles.dadpdadl}>
                        <Text style={{marginRight:"10%", borderBottomWidth: 1.5, marginBottom: -0.8, borderColor: "#3db342", color:"black", fontWeight: 700}}>1.Dados Pessoais</Text>
                        <Text>2. Dados de Login</Text>
                    </View>
                </View> 
                <View style={styles.boxcad}>
                    <Text style={styles.textaviso}>Apenas maiores de 18 anos poderão se cadastrar no ELEVEN 10. Nós não exibiremos seu CPF, Nome Completo ou Telefone no seu Perfil Atleta.</Text>
                    <InputNome/>
                    <InputEmail/>
                    <InputTelefone/>
                    <InputCPF/>
                    <InputDataNascimento/>
                </View>
                  
        </View>
    )
}

const styles = StyleSheet.create({
    root:{
        flex:1,
    },
    container:{
        flex: 1,
        backgroundColor: "#3db342",
        alignItems: 'center',
        justifyContent: 'center',
    },  
    textlogin:{
        marginTop: 20,
        fontSize: 30,
        fontWeight: 900,
        marginLeft: 20
    },
    boxcad:{
        backgroundColor: "white",
        width: '76%',
        height: '60%',
        borderColor: 'gray',
        borderWidth: 0.6, 
        borderRadius: 10,
        padding: 20,
    },
    header:{
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderColor: "black",
        width: "100%",
        position:"absolute",
        top: 0,
    },
    dadpdadl:{
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 15,
        justifyContent: "center",
    },
    textaviso:{
        alignSelf:"center",
        color: "gray",
        fontSize: 11,
    }
});