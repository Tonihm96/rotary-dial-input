import React from 'react';
import { Circle, Text } from 'react-native-svg';

interface DigitProps {
  digit: number;
  rotation: number;
  containerRadius: number;
  dialStrokeWidth: number;
  dialRadius: number;
  color: string;
}

const Digit = ({
  digit,
  rotation,
  containerRadius,
  dialStrokeWidth,
  dialRadius,
  color
}: DigitProps) => {
  const digitAngle = 270 - rotation;
  const r = dialStrokeWidth * 0.2;
  const c = {
    y: containerRadius,
    x: containerRadius
  };

  return digit === -1 ? (
    <Circle
      cy={c.y}
      cx={c.x + dialRadius}
      fill={color}
      r={r}
      rotation={rotation}
    />
  ) : (
    <Text
      origin={[c.y, c.x]}
      y={c.y}
      x={c.x + dialRadius}
      fill={color}
      rotation={rotation}
      rotate={digitAngle}
      fontWeight='bold'
      fontSize={28}
      translateY={8}
      translateX={10}
    >
      {digit}
    </Text>
  );
};

export { Digit };
