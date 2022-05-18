import React, {useContext, useEffect} from 'react';
import {View} from 'react-native';

import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';

import {CustomText} from 'components/CustomText';
import {hp, wp} from 'theme/metrics';
import colors from 'theme/colors';
import MaleIcon from 'components/icons/MaleIcon';
import FemaleIcon from 'components/icons/FemaleIcon';
import { PokemonDetailsContext } from 'context/PokemonDetailsContext';

export const AboutScreen = ({
  route,
}: MaterialTopTabScreenProps<any, 'AboutScreen'>) => {
  const {pokemon, getPokemonData} = useContext(PokemonDetailsContext);

  useEffect(() => {
    if (route?.params?.id) {
      getPokemonData(route?.params?.id);
    }
  }, [route?.params!]);

  return (
    <View style={{flex: 1}}>
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 31,
          paddingTop: 31,
          paddingHorizontal: 27,
        }}>
        <CustomText>
          {pokemon?.description
            .replace(
              pokemon.name.toUpperCase(),
              pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
            )
            .replace(/\s+/g, ' ')
            .split('\n')
            .join(' ')}
        </CustomText>

        {/* Pokemon's height and weight */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(28),
            height: hp(72),
            backgroundColor: colors.white,
            borderRadius: 14,

            shadowColor: '#000',
            shadowOffset: {
              width: 1,
              height: 5,
            },
            shadowOpacity: 0.27,
            shadowRadius: 5,
            paddingVertical: hp(16),

            elevation: 6,
          }}>
          <View style={{marginLeft: wp(20)}}>
            <CustomText variant="body" style={{opacity: 0.4}}>
              Height
            </CustomText>
            <CustomText variant="body">
              {(pokemon?.height! * 10) / 100} m
            </CustomText>
          </View>
          <View style={{marginLeft: wp(75)}}>
            <CustomText variant="body" style={{opacity: 0.4}}>
              Weight
            </CustomText>
            <CustomText variant="body">
              {Number.isSafeInteger(pokemon?.weight! * 0.1)
                ? pokemon?.weight! * 0.1
                : (pokemon?.weight! * 0.1).toFixed(2)}
              {" "}kg
            </CustomText>
          </View>
        </View>

        <View style={{marginTop: hp(31)}}>
          <CustomText variant="pokemonSectionTitle">Breeding</CustomText>
          <View style={{marginTop: hp(24)}}>
            {/* Gender */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <CustomText style={{width: wp(88), opacity: 0.4}}>
                Gender
              </CustomText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaleIcon width={wp(17)} height={hp(14)} />
                  <CustomText style={{marginLeft: wp(5)}}>
                    {pokemon?.maleRate && pokemon?.maleRate > -1
                      ? `${pokemon?.maleRate}%`
                      : '-'}
                  </CustomText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: wp(14),
                  }}>
                  <FemaleIcon width={wp(20)} height={hp(17)} />
                  <CustomText style={{marginLeft: wp(5)}}>
                    {pokemon?.femaleRate && pokemon?.femaleRate > -1
                      ? `${pokemon?.femaleRate}%`
                      : '-'}
                  </CustomText>
                </View>
              </View>
            </View>
            {/* Eggs */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: hp(18),
              }}>
              <CustomText style={{width: wp(88), opacity: 0.4}}>
                Egg Groups
              </CustomText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {pokemon?.egg_groups.map((group, index) => {
                    return (
                      <CustomText
                        key={group + index}
                        style={{
                          marginLeft: wp(5),
                          textTransform: 'capitalize',
                        }}>
                        {group}
                        {index === pokemon.egg_groups.length - 1 ? '' : ','}
                      </CustomText>
                    );
                  })}
                </View>
              </View>
            </View>
            {/* Egg Cycle */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: hp(18),
              }}>
              <CustomText style={{width: wp(88), opacity: 0.4}}>
                Egg Cycle
              </CustomText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <CustomText
                    style={{
                      marginLeft: wp(5),
                      textTransform: 'capitalize',
                    }}>
                    {pokemon?.egg_cycle}
                  </CustomText>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{marginTop: hp(31)}}>
          <CustomText variant="pokemonSectionTitle">Training</CustomText>
          <View style={{marginTop: hp(24)}}>
            {/* Base EXP */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <CustomText style={{width: wp(88), opacity: 0.4}}>
                Base EXP
              </CustomText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <CustomText style={{marginLeft: wp(5)}}>
                  {pokemon?.base_experience}
                </CustomText>
              </View>
            </View>
          </View>
        </View>
      </BottomSheetScrollView>
    </View>
  );
};
