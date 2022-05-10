import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '#common/colors';
import React, { useState } from 'react';
import assets from '../../assets';
import { commaFormat, numberToKorean } from '../utils/utils';
import HelpPopup from './HelpPopup';
import helpData from '../common/help';
import { shallowEqual, useSelector } from 'react-redux';
import { CURRENCY_KRW, CURRENCY_USD } from '../data/common/actions';
const styles = StyleSheet.create({
  contentsWrapper: {
    backgroundColor: colors.whiteThree,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  textWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    paddingBottom: 26,
  },
  questionIcon: {
    width: 16,
    height: 16,
    marginLeft: 5,
  },
  titleWrapper: { flexDirection: 'row', alignItems: 'center' },
  title: { color: colors.blueGrey },
  numText: { color: colors.dark },
});
 const SummaryTable = ({ general }) => {
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
      return Math.round(v * (1 * krw));
    } else if (currentCurrency == CURRENCY_USD) {
      return Math.round(v * 100) / 100;
    }
    return v;
   };

  const [help, setHelp] = useState(null);
  return (
    <View style={styles.contentsWrapper}>
      <View
        style={[
          styles.textWrapper,
          {
            paddingRight: 30,
          },
        ]}
      >
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>시가총액</Text>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setHelp(helpData.MarketCapitalization)}
          >
            <Image source={assets.icon_question} style={styles.questionIcon} />
          </TouchableOpacity>
         </View>
        <Text style={styles.numText}>
           {general?.marketcap === 'N/A'
            ? 'N/A'
            : currencySymbolBefore +
              numberToKorean(currencyCalc(general?.marketcap),true)?.split(
                ' ',
              )?.[0] +
              currencySymbolAfter}
        </Text>
      </View>
      <View style={styles.textWrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>베타</Text>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setHelp(helpData.Beta)}
          >
            <Image source={assets.icon_question} style={styles.questionIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.numText}>
          {general?.beta !== 'N/A'
            ? commaFormat(general.beta, undefined, undefined, 2)
            : 'N/A'}
          <Text></Text>
        </Text>
      </View>
      <View
        style={[
          styles.textWrapper,
          {
            paddingRight: 30,
          },
        ]}
      >
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>배당수익률</Text>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setHelp(helpData.DividendYield)}
          >
            <Image source={assets.icon_question} style={styles.questionIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.numText}>
          {general?.dividendyield !== 'N/A'
            ? commaFormat(general?.dividendyield * 100, undefined, undefined, 1)
            : 'N/A'}
          %
        </Text>
      </View>
      <View style={styles.textWrapper}>
        <View style={styles.titleWrapper}>
          <Text style={{ color: colors.blueGrey }}>PER</Text>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setHelp(helpData.PER)}
          >
            <Image source={assets.icon_question} style={styles.questionIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.numText}>
          {general?.per !== 'N/A'
            ? commaFormat(general?.per, undefined, undefined, 1)
            : 'N/A'}
          {general?.per !== 'N/A' && <Text></Text>}
        </Text>
      </View>
      <View
        style={[
          styles.textWrapper,
          {
            paddingRight: 30,
          },
        ]}
      >
        <View style={styles.titleWrapper}>
          <Text style={{ color: colors.blueGrey }}>PBR</Text>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setHelp(helpData.PBR)}
          >
            <Image source={assets.icon_question} style={styles.questionIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.numText}>
          {general?.pbr !== 'N/A'
            ? commaFormat(general?.pbr, undefined, undefined, 1)
            : 'N/A'}
          {general?.pbr !== 'N/A' && <Text></Text>}
        </Text>
      </View>
      <View style={styles.textWrapper}>
        <View style={styles.titleWrapper}>
          <Text style={{ color: colors.blueGrey }}>PSR</Text>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setHelp(helpData.PSR)}
          >
            <Image source={assets.icon_question} style={styles.questionIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.numText}>
          {general?.psr !== 'N/A'
            ? commaFormat(general?.psr, undefined, undefined, 1)
            : 'N/A'}
          {general?.psr !== 'N/A' && <Text></Text>}
        </Text>
      </View>

      <HelpPopup
        isVisible={!!help}
        help={help}
        onCancel={() => {
          setHelp(null);
        }}
      />
    </View>
  );
};
export default SummaryTable;
