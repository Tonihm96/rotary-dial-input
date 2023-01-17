import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

interface ContainerProps {
  diameter: number;
  backgroundColor: string;
  children: ReactNode;
}

const Container = ({ diameter, backgroundColor, children }: ContainerProps) => {
  return (
    <View style={styles(diameter, backgroundColor).container}>{children}</View>
  );
};

const styles = (diameter, backgroundColor) =>
  StyleSheet.create({
    container: {
      height: diameter,
      width: diameter,
      borderRadius: diameter / 2,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: backgroundColor,
      transform: [{ rotate: '90deg' }]
    }
  });

export { Container };
