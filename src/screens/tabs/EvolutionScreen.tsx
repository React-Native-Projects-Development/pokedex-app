import React, {useContext} from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {BottomSheetScrollView} from '@gorhom/bottom-sheet';

import colors from 'theme/colors';
import {PokemonDetailsContext} from 'context/PokemonDetailsContext';
import {useEvolution} from 'hooks/useEvolution';
import {CustomText} from 'components/CustomText';
import {hp, wp} from 'theme/metrics';
import RightArrowLong from 'components/icons/RightArrowLong';

export const EvolutionScreen = () => {
  const {pokemon} = useContext(PokemonDetailsContext);
  const {getId, getPicture} = useEvolution();

  const itemIdx =
    pokemon?.evolution_chain?.evolves_to[0]?.evolves_to[0]?.evolution_details.findIndex(
      detail => detail.item,
    );
  // const happinessIdx =
  //   pokemon?.evolution_chain?.evolves_to[0]?.evolves_to[0]?.evolution_details?.findIndex(
  //     detail => detail.min_happiness,
  //   );

  const specificPokemon = pokemon?.evolution_chain?.evolves_to.find(
    evolution => evolution.species.name === pokemon.name,
  );

  // console.log({pokemon});
  // console.log({specificPokemon});

  // console.log(pokemon?.evolution_chain);

  return (
    <View style={styles.container}>
      <BottomSheetScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <CustomText variant="pokemonSectionTitle">Evolution Chain</CustomText>
        {pokemon?.evolution_chain?.evolves_to.length === 0 ? (
          <CustomText>This pokemon has no evolution chain.</CustomText>
        ) : (
          <View style={{marginTop: hp(26), paddingHorizontal: wp(15)}}>
            {/* More than 2 evolutions */}
            {pokemon?.evolution_chain?.evolves_to?.length! > 2 &&
            !pokemon?.evolves_from_species ? (
              pokemon?.evolution_chain?.evolves_to.map((evolution, index) => {
                const foundItemIdx = evolution.evolution_details.findIndex(
                  detail => detail.item,
                );
                const foundHappinessIdx = evolution.evolution_details.findIndex(
                  detail => detail.min_happiness,
                );

                return (
                  <React.Fragment key={evolution.species.name + index}>
                    <View style={styles.evolutionContainer}>
                      {/* First */}
                      <View style={styles.pokemonContainer}>
                        <View style={styles.pokemonImagesContainer}>
                          <Image
                            style={styles.pokeballImg}
                            source={require('~assets/images/pokeball.png')}
                          />
                          <Image
                            style={styles.pokemonEvoImg}
                            source={{
                              uri: getPicture(
                                getId(pokemon?.evolution_chain?.species.url),
                              ),
                            }}
                          />
                        </View>
                        <CustomText style={styles.pokemonName}>
                          {pokemon?.evolution_chain.species.name}
                        </CustomText>
                      </View>
                      <View style={styles.center}>
                        <RightArrowLong width={wp(22)} height={hp(11.65)} />
                        <CustomText variant="tagBold" style={styles.lvlText}>
                          {evolution?.evolution_details[0]?.min_level
                            ? `Lvl ${evolution?.evolution_details[0]?.min_level}`
                            : evolution?.evolution_details[foundItemIdx]?.item
                            ? `Use ${evolution?.evolution_details[foundItemIdx]?.item?.name}`
                            : `${
                                evolution?.evolution_details[0]?.trigger?.name
                              } ${
                                evolution.evolution_details[0].time_of_day
                                  ? `(${evolution.evolution_details[0].time_of_day})`
                                  : ''
                              }`}

                          {!evolution?.evolution_details[foundItemIdx]?.item
                            .name &&
                            !evolution?.evolution_details[0]?.min_level &&
                            !evolution.evolution_details[0].time_of_day &&
                            `\n Min. Happiness (${evolution.evolution_details[foundHappinessIdx].min_happiness})`}
                        </CustomText>
                      </View>

                      {/* Second */}
                      <View style={styles.pokemonContainer}>
                        <View style={styles.pokemonImagesContainer}>
                          <Image
                            style={styles.pokeballImg}
                            source={require('~assets/images/pokeball.png')}
                          />
                          <Image
                            style={styles.pokemonEvoImg}
                            source={{
                              uri: getPicture(getId(evolution.species.url)),
                            }}
                          />
                        </View>
                        <CustomText style={styles.pokemonName}>
                          {evolution.species.name}
                        </CustomText>
                      </View>
                    </View>
                    <View style={styles.divider} />
                  </React.Fragment>
                );
              })
            ) : (
              <>
                {/* Regular evolutions cycle */}
                {/* First phase */}
                <View style={styles.evolutionContainer}>
                  {/* First */}
                  <View style={styles.pokemonContainer}>
                    <View style={styles.pokemonImagesContainer}>
                      <Image
                        style={styles.pokeballImg}
                        source={require('~assets/images/pokeball.png')}
                      />
                      <Image
                        style={styles.pokemonEvoImg}
                        source={{
                          uri: getPicture(
                            getId(pokemon?.evolution_chain.species.url),
                          ),
                        }}
                      />
                    </View>
                    <CustomText style={styles.pokemonName}>
                      {pokemon?.evolution_chain.species.name}
                    </CustomText>
                  </View>
                  <View style={styles.center}>
                    <RightArrowLong width={wp(22)} height={hp(11.65)} />
                    <CustomText variant="tagBold" style={styles.lvlText}>
                      {specificPokemon?.evolution_details[0]?.trigger?.name ===
                        'level-up' &&
                      specificPokemon.evolution_details[0].time_of_day
                        ? `${specificPokemon?.evolution_details[0]?.trigger?.name} (${specificPokemon.evolution_details[0].time_of_day})`
                        : pokemon?.evolution_chain.evolves_to[0]
                            .evolution_details[0].min_level
                        ? `Lvl ${pokemon?.evolution_chain.evolves_to[0].evolution_details[0].min_level}`
                        : pokemon?.evolution_chain.evolves_to[0]
                            .evolution_details[0].item
                        ? `Use ${
                            specificPokemon
                              ? specificPokemon.evolution_details[0]?.item?.name
                              : pokemon?.evolution_chain.evolves_to[0]
                                  ?.evolution_details[0]?.item?.name
                          }`
                        : `${
                            pokemon?.evolution_chain.evolves_to[0]
                              .evolution_details[0]?.trigger?.name
                          } ${
                            pokemon?.evolution_chain.evolves_to[0]
                              .evolution_details[0].time_of_day
                              ? `(${pokemon?.evolution_chain.evolves_to[0].evolution_details[0].time_of_day})`
                              : ''
                          }`}
                      {!pokemon?.evolution_chain.evolves_to[0]
                        .evolution_details[0].time_of_day &&
                        !pokemon?.evolution_chain.evolves_to[0]
                          .evolution_details[0].item &&
                        !pokemon?.evolution_chain.evolves_to[0]
                          .evolution_details[0].min_level &&
                        pokemon?.evolution_chain.evolves_to[0]
                          .evolution_details[0].trigger.name === 'level-up' &&
                        pokemon?.evolution_chain.evolves_to[0]
                          ?.evolution_details[0]?.min_happiness &&
                        `\n Min. Happiness (${pokemon?.evolution_chain.evolves_to[0]?.evolution_details[0]?.min_happiness})`}

                      {pokemon?.evolution_chain.evolves_to[0]
                        .evolution_details[0].turn_upside_down &&
                        '\n Turn console upside down'}
                    </CustomText>
                  </View>

                  {/* Second */}
                  <View style={styles.pokemonContainer}>
                    <View style={styles.pokemonImagesContainer}>
                      <Image
                        style={styles.pokeballImg}
                        source={require('~assets/images/pokeball.png')}
                      />
                      <Image
                        style={styles.pokemonEvoImg}
                        source={{
                          uri: getPicture(
                            getId(
                              pokemon?.evolution_chain?.evolves_to?.length === 1
                                ? pokemon?.evolution_chain.evolves_to[0]
                                    ?.species.url
                                : specificPokemon?.species.url ||
                                    pokemon?.evolution_chain.evolves_to[0]
                                      ?.species.url,
                            ),
                          ),
                        }}
                      />
                    </View>
                    <CustomText style={styles.pokemonName}>
                      {pokemon?.evolution_chain.evolves_to.length === 1
                        ? pokemon?.evolution_chain.evolves_to[0].species.name
                        : specificPokemon?.species.name ||
                          pokemon?.evolution_chain.evolves_to[0].species.name}
                    </CustomText>
                  </View>
                </View>

                {pokemon?.evolution_chain.evolves_to[0].evolves_to.length >
                  0 && <View style={styles.divider} />}

                {/* 2nd phase */}
                {pokemon?.evolution_chain.evolves_to[0].evolves_to.length >
                  0 && (
                  <View style={styles.evolutionContainer}>
                    {/* 2nd evolution */}
                    <View style={styles.pokemonContainer}>
                      <View style={styles.pokemonImagesContainer}>
                        <Image
                          style={styles.pokeballImg}
                          source={require('~assets/images/pokeball.png')}
                        />
                        <Image
                          style={styles.pokemonEvoImg}
                          source={{
                            uri: getPicture(
                              getId(
                                pokemon?.evolution_chain.evolves_to[0].species
                                  .url!,
                              ),
                            ),
                          }}
                        />
                      </View>
                      <CustomText style={styles.pokemonName}>
                        {pokemon?.evolution_chain.evolves_to[0].species.name}
                      </CustomText>
                    </View>
                    <View style={styles.center}>
                      <RightArrowLong width={wp(22)} height={hp(11.65)} />
                      <CustomText variant="tagBold" style={styles.lvlText}>
                        {pokemon?.evolution_chain.evolves_to[0].evolves_to[0]
                          .evolution_details[0].min_level
                          ? `Lvl ${pokemon?.evolution_chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level}`
                          : pokemon?.evolution_chain.evolves_to[0].evolves_to[0]
                              .evolution_details[itemIdx || 0]?.item
                          ? `Use ${
                              pokemon?.evolution_chain.evolves_to[0]
                                .evolves_to[0].evolution_details[itemIdx || 0]
                                ?.item.name
                            }`
                          : pokemon?.evolution_chain.evolves_to[0].evolves_to[0]
                              .evolution_details[0].trigger.name}

                        {!pokemon?.evolution_chain.evolves_to[0].evolves_to[0]
                          .evolution_details[0].time_of_day &&
                          !pokemon?.evolution_chain.evolves_to[0].evolves_to[0]
                            .evolution_details[itemIdx || 0]?.item &&
                          !pokemon?.evolution_chain.evolves_to[0].evolves_to[0]
                            .evolution_details[0].min_level &&
                          pokemon?.evolution_chain?.evolves_to[0]?.evolves_to[0]
                            ?.evolution_details[0]?.trigger?.name ===
                            'level-up' &&
                          `\n Min. Happiness (${pokemon?.evolution_chain.evolves_to[0].evolves_to[0]?.evolution_details[0]?.min_happiness})`}
                      </CustomText>
                    </View>

                    {/* 3rd evolution */}
                    <View style={styles.pokemonContainer}>
                      <View style={styles.pokemonImagesContainer}>
                        <Image
                          style={styles.pokeballImg}
                          source={require('~assets/images/pokeball.png')}
                        />
                        <Image
                          style={styles.pokemonEvoImg}
                          source={{
                            uri: getPicture(
                              getId(
                                pokemon?.evolution_chain.evolves_to[0]
                                  .evolves_to[0].species.url,
                              ),
                            ),
                          }}
                        />
                      </View>
                      <CustomText style={styles.pokemonName}>
                        {
                          pokemon?.evolution_chain.evolves_to[0].evolves_to[0]
                            .species.name
                        }
                      </CustomText>
                    </View>
                  </View>
                )}
              </>
            )}
          </View>
        )}
      </BottomSheetScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    paddingBottom: 31,
    paddingTop: 31,
    paddingHorizontal: 27,
  },
  evolutionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pokemonContainer: {
    height: hp(83),
    width: hp(83),
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokemonImagesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  pokeballImg: {
    zIndex: -1,
    height: '100%',
    width: '100%',
  },
  pokemonEvoImg: {
    position: 'absolute',
    height: hp(71),
    width: hp(76),
  },
  pokemonName: {
    textTransform: 'capitalize',
  },
  center: {
    alignItems: 'center',
  },
  lvlText: {
    marginTop: hp(7.35),
    color: colors.textTitle,
    textTransform: 'capitalize',
  },
  divider: {
    width: '100%',
    backgroundColor: '#F4F5F4',
    height: hp(2),
    marginVertical: hp(25),
  },
});
