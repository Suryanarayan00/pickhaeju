import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '#common/colors';
import Carousel from '#components/Carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RoundButton from '#components/Button/RoundButton';
import { range } from 'lodash';
import assets from '../../../assets';
import { toastShow } from '#data/toast/ToastAction';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
  platformButton: {
    color: colors.greyBlue,
    fontSize: 17,
    textAlign: 'center',
    paddingBottom: 30,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
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

  footer: {
    paddingHorizontal: 30,
  },
  footerNormal: {
    justifyContent: 'flex-end',
  },

  footerLastPage: {
    paddingHorizontal: 30,
    justifyContent: 'flex-end',
  },
  title: { fontSize: 26, color: colors.dark },
  contentText: {
    fontSize: 17,
    color: colors.greyBlue,
    paddingTop: 19,
  },
  titleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  skipButton: {
    width: 50,
    height: 50,
  },
  skipText: { fontSize: 18, color: colors.blueyGrey },
  skipButtonWrapper: {
    width: '50%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  skipTextWrapper: {
    paddingLeft: 20,
  },
});

const { width: fullWidth } = Dimensions.get('window');

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
  // {
  //   title: '종목 추천',
  //   contents: '매일매일 AI가 해주는 해외 주식 종목 추천',
  //   image: assets.img_onboard04,
  // },
  {
    title: '실시간 정보',
    contents: 'AI가 읽어주는 모든 종목의 차트 분석까지',
    image: assets.img_onboard05,
  },
];

 const LandingIndex = ({ navigation }) => {
   console.log('landing index')
  const [index, setIndex] = useState(0);
  const inset = useSafeAreaInsets();
  const carousel = useRef();
  const dispatch = useDispatch();

  const renderItem = ({ item }) => (
    <View style={[styles.titleWrapper, { paddingTop: inset.top + 95 }]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.contentText}>{item.contents}</Text>
      <View
        style={{
          paddingHorizontal: 30,
          width: '100%',
        }}
      >
        <Image
          source={item.image}
          resizeMode={'contain'}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
    </View>
  );
  useEffect(() => {
    checkLoginFunction()
    if (Platform.OS === 'web') {
      navigation.navigate('LandingIntro');
    }
  }, []);

  const checkLoginFunction = async() => {
    let value = await AsyncStorage.getItem('portID')
    // if(value != null){
    //   nav
    // }
    console.log(value,"oiuhiufhidsfiudgsuhfgudhsfuydsufbdsufc")
  }
  return (
    <View style={[styles.container, { paddingBottom: inset.bottom || 0 }]}>
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

      {index === SCREENS?.length - 1 ? (
        <View
          style={[
            styles.footer,
            styles.footerLastPage,
            { paddingBottom: 40 + inset.bottom, height: 180 + inset.bottom },
          ]}
        >
          {/* <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              // dispatch(toastShow('준비 중인 기능입니다.'));
              navigation.replace('MainStack');
            }}
          >
            <Text style={styles.platformButton}>플랫폼 둘러보기</Text>
          </TouchableOpacity> */}
          <RoundButton
            fontSize={16}
            style={{ width: '100%' }}
            onPress={() => navigation.navigate('LandingIntro')}
          >
            회원가입/로그인
          </RoundButton>
        </View>
      ) : (
        <View
          style={[
            styles.footer,
            styles.footerNormal,
            { paddingBottom: 40 + inset.bottom, height: 180 + inset.bottom },
          ]}
        >
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => carousel.current?.snapToItem(4)}
              style={styles.skipTextWrapper}
            >
              <Text style={styles.skipText}>건너뛰기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.skipButtonWrapper}
              onPress={() => {
                carousel.current?.snapToNext();
              }}
            >
              <Image source={assets.btn_next} style={styles.skipButton} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default LandingIndex;
