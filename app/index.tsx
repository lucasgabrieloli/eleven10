import TelaLogin from "../components/telas/TelaLogin";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaCadastro from "../components/telas/TelaCadastro";
import TelaCadastro2 from "../components/telas/TelaCadastro2";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

export default function App(){
  return(
    <TelaCadastro2/>
  )
}