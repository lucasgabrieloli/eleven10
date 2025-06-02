import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import Footer from '@/components/Footer';
import { useRouter } from 'expo-router';

export default function TelaPerfil() {
  const router = useRouter();

  const [bio, setBio] = useState('');
  const [editandoBio, setEditandoBio] = useState(true);
  const [perfilUri, setPerfilUri] = useState<string | null>(null);
  const [favoritos, setFavoritos] = useState<number>(0);
  const [favoritado, setFavoritado] = useState<number>(0);
  const [posts, setPosts] = useState<number>(0);
  const [favoritadoPorMim, setFavoritadoPorMim] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('usuario');

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

  const alternarFavorito = () => {
    setFavoritadoPorMim(!favoritadoPorMim);
    setFavoritado(prev => favoritadoPorMim ? prev - 1 : prev + 1);
  };

  const salvarBio = () => {
    setEditandoBio(false);
    Alert.alert('Sucesso', 'Currículo salvo com sucesso!');
  };

  return (
    <View style={styles.container}>
      <ScrollView>

        {/* Header com username */}
        <View style={styles.header}>
          <Text style={styles.usernameHeader}>{username}</Text>
          <TouchableOpacity style={styles.iconright} onPress={() => router.push('/TelaConfiguracoes')}>
            <Image source={require('../assets/images/settingsicon.png')} />
          </TouchableOpacity>
        </View>

        {/* Avatar + Estatísticas lado a lado */}
        <View style={styles.profileRow}>
          <TouchableOpacity onPress={escolherFotoPerfil}>
            {perfilUri ? (
              <Image source={{ uri: perfilUri }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person-circle-outline" size={90} color="#ccc" />
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{posts}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{favoritos}</Text>
              <Text style={styles.statLabel}>Favoritos</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{favoritado}</Text>
              <Text style={styles.statLabel}>Favoritado</Text>
            </View>
          </View>
        </View>

        {/* Botões */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionButton} onPress={alternarFavorito}>
            <Text style={styles.buttonText}>
              {favoritadoPorMim ? 'Desfavoritar' : 'Favoritar'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.curriculoButton]}
            onPress={() => router.push('/Curriculo')}
          >
            <Text style={styles.buttonText}>Ver Currículo</Text>
          </TouchableOpacity>
        </View>

        {/* Bio */}
        <View style={styles.bioContainer}>
          <Text style={styles.sectionTitle}>Bio:</Text>

          {editandoBio ? (
            <>
              <TextInput
                style={styles.bioInput}
                multiline
                placeholder="Digite sua biografia..."
                value={bio}
                onChangeText={setBio}
              />
              <TouchableOpacity style={styles.saveButton} onPress={salvarBio}>
                <Text style={styles.saveText}>Salvar</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.bioSavedText}>{bio || 'Nenhum currículo preenchido.'}</Text>
              <TouchableOpacity onPress={() => setEditandoBio(true)}>
                <Text style={styles.editLink}>Editar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  usernameHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  iconright: {
    position: 'absolute',
    right: 16,
    top: 20,
    width: 24,
    height: 24,
  },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    marginLeft: 20,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  statLabel: {
    fontSize: 12,
    color: '#555',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 30,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#3DB342',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    width: 150
  },
  curriculoButton: {
    backgroundColor: '#111',
    width: 150
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  bioContainer: {
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  bioInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
    backgroundColor: '#f9f9f9',
  },
  saveButton: {
    backgroundColor: '#0a7d26',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bioSavedText: {
    fontSize: 14,
    lineHeight: 20,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    color: '#333',
  },
  editLink: {
    color: '#0a7d26',
    fontWeight: 'bold',
    marginTop: 6,
    textAlign: 'right',
  },
});

