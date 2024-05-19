import { Animated, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

interface props {
  max: number;
  actual: number;
  label: string;
}
const PokemonAttributeBar = ({ max, actual, label }: props) => {
  const percentage = (actual * 100) / max;

  const [percentageAnimation] = useState(new Animated.Value(0));

  const [actualAnimValue, setActualAnimValue] = useState(0);

  React.useEffect(() => {
    Animated.timing(percentageAnimation, {
      toValue: percentage,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    return () => {
      percentageAnimation.removeAllListeners();
    };
  }, []);

  React.useEffect(() => {
    percentageAnimation.addListener(({ value }) => setActualAnimValue(value));
    return () => percentageAnimation.removeAllListeners();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.amount}>{actual}</Text>
      <View style={styles.bar}>
        <Animated.View
          style={[styles.percentage, { width: `${actualAnimValue}%` }]}
        />
      </View>
    </View>
  );
};

export default PokemonAttributeBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  label: {
    flexBasis: 90,

    fontSize: 17,
    fontWeight: "500",
    fontFamily: "NovaSquareRegular",

    textTransform: "capitalize",
  },
  amount: {
    textAlign: "center",

    fontSize: 17,
    fontWeight: "900",

    flexBasis: 40,

    marginHorizontal: 5,
  },
  bar: {
    flexDirection: "column",
    flexGrow: 1,

    marginLeft: 10,
  },
  percentage: {
    flexGrow: 1,
    backgroundColor: "#b11226",
  },
});
