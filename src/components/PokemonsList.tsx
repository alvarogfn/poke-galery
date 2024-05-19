import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
  View,
} from "react-native";
import React from "react";
import AppContext, { AppContextType } from "../../Context";
import PokemonCard from "./PokemonCard";
import PokemonListFooter from "./PokemonListFooter";
import Card from "./Card";
import ErrorHandleComponent from "./ErrorHandleComponent";
import { Pokemon } from "../models/Pokemon";

const PokemonsList = () => {
  const [pokemons, setPokemons] = React.useState<Pokemon[] | null>();
  const [next, setNext] = React.useState<boolean>(false);
  const [prev, setPrev] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(1);

  const [loading, setLoading] = React.useState(true);

  const [error, setError] = React.useState<Error | null>(null);

  const { getAllPokemons } = React.useContext(AppContext) as AppContextType;

  React.useEffect(() => {
    setPokemons([]);
    setLoading(true);

    getAllPokemons(page, 8)
      .then((response) => {
        setPokemons(response.results);
        setNext(response.next);
        setPrev(response.previous);
        setPage(page);
      })
      .catch((r: Error) => setError(r))
      .finally(() => setLoading(false));
  }, [page, setPokemons, setNext, setPrev, setPage, setLoading, setError]);

  const renderItem: ListRenderItem<Pokemon> = ({ item }) => {
    return <PokemonCard pokemon={item} />;
  };

  function changePage(callback: (value: number) => number) {
    setPage(callback(page));
  }

  return (
    <Card title="Poke-Galery">
      <ErrorHandleComponent error={error}>
        <FlatList
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-around" }}
          data={pokemons}
          keyExtractor={({ name }) => name}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <View>
              <ActivityIndicator color="#000" size={100} />
              <Text>Loading Pokemons...</Text>
            </View>
          )}
          ListFooterComponent={() =>
            !loading && (
              <PokemonListFooter
                changePage={changePage}
                hasNext={next}
                hasPrev={prev}
                page={page}
              />
            )
          }
        />
      </ErrorHandleComponent>
    </Card>
  );
};

export default PokemonsList;
