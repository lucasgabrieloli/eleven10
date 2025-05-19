import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import Footer from '@/components/Footer';

type Midia = {
  uri: string;
  type: 'image' | 'video' | 'livePhoto' | 'pairedVideo' | undefined;
};

export default function TelaPerfil() {
  const [curriculo, setCurriculo] = useState('');
  const [bioSalva, setCurriculoSalvo] = useState(false);
  const [editandoBio, setEditandoCurriculo] = useState(true);
  const [media, setMedia] = useState<Midia[]>([]);
  const [perfilUri, setPerfilUri] = useState<string | null>(null);

 
  const [favoritos, setFavoritos] = useState<number>(0);
  const [favoritado, setFavoritado] = useState<number>(0);
  const [posts, setPosts] = useState<number>(0);
  const [favoritadoPorMim, setFavoritadoPorMim] = useState<boolean>(false);

  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Permita acesso à galeria para continuar.');
      }
    })();

  }, []);

  const escolherFotoPerfil = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setPerfilUri(result.assets[0].uri);
    }
  };

  const escolherMidia = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets) {
        const novasMidias: Midia[] = result.assets.map((asset) => ({
          uri: asset.uri,
          type: asset.type as Midia['type'],
        }));
        setMedia((prevMedia) => [...prevMedia, ...novasMidias]);
        setPosts((prev) => prev + novasMidias.length);
      }
    } catch (error) {
      console.error('Erro ao escolher mídia:', error);
    }
  };

  const deletarMidia = (index: number) => {
    const novaLista = [...media];
    novaLista.splice(index, 1);
    setMedia(novaLista);
    setPosts(novaLista.length);
  };

  const alternarFavorito = () => {
    if (favoritadoPorMim) {
      setFavoritado((prev) => prev - 1);
    } else {
      setFavoritado((prev) => prev + 1);
    }
    setFavoritadoPorMim(!favoritadoPorMim);
  };

  const salvarCurriculo = () => {
    setCurriculoSalvo(true);
    setEditandoCurriculo(false);
  };

  return (
    <View style={styles.container}>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.usernameHeader}>
          {username || 'Usuário sem username'}
        </Text>
      </View>

      <TouchableOpacity style={styles.avatarContainer} onPress={escolherFotoPerfil}>
        {perfilUri ? (
          <Image source={{ uri: perfilUri }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="add" size={36} color="#aaa" />
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.countsContainer}>
        <Text style={styles.countText}>
          <Text style={{ fontWeight: 'bold' }}>Favoritos: </Text>
          <Text style={styles.countNumber}>{favoritos}</Text>
        </Text>
        <Text style={styles.countText}>
          <Text style={{ fontWeight: 'bold' }}>Favoritado: </Text>
          <Text style={styles.countNumber}>{favoritado}</Text>
        </Text>
        <Text style={styles.countText}>
          <Text style={{ fontWeight: 'bold' }}>Posts: </Text>
          <Text style={styles.countNumber}>{posts}</Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.favoriteButton} onPress={alternarFavorito}>
        <Text style={styles.favoriteText}>
          {favoritadoPorMim ? 'Desfavoritar' : 'Favoritar'}
        </Text>
      </TouchableOpacity>

      <View style={styles.bioContainer}>
        <Text style={styles.sectionTitle}>Currículo Esportivo</Text>
        {editandoBio ? (
          <>
            <TextInput
              style={styles.bioInput}
              multiline
              placeholder="Fale sobre sua trajetória..."
              value={curriculo}
              onChangeText={setCurriculo}
            />
            <TouchableOpacity style={styles.saveButton} onPress={salvarCurriculo}>
              <Text style={styles.saveText}>Salvar Curriculo</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.bioSavedText}>{curriculo}</Text>
            <TouchableOpacity onPress={() => setEditandoCurriculo(true)}>
              <Text style={styles.editLink}>Editar Curriculo</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.separator} />

      <View style={styles.postSection}>
        <Text style={styles.sectionTitle}>Posts (fotos e vídeos)</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={escolherMidia}>
          <Text style={styles.uploadText}>+ Adicionar Mídia</Text>
        </TouchableOpacity>

        <View style={styles.mediaContainer}>
          {media.map((item, index) =>
            item.type === 'image' ? (
              <View key={index} style={styles.mediaItem}>
                <Image source={{ uri: item.uri }} style={styles.mediaPreview} />
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deletarMidia(index)}
                >
                  <Ionicons name="trash" size={16} color="white" />
                </TouchableOpacity>
              </View>
            ) : (
              <Text key={index} style={{ marginBottom: 8 }}>
                Vídeo adicionado (pré-visualização futura)
              </Text>
            )
          )}
        </View>
      </View>
    </ScrollView>
    <Footer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    marginBottom: 8,
  },
  usernameHeader: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  avatarContainer: {
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 8,
  },
  countText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  countNumber: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  favoriteButton: {
    alignSelf: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  favoriteText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bioContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bioInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#0a7d26',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveText: { color: 'white', fontWeight: 'bold' },
  bioSavedText: {
    fontSize: 14,
    lineHeight: 20,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
  },
  editLink: {
    color: '#0a7d26',
    fontWeight: 'bold',
    marginTop: 6,
  },
  separator: {
    height: 3,
    backgroundColor: '#ccc',
    marginVertical: 20,
    marginHorizontal: 16,
  },
  postSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#0a7d26',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadText: { color: 'white', fontWeight: 'bold' },
  mediaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mediaItem: {
    position: 'relative',
    marginRight: 10,
    marginBottom: 10,
  },
  mediaPreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  deleteButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    padding: 2,
  },
});