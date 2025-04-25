import { GlobalStyles } from '@/styles/GlobalStyles';
import {View, Text, StyleSheet, TextInput, Image, ImageBackground, TouchableOpacity} from 'react-native';

export default function TelaLogin(){
  return(
    <View style={GlobalStyles.root}>
      <ImageBackground
          style={GlobalStyles.container}
          source = {require('../assets/images/backgroundlogin.png')}
      >
      <View style={styles.boxlogin}>
        <Text style={GlobalStyles.textlogin}>Login</Text>  
        
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

        <TouchableOpacity 
          style={styles.botaologin}>
          <Text style={styles.txtbut}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.txtcad}>Não tem uma conta?</Text> <TouchableOpacity style={styles.botcads}><Text style={styles.txtbotcads}>Cadastre-se!</Text></TouchableOpacity>

        <TouchableOpacity 
          style={styles.botaologin2}>
            <View style={styles.botgooglelogin}>
              <Image
              source={require("../assets/images/googleiconlogin.png")}
              style={styles.icongoogle}
              />
              <Text style={styles.txtbut2}>Entre com o Google!</Text>
            </View>
        </TouchableOpacity>

        
      </View>  
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({

  boxlogin: {
    backgroundColor: "white",
    width: '76%',
    height: '50%',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 0.6, 
    borderRadius: 10,
  },
  botaologin:{
    backgroundColor: "#3db342",
    width: "25%",
    height: "10%",
    marginTop: 30,
    marginBottom: 20,
    borderColor: "#3db342",
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtbut:{
    fontSize: 18,
    color: "white",
    fontWeight: "700" 
  },
  txtcad:{
    fontSize: 15
  },
  botgooglelogin:{
    flexDirection: "row",
  },
  botaologin2:{
    width: '80%',
    height: '8%',
    borderWidth: 2,
    borderColor: 'black',
    alignItems:'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 0,
    position: "relative",
    borderRadius: 5
  },
  txtbut2:{
    textAlign: "center",
    width:"100%"
  },  
  icongoogle:{
    height: "90%",
    width: "8%",
    position: "absolute",
    left: 16
  },
  botcads:{
    width: 90,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  txtbotcads:{
    color: "green",
    fontSize: 15,
    fontWeight: 800,
  }
  

})