interface PokemonResponse {
  name: string;
  sprites: {
    back_default: string;
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
    };
  }[];
}
