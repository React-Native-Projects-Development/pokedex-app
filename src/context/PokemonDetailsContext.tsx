import {pokemonApi} from 'api/pokemonApi';
import {
  EvolutionChainResponse,
  IndividualPokemonResponse,
  SpeciesResponse,
  TypesResponse,
} from 'interfaces/app-interfaces';
import React, {createContext, useState} from 'react';

interface PokemonDetailsContextProps {
  isLoading: boolean;
  pokemon: IndividualPokemonResponse | undefined;
  getPokemonData: (pokemonId: string) => void;
}

export const PokemonDetailsContext = createContext(
  {} as PokemonDetailsContextProps,
);

export const PokemonDetailsProvider: React.FC = ({children}) => {
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

    const typesResponse = await Promise.all(
      pokemonResponse.data.types.map(type =>
        pokemonApi.get<TypesResponse>(type.type.url),
      ),
    );

    console.log({typesResponse});

    const formattedTypes = typesResponse.map(resp => ({
      double_damage_from: resp?.data?.damage_relations?.double_damage_from,
      half_damage_from: resp?.data?.damage_relations?.half_damage_from,
    }));

    const newTypesData =
      formattedTypes.length === 1
        ? {
            double_damage_from: [...formattedTypes[0].double_damage_from],
            half_damage_from: [...formattedTypes[0].half_damage_from],
          }
        : {
            double_damage_from: [
              ...formattedTypes[0].double_damage_from,
              ...formattedTypes[1].double_damage_from,
            ],
            half_damage_from: [
              ...formattedTypes[0].half_damage_from,
              ...formattedTypes[1].half_damage_from,
            ],
          };
    setPokemon({
      ...pokemonResponse.data,
      description: speciesResponse.data.flavor_text_entries[6].flavor_text,
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
      evolves_from_species: speciesResponse?.data?.evolves_from_species,
      evolution_chain: evolutionResponse.data.chain,
      damage_relations: newTypesData,
    });
    setIsLoading(false);
  };

  return (
    <PokemonDetailsContext.Provider
      value={{isLoading, pokemon, getPokemonData}}>
      {children}
    </PokemonDetailsContext.Provider>
  );
};
