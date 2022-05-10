import React, { useState,useEffect, useRef
} from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import colors from "#common/colors";
import assets from "../../assets";
import moment from "moment";
import { upperCase } from "lodash";
import TabBar from '#components/TabScene/TabBar';
import { CURRENCY_KRW, CURRENCY_USD } from '../data/common/actions';
import { avoidNaN, commaFormat } from '../utils/utils';
import { shallowEqual, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { restApi, getAPIHost } from "#common/api";

 const styles = StyleSheet.create({
  // Block Text Box Setion Css
    talkBubbleItemWrapper: {},
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.dark,
        marginBottom: 10,
    },
    commentWrapper: {
        marginTop: 15,
        marginBottom: 10,
        // marginHorizontal: 20,
    },
    topBar: {
        flexDirection: "row",
        zIndex: 1,
    },
    arrowIcon: { width: 6, height: 4, marginRight: 2 },
    commentedRow: {
        flexDirection: "row",
        borderColor: "#eeeff5",
        borderWidth: 1.5,
        borderRadius: 5,
        borderBottomLeftRadius: 0,
        backgroundColor: "#eeeff5",
        padding: 18.5,
        paddingLeft: 0,
        marginTop: -15,
    },
    commentedRowRight: {
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 0,
    },
    itemBoxLight: {
        backgroundColor: "#eeeff5",
    },
    itemBoxDark: {
        backgroundColor: "#eeeff5",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 0,
    },
    userImage: {
        width: 43,
        height: 43,
        borderRadius: 22,
        borderWidth: 6.5,
        borderColor: "#fff",
        marginLeft: -6.5,
    },
    userImageBlank: {
        width: 43,
        height: 43,
        borderRadius: 22,
        borderWidth: 0,
        borderColor: "#fff",
        marginLeft: -6.5,
    },
    replyWrapper: {
        marginLeft: 10,
        flex: 1,
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    userName: {
        fontSize: 15,
        letterSpacing: -0.32,
        color: colors.lightIndigo,
    },
    textUppercase: {
        textTransform: "uppercase",
    },
    userDetails: {
        flexDirection: "row",
    },
    userStockPrice: {
        color: colors.dark,
        fontSize: 12,
    },
    stockIWT: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 7,
    },
    userStockUp: {
        color: colors.watermelon,
    },
    userStockDown: {
        color: colors.softBlue,
    },
    contents: { fontSize: 14, letterSpacing: -0.35, color: colors.dark },
    countBox: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 5,
    },
    countWrapper: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 5,
        marginLeft: 0.1,
    },
    iconStyle: {
        width: 10,
        height: 10,
        marginRight: 5,
    },
    countText: {
        color: colors.blueyGrey,
        letterSpacing: -0.32,
        fontSize: 13,
    },
    /* Trangular Icon */
    talkBubbleTrangleLeft: {
        position: "absolute",
        left: 0,
        bottom: -17,
        zIndex: 1,
    },
    trangleBorderLeft: {
        width: 0,
        height: 0,
        borderTopWidth: 18,
        borderTopColor: "#eeeff5",
        borderRightWidth: 21,
        borderRightColor: "transparent",
    },
    trangleBgColorLeft: {
        position: "absolute",
        top: 0,
        left: 1,
        width: 0,
        height: 0,
        borderTopWidth: 15,
        borderTopColor: "#eeeff5",
        borderRightWidth: 18,
        borderRightColor: "transparent",
    },
    talkBubbleTrangleRight: {
        position: "absolute",
        right: 0,
        bottom: -17,
        zIndex: 1,
    },
    trangleBorderRight: {
        width: 0,
        height: 0,
        borderTopWidth: 18,
        borderTopColor: "#eeeff5",
        borderLeftWidth: 21,
        borderLeftColor: "transparent",
    },
    trangleBgColorRight: {
        position: "absolute",
        top: 0,
        right: 1.5,
        width: 0,
        height: 0,
        borderTopWidth: 14.5,
        borderTopColor: "#eeeff5",
        borderLeftWidth: 17,
        borderLeftColor: "transparent",
    },
});
const pickerItems = [
  { text: '최신순', value: '-publication_date' },
  { text: '조회순', value: '-views' },
  { text: '댓글순', value: '-comments' },
  { text: '좋아요순', value: '-likes' },
];


 const HotPicTalkList = (props) => {
  const [orderBy, setOrderBy] = useState('-publication_date');
  const [pickTalkList, setPickTalkList] = useState([]);
  const [priceList, setPriceList] = useState([]);

  const navigation = useNavigation();
  const isLoading = useRef();
  const currentPage = useRef(0);

  useEffect(() => {
    loadData('-publication_date').catch(console.warn);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      loadData('-publication_date',true).catch(console.warn);
    });
    return unsubscribe;
  }, [navigation]);

  const loadData = async (order,IsNavigate=false) => {
     const  {data}  = await restApi.get(`api/v3/pick_talk/list`, {
      params: {
        limit: 15000,
        page: IsNavigate ? 1 : currentPage.current,
        sort:order,
    }
    });
console.log('picktalk Data');
console.log(data?.docs);
setPickTalkList(data?.docs);
setPriceList(data?.priceInfo)
  };


  const { width: fullWidth } = Dimensions.get('window');
  const { currency, currentCurrency } = useSelector(
    (s) => s?.common?.currency,
    shallowEqual,
  );
  const NO_PER_SCREEN = 5;
  const itemWidth = fullWidth / NO_PER_SCREEN;
  const currencySymbolBefore = currentCurrency == CURRENCY_KRW ? '' : '$';
  const currencySymbolAfter = currentCurrency == CURRENCY_KRW ? '원' : '';
  const currencyCalc = (v) => {
    if ((!v || v === 'N/A') && v !== 0) return 'N/A';
    if (currentCurrency == CURRENCY_KRW) {
      const krw = currency?.rates?.KRW;
      return currencySymbolBefore + commaFormat(Math.round(v * krw));
    } else if (currentCurrency == CURRENCY_USD) {
      return (
         commaFormat(Math.round(v * 100) / 100, undefined, undefined, 2) 
      );
    } else {
      return (
         commaFormat(Math.round(v * 100) / 100, undefined, undefined, 2) 
      );
    }
    return v;
  };

  const convertCurrency = (amount) =>{
    if ((!amount || amount === 'N/A') && amount !== 0) return 0;
    if (currentCurrency == CURRENCY_KRW) {
      const krw = currency?.rates?.KRW;
      return (Math.round(amount * krw)).toFixed(2);
    } else if (currentCurrency == CURRENCY_USD) {
      return (Math.round(amount * 100) / 100).toFixed(2);
      
    } else {
      (Math.round(amount * 100) / 100).toFixed(2);
    }
  }



  const onPickerChange = (value) => {
 
  };
  const Header = () => {
    return (
      <>
        <View style={{ marginBottom: 1 }}>
          <TabBar
            type={'pick'}
            onPickerChange={(data) => onPickerChange(data)}
            pickerItems={pickerItems}
            selectedPickerItem={orderBy}
          />
        </View>
      </>
    );
  };

  return (
    <View style={{ width: "100%",paddingHorizontal: 20,marginVertical: 10, }}>

      <View style={styles.talkBubbleItemWrapper}>
        
      <FlatList
        ref={props.scrollRef}
        ListHeaderComponent={<Header />}
        data={pickTalkList}
        extraData={pickTalkList}
        keyExtractor={(item, index) => index}
        //onEndReachedThreshold={0.4}
        renderItem={({ item, index }) => {
          const current = priceList[index]?.current_price;
          const last = priceList[index]?.last_price;
              return (
             
        <View style={styles.commentWrapper}>
          
        <View style={styles.topBar}>
          <Image source={{uri:`https://storage.googleapis.com/pickhaeju-static/logo/${item?.ticker}.png`}} style={styles.userImage} />
          <View style={styles.replyWrapper}>
            <View style={styles.userInfo}>
              <TouchableOpacity activeOpacity={0.85}
              onPress={()=>{
                navigation.navigate('PortfolioDetails', {
                  general: { ticker:item?.ticker },
                }); 
              }}
              >
                <Text style={[styles.userName, styles.textUppercase]}>
                  ${item?.ticker}
                </Text>
              </TouchableOpacity>
              <View style={styles.userDetails}>
                <Text style={styles.userStockPrice}>{currencyCalc(current)}</Text>
                <View style={styles.stockIWT}>
                  <Image
                    source={current - last > 0 ? assets.arr_up_red : assets.arrow_down_blue}
                    style={styles.arrowIcon}
                  />
                  <Text style={[styles.userStockDown,  current - last > 0 && styles.userStockUp]}>
                  {currencyCalc(Math.abs(current - last))}
                  </Text>
                </View>
                <View style={styles.stockIWT}>
                  <Image
                    source={
                      current - last > 0 ? assets.arr_up_red : assets.arrow_down_blue
                     }
                    style={styles.arrowIcon}
                  />
                  <Text style={[styles.userStockDown, current - last > 0 && styles.userStockUp]}>
                  {avoidNaN(
                Math.abs(((current - last) / last) * 100),
                (v) => `${v.toFixed(2)}%`,
                'N/A',
              )}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity style={[styles.commentedRow]}>
          <View style={styles.userImageBlank}></View>
          <View style={styles.replyWrapper}>
            <Text style={styles.contents}>
            {item?.content}
            </Text>
            <View style={styles.countBox}>
              <TouchableOpacity
                style={styles.countWrapper}
                activeOpacity={0.6}
              >
                <Image
                  source={assets.icon_news_recomm}
                  style={styles.iconStyle}
                />
                <Text style={styles.countText}>{item?.likers?.length || 0}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.countWrapper}
                activeOpacity={0.6}
              >
                <Image
                  source={assets.icon_news_comment}
                  style={styles.iconStyle}
                />
                <Text style={styles.countText}>{item?.comments?.length || 0}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        {/* Trangular Icon */}
        <View style={styles.talkBubbleTrangleLeft}>
          <View style={styles.trangleBorderLeft}></View>
          <View style={styles.trangleBgColorLeft}></View>
        </View>
      </View>
          )
        }}
      />

      </View>
    </View>
  );
};

export default HotPicTalkList;
