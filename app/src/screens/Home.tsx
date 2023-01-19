import { View, Text } from "react-native";

import { Styles } from '../assets/global';
import { Header } from "../components/Header";

export function Home() {
   return (
      <View className="flex-1 bg-background px-8 pt-16">
         <Header />
         <Text style={Styles.text}>Hallo Freunde!</Text>
      </View>
   )
}