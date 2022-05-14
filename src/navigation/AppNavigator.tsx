import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {HomeScreen} from '~screens/home/HomeScreen';
import {PokedexScreen} from '~screens/pokedex/PokedexScreen';
import {PokemonDetailsScreen} from '~screens/pokemon/PokemonDetailsScreen';
import {SinglePokemon} from 'interfaces/app-interfaces';

export type PokedexStackParams = {
  HomeScreen: undefined;
  PokedexScreen: undefined;
  PokemonDetailsScreen: {
    pokemon: SinglePokemon;
  };
};

const Stack = createStackNavigator<PokedexStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: '#F5F5F5',
        },
        headerShown: false,
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        },
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PokedexScreen" component={PokedexScreen} />
      <Stack.Screen
        name="PokemonDetailsScreen"
        component={PokemonDetailsScreen}
      />
    </Stack.Navigator>
  );
};
