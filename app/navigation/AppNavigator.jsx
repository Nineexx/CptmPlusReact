import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../screens/HomePage';

import AjudaScreen from '../screens/AjudaScreen';
import CadastroScreen from '../screens/CadastroScreen';
import EstacoesScreen from '../screens/EstacoesScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import LoginScreen from '../screens/LoginScreen';
import RastrearTrensScreen from '../screens/RastrearTrensScreen';
import UserScreen from '../screens/UserScreen';


const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Ajuda" component={AjudaScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Estações" component={EstacoesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Rastreamento" component={RastrearTrensScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ headerShown: false }} />
      <Stack.Screen name="User" component={UserScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default AppNavigator;