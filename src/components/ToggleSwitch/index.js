import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import colors from '#common/colors';
const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 30,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circleButton: {
    width: 24,
    height: 24,
    borderRadius: 15,
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: 50,
  },
});
const ToggleSwitch = ({
  state,
  setState,
  containerStyle,
  circleStyle,
  activeColor,
  onPress
}) => {
  const [absoluteChangeX] = useState(new Animated.Value(state ? 0 : 1));

  const duration = 150;
  const easing = Easing.ease;
  console.log('Toggle State');
  console.log(state);
  const onAnimated = () => {
    Animated.timing(absoluteChangeX, {
      toValue: 0,
      useNativeDriver: false,
      duration,
      easing,
    }).start();
  };

  const offAnimated = () => {
    Animated.timing(absoluteChangeX, {
      toValue: 1,
      useNativeDriver: false,
      duration,
      easing,
    }).start();
  };

  if (state === true) {
    onAnimated();
  } else {
    offAnimated();
  }


  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        state
          ? { backgroundColor: activeColor || colors.lightPeriwinkle }
          : { backgroundColor: colors.lightPeriwinkle },
        containerStyle,
      ]}
      activeOpacity={0.75}
    >
      <Animated.View
        style={[
          styles.circleButton,
          {
            left: absoluteChangeX.interpolate({
              inputRange: [0, 1],
              outputRange: ['55%', '5%'],
            }),
          },
          circleStyle,
        ]}
      />
    </TouchableOpacity>
  );
};
export default ToggleSwitch;
