import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import ImageColors from 'react-native-image-colors';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {SinglePokemon} from 'interfaces/app-interfaces';
import {PokedexStackParams} from 'navigation/AppNavigator';
import colors from 'theme/colors';
import fonts from 'config/fonts';
import {hp, wp} from 'theme/metrics';
import {CustomText} from './CustomText';
import {FadeInImage} from './FadeInImage';

interface Props {
  item: SinglePokemon;
  index: number;
}

export const PokeCard = ({item, index}: Props) => {
  const [bgColor, setBgColor] = useState(colors.search);
  const isMounted = useRef(true);
  const navigation = useNavigation<StackNavigationProp<PokedexStackParams>>();

  const getBgColor = useCallback(async () => {
    const result = await ImageColors.getColors(item.picture, {
      cache: true,
      fallback: colors.searchbar,
    });

    if (!isMounted.current || !result) {
      return;
    }

    if (result.platform === 'android') {
      setBgColor(result.dominant || 'gray');
    } else if (result.platform === 'ios') {
      setBgColor(result.background);
    }
  }, [item.picture]);

  const cardCustomStyles = {
    marginRight: index % 2 === 0 ? wp(10) : 0,
    backgroundColor: bgColor,
  };

  useEffect(() => {
    getBgColor();

    return () => {
      isMounted.current = false;
    };
  }, [getBgColor]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('PokemonDetailsScreen', {
          pokemon: {
            ...item,
            color: bgColor,
          },
        })
      }
      style={[styles.cardContainer, cardCustomStyles]}>
      {/* Number */}
      <CustomText variant="number" style={styles.number}>
        {index < 10
          ? `#00${index + 1}`
          : index < 100
          ? `#0${index}`
          : `#${index}`}
      </CustomText>
      {/* Pokeball */}
      <View style={styles.pokeballContainer}>
        <Image
          source={require('~assets/images/pokeball-white.png')}
          style={{
            width: wp(83),
            height: wp(83),
            bottom: hp(-15),
            right: wp(-5),
          }}
        />
      </View>
      <CustomText variant="card" style={styles.pokemonName}>
        {item.name}
      </CustomText>
      {/* Tags */}
      <View style={styles.tagsContainer}>
        {item.types.map((type, idx) => (
          <View
            key={`${type.type.name}${idx}`}
            style={[
              styles.tag,
              {paddingHorizontal: type.type.name.length <= 4 ? wp(10) : wp(8)},
            ]}>
            <CustomText variant="tag" style={styles.tagText}>
              {type.type.name}
            </CustomText>
          </View>
        ))}
      </View>
      {/* Pokemon Image */}

      <FadeInImage uri={item.picture} style={styles.fadeInImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: hp(10),
    width: wp(155),
    height: hp(110),
    borderRadius: wp(15),
    paddingLeft: wp(16),
    paddingTop: hp(24),
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.27,
    shadowRadius: 5,

    elevation: 6,
  },
  pokeballContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    opacity: 0.8,
    width: wp(83),
    height: wp(83),
    overflow: 'hidden',
  },
  number: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontFamily: fonts.CircularBold,
    fontSize: wp(14),
    color: 'rgba(0,0,0, 0.25)',
  },
  pokemonName: {
    textTransform: 'capitalize',
    marginBottom: hp(10),
  },
  tagsContainer: {
    alignItems: 'flex-start',
  },
  tag: {
    height: hp(16),
    marginBottom: hp(6),
    borderRadius: wp(20),
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255, 0.2)',
  },
  tagText: {
    textTransform: 'capitalize',
  },
  fadeInImage: {
    width: wp(75),
    height: wp(75),
    position: 'absolute',
    bottom: 0,
    right: 2,
  },
});
