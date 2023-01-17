import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CenterCircleProps {
  diameter: number;
  color: string;
}

const CenterCircle = ({ diameter, color }: CenterCircleProps) => {
  return <View style={styles(diameter, color).container} />;
};

const styles = (diameter, color) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      backgroundColor: color,
      height: diameter,
      width: diameter,
      borderRadius: diameter / 2
    }
  });

export { CenterCircle };
