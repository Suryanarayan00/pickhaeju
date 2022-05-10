import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '#common/colors';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: { paddingVertical: 15, paddingHorizontal: 20 },
  titleext: { letterSpacing: -0.35, color: colors.dark },
  dateText: {
    color: colors.greyBlue,
    fontSize: 13,
    letterSpacing: -0.32,
    marginTop: 3,
  },
});
const NoticeItem = ({ title, date }) => {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.container}
        onPress={() => {
          navigation.navigate('NoticeDetails');
        }}
      >
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.dateText}>{date}</Text>
      </TouchableOpacity>
    </>
  );
};

export default NoticeItem;
