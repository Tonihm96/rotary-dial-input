import React, { useEffect } from 'react';
import { Circle } from 'react-native-svg';
import Animated, {
  createAnimatedPropAdapter,
  processColor,
  SharedValue,
  useAnimatedProps,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

import { SCREEN_WIDTH, DIAL_BACKGROUND_COLOR } from '../../constants';
import { usePasscode } from '../../hooks/usePasscode';

interface InputIndicatorProps {
  digit: number;
  red: SharedValue<number>;
  green: SharedValue<number>;
  blue: SharedValue<number>;
}

const Indicator = Animated.createAnimatedComponent(Circle);

const InputIndicator = ({ digit, red, green, blue }: InputIndicatorProps) => {
  const { input } = usePasscode();
  const alpha = useSharedValue(0);
  const y = 50;
  const x = SCREEN_WIDTH - 65 - digit * 30;
  const r = 10;

  const animatedProps = useAnimatedProps(
    () => ({
      fill: `rgba(${red.value},${green.value},${blue.value},${alpha.value})`
    }),
    [],
    createAnimatedPropAdapter(
      props => {
        props.fill = { type: 0, payload: processColor(props.fill as string) };
      },
      ['fill']
    )
  );

  useEffect(() => {
    alpha.value = digit <= input.length ? withTiming(1) : withTiming(0);
  }, [input]);

  return (
    <>
      <Circle fill={DIAL_BACKGROUND_COLOR} r={r} y={y} x={x} />
      <Indicator
        fill={DIAL_BACKGROUND_COLOR}
        r={r - 4}
        y={y}
        x={x}
        animatedProps={animatedProps}
      />
    </>
  );
};

export { InputIndicator };
