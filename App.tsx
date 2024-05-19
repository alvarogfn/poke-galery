import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ContextProvider } from "./Context";
import PokemonsList from "./src/components/PokemonsList";
import { Platform, StatusBar } from "react-native";
import {
  useFonts,
  NovaSquare_400Regular as NovaSquareRegular,
} from "@expo-google-fonts/nova-square";
import PokemonStats from "./src/components/PokemonInfo";
import Home from "./src/Views/Home";

export default function App() {
  const [fontsLoaded] = useFonts({
    NovaSquareRegular,
  });

  if (!fontsLoaded) return null;

  return (
    <ContextProvider>
      <SafeAreaView style={styles.container}>
        <Home />
      </SafeAreaView>
    </ContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    height: "100%",
    width: "100%",
    backgroundColor: "#00000090",
    position: "relative",
    flexDirection: "column",
  },
});
