import {View, Text, StyleSheet, TextInput, Image, ImageBackground, TouchableOpacity} from 'react-native'
import { GlobalStyles } from '@/styles/GlobalStyles'

export default function TelaCadastro(){
    return(
        <View style={GlobalStyles.container}>
            <View style={styles.boxcad}>
                <Text style={GlobalStyles.textlogin}>Cadastre-se!</Text>  
                    <TextInput 
                        style={GlobalStyles.input}
                        placeholder="Digite seu E-mail"
                        placeholderTextColor="#666"
                        keyboardType='email-address'
                        autoCapitalize='none'
                    />
            
                    <TextInput
                        style={GlobalStyles.input}
                        placeholder="Digite sua senha"
                        placeholderTextColor='#666'
                        secureTextEntry={true}
                    />
            </View>
                  
        </View>
    )
}

const styles = StyleSheet.create({
    boxcad:{
        width: "76%",
        height: "90%",
        backgroundColor: "white",
        borderWidth: 0.6,
        borderRadius: 10,
        borderColor: "gray",
        alignItems: "center"
    },

});