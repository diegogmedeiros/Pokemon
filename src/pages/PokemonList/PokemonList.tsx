import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, FlatList } from "react-native";
import axios from "axios";
import PokemonCard from "../../components/PokemonCard";
import PokemonImage from "../../components/PokemonImage";

const PokemonList = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=1000"
        );
        setData(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePokemonSelect = (id, name) => {
    navigation.navigate("PokemonDetails", { id, name });
  };
  return (
    <View style={styles.container}>
      <PokemonImage />
      <TextInput
        style={styles.searchBar}
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar Pokémon"
        onSubmitEditing={() => handlePokemonSelect(null, search)}
      />
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <PokemonCard
            key={index}
            sprites={{
              front_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                index + 1
              }.png`,
            }}
            id={index + 1}
            name={item.name}
            onPress={() => handlePokemonSelect(index + 1, item.name)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  searchBar: {
    width: 296,
    padding: 10,
    margin: 40,
    backgroundColor: "white",
    borderRadius: 30,
    fontSize: 18,
    textAlign: "center",
  },
});

export default PokemonList;
