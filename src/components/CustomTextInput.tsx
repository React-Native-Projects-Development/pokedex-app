import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

import colors from 'theme/colors';
import {hp, wp} from 'theme/metrics';
import MagnifierIcon from './icons/MagnifierIcon';

export const CustomTextInput = () => {
  return (
    <View style={styles.inputContainer}>
      <MagnifierIcon width={23} height={28} />
      <TextInput
        placeholder="Search Pokemon, Move, Ability etc"
        style={{
          paddingLeft: wp(13),
          fontSize: wp(14),
          color: colors.search,
          paddingRight: wp(15),
          width: wp(275),
        }}
        placeholderTextColor={colors.search}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 40,
    backgroundColor: colors.searchbar,
    width: wp(324),
    height: hp(45),
    borderRadius: 100,
    paddingLeft: 18,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
