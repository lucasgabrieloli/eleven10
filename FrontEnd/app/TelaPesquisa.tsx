import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Keyboard, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import { usePost } from "@/PostContext";
import Footer from "@/components/Footer";
import { useRouter } from "expo-router";

export default function TelaPesquisa() {
  const [pesquisa, setPesquisa] = useState("");
  const [tecladoAberto, setTecladoAberto] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setTecladoAberto(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setTecladoAberto(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const { posts } = usePost();
  const resultados = posts.filter(post =>
    post.legenda.toLowerCase().includes(pesquisa.toLowerCase())
  );
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <SafeAreaView style={styles.root}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconleft} onPress={() => router.push('/TelaInicial')}>
            <Image
              source={require('../assets/images/setavoltar.png')}
              style={styles.iconleft}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.searchinput}
            placeholder="Procurar"
            placeholderTextColor={"#a9a9a9"}
            value={pesquisa}
            onChangeText={setPesquisa}
          />
        </View>

        <FlatList
          style={styles.lista}
          data={resultados}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Image source={{ uri: item.uri }} style={styles.media} />
              <Text style={styles.caption}>{item.legenda}</Text>
              <Text style={styles.username}>@{item.userName}</Text>
            </View>
          )}
        />

        {!tecladoAberto && <Footer />}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  searchinput: {
    width: "60%",
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F8F8FF",
    paddingLeft: 20,
    borderColor: "lightgray",
    borderWidth: 0.8,
    marginTop: -30,
  },
  iconleft: {
    position: 'absolute',
    left: 10,
    top: 22,
    transform: [{ translateY: -12 }],
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  lista: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  post: {
    marginBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  media: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  caption: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "500",
  },
  username: {
    color: "gray",
  },
});
