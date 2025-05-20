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
  legenda: string;
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

  const [midiaPreview, setMidiaPreview] = useState<Midia | null>(null);
  const [legendaPreview, setLegendaPreview] = useState<string>('');

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

      if (!result.canceled && result.assets[0]) {
        setMidiaPreview({
          uri: result.assets[0].uri,
          type: result.assets[0].type as Midia['type'],
          legenda: '',
        });
        setLegendaPreview('');
      }
    } catch (error) {
      console.error('Erro ao escolher mídia:', error);
    }
  };

  const postarMidia = () => {
    if (midiaPreview) {
      const novaMidia = { ...midiaPreview, legenda: legendaPreview };
      setMedia((prev) => [...prev, novaMidia]);
      setPosts((prev) => prev + 1);
      setMidiaPreview(null);
      setLegendaPreview('');
    }
  };

  const cancelarPostagem = () => {
    setMidiaPreview(null);
    setLegendaPreview('');
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
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.usernameHeader}>
            {username || 'Usuário sem username'}
          </Text>
        </View>

        <View style={styles.avatarSection}>
          <TouchableOpacity onPress={escolherFotoPerfil}>
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
              <Text style={{ fontWeight: 'bold' }}>Favoritos: </Text>{favoritos}
            </Text>
            <Text style={styles.countText}>
              <Text style={{ fontWeight: 'bold' }}>Favoritado: </Text>{favoritado}
            </Text>
            <Text style={styles.countText}>
              <Text style={{ fontWeight: 'bold' }}>Posts: </Text>{posts}
            </Text>
          </View>
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

          {midiaPreview ? (
            <View style={styles.previewContainer}>
              <Image source={{ uri: midiaPreview.uri }} style={styles.previewImage} />
              <TextInput
                style={styles.captionInput}
                placeholder="Escreva uma legenda..."
                value={legendaPreview}
                onChangeText={setLegendaPreview}
              />
              <View style={styles.previewButtons}>
                <TouchableOpacity style={styles.confirmButton} onPress={postarMidia}>
                  <Text style={styles.buttonText}>Postar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={cancelarPostagem}>
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity style={styles.uploadButton} onPress={escolherMidia}>
              <Text style={styles.uploadText}>+ Adicionar post</Text>
            </TouchableOpacity>
          )}

          <View style={styles.mediaContainer}>
            {media.map((item, index) => (
              <View key={index} style={styles.mediaItem}>
                {item.type === 'image' ? (
                  <>
                    <Image source={{ uri: item.uri }} style={styles.mediaPreview} />
                    <Text style={styles.captionText}>{item.legenda}</Text>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => deletarMidia(index)}
                    >
                      <Ionicons name="trash" size={16} color="white" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <Text>Vídeo (preview futura)</Text>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <Footer />
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
  },
  usernameHeader: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countsContainer: {
    marginLeft: 20,
    justifyContent: 'space-around',
    height: 90,
  },
  countText: {
    fontSize: 14,
    marginBottom: 4,
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
  previewContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  captionInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 8,
  },
  previewButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: '#0a7d26',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  mediaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mediaItem: {
    position: 'relative',
    width: 100,
    marginRight: 10,
    marginBottom: 10,
  },
  mediaPreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  captionText: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
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
