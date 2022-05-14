import {StyleSheet} from 'react-native';

import {hp, wp} from 'theme/metrics';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 60,
    paddingHorizontal: 28,
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
});

export default styles;
