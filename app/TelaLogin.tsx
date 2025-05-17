import {View, Text, StyleSheet, TextInput, Image, ImageBackground, TouchableOpacity} from 'react-native';
import {InputEmail, InputSenha} from '../components/InputsCadastro'
import {GlobalStyles} from '../styles/GlobalStyles';
import TelaCadastro from './TelaCadastro';
import { useRouter } from 'expo-router';

export default function TelaLogin(){

  const router = useRouter();

  return(
    
    <View style={styles.root}>
      <ImageBackground
          style={styles.container}
          source={require('../assets/images/backgroundlogin.png')}
      >
      <View style={styles.boxlogin}>
        <Text style={styles.textlogin}>Login</Text>  

        <View style={styles.divinputs}>
          <InputEmail/>
          <InputSenha/>
        </View>

        <TouchableOpacity 
          style={GlobalStyles.botaologin}>
          <Text style={GlobalStyles.txtbut}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.txtcad}>Não tem uma conta?</Text> 
        <TouchableOpacity style={styles.botcads}
        onPress={() => router.push('/TelaCadastro')}
        ><Text style={styles.txtbotcads}>Cadastre-se!</Text></TouchableOpacity>

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
  },
  boxlogin: {
    backgroundColor: "white",
    width: '76%',
    height: '60%',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 0.6, 
    borderRadius: 10,
  },
  txtcad:{
    fontSize: 15,
    marginTop: 15
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
    marginTop:30,
    padding: 0,
    position: "relative",
    borderRadius: 5,
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
  },
  input:{
    width:'70%',
    marginTop:'10%',
    marginLeft:0,
    marginRight:0,
    borderBottomWidth:1,
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 2,
  },
  divinputs:{
    width: '90%',
  }

})