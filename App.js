import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
  SignIn, 
  Dashboard, 
  Livros, 
  Usuarios, 
  Emprestimos, 
  Autores,
  Enderecos 
} from './src/screens';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Painel Biblioteca' }} />
        <Stack.Screen name="Livros" component={Livros} options={{ title: 'Gestão de Livros' }} />
        <Stack.Screen name="Usuarios" component={Usuarios} options={{ title: 'Gestão de Usuários' }} />
        <Stack.Screen name="Emprestimos" component={Emprestimos} options={{ title: 'Gestão de Empréstimos' }} />
        <Stack.Screen name="Autores" component={Autores} options={{ title: 'Gestão de Autores' }} />
        <Stack.Screen name="Enderecos" component={Enderecos} options={{ title: 'Gestão de Endereços' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}