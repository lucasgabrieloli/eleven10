import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet,  TextInput, ScrollView, Image, TouchableOpacity, Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type Midia = {
  uri: string;
  type: 'image' | 'video' | 'livePhoto' | 'pairedVideo' | undefined;
};

export default function TelaPerfil() {
  const [bio, setBio] = useState('');
  const [media, setMedia] = useState<Midia[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Permita acesso à galeria para continuar.');
      }
    })();
  }, []);

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
      }
    } catch (error) {
      console.error('Erro ao escolher mídia:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil do Atleta</Text>
      </View>

      <View style={styles.avatar} />

      <View style={styles.bioContainer}>
        <Text style={styles.sectionTitle}>Currículo Esportivo</Text>
        <TextInput
          style={styles.bioInput}
          multiline
          placeholder="Fale sobre sua trajetória..."
          value={bio}
          onChangeText={setBio}
        />
      </View>

      <View style={styles.postSection}>
        <Text style={styles.sectionTitle}>Posts (fotos e vídeos)</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={escolherMidia}>
          <Text style={styles.uploadText}>+ Adicionar Mídia</Text>
        </TouchableOpacity>

        <View style={styles.mediaContainer}>
          {media.map((item, index) =>
            item.type === 'image' ? (
              <Image key={index} source={{ uri: item.uri }} style={styles.mediaPreview} />
            ) : (
              <Text key={index} style={{ marginBottom: 8 }}>
                Vídeo adicionado (pré-visualização futura)
              </Text>
            )
          )}
        </View>
      </View>
    </ScrollView>
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
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: 'green',
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 16,
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
  mediaPreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
});