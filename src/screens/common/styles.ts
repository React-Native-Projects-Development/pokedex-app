import {StyleSheet} from 'react-native';

import colors from 'theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  img: {
    position: 'absolute',
    top: -58,
    right: -86,
    height: 249,
    width: 249,
  },
});

export default styles;
