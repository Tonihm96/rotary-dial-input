import React from 'react';
import { Circle } from 'react-native-svg';

interface DigitProps {
  rotation: number;
  containerRadius: number;
  dialStrokeWidth: number;
  dialRadius: number;
}

const Hole = ({
  rotation,
  containerRadius,
  dialStrokeWidth,
  dialRadius
}: DigitProps) => {
  const radius = dialStrokeWidth * 0.4;
  const c = {
    y: containerRadius,
    x: containerRadius
  };

  return (
    <Circle
      cy={c.y}
      cx={c.x + dialRadius}
      r={radius}
      origin={[c.y, c.x]}
      rotation={rotation}
    />
  );
};

export { Hole };
