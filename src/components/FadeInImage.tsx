import {useAnimation} from 'hooks/useAnimation';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  ImageErrorEventData,
  ImageStyle,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  View,
} from 'react-native';
import colors from 'theme/colors';

interface Props {
  uri: string;
  style: StyleProp<ImageStyle>;
}

export const FadeInImage = ({uri = '', style = {}}: Props) => {
  const {fadeIn, opacity} = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  const onLoad = () => {
    setIsLoading(false);
    fadeIn();
  };

  const onError = (err: NativeSyntheticEvent<ImageErrorEventData>) => {
    setIsLoading(false);
  };

  return (
    <View style={[styles.imgContainer, style]}>
      {isLoading && <ActivityIndicator size={20} color={colors.textTitle} />}
      <Animated.Image
        source={{uri}}
        onLoad={onLoad}
        onError={onError}
        style={[style, {opacity}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
