import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import colors from '#common/colors';
import assets from '../../assets';
import DeleteFollowerPopUp from '#components/DeleteFollowerPopUp';
import { shallowEqual, useSelector } from 'react-redux';
import { CURRENCY_KRW, CURRENCY_USD } from '../data/common/actions';
import { avoidNaN, commaFormat } from '../utils/utils';
import { Directions } from 'react-native-gesture-handler';

 const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // backgroundColor: colors.white,
    paddingVertical: 15,
    alignItems: 'center'
  },
  stockIcon: {
    width: 30,
    height: 30,
  },
  incomeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // width: 80,
    justifyContent: 'flex-end',
  },
  incomeText: { color: colors.watermelon, paddingLeft: 4 },
  contentText: {
    color: colors.dark,
    fontSize: 13,
    textAlign: 'right',
    // width: 80,
  },
  stockWrapper: { flexDirection: 'row' },
  stockPrice: { alignSelf: 'center' },
  arrowIcon: { width: 6, height: 4 },
  downText: {
    color: colors.softBlue,
    fontSize: 13,
    paddingLeft: 3,
    textAlign: 'right',
    },
    
    stockHeaderRight: {
    minWidth: 100,
    maxWidth: 100,
    justifyContent: 'flex-end',
    paddingRight: 3,
    },
  upText: {
    color: colors.watermelon,
    fontSize: 13,
  },

  trashIcon: {
    width: 15,
    height: 15,
  },
  trashIconWrapper: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});

const StockList = ({ portfolio, onPress }) => {
  const [isVisible, setIsVisible] = useState(false);

  // console.log('portfolio', JSON.stringify(portfolio, undefined, 2));

  const { currency, currentCurrency } = useSelector(
    (s) => s?.common?.currency,
    shallowEqual,
  );

  console.log('currency.rates', CURRENCY_KRW);

  const currencySymbolBefore = currentCurrency == CURRENCY_KRW ? '' : '$';
  const currencySymbolAfter = currentCurrency == CURRENCY_KRW ? '원' : '';
  const currencyCalc = (v) => {
    if ((!v || v === 'N/A') && v !== 0) return 'N/A';
    if (currentCurrency == CURRENCY_KRW) {
      
      const krw = currency?.rates?.KRW;
      return currencySymbolBefore + commaFormat(Math.round(v * krw))+
      currencySymbolAfter;
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

  const current = portfolio?.general?.current;
  const last = portfolio?.general?.last_price;
  const amount = portfolio?.amount;
  const price = portfolio?.price;
  console.log('portfolio', portfolio);
  const valuationGainLoss = current * amount - price * amount;
  console.log('valuationGainLoss', valuationGainLoss);

  const incomeRatio = (current * amount) / (price * amount) - 1;
  return (
    <TouchableHighlight
    underlayColor= {colors.paleGreyTwo}
      style={styles.container}
      onPress={onPress}
    >
      <React.Fragment>
      {/* 현재가 */}
      <Text style={[styles.contentText, styles.stockHeaderRight]}>
        {currencyCalc(current)}
      </Text>
      {/* 일일변동 */}
     <View style={styles.stockHeaderRight}>
        <View style={styles.incomeWrapper}>
          <Image
            source={
              current - last > 0 ? assets.arr_up_red : assets.arrow_down_blue
            }
            style={styles.arrowIcon}
          />
          <Text style={[styles.downText, current - last > 0 && styles.upText]}>
            {currencyCalc(Math.abs(current - last))}
          </Text>
        </View>
        <View style={styles.incomeWrapper}>
            <Image
              source={
                current - last > 0 ? assets.arr_up_red : assets.arrow_down_blue
              }
              style={styles.arrowIcon}
            />
            <Text style={[styles.downText, current - last > 0 && styles.upText, {fontSize:11}]}>
              {avoidNaN(
                Math.abs(((current - last) / last) * 100),
                (v) => `${v.toFixed(2)}%`,
                'N/A',
              )}
            </Text>
          </View>
      </View>

      <View style={styles.stockHeaderRight}>
        <View style={styles.incomeWrapper}>
        <Image
          source={
            valuationGainLoss > 0 ? assets.arr_up_red : assets.arrow_down_blue
          }
          style={styles.arrowIcon}
        />
          <Text style={[styles.downText, valuationGainLoss > 0 && styles.upText]}>
          {currencyCalc(Math.abs(valuationGainLoss))}
          </Text>
        </View>
              {/* 수익률 */}

        <View style={styles.incomeWrapper}>
            <Image
             source={incomeRatio > 0 ? assets.arr_up_red : assets.arrow_down_blue}
             style={styles.arrowIcon}
            />
            <Text style={[styles.downText, incomeRatio > 0 && styles.upText, {fontSize:11}]}>
            {/* {avoidNaN(
            Math.abs(incomeRatio * 100),
            (v) => `${v.toFixed(2)}%`,
            'N/A',
          )} */}
          {incomeRatio && incomeRatio !== null && !isNaN(incomeRatio) ? commaFormat(Math.abs(incomeRatio * 100),3,",",1)+"%" : "N/A"}
            </Text>
          </View>
      </View>
      
      {/* 매수단가 */}
      <Text style={[styles.contentText, styles.stockHeaderRight]}>
        {currencyCalc(portfolio?.price)}
      </Text>
      {/* 보유주식수 */}
      <Text style={[styles.contentText, styles.stockHeaderRight]}>{commaFormat(amount)}</Text>
      {/* 현재가치 */}
      <Text style={[styles.contentText, styles.stockHeaderRight]}>
        {currencyCalc(current * amount)}
      </Text>
      </React.Fragment>
    </TouchableHighlight>
  );
};

export default StockList;
