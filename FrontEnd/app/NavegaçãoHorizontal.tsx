import { View, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import TelaInicial from './TelaInicial';
import TelaFavoritos from './TelaFavoritos';
import TelaHypados from './TelaHypados';

export default function NavegacaoHorizontal() {
  return (
    <Swiper loop={false} showsPagination>
      <View style={styles.slide}><TelaInicial/></View>
      <View style={styles.slide}><TelaFavoritos /></View>
      <View style={styles.slide}><TelaHypados /></View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
  },
});