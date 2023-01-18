import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter'

import { Styles } from './src/assets/global';

import { Loading } from './src/components/Loading';

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
      <Text style={Styles.text}>Hallo Freunde!</Text>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    </View>
  );
}

