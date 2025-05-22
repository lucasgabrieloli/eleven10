import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View, TextInput, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { usePost } from "@/PostContext";
import {Video} from 'expo-av'

export default function CriarPosts (){
    const {uri, type} = useLocalSearchParams()
    const [legenda, setLegenda] = useState('')
    const {addPost} = usePost()
    const router = useRouter()
    
    function publicar(){
        addPost({uri: uri as string, type : type as 'image' | 'video', caption: legenda})
        router.push('/TelaInicial')
    }

  return (
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
      <TouchableOpacity style={styles.botpublicar}><Text>Publicar</Text></TouchableOpacity> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16 
    },
  preview: { 
    width: '100%',
    height: 300,
    marginBottom: 16 
    },
  input: {
    borderWidth: 1,
    padding: 8, 
    marginBottom: 16 
    },
    botpublicar:{}
});