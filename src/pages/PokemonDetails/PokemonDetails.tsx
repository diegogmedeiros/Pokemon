import React, { useState, useEffect } from "react";
import Masculino from "./Masculino.png";
import Feminino from "./Feminino.png";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import axios from "axios";
import PokemonImage from "../../components/PokemonImage";

const PokemonDetails = ({ route }) => {
  const { id } = route.params;
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [typeData, setTypeData] = useState([]);
  const [firstMove, setFirstMove] = useState(null);

  console.log("Fetching data for Pokemon ID:", id);
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemonData(response.data);

        const speciesResponse = await axios.get(response.data.species.url);
        setSpeciesData(speciesResponse.data);

        const firstMoveName = response.data.moves[0]?.move.name;
        setFirstMove(firstMoveName);

        const typeResponse = await Promise.all(
          response.data.types.map((t) => axios.get(t.type.url))
        );
        setTypeData(typeResponse.map((res) => res.data));
      } catch (error) {
        console.error("Erro ao buscar Pokémon:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!pokemonData || !speciesData || !typeData.length) {
    return <Text>Carregando</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PokemonImage style={styles.pokemonImage} />

      <View style={styles.header}>
        <Text style={styles.idText}>#{pokemonData.id}</Text>
        <Text style={styles.nameText}>{pokemonData.name}</Text>
      </View>

      <Image
        source={{ uri: pokemonData.sprites.front_default }}
        style={styles.shinySprite}
      />
      <View style={styles.typeContainer}>
        <View style={styles.subContainer}>
          <Text style={styles.typeText}>{pokemonData.types[0]?.type.name}</Text>
        </View>
        {pokemonData.types[1] && (
          <View style={styles.subContainer}>
            <Text style={styles.typeText}>
              {pokemonData.types[1]?.type.name}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <View style={{ width: "50%" }}>
          <Text style={styles.infoItemLabel}>Category:</Text>
          <Text style={styles.infoResponse}>
            {speciesData.genera.find((g) => g.language.name === "en").genus}
          </Text>

          <Text style={styles.infoItemLabel}>Gender:</Text>
          
          <View style={styles.genderContainer}>
            <Image source={Masculino} style={styles.genderIconMasc} />
            <Image source={Feminino} style={styles.genderIcon} />
          </View>
          

          <Text style={styles.infoItemLabel}>Height:</Text>
          <Text style={styles.infoResponse}>{pokemonData.height}m</Text>
          <Text style={styles.infoItemLabel}>Weight:</Text>
          <Text style={styles.infoResponse}>{pokemonData.weight}Kg</Text>
        </View>

        <View style={{ width: "50%" }}>
          <Text style={styles.infoItemLabel}>Weaknesses:</Text>
          {typeData.map((t) =>
            t.damage_relations.double_damage_from.map((weakness) => (
              <View key={weakness.name} style={styles.weaknessListItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.weaknessItem}>{weakness.name}</Text>
              </View>
            ))
          )}
          <View style={{ width: "60%" }}>
            <Text style={styles.infoItemLabel}>Abilities:</Text>
            <Text style={styles.moveItem}>{firstMove}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "visible",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "100%",
    alignSelf: "center",
  },
  genderIcon: {
    width: 15,
    height: 20,
    marginHorizontal: 5,
  },
  genderIconMasc: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  genderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  moveItem: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.5)",
  },
  infoResponse: {
    fontSize: 16,
    paddingLeft: 15,
    marginBottom: 10,
    color: "rgba(255, 255, 255, 0.5)",
  },

  infoItemLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    paddingLeft: 10,
    color: "#FFFFFF",
    width: "100%",
    padding: 5,
  },

  weaknessItem: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.5)",
  },
  shinySprite: {
    width: 352,
    height: 245,
    resizeMode: "contain",
    alignSelf: "center",

    backgroundColor: "#F993FB",
    borderRadius: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: Platform.OS === "ios" ? 50 : 40,
    alignItems: "center",
    paddingHorizontal: Platform.OS === "ios" ? 30 : 10,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: Platform.OS === "ios" ? 80 : 0,
  },
  idText: {
    color: "#FC7CFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
    marginRight: Platform.OS === "ios" ? 160 : 0,
  },

  typeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFEFC",
  },
  infoContainer: {
    overflow: "visible",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    backgroundColor: "#F993FB",
    borderRadius: 40,
    margin: 4,
    padding: 10,
  },

  infoItem: {
    fontSize: 16,
    fontWeight: "bold",
    width: "100%",
  },

  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",

    borderRadius: 30,
    padding: 23,
  },

  subContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: "#FCA600",
    borderRadius: 10,
  },
  weaknessListItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#1D8FF8",
    marginRight: 10,
  },
});

export default PokemonDetails;
