import React, { useState,useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import colors from '#common/colors';
import assets from '../../assets';
import { CURRENCY_KRW } from '../data/common/actions';
import { numberToKorean } from '../utils/utils';
import moment from 'moment';
import HelpPopup from './HelpPopup';
import help from '../common/help';
import { color } from 'react-native-reanimated';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const styles = StyleSheet.create({
  container: { width: '100%', paddingHorizontal: 20 },
  bar: {
    width: 15,
    marginTop: 5,
    backgroundColor: 'rgb(215,215,215)',
  },
  purpleBar: {
    backgroundColor: colors.lightishPurple,
  },
  aquaBar: {
    backgroundColor: colors.aquaMarineTwo,
  },
  greyBar: {
    height: 38,
    width: 10,
  },
  barGraphWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(230,233,244)',
    paddingHorizontal: 1,
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
  iconStyle: {
    width: 16,
    height: 16,
    marginLeft: 5,
  },
  title: { color: colors.blueGrey },
  contentsText: { color: colors.dark },
  wrapper: { flexDirection: 'row', alignItems: 'center' },
  monthText: {
    width: `${100 / 12}%`,
    fontSize: 10,
    color: colors.blueGrey,
    textAlign: 'center',
  },
  monthTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 13,
  },
  barWrapper: {
    width: `${100 / 12}%`,
    alignItems: 'center',
    justifyContent: 'flex-end',
},
  barTextOff: {
    fontSize: 12,
    color: colors.blueGrey,
    textAlign: 'center',
    marginHorizontal: -150,
  },
  barNumOff: { fontFamily: 'Roboto-Bold' },
  barTextOn: { fontSize: 12, color: colors.blackTwo },
  barNumOn: { fontFamily: 'Roboto-Bold' },
  assetsNumber: {
    color: colors.blueGrey,
    fontSize: 18,
    // fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    paddingTop: 18,
  },
  priceWrapper: {
    alignItems: 'flex-end',
  },
  titleText: { fontSize: 14, color: colors.blackTwo },
  headerTextWrapper: { alignItems: 'center', flex: 1 },
  smallText: { fontSize: 12 },
  labelView :{position:'absolute', 
  backgroundColor:'#f5f5f5', 
  zIndex:9, 
  bottom:100, 
  width:130, 
  padding:10, 
  borderRadius:10
},
Arrow:{
  position:'absolute', 
  transform: [{ rotate: "180deg" }],
  width: 0,
  height: 0,
  backgroundColor: "transparent",
  borderStyle: "solid",
  borderLeftWidth: 8,
  borderRightWidth: 8,
  borderBottomWidth: 12,
  borderLeftColor: "transparent",
  borderRightColor: "transparent",
  borderBottomColor:'#f5f5f5',
  bottom:-11, 
  }
});

const MonthChart = ({
  total,
  monthlyData,
  currencyRate,
  currencyCalc,
  currencySymbolBefore,
  currencySymbolAfter,
  currentCurrency,
  count,
  beta,
  volatility,
  sharpRatio,
  byTickers,
  comDividentVal,
}) => {
  if (!comDividentVal) return null;

 
  const [showHelp, setShowHelp] = useState(false);
  const [sumTicker, sumDividend] = useState(0);


  const currentMonth = parseInt(moment().format('M'));

  const [selectedMonth, setMonth] = useState(-1);
  const [cData, setCompData] = useState([]);
  const [positionLabel, setPosition] = useState({'left':-20});
  const [positionArrow, setArrow] = useState({'left':15});

  
const valueMax = comDividentVal?.reduce?.(
  (p, { value }) => Math.max(p, value),
  Number.MIN_SAFE_INTEGER,
  );
 const valueSum = comDividentVal?.reduce?.((p, { value }) => p + value, 0);
  const valueAvg = valueSum / comDividentVal?.length;
  const valueRatio = valueSum / total;


  console.log('dividendData');
  console.log(comDividentVal);
//Do functionality on click
const showLabels=(index,month, ticker)=>{
  if(index >=9)
  {
    setPosition({'left':-100})
    setArrow({'left':100})
  }
  else
  {
    setPosition({'left':-20})
    setArrow({'left':15})
  }
  setMonth(index)
  const sumVal=ticker?.reduce?.((p, { value }) => p + value, 0);
  sumDividend(sumVal);
 }
  return (
    <>
      <TouchableWithoutFeedback onPress={()=>{setMonth(-1)}}>
          <View style={styles.container}>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 60,
          }}
        >
          <View style={styles.headerTextWrapper}>
            <Text style={styles.titleText}>연간 배당금</Text>
            <Text style={styles.assetsNumber}>
              {!!currencySymbolBefore && (
                <Text style={styles.smallText}>{currencySymbolBefore}</Text>
              )}
              {currencyCalc(valueSum)}
              {!!currencySymbolAfter && (
                <Text style={styles.smallText}>{currencySymbolAfter}</Text>
              )}
            </Text>
          </View>
          <View style={styles.headerTextWrapper}>
            <Text style={styles.titleText}>연간 배당률</Text>
            <Text style={styles.assetsNumber}>
              {(valueRatio * 100).toFixed(2)}
              <Text style={styles.smallText}>%</Text>
            </Text>
          </View>
        </View>
        
        <View style={styles.barGraphWrapper}>
        
          {comDividentVal && comDividentVal?.map?.(({ month, value, ticker }, i) => {


           
            const res = Array.from(ticker.reduce(
              (m, {ticker, value}) => m.set(ticker, (m.get(ticker) || 0) + value), new Map
            ), ([ticker, value]) => ({ticker, value}));
            
            const calcValue = currencyCalc(value, 0);
            const [valueDisplay] = numberToKorean(
              `${calcValue}`.replace(',', ''),
            ).split(' ');
            console.log(value, currencyCalc(value, 0), valueDisplay);
            return (
              <View
                style={[
                  styles.barWrapper,
                ]}
                key={`bar_${i}`}
              >
                <TouchableOpacity onPress={()=>{showLabels(i, month, ticker)}}>
               
                {i == selectedMonth ?
                
                <View style={[styles.labelView,positionLabel]}>
                  <View style={[styles.Arrow,positionArrow]} />
                   {res.map(({ticker, dividend, value})=>{
                     let val=parseFloat(value);
                    
                     return(<View style={{flexDirection:'row', justifyContent:'space-between'}}>
                     <Text style={{fontSize:14,fontFamily: 'Roboto-Bold', fontWeight:'600', color:colors.blueGrey, marginRight:20}}>{ticker}</Text>
                     <Text style={{fontSize:14,fontFamily: 'Roboto-Bold',fontWeight:'600',color:colors.blueGrey,}}>
              {!!currencySymbolBefore && (
                <Text style={styles.smallText}>{currencySymbolBefore}</Text>
              )}
              {currencyCalc(val)}
              {!!currencySymbolAfter && (
                <Text style={styles.smallText}>{currencySymbolAfter}</Text>
              )}
            </Text>
                   </View>
                   )
                   })}

                   <View style={{borderTopWidth:1, borderTopColor:'#d4d6e0', marginTop:10, paddingTop:10,}}>
                      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize:14, fontFamily: 'Roboto-Bold', fontWeight:'600', color:colors.lightishPurple, marginRight:20}}>총</Text>
                        <Text style={{fontSize:14, fontFamily: 'Roboto-Bold', fontWeight:'600', color:colors.lightishPurple,}}>
                        {!!currencySymbolBefore && (
                            <Text style={styles.smallText}>{currencySymbolBefore}</Text>
                          )}
                          {currencyCalc(sumTicker)}
                          {!!currencySymbolAfter && (
                            <Text style={styles.smallText}>{currencySymbolAfter}</Text>
                          )}
                         </Text>
                      </View>
                  </View>
                   
                
                   
                </View>:null
            }
                {comDividentVal ? <View
                  style={[
                    styles.bar,
                    i == selectedMonth && styles.purpleBar,
                    { height: value? Math.round((value / valueMax || 1) * 70) :0},
                  ]}
                />:null}
                </TouchableOpacity>

              </View>
            );
          })}
        </View>
        
        <View style={styles.monthTextWrapper}>
          {comDividentVal && comDividentVal?.map?.(({ month }, i) => {
            return (
              <Text style={styles.monthText} key={`bar_${i}`}>
                {parseInt(month)}월
              </Text>
            );
          })}
        </View>

      </View>
      </TouchableWithoutFeedback>


      <View style={styles.contentsWrapper}>
        <View
          style={[
            styles.textWrapper,
            {
              paddingRight: 30,
              paddingBottom: 26,
            },
          ]}
        >
          <Text style={styles.title}>종목 수</Text>
          <Text style={styles.contentsText}>{count}</Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>베타</Text>
          <Text style={styles.contentsText}>{beta?.toFixed(2)}</Text>
        </View>
        <View
          style={[
            styles.textWrapper,
            {
              paddingRight: 30,
            },
          ]}
        >
          <View style={styles.wrapper}>
            <Text style={styles.title}>샤프 지수</Text>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setShowHelp(help.SharpeRatio)}
            >
              <Image source={assets.icon_question} style={styles.iconStyle} />
            </TouchableOpacity>
          </View>
          <Text style={styles.contentsText}>{sharpRatio?.toFixed(2)}</Text>
        </View>
        <View style={styles.textWrapper}>
          <View style={styles.wrapper}>
            <Text style={styles.title}>변동성</Text>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setShowHelp(help.Volatility)}
            >
              <Image source={assets.icon_question} style={styles.iconStyle} />
            </TouchableOpacity>
          </View>
          <Text style={styles.contentsText}>{volatility?.toFixed(2)}</Text>
        </View>

        <HelpPopup
          isVisible={!!showHelp}
          help={showHelp}
          onCancel={() => {
            setShowHelp(null);
          }}
        />
      </View>
    </>
  );
};

export default MonthChart;
