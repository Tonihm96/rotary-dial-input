import { toRad } from 'react-native-redash';
import {
  PI,
  TAU,
  INITIAL_ROTATION,
  FINAL_ROTATION,
  DIGITS,
  DIGIT_ROTATION_OFFSET
} from '../../constants';

/**
 * Checks in which quadrant the current angle is in, and clamps it's value accordingly
 * @param oldValue offset from current angle in radians
 * @param newValue current angle in radians
 * @returns newValue if it didn't exceed any limits, or one of the rotation limits
 */
export const clampValue = (oldValue: number, newValue: number) => {
  'worklet';
  // clamps value to start rotation
  if ((oldValue > 1.5 * PI && newValue < PI / 2) || oldValue === 0) {
    return INITIAL_ROTATION;
  }

  // clamps value to end rotation
  if (oldValue < PI / 2 && newValue > 1.5 * PI) {
    return FINAL_ROTATION;
  }

  return newValue;
};

/**
 * Checks if the current angle is close to the end of the final quadrant
 * @param theta current angle in radians
 * @returns true if `theta` is higher than 0 and lower than 45 degrees
 */
export const isCloseToEnd = (theta: number) => {
  'worklet';
  return 0 < theta && theta < toRad(45);
};

/**
 * Checks if the current angle is close to the start of the initial quadrant
 * @param theta current angle in radians
 * @returns true if `theta` is higher than 315 and lower than 360 degrees
 */
export const isCloseToStart = (theta: number) => {
  'worklet';
  return toRad(315) < theta && theta < TAU;
};

/**
 * Returns selected digit based on a given angle
 *
 * `note:` -1 is not a valid digit
 * @param angle angle in degrees
 * @returns selected digit or undefined if no valid digit was selected
 *
 */
export const getSelectedDigit = (angle: number) => {
  'worklet';
  const selectedDigit = DIGITS.find((_, index) => {
    const currentAngle = index * DIGIT_ROTATION_OFFSET;
    const angleOffset = DIGIT_ROTATION_OFFSET / 3;
    const minAngleOffset = currentAngle - angleOffset;
    const maxAngleOffset = currentAngle + angleOffset;

    return minAngleOffset <= angle && angle <= maxAngleOffset;
  });

  return selectedDigit > -1 ? selectedDigit : undefined;
};
