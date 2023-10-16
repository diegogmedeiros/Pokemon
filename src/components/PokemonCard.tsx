import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const PokemonCard = ({ sprites, id, name, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.card}>
        <Image source={{ uri: sprites.front_shiny }} style={styles.image} />
        <View style={styles.frame}>
          <View style={styles.idBox}>
            <Text style={styles.id}>#{id}</Text>
          </View>
          <View style={styles.nameBox}>
            <Text style={styles.name}>{name}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 30,

    backgroundColor: "#F993FB",
    width: 155,
    height: 100,
    borderRadius: 20,

    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    position: "absolute",
    top: -40,
    left: (150 - 90) / 2,
  },
  frame: {
    flexDirection: "row",
    width: 140,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#676767",
    marginBottom: 5,

    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 15,
    position: "absolute",
    bottom: 6.4,
  },
  idBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  nameBox: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  id: {
    fontSize: 12,
    color: "#F993FB",
  },
  name: {
    fontSize: 12,

    color: "white",
  },
});

export default PokemonCard;
