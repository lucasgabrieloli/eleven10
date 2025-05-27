import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import Footer from '@/components/Footer';

type Evento = {
  id: string;
  nomeTime: string;
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
        <Text style={styles.infoTexto}>Time: {item.nomeTime}</Text>
        <Text style={styles.infoTexto}>Local: {item.local}</Text>
        <Text style={styles.infoTexto}>Horário: {item.horario}</Text>
        <Text style={styles.infoTexto}>Categoria: {item.categoria}</Text>
        <Text style={styles.infoTexto}>Posições: {item.posicoes}</Text>

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
        <Text style={styles.titulo}>PENEIRAS</Text>

        <View style={styles.boxTitulo}>
          <Text style={styles.destaques}>Destaques do momento</Text>
          <Text style={styles.subtitulo}>Encontre sua próxima oportunidade</Text>
        </View>

        <FlatList
          data={eventos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 10 }}
          scrollEnabled={false}
        />

        <TouchableOpacity onPress={() => { setCriando(true); limparFormulario(); }} style={styles.botaoCriar}>
          <Text style={styles.textoBotaoCriar}>Criar Evento</Text>
        </TouchableOpacity>

        {criando && (
          <View style={styles.boxCriacao}>
            <TextInput placeholder="Nome do time" value={nomeTime} onChangeText={setNomeTime} style={styles.input} />
            <TextInput placeholder="Local" value={local} onChangeText={setLocal} style={styles.input} />
            <TextInput
              placeholder="Horário (ex: 14:30)"
              value={horario}
              onChangeText={(text) => {
                const apenasNumerosComDoisPontos = text.replace(/[^0-9:]/g, '');
                setHorario(apenasNumerosComDoisPontos);
              }}
              style={styles.input}
              keyboardType="numeric"
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
      <Footer/> 
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { padding: 16, paddingBottom: 100 },
  titulo: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  boxTitulo: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
  },
  destaques: { fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
  subtitulo: { color: 'green', fontSize: 14, textAlign: 'center' },
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fdfdfd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imagemEvento: { width: 80, height: 80, borderRadius: 8, marginRight: 12, backgroundColor: '#ccc' },
  info: { flex: 1 },
  infoTexto: { fontSize: 14, marginBottom: 4 },
  botoesAcoes: { flexDirection: 'row', marginTop: 8, gap: 8 },
  botaoEditar: { backgroundColor: '#3DB342', padding: 6, borderRadius: 6 },
  botaoExcluir: { backgroundColor: '#F44336', padding: 6, borderRadius: 6 },
  textoBotaoPequeno: { color: '#fff', fontWeight: 'bold' },
  botaoCriar: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  textoBotaoCriar: { color: '#FFF', fontWeight: 'bold' },
  boxCriacao: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    backgroundColor: '#fefefe',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  map: {
    height: 200,
    width: '100%',
    borderRadius: 10,
    marginBottom: 12,
  },
  botaoImagem: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  textoBotaoImagem: { color: '#fff', fontWeight: 'bold' },
  botaoSalvar: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoSalvar: { color: '#FFF', fontWeight: 'bold' },
});