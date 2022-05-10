import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DropShadow from '#modules/DropShadow';
import colors from '../common/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 12,
  },
  gauge: {
    marginTop: 3,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.veryLightBlueTwo,
  },
  cursor: {
    position: 'absolute',
    top: 2,
    width: 8,
    height: 8,

    marginLeft: -4,

    borderRadius: 4,
    shadowColor: colors.purplyTwo,
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
  },
});

const Gauge = ({ style, value,color=colors.purpleBlue}) => {
  const [width, setWidth] = useState();
  return (
    <View
      style={[style, styles.container]}
      onLayout={({
        nativeEvent: {
          layout: { width },
        },
      }) => setWidth(width)}
    >
      <View style={styles.gauge} />
      {!!width &&
        value !== null &&
        !isNaN(value) &&
        isFinite(value) &&
        value >= 0 &&
        value <= 1 && (
          <DropShadow style={[styles.cursor, { left: value * width,backgroundColor:color }]} />
        )}
    </View>
  );
};

export default Gauge;
