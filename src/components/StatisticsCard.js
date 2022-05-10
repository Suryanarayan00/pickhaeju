import { Text, View, StyleSheet } from 'react-native';
import colors from '#common/colors';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { CURRENCY_KRW, CURRENCY_USD } from '../data/common/actions';
import { commaFormat } from '../utils/utils';

const styles = StyleSheet.create({
  assetsCard: {
    width: '90%',
    backgroundColor: colors.white,
    paddingTop: 22,
    paddingBottom: 32,
    borderRadius: 4.5,
    shadowColor: colors.blueGrey,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 28,
  },
  assetsNumber: {
    color: colors.violetBlue,
    fontSize: 18,
    paddingTop: 18,
    fontFamily: 'Roboto-Bold'
  },
  priceWrapper: {
    alignItems: 'flex-end',
  },
  titleText: { fontSize: 12, color: colors.blueGrey },
  headerTitle: { paddingHorizontal: 22, paddingBottom: 34 },
  nameText: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: colors.dark,
  },
  normalText: { fontFamily: 'Roboto' },
  infoText: { fontSize: 18, color: colors.dark },
  textWrapper: { alignItems: 'flex-end', marginRight: 20 },
  smallText: { fontSize: 12, fontFamily: 'Roboto' },
  absoluteRR: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
const StatisticsCard = ({
  total,
  currencySymbolBefore,
  currencySymbolAfter,
  totalInNum
}) => {
  const userInfo = useSelector((state) => state.auth.principal);
  return (
    
    <View style={styles.assetsCard}>
    
      <View style={styles.headerTitle}>
        <Text style={styles.nameText}>
          {userInfo?.name}
          <Text style={styles.normalText}>님</Text>
        </Text>
        <Text style={styles.infoText}>자산구성 통계입니다.</Text>
      </View>
      <View style={styles.priceWrapper}>
        <View style={styles.textWrapper}>
          <Text style={styles.titleText}>투자금액</Text>
        {
         totalInNum > 0 ? <Text style={styles.assetsNumber}>
         {!!currencySymbolBefore && (
           <Text style={styles.smallText}>{currencySymbolBefore}</Text>
         )}
         {total}
         {!!currencySymbolAfter && (
           <Text style={styles.smallText}>{currencySymbolAfter}</Text>
         )}
       </Text>:
       <Text style={[styles.assetsNumber,{color:colors.dark}]}>-</Text>
        }
          
        </View>
      </View>
    </View>
  );
};
export default StatisticsCard;
