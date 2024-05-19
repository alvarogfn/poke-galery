import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

interface props {
  hasNext: boolean;
  hasPrev: boolean;
  page: number;
  changePage: (callback: (value: number) => number) => void;
}

const PokemonListFooter = ({ hasPrev, hasNext, page, changePage }: props) => {
  return (
    <View style={styles.container}>
      <Button
        disabled={!hasPrev}
        onPress={() => changePage((value) => value - 1)}
        title="Prev"
      />

      <Text style={styles.page}>{page}</Text>

      <Button
        disabled={!hasNext}
        onPress={() => changePage((value) => value + 1)}
        title="Next"
      />
    </View>
  );
};

export default PokemonListFooter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 15,
    marginBottom: 5,
  },
  page: {
    fontFamily: "NovaSquareRegular",
    fontWeight: "900",
    fontSize: 20,
  },
});
