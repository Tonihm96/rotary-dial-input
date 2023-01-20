import { Dimensions } from 'react-native';

export const PI = Math.PI;
export const TAU = Math.PI * 2;

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;

export const INITIAL_ROTATION = TAU;
export const FINAL_ROTATION = 0.00000001;

export const DIAL_DIAMETER = SCREEN_WIDTH * 0.8;
export const DIAL_BACKGROUND_COLOR = '#202020';
export const DIAL_COLOR = '#fff';

/**
 * Digits array from -1 to 9
 */
export const DIGITS = [-1, ...Array(10).keys()];
/**
 * Array for each digit hole
 */
export const HOLES = [...Array(11).keys()];
/**
 * Space in degrees between each digit
 */
export const DIGIT_ROTATION_OFFSET = 26.5;

export const PASSCODE = '1234';
