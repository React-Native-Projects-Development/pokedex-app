import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';

import {hp, wp} from 'theme/metrics';
import colors from 'theme/colors';
import styles from './styles';
import {usePaginatedPokemons} from 'hooks/usePaginatedPokemons';
import {PokedexStackParams} from 'navigation/AppNavigator';
import ArrowBackIcon from 'components/icons/ArrowBackIcon';
import ListIcon from 'components/icons/ListIcon';
import FilterIcon from 'components/icons/FilterIcon';
import {Layout} from 'screens/common/Layout';
import {CustomText} from 'components/CustomText';
import {PokeCard} from 'components/PokeCard';

interface Props extends StackScreenProps<PokedexStackParams, 'PokedexScreen'> {}

export const PokedexScreen = ({navigation}: Props) => {
  const {isLoading, loadPokemons, pokemons} = usePaginatedPokemons();

  return (
    <Layout>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <ArrowBackIcon width={wp(22)} height={hp(13.65)} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => console.log('pressed')}>
          <ListIcon width={wp(18)} height={hp(16)} />
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <CustomText variant="header">Pokedex</CustomText>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={pokemons}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({item, index}) => {
            return <PokeCard item={item} index={index} />;
          }}
          // Infinite Scroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoading ? (
              <ActivityIndicator size={20} color={colors.textTitle} />
            ) : null
          }
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {}}
          style={styles.fab}>
          <FilterIcon />
        </TouchableOpacity>
      </View>
    </Layout>
  );
};
