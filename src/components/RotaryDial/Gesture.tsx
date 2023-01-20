import React, { ReactNode } from 'react';
import {
  SharedValue,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import { canvas2Polar, normalizeRad, toDeg } from 'react-native-redash';
import {
  Gesture as GestureHandler,
  GestureDetector
} from 'react-native-gesture-handler';

import { INITIAL_ROTATION, FINAL_ROTATION } from '../../constants';
import { usePasscode } from '../../hooks/usePasscode';
import {
  clampValue,
  getSelectedDigit,
  isCloseToEnd,
  isCloseToStart
} from './helpers';

interface GestureProps {
  children: ReactNode;
  theta: SharedValue<number>;
  center: {
    y: number;
    x: number;
  };
  radius: number;
}

const Gesture = ({ theta, center, radius, children }: GestureProps) => {
  const { onInputChange } = usePasscode();

  /**
   * Offset from current angle stored in `theta.value`
   */
  const offset = useSharedValue(0);
  /**
   * Controls whether the gesture has reached a limit or not to prevent unexpected rotation behaviors
   */
  const limitReached = useSharedValue(false);

  const gesture = GestureHandler.Pan()
    .onBegin(() => {
      offset.value = theta.value;
    })
    .onUpdate(({ y, x }) => {
      const hasStartedGesture = offset.value === INITIAL_ROTATION;
      const hasFinishedGesture = offset.value === FINAL_ROTATION;
      const vector = {
        y: y + center.y - radius,
        x: x + center.x - radius
      };
      const newValue = normalizeRad(canvas2Polar(vector, center).theta);

      // validations to check whether the rotation has reached one of its limits
      if (hasStartedGesture && isCloseToEnd(newValue)) {
        limitReached.value = true;
      }

      if (hasStartedGesture && isCloseToStart(newValue)) {
        limitReached.value = false;
      }

      if (hasFinishedGesture && isCloseToStart(newValue)) {
        limitReached.value = true;
      }

      if (hasFinishedGesture && isCloseToEnd(newValue)) {
        limitReached.value = false;
      }

      if (!limitReached.value) {
        theta.value = clampValue(offset.value, newValue);
        offset.value = theta.value;
      }
    })
    .onFinalize(() => {
      limitReached.value = false;
      const selectedDigit = getSelectedDigit(360 - toDeg(theta.value));
      const hasSelectedDigit = !!selectedDigit;

      if (hasSelectedDigit) {
        onInputChange(selectedDigit);
      }

      theta.value = withSpring(INITIAL_ROTATION);
    });

  return <GestureDetector gesture={gesture}>{children}</GestureDetector>;
};

export { Gesture };
