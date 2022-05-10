import React from 'react';
import {
  Image,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import styles from './styles';
import globalStyles from 'theme/globalStyles';
import colors from 'theme/colors';
import {hp, wp} from 'theme/metrics';
import {CustomText} from 'components/CustomText';
import {CustomTextInput} from 'components/CustomTextInput';
import {CategoryCard} from 'components/CategoryCard';
import {NewsEvent} from 'components/NewsEvent';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={require('~assets/images/pokeball.png')}
          style={globalStyles.img}
          resizeMode="cover"
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={Keyboard.dismiss}>
          <>
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
                <CategoryCard title="Pokedex" color={colors.darkGreen} />
                <CategoryCard title="Moves" color={colors.red} />
                <CategoryCard title="Abilities" color={colors.blue} />
                <CategoryCard title="Items" color={colors.yellow} />
                <CategoryCard title="Locations" color={colors.purple} />
                <CategoryCard title="Type Charts" color={colors.brown} />
              </View>
            </View>
            {/* News */}
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
                title=" Pokémon Rumble Rush Arrives Soon"
                date="15 May 2019"
                img={require('~assets/images/news-1.png')}
              />
              <NewsEvent
                title="Detective Pikachu Sleuths into Pokémon GO"
                date="20 May 2019"
                img={require('~assets/images/news-2.png')}
              />
            </View>
          </>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};
