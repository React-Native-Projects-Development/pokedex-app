import {StyleSheet} from 'react-native';
import colors from 'theme/colors';

import {hp, wp} from '~theme/metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 999,
  },
  headerTitle: {
    marginTop: hp(117),
    marginLeft: wp(26),
    marginRight: wp(119),
    width: wp(316),
  },
  content: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingBottom: 58,
  },
  scrollView: {
    flexGrow: 1,
  },
  searchBarContainer: {
    width: '100%',
    alignItems: 'center',
  },
  cardsContainer: {
    marginTop: hp(42),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  newsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerCurveGray: {
    backgroundColor: colors.searchbar,
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 0,
  },
  containerCurveWhite: {
    backgroundColor: colors.white,
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 0,
  },
  curveRight: {
    right: 0,
    borderTopLeftRadius: 40,
  },
  curveLeft: {
    left: 0,
    borderTopRightRadius: 40,
  },
  curveRotate: {
    transform: [{rotate: '180deg'}],
  },
  newsContainer: {
    flex: 1,
    backgroundColor: colors.searchbar,
  },
});

export default styles;
