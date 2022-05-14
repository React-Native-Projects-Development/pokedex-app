import React, {useCallback, useMemo, useRef} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';
import BottomSheet from '@gorhom/bottom-sheet';

import {PokedexStackParams} from 'navigation/AppNavigator';
import ArrowBackIcon from 'components/icons/ArrowBackIcon';
import {hp, SCREEN_HEIGHT, wp} from 'theme/metrics';
import HeartOutlineIcon from 'components/icons/HeartOutlineIcon';
import styles from './styles';
import {CustomText} from 'components/CustomText';
import {TabsNavigator} from 'navigation/TabsNavigator';

interface Props
  extends StackScreenProps<PokedexStackParams, 'PokemonDetailsScreen'> {}

export const PokemonDetailsScreen = ({navigation, route}: Props) => {
  const {pokemon} = route.params;
  const {id, name, color} = pokemon;

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(
    () => [SCREEN_HEIGHT < 812 ? '45%' : '50%', '70%'],
    [],
  );

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View style={{backgroundColor: color, flex: 1, zIndex: -1}}>
      {/* Square */}
      <View
        style={{
          position: 'absolute',
          left: -30,
          top: -40,
          width: 143,
          height: 143,
          backgroundColor: 'rgba(255,255,255, 0.1)',
          transform: [{rotate: '75deg'}],
          borderRadius: 24,
        }}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <ArrowBackIcon width={wp(22)} height={hp(13.65)} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => console.log('pressed')}>
          <HeartOutlineIcon width={20} height={20} />
        </TouchableOpacity>
      </View>

      {/* Pokemon Name, Number and Types */}
      <View style={{marginTop: hp(30), marginHorizontal: wp(26)}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <CustomText
            variant="pokemonName"
            style={{textTransform: 'capitalize'}}>
            {name}
          </CustomText>
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
        <View
          style={{
            flex: 1,
            width: '100%',
            position: 'absolute',
            top: hp(20),
            alignItems: 'center',
            opacity: 0.4,
          }}>
          <Image
            source={require('~assets/images/pokeball-white.png')}
            style={{width: wp(183), height: hp(183)}}
            resizeMode="contain"
          />
        </View>
      </View>
      {/* <TabsNavigator /> */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        handleComponent={() => (
          <View
            style={{
              flex: 1,
              width: '100%',
              position: 'absolute',
              top: hp(-175),
              alignItems: 'center',
              height: hp(225),
            }}>
            <Image
              source={{uri: pokemon.picture}}
              style={{width: wp(250), height: hp(223)}}
              resizeMode="contain"
            />
          </View>
        )}
        onChange={handleSheetChanges}>
        <TabsNavigator id={id} />
      </BottomSheet>
    </View>
  );
};
