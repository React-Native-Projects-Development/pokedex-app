import React, {useRef, useState} from 'react';
import {Animated, View, StyleSheet, TouchableOpacity} from 'react-native';

import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';

import {hp, SCREEN_WIDTH, wp} from 'theme/metrics';
import fonts from 'config/fonts';
import colors from 'theme/colors';

interface Props extends MaterialTopTabBarProps {}

const totalWidth = Math.round(SCREEN_WIDTH);

export const CustomTabBar = ({
  state,
  descriptors,
  navigation,
  position,
}: Props) => {
  const translateValue = useRef(new Animated.Value(0)).current;
  const tabWidth = totalWidth / state.routes.length;
  const [labelDimensions, setLabelDimensions] = useState<
    {
      width: number;
    }[]
  >([{width: tabWidth}]);

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }

          Animated.timing(translateValue, {
            toValue: index * tabWidth,
            // velocity: 10,
            duration: 100,
            useNativeDriver: true,
            overshootClamping: true,
          }).start();
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0.4)),
        });

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.tab,
              {
                width: tabWidth,
              },
            ]}>
            <Animated.Text
              onLayout={({
                nativeEvent: {
                  layout: {width},
                },
              }) => {
                setLabelDimensions(prevState => [
                  ...prevState,
                  {width: Math.round(width)},
                ]);
              }}
              style={{
                ...styles.tabText,
                opacity,
              }}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
      </View>
      <View
        style={[
          styles.activeTabIndicator,
          styles.activeTabIndicatorContainer,
          {width: tabWidth},
        ]}>
        <Animated.View
          style={[
            styles.activeTabIndicator,
            {
              transform: [{translateX: translateValue}],
              width:
                labelDimensions[
                  labelDimensions.length <= 2 ? state.index : state.index + 1
                ].width,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: hp(46),
  },
  tab: {
    alignItems: 'center',
    height: hp(35),
  },
  tabText: {
    fontFamily: fonts.CircularMedium,
    fontWeight: '500',
    fontSize: wp(14),
    textTransform: 'capitalize',
    textAlign: 'center',
    color: colors.textTitle,
  },
  activeTabIndicatorContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  activeTabIndicator: {
    height: hp(4),
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#587498',
    borderRadius: 10,
  },
  dividerContainer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    borderColor: colors.divider,
    width: SCREEN_WIDTH,
    paddingHorizontal: wp(27),
  },
  divider: {
    borderColor: colors.divider,
    borderWidth: 1,
    width: '100%',
  },
});
