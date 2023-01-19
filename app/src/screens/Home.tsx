import React from "react";
import { View, Text } from "react-native";

import { Styles } from '../assets/global';

export function Home() {
   return (
      <View>
         <Text style={Styles.text}>Hallo Freunde!</Text>
      </View>
   )
}