import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';

import {hp, wp} from 'theme/metrics';
import colors from 'theme/colors';
import styles from './styles';
import {usePaginatedPokemons} from 'hooks/usePaginatedPokemons';
import {PokedexStackParams} from 'navigation/AppNavigator';
import ArrowBackIcon from 'components/icons/ArrowBackIcon';
import ListIcon from 'components/icons/ListIcon';
import FilterIcon from 'components/icons/FilterIcon';
import {Layout} from 'screens/common/Layout';
import {CustomText} from 'components/CustomText';
import {PokeCard} from 'components/PokeCard';
import CloseIcon from 'components/icons/CloseIcon';
import PokeballIcon from 'components/icons/PokeballIcon';
import MagnifierIcon from 'components/icons/MagnifierIcon';
import HeartFilledIcon from 'components/icons/HeartFilledIcon';

interface Props extends StackScreenProps<PokedexStackParams, 'PokedexScreen'> {}

const Overlay = ({opacity, isLayoutVisible}: any) => {
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        opacity,
        display: isLayoutVisible ? 'flex' : 'none',
      }}
    />
  );
};

export const PokedexScreen = ({navigation}: Props) => {
  const {isLoading, loadPokemons, pokemons} = usePaginatedPokemons();

  const [isLayoutVisible, setIsLayoutVisible] = useState(false);

  const onToggleLayout = () => setIsLayoutVisible(prevState => !prevState);

  const animation = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const onFadeIn = () => {
    return Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const onFadeOut = () => {
    return Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const onShow = () => {
    return Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const onHide = () => {
    return Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Layout>
      <Overlay opacity={opacity} isLayoutVisible={isLayoutVisible} />

      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <ArrowBackIcon width={wp(22)} height={hp(13.65)} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => console.log('categories pressed')}>
          <ListIcon width={wp(18)} height={hp(16)} />
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <CustomText variant="header">Pokedex</CustomText>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={pokemons}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({item, index}) => <PokeCard item={item} index={index} />}
          // Infinite Scroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoading ? (
              <ActivityIndicator size={20} color={colors.textTitle} />
            ) : null
          }
        />
      </View>
      <View style={{zIndex: 4, width: '100%'}}>
        <View
          style={{
            position: 'absolute',
            bottom: hp(94),
            right: wp(25),
            width: '100%',
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity activeOpacity={0.9}>
            <Animated.View
              style={{
                backgroundColor: colors.white,
                borderRadius: wp(33),
                // marginBottom: hp(9),
                paddingHorizontal: wp(15),
                paddingVertical: hp(8),
                // width: '50%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                // opacity: fadeAnim,
                position: 'absolute',
                right: 0,
                transform: [
                  {
                    scale: animation,
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -190],
                    }),
                  },
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0, isLayoutVisible ? -250 : 0, 0],
                    }),
                  },
                ],
              }}>
              <CustomText variant="body" style={{marginRight: wp(14)}}>
                Favorite
              </CustomText>
              <HeartFilledIcon
                width={wp(20)}
                height={hp(20)}
                color={colors.link}
              />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9}>
            <Animated.View
              style={{
                backgroundColor: colors.white,
                borderRadius: wp(33),
                // marginBottom: hp(9),
                paddingHorizontal: wp(15),
                paddingVertical: hp(8),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                // opacity: fadeAnim,
                position: 'absolute',
                right: 0,
                transform: [
                  {
                    scale: animation,
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -140],
                    }),
                  },
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0, isLayoutVisible ? -200 : 0, 0],
                    }),
                  },
                ],
              }}>
              <CustomText variant="body" style={{marginRight: wp(12)}}>
                All Type
              </CustomText>
              <PokeballIcon width={wp(20)} height={hp(20)} />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9}>
            <Animated.View
              style={{
                backgroundColor: colors.white,
                borderRadius: wp(33),
                // marginBottom: hp(9),
                paddingHorizontal: wp(15),
                paddingVertical: hp(8),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                // opacity: fadeAnim,
                position: 'absolute',
                right: 0,
                transform: [
                  {
                    scale: animation,
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -90],
                    }),
                  },
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0, isLayoutVisible ? -150 : 0, 0],
                    }),
                  },
                ],
              }}>
              <CustomText variant="body" style={{marginRight: wp(12)}}>
                All Gen
              </CustomText>
              <PokeballIcon width={wp(20)} height={hp(20)} />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9}>
            <Animated.View
              style={{
                backgroundColor: colors.white,
                borderRadius: wp(33),
                // marginBottom: hp(9),
                paddingHorizontal: wp(15),
                paddingVertical: hp(8),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                opacity: animation,
                position: 'absolute',
                right: 0,
                transform: [
                  // {
                  //   scale: fadeAnim,
                  // },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -40],
                    }),
                  },
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0, isLayoutVisible ? -100 : 0, 0],
                    }),
                  },
                ],
              }}>
              <CustomText variant="body" style={{marginRight: wp(12)}}>
                Search
              </CustomText>
              <MagnifierIcon
                width={wp(20)}
                height={hp(20)}
                color={colors.link}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            onToggleLayout();

            if (!isLayoutVisible) {
              onFadeIn();
              onShow();
            } else {
              onHide();
              onFadeOut();
            }
          }}
          style={styles.fab}>
          {isLayoutVisible ? (
            <CloseIcon width={wp(14)} height={hp(14)} />
          ) : (
            <FilterIcon />
          )}
        </TouchableOpacity>
      </View>
    </Layout>
  );
};
