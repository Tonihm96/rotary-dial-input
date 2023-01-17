import React from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import {
  DIAL_DIAMETER,
  DIAL_BACKGROUND_COLOR,
  DIAL_COLOR
} from './src/constants';
import { RotaryDial } from './src/components/RotaryDial';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor='transparent'
        barStyle='dark-content'
      />
      <RotaryDial
        backgroundColor={DIAL_BACKGROUND_COLOR}
        diameter={DIAL_DIAMETER}
        color={DIAL_COLOR}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DIAL_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
});

export default gestureHandlerRootHOC(App);
