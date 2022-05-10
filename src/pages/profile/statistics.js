import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import colors from '#common/colors';
import PortfolioIndustry from '#components/PortfolioIndustry';
import StatisticsBarGraph from '#components/StatisticsBarGraph';
import LineChart from '#components/Chart/LineChart';
import BarLineChart, { Bar } from '#components/Chart/BarLineChart';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },

  termButton: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  termButtonOn: {
    backgroundColor: colors.lightIndigo,
  },
  greyTitle: {
    color: colors.greyBlue,
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 10,
  },
  viewsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 19,
    marginRight: 34,
  },
  viewsWrapper: { flexDirection: 'row', alignItems: 'center' },
  dateText: { fontSize: 32, color: colors.dark },
  viewsNumber: { marginLeft: 10 },
  viewsNumText: { fontSize: 12, color: colors.blueyGrey },
  termWrapper: { flexDirection: 'row' },

  termText: { fontSize: 12, color: colors.blueGrey },
  termTextOn: { color: colors.white },

  monthButtonBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginVertical: 15,
  },
  section: {
    paddingHorizontal: 20,
    marginVertical: 30,
  },
  title: { fontSize: 18, color: colors.blackTwo },
  greyBorder: { backgroundColor: colors.paleGreyThree, height: 10 },
});

const DurationDay = 'day';
const DurationWeek = 'week';
const DurationMonth = 'month';

const MockupDatas = [
  Array(30)
    .fill(0)
    .map?.((_, i) => 2000 + Math.random() * 200 * -i - i * 200),
  Array(30)
    .fill(0)
    .map?.((_, i) => 3000 + Math.random() * 200 * -i - i * 400),
  Array(30)
    .fill(0)
    .map?.((_, i) => 50000 + Math.random() * 400 * -i),
  Array(30)
    .fill(0)
    .map?.((_, i) => 200 + Math.random() * 20000),
];

const PickStatistics = ({ datas = MockupDatas }) => {
  const [duration, setDuration] = useState(0);
  const [durationSelected, setDurationSelected] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  return (
    <ScrollView style={styles.container} scrollEnabled={scrollEnabled}>
      <Text style={styles.greyTitle}>조회수</Text>
      <View style={styles.viewsHeader}>
        <View style={styles.viewsWrapper}>
          <Text style={styles.dateText}>564</Text>
          <View style={styles.viewsNumber}>
            <Text style={styles.viewsNumText} />
            <Text style={styles.viewsNumText}>15,390</Text>
          </View>
        </View>
        <View style={styles.termWrapper}>
          <TouchableOpacity
            onPress={() => setDuration(DurationDay)}
            activeOpacity={0.85}
            style={[
              styles.termButton,
              duration == DurationDay && styles.termButtonOn,
            ]}
          >
            <Text
              style={[
                styles.termText,
                duration == DurationDay && styles.termTextOn,
              ]}
            >
              일간
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDuration(DurationWeek)}
            activeOpacity={0.85}
            style={[
              styles.termButton,
              duration == DurationWeek && styles.termButtonOn,
            ]}
          >
            <Text
              style={[
                styles.termText,
                duration == DurationWeek && styles.termTextOn,
              ]}
            >
              주간
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDuration(DurationMonth)}
            activeOpacity={0.85}
            style={[
              styles.termButton,
              duration == DurationMonth && styles.termButtonOn,
            ]}
          >
            <Text
              style={[
                styles.termText,
                duration == DurationMonth && styles.termTextOn,
              ]}
            >
              월간
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <LineChart
        height={200}
        focusBarHidden
        onDragStart={() => setScrollEnabled(false)}
        onDragEnd={() => setScrollEnabled(true)}
        charts={[
          {
            color: 'rgb(237,99,135)',
            data: datas[0],
            gradient: [],
          },
          {
            color: 'rgb(94,228,219)',
            data: datas[1],
            gradient: [],
          },
          {
            color: colors.lightIndigo,
            data: datas[2],
            gradient: [],
          },
          {
            color: 'rgb(112,168,244)',
            data: datas[3],
            gradient: [],
          },
        ]}
      />

      <View style={styles.monthButtonBox}>
        {['2021', 'Jan', 'Feb', 'Mar', 'Apr'].map?.((duration, index) => {
          const isSelected = durationSelected == index;
          return (
            <TouchableOpacity
              key={`duration_${index}`}
              activeOpacity={0.85}
              style={[styles.termButton, isSelected && styles.termButtonOn]}
              onPress={() => setDurationSelected(index)}
            >
              <Text style={[styles.termText, isSelected && styles.termTextOn]}>
                {duration}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.greyBorder} />
      <View style={styles.section}>
        <Text style={styles.title}>독자들의 투자숙련도</Text>
        <BarLineChart
          chartPadding={30}
          containerHeight={120}
          xAxis={[
            '완전초보',
            '1년 미만',
            '1년 이상\n3년 미만',
            '3년이상',
            '고도의 투자\n숙련도',
          ]}
          charts={[
            {
              type: Bar,
              barWidth: 10,
              color: colors.blueyGrey,
              format: (v) => `${v.toFixed(1)}`,
              minRatio: 0.3,
              data: [1.0, 0.7, 0.6, 0.5, 0.6],
            },
          ]}
        />
      </View>
      <View style={styles.greyBorder} />
      <View style={styles.section}>
        <Text style={styles.title}>독자들의 주식 보유기간</Text>
        <BarLineChart
          chartPadding={30}
          containerHeight={120}
          xAxis={[
            '일주일\n미만',
            '일주일 이상\n1개월 미만',
            '1개월 이상\n3개월 미만',
            '3개월 이상\n1년 미만',
            '1년 이상',
          ]}
          charts={[
            {
              type: Bar,
              barWidth: 10,
              color: colors.blueyGrey,
              format: (v) => `${v.toFixed(1)}`,
              minRatio: 0.3,
              data: [1.0, 0.7, 0.6, 0.5, 0.6],
            },
          ]}
        />
      </View>
    </ScrollView>
  );
};

export default PickStatistics;
