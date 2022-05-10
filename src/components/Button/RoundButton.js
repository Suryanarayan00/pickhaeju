import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import colors from '#common/colors';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.lightIndigo,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper_disabled: {
    backgroundColor: colors.cloudyBlue,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const RoundButton = ({
  disabled,
  onPress,
  children,
  style,
  fontSize = 14,
  wrapperStyle,
}) => {
  return (
    <View style={style}>
      <TouchableOpacity
        disabled={disabled}
        style={
          disabled
            ? [styles.wrapper_disabled]
            : [styles.wrapper, { wrapperStyle }]
        }
        onPress={onPress}
        activeOpacity={0.85}
      >
        <Text style={{ color: colors.white, fontSize }}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RoundButton;
