import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Keyboard, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import { usePost } from "@/PostContext";
import Footer from "@/components/Footer";
import { useRouter } from "expo-router";
import PostItem from '@/components/Posts';
import Header from '@/components/Header';

export default function TelaInicial() {
  const { posts } = usePost();
  const [tecladoAberto, setTecladoAberto] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setTecladoAberto(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setTecladoAberto(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <SafeAreaView style={styles.container}>
        <Header />
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostItem item={item} />}
          contentContainerStyle={{ paddingTop: 80, paddingBottom: 100, alignItems: 'center' }}
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyText}>Nenhum post encontrado.</Text>
            </View>
          }
        />
        {!tecladoAberto && <Footer />}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 350
  }
});
