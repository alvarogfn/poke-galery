import React from "react";
import { Image, StyleSheet, View } from "react-native";
import AppContext, { AppContextType } from "../../Context";
import Card from "./Card";
import PokemonAttributeBar from "./PokemonAttributeBar";
import OpacityAnimation from "./OpacityAnimation";
import AnimatedText from "./AnimatedText";
import { Pokemon } from "../models/Pokemon";

interface props {
  info: Pokemon;
}

const PokemonInfo = ({ info }: props) => {
  const { setStats } = React.useContext(AppContext) as AppContextType;

  const [max] = React.useState(() => {
    return info.stats.reduce(
      (prev, { value }) => (value > prev ? value : prev),
      0
    );
  });

  return (
    <Card title="View Pokemon" onCloseCard={() => setStats(null)}>
      <View style={styles.content}>
        <OpacityAnimation delay={400} duration={1000}>
          <Image
            style={styles.picture}
            source={{ uri: info.sprites.front_artwork }}
            resizeMode="contain"
          />
        </OpacityAnimation>

        <AnimatedText delay={2000} style={styles.name} text={info.name} />
        <View style={styles.attrBar}>
          {info.stats.map((item) => {
            return (
              <PokemonAttributeBar
                key={item.name}
                label={item.name}
                actual={item.value}
                max={max}
              />
            );
          })}
        </View>
      </View>
    </Card>
  );
};

export default PokemonInfo;

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    width: "100%",
  },

  picture: {
    height: 150,
    width: 150,
  },

  name: {
    fontFamily: "NovaSquareRegular",
    fontWeight: "900",
    fontSize: 25,
    textTransform: "uppercase",
    marginTop: 30,
    marginBottom: 10,
  },

  attrBar: {
    width: "100%",
    marginVertical: 30,
    paddingHorizontal: 10,
  },
});
