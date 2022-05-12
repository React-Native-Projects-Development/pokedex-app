import {useEffect, useRef, useState} from 'react';

import {pokemonApi} from 'api/pokemonApi';
import {
  IndividualPokemonResponse,
  PokemonPaginatedResponse,
  Result,
  SinglePokemon,
  Type,
} from 'interfaces/app-interfaces';

export const usePaginatedPokemons = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemons, setPokemons] = useState<SinglePokemon[]>([]);

  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon/?limit=40');

  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SinglePokemon[] = pokemonList.map(({name, url}) => {
      // url example: https://pokeapi.co/api/v2/pokemon/38/"
      const urlParts = url.split('/');
      const pokemonId = urlParts[urlParts.length - 2];
      // picture url: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

      // Types and Sprites
      // specific pokemon info -> https://pokeapi.co/api/v2/pokemon/{id or name}/
      let types: Type[] = [];
      // let sprites: Sprites = {
      //   back_default: '',
      //   back_female: '',
      //   back_shiny: '',
      //   back_shiny_female: '',
      //   front_default: '',
      //   front_female: '',
      //   front_shiny: '',
      //   front_shiny_female: '',
      // };
      pokemonApi
        .get<IndividualPokemonResponse>(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`,
        )
        .then(response => {
          types.push(...response.data.types);
          // sprites = {...response.data.sprites};
        });

      return {
        id: pokemonId,
        name,
        types,
        picture,
      };
    });

    setPokemons(prevState => [...prevState, ...newPokemonList]);
  };

  const loadPokemons = async () => {
    const {data} = await pokemonApi.get<PokemonPaginatedResponse>(
      nextPageUrl.current,
    );

    nextPageUrl.current = data.next;

    setIsLoading(pokemons.length <= data.count);

    mapPokemonList(data.results);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    isLoading,
    pokemons,
    loadPokemons,
  };
};
