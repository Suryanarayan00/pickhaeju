import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import colors from '#common/colors';
import assets from '../../assets';
import Modal from '#components/Modal';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Carousel from '#components/Carousel';
import { getRecommendStandard } from '../common/recommendApi';
import { CURRENCY_KRW, CURRENCY_USD } from '../data/common/actions';
import { commaFormat, numberToKorean } from '../utils/utils';
import OptimizeRecomPopUp from './OptimizeRecomPopUp';
import Gauge from './Gauge';
import AddStockPopUp from './AddStockPopUp';
import DefaultButton from '#components/Button/DefaultButton';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingBottom: 17,
  },
  header: {
    height: 50,
    backgroundColor: colors.purply,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 19,
  },
  title: {
    fontSize: 20,
    // fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    color: colors.white,
  },
  priceBox: { flexDirection: 'row', justifyContent: 'center' },
  priceContents: { fontSize: 19, fontFamily: 'Roboto-Bold'},
  button: {
    width: 60,
    height: 60,
  },
  headerClose: { width: 12, height: 12 },
  contentsWrapper: { alignItems: 'center' },
  todayText: {
    fontSize: 18,
    color: colors.blueGrey,
    marginTop: 29,
    textAlign: 'center',
  },
  stockImage: {
    width: 80,
    height: 60,
    marginVertical: 20,
    alignSelf: 'center',
  },
  upTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 54,
  },
  arrowIcon: {
    width: 8,
    height: 5,
    marginRight: 3,
  },

  amountSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  amountItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountTitle: { color: colors.blueGrey, fontSize: 12 },
  amountContents: {
    marginLeft: 10,
    // fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    fontSize: 11,
  },
  barGraphSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 19,
  },
  barGraph: {
    flex: 1,
    marginHorizontal: 16,
  },
  graphInnerRound: {
    backgroundColor: colors.aqua,
    width: 6,
    height: 6,
    borderRadius: 3,
    shadowColor: colors.aqua,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
  },
  barGraphItems: { alignItems: 'center' },
  barGraphTitle: { fontSize: 9, color: colors.blueGrey },
  barGraphContents: {
    fontSize: 11,
    color: colors.dark,
    // fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    marginTop: 2,
  },
  companyInfoText: {
    fontSize: 11,
    lineHeight: -0.26,
    color: colors.dark,
    overflow: 'hidden',
    marginTop: 33,
  },
  detailButtonText: {
    textDecorationLine: 'underline',
    marginTop: 12,
    fontSize: 12,
    color: colors.blueGrey,
  },
  questionFooter: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  questionText: {
    fontSize: 14,
    letterSpacing: -0.34,
    color: colors.blueGrey,
  },
  goButton: {
    backgroundColor: colors.purply,
    width: 37,
    height: 37,
    borderRadius: 18.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goText: {
    fontSize: 14,
    letterSpacing: -0.35,
    color: colors.white,
  },
  iconButton: { width: 38, height: 38 },
  subText: { color: colors.softBlue, paddingLeft: 4 },
  subTextUp: {
    color: colors.watermelon,
    paddingLeft: 4,
  },
  addButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 0,
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
  buttonFrame: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
});

const SCREENS = [
  {
    title: '포트폴리오',
    contents: '한눈에 볼 수 있는 포트폴리오 & 맞춤형 분석',
    image: assets.img_onboard01,
  },
  {
    title: '관심목록',
    contents: '관심 종목에 대한 업데이트를 실시간으로 확인',
    image: assets.img_onboard02,
  },
  {
    title: 'PICK',
    contents: '투자 아이디어에 대한 다양한 의견',
    image: assets.img_onboard03,
  },
  {
    title: '종목 추천',
    contents: '매일매일 AI가 해주는 해외 주식 종목 추천',
    image: assets.img_onboard04,
  },
  {
    title: '실시간 정보',
    contents: 'AI가 읽어주는 모든 종목의 차트 분석까지',
    image: assets.img_onboard05,
  },
];

const RecommendPopUp = ({ isVisible, onCancel }) => {
  const navigation = useNavigation();
  const userInfo = useSelector((state) => state.auth.principal?.userInfo);
  const [index, setIndex] = useState(0);
  const carousel = useRef();
  const [recommends, setRecommends] = useState([]);
  const [isDetail, setIsDetail] = useState(false);
  const [isShowStockPopup, setIsShowStockPopup] = useState();
  const { currency, currentCurrency } = useSelector((s) => s?.common?.currency);
  const currencySymbolBefore = currentCurrency == CURRENCY_KRW ? '' : '$';
  const currencySymbolAfter = currentCurrency == CURRENCY_KRW ? '원' : '';

  useEffect(() => {
    getRecommendStandard().then((data) => {
      console.log('getRecommendStandard', data);
      setRecommends(data.result.filter((d) => d));
    });
  }, []);

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

  const currencyCalcNumber = (v) => {
    if ((!v || v === 'N/A') && v !== 0) return 'N/A';
    if (currentCurrency == CURRENCY_KRW) {
      const krw = currency?.rates?.KRW;
      return Math.round(v * (1 * krw));
    } else if (currentCurrency == CURRENCY_USD) {
      return Math.round(v * 100) / 100;
    }
    return v;
  };

  return (
    <Modal
      isVisible={isVisible}
      onCancel={onCancel}
      containerStyle={{
        backgroundColor: 'transparent',
        width: 420,
        justifyContent: 'center',
      }}
      contentsContainer={{
        alignItems: 'center',
      }}
    >
      <Carousel
        ref={carousel}
        data={recommends}
        inactiveSlideScale={10}
        onSnapToItem={setIndex}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={300}
        layout={'stack'}
        scrollEnabled={!isDetail}
        firstItem={Platform.OS === 'ios' ? 0 : recommends.length - 1}
        layoutCardOffset={10}
        renderItem={({ item }) => {
          const current = item?.current;
          const last = item?.last_price;
          const isUp = current > last;
          if (isDetail) {
            return (
              <OptimizeRecomPopUp
                onCancel={() => setIsDetail(false)}
                data={item}
              />
            );
          } else {
            const gaugeValue =
              item?.fiftytwo_week_low &&
              item?.fiftytwo_week_high &&
              item?.current
                ? (item?.current - item?.fiftytwo_week_low) /
                  (item?.fiftytwo_week_high - item?.fiftytwo_week_low)
                : null;
            return (
              <View style={styles.container}>
                <View style={styles.header}>
                  <View />
                  <Text style={styles.title}>{item.nameKo || item.name}</Text>
                  <TouchableOpacity activeOpacity={0.85} onPress={onCancel}>
                    <Image
                      source={assets.icon_close}
                      style={styles.headerClose}
                    />
                  </TouchableOpacity>
                </View>

                <Text style={styles.todayText}>
                  {userInfo?.name}님의{'\n'}포트폴리오 맞춤형 추천 종목
                </Text>
                <Image
                  source={{
                    uri: item.logo,
                  }}
                  style={styles.stockImage}
                />
                <View style={styles.priceBox}>
                  <Text style={[styles.priceContents, { color: colors.dark }]}>
                    {currencySymbolBefore && (
                      <Text style={styles.smallText}>
                        {currencySymbolBefore}
                      </Text>
                    )}
                    {currencyCalc(item.current)}
                    {currencySymbolAfter && (
                      <Text style={styles.smallText}>
                        {currencySymbolAfter}
                      </Text>
                    )}
                  </Text>
                  <View style={styles.upTextWrapper}>
                  

                    <View>
                    <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                    <Image
                      source={
                        item?.current - item?.last_price > 0
                          ? assets.arr_up_red
                          : assets.arrow_down_blue
                      }
                      style={styles.arrowIcon}
                      resizeMode="contain"
                    />
                      <Text
                        style={[
                          styles.priceContents,
                          {
                            color:
                              item?.current - item?.last_price > 0
                                ? colors.pastelRed
                                : colors.softBlue,
                          },
                        ]}
                      >
                        {currencySymbolBefore && (
                          <Text style={styles.smallText}>
                            {currencySymbolBefore}
                          </Text>
                        )}
                        {currencyCalc(item?.current - item?.last_price)}
                        {currencySymbolAfter && (
                          <Text style={styles.smallText}>
                            {currencySymbolAfter}
                          </Text>
                        )}
                      </Text>
                      </View>
                      <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                        <Image
                        source={
                          item?.current - item?.last_price > 0
                            ? assets.arr_up_red
                            : assets.arrow_down_blue
                        }
                        style={styles.arrowIcon}
                        resizeMode="contain"
                          />
                          <Text style={[styles.subText, isUp && styles.subTextUp]}>
                            {Math.abs(((current - last) / last) * 100).toFixed(2)}
                            %
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                
                <View style={{ marginHorizontal: 40 }}>
                  <View style={styles.amountSection}>
                    <View style={styles.amountItems}>
                      <Text style={styles.amountTitle}>시가총액</Text>
                      <Text style={styles.amountContents}>
                        {item?.marketcap === 'N/A'
                          ? 'N/A'
                          : currencySymbolBefore +
                            numberToKorean(
                              currencyCalcNumber(item?.marketcap),
                            )?.split(' ')?.[0] +
                            currencySymbolAfter}
                      </Text>
                    </View>
                    <View style={styles.amountItems}>
                      <Text style={styles.amountTitle}>PER</Text>
                      <Text style={[styles.amountContents, { marginLeft: 10 }]}>
                        {commaFormat(item?.per, undefined, undefined, 1)}
                        <Text>배</Text>
                      </Text>
                    </View>
                  </View>
                 
                  <View style={styles.barGraphSection}>
                    <View style={styles.barGraphItems}>
                      <Text style={styles.barGraphTitle}>52주 최저가</Text>
                      <Text style={styles.barGraphContents}>
                        {currencyCalc(item?.fiftytwo_week_low)}
                        <Text>원</Text>
                      </Text>
                    </View>
                    <View style={styles.barGraph}>
                      <Gauge value={gaugeValue} />
                    </View>
                    <View style={styles.barGraphItems}>
                      <Text style={styles.barGraphTitle}>52주 최고가</Text>
                      <Text style={styles.barGraphContents}>
                        {currencyCalc(item?.fiftytwo_week_high)}
                        <Text>원</Text>
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{color:colors.aquaMarineTwo}}>현재 XX명이 보는 중</Text>
                  </View>
                  
                  <Text
                    numberOfLines={2}
                    ellipsizeMode={'tail'}
                    style={styles.companyInfoText}
                  >
                    {item.descriptionKo || item.long_description}
                  </Text>
                   <View style={{
                     flexDirection:'row',
                     justifyContent:'space-between'
                  }}>
                    <TouchableOpacity
                      style={styles.addButtonWrapper}
                      onPress={() => {
                        setIsShowStockPopup(true);
                      }}
                      activeOpacity={0.85}
                    >
                      <View style={styles.addButton}>
                        <Image source={assets.icon_plus_sm} style={styles.addIcon} />
                      </View>
                      <Text style={styles.addText}>종목추가</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => {
                        console.log('general', item);
                        navigation.navigate('PortfolioDetails', {
                          general: item,
                        });
                        onCancel();
                      }}
                    >
                      <Text style={styles.detailButtonText}>
                        기업정보 더보기
                      </Text>
                    </TouchableOpacity>  
                    
                  </View>           

                
                  {/*질문 등록이 안되었을 때의 컨텐츠*/}
                  {/*<TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => {
                    navigation.navigate('PortfolioDetails');
                  }}
                >
                  <Text style={styles.detailButtonText}>기업정보 더보기</Text>
                </TouchableOpacity>
                <View style={styles.questionFooter}>
                  <Text style={styles.questionText}>
                    고도화된 AI의 추천을 원하시면{'\n'}추가 질문에 답해주세요.
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.goButton}
                    onPress={() => {
                      navigation.navigate('RecommendReason');
                    }}
                  >
                    <Text style={styles.goText}>GO</Text>
                  </TouchableOpacity>
                </View>*/}
                </View>
                <View
                  style={[
                    styles.buttonFrame,
                    // { paddingBottom: inset.bottom  },
                  ]}
                >
          <DefaultButton
             focusColor={colors.purply}
             onPress={async () => {}}>
             AI 맞춤 추천을 위해 ​세부 질문 응답하기
          </DefaultButton>
        </View>
      </View>
            );
          }
        }}
      />
      <AddStockPopUp
        general={recommends[index]}
        isVisible={isShowStockPopup}
        onCancel={() => {
          setIsShowStockPopup(false);
        }}
      />
    </Modal>
  );
};
export default RecommendPopUp;

