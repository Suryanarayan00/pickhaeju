import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import colors from '#common/colors';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.blackTwo,
    borderRadius: 25,
    opacity: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    height: 50,
  },
  text: { color: colors.white },
});
const NotifyPopUp = ({ children }) => (
  <View style={styles.wrapper}>
    <Text style={styles.text}>{children}</Text>
  </View>
);

export default NotifyPopUp;
