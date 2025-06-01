import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import Footer from '@/components/Footer';
import { useNavigation } from '@react-navigation/native';

type Evento = {
  id: string;
  nomeTime: string;
  data: string;
  local: string;
  horario: string;
  categoria: string;
  posicoes: string;
  imagem: string | null;
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

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      const location = await Location.getCurrentPositionAsync({});
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  useEffect(() => {
    if (local.length > 5) {
      geocodeLocal();
    }
  }, [local]);

  const geocodeLocal = async () => {
    const results = await Location.geocodeAsync(local);
    if (results.length > 0) {
      const loc = results[0];
      setMapRegion({
        latitude: loc.latitude,
        longitude: loc.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  const escolherImagem = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  const limparFormulario = () => {
    setNomeTime('');
    setLocal('');
    setData('');
    setHorario('');
    setCategoria('');
    setPosicoes('');
    setImagem(null);
    setEventoEmEdicao(null);
  };

  const salvarEvento = () => {
    if (eventoEmEdicao) {
      setEventos((prev) =>
        prev.map((e) =>
          e.id === eventoEmEdicao
            ? { ...e, nomeTime, local, horario, categoria, posicoes, imagem }
            : e
        )
      );
    } else {
      const novoEvento: Evento = {
        id: Date.now().toString(),
        nomeTime,
        local,
        data,
        horario,
        categoria,
        posicoes,
        imagem,
      };
      setEventos([...eventos, novoEvento]);
    }

    limparFormulario();
    setCriando(false);
  };

  const editarEvento = (evento: Evento) => {
    setNomeTime(evento.nomeTime);
    setLocal(evento.local);
    setData(evento.data);
    setHorario(evento.horario);
    setCategoria(evento.categoria);
    setPosicoes(evento.posicoes);
    setImagem(evento.imagem);
    setEventoEmEdicao(evento.id);
    setCriando(true);
  };

  const excluirEvento = (id: string) => {
    setEventos((prev) => prev.filter((e) => e.id !== id));
    if (eventoEmEdicao === id) {
      limparFormulario();
      setCriando(false);
    }
  };

  const renderItem = ({ item }: { item: Evento }) => (
    <View style={styles.card}>
      {item.imagem && <Image source={{ uri: item.imagem }} style={styles.imagemEvento} />}
      <View style={styles.info}>
        <Text style={styles.tituloEvento}>{item.nomeTime}</Text>
        <Text style={styles.infoTexto}>📍 {item.local}</Text>
        <Text style={styles.infoTexto}>📅 {item.data}</Text>
        <Text style={styles.infoTexto}>⏰ {item.horario}</Text>
        <Text style={styles.tag}>Categoria: {item.categoria}</Text>
        <Text style={styles.tag}>Posições: {item.posicoes}</Text>

        <View style={styles.botoesAcoes}>
          <TouchableOpacity onPress={() => editarEvento(item)} style={styles.botaoEditar}>
            <Text style={styles.textoBotaoPequeno}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => excluirEvento(item.id)} style={styles.botaoExcluir}>
            <Text style={styles.textoBotaoPequeno}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titulo}>📣 Peneiras Disponíveis</Text>

        <View style={styles.boxTitulo}>
          <Text style={styles.destaques}>Destaques do momento</Text>
          <Text style={styles.subtitulo}>Encontre sua próxima oportunidade no futebol</Text>
        </View>

        <FlatList
          data={eventos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 16 }}
          scrollEnabled={false}
        />

        <TouchableOpacity onPress={() => { setCriando(true); limparFormulario(); }} style={styles.botaoCriar}>
          <Text style={styles.textoBotaoCriar}>+ Criar Evento</Text>
        </TouchableOpacity>

        {criando && (
          <View style={styles.boxCriacao}>
            <TextInput placeholder="Nome do time" value={nomeTime} onChangeText={setNomeTime} style={styles.input} />
            <TextInput placeholder="Local" value={local} onChangeText={setLocal} style={styles.input} />
            <TextInput
              placeholder="Horário (ex: 14:30)" value={horario} onChangeText={(text) => setHorario(text.replace(/[^0-9:]/g, ''))} style={styles.input}
            />
               <TextInput
              placeholder="Data (ex: 01-01-2025)" value={horario} onChangeText={(text) => setData(text.replace(/[^0-9:]/g, ''))} style={styles.input}
        
            />
            <TextInput placeholder="Categoria" value={categoria} onChangeText={setCategoria} style={styles.input} />
            <TextInput placeholder="Posições" value={posicoes} onChangeText={setPosicoes} style={styles.input} />

            <MapView style={styles.map} region={mapRegion}>
              <Marker coordinate={mapRegion} />
            </MapView>

            <TouchableOpacity onPress={escolherImagem} style={styles.botaoImagem}>
              <Text style={styles.textoBotaoImagem}>Selecionar imagem do CT</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={salvarEvento} style={styles.botaoSalvar}>
              <Text style={styles.textoSalvar}>{eventoEmEdicao ? 'Atualizar Evento' : 'Salvar Evento'}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <Footer />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F7F9' },
  scrollContainer: { padding: 16, paddingBottom: 100 },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#222',
  },
  boxTitulo: {
    padding: 16,
    marginBottom: 24,
    borderRadius: 16,
    backgroundColor: '#E6F2EC',
  },
  destaques: { fontWeight: '700', fontSize: 18, textAlign: 'center', color: '#1A5D3F' },
  subtitulo: { fontSize: 14, textAlign: 'center', color: '#4A4A4A', marginTop: 4 },
  card: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 14,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    gap: 10,
  },
  imagemEvento: { width: 90, height: 90, borderRadius: 10, backgroundColor: '#eee' },
  info: { flex: 1, justifyContent: 'space-between' },
  tituloEvento: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#2B2B2B',
  },
  infoTexto: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  tag: {
    fontSize: 13,
    color: '#3A7D44',
    backgroundColor: '#E1F3E8',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  botoesAcoes: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 8,
  },
  botaoEditar: {
    backgroundColor: '#00B386',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  botaoExcluir: {
    backgroundColor: '#E74C3C',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  textoBotaoPequeno: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  botaoCriar: {
    backgroundColor: '#1A5D3F',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 28,
  },
  textoBotaoCriar: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  boxCriacao: {
    backgroundColor: '#fff',
    padding: 18,
    marginTop: 20,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#FAFAFA',
  },
  map: {
    height: 200,
    width: '100%',
    borderRadius: 12,
    marginBottom: 12,
  },
  botaoImagem: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  textoBotaoImagem: {
    color: '#fff',
    fontWeight: 'bold',
  },
  botaoSalvar: {
    backgroundColor: '#1A1A1A',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoSalvar: {
    color: '#fff',
    fontWeight: 'bold',
  },
});