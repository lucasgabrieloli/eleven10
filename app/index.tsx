import {View, Text, StyleSheet, TextInput, Image, ImageBackground, TouchableOpacity} from 'react-native';

export default function App(){
  return(
    <View style={styles.root}>
      <ImageBackground
          style={styles.container}
          source = {require('../assets/images/backgroundlogin.png')}
      >
      <View style={styles.boxlogin}>
        <Text style={ styles.textlogin}>Login</Text>  
        
        <TextInput 
          style={styles.input}
          placeholder="Digite seu E-mail"
          placeholderTextColor="#666"
          keyboardType='email-address'
          autoCapitalize='none'
        />

        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor='#666'
          secureTextEntry={true}
        />

        <TouchableOpacity 
          style={styles.botaologin}>
          <Text style={styles.txtbut}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.txtcad}>Não tem uma conta? Cadastre-se!</Text>

        <TouchableOpacity 
          style={styles.botaologin2}>
          <Text style={styles.txtbut2}>Entre com o Google!</Text>
        </TouchableOpacity>

        
      </View>  
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({

  root:{
    flex:1
  },
  container:{
    flex: 1,
    backgroundColor: "#005103",
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxlogin: {
    backgroundColor: "white",
    width: '76%',
    height: '50%',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 0.6, 
    borderRadius: 10,
  },
  textlogin:{
    marginTop: '6%',
    fontSize: 30,
  },
  input:{
    width:'70%',
    marginTop:'15%',
    marginLeft:0,
    marginRight:0,
    borderBottomWidth:1,
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 2,
  },
  botaologin:{
    backgroundColor: "white",
    width: "25%",
    height: "10%",
    marginTop: 30,
    marginBottom: 20,
    borderColor: "#27692a",
    borderWidth: 2,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtbut:{
    fontSize: 18
  },
  txtcad:{

  },
  botaologin2:{
    width: '80%',
    height: '8%',
    borderWidth: 2,
    borderColor: 'black',
    alignItems:'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  txtbut2:{

  },  
  

})