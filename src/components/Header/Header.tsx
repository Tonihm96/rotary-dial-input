import React, { useEffect } from 'react';
import { Svg } from 'react-native-svg';
import { StyleSheet, Platform, StatusBar } from 'react-native';

import { PASSCODE, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants';
import { Title } from '../Title';
import { InputIndicator } from '../InputIndicator';
import { useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { usePasscode } from '../../hooks/usePasscode';

const Header = () => {
  const { input } = usePasscode();

  const red = useSharedValue(255);
  const green = useSharedValue(255);
  const blue = useSharedValue(255);

  const setColor = (color: 'red' | 'green' | 'white') => {
    'worklet';
    if (color === 'white') {
      red.value = withDelay(300, withTiming(255));
      green.value = withDelay(300, withTiming(255));
      blue.value = withDelay(300, withTiming(255));
    }

    if (color === 'red') {
      red.value = withDelay(300, withTiming(255));
      green.value = withDelay(300, withTiming(75));
      blue.value = withDelay(300, withTiming(75));
    }

    if (color === 'green') {
      red.value = withDelay(300, withTiming(75));
      green.value = withDelay(300, withTiming(255));
      blue.value = withDelay(300, withTiming(75));
    }
  };

  useEffect(() => {
    if (input.length === 4) {
      const isPasscodeCorrect = PASSCODE.split('').every(
        (item, index) => item === input[index]
      );

      isPasscodeCorrect ? setColor('green') : setColor('red');
    } else {
      setColor('white');
    }
  }, [input]);

  return (
    <Svg style={styles.container}>
      <Title />
      {PASSCODE.split('').map((item, index, array) => {
        const digit = array.length - index;

        return (
          <InputIndicator
            key={item}
            digit={digit}
            red={red}
            green={green}
            blue={blue}
          />
        );
      })}
    </Svg>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.2
  }
});

export { Header };
