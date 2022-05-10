import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '#common/colors';
import FinanceHeader from '#components/FinanceHeader';
import FinanceBarGraph from '#components/FinanceBarGraph';
import StockNameCard from '#components/StockNameCard';
import Document from '#components/Document';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import assets from '../../assets';
import HelpPopup from '../components/HelpPopup';

import BarLineChart, {
  Bar,
  Line,
  Average,
} from '../components/Chart/BarLineChart';
import { numberToKorean, parseNumber } from '../utils/utils';
import { companyHistory } from '../common/dataApi';
import help from '../common/help';
import { shallowEqual, useSelector } from 'react-redux';
import { CURRENCY_KRW, CURRENCY_USD } from '../data/common/actions';
import moment from 'moment';
import IndustrialPage from '#components/industrial_page';

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: 20,
    fontSize: 16,
    letterSpacing: -0.4,
  },
  nameCardBox: {
    marginBottom: 28
  },
  nameCardBoxContentContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  container: { flex: 1, backgroundColor: colors.white },
  graph: {
    height: 190,
    backgroundColor: colors.blueGrey,
    marginVertical: 30,
  },
  barGraphWrapper: { marginVertical: 5 },
  questionIcon: {
    width: 16,
    height: 16,
    marginLeft: 5,
  },
});

const DetailsFinance = ({ general, watchData, finance }) => {
  const inset = useSafeAreaInsets();
  const [showHelp, setShowHelp] = useState(false);
  const [isModal, setIsModal] = React.useState(false);
  if (!finance) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  const { currency, currentCurrency } = useSelector(
    (s) => s?.common?.currency,
    shallowEqual,
  );

  const currencyCalc = (v) => {
    if ((!v || v === 'N/A') && v !== 0) return 'N/A';
    if (currentCurrency == CURRENCY_KRW) {
      const krw = currency?.rates?.KRW;
      return Math.round(v * krw);
    } else if (currentCurrency == CURRENCY_USD) {
      return Math.round(v * 100) / 100;
    }
    return v;
  };

  // console.log(finance);

  const {
    operatingmargin,
    totalrevenue,
    roe,
    roa,
    debttoequity,
    macd,
    sr,
    rsi,
    movingAverage,
    sectorAverage,
    debttototalcapital
  } = finance;

  console.log('finance', finance);

  const xAxisDateCalc = (container) => {
    if (container?.length == 0)
      return Array(3)
        .fill(0)
        .map?.((_, i) => {
          return moment()
            .add(i - 3, 'year')
            .format('y');
        });
    return container
      .filter((_, i) => i < 3)
      .map?.(({ date }) => date.split('-')[0])
      .reverse();
  };

  const valueCalc = (container) => {
    if (!container || container?.length == 0) return Array(3).fill(0);
    return container
      ?.filter((_, i) => i < 3)
      ?.map?.(({ value }) => value)
      ?.reverse();
  };

  const xAxisDateCalcUpdated = (container) => {
    return Array(3)
      .fill(0)
      .map?.((_, i) => {
        return moment()
          .add(i - 3, 'year')
          .format('y');
      });
};

const getValue = (container) => {
  let getYears= xAxisDateCalcUpdated(container);
  let defaultVal = Array(3).fill(0);
  if (!container || container?.length == 0) return Array(3).fill(0);
  
  getYears?.map((yearVal,index)=>{
    let isValue = container?.find((item, i) => item?.date?.split('-')[0] == yearVal)
    defaultVal[index] = isValue?.value || 0;
  })
};

let opMarginVal = Math.max(...valueCalc(operatingmargin));
  return (
    <View>
      <View style={[styles.container, { paddingBottom: inset.bottom }]}>
        <View style={{ marginTop: 30 }}>
          <FinanceHeader title={'영업성과'} />
          <BarLineChart
            tag={'영업성과'}
            xAxis={xAxisDateCalc(totalrevenue)}
            charts={[
              {
                type: Bar,
                label: '매출',
                color: colors.cloudyBlue,
                min:
                  valueCalc(totalrevenue)?.reduce?.(
                    (p, c) => Math.min(p, c),
                    Number.MAX_SAFE_INTEGER,
                  ) / 2,
                format: (v) =>
                  currentCurrency == CURRENCY_KRW
                    ? `${numberToKorean(currencyCalc(v))?.split(' ')[0]}원`
                    : `$${numberToKorean(currencyCalc(v))?.split(' ')[0]}`,
                data: valueCalc(totalrevenue),
              },
              {
                type: Line,
                label: opMarginVal == 0 ? null:'영업이익률',
                color: colors.lightIndigo,
                format: (v) => `${(parseNumber(v) * 100).toFixed(2)}%`,
                data: valueCalc(operatingmargin),
              },
            ]}
          />
        </View>
        <View style={{ marginTop: 30 }}>
          <FinanceHeader title={'자본이익률 / 자산이익률'} />
            <BarLineChart
            tag={'이익률/수익률'}
            xAxis={xAxisDateCalcUpdated(roe)}
            charts={[
              {
                type: Line,
                label: 'ROE',
                color: colors.aqua,
                format: (v) => `${(v * 100).toFixed(2)}%`,
                data: getValue(roe),
              },
              {
                type: Line,
                label: 'ROA',
                color: colors.lightIndigo,
                format: (v) => `${(v * 100).toFixed(2)}%`,

                data: getValue(roa),
              },
            ]}
          />
        </View>
        <View style={{ marginTop: 30 }}>
           {/* <FinanceHeader title={'부채비율'}/> */}
          <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
          <Text style={{fontSize: 16,letterSpacing: -0.4,paddingLeft:20}}>부채비율</Text>
          <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => {
               setShowHelp(help['부채비율']);
              }}
              style={{ zIndex: 1 }}
            >
              <Image
                source={assets.icon_question}
                style={styles.questionIcon}
              />
            </TouchableOpacity>
          </View>
         

          <BarLineChart
            tag={'재무건전성'}
            containerHeight={130}
            xAxis={xAxisDateCalcUpdated(debttototalcapital)}
            charts={[
              {
                type: Bar,
                color: colors.cloudyBlue,
                format: (v) => {
                   return `${parseNumber(v * 100).toFixed(2)}%`;
                  //  `${v.toFixed(1)}`
                },
                minRatio: 0.5,
                min: 0,
                data: valueCalc(debttototalcapital),
              },
            ]}
          />
        </View>
        <View style={{ marginTop: 30 }}>
          <FinanceHeader title={'업계비교'} />
           {/* <BarLineChart
            tag={'업계비교'}
            containerHeight={150}
            xAxis={['영업이익률', 'ROE', 'ROA', '부채비율']}
            charts={[
              {
                group: 'A',
                type: Bar,
                color: colors.cloudyBlue,
                format: (v) => {
                  console.log(v);
                  return `${parseNumber(v).toFixed(2)}%`;
                },
                min: 0,
                data: [
                  (general.operatingmargin || 0) * 100,
                  (general.roe || 0) * 100,
                  (general.roa || 0) * 100,
                  (general.debttoequity || 0) * 100,
                ],
              },
              {
                group: 'A',
                type: Average,
                label: '업계평균',
                color: colors.lightIndigo,
                format: (v) => {
                  console.log('평균', v);
                  return null;
                },
                min: 0,
                data: [
                  (sectorAverage?.operatingmargin || 0) * 100,
                  (sectorAverage?.roe || 0) * 100,
                  (sectorAverage?.roa || 0) * 100,
                  (sectorAverage?.debttoequity || 0) * 100,
                ],
              },
            ]}
          /> */}
       <IndustrialPage finaceInfo={sectorAverage} generalData={general}/>

        </View>
        <Text style={[styles.title, { marginTop: 8 }]}>기술지표</Text>
        <View style={styles.barGraphWrapper}>
          <FinanceBarGraph
            title={`RSI (14일 기준)`}
            startingText={'매도시점'}
            endingText={'매수시점'}
            help={help.RSI}
            value={rsi < 30 ? 0 : rsi > 70 ? 1 : (rsi - 30) / (70 - 30)}
          />
        </View>
        <View style={styles.barGraphWrapper}>
          <FinanceBarGraph
            title={`이동평균선`}
            startingText={'강한 매도'}
            endingText={'강한 매수'}
            help={help['이동평균선']}
            value={(movingAverage + 5) / 10}
          />
        </View>
        {/* <View style={styles.barGraphWrapper}>
          <FinanceBarGraph
            title={'MACD signal'}
            startingText={'모멘텀 없음'}
            endingText={'강한 모멘텀'}
            help={help.MACDSignal}
          />
        </View>
        <View style={styles.barGraphWrapper}>
          <FinanceBarGraph
            title={'Stochastic Oscillator'}
            startingText={'매도시점'}
            endingText={'매수시점'}
            help={help.StochasticOscillator}
          />
        </View> */}
        {general?.relatedTickers && <><Text
          style={[
            styles.title,
            {
              marginVertical: 28,
            },
          ]}
        >
          연관 주식
        </Text>
        <ScrollView
          style={styles.nameCardBox}
          contentContainerStyle={styles.nameCardBoxContentContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {general.relatedTickers.map?.((tickerInfo, i) => {
            console.log('tickerInfo');
            console.log(tickerInfo);
            return <StockNameCard key={i} {...tickerInfo} item={tickerInfo} />;
          })}
        </ScrollView></>}
      </View>
      <HelpPopup
        isVisible={!!showHelp}
        help={showHelp}
        onCancel={() => {
          setIsModal(false);
          setShowHelp(null);
        }}
      />
     </View>
  );
};
export default DetailsFinance;
