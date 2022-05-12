import {StyleSheet} from 'react-native';

import colors from 'theme/colors';
import {hp, wp} from 'theme/metrics';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 60,
    paddingHorizontal: 28,
    zIndex: 999,
  },
  title: {
    marginTop: hp(35),
    marginHorizontal: wp(30),
  },
  listContainer: {
    marginTop: hp(30),
    flex: 1,
  },
  listContent: {
    alignItems: 'center',
    paddingBottom: hp(20),
  },
  fab: {
    position: 'absolute',
    backgroundColor: colors.link,
    bottom: 35,
    right: 26,
    width: wp(45),
    height: wp(45),
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.27,
    shadowRadius: 5,

    elevation: 6,
  },
});

export default styles;
