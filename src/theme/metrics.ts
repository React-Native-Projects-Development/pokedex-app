import {Dimensions, Platform} from 'react-native';
import {
  widthPercentageToDP as wpDP,
  heightPercentageToDP as hpDP,
} from 'react-native-responsive-screen';

/**
 * Width-Percentage
 * Converts width dimension to percentage
 * 360, 640 - design were made using this scale (Android)
 * 390, 844 - iOS
 * @param dimension directly taken from design wireframes
 * @returns {string} percentage string e.g. '25%'
 */

const widthDimension = Platform.OS === 'ios' ? 375 : 360;
const heightDimension = Platform.OS === 'ios' ? 812 : 640;

export const wp = (dimension: number) =>
  wpDP(`${(dimension / widthDimension) * 100}%`);

/**
 * Height-Percentage
 * Converts width dimension to percentage
 * * 360, 640 - design were made using this scale
 * @param dimension directly taken from design wireframes
 * @returns {string} percentage string e.g. '25%'
 */
export const hp = (dimension: number) =>
  hpDP(`${(dimension / heightDimension) * 100}%`);

// Global Dimensions
export const SCREEN_WIDTH = Math.round(Dimensions.get('screen').width);

export const SCREEN_HEIGHT = Math.round(Dimensions.get('screen').height);
