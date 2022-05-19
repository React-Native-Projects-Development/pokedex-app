import React, {useContext, useState} from 'react';
import {LayoutChangeEvent, View} from 'react-native';

import {CustomText} from 'components/CustomText';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {hp, wp} from 'theme/metrics';
import colors from 'theme/colors';
import {PokemonDetailsContext} from 'context/PokemonDetailsContext';

const MAX_HP = 255; /* 714 */
const MAX_ATTACK = 190; /* 526 */
const MAX_DEFENSE = 230; /* 614 */
const MAX_SP_ATK = 180;
const MAX_SP_DEFENSE = 230; /* 614 */
const MAX_SPEED = 230; /* 504 */

type Stats = {
  hp: 'hp';
  attack: 'attack';
  defense: 'defense';
  'special-attack': 'special-attack';
  'special-defense': 'special-defense';
  speed: 'speed';
};

export const StatsScreen = () => {
  const {pokemon} = useContext(PokemonDetailsContext);
  const [barWidth, setBarWidth] = useState<number>();

  const total =
    pokemon?.stats.map(item => item.base_stat).reduce((a, b) => a + b) || 0;

  const onLayout = (event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;
    setBarWidth(Math.round(width));
  };

  const getStatValue = (stat: keyof Stats | string) => {
    switch (stat) {
      case 'hp':
        return MAX_HP;
      case 'attack':
        return MAX_ATTACK;
      case 'defense':
        return MAX_DEFENSE;
      case 'special-attack':
        return MAX_SP_ATK;
      case 'special-defense':
        return MAX_SP_DEFENSE;
      case 'speed':
        return MAX_SPEED;

      default:
        break;
    }
  };

  return (
    <BottomSheetScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 31,
        paddingTop: 31,
        paddingHorizontal: 27,
      }}>
      {pokemon?.stats.map((item, index) => {
        return (
          <View
            key={item.stat.name + index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: hp(14),
            }}>
            <CustomText
              variant="tabTitleInactive"
              style={{width: wp(87), textTransform: 'capitalize'}}>
              {item?.stat?.name !== 'special-attack' &&
              item?.stat?.name !== 'special-defense'
                ? item.stat.name
                : item.stat.name === 'special-attack'
                ? 'Sp. Atk'
                : 'Sp. Def'}
            </CustomText>
            <CustomText style={{width: wp(30)}}>{item.base_stat}</CustomText>
            <View
              style={{
                marginLeft: wp(13),
                flex: 1,
                backgroundColor: colors.searchbar,
                height: hp(3),
              }}>
              <View
                style={{
                  position: 'absolute',
                  width: `${
                    (item.base_stat / getStatValue(item?.stat?.name)!) * 100
                  }%`,
                  backgroundColor:
                    item.base_stat < getStatValue(item.stat.name) * 0.5
                      ? colors.red
                      : item.base_stat >= getStatValue(item.stat.name) * 0.5 &&
                        item.base_stat <= getStatValue(item.stat.name) * 0.75
                      ? colors.yellow
                      : colors.positive,
                  height: '100%',
                }}
              />
            </View>
          </View>
        );
      })}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: hp(14),
        }}>
        <CustomText
          variant="tabTitleInactive"
          style={{width: wp(87), textTransform: 'capitalize'}}>
          Total
        </CustomText>
        <CustomText style={{width: wp(30)}}>{total}</CustomText>
        <View
          style={{
            marginLeft: wp(13),
            flex: 1,
            width: '100%',
            backgroundColor: colors.searchbar,
            height: hp(3),
          }}
          onLayout={onLayout}>
          {typeof barWidth === 'number' && (
            <View
              style={{
                position: 'absolute',
                width: total > barWidth ? '100%' : (total / barWidth) * 100,
                backgroundColor: total < 60 ? colors.red : colors.positive,
                height: '100%',
              }}
            />
          )}
        </View>
      </View>
      <CustomText variant="pokemonSectionTitle" style={{marginTop: hp(41)}}>
        Type defenses
      </CustomText>
      <View style={{marginTop: hp(20)}}>
        <CustomText variant="pokemonSectionTitle">
          Double Damage From
        </CustomText>
        {pokemon?.damage_relations?.double_damage_from.length > 0 ? (
          pokemon?.damage_relations?.double_damage_from?.map((type, index) => (
            <CustomText
              key={type.name + index}
              variant="body"
              style={{textTransform: 'capitalize'}}>
              {type.name}
            </CustomText>
          ))
        ) : (
          <CustomText variant="body" style={{textTransform: 'capitalize'}}>
            -
          </CustomText>
        )}
        <CustomText variant="pokemonSectionTitle" style={{marginTop: hp(20)}}>
          Half Damage From
        </CustomText>
        {pokemon?.damage_relations?.half_damage_from?.length > 0 ? (
          pokemon?.damage_relations?.half_damage_from?.map((type, index) => (
            <CustomText
              key={type.name + index}
              variant="body"
              style={{textTransform: 'capitalize'}}>
              {type.name}
            </CustomText>
          ))
        ) : (
          <CustomText variant="body" style={{textTransform: 'capitalize'}}>
            -
          </CustomText>
        )}
      </View>
    </BottomSheetScrollView>
  );
};
