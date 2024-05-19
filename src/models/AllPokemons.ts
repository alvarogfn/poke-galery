import { Pokemon } from "./Pokemon";

export default interface AllPokemons {
  next: boolean;
  previous: boolean;
  results: Pokemon[];
}
