import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Image, View, Text } from 'react-native';
import colors from '#common/colors';

const styles = StyleSheet.create({
  radioWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioText: {
    fontSize: 14,
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: -0.35,
  },
  radioOff: {
    height: 16,
    width: 16,
    marginRight: 12,
    borderColor: colors.cloudyBlue,
    borderWidth: 1,
    borderRadius: 8,
  },
  radioOnWrapper: {
    height: 16,
    width: 16,
    marginRight: 12,
    borderColor: colors.cloudyBlue,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOn: {
    backgroundColor: colors.lightIndigo,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

const RadioButton = ({ children, color, checked, onPress }) => {
  // const [checked, setChecked] = useState(null);

  return (
    <TouchableOpacity
      style={[styles.radioWrapper]}
      onPress={() => onPress()}
      activeOpacity={1}
    >
      <View>
        {!checked ? (
          <View style={styles.radioOff} />
        ) : (
          <View style={styles.radioOnWrapper}>
            <View style={styles.radioOn} />
          </View>
        )}
      </View>
      <Text style={[styles.radioText, { color }]}>{children}</Text>
    </TouchableOpacity>
  );
};
export default RadioButton;
