import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Image, StyleSheet, Text, ActivityIndicator } from "react-native";
import { usePost } from "@/PostContext";
import { Video, ResizeMode } from 'expo-av';
import { GlobalStyles } from "@/styles/GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CriarPosts() {
  const { uri: encodedUri, type } = useLocalSearchParams();
  const uri = decodeURIComponent(encodedUri as string);
  const [legenda, setLegenda] = useState('');
  const { addPost } = usePost();
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Estado de loading para quando a mídia estiver carregando

  const fetchUsername = async () => {
    const usernameByCache = await AsyncStorage.getItem('username');
    setUsername(usernameByCache);
  }

  useEffect(() => {
    fetchUsername();
  }, []);

  console.log("URI recebida:", uri);

  function publicar() {
    console.log("Adicionando post:", { uri, type, legenda });
    addPost({
      id: Date.now().toString(),
      uri: uri as string,
      type: type as 'image' | 'video',
      legenda,
      userName: username as string,
      userProfilePicture: "https://placehold.co/40x40",
      userId: "123",
      likes: 0,
    });

    router.push('/TelaInicial');
  }

  const renderMedia = () => {
    if (type === 'image') {
      return (
        <Image
          source={{ uri: uri as string }}
          style={styles.preview}
          onLoadStart={() => setLoading(true)} // Carregar a imagem
          onLoad={() => setLoading(false)}    // Parar o carregamento da imagem
          onError={() => setLoading(false)}  // Caso ocorra um erro
        />
      );
    } else if (type === 'video') {
      return (
        <Video
          source={{ uri: uri as string }}
          style={styles.preview}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          onLoadStart={() => setLoading(true)} // Carregar o vídeo
          onLoad={() => setLoading(false)}      // Parar o carregamento do vídeo
          onError={() => setLoading(false)}    // Caso ocorra um erro
        />
      );
    }
    return null;
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" /> // Exibir o indicador de loading
        ) : (
          renderMedia()
        )}

        <TextInput
          placeholder="Escreva uma legenda..."
          value={legenda}
          onChangeText={setLegenda}
          style={styles.input}
        />

        <View style={{ flexDirection: "row", gap: 50 }}>
          <TouchableOpacity
            style={GlobalStyles.botaologin}
            onPress={() => router.push('/TelaInicial')}
          >
            <Text style={GlobalStyles.txtbut}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={GlobalStyles.botaologin}
            onPress={publicar}
          >
            <Text style={GlobalStyles.txtbut}>Publicar</Text>
          </TouchableOpacity>
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
    backgroundColor: 'transparent',
  },
  input: {
    borderBottomWidth: 0.5,
    padding: 8,
    marginBottom: 16,
    width: "100%",
  },
  post: {
    padding: 16,
    borderBottomWidth: 1,
  },
  media: {
    width: '100%',
    height: 300,
  },
  caption: {
    marginTop: 8,
  },
})