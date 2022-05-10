import {StyleSheet} from 'react-native';

import colors from 'theme/colors';
import {hp, wp} from '~theme/metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: colors.white,
  },
  imgContainer: {
    position: 'absolute',
    top: -58,
    right: -86,
    height: hp(249),
    width: hp(249),
    zIndex: 1,
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
});

export default styles;
