import React from 'react';
import { View, StatusBar } from 'react-native';

import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter'

import { Styles } from './src/assets/global';

import { Loading } from './src/components/Loading';
import { Home } from './src/screens/Home';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  })
  if (!fontsLoaded) {
    return (
      <Loading />
    )
  }
  return (
    <View style={Styles.container}>
      <Home />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    </View>
  );
}

