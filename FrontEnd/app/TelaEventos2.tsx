import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, } from 'react-native';

type Evento = {
  id: string;
  nomeTime: string;
  local: string;
  horario: string;
  categoria: string;
  posicoes: string;
  imagem: string | null;
};

const eventosMock: Evento[] = [
  {
    id: '1',
    nomeTime: 'Base FC',
    local: 'São Paulo',
    horario: '14:00',
    categoria: 'Sub-17',
    posicoes: 'Zagueiro, Goleiro',
    imagem: null,
  },
  {
    id: '2',
    nomeTime: 'Craques FC',
    local: 'Campinas',
    horario: '10:30',
    categoria: 'Sub-15',
    posicoes: 'Atacante',
    imagem: null,
  },
];

export default function TelaEventosVisualizar() {
  const [filtroCategoria, setFiltroCategoria] = useState<string>('Todas');

  const eventosFiltrados = filtroCategoria === 'Todas'
    ? eventosMock
    : eventosMock.filter(e => e.categoria === filtroCategoria);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Explorar Peneiras</Text>

      <View style={styles.filtroContainer}>
        <Text style={styles.filtroLabel}>Filtrar por Categoria:</Text>
       
      </View>

      <FlatList
        data={eventosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.imagem && <Image source={{ uri: item.imagem }} style={styles.imagemEvento} />}
            <Text style={styles.infoTexto}>Time: {item.nomeTime}</Text>
            <Text style={styles.infoTexto}>Local: {item.local}</Text>
            <Text style={styles.infoTexto}>Horário: {item.horario}</Text>
            <Text style={styles.infoTexto}>Categoria: {item.categoria}</Text>
            <Text style={styles.infoTexto}>Posições: {item.posicoes}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  filtroContainer: { marginBottom: 20 },
  filtroLabel: { fontSize: 16, marginBottom: 8 },
  picker: { height: 50, width: '100%' },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  imagemEvento: { width: '100%', height: 150, borderRadius: 8, marginBottom: 10 },
  infoTexto: { fontSize: 14, marginBottom: 4 },
});