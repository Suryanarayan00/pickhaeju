import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { shallowEqual, useSelector } from 'react-redux';
import moment from 'moment';
import colors from '#common/colors';
import SummaryTable from '#components/SummaryTable';
import MostRecentPicTalk from '#components/MostRecentPicTalk';
import LatestReplyBlock from '#components/LatestReplyBlock';
import HotPicTalkList from '#components/HotPicTalkList';
import NewsPickSection from '#components/NewsPickSection';
 import LineChart from '#components/Chart/LineChart';
import Gauge from '#components/Gauge';

import assets from '../../assets';
import { commaFormat } from '../utils/utils';
import {
  priceHistoryDurations,
  priceHistory,
  DurationHistory5Years,
} from '../common/dataApi';
import { CURRENCY_KRW, CURRENCY_USD } from '../data/common/actions';


const styles = StyleSheet.create({
  buttonWrapper: {
    width: 50,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapperOn: {
    borderRadius: 15,
    backgroundColor: colors.lightIndigo,
  },
  contentsWrapper: {
    marginTop: 26,
    backgroundColor: colors.whiteThree,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 22,
    paddingHorizontal: 20,
  },
  textWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
  title: {
    fontSize: 14,
    color: colors.blueyGrey,
    letterSpacing: -0.35,
    marginVertical: 5,
  },
  contents: {
    fontSize: 14,
    color: colors.dark,
    letterSpacing: -0.35,
    marginVertical: 5,
  },
  newsWrapper: {
    borderBottomColor: colors.paleGrey,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
  contentsHeader: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomColor: colors.lightPeriwinkle,
    borderBottomWidth: 1,
    paddingBottom: 15,
    paddingTop: 32,
  },
  pickWrapper: {
    paddingHorizontal: 20,
    borderBottomColor: colors.paleGrey,
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13.5,
    backgroundColor: colors.white,
  },
  moreButton: {
    fontSize: 12,
    color: colors.blueGrey,
    letterSpacing: -0.3,
  },
  arrowIcon: {
    width: 6,
    height: 4,
    marginLeft: 5,
  },
  container: { flex: 1, marginTop: 28 },
  monthButtonBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginTop: 15,
  },
  buttonText: { fontSize: 12, color: colors.blueGrey },
  buttonTextOn: { color: colors.white },
  summaryTableWrapper: {
    fontSize: 12,
    color: colors.blueGrey,
    backgroundColor: colors.whiteThree,
    paddingTop: 30,
    marginTop: 30,
    paddingHorizontal: 20,
  },
  fullTextButton: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  arrowDownIcon: { width: 6, height: 4 },
  companyIntroText: {
    fontSize: 14,
    color: colors.dark,
    letterSpacing: -0.35,
    lineHeight: 20,
  },
  companyIntroWrapper: { paddingHorizontal: 20, marginVertical: 20 },
  companyIntroTitle: { fontSize: 16, color: colors.greyBlue, marginRight: 10 },
  companyInfoWrapper: { flexDirection: 'row', paddingHorizontal: 20 },
  sectionTitle: { fontSize: 18, color: colors.dark },
  moreButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceMinMax: {
    marginTop: 30,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});
const data = [
  { id: 'dfda', title: 'dfda' },
  { id: 'dfds', title: 'dfds' },
  { id: 'dfdd', title: 'dfdd' },
  { id: 'dfdr', title: 'dfdr' },
];
const DetailsSummary = ({ general }) => {
  const inset = useSafeAreaInsets();
  const [selectedDuration, setDurationSelected] = useState(
    priceHistoryDurations[0],
  );

  const [priceHistoryData, setPriceHistoryData] = useState(null);

  useEffect(() => {
    setPriceHistoryData(null);
    priceHistory({
      ticker: general?.ticker,
      duration: selectedDuration,
    }).then((data) => {
      setPriceHistoryData(data.reverse());
    });
    return () => {};
  }, [selectedDuration]);

  const { currency, currentCurrency } = useSelector(
    (s) => s?.common?.currency,
    shallowEqual,
  );

  const currencySymbolBefore = currentCurrency == CURRENCY_KRW ? '' : '$';
  const currencySymbolAfter = currentCurrency == CURRENCY_KRW ? '원' : '';

  const currencyCalc = (v) => {
    if ((!v || v === 'N/A') && v !== 0) return 'N/A';
    if (currentCurrency == CURRENCY_KRW) {
      const krw = currency?.rates?.KRW;
      return commaFormat(Math.round(v * krw));
    } else if (currentCurrency == CURRENCY_USD) {
      return commaFormat(Math.round(v * 100) / 100, undefined, undefined, 2);
    } else {
      return commaFormat(Math.round(v * 100) / 100);
    }
    return v;
  };

  const low = general?.fiftytwo_week_low;
  const high = general?.fiftytwo_week_high;
  const current = general?.current;

  return (
    <View style={[styles.container, { paddingBottom: inset.bottom }]}>
      {/*   <View style={{ height: 200, backgroundColor: colors.lightPeriwinkle }} />*/}
      {/* <LineChart1 data={{}} /> */}
      {!priceHistoryData ? (
        <View
          style={{
            height: 166,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator />
        </View>
      ) : 
      (
       <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false} // to hide scroll bar
      >
        <LineChart
          charts={[
            {
              data: priceHistoryData.map?.(({ adj_close }) => adj_close),
            },
          ]}
          renderFocusdElement={(x) => {
            const format = selectedDuration.dateFormat;
            const { date, adj_close } = priceHistoryData[x];
            return `${moment(date).format(
              format,
            )}\n${currencySymbolBefore}${currencyCalc(
              adj_close,
            )}${currencySymbolAfter}`;
          }}
        />
        </ScrollView>
   
      )
      }
      <View style={styles.monthButtonBox}>
        {priceHistoryDurations.map?.((duration, index) => {
          const isSelected = selectedDuration == duration;
          return (
            <TouchableOpacity
              key={`duration_${index}`}
              activeOpacity={0.85}
              style={[
                styles.buttonWrapper,
                isSelected && styles.buttonWrapperOn,
              ]}
              onPress={() => setDurationSelected(duration)}
            >
              <Text
                style={[styles.buttonText, isSelected && styles.buttonTextOn]}
              >
                {duration.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

       <View style={styles.priceMinMax}>
        <View style={{height:60}}>
        <View style={{height:18}}>
        {current < low ? <Text style={{ fontSize: 12, color: colors.darkPeriwinkle}}>
           신저점 갱신
          </Text>:null}
        </View>
          <Text style={{ fontSize: 12, color: colors.blueGrey }}>
            52주 최저가
          </Text>
          <Text
            style={{
              fontSize: 14,
              // fontWeight: 'bold',
              fontFamily: 'Roboto-Bold',
              color: colors.dark,
            }}
          >
            <Text>{currencySymbolBefore}</Text>
            {currencyCalc(low)}
            <Text>{currencySymbolAfter}</Text>
          </Text>
        </View>
        <View style={{ flex: 1, marginHorizontal: 30 }}>
          <Gauge
            value={
              low && high && low !== high && current
                ? (current - low) / (high - low)
                : 0.5
            }
            color={low && high && low !== high && current > high ? colors.watermelon :(current < low ? colors.darkPeriwinkle : colors.purpleBlue)}
          />
        </View>
        <View  style={{height:60}}>
        <View style={{height:18}}>
        {current > high?<Text style={{ fontSize: 12, color: colors.watermelon}}>신고점 갱신</Text>:null}

        </View>
          <Text style={{ fontSize: 12, color: colors.blueGrey }}>
            52주 최고가
          </Text>
          <Text
            style={{
              fontSize: 14,
              // fontWeight: 'bold',
              fontFamily: 'Roboto-Bold',
              color: colors.dark,
            }}
          >
            <Text>{currencySymbolBefore}</Text>
            {currencyCalc(high)}
            <Text>{currencySymbolAfter}</Text>
          </Text>
        </View>
        <View style={{ height: 56, backgroundColor: colors.cloudyBlue }} />
      </View>

      <View style={styles.summaryTableWrapper}>
        <SummaryTable general={general} />
      </View>

       <TouchableOpacity activeOpacity={0.85} style={styles.fullTextButton}>
        <Text style={styles.companyIntroTitle}>기업정보</Text>
        {/* <Image source={assets.arrow_down_gray} style={styles.arrowDownIcon} /> */}
      </TouchableOpacity>

      <View style={styles.companyIntroWrapper}>
        <Text style={styles.companyIntroText}>
          {general.descriptionKo || general.long_description}
        </Text>
      </View>

      <View style={styles.companyInfoWrapper}>
        <View style={{ width: '25%' }}>
          <Text style={styles.title}>CEO</Text>
          <Text style={styles.title}>설립연도</Text>
          <Text style={styles.title}>본사</Text>
        </View>

        <View style={{ width: '75%' }}>
          <Text style={styles.contents}>{general?.ceo}</Text>
          <Text style={styles.contents}>{general?.dateofestablishment}</Text>
          <Text style={styles.contents}>
            {general?.hq_address_city}, {general?.hq_state}
          </Text>
        </View>
      </View>

      {/* <MostRecentPicTalk /> */}

      {/* <LatestReplyBlock />

      <HotPicTalkList /> */}

      <NewsPickSection tickers={[general?.ticker]} />
    </View>
  );
};
export default DetailsSummary;
