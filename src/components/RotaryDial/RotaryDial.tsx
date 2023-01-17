import React from 'react';
import { useSharedValue } from 'react-native-reanimated';

import { Container } from './Container';
import { Gesture } from './Gesture';
import { Dial } from './Dial';
import { CenterCircle } from './CenterCircle';
import { INITIAL_ROTATION } from '../../constants';

interface Props {
  diameter: number;
  backgroundColor: string;
  color: string;
}

const RotaryDial = ({ diameter, backgroundColor, color }: Props) => {
  const theta = useSharedValue(INITIAL_ROTATION);
  const radius = diameter / 2;
  const centerCoordinates = { y: diameter / 2, x: diameter / 2 };
  const centerCircleDiameter = diameter * 0.59;

  return (
    <Container backgroundColor={backgroundColor} diameter={diameter}>
      <Gesture theta={theta} center={centerCoordinates} radius={radius}>
        <Dial
          theta={theta}
          diameter={diameter}
          center={centerCoordinates}
          backgroundColor={color}
          digitColor={color}
        />
      </Gesture>
      <CenterCircle diameter={centerCircleDiameter} color={color} />
    </Container>
  );
};

export { RotaryDial };
