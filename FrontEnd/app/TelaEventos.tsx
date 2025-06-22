import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '@/components/Footer';

type Evento = {
  id: string;
  nomeTime: string;
  data: string;
  local: string;
  horario: string;
  categoria: string;
  posicoes: string;
  imagem: string | null;
  latitude: number;
  longitude: number;
};

export default function TelaEventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [criando, setCriando] = useState(false);
  const [eventoEmEdicao, setEventoEmEdicao] = useState<string | null>(null);

  const [nomeTime, setNomeTime] = useState('');
  const [local, setLocal] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [categoria, setCategoria] = useState('');
  const [posicoes, setPosicoes] = useState('');
  const [imagem, setImagem] = useState<string | null>(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: -23.55052,
    longitude: -46.633308,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [markerPosition, setMarkerPosition] = useState<{ latitude: number; longitude: number }>({
    latitude: -23.55052,
    longitude: -46.633308,
  });

  useEffect(() => {
    (async () => {
      const dados = await AsyncStorage.getItem('eventos');
      if (dados) setEventos(JSON.parse(dados));

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setMapRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.01, longitudeDelta: 0.01
        });
        setMarkerPosition({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
      }
    })();
  }, []);

  useEffect(() => {
    if (local.length > 5) geocodeLocal();
  }, [local]);

  const geocodeLocal = async () => {
    try {
      const results = await Location.geocodeAsync(local);
      if (results.length > 0) {
        const loc = results[0];
        setMapRegion({ latitude: loc.latitude, longitude: loc.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 });
        setMarkerPosition({ latitude: loc.latitude, longitude: loc.longitude });
      } else alert('Endereço não encontrado');
    } catch {
      alert('Erro ao buscar localização');
    }
  };

  const escolherImagem = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, quality: 1 });
    if (!res.canceled) setImagem(res.assets[0].uri);
  };

  const limparFormulario = () => {
    setNomeTime(''); setLocal(''); setData(''); setHorario('');
    setCategoria(''); setPosicoes(''); setImagem(null);
    setEventoEmEdicao(null);
  };

  const salvarEventosNoStorage = async (dados: Evento[]) => {
    await AsyncStorage.setItem('eventos', JSON.stringify(dados));
  };

  const salvarEvento = async () => {
    const novo = eventoEmEdicao
      ? eventos.map(e => e.id === eventoEmEdicao
        ? { ...e, nomeTime, local, data, horario, categoria, posicoes, imagem, latitude: markerPosition.latitude, longitude: markerPosition.longitude }
        : e
      )
      : [...eventos, {
          id: Date.now().toString(), nomeTime, local, data, horario,
          categoria, posicoes, imagem,
          latitude: markerPosition.latitude, longitude: markerPosition.longitude
        }];

    setEventos(novo);
    await salvarEventosNoStorage(novo);
    limparFormulario();
    setCriando(false);
  };

  const editarEvento = (e: Evento) => {
    setNomeTime(e.nomeTime); setLocal(e.local); setData(e.data); setHorario(e.horario);
    setCategoria(e.categoria); setPosicoes(e.posicoes); setImagem(e.imagem);
    setEventoEmEdicao(e.id);
    setMapRegion({ latitude: e.latitude, longitude: e.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 });
    setMarkerPosition({ latitude: e.latitude, longitude: e.longitude });
    setCriando(true);
  };

  const excluirEvento = async (id: string) => {
    const filtro = eventos.filter(e => e.id !== id);
    setEventos(filtro);
    await salvarEventosNoStorage(filtro);
    if (eventoEmEdicao === id) {
      limparFormulario();
      setCriando(false);
    }
  };

  const renderItem = ({ item }: { item: Evento }) => (
    <View style={styles.card}>
      {item.imagem && <Image source={{ uri: item.imagem }} style={styles.imagemEvento} />}
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.nomeTime}</Text>
        <Text style={styles.cardText}>📍 {item.local}</Text>
        <Text style={styles.cardText}>📅 {item.data} ⏰ {item.horario}</Text>
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>{item.categoria}</Text>
          <Text style={styles.tag}>{item.posicoes}</Text>
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity onPress={() => editarEvento(item)} style={[styles.btnSmall, styles.btnEdit]}>
            <Text style={styles.btnSmallText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => excluirEvento(item.id)} style={[styles.btnSmall, styles.btnDelete]}>
            <Text style={styles.btnSmallText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>📣 Peneiras Disponíveis</Text>
        <TouchableOpacity onPress={() => { limparFormulario(); setCriando(true); }} style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Criar Peneira</Text>
        </TouchableOpacity>

        {criando && (
          <View style={styles.formContainer}>
            <Text style={styles.formHeader}>{eventoEmEdicao ? 'Editar Evento' : 'Criar Evento'}</Text>
            <TextInput placeholder="Nome do time" value={nomeTime} onChangeText={setNomeTime} style={styles.input} />
            <TextInput placeholder="Local" value={local} onChangeText={setLocal} style={styles.input} />
            <View style={styles.horizontal}>
              <TextInput placeholder="Horário (14:30)" value={horario} onChangeText={text => setHorario(text.replace(/[^0-9:]/g, ''))} style={[styles.input, styles.halfWidth]} />
              <TextInputMask type='datetime' options={{ format: 'DD-MM-YYYY' }} placeholder="Data (01-01-2025)" value={data} onChangeText={setData} style={[styles.input, styles.halfWidth]} />
            </View>
            <TextInput placeholder="Categoria" value={categoria} onChangeText={setCategoria} style={styles.input} />
            <TextInput placeholder="Posições" value={posicoes} onChangeText={setPosicoes} style={styles.input} />

            <View style={styles.mapWrapper}>
              <MapView
                style={styles.map}
                region={mapRegion}
                onPress={e => {
                  setMarkerPosition(e.nativeEvent.coordinate);
                  setMapRegion({ ...mapRegion, latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude });
                }}
              >
                <Marker coordinate={markerPosition} />
              </MapView>
            </View>

            <TouchableOpacity onPress={escolherImagem} style={styles.btnImage}>
              <Text style={styles.btnImageText}>Selecionar Imagem do CT</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={salvarEvento} style={styles.btnSave}>
              <Text style={styles.btnSaveText}>{eventoEmEdicao ? 'Atualizar Evento' : 'Salvar Evento'}</Text>
            </TouchableOpacity>
          </View>
        )}

        <FlatList data={eventos} keyExtractor={i => i.id} renderItem={renderItem} style={styles.list} />
      </ScrollView>
      <Footer />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  content: {
    padding: 16,
    paddingBottom: 120,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
    alignSelf: 'center',
  },
  addButton: {
    backgroundColor: '#1E90FF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#3DB342',
    fontSize: 16,
    fontWeight: '600',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  formHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1a1a1a',
  },
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dde2e6',
    padding: 12,
    marginBottom: 12,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  mapWrapper: {
    overflow: 'hidden',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    height: 200,
  },
  map: {
    flex: 1,
  },
  btnImage: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  btnImageText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  btnSave: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 8,
  },
  btnSaveText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
  list: {
    marginTop: 8,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  imagemEvento: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#222',
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tag: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#1E90FF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginRight: 6,
    marginTop: 4,
  },
  cardActions: {
    flexDirection: 'row',
    marginTop: 8,
  },
  btnSmall: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  btnEdit: {
    backgroundColor: '#ffc107',
  },
  btnDelete: {
    backgroundColor: '#dc3545',
  },
  btnSmallText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});
