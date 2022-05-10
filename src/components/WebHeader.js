import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import assets from '../../assets';
import colors from '#common/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
  },
  header: {
    backgroundColor: colors.white,
    top: 0,
    position: 'absolute',
    zIndex: 100,
    height: 60,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 160,
  },

  textButton: { marginHorizontal: 10 },

  buttonItem: { flexDirection: 'row', justifyContent: 'space-between' },
  menuButton: { fontSize: 18, color: colors.blackThree },
  logoBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoStyle: {
    width: 90,
    height: 25,
    marginBottom: 10,
  },
  logoText: { color: colors.warmGrey, fontSize: 14 },
  menuButtonArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -10,
  },
  menuButtonWrapper: {
    marginHorizontal: 10,
  },
  flagIcon: { width: 10, height: 12, marginRight: 3 },
  userArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: colors.warmGreyTwo,
    marginRight: 13,
  },
  notifyIcon: {
    backgroundColor: colors.lightIndigo,
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  userImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  searchSection: {
    marginTop: 60,
    backgroundColor: colors.violetBlue,
    paddingVertical: 10,
  },
  itemWrapper: { maxWidth: 1200, width: '100%', alignSelf: 'center' },
  inputWrapper: {
    backgroundColor: colors.white,
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textInput: { flex: 1, paddingHorizontal: 10, fontSize: 16 },
  popularBox: {
    backgroundColor: colors.white,
    marginLeft: 10,
    marginRight: 2,
    borderRadius: 2,
    paddingHorizontal: 3,
    paddingVertical: 1,
    alignSelf: 'center',
  },
  popularText: { fontSize: 14, color: colors.violetBlue },
  hashtagStock: {
    fontSize: 14,
    color: colors.white,
    marginHorizontal: 2,
  },
  stockSection: {
    backgroundColor: colors.purply,
    paddingVertical: 20,
  },
  stockName: { color: colors.white, fontSize: 14, marginHorizontal: 5 },
  headerGuideLine: {
    width: 1,
    height: 15,
    backgroundColor: colors.white,
    marginHorizontal: 5,
  },
  numText: { color: colors.watermelon, fontSize: 14 },
  searchItems: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },
  popularArea: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  searchIcon: { width: 15, height: 15 },
  trendingArea: {
    flexDirection: 'row',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  trendStockArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  arrowIcon: {
    backgroundColor: colors.watermelon,
    width: 5,
    height: 5,
    marginLeft: 5,
  },
  trendIcon: { backgroundColor: colors.white, width: 10, height: 10 },
  trendingText: { color: colors.white, fontSize: 16 },
});
const data = [
  { name: 'SPCE', percentage: '15.17%' },
  { name: 'SPCE', percentage: '15.17%' },
  { name: 'SPCE', percentage: '15.17%' },
  { name: 'SPCE', percentage: '15.17%' },
  { name: 'SPCE', percentage: '15.17%' },
  { name: 'SPCE', percentage: '15.17%' },
  { name: 'SPCE', percentage: '15.17%' },
];
const WebHeader = (props) => {
  return (
    <>
      <View style={styles.header}>
        <View style={styles.logoBox}>
          <Image
            source={assets.logo}
            style={styles.logoStyle}
            resizeMode={'contain'}
          />
          <Text style={styles.logoText}>해외주식투자를 위한 Pick</Text>
        </View>
        <View style={styles.menuButtonArea}>
          {/* <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.menuButtonWrapper,
              { flexDirection: 'row', alignItems: 'center' },
            ]}
          >
            <Image
              source={assets.icon_news_flag_color}
              style={styles.flagIcon}
            />

            <Text style={styles.menuButton}>PICK/뉴스</Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity
            activeOpacity={0.85}
            style={styles.menuButtonWrapper}
          >
            <Text style={styles.menuButton}>워치리스트</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.menuButtonWrapper}
          >
            <Text style={styles.menuButton}>포트폴리오</Text>
          </TouchableOpacity> */}
        </View>
        {/* <View style={styles.userArea}>
          <TouchableOpacity activeOpacity={0.85}>
            <Text style={styles.loginText}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.85}>
            <Image source={{}} style={styles.notifyIcon} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.85}>
            <Image
              source={{
                uri:
                  'https://cdn.mediasr.co.kr/news/photo/201910/54832_18280_4434.jpg',
              }}
              style={styles.userImage}
            />
          </TouchableOpacity>
        </View> */}
      </View>
      {/* <View style={styles.searchSection}>
        <View style={styles.itemWrapper}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }} />
            <View style={styles.searchItems}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder={'회사, 서비스, 종목명을 입력하세요.'}
                  placeholderTextColor={colors.greyish}
                />
                <TouchableOpacity activeOpacity={0.85}>
                  <Image
                    source={assets.icon_search_color}
                    style={styles.searchIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.popularArea}>
              <TouchableOpacity activeOpacity={0.85} style={styles.popularBox}>
                <Text style={styles.popularText}>인기종목</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.85}>
                <Text style={styles.hashtagStock}>#스타벅스</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.85}>
                <Text style={styles.hashtagStock}>#구글</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.85}>
                <Text style={styles.hashtagStock}>#삼성전자</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View> */}
      {/* <View style={styles.stockSection}>
        <View
          style={[
            styles.itemWrapper,
            {
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.stockName}>
              DOW <Text style={{ fontWeight: 'bold' }}>0.67</Text>%
            </Text>
            <Text style={styles.stockName}>
              S&P <Text style={{ fontWeight: 'bold' }}>0.67</Text>%
            </Text>
            <Text style={styles.stockName}>
              NASDAQ <Text style={{ fontWeight: 'bold' }}>0.33</Text>%
            </Text>
          </View>
          <View style={styles.headerGuideLine} />
          <View style={styles.trendingArea}>
            <Text style={styles.trendingText}>Trending now</Text>
            <Image source={{}} style={styles.arrowIcon} />
          </View>
          <View style={styles.trendStockArea}>
            <Image source={{}} style={styles.trendIcon} />
            {data.map?.((item) => (
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.stockName}>{item.name}</Text>
                <Text style={styles.numText}>{item.percentage}</Text>
              </View>
            ))}
          </View>
        </View>
      </View> */}
    </>
  );
};

export default WebHeader;
