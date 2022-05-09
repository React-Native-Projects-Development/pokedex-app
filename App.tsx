import React from 'react';
import {Text, View} from 'react-native';

import CloseIcon from '~components/icons/CloseIcon';
import {HomeScreen} from '~screens/HomeScreen';

const App = () => {
  return (
    <View style={{backgroundColor: 'black'}}>
      <Text>App</Text>
      <HomeScreen />
      <CloseIcon />
    </View>
  );
};

export default App;
