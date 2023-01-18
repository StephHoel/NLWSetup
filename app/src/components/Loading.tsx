import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Styles } from "../assets/global";

export function Loading() {
   return (
      <View style={Styles.loading}>
         <ActivityIndicator color="#7CAED" />
      </View>
   )
}