import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import colors from '#common/colors';
import assets from '../../assets';
import { shallowEqual, useSelector } from 'react-redux';
import { CURRENCY_KRW, CURRENCY_USD } from '../data/common/actions';
import { commaFormat } from '../utils/utils';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  mainWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
  stockIcon: {
    width: 55,
    height: 55,
    backgroundColor: '#eee',
    borderRadius: 55 / 2,
  },
  stockName: {
    justifyContent: 'center',
    paddingLeft: 10,
    flex: 1,
  },
  stockNameText: {
    color: colors.greyBlue,
    // fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
  },
  stockTicker: {
    color: colors.cloudyBlueTwo,
    fontSize: 13,
  },
  subWrapper: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 32,
    // fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    color: colors.dark,
  },
  arrowIcon: {
    width: 6,
    height: 4,
    marginTop: 2,
  },
  subText: { color: colors.softBlue, paddingLeft: 4 },
  subTextUp: {
    color: colors.watermelon,
    paddingLeft: 4,
  },

  smallText: {
    fontSize: 18,
    color: colors.dark,
    // fontWeight: 'normal',
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const StockCard = ({ general, watchData }) => {
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
      return commaFormat(Math.round(v * 100) / 100, undefined, undefined, 2);
    }
    return v;
  };
  const current = general?.current;
  const last = general?.last_price;
  const isUp = current > last;
  const logo =
    general?.logo ||
    `https://storage.googleapis.com/pickhaeju-static/logo/${general.ticker}.png`;
  return (
    <View style={styles.container}>
      <View style={styles.mainWrapper}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Image style={styles.stockIcon} source={{ uri: logo }} />
          <View style={styles.stockName}>
            <Text style={styles.stockNameText} numberOfLines={2}>
              {general.nameKo || general.name}
            </Text>
            <Text style={styles.stockTicker}>{general.ticker}</Text>
          </View>
        </View>
        <View style={[styles.textWrapper]}>
          <Text style={styles.mainText} numberOfLines={1}>
            {currencySymbolBefore && (
              <Text style={styles.smallText}>{currencySymbolBefore}</Text>
            )}
            {currencyCalc(current)}
            {currencySymbolAfter && (
              <Text style={styles.smallText}>{currencySymbolAfter}</Text>
            )}
          </Text>
        </View>
      </View>
      <View style={styles.subWrapper}>
        <Image
          source={isUp ? assets.arr_up_red : assets.arrow_down_blue}
          style={styles.arrowIcon}
        />
        <Text style={[styles.subText, isUp && styles.subTextUp]}>
          {currencySymbolBefore}
          {currencyCalc(Math.abs(current - last))}
          {currencySymbolAfter}(
          {Math.abs(((current - last) / last) * 100).toFixed(2)}
          %)
        </Text>
      </View>
    </View>
  );
};

export default StockCard;
