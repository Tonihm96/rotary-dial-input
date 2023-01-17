import React from 'react';
import Animated, {
  SharedValue,
  useAnimatedProps
} from 'react-native-reanimated';
import { transformOrigin } from 'react-native-redash';
import Svg, { Circle, CircleProps, Defs, ClipPath } from 'react-native-svg';

import { TAU, DIGITS, HOLES, DIGIT_ROTATION_OFFSET } from '../../constants';
import { Digit } from './Digit';
import { Hole } from './Hole';

interface DialProps {
  theta: SharedValue<number>;
  center: {
    y: number;
    x: number;
  };
  backgroundColor: string;
  digitColor: string;
  diameter: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Dial = ({
  theta,
  center,
  backgroundColor,
  digitColor,
  diameter
}: DialProps) => {
  const circumference = diameter * 2.5;
  const strokeWidth = diameter * 0.18;
  const radius = circumference / TAU;
  const dialLength = circumference * 0.735;

  const animatedProps = useAnimatedProps(
    () =>
      ({
        transform: transformOrigin(center, [{ rotate: `${-theta.value}rad` }])
      } as Partial<Animated.AnimateProps<CircleProps>>)
  );

  return (
    <Svg>
      <Defs>
        <ClipPath id='clip'>
          {HOLES.map(item => (
            <Hole
              key={item}
              rotation={item * DIGIT_ROTATION_OFFSET}
              containerRadius={diameter / 2}
              dialStrokeWidth={strokeWidth}
              dialRadius={radius}
            />
          ))}
          <Circle cy={center.y} cx={center.x} r={diameter / 2} />
        </ClipPath>
      </Defs>
      {DIGITS.map((item, index) => (
        <Digit
          key={item}
          rotation={index * DIGIT_ROTATION_OFFSET}
          containerRadius={diameter / 2}
          dialStrokeWidth={strokeWidth}
          dialRadius={radius}
          digit={item}
          color={digitColor}
        />
      ))}
      <AnimatedCircle
        cy={center.y}
        cx={center.x}
        originY={center.y}
        originX={center.x}
        r={radius}
        stroke={backgroundColor}
        strokeWidth={strokeWidth}
        strokeDasharray={dialLength}
        strokeLinecap='round'
        clipPath='#clip'
        animatedProps={animatedProps}
      />
    </Svg>
  );
};

export { Dial };
