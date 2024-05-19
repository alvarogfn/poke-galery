export interface Pokemon {
  name: string;
  sprites: {
    back_default: string;
    front_default: string;
    front_artwork: string;
  };
  stats: PokemonAttributes[];
}

export interface PokemonAttributes {
  name: string;
  value: number;
}
