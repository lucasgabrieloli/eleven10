import {View, Text, StyleSheet, TextInput, Image, ImageBackground, TouchableOpacity} from 'react-native'
import InputNome, {InputEmail, InputTelefone, InputCPF, InputDataNascimento} from '../other/InputsCadastro'
import {GlobalStyles} from '../../styles/GlobalStyles'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '@/types/RootStackParamList';


export default function TelaCadastro(){
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            
                <View style={styles.header}>
                    <Text style={styles.textlogin}>Cadastre-se</Text>
                    <View style={styles.dadpdadl}>
                        <Text style={{marginRight:"10%", borderBottomWidth: 1.5, marginBottom: -0.8, borderColor: "black", color:"black", fontWeight: 700}}>1.Dados Pessoais</Text>
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

                    <View style={styles.divbotoes}>
                    <TouchableOpacity style={styles.botaologin}><Text style={GlobalStyles.txtbut}>VOLTAR</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.botaologin}><Text style={GlobalStyles.txtbut}>CONTINUAR</Text></TouchableOpacity>
                    </View>
                
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
        height: '70%',
        borderColor: 'gray',
        borderWidth: 0.6, 
        borderRadius: 10,
        padding:15,
    },
    header:{
        backgroundColor: "white",
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
    },
    botaologin:{
        backgroundColor: "#3db342",
        width: "40%",
        height: "9%",
        borderColor: "#3db342",
        borderWidth: 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 23
    },
    divbotoes:{
        width: "100%",
        height: "100%",
        flexDirection: "row",
        gap: 30,
        justifyContent: 'center',
    },

});