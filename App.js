import 'react-native-gesture-handler';
import React from 'react';
import {AuthProvider} from './src/context/AuthContext';
import MainStack from './src/MainStack';

export default function App() {
  return (
    <AuthProvider>
      <MainStack />
    </AuthProvider>
  );
}
