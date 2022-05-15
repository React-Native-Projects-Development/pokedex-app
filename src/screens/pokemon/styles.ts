import fonts from 'config/fonts';
import {Platform, StyleSheet} from 'react-native';
import colors from 'theme/colors';

import {hp, wp} from 'theme/metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1000,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'flex-end',
    paddingHorizontal: 28,
    zIndex: 999999,
  },
  headerContent: {
    marginBottom: Platform.OS === 'ios' ? hp(20) : 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: fonts.CircularBlack,
    fontSize: wp(22),
    fontWeight: '900',
    lineHeight: hp(28),
    textAlign: 'center',
    color: colors.white,
    textTransform: 'capitalize',
  },
  square: {
    position: 'absolute',
    left: -30,
    top: -40,
    width: 143,
    height: 143,
    backgroundColor: 'rgba(255,255,255, 0.1)',
    transform: [{rotate: '75deg'}],
    borderRadius: 24,
  },
  pokemonInfoContainer: {
    marginTop: hp(30),
    marginHorizontal: wp(26),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pokemonInfoName: {
    fontFamily: fonts.CircularBlack,
    fontSize: wp(36),
    fontWeight: '900',
    textAlign: 'left',
    color: colors.white,
    textTransform: 'capitalize',
  },
  tagsContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: hp(9),
  },
  tag: {
    height: hp(28),
    marginRight: wp(7),
    marginBottom: hp(6),
    borderRadius: wp(20),
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255, 0.2)',
    width: wp(70),
  },
  tagText: {
    textTransform: 'capitalize',
  },
  pokeballContainer: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    top: hp(20),
    alignItems: 'center',
    opacity: 0.4,
  },
  pokemonImgContainer: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    top: hp(-175),
    alignItems: 'center',
    height: hp(225),
  },
  pokemonImg: {
    width: wp(250),
    height: hp(223),
  },
});

export default styles;
