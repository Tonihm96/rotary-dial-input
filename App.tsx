import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import {
  DIAL_DIAMETER,
  DIAL_BACKGROUND_COLOR,
  DIAL_COLOR
} from './src/constants';
import { PasscodeProvider } from './src/hooks/usePasscode';
import { Header } from './src/components/Header';
import { RotaryDial } from './src/components/RotaryDial';

const App = () => {
  return (
    <PasscodeProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          translucent
          backgroundColor='transparent'
          barStyle='dark-content'
        />
        <Header />
        <RotaryDial
          backgroundColor={DIAL_BACKGROUND_COLOR}
          diameter={DIAL_DIAMETER}
          color={DIAL_COLOR}
        />
      </SafeAreaView>
    </PasscodeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DIAL_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default gestureHandlerRootHOC(App);
