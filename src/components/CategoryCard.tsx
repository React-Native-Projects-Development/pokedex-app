import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import {hp, wp} from 'theme/metrics';
import {CustomText} from './CustomText';
import colors from 'theme/colors';

interface Props {
  title: string;
  color: string;
}

export const CategoryCard = ({
  title = 'Example',
  color = colors.green,
}: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: color,
          },
        ]}>
        <View style={styles.imgContainer}>
          <Image
            source={require('~assets/images/pokeball-white.png')}
            style={styles.img}
          />
        </View>
        <CustomText variant="card" style={styles.cardTitle}>
          {title}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: wp(155),
    height: hp(60),
    marginBottom: hp(12),
    marginHorizontal: wp(5),
    borderRadius: wp(20),
    justifyContent: 'center',
    paddingLeft: wp(16),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.27,
    shadowRadius: 5,

    elevation: 6,
  },
  cardTitle: {
    marginTop: hp(5),
  },
  imgContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: hp(60),
    height: hp(60),
    overflow: 'hidden',
    borderTopEndRadius: wp(20),
    borderBottomEndRadius: wp(20),
    opacity: 0.4,
  },
  img: {
    position: 'absolute',
    width: wp(83),
    height: hp(60),
  },
});
