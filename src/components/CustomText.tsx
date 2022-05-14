import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';

import fonts from '~config/fonts';
import colors from '~theme/colors';
import {hp, wp} from '~theme/metrics';

type Variants = {
  body: 'body';
  tabTitleActive: 'tabTitleActive';
  tabTitleInactive: '  tabTitleInactive';
  header: 'header';
  search: 'search';
  card: 'card';
  link: 'link';
  newsHeaderTitle: 'newsHeaderTitle';
  newsTitle: 'newsTitle';
  newsSubtitle: 'newsSubtitle';
  tag: 'tag';
  tagBold: 'tagBold';
  number: 'number';
  pokemonType: 'pokemonType';
  pokemonName: 'pokemonName';
  pokemonNumber: 'pokemonNumber';
  pokemonTagType: 'pokemonTagType';
  pokemonSectionTitle: 'pokemonSectionTitle';
  tabText: 'tabText';
};

interface Props {
  variant?: keyof Variants;
  style?: TextStyle;
}

export const CustomText: React.FC<Props> = ({
  children,
  variant = 'body',
  style = {},
}) => {
  return <Text style={[styles[variant], style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  header: {
    fontFamily: fonts.CircularBlack,
    fontSize: wp(30),
    lineHeight: hp(42),
    color: colors.textTitle,
  },
  search: {
    fontFamily: fonts.CircularBook,
    fontSize: wp(14),
    fontWeight: '400',
    lineHeight: hp(42),
    letterSpacing: wp(0),
    textAlign: 'left',
    color: colors.search,
  },
  card: {
    fontFamily: fonts.CircularBold,
    fontSize: wp(14),
    fontWeight: '700',
    lineHeight: hp(14),
    letterSpacing: wp(0),
    textAlign: 'left',
    color: colors.white,
  },
  link: {
    fontFamily: fonts.CircularMedium,
    fontSize: wp(14),
    fontWeight: '500',
    lineHeight: hp(42),
    color: colors.link,
  },
  newsHeaderTitle: {
    fontFamily: fonts.CircularBlack,
    fontSize: wp(20),
    fontWeight: '900',
    lineHeight: hp(42),
    letterSpacing: wp(0),
    textAlign: 'left',
    color: colors.textTitle,
  },
  newsTitle: {
    fontFamily: fonts.CircularBold,
    fontSize: wp(14),
    fontWeight: '700',
    lineHeight: hp(18),
    letterSpacing: wp(0),
    textAlign: 'left',
    color: colors.textTitle,
  },
  newsSubtitle: {
    fontFamily: fonts.CircularBook,
    fontSize: wp(10),
    fontWeight: '400',
    lineHeight: hp(13),
    letterSpacing: wp(0),
    textAlign: 'left',
    color: colors.subtitle,
  },
  tag: {
    fontFamily: fonts.CircularBook,
    fontSize: wp(8),
    fontWeight: '400',
    letterSpacing: wp(0),
    textAlign: 'center',
    color: colors.white,
  },
  tagBold: {
    fontFamily: fonts.CircularBold,
    fontSize: wp(12),
    fontWeight: '700',
    letterSpacing: wp(0),
    textAlign: 'center',
    color: colors.white,
  },
  body: {
    fontFamily: fonts.CircularBook,
    fontSize: wp(14),
    fontWeight: '400',
    lineHeight: hp(20),
    textAlign: 'left',
    color: colors.textTitle,
  },
  tabTitleActive: {
    fontfamily: fonts.CircularBook,
    fontSize: wp(14),
    fontWeight: '400',
    lineHeight: hp(28),
    letterSpacing: wp(0),
    textAlign: 'left',
    color: colors.textTitle,
  },
  tabTitleInactive: {
    fontfamily: fonts.CircularBook,
    fontSize: wp(14),
    fontWeight: '400',
    lineHeight: hp(28),
    letterSpacing: wp(0),
    textAlign: 'left',
    color: colors.search,
  },
  number: {
    fontFamily: fonts.CircularBold,
    fontSize: wp(14),
    fontWeight: '700',
    lineHeight: hp(14),
    letterSpacing: wp(0),
    textAlign: 'center',
    color: colors.white,
  },
  pokemonType: {
    fontFamily: fonts.CircularBook,
    fontSize: wp(14),
    fontWeight: '400',
    lineHeight: hp(28),
    letterSpacing: wp(0),
    textAlign: 'right',
    color: colors.white,
  },
  pokemonName: {
    fontFamily: fonts.CircularBlack,
    fontSize: wp(36),
    fontWeight: '900',
    textAlign: 'left',
    color: colors.white,
  },
  pokemonNumber: {
    fontFamily: fonts.CircularBlack,
    fontSize: wp(18),
    fontWeight: '900',
    textAlign: 'right',
    color: colors.white,
  },
  pokemonTagType: {
    fontFamily: fonts.CircularBold,
    fontSize: wp(12),
    fontWeight: '700',
    textAlign: 'center',
    color: colors.white,
  },
  pokemonSectionTitle: {
    fontFamily: fonts.CircularBold,
    fontSize: wp(16),
    fontWeight: '700',
    lineHeight: hp(28),
    textAlign: 'left',
    color: colors.textTitle,
  },
  tabText: {
    fontFamily: fonts.CircularMedium,
    fontWeight: '500',
    fontSize: wp(14),
    textTransform: 'capitalize',
    textAlign: 'center',
    color: colors.textTitle,
  },
});
