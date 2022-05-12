import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';

import {hp, wp} from 'theme/metrics';
import styles from './styles';
import colors from 'theme/colors';
import {PokedexStackParams} from 'navigation/AppNavigator';
import {Layout} from 'screens/common/Layout';
import {CustomText} from 'components/CustomText';
import {CustomTextInput} from 'components/CustomTextInput';
import {CategoryCard} from 'components/CategoryCard';
import {NewsEvent} from 'components/NewsEvent';

interface Props extends StackScreenProps<PokedexStackParams, 'HomeScreen'> {}

export const HomeScreen = ({navigation}: Props) => {
  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Main Content */}
        <View style={styles.content}>
          <CustomText style={styles.headerTitle} variant="header">
            What Pokemon are you looking for?
          </CustomText>
          {/* Searchbar */}
          <View style={styles.searchBarContainer}>
            <CustomTextInput />
          </View>
          {/* Categories */}
          <View style={styles.cardsContainer}>
            <CategoryCard
              title="Pokedex"
              color={colors.darkGreen}
              onPress={() => navigation.navigate('PokedexScreen')}
            />
            <CategoryCard title="Moves" color={colors.red} />
            <CategoryCard title="Abilities" color={colors.blue} />
            <CategoryCard title="Items" color={colors.yellow} />
            <CategoryCard title="Locations" color={colors.purple} />
            <CategoryCard title="Type Charts" color={colors.brown} />
          </View>

          {/* Curve Blocks */}
          <View style={[styles.containerCurveGray, styles.curveLeft]} />
          <View
            style={[
              styles.containerCurveWhite,
              styles.curveLeft,
              styles.curveRotate,
            ]}
          />

          <View style={[styles.containerCurveGray, styles.curveRight]} />
          <View
            style={[
              styles.containerCurveWhite,
              styles.curveRight,
              styles.curveRotate,
            ]}
          />
        </View>

        {/* News */}
        <View style={styles.newsContainer}>
          <View style={{marginTop: hp(38), marginHorizontal: wp(28)}}>
            <View style={styles.newsHeader}>
              <CustomText variant="newsHeaderTitle">Pokemon News</CustomText>
              <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
                <CustomText variant="link">View all</CustomText>
              </TouchableOpacity>
            </View>
          </View>
          {/* News Events */}
          <View style={{marginHorizontal: wp(28), paddingBottom: hp(20)}}>
            <NewsEvent
              title="Pokémon Rumble Rush Arrives Soon"
              date="15 May 2019"
              img={require('~assets/images/news-1.png')}
            />
            <NewsEvent
              title="Detective Pikachu Sleuths into Pokémon GO"
              date="20 May 2019"
              img={require('~assets/images/news-2.png')}
            />
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};
