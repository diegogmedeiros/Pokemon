import React from "react";
import { Image, StyleSheet } from "react-native";

const PokemonImage = () => {
  return <Image source={require("./pokemon.png")} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: 252,
    height: 88,
    resizeMode: "contain",
  },
});

export default PokemonImage;
