import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import assets from '../../assets';
import colors from '#common/colors';

const styles = StyleSheet.create({
  checkLabelImage: { width: 12, marginRight: 5 },
  checkLabelText: {
    fontSize: 14,
    letterSpacing: -0.35,
    color: colors.lightIndigo,
  },
  checkLabelTextOff: {
    color: colors.greyish,
  },
  checkLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
const CheckLabel = ({ text, disabled, containerStyle }) => {
  return (
    <View style={[styles.checkLabelContainer, containerStyle]}>
      <Image
        style={[styles.checkLabelImage]}
        source={
          disabled
            ? assets.icon_input_condition_off
            : assets.icon_input_condition
        }
        resizeMode={'contain'}
      />
      <Text
        style={[
          styles.checkLabelText,
          disabled ? styles.checkLabelTextOff : null,
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

export default CheckLabel;
