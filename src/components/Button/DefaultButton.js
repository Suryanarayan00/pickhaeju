import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import colors from '#common/colors';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.lightIndigo,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper_disabled: {
    backgroundColor: colors.cloudyBlue,
  },
});
const DefaultButton = ({
  disabled,
  containerStyle,
  onPress,
  children,
  fontSize = 14,
  focusColor
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled}
      style={[
        styles.wrapper,
        disabled && styles.wrapper_disabled,
        containerStyle,
      ]}
      onPress={onPress}
    >
      <View style={styles.buttonContainer}>
        <Text style={{ color: colors.white, fontSize }}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DefaultButton;

//{backgroundColor: focusColor === null || focusColor === undefined ? colors.lightIndigo : focusColor ? colors.lightIndigo : colors.paleGreyThree}
