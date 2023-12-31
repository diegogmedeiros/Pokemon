import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./src/components/navigator";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Navigator />
    </NavigationContainer>
  );
}
