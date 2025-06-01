import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import { useRouter, router } from 'expo-router'
import { useState } from 'react'
import { API_url } from '@/APP_CONFIG';
import {cpf} from 'cpf-cnpj-validator'


export default function TelaCadastroOlheiro() {
    const router = useRouter();
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [CPF, setCPF] = useState('')


    const isOver18 = (dateStr: string) => {
        const [day, month, year] = dateStr.split('/').map(Number);
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        return age > 18 || (age === 18 && m >= 0);
    };

    const validarCampos = () => {
        if (!nome || !email || !telefone || !dataNascimento || !CPF) {
            Alert.alert("Preencha todos os dados para continuar!");
            return false;
        }

        if (!isOver18(dataNascimento)) {
            Alert.alert("Você deve ser maior que 18 anos para continuar!");
            return false;
        }

        if (!cpf.isValid(CPF)) {
            Alert.alert("CPF inválido! Verifique e tente novamente.");
            return false;
        }

        return true;
        };


    const validarContinuar = ()=>{
        if(validarCampos()){
            router.push('/TelaCadastroOlheiro2')
        }
    }

        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.textlogin}>Cadastre-se</Text>
                    <View style={styles.dadpdadl}>
                        <Text style={{ marginRight: "10%", borderBottomWidth: 1.5, marginBottom: -0.8, borderColor: "black", color: "black", fontWeight: 700 }}>1.Dados Pessoais</Text>
                        <Text>2. Dados de Login</Text>
                    </View>
                </View>
                <View style={styles.boxcad}>
                    <Text style={styles.textaviso}>Assim que você criar sua conta seu cadastro será encaminhado para análise. Em até dois dias, ele será revisado e você poderá acessar todas as funcionalidades do aplicativo normalmente.</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu Nome Completo:"
                        placeholderTextColor='#666'
                        value={nome}
                        onChangeText={setNome} />

                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu E-mail:"
                        placeholderTextColor='#666'
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu telefone:"
                        placeholderTextColor="#666"
                        value={telefone}
                        onChangeText={setTelefone}
                        keyboardType="phone-pad"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua data de Nascimento:"
                        placeholderTextColor="#666"
                        value={dataNascimento}
                        onChangeText={setDataNascimento}
                        keyboardType="number-pad"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu CPF"
                        placeholderTextColor="#666"
                        value={CPF}
                        onChangeText={setCPF}
                        keyboardType="numeric"
                    />

                    <View style={styles.divbotoes}>
                        <TouchableOpacity style={GlobalStyles.botaologin} onPress={()=> router.push('/verificacaoOlheiro')}>
                            <Text style={GlobalStyles.txtbut}>Voltar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={GlobalStyles.botaologin} onPress={validarContinuar}>
                            <Text style={GlobalStyles.txtbut}>Continuar</Text>
                        </TouchableOpacity>
                    </View>

                </View>



            </View>
        )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "#3db342",
        alignItems: 'center',
        justifyContent: 'center',
    },
    textlogin: {
        marginTop: 20,
        fontSize: 30,
        fontWeight: 900,
        marginLeft: 20
    },
    boxcad: {
        backgroundColor: "white",
        width: '76%',
        height: 580,
        borderColor: 'gray',
        borderWidth: 0.6,
        borderRadius: 10,
        padding: 15,
    },
    header: {
        backgroundColor: "white",
        width: "100%",
        position: "absolute",
        top: 0,
    },
    dadpdadl: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 15,
        justifyContent: "center",
    },
    textaviso: {
        alignSelf: "center",
        color: "gray",
        fontSize: 11,
    },
    divbotoes: {
        width: "100%",
        height: "100%",
        flexDirection: "row",
        gap: 30,
        justifyContent: 'center',
    },
    input: {
        borderWidth: 2,
        borderColor: "lightgray",
        width: "100%",
        borderRadius: 3,
        backgroundColor: "white",
        marginTop: 35,
    },

});