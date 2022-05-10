import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import colors from '#common/colors';
import assets from '../../../assets';

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  check_on: {
    width: 22,
    height: 22,
  },
  check_off: {
    width: 22,
    height: 22,
  },
});
const CheckButton = ({
  style,
  children,
  checkedState,
  setChecked,
  checked,
}) => {
  // const [checked, setChecked] = useState(checkedState);
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.buttonWrapper, style]}
      onPress={() => {
        setChecked && setChecked(!checked);
      }}
    >
      {checked ? (
        <Image
          source={assets.checkbox_on}
          style={styles.check_on}
          resizeMode={'contain'}
        />
      ) : (
        <Image
          source={assets.checkbox_off}
          style={styles.check_off}
          resizeMode={'contain'}
        />
      )}
      {children}
    </TouchableOpacity>
  );
};

export default CheckButton;
