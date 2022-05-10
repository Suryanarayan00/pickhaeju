import React, { useEffect, useState, useRef } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import colors from '#common/colors';
import MonthChart from '#components/MonthChart';
import { useNavigation } from '@react-navigation/native';
import PortfolioIndustry from '#components/PortfolioIndustry';
import PortfolioStock from '#components/PortfolioStock';
import StatisticsCard from '#components/StatisticsCard';
import PortfolioRisk from '#components/PortfolioRisk';
import assets from '../../assets';
import Document from '#components/Document';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { CURRENCY_KRW, CURRENCY_USD, } from '../data/common/actions';
import { commaFormat,avoidNaN } from '../utils/utils';
import { priceHistory } from '../common/dataApi';
import { months } from 'moment';
import { getMystatistics } from '../common/usersApi';
import CustomPicker from '../components/CustomPicker/CustomPicker';
import { range } from 'lodash';
import Carousel from '#components/Carousel';
import { getDividend, getSectorList } from '../common/portfolioApi';
import moment from 'moment';
import { BlurView } from "@react-native-community/blur";
import PortfolioCard from '#components/PortfolioCard';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 25,
    overflow: 'visible',
  },
  assetsNumber: {
    color: colors.violetBlue,
    fontSize: 18,
    // fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    paddingTop: 18.5,
  },
  bottomLine: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.lightPeriwinkleThree,
    width: 222.5,
    paddingTop: 12,
  },
  whiteLine: {
    height: 5,
    backgroundColor: colors.whiteTwo,
    width: '100%',
    marginVertical: 30,
  },
  section: {
    paddingHorizontal: 20,
  },
  topButton: {
    backgroundColor: colors.blackTwo,
    width: 50,
    height: 50,
    borderRadius: 25,
    opacity: 0.75,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  pointCircle: { width: 9, height: 9, borderRadius: 4.5 },
  title: { fontSize: 18, color: colors.blackTwo },
  filterWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    backgroundColor: 'red',
  },
  arrowIcon: { width: 6, height: 4, marginLeft: 10 },
  filterText: { color: colors.cloudyBlue, fontSize: 14 },

  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  pageCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.lightPeriwinkle,
    marginHorizontal: 10,
  },
  pageCircleOn: {
    backgroundColor: colors.lightIndigo,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  fixCardArea: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  portfolioCardWrapper: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: '50%',
  },
 
});

const pickerItems = [
  { text: '전체유저', value: 'all' },
  { text: '나이대', value: 'age' },
  { text: '투자 성향', value: 'averageStocks' },
  { text: '투자 경험', value: 'experience' },
  { text: '투자 기간', value: 'reaction' },
];

const SCREENS = [
  {
    index: '0',
    title: '업계별',
  },
  {
    index: '1',
    title: '종목별',
  },];
const PortfolioAnalysis = ({ portfolioList }) => {
  const dispatch = useDispatch();  
  const navigation = useNavigation();
 
  const { currency, currentCurrency } = useSelector(
    (s) => s?.common?.currency,
    shallowEqual,
  );

  const [monthlyData, setMonthlyData] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(pickerItems[0].value);
  const [scoreData, setScoreData] = useState();
  const carousel = useRef();
  const [index, setIndex] = useState(0);
  const [sectorData, setSector] = useState([]);

  const { width: fullWidth } = Dimensions.get('window');
  const [dividendData, setDividend] = useState(null);
  
  const initialDate = moment().startOf('year');
const monthsData = Array.from({length: 12}, (e, i) => {
return {'month':moment(initialDate).add(i ,'months').format("MM"),value:0,ticker:[]};
})

const SectorList = async () =>{
  let sectorList = await getSectorList();
     setSector(sectorList);
    }
    
  useEffect(() => {
    SectorList();
    var monthChartData=monthsData;
    var dividendVal=0;
    if (portfolioList) {
      new Promise.all(
        portfolioList?.map?.(async ({ ticker, amount }) => {
           return await getDividend(ticker).then((res) => {
             return res?.map?.(({ date, value },i) => 
          {
          if(i==0)
          {
            dividendVal= value;
          }
            return (
              {
                date: date,
                value: dividendVal * amount,
                ticker:ticker,
                dividend: dividendVal
              }
            )
          }
          );
          });
        }),
      ).then((datas) => {
        const mergedDatas = datas;
        const result = mergedDatas.flat();
        const mergeData=result?.reduce?.((p, months) => {
          var checkDate=monthChartData?.findIndex(e => e.month == months?.date.substring(5, 7));
          if(checkDate!=-1)
          {
            monthChartData[checkDate].value=monthChartData[checkDate].value + months?.value;
            monthChartData[checkDate].ticker.push({'ticker':months?.ticker,'value':months?.value,'dividend':months?.dividend});
          }
          p=monthChartData;
          return p;
        }, [])
        setDividend(mergeData);
      });
    }
  }, [portfolioList]);

  useEffect(() => {
    console.log('selectedFilter');
    console.log(selectedFilter);
    getMystatistics(selectedFilter)
      .then((res) => {
        if (res.data.status === 400) {
          setScoreData([]);
        } else {
          console.log('averageStocksData', res.data.result);

          setScoreData(res.data.result);
        }
      })
      .catch((err) => {
        console.log('ERROR,', err);
      });
  }, [selectedFilter]);
  

  const currencySymbolBefore = currentCurrency == CURRENCY_KRW ? '' : '$';
  const currencySymbolAfter = currentCurrency == CURRENCY_KRW ? '원' : '';

  const currencyCalc = (v, d = 'N/A') => {
    if ((!v || v === 'N/A') && v !== 0) return d;
    if (currentCurrency == CURRENCY_KRW) {
      const krw = currency?.rates?.KRW;
      return commaFormat(Math.round(v * krw));
    } else if (currentCurrency == CURRENCY_USD) {
      return commaFormat(Math.round(v * 100) / 100);
    } else {
      return commaFormat(Math.round(v * 100) / 100);
    }
    return v;
  };

  const renderItem=(item)=>{
    if(item.index=='0')
    {
      return (<View style={styles.section}>
        <Text style={styles.title}>업계별</Text>
                 <PortfolioIndustry
          byCategories={byCategories}
          currencyCalc={currencyCalc}
          currencySymbolBefore={currencySymbolBefore}
          currencySymbolAfter={currencySymbolAfter}
          sectorData={sectorData}
        />
      </View>)
    }
    else
    {
      return( 
        <View style={styles.section}>
          <Text style={styles.title}>종목별</Text>
          <PortfolioStock
            byTickers={byTickers}
            currencyCalc={currencyCalc}
            currencySymbolBefore={currencySymbolBefore}
            currencySymbolAfter={currencySymbolAfter}
          />
        </View>)
    }

  }



  // 총액, 업계별, 종목별,
  const { total, byCategories, byTickers } = (Array.isArray(portfolioList)
    ? portfolioList
    : []
  )?.reduce?.(
    (
      { total, byCategories, byTickers },
      { general: { industry_category: category }, ticker, amount, price },
      a,
    ) => {
      return {
        total: (total || 0) + price * amount,
        byCategories: {
          ...byCategories,
          [category]: (byCategories[category] || 0) + price * amount,
        },
        byTickers: {
          ...byTickers,
          [ticker]: (byTickers[ticker] || 0) + price * amount,
        },
      };
    },
      { total: 0, byCategories: {}, byTickers: {} },
  );


  //For card Value 

  const { lastTotal, currentTotal, pastTotal, totalVal, tickers } = (
    Array.isArray(portfolioList) ? portfolioList : []
  )?.reduce?.((p, portfolio, a) => {
    const {
      general: { ticker = '', current = 0, last_price: last = 0 } = {},
      amount = 0,
      price = 0,
    } = portfolio || {};
    const gainLoss = current * amount - price * amount;
    return {
      tickers: [...(p?.tickers || []), ticker],
      lastTotal: (p?.lastTotal || 0) + last * amount,
      currentTotal: (p?.currentTotal || 0) + current * amount,
      pastTotal: (p?.pastTotal || 0) + price * amount,
      totalVal: (p?.totalVal || 0) + current * amount,
    };
  }, {});


   console.log('portfolioList Val');
   console.log(scoreData);

 if (!portfolioList || !Array.isArray(portfolioList || !dividendData)) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: 300,
        }}
      >
        <Text>등록된 종목이 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container]}>
      
      {/* <View
        style={{
          alignItems: 'center',
        }}
      >
      
        <StatisticsCard
          total={currencyCalc(total)}
          currencySymbolBefore={currencySymbolBefore}
          currencySymbolAfter={currencySymbolAfter}
          totalInNum={total}
        />
      </View> */}

        <ScrollView
        // ref={scrollRef}
        contentContainerStyle={{
          alignItems: 'center',
          paddingVertical: 0,
        }}
      >
         <View style={[styles.fixCardArea,{marginBottom:20}]}>
          <View style={styles.portfolioCardWrapper}>
            <PortfolioCard
              title="일간평가손익 "
              icon={assets.icon_pf_eval}
              textColor={
                currentTotal - lastTotal > 0
                  ? colors.pastelRed
                  : currentTotal - lastTotal <= 0
                  ? colors.softBlue
                  : colors.dark
              }
            >
              {!!currencySymbolBefore && currencySymbolBefore}
              {currencyCalc(currentTotal - lastTotal)}
              {isNaN(currentTotal - lastTotal)
                ? ''
                : !!currencySymbolAfter && currencySymbolAfter}
            </PortfolioCard>
          </View>
          <View style={styles.portfolioCardWrapper}>
            <PortfolioCard
              title="일간평가손익률 "
              icon={assets.icon_pf_percent}
              textColor={
                currentTotal / lastTotal - 1 > 0
                  ? colors.pastelRed
                  : currentTotal / lastTotal - 1 <= 0
                  ? colors.softBlue
                  : colors.dark
              }
            >
              {avoidNaN(
                (currentTotal / lastTotal - 1) * 100,
                (v) => `${v.toFixed(2)}%`,
                '-',
              )}
            </PortfolioCard>
          </View>

          <View style={styles.portfolioCardWrapper}>
            <PortfolioCard title="총 가치" icon={assets.icon_pf_value}>
              {!!currencySymbolBefore && (
                <Text style={[portfolioList?.length> 0 ? styles.normalText:styles.normalVal]}>{currencySymbolBefore}</Text>
              )}

              <Text style={[portfolioList?.length> 0 ? styles.normalText:styles.normalVal]}>
                {currencyCalc(totalVal)}
              </Text>
              {!!currencySymbolAfter && (
                <Text style={[portfolioList?.length> 0 ? styles.normalText:styles.normalVal]}>
                  {isNaN(totalVal) ? '' : currencySymbolAfter}
                </Text>
              )}
            </PortfolioCard>
          </View>
          <View style={styles.portfolioCardWrapper}>
            <PortfolioCard
              title="누적평가손익 "
              icon={assets.icon_pf_profit}
              textColor={
                currentTotal - pastTotal > 0
                  ? colors.pastelRed
                  : currentTotal - pastTotal <= 0
                  ? colors.softBlue
                  : colors.dark
              }
            >
              {!!currencySymbolBefore && currencySymbolBefore}
              {currencyCalc(currentTotal - pastTotal)}
              {isNaN(currentTotal - pastTotal)
                ? ''
                : !!currencySymbolAfter && currencySymbolAfter}
            </PortfolioCard>
          </View>
        </View>
      </ScrollView>
        
        {(portfolioList.length>0)?
        <View style={{ backgroundColor: colors.white }}>
       
                <Carousel
                ref={carousel}
                data={SCREENS}
                containerCustomStyle={{ flex: 1 }}
                renderItem={renderItem}
                sliderWidth={fullWidth}
                itemWidth={fullWidth}
                inactiveSlideScale={1}
                onSnapToItem={setIndex}
              />
            {/* Pagination 삽입용 자리 */}
            <View style={styles.pagination}>
                {range(0, SCREENS?.length).map?.((v) => (
                  <View
                    key={`${v}`}
                    style={[styles.pageCircle, index === v && styles.pageCircleOn]}
                  />
                ))}
              </View>
                
          <View style={styles.whiteLine} />
          <View>
         
              <MonthChart
              total={total}
              portfolioList={portfolioList}
              monthlyData={monthlyData}
              currencyRate={currency?.rates?.KRW}
              currentCurrency={currentCurrency}
              currencyCalc={currencyCalc}
              currencySymbolBefore={currencySymbolBefore}
              currencySymbolAfter={currencySymbolAfter}
               count={scoreData?.myPortfolioCount}
              beta={scoreData?.myBeta?.[1]}
              volatility={scoreData?.myVolatility}
              sharpRatio={scoreData?.mysharpRatio}

              byTickers={byTickers}
              comDividentVal={dividendData}
            />
          </View>
          <View
            style={[
              styles.section,
              {
                flexDirection: 'row',
                marginTop: 30,
                alignItems: 'center',
              },
            ]}
          >
            <Text style={styles.title}>타 유저와 비교 분석</Text>
            <CustomPicker
              style={{ justifyContent: 'flex-end' }}
              width={130}
              value={selectedFilter}
              onSelect={(value) => {
                setSelectedFilter(value);
              }}
              data={pickerItems}
            />
          </View>
          <View style={[styles.section, { marginTop: 10, marginBottom: 52 }]}>
            {scoreData ? (
               <PortfolioRisk
                count={
                  ((scoreData.myStat.stockWeight / scoreData.highestStat.stockWeight) * 100) || 0
                }
                beta={((scoreData.myStat.profit / scoreData.highestStat.profit) * 100) || 0}
                portfolioSize={
                  ((scoreData.myStat.portfolioSize /
                    scoreData.highestStat.portfolioSize) *
                  100) || 0
                }
                volatility={
                  ((scoreData.myStat.portfolioSize /
                    scoreData.highestStat.portfolioSize) *
                  100) || 0
                }
                sharpRatio={
                  ((scoreData.myStat.sharpRatio /
                    scoreData.highestStat.sharpRatio) *
                  100) || 0
                }
                score={scoreData.score}
              />
            ) : (
              <ActivityIndicator />
            )}
          </View>
        </View>
        :
        <View style={{ backgroundColor: colors.white, position:'relative',}}>
            <Image
            source={assets.blur_image}
            style={{width:100+'%', height:1050}}
            resizeMode="contain"/>
            <View style={{position:'absolute', top:200, width:76+'%', marginLeft:12+'%'}}>
                <Text style={{fontSize:18, color:'#000', textAlign:'center',fontWeight: 'bold'}}>상세 분석을 위해{"\n"} 포트폴리오를 추가해 주세요.</Text>
               
                <TouchableOpacity
                style={styles.addButtonWrapper}
                onPress={() => {
                  navigation.navigate('PortfolioSearch');
                }}
                activeOpacity={0.85}
              >
                <Text style={{color:colors.lightishPurple, fontSize:18,  textAlign:'center', marginTop:30, fontWeight: 'bold',textDecorationLine: 'underline'}}>포트폴리오 추가하기</Text>
              </TouchableOpacity>
            </View>
        </View>

        }
        
    </View>
  );
};

export default PortfolioAnalysis;
