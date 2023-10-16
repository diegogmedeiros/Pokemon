import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PokemonList from "../pages/PokemonList/PokemonList";
import PokemonDetails from "../pages/PokemonDetails/PokemonDetails";

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator initialRouteName="PokemonList">
      
      <Stack.Screen
        name="PokemonList"
        component={PokemonList}
        options={{ title: "Lista de Pokémon" }}
      />
      <Stack.Screen
        name="PokemonDetails"
        component={PokemonDetails}
        options={{ title: "Detalhes" }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
