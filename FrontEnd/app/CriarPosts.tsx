import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View, TextInput, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { usePost } from "@/PostContext";
import {Video} from 'expo-av'
import { GlobalStyles } from "@/styles/GlobalStyles";

export default function CriarPosts (){
    const {uri, type} = useLocalSearchParams()
    const [legenda, setLegenda] = useState('')
    const {addPost} = usePost()
    const router = useRouter()
    
  function publicar() {
    addPost({
      id: Date.now().toString(),
      uri: uri as string,
      type: type as 'image' | 'video',
      legenda,
      userName: "Usuário Teste", // substitua com dados reais do usuário logado
      userProfilePicture: "https://placehold.co/40x40", // idem acima
      userId: "123", // ID fictício do usuário logado
      likes: 0,
      likedByUser: false,
  });

  router.push('/TelaInicial');
}

  return (
    <View style={{flex: 1, justifyContent:"center"}}>
    <View style={styles.container}>
      {type === 'image' ? (
        <Image source={{ uri: uri as string }} style={styles.preview} />
      ) : (
        <Video
        source={{ uri: uri as string }}
        style={styles.preview}
        useNativeControls
        resizeMode={"contain" as any} 
        shouldPlay
        />
      )}
      <TextInput
        placeholder="Escreva uma legenda..."
        value={legenda}
        onChangeText={setLegenda}
        style={styles.input}
      />
      <View style={{flexDirection: "row", gap: 50}}>
      <TouchableOpacity style={GlobalStyles.botaologin} onPress={()=> router.push('/TelaInicial')}><Text style={GlobalStyles.txtbut}>Voltar</Text></TouchableOpacity>
      <TouchableOpacity style={GlobalStyles.botaologin} onPress={publicar}><Text style={GlobalStyles.txtbut}>Publicar</Text></TouchableOpacity> 
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    width: "80%",
    height: 600,
    backgroundColor: "#fff",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    borderTopColor: "gray",
    borderTopWidth: 0.5,
  },
  preview: { 
    width: '100%',
    height: 300,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    borderBottomWidth: 0.5,
    padding: 8, 
    marginBottom: 16, 
    width: "100%"
  },
  post: {
    padding: 16,
    borderBottomWidth: 1 
  },
  media: {
    width: '100%', 
    height: 300 
  },
  caption: {
    marginTop: 8 
  },
  

});