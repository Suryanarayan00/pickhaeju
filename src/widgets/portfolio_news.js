import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '#common/colors';
import PortfolioCard from '#components/PortfolioCard';
import StockList from '#components/StockList';
import assets from '../../assets';
import { useNavigation } from '@react-navigation/native';
import NewsPickSection from '#components/NewsPickSection';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { updatePortfolio } from '../common/portfolioApi';
import { CURRENCY_KRW, CURRENCY_USD } from '../data/common/actions';
import { avoidNaN, commaFormat } from '../utils/utils';
import { toastShow } from '#data/toast/ToastAction';
//import SimpleToast from '#modules/SimpleToast';
const { width: wWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, zIndex: 25, overflow: 'visible' },
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
  stockHeaderRight: {

    flexDirection: 'row',
    
    justifyContent: 'center',
    
    alignItems: 'center',
    
    minWidth: 100,
    
    maxWidth: 100,
    
    justifyContent: 'flex-end',
    
    paddingRight: 3,
    
    },
  headerText: {
    fontSize: 13,
    color: colors.blueGrey,
    marginRight: 5,
  },
  headerTextLast: {
    fontSize: 13,
    color: colors.blueGrey,
  },
  newsWrapper: {
    borderBottomColor: colors.paleGrey,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  buttonWrapper: {
    maxWidth: 110,
    width: '100%',
    height: 35,
    borderRadius: 17.5,
    borderColor: colors.cloudyBlue,
    borderWidth: 1,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 14,
    letterSpacing: -0.35,
    color: colors.blueyGrey,
    paddingLeft: 6,
  },
  pickFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 14,
  },
  moreButton: {
    fontSize: 12,
    color: colors.blueGrey,
    letterSpacing: -0.3,
  },
  stockHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  arrowDownIcon: {
    width: 5,
    height: 4,
  },
  normalText: { color: colors.dark },
  normalVal: { color: colors.dark },

  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonIcon: { width: 9, height: 10 },
  emptyContent: { height: 200, alignItems: 'center', justifyContent: 'center' },
  emptyText: {
    fontSize: 14,
    letterSpacing: -0.34,
    color: colors.cloudyBlueTwo,
    marginTop: 23,
  },
  title: { fontSize: 18, color: colors.dark },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(230,233,244)',
    alignItems: 'center',
    height: 40,
  },
  contentContainer: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  stockIcon: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: '#eee',
  },
  stockWrapper: {
    flexDirection: 'row',
    minWidth: 120,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 60,
    borderBottomColor: colors.paleGrey,
    borderBottomWidth: 1,
  },
  nameWrapper: { paddingLeft: 10, paddingRight: 10, maxWidth: wWidth/4 },
  tickerName: { color: colors.dark, maxWidth: 130 },
  engName: { color: colors.blueyGreyTwo },
  stockContainer: {
    flexDirection: 'row',
    marginLeft: 0,
    width: '100%',
  },
  stockTitleBox: {
    height: 40,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(230,233,244)',
  },
  stockListWrapper: {
    borderBottomColor: colors.paleGrey,
    borderBottomWidth: 1,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  addButton: {
    width: 30,
    height: 30,
    backgroundColor: colors.lightIndigo,
    borderRadius: 15,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    width: 13,
    height: 13,
  },
  addText: { fontSize: 14, color: colors.blueGrey },
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
const data = [
  { id: 'dfda', title: 'dfda' },
  { id: 'dfds', title: 'dfds' },
  { id: 'dfdd', title: 'dfdd' },
  { id: 'dfdr', title: 'dfdr' },
];

 const Columns = [
  { width: 80, name: '현재가', field: '', value: (v) => v?.general?.current },
  {
    width: 100,
    name: '일일변동',
    field: '',
    value: (v) =>
    avoidNaN(
      Math.abs(((v?.general?.current - v?.general?.last_price) / v?.general?.last_price) * 100),
      (v) => `${v.toFixed(2)}`,
      0,
    )
    // avoidNaN(v?.general?.current - v?.general?.last_price, undefined, 0),
  },
  {
    width: 100,
    name: '평가손익',
    field: '',
    value: (v) =>
   // avoidNaN(v?.general?.current * v?.amount - v?.price * v?.amount),
    {
      var incomeRatio = (v?.general?.current * v?.amount) / (v?.price * v?.amount) - 1;
     return avoidNaN(
        Math.abs(incomeRatio * 100),
        (v) => v.toFixed(2),
        0,
      )
     }
  },

  { width: 100, name: '매수단가', field: '', value: (v) => v?.price },
  { width: 90, name: '주식 수', field: '', value: (v) => v?.amount },
  {
    width: 100,
    name: '현재가치',
    field: '',
    value: (v) => avoidNaN(v?.general?.current * v?.price, undefined, 0),
  },
];

const PortfolioNews = (props) => {
  const { portfolioList, scrollTo, refresh } = props;
  const navigation = useNavigation();
  const { principal } = useSelector((s) => s.auth, shallowEqual);
  const scrollRef = useRef();
  const newsPickSectionY = useRef();
  const newsY = useRef();
  const pickY = useRef();
  const dispatch = useDispatch();
  const statics = portfolioList;

  const [sortField, setSortField] = useState();
  const [sortDesc, setSortDesc] = useState(false);

  const { currency, currentCurrency } =
    useSelector((s) => s?.common?.currency, shallowEqual) || {};
  const currencySymbolBefore = currentCurrency == CURRENCY_KRW ? '' : '$';
  const currencySymbolAfter = currentCurrency == CURRENCY_KRW ? '원' : '';
  console.log('currentCurrency', currentCurrency, currency);
  const currencyCalc = (v) => {
    console.log('currency calc');
    console.log(v);
    if ((!v || v === 'N/A') && v !== 0) return '-';
    if (currentCurrency == CURRENCY_KRW) {
      const krw = currency?.rates?.KRW;
      const calculated = Math.round(v * krw);
      return isNaN(calculated)
        ? '-'
        : commaFormat(calculated, undefined, undefined);
    } else if (currentCurrency == CURRENCY_USD) {
      // const usd = currency?.rates?.KRW;
      const calculated = Math.round(v * 100) / 100;
      return isNaN(calculated)
        ? '-'
        : commaFormat(calculated, undefined, undefined, 2);
    } else {
      const calculated = Math.round(v * 100) / 100;
      return isNaN(calculated)
        ? '-'
        : commaFormat(calculated, undefined, undefined, 2);
    }
    return v;
  };

  const { lastTotal, currentTotal, pastTotal, total, tickers } = (
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
      total: (p?.total || 0) + current * amount,
    };
  }, {});

  const sort = (t1, t2) => {

    if (typeof sortField === 'undefined') return 0;
    if (sortField === 'name') {
      const name1 = t1?.general?.ticker || t1?.general?.name || 'ㅋ';
      const name2 = t2?.general?.ticker || t2?.general?.name || 'ㅋ';
      return name1.localeCompare(name2) * (sortDesc ? -1 : 1);
    } else {
      const field = Columns.find(({ name }) => name === sortField);
      if (!field) return 0;

      console.log('--------Field Value---');
     
      return (field.value(t1) - field.value(t2)) * (sortDesc ? -1 : 1);
    }
  };

  const remove = async (ticker) => {
    let portId=portfolioList[0]?.portId;
   portfolioList.splice(portfolioList.findIndex(a => a.ticker === ticker) , 1)
    const updateArray =  portfolioList?.reduce?.((p, portfolio) => {
      const {
        ticker, amount, price
      } = portfolio || {};
      p.push({ ticker,
        amount,
        price})
      return p ;  
    },[])
     await updatePortfolio(updateArray,portId);
    dispatch(toastShow('해당 종목이 삭제되었습니다.'));
    refresh();
  };
console.log('Portfolio Tickers');
console.log(tickers);
  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{
          alignItems: 'center',
          paddingVertical: 10,
        }}
      >
        <View style={styles.fixCardArea}>
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
                {currencyCalc(total)}
              </Text>
              {!!currencySymbolAfter && (
                <Text style={[portfolioList?.length> 0 ? styles.normalText:styles.normalVal]}>
                  {isNaN(total) ? '' : currencySymbolAfter}
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

       {/* 뉴스 / pick 버튼 */}
      <View style={styles.buttonBox}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.buttonWrapper}
          onPress={() => {
            scrollTo &&
              scrollTo({ y: newsY?.current + newsPickSectionY?.current });
          }}
        >
          <Image source={assets.button_icon_news} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>뉴스보기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.buttonWrapper}
          onPress={() => {
            scrollTo &&
              scrollTo({ y: pickY?.current + newsPickSectionY?.current });
          }}
        >
          <Image source={assets.button_icon_pick} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>PICK보기</Text>
        </TouchableOpacity>
      </View>

      {/* 포트폴리오 목록 */}
      <View style={styles.stockContainer}>
        <View style={{ maxWidth: wWidth / 2,  }}>
          <View style={styles.stockTitleBox}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.stockHeader, { minWidth: 120, paddingRight: 10, paddingLeft: 20, }]}
              onPress={() => {
                if (sortField === 'name') setSortDesc((sortDesc) => !sortDesc);
                else setSortField('name');
              }}
            >
              <Text
                style={[
                  styles.headerText,
                  sortField === 'name' && { color: colors.purple },
                ]}
              >
                종목
              </Text>
              <Image
                source={assets.arrow_down_gray}
                style={[
                  styles.arrowDownIcon,
                  sortField === 'name' && {
                    tintColor: colors.purple,
                    transform: [{ rotate: sortDesc ? '180deg' : '0deg' }],
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
          {Array.isArray(portfolioList) &&
            portfolioList?.sort(sort).map?.(({ general, ticker }, i) => (
              <TouchableOpacity
                key={i}
                activeOpacity={0.85}
                style={[styles.stockWrapper, { minWidth: 120, paddingRight: 10, paddingLeft: 20, }]}
                onPress={() => {
                  navigation.navigate('PortfolioDetails', {
                    general: general,
                  });
                }}
              >
                 <Image
                  source={{
                    uri:
                      general?.logo ||
                      `https://storage.googleapis.com/pickhaeju-static/logo/${general?.ticker}.png`,
                  }}
                  style={styles.stockIcon}
                />
                <View style={styles.nameWrapper}>
                  <Text style={styles.tickerName} numberOfLines={1}>
                    {/* {general?.nameKo|| general?.name} */}
                    {(general?.nameKo.length > 7 ? general?.nameKo.slice(0,general?.nameKo.length/2)+"..." : general?.nameKo) || (general?.name.length > 7 ? general?.name.slice(0, general?.name.length/2)+"..." : general?.name)}
                  </Text>
                  <Text style={styles.engName}>{ticker}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
        <ScrollView
          style={styles.stockListHeader}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.subjectHeader}>
            {Columns.map?.(({ width, name }, index) => {
              if (!name) return <View style={styles.headerBlank} />;
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.85}
                  style={[styles.stockHeaderRight, { width }]}
                  onPress={() => {
                    if (sortField === name)
                      setSortDesc((sortDesc) => !sortDesc);
                    else setSortField(name);
                  }}
                >
                  <Text
                    style={[
                      styles.headerText,
                      sortField === name && { color: colors.purple },
                    ]}
                  >
                    {name}
                  </Text>
                  <Image
                    source={assets.arrow_down_gray}
                    style={[
                      styles.arrowDownIcon,
                      sortField === name && {
                        tintColor: colors.purple,
                        transform: [{ rotate: sortDesc ? '180deg' : '0deg' }],
                      },
                    ]}
                  />
                </TouchableOpacity>
              );
            })}
            <Text style={[styles.headerTextLast, { width: 60, textAlign: 'right', paddingRight: 20, }]}>삭제</Text>
          </View>
           {Array.isArray(portfolioList) &&
            portfolioList?.sort(sort).map?.((portfolio, index) => (
              <View key={index} style={styles.stockListWrapper}>
                  <StockList
                  portfolio={portfolio}
                  onPress={() => {
                    navigation.navigate('PortfolioDetails', {
                      general: portfolio?.general,
                    });
                  }}
                />
                <TouchableOpacity
                  style={styles.trashIconWrapper}
                  activeOpacity={0.7}
                  onPress={() => remove(portfolio?.ticker)}
                >
                  <Image source={assets.icon_trash} style={styles.trashIcon} />
                </TouchableOpacity>
              </View>
            ))}
        </ScrollView>
      </View>

      {/* 종목추가버튼 */}
      {Array.isArray(portfolioList) && portfolioList?.length > 0 && (
        <TouchableOpacity
          style={styles.addButtonWrapper}
          onPress={() => {
            navigation.navigate('PortfolioSearch');
          }}
          activeOpacity={0.85}
        >
          <View style={styles.addButton}>
            <Image source={assets.icon_plus_sm} style={styles.addIcon} />
          </View>
          <Text style={styles.addText}>종목추가</Text>
        </TouchableOpacity>
      )}

      {/*empty contents*/}
      {(portfolioList === null ||
        (Array.isArray(portfolioList) && portfolioList?.length == 0)) && (
        <TouchableOpacity
          style={styles.emptyContent}
          onPress={() => {
            navigation.navigate('PortfolioSearch');
          }}
        >
          <Image source={assets.icon_add} style={{ width: 48, height: 48 }} />
          <Text style={styles.emptyText}>종목을 추가해 주세요.</Text>
        </TouchableOpacity>
      )}
      <View
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;
          newsPickSectionY.current = layout.y;
        }}
      >
        <NewsPickSection newsY={newsY} pickY={pickY} tickers={tickers} />
      </View>
    </View>
  );
};

export default PortfolioNews;
