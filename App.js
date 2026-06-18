// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import TelaListagem from './src/screens/TelaListagem';
import TelaFormulario from './src/screens/TelaFormulario';
import TelaDetalhes from './src/screens/TelaDetalhes';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,         // cabeçalho gerenciado em cada tela
          contentStyle: { backgroundColor: '#0D0D0F' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="TelaListagem" component={TelaListagem} />
        <Stack.Screen name="TelaDetalhes" component={TelaDetalhes} />
        <Stack.Screen name="TelaFormulario" component={TelaFormulario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
