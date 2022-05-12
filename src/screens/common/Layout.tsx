import React from 'react';
import {Image, View} from 'react-native';

import styles from './styles';

export const Layout: React.FC = ({children}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('~assets/images/pokeball.png')}
        style={styles.img}
        resizeMode="cover"
      />
      {children}
    </View>
  );
};
