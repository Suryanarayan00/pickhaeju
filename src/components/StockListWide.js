import colors from '#common/colors';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import assets from '../../assets';
import { CURRENCY_KRW, CURRENCY_USD } from '../data/common/actions';
import { avoidNaN, commaFormat } from '../utils/utils';
import Gauge from '#components/Gauge';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    alignItems: 'center', 
  },

  incomeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // width: 80,
    justifyContent: 'flex-end',
  },
  incomeText: { color: colors.softBlue, paddingLeft: 4 },
  incomeTextUp: {
    color: colors.watermelon,
  },

  arrowIcon: {
    width: 6,
    height: 4,
  },
  contentText: {
    color: colors.dark,
    fontSize: 13,
    textAlign: 'right',
    // width: 80,
  },
  barStyle: {
    alignItems: 'center',
    width: 120,
  },
  trashIcon: {
    width: 15,
    height: 15,
  },
  trashIconWrapper: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  downText: { color: colors.softBlue, fontSize: 14, paddingLeft: 4 },
  upText: {
    color: colors.watermelon,
  }, 
  stockHeaderRight: {
    minWidth: 90, 
    maxWidth: 90,
    justifyContent: 'flex-end', 
    paddingRight: 8,
  },
});
const StockListWide = ({
  KorName,
  EngName,
  stockPrice,
  income,
  incomeRate,
  stockIcon,
  arrowIcon,
  onPress,
  general,
  columns,
  watchData,
  onPressDelete,
}) => {
  //console.log('StockListWide::general', JSON.stringify(general?.two_hundred_days_average, undefined, 2));

  // "ticker": "AAPL",
  // "current": 120.65,
  // "last_price": 120.53,
  // "average": 115.51784672631115,
  // "52_week_high": "144.87",
  // "52_week_low": "52.74",
  // "beta": 1.0415,
  // "dividendyield": "0.006803",

  const navigation = useNavigation();

  const { currency, currentCurrency } = useSelector(
    (s) => s?.common?.currency,
    shallowEqual,
  );

  const currencyCalc = (v) => {
    const currencySymbolBefore = currentCurrency == CURRENCY_KRW ? '' : '$';
    const currencySymbolAfter = currentCurrency == CURRENCY_KRW ? '원' : '';
    if ((!v || v === 'N/A') && v !== 0) return 'N/A';
    if (currentCurrency == CURRENCY_KRW) {
      const krw = currency?.rates?.KRW;
      return (
        currencySymbolBefore +
        commaFormat(Math.round(v * krw)) +
        currencySymbolAfter
      );
    } else if (currentCurrency == CURRENCY_USD) {
      return (
        currencySymbolBefore +
        commaFormat(Math.round(v * 100) / 100, undefined, undefined, 2) +
        currencySymbolAfter
      );
    } else {
      return (
        currencySymbolBefore +
        commaFormat(Math.round(v * 100) / 100, undefined, undefined, 2) +
        currencySymbolAfter
      );
    }
    return v;
  };

  // console.log('usd', currencyCalc(1));
  const isUp = general?.current > general?.last_price;

  const gaugeValue =
    general?.fiftytwo_week_low &&
    general?.fiftytwo_week_high &&
    general?.current
      ? (general?.current - general?.fiftytwo_week_low) /
        (general?.fiftytwo_week_high - general?.fiftytwo_week_low)
      : null;

  console.log(
    gaugeValue,
    general?.fiftytwo_week_low,
    general?.fiftytwo_week_high,
    general?.current,
  );
console.log('*************200**********');
console.log(general?.two_hundred_days_average?.average);
console.log('**********************');
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigation.navigate('PortfolioDetails', {
            general,
          });
        }}
        activeOpacity={0.85}
      >
        {/* 현재가 */}
        <Text style={[styles.contentText, styles.stockHeaderRight]}>{currencyCalc(general?.current)}</Text>
        {/* 전일대비 */}
        {/* <View style={styles.incomeWrapper}>
          <Image
            source={isUp ? assets.arr_up_red : assets.arrow_down_blue}
            style={styles.arrowIcon}
          />
          <Text style={[styles.incomeText, isUp && styles.incomeTextUp]}>
            {currencyCalc(Math.abs(general?.current - general?.last_price))}
          </Text>
        </View> */}
       {/*new Changes*/} 
      <View style={styles.stockHeaderRight}>
        <View style={[styles.incomeWrapper,{justifyContent:'flex-end'}]}>
        <Image
            source={isUp ? assets.arr_up_red : assets.arrow_down_blue}
            style={styles.arrowIcon}
          />
          <Text style={[styles.incomeText, isUp && styles.incomeTextUp]}>
            {currencyCalc(Math.abs(general?.current - general?.last_price))}
          </Text>
        </View>
        <View style={[styles.incomeWrapper,{justifyContent:'flex-end'}]}>
            <Image
              source={
                general?.current - general?.last_price > 0 ? assets.arr_up_red : assets.arrow_down_blue
              }
              style={styles.arrowIcon}
            />
            <Text style={[styles.downText, general?.current - general?.last_price > 0 && styles.upText, {fontSize:11, }]}>
              {avoidNaN(
                Math.abs(((general?.current - general?.last_price) / general?.last_price) * 100),
                (v) => `${v.toFixed(2)}%`,
                'N/A',
              )}
            </Text>
        </View>
      </View>

        {/* 베타 */}
        <Text style={[styles.contentText, styles.stockHeaderRight]}>
          {commaFormat(general?.beta, undefined, undefined, 2)}
        </Text>

        {/* 배당수익룰 */}
        <Text style={[styles.contentText, styles.stockHeaderRight]}>
          {isNaN(general?.dividendyield * 100)
            ? 'N/A'
            : `${(general?.dividendyield * 100).toFixed(2)}%`}
        </Text>

        {/* 200일 평균 */}
        <Text style={[styles.contentText, styles.stockHeaderRight]}>
          {currencyCalc(general?.two_hundred_days_average?.average)}
        </Text>

        {/* 52주 최저가 */}
        <Text style={[styles.contentText, styles.stockHeaderRight]}>
          {currencyCalc(general?.fiftytwo_week_low)}
        </Text>
        
        <View style={[styles.barStyle, styles.stockHeaderRight]}>
          <Gauge value={gaugeValue} />
        </View>

        {/* 52주 최고가 */}
        <Text style={[styles.contentText, styles.stockHeaderRight]}>
          {currencyCalc(general?.fiftytwo_week_high)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.trashIconWrapper} onPress={onPressDelete}>
        <Image source={assets.icon_trash} style={styles.trashIcon} />
      </TouchableOpacity>
    </>
  );
};
export default StockListWide;
