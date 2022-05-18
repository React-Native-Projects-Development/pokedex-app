import {useState} from 'react';

import {
  EvolutionChainResponse,
  IndividualPokemonResponse,
  SpeciesResponse,
} from 'interfaces/app-interfaces';
import {pokemonApi} from 'api/pokemonApi';

export const usePokemon = () => {
  const [pokemon, setPokemon] = useState<IndividualPokemonResponse>();
  const [isLoading, setIsLoading] = useState(true);

  const getPokemonData = async (pokemonId: string) => {
    const pokemonResponse = await pokemonApi.get<IndividualPokemonResponse>(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`,
    );

    const speciesResponse = await pokemonApi.get<SpeciesResponse>(
      pokemonResponse.data.species.url,
    );

    const evolutionResponse = await pokemonApi.get<EvolutionChainResponse>(
      speciesResponse.data.evolution_chain.url,
    );

    setPokemon({
      ...pokemonResponse.data,
      description: speciesResponse.data.flavor_text_entries[0].flavor_text,
      femaleRate:
        speciesResponse.data.gender_rate === -1
          ? -1
          : (speciesResponse.data.gender_rate / 1 / 8) * 100,
      maleRate:
        speciesResponse.data.gender_rate === -1
          ? -1
          : 100 - (speciesResponse.data.gender_rate / 1 / 8) * 100,
      egg_groups: speciesResponse.data.egg_groups.map(group => group.name),
      egg_cycle: speciesResponse.data.hatch_counter,
      evolution_chain: evolutionResponse.data.chain,
    });
    setIsLoading(false);
  };

  return {isLoading, pokemon, getPokemonData};
};
