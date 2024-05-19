import { Animated, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppContext, { AppContextType } from "../../Context";
import IconButton from "./IconButton";
import { Pokemon } from "../models/Pokemon";

interface props {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: props) => {
  const [animation] = React.useState(new Animated.Value(1));

  const onTouch = () => {
    Animated.spring(animation, {
      toValue: 1.15,
      useNativeDriver: true,
    }).start();
  };

  const onExit = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const { setStats } = React.useContext(AppContext) as AppContextType;

  return (
    <Animated.View
      onTouchStart={onTouch}
      onTouchEnd={onExit}
      style={[styles.container, { transform: [{ scale: animation }] }]}
    >
      <Image
        style={styles.sprit}
        resizeMode="cover"
        source={{ uri: pokemon.sprites.front_default }}
      />
      <Text style={styles.name}>{pokemon.name}</Text>
      <View style={styles.buttons}>
        <IconButton
          style={styles.button}
          size={28}
          name="search"
          onPress={() => setStats(pokemon)}
        />
        <IconButton style={styles.button} size={28} name="bookmark" />
        <IconButton
          style={styles.button}
          size={28}
          name="keyboard-arrow-right"
        />
      </View>
    </Animated.View>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  container: {
    flexBasis: 175,
    marginVertical: 20,
    marginHorizontal: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  content: {},
  sprit: {
    height: 130,
    width: 130,
  },
  name: {
    fontWeight: "900",
    fontFamily: "NovaSquareRegular",
    fontSize: 20,

    textAlign: "center",
    textTransform: "capitalize",

    marginVertical: 5,
  },
  buttons: {
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    marginHorizontal: 5,
  },
});
