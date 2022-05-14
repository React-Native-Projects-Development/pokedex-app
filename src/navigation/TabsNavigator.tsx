import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {AboutScreen} from 'screens/tabs/AboutScreen';
import {StatsScreen} from 'screens/tabs/StatsScreen';
import {EvolutionScreen} from 'screens/tabs/EvolutionScreen';
import {MovesScreen} from 'screens/tabs/MovesScreen';
import fonts from 'config/fonts';
import {wp} from 'theme/metrics';
import colors from 'theme/colors';
import {CustomTabBar} from 'components/CustomTabBar';

const Tab = createMaterialTopTabNavigator();

interface Props {
  id: string;
}

export const TabsNavigator = ({id}: Props) => {
  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: true,
      }}
      sceneContainerStyle={{
        backgroundColor: colors.white,
      }}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="About" component={AboutScreen} initialParams={{id}} />
      <Tab.Screen
        name="Base Stats"
        options={{
          tabBarLabelStyle: {
            fontFamily: fonts.CircularMedium,
            fontWeight: '500',
            fontSize: wp(14),
            textTransform: 'capitalize',
          },
          // tabBarLabel: 'Base Stats',
        }}
        initialParams={{id}}
        component={StatsScreen}
      />
      <Tab.Screen
        name="Evolution"
        options={{
          tabBarLabelStyle: {
            fontFamily: fonts.CircularMedium,
            fontWeight: '500',
            fontSize: wp(14),
            textTransform: 'capitalize',
          },
        }}
        initialParams={{id}}
        component={EvolutionScreen}
      />
      <Tab.Screen
        name="Moves"
        options={{
          tabBarLabelStyle: {
            fontFamily: fonts.CircularMedium,
            fontWeight: '500',
            fontSize: wp(14),
            textTransform: 'capitalize',
          },
        }}
        initialParams={{id}}
        component={MovesScreen}
      />
    </Tab.Navigator>
  );
};
