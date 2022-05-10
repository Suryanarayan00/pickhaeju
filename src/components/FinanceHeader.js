import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '#common/colors';
import React from 'react';

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { fontSize: 16, letterSpacing: -0.4, color: colors.dark },
  monthButtonWrapper: { flexDirection: 'row', alignItems: 'center' },
  monthButtonOn: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: colors.lightIndigo,
  },
  monthTextOn: { color: colors.white, fontSize: 12 },
  monthButtonOff: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: 'transparent',
  },
  monthTextOff: { color: colors.blueGrey, fontSize: 12 },
});
const FinanceHeader = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {/* 기간 생략하기로함. */}
      {/* <View style={styles.monthButtonWrapper}>
        <TouchableOpacity style={styles.monthButtonOn}>
          <Text style={styles.monthTextOn}>1M</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.monthButtonOff}>
          <Text style={styles.monthTextOff}>3M</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.monthButtonOff}>
          <Text style={styles.monthTextOff}>6M</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};
export default FinanceHeader;
