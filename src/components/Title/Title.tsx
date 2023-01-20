import React from 'react';
import { Text } from 'react-native-svg';

import { DIAL_BACKGROUND_COLOR } from '../../constants';

const Title = () => {
  return (
    <>
      <Text
        fontSize={24}
        fontWeight='bold'
        fill={DIAL_BACKGROUND_COLOR}
        x={5}
        y={50}
      >
        ENTER
      </Text>
      <Text
        fontSize={24}
        fontWeight='bold'
        fill={DIAL_BACKGROUND_COLOR}
        x={5}
        y={75}
      >
        PASSCODE
      </Text>
    </>
  );
};

export { Title };
