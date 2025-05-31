import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

export default function Curriculo() {
  const [idade, setIdade] = useState('');
  const [categoria, setCategoria] = useState('');
  const [posicoes, setPosicoes] = useState<string[]>([]);
  const [gols, setGols] = useState('');
  const [assistencias, setAssistencias] = useState('');
  const [conquistas, setConquistas] = useState('');
  const [timesVarzea, setTimesVarzea] = useState('');
  const [habilidades, setHabilidades] = useState('');
  const [camisa, setCamisa] = useState('');

  const router = useRouter();

  const categorias = ['Sub-15', 'Sub-17', 'Sub-20', 'Adulto'];
  const posicoesPossiveis = [
    'Goleiro', 'Zagueiro', 'Lateral Direito', 'Lateral Esquerdo',
    'Volante', 'Meio Campo', 'Ponta Esquerda', 'Ponta Direita', 'Centroavante'
  ];

  const togglePosicao = (posicao: string) => {
    if (posicoes.includes(posicao)) {
      setPosicoes(posicoes.filter(p => p !== posicao));
    } else if (posicoes.length < 2) {
      setPosicoes([...posicoes, posicao]);
    } else {
      Alert.alert('Limite atingido', 'Você só pode selecionar até 2 posições.');
    }
  };

  const salvarCurriculo = () => {
    Alert.alert('Sucesso', 'Currículo salvo com sucesso!');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.headerz}>
        <TouchableOpacity style={styles.iconleft} onPress={() => router.push('/TelaPerfil')}>
          <Image source={require('../assets/images/setavoltar.png')}
                  style={styles.iconleft}
          />
        </TouchableOpacity>
        {/* Logo Eleven 10 */}
        <Image
          source={require('../assets/images/logoheader.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.header}>CURRÍCULO DO ATLETA</Text>
        <Text style={styles.aviso}>Digite algumas informações sobre a sua carreira nos devidos espaços para ter ainda mais chances de ser contratado por um time de elite! Currículos com palavras inadequadas ou qualquer tipo de discurso de ódio serão permanentemente banidos.</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Idade</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            value={idade}
            onChangeText={setIdade}
            placeholder="Digite sua idade"
            placeholderTextColor="#6a996b"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Categoria</Text>
          <View style={styles.selectContainer}>
            {categorias.map(cat => (
              <TouchableOpacity
                key={cat}
                style={[styles.optionButton, categoria === cat && styles.optionButtonSelected]}
                onPress={() => setCategoria(cat)}
              >
                <Text style={[styles.optionText, categoria === cat && styles.optionTextSelected]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Posição (até 2)</Text>
          <View style={styles.selectContainer}>
            {posicoesPossiveis.map(pos => {
              const selected = posicoes.includes(pos);
              return (
                <TouchableOpacity
                  key={pos}
                  style={[styles.optionButton, selected && styles.optionButtonSelected]}
                  onPress={() => togglePosicao(pos)}
                >
                  <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                    {pos}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gols (temporada atual)</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            value={gols}
            onChangeText={setGols}
            placeholder="Número de gols"
            placeholderTextColor="#6a996b"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Assistências (temporada atual)</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            value={assistencias}
            onChangeText={setAssistencias}
            placeholder="Número de assistências"
            placeholderTextColor="#6a996b"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Conquistas</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            value={conquistas}
            onChangeText={setConquistas}
            placeholder="Descreva suas conquistas"
            placeholderTextColor="#6a996b"
            multiline
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Times de várzea que já jogou</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            value={timesVarzea}
            onChangeText={setTimesVarzea}
            placeholder="Liste os times"
            placeholderTextColor="#6a996b"
            multiline
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Habilidades específicas</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            value={habilidades}
            onChangeText={setHabilidades}
            placeholder="Descreva suas habilidades"
            placeholderTextColor="#6a996b"
            multiline
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Camisa favorita</Text>
          <TextInput
            style={styles.input}
            value={camisa}
            onChangeText={setCamisa}
            placeholder="Número da camisa"
            placeholderTextColor="#6a996b"
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={salvarCurriculo}>
          <Text style={styles.saveButtonText}>Salvar Currículo</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3DB342',
    paddingTop: 50,
  },
  aviso:{
    color: "gray",
    alignSelf:"center",
    marginHorizontal: 30,
    marginBottom: 10,
    fontWeight: 700,
    textAlign:"center"
  },
  headerz:{
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "darkgreen"
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  logo: {
    width: 180,
    height: 80,
    alignSelf: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#333',
    fontSize: 16,
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  selectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#a4d1a3',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  optionButtonSelected: {
    backgroundColor: '#fff',
  },
  optionText: {
    color: '#d0f0c0',
    fontWeight: '600',
  },
  optionTextSelected: {
    color: '#3DB342',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#0a7d26',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  iconleft: {
    position: 'absolute',
    left: 10,
    top: 21,
    transform: [{ translateY: -12 }],
    width: 40,
    height: 40,
    resizeMode: 'contain',
    }
});
