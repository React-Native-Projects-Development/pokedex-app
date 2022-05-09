import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {hp, wp} from 'theme/metrics';
import {CustomText} from './CustomText';

interface Props {
  title: string;
  date: string;
  img: ImageSourcePropType;
}

export const NewsEvent = ({title, date, img}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {}}
      style={styles.container}>
      <View style={{width: wp(165)}}>
        <CustomText variant="newsTitle">{title}</CustomText>
        <CustomText variant="newsSubtitle">{date}</CustomText>
      </View>
      <Image source={img} style={{borderRadius: wp(20)}} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: hp(16),
    borderBottomWidth: hp(1),
    borderBottomColor: '#EBEBEB',
    marginBottom: hp(15),
    marginTop: hp(32),
  },
});
