import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppContext, { AppContextType } from "../../Context";
import PokemonsList from "../components/PokemonsList";
import PokemonInfo from "../components/PokemonInfo";

const Home = () => {
  const { stats } = React.useContext(AppContext) as AppContextType;

  return stats ? <PokemonInfo info={stats} /> : <PokemonsList />;
};

export default Home;

const styles = StyleSheet.create({});
