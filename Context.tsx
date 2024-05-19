import React from "react";
import { ApplicationError } from "./src/errors/Errors";
import AllPokemons from "./src/models/AllPokemons";
import { Pokemon, PokemonAttributes } from "./src/models/Pokemon";
import { PokemonsResponse } from "./src/models/PokemonsResponse";
import { request } from "./src/utils/request";

const ENDPOINT = "https://pokeapi.co/api/v2";

export interface AppContextType {
  getAllPokemons: (page?: number, limit?: number) => Promise<AllPokemons>;
  getPokemonByUrl: (url: URL) => Promise<Pokemon>;
  stats: Pokemon | null;
  setStats: (value: Pokemon) => void;
}

const AppContext = React.createContext<AppContextType>(null);

const ContextProvider = ({ children }) => {
  const [stats, setStats] = React.useState<Pokemon | null>(null);

  async function getPokemonByUrl(url: URL) {
    const response = await request<PokemonResponse>(url);

    const { name, sprites, stats } = response;
    const { back_default, front_default, other } = sprites;
    const front_artwork = other["official-artwork"].front_default;

    let filteredStats: PokemonAttributes[] = [];

    try {
      filteredStats = stats.map((item: any) => {
        return {
          name: item.stat.name.replace("special-", "Sp."),
          value: item.base_stat,
        };
      });
    } catch (_) {
      throw new ApplicationError(
        "Something went wrong processing the Pokemons"
      );
    }

    const pokemon: Pokemon = {
      name,
      sprites: { back_default, front_default, front_artwork },
      stats: filteredStats,
    };

    return pokemon;
  }

  async function getAllPokemons(
    page: number = 1,
    limit: number = 10
  ): Promise<AllPokemons> {
    const url = new URL("pokemon", ENDPOINT);
    url.searchParams.append("limit", limit.toString());

    // the api will return results from last limit amount,
    // starting: 1 = 0, 2 = 10, 3 = 20 for the defaults parameters.
    if (page) {
      url.searchParams.append("offset", ((page - 1) * limit).toString());
    }

    const response = await request<PokemonsResponse>(url);

    const pokemonsList = await Promise.all(
      response.results.map(({ url }) => {
        return getPokemonByUrl(new URL(url));
      })
    );

    return {
      next: !!response.next,
      previous: !!response.previous,
      results: pokemonsList,
    };
  }

  return (
    <AppContext.Provider
      value={{
        getAllPokemons,
        getPokemonByUrl,
        stats,
        setStats: (value: Pokemon) => setStats(value),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
export { ContextProvider, AppContext };
