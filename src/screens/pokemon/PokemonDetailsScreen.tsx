import React, {useCallback, useContext, useMemo, useRef, useState} from 'react';
import {Animated, Image, TouchableOpacity, View} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BottomSheet from '@gorhom/bottom-sheet';

import styles from './styles';
import {TabsNavigator} from 'navigation/TabsNavigator';
import {PokedexStackParams} from 'navigation/AppNavigator';
import {hp, SCREEN_HEIGHT, wp} from 'theme/metrics';
import {CustomText} from 'components/CustomText';
import ArrowBackIcon from 'components/icons/ArrowBackIcon';
import HeartOutlineIcon from 'components/icons/HeartOutlineIcon';
import HeartFilledIcon from 'components/icons/HeartFilledIcon';
import {PokemonDetailsContext} from 'context/PokemonDetailsContext';

interface Props
  extends StackScreenProps<PokedexStackParams, 'PokemonDetailsScreen'> {}

export const PokemonDetailsScreen = ({navigation, route}: Props) => {
  const {pokemon} = route.params;
  const {id, name, color} = pokemon;
  const {top} = useSafeAreaInsets();
  const {onBottomSheetChange} = useContext(PokemonDetailsContext);

  const [isLiked, setIsLiked] = useState(false);

  const likeUnlikePokemon = () => setIsLiked(prevState => !prevState);

  // Header opacity
  const headerNameOpacity = useRef(new Animated.Value(0)).current;

  // Pokemon Info opacity
  const pokemonInfoOpacity = useRef(new Animated.Value(1)).current;

  // Bottomsheet
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const imageOpacity = useRef(new Animated.Value(1)).current;
  // variables
  const snapPoints = useMemo(
    () => [
      SCREEN_HEIGHT < 812 ? SCREEN_HEIGHT * 0.45 : SCREEN_HEIGHT * 0.5,
      SCREEN_HEIGHT - 150,
    ],
    [],
  );

  // callbacks
  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === 0) {
        Animated.spring(imageOpacity, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
        Animated.spring(headerNameOpacity, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        Animated.spring(pokemonInfoOpacity, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.spring(imageOpacity, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        Animated.spring(headerNameOpacity, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
        Animated.spring(pokemonInfoOpacity, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }

      onBottomSheetChange(index);
    },
    [imageOpacity, headerNameOpacity, pokemonInfoOpacity, onBottomSheetChange],
  );

  const heartScale = useRef(new Animated.Value(1)).current;

  const animateHeart = useCallback(() => {
    Animated.spring(heartScale, {
      toValue: 1.3,
      speed: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(heartScale, {
        toValue: 1,
        speed: 200,
        useNativeDriver: true,
      }).start();
    });
  }, [heartScale]);

  return (
    <View style={{...styles.container, backgroundColor: color}}>
      {/* Square */}
      <View style={styles.square} />

      {/* Header */}
      <View style={[styles.header, {height: top + 60}]}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={[
              {
                width: wp(22),
                height: hp(25),
              },
              styles.center,
            ]}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}>
            <ArrowBackIcon width={wp(22)} height={hp(13.65)} color="#fff" />
          </TouchableOpacity>
          <Animated.Text
            style={{
              opacity: headerNameOpacity,
              ...styles.headerText,
            }}>
            {pokemon.name}
          </Animated.Text>
          <Animated.View style={{transform: [{scale: heartScale}]}}>
            <TouchableOpacity
              style={[
                {
                  width: wp(20),
                  height: hp(25),
                },
                styles.center,
              ]}
              activeOpacity={0.8}
              onPress={() => {
                likeUnlikePokemon();
                animateHeart();
              }}>
              {isLiked ? (
                <HeartFilledIcon />
              ) : (
                <HeartOutlineIcon width={20} height={20} />
              )}
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>

      {/* Pokemon Name, Number and Types */}

      <View style={styles.pokemonInfoContainer}>
        <View style={styles.row}>
          <Animated.Text
            style={{
              opacity: pokemonInfoOpacity,
              ...styles.pokemonInfoName,
            }}>
            {name}
          </Animated.Text>
          <CustomText variant="pokemonNumber">
            {parseInt(id, 10) < 10
              ? `#00${id}`
              : parseInt(id, 10) < 100
              ? `#0${id}`
              : `#${id}`}
          </CustomText>
        </View>
        <View style={styles.tagsContainer}>
          {pokemon.types.map((type, idx) => (
            <View key={`${type.type.name}${idx}`} style={[styles.tag]}>
              <CustomText variant="pokemonTagType" style={styles.tagText}>
                {type.type.name}
              </CustomText>
            </View>
          ))}
        </View>
      </View>

      {/* Pokemon and pokeball images container */}

      <View style={{marginTop: hp(25)}}>
        {/* Pokeball */}
        <View style={styles.pokeballContainer}>
          <Image
            source={require('~assets/images/pokeball-white.png')}
            style={{width: wp(183), height: hp(183)}}
            resizeMode="contain"
          />
        </View>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}
        handleComponent={() =>
          imageOpacity ? (
            <Animated.View
              style={{
                opacity: imageOpacity,
                ...styles.pokemonImgContainer,
              }}>
              <Image
                source={{uri: pokemon.picture}}
                style={styles.pokemonImg}
                resizeMode="contain"
              />
            </Animated.View>
          ) : null
        }>
        <TabsNavigator id={id} />
      </BottomSheet>
    </View>
  );
};
