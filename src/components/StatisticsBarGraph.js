import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import colors from '#common/colors';

const styles = StyleSheet.create({
  barContainer: { width: '100%', paddingHorizontal: 20, marginVertical: 30 },
  verticalBar: {
    height: 38,
    width: 10,
    backgroundColor: colors.blueyGrey,
    marginTop: 3,
  },
  barGraphWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightPeriwinkle,
    paddingHorizontal: 28,
  },
  barWrapper: { alignItems: 'center' },
  barTopText: { fontSize: 11, color: colors.blueGrey },
  barBottomText: {
    fontSize: 11,
    color: colors.blueGrey,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  barBottomWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 13,
  },
});
const StatisticsBarGraph = (props) => (
  <View style={styles.barContainer}>
    <View style={styles.barGraphWrapper}>
      <View style={styles.barWrapper}>
        <Text style={styles.barTopText}>1.0</Text>
        <View style={styles.verticalBar} />
      </View>
      <View style={styles.barWrapper}>
        <Text style={styles.barTopText}>0.7</Text>
        <View style={styles.verticalBar} />
      </View>
      <View style={styles.barWrapper}>
        <Text style={styles.barTopText}>0.6</Text>
        <View style={styles.verticalBar} />
      </View>
      <View style={styles.barWrapper}>
        <Text style={styles.barTopText}>0.5</Text>
        <View style={styles.verticalBar} />
      </View>
      <View style={styles.barWrapper}>
        <Text style={styles.barTopText}>0.6</Text>
        <View style={styles.verticalBar} />
      </View>
    </View>
    <View style={styles.barBottomWrapper}>
      <Text style={styles.barBottomText}>완전 초보</Text>
      <Text style={styles.barBottomText}>1년 미만</Text>
      <Text style={styles.barBottomText}>1년 이상{'\n'}3년 미만</Text>
      <Text style={styles.barBottomText}>3년 이상</Text>
      <Text style={styles.barBottomText}>고도의 투자{'\n'}숙련도</Text>
    </View>
  </View>
);

export default StatisticsBarGraph;
