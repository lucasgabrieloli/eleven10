import TelaLogin from "../components/telas/TelaLogin";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaCadastro from "../components/telas/TelaCadastro";
import TelaCadastro2 from "../components/telas/TelaCadastro2";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from '@/types/RootStackParamList';

const Stack = createNativeStackNavigator()

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name='Login' component={TelaLogin} options={{headerShown: false}}/>
        <Stack.Screen name='Cadastro' component={TelaCadastro} options={{title:'Cadastro'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}