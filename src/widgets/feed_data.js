import React, {
  useEffect,
  useCallback,
  useState,
  useRef,
  useMemo,
} from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  onPress,
  Dimensions,
  StatusBar,
  TouchableHighlight
} from "react-native";
import colors from "#common/colors";
import NewsListItem from "#components/NewsListItem";
import { useNavigation, useRoute } from "@react-navigation/native";
import { restApi, getAPIHost } from "#common/api";
import moment from "moment";
import "moment/locale/ko";
// import TabBar from '#components/TabScene/TabBar';
import GreedFearChart from "#components/GreedFearChart";
import LatestLocationFeed from "#components/LatestLocationFeed";
import LatestNewsFeed from "#components/LatestNewsFeed";
import { shallowEqual, useSelector } from "react-redux";

import { fearAndGreed } from "../common/dataApi";
import assets from "../../assets";
import Carousel from "#components/Carousel";
import { CURRENCY_KRW, CURRENCY_USD } from "../data/common/actions";
import { avoidNaN, commaFormat } from "../utils/utils";
import TabScreens from "#components/TabScene/TabScreens";

import TabProvider from "#components/TabScene";
import StockMarquee from "#components/StockMarquee";
import FeedWatchlist from "#components/FeedWatchlist";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AnimateNumber from "react-native-animate-number";
import { pickTalklistdata } from "../common/pickTalkApi";
import { useFocusEffect } from "@react-navigation/native";
import useSWR from 'swr'
import axios from 'axios';

const styles = StyleSheet.create({
  newsWrapper: {
    borderBottomColor: colors.paleGrey,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },

  marqueeIwt: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  marqueeTextBlack: {
    fontSize: 16,
    fontWeight: "700",
    color: "#131523",
  },

  // Footer Text Section Css
  upButtonWrapper: {
    paddingHorizontal: 20,
  },
  upIcon: { width: 50, height: 50 },
  upButton: {
    position: "absolute",
    right: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    // backgroundColor: colors.whiteThree,
    paddingLeft: 20,
    paddingTop: 28,
    // paddingBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: { fontSize: 12, color: colors.blueyGreyTwo, lineHeight: 18 },

  stockWrapper: {
    flexDirection: "row",
    minWidth: 120,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    height: 60,
    borderBottomColor: colors.paleGrey,
    borderBottomWidth: 1,
  },
  stockIcon: {
    width: 32,
    height: 32,
    borderRadius: 15,
    backgroundColor: "#eee",
  },

  tickerText: { color: colors.blueyGreyTwo },
  nameText: { color: colors.dark },

  titleOn_center: {
    color: colors.lightIndigo,
    fontSize: 18,
  },
  titleOff_center: {
    color: colors.blueyGrey,
    opacity: 0.5,
    fontSize: 18,
  },
  indicatorOn_center: {
    borderBottomColor: colors.lightIndigo,
    borderBottomWidth: 2,
    marginTop: 10,
  },
  indicatorStyle: {
    backgroundColor: colors.lightIndigo,
  
    marginBottom: 0,
  },
  indicatorOff_center: {
    borderBottomColor: "transparent",
    borderBottomWidth: 2,
    marginTop: 10,
  },
  incomeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  downText: {
    color: colors.softBlue,
    fontSize: 14,
    paddingLeft: 2,
    textAlign: "right",
  },
  upText: {
    color: colors.watermelon,
  },
  arrowIcon: { width: 6, height: 4 },
  // Custom Table Css
  tableMainCover: {
    marginHorizontal: 0,
  },
  tableRow: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: colors.paleGrey,
    borderBottomWidth: 1,
  },
  tableLeftSec: {
    width: "44%",
    flexDirection: "row",
    overflow: "hidden",
  },
  tableHeaderTitle: {
    fontSize: 14,
    color: "#000",
    marginBottom: 2,
    textTransform: "uppercase",
  },
  tableHeaderSubtitle: {
    fontSize: 13,
    color: colors.blueyGreyTwo,
    textTransform: "uppercase",
  },
  tableMiddleSec: {
    width: "28%",
    paddingHorizontal: 5,
  },
  tableGrowthValue: {
    fontSize: 13,
    color: "#000",
    textAlign: "right",
  },
  tableRightSec: {
    width: "28%",
  },
  tableGrowthText: {
    fontSize: 13,
    textAlign: "right",
    color: colors.softBlue,
  },
  tableGrowthTextDown: {
    fontSize: 13,
    textAlign: "right",
    color: colors.softBlue,
  },

  // Custom data table With Up and Down Status CSS
  tableTitleCover: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 20,
  },
  tableTitleMain: {
    fontSize: 17,
    fontWeight: "700",
    color: "#000",
  },
  tableTitleSmall: {
    fontSize: 12,
    color: colors.blueyGreyTwo,
    paddingLeft: 5,
  },
  tableCounterSec: {
    marginTop: 3,
    marginRight: 10,
    width: 28,
  },
  tableRowCounter: {
    fontSize: 12,
    color: "#000",
    textAlign: "center",
  },
  tableRowStatus: {
    fontSize: 12,
    textAlign: "center",
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  arrowDownIcon: {
    width: 9,
    height: 6,
  },
  incomeText: { color: colors.softBlue, paddingLeft: 2 },
  incomeTextUp: {
    color: colors.watermelon,
  },
  container: {
    marginTop: 15,
  },
  scene: {
    flex: 1,
  },
});

const SCREENS = [
  {
    index: "0",
    title: "업계별",
  },
  {
    index: "1",
    title: "종목별",
  },
];

const FeedData = (props) => {
  const navigation = useNavigation();
  const [updatedDate, setUpdatedDate] = useState("-");
  const [fgi, setFgi] = useState({});
  const [orderBy, setOrderBy] = useState("-publication_date");
  const scrollViewRef = useRef();
  const isLoading = useRef();
  const [latestNews, setLatestNews] = useState([]);
  const carousel = useRef();
  const [index, setIndex] = useState(0);
  const [upData, setUpdata] = useState([]);
  const [downData, setDownData] = useState([]);
  const [scrapIndex, setScrapIndex] = useState(0);
  const [rankingData, setRanking] = useState([]);
  const [indexData, setIndexData] = useState([]);
  const [watchData, setWatchData] = useState([]);

  const [pickTalkList, setPickTalk] = useState([]);

  const [routes] = React.useState([
    { key: "상승", title: "상승" },
    { key: "하락", title: "하락" },
  ]);
  const route = useRoute();
  const { width: fullWidth } = Dimensions.get("window");
  const { currency, currentCurrency } = useSelector(
    (s) => s?.common?.currency,
    shallowEqual
  );
  const NO_PER_SCREEN = 5;
  const itemWidth = fullWidth / NO_PER_SCREEN;
  // console.log('currency.rates', currency);
  const currencySymbolBefore = currentCurrency == CURRENCY_KRW ? "" : "$";
  const currencySymbolAfter = currentCurrency == CURRENCY_KRW ? "원" : "";
  const currencyCalc = (v) => {
    if ((!v || v === "N/A") && v !== 0) return "N/A";
    if (currentCurrency == CURRENCY_KRW) {
      const krw = currency?.rates?.KRW;
      return currencySymbolBefore + commaFormat(Math.round(v * krw));
    } else if (currentCurrency == CURRENCY_USD) {
      return commaFormat(Math.round(v * 100) / 100, undefined, undefined, 2);
    } else {
      return commaFormat(Math.round(v * 100) / 100, undefined, undefined, 2);
    }
    return v;
  };

  //called on refresh !
  useEffect(() => {
    console.log("refresh called");
  }, [props.refreshTimeVal]);

  const convertCurrency = (amount) => {
    if ((!amount || amount === "N/A") && amount !== 0) return 0;
    if (currentCurrency == CURRENCY_KRW) {
      const krw = currency?.rates?.KRW;
      return Math.round(amount * krw).toFixed(2);
    } else if (currentCurrency == CURRENCY_USD) {
      return (Math.round(amount * 100) / 100).toFixed(2);
    } else {
      (Math.round(amount * 100) / 100).toFixed(2);
    }
  };

  //Get Latest News Data
  const getLatestNews = async () => {
    const { data } = await restApi.get(`api/v3/main_article_list/latest`);
    setLatestNews(data?.articles);
  };

  //Get Daily Radar Data
  const getDailyRadar = async () => {
    const { data } = await restApi.get(`api/v3/data/daily_radar`);
    console.log(data)
    let updatedData = data?.up?.map((itemData) => {
      return {
        ...itemData,
        last_price_f: convertCurrency(Math.abs(itemData?.last_price)),
      };
    });
     setUpdata(updatedData);
    setDownData(data?.down);
  };

  const fetcher = (url) => axios.get(url).then(({data}) => {
      let updatedData = data?.up?.map((itemData) => {
      return {
        ...itemData,
        last_price_f: convertCurrency(Math.abs(itemData?.last_price)),
      };
    });
     setUpdata(updatedData);
    setDownData(data?.down);
 
 });
 
 const { data } = useSWR(getAPIHost()+'/api/v3/data/daily_radar?limit=5' ,fetcher, { refreshInterval: 5000 } );


  //Get Value
  const getCurrStatus = async (symbol) => {
    const { data } = await restApi.get(`api/v3/market/historical`, {
      params: {
        symbol: symbol,
      },
    });
    return data;
  };

  const getMarketIndex = async () => {
    const { data } = await restApi.get(`api/v3/market/indices`);
    
    const toDelete = new Set(['ind_qzErBy', 'ind_bXZeGg','ind_5X70Gz','ind_gYWvd2']);
const newArray = data.filter(obj => !toDelete.has(obj.id));

let NewInfo = [];
    Promise.all(newArray?.map?.((indices) => getCurrStatus(indices?.symbol))).then(
      (val) => {
        val?.map((item) => {
          let isUp = 0;
          let currVal = 0;
          let preVal = 0;
          let perChange = 0;
          if (item?.historical_data?.length > 0) {
            currVal = item?.historical_data[0];
            preVal = item?.historical_data[1];
            isUp =
              currVal?.value > preVal?.value
                ? 1
                : currVal?.value < preVal?.value
                ? -1
                : 0;

            perChange =
              isUp > 0
                ? (perChange = avoidNaN(
                    Math.abs(
                      ((currVal?.value - preVal?.value) / preVal?.value) * 100
                    ),
                    (v) => `${v.toFixed(2)}%`,
                    "N/A"
                  ))
                : isUp < 0
                ? (perChange = avoidNaN(
                    Math.abs(
                      ((preVal?.value - currVal?.value) / currVal?.value) * 100
                    ),
                    (v) => `${v.toFixed(2)}%`,
                    "N/A"
                  ))
                : `0%`;
          }
          let itemObj = {
            name: item?.index?.name,
            symbol: item?.index?.symbol,
            currentVal: currVal?.value,
            preVal: preVal?.value,
            isUp: isUp,
            perChange: perChange,
          };
          NewInfo.push(itemObj);
        });

        console.log('NewInfo');
        console.log(NewInfo);

        setIndexData(NewInfo);
      }
    );
  };

  useEffect(() => {
    getMarketIndex();
    getLatestNews();
    getDailyRadar();
    return () => {
      console.log("Feed Data Removed");
    };
  }, []);

  useEffect(() => {
    const getFear = async () => {
      console.log("get Fear called");
      const { data } = await fearAndGreed();
      const {
        result: { updatedAt, fgi },
      } = data;
      setFgi(fgi);
      setUpdatedDate(`${moment(updatedAt).format("MM.DD A hh")}시 기준`);
    };
    getFear();
    return () => {};
  }, []);

  //  useEffect(() => {
  //   const getPickTalk = async () => {
  //     let sortingBy = '-score';
  //     let limit = 10;
  //     const data  = await pickTalklistdata(sortingBy,limit);
  //     console.log('getPickTalk');
  //     console.log(data);
  //     setPickTalk(data);
  //    };
  //   getPickTalk();
  //   return () => {};
  // }, []
  // );

  useFocusEffect(
    useCallback(() => {
      console.log("id called");
      const getPickTalk = async () => {
        let sortingBy = "-score";
        let limit = 10;
        const data = await pickTalklistdata(sortingBy, limit);
        console.log("getPickTalk");
        console.log(data);
        setPickTalk(data);
      };
      getPickTalk();
    }, [])
  );

  useEffect(() => {
    const getTopSearch = async () => {
      console.log("ranking");
      const { data } = await restApi.get(
        `api/v3/ticker_search_history/ranking`
      );
      console.log("ranking");
      console.log(data);
      setRanking(data);
    };
    getTopSearch();
    return () => {};
  }, []);

  useEffect(() => {
    const getfeedWatch = async () => {
      const {
        data: { docs },
      } = await restApi.get(`api/v3/theme/list?sort=-priority`);
      setWatchData(docs);
      console.log("get watchlist");
      console.log(docs);
    };
    getfeedWatch();
    return () => {};
  }, []);

  const FirstRoute = () =>
    upData?.map((item) => {
      console.log(item?.last_price_f);
      return (
        <View style={styles.tableMainCover}>
          <TouchableHighlight underlayColor= {colors.paleGreyTwo} style={styles.tableRow}
            onPress={() => {
              navigation.navigate("PortfolioDetails", {
                general: { ticker: item?.ticker },
              });
            }}
          >
            <React.Fragment>
              <View style={styles.tableLeftSec} >
                <Image
                  style={{
                    width: 31,
                    height: 31,
                    borderRadius: 15,
                    backgroundColor: "#eee",
                  }}
                  source={{
                    uri:
                      item?.logo ||
                      `https://storage.googleapis.com/pickhaeju-static/logo/${item?.ticker}.png`,
                  }}
                />

                <View style={{ paddingLeft: 10, width: "81%", }}>
                  <Text style={styles.tableHeaderTitle} numberOfLines={1}>
                    {item?.nameKo?.length > 7
                      ? item?.nameKo?.slice(0, item?.nameKo?.length / 2) + "..."
                      : item?.nameKo}
                  </Text>
                  <Text style={styles.tableHeaderSubtitle} numberOfLines={1}>
                    {item?.ticker}
                  </Text>
                </View>
              </View>
              
              <View style={styles.tableMiddleSec}>
                <Text style={styles.tableGrowthValue}>
                  {!!currencySymbolBefore && currencySymbolBefore}{" "}
                  <AnimateNumber
                    interval={4}
                    steps={3}
                    value={item?.last_price}
                    formatter={(val) => {
                      return currencyCalc(Math.abs(val));
                    }}
                  />
                  {!!currencySymbolAfter && currencySymbolAfter}
                </Text>
              </View>

              <View style={styles.tableRightSec}>
                <View style={[styles.incomeWrapper, { justifyContent: "flex-end" }]}>
                  <Image source={assets.arr_up_red} style={styles.arrowIcon} />
                  <Text style={[styles.incomeText, styles.incomeTextUp]}>
                    {!!currencySymbolBefore && currencySymbolBefore}
                    <AnimateNumber
                      interval={4}
                      steps={3}
                      value={item?.diff}
                      formatter={(val) => {
                        return currencyCalc(val);
                      }}
                    />
                    {!!currencySymbolAfter && currencySymbolAfter}
                  </Text>
                </View>

                <View style={[styles.incomeWrapper, { justifyContent: "flex-end" }]}>
                  <Image source={assets.arr_up_red} style={styles.arrowIcon} />
                  <Text
                    style={[
                      styles.downText,
                      styles.incomeTextUp,
                      { fontSize: 11 },
                    ]}
                  >
                    <AnimateNumber
                      interval={4}
                      steps={3}
                      value={item?.diff * 100}
                      formatter={(val) => {
                        return `${val.toFixed(2)}%`;
                      }}
                    />

                    {/* {avoidNaN(item?.diff * 100, (v) => `${v.toFixed(1)}%`, '-')} */}
                  </Text>
                </View>
              </View>
            </React.Fragment>
          </TouchableHighlight>
        </View>
      );
    });

  const SecondRoute = () =>
    downData?.map((item) => {
      return (
        <View style={styles.tableMainCover}>
          <TouchableHighlight underlayColor= {colors.paleGreyTwo} style={styles.tableRow}
            onPress={() => {
              navigation.navigate("PortfolioDetails", {
                general: { ticker: item?.ticker },
              });
            }}
          >
            <React.Fragment>
              <View style={styles.tableLeftSec}>
                <Image
                  style={{
                    width: 31,
                    height: 31,
                    borderRadius: 15,
                    backgroundColor: "#eee",
                  }}
                  source={{
                    uri:
                      item?.logo ||
                      `https://storage.googleapis.com/pickhaeju-static/logo/${item?.ticker}.png`,
                  }}
                />

                <View style={{ paddingLeft: 10, width: "81%" }}>
                  <Text style={styles.tableHeaderTitle} numberOfLines={1}>
                    {item?.nameKo?.length > 7
                      ? item?.nameKo?.slice(0, item?.nameKo?.length / 2) + "..."
                      : item?.nameKo}
                  </Text>
                  <Text style={[styles.tableHeaderSubtitle, { paddingLeft: 2 }]} numberOfLines={1}>
                    {item?.ticker}
                  </Text>
                </View>
                
              </View>

              <View style={styles.tableMiddleSec}>
                <Text style={styles.tableGrowthValue}>
                  {!!currencySymbolBefore && currencySymbolBefore}{" "}
                  <AnimateNumber
                    interval={4}
                    steps={3}
                    value={item?.last_price}
                    formatter={(val) => {
                      return currencyCalc(Math.abs(val));
                    }}
                  />
                  {!!currencySymbolAfter && currencySymbolAfter}
                </Text>
              </View>

              <View style={styles.tableRightSec}>
                <View
                  style={[styles.incomeWrapper, { justifyContent: "flex-end" }]}
                >
                  <Image
                    source={assets.arrow_down_blue}
                    style={styles.arrowIcon}
                  />
                  <Text style={[styles.incomeText]}>
                    {!!currencySymbolBefore && currencySymbolBefore}
                    <AnimateNumber
                      interval={4}
                      steps={3}
                      value={item?.diff}
                      formatter={(val) => {
                        return currencyCalc(val);
                      }}
                    />
                    {!!currencySymbolAfter && currencySymbolAfter}
                  </Text>
                </View>
                <View
                  style={[styles.incomeWrapper, { justifyContent: "flex-end" }]}
                >
                  <Image
                    source={assets.arrow_down_blue}
                    style={styles.arrowIcon}
                  />
                  <Text style={[styles.downText, { fontSize: 11 }]}>
                    {/* {avoidNaN(item?.diff * 100, (v) => `${v.toFixed(1)}%`, '-')} */}
                    <AnimateNumber
                      interval={4}
                      steps={3}
                      value={item?.diff * 100}
                      formatter={(val) => {
                        return `${val.toFixed(2)}%`;
                      }}
                    />
                  </Text>
                </View>
              </View>
            </React.Fragment>
          </TouchableHighlight>
        </View>
      );
    });


  const initialLayout = { width: Dimensions.get("window").width };
console.log('url value');
console.log(getAPIHost()+'/api/v3/data/daily_radar?limit=5');
  const renderScene = SceneMap({
    상승: FirstRoute,
    하락: SecondRoute,
  });
  const Footer = () => {
    return (
      <View style={styles.footer}>
        {/* <Text style={[styles.footerText, { flex: 1 }]}>
          본 플랫폼은 투자판단에 참고용으로만 사용하실 수 있으며, 본 정보를
          이용한 모든 투자판단은 투자자의 책임으로 당사는 이에 대한 일체의
          법적 책임을 지지 않습니다.
        </Text> 

        <View style={styles.upButtonWrapper}>
          <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
            <Image
              source={assets.arrow_up_off}
              style={styles.upIcon}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View> */}
      </View>
    );
  };

  const Header = () => {
    return (
      <>
        {/* FearChart Section Code */}
        <View style={{ width: "100%" }}>
          {useMemo(() => {
            return (
              <GreedFearChart
                value={20}
                updatedDate={updatedDate}
                setUpdatedDate={setUpdatedDate}
                fgi={fgi}
                setFgi={setFgi}
              />
            );
          }, [fgi])}
        </View>

        {/* Location Block Box Setion Code */}
        {/* <LatestLocationFeed pickTalkList={pickTalkList} /> */}
        {/* Block Text Box Setion Code */}
        <LatestNewsFeed latestNews={latestNews} />

        {/* Block for top 5  Code */}
        <View style={{ width: "100%", marginTop: 20, paddingHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "700",
              color: "#000",
              marginBottom: 0,
            }}
          >
            데일리 레이더
          </Text>
        </View>

        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          style={[styles.container,{backgroundColor: "white"}]}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              renderLabel={({ focused, route }) => (
                <Text
                  style={
                    focused ? styles.titleOn_center : styles.titleOff_center
                  }
                >
                  {route.title}
                </Text>
              )}
              indicatorStyle={styles.indicatorStyle}
              style={{ backgroundColor: "white",elevation:1}}
            />
          )} // <-- add this line
        />

        {/* Start: Custom data table With Up and Down Status */}
        <View
          style={{
            height: 10,
            width: "100%",
            paddingHorizontal: 20,
            backgroundColor: "#eff0f2",
          }}
        >
        </View>
        <View style={{ width: "100%", marginVertical: 30 }}>
          <View style={[styles.tableTitleCover, { paddingLeft: 20 }]}>
            <Text style={styles.tableTitleMain}>실시간 검색어</Text>
            <Text style={styles.tableTitleSmall}>
              {" "}
              {moment().format("YYYY.MM.DD a h:MM")}
            </Text>
          </View>

          {/* 1st Row */}
          <View style={styles.tableMainCover}>
            {rankingData?.map((rankData) => {
              console.log('current rank');
              console.log(rankData);

              let value =
              rankData?.previousRank > 0
                ? rankData?.previousRank - rankData?.currentRank
                : 0;
              return (
                <TouchableHighlight underlayColor={colors.paleGreyTwo} onPress={() => {
                  navigation.navigate("PortfolioDetails", {
                    general: { ticker: rankData?.ticker },
                  });
                }} style={styles.tableRow}>
                  <React.Fragment>
                    <View style={styles.tableLeftSec}>
                      <View style={styles.tableCounterSec}>
                        <Text style={styles.tableRowCounter}>
                          {rankData?.currentRank}
                        </Text>
                        {value > 0 ? (
                          <Text
                            style={[
                              styles.tableRowStatus,
                              {
                                color:
                                  value > 0 ? colors.pastelRed : colors.softBlue,
                              },
                            ]}
                          >
                            <Image
                              style={{ width: 5, height: 8 }}
                              source={value > 0 ? assets.upRed : assets.downBlue}
                            />
                            {value}
                          </Text>
                        ) : null}
                      </View>
                      <Image
                        style={{
                          width: 31,
                          height: 31,
                          borderRadius: 15,
                          backgroundColor: "#eee",
                        }}
                        source={{
                          uri:
                            rankData?.logo ||
                            `https://storage.googleapis.com/pickhaeju-static/logo/${rankData?.ticker}.png`,
                        }}
                      />
                      <View style={{ marginLeft: 10, width: "70%" }}>
                        <Text style={styles.tableHeaderTitle}>
                          {rankData?.nameKo?.length > 7
                            ? rankData?.nameKo?.slice(
                                0,
                                rankData?.nameKo?.length / 2
                              ) + "..."
                            : rankData?.nameKo}
                        </Text>
                        <Text style={styles.tableHeaderSubtitle}>
                          {rankData?.ticker}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.tableMiddleSec}>
                      <Text style={[styles.tableGrowthValue]}>
                        {!!currencySymbolBefore && currencySymbolBefore}{" "}
                        {/* {currencyCalc(Math.abs(rankData?.current))} */}
                        <AnimateNumber
                          interval={4}
                          steps={3}
                          value={rankData?.current}
                          formatter={(val) => {
                            return currencyCalc(Math.abs(val));
                          }}
                        />
                        {!!currencySymbolAfter && currencySymbolAfter}
                      </Text>
                    </View>

                    <View style={styles.tableRightSec}>
                        <View style={[styles.incomeWrapper, { justifyContent: "flex-end" }]}>
                          <Image
                            source={
                              rankData?.current - rankData?.last_price > 0
                                ? assets.arr_up_red
                                : assets.arrow_down_blue
                            }
                            style={styles.arrowIcon}
                          />
                          <Text
                            style={[
                              styles.tableGrowthText,
                              rankData?.current - rankData?.last_price > 0 &&
                                styles.upText,
                            ]}
                          >
                            {!!currencySymbolBefore && currencySymbolBefore}{" "}
                            <AnimateNumber
                              interval={4}
                              steps={3}
                              value={rankData?.current - rankData?.last_price}
                              formatter={(val) => {
                                return currencyCalc(Math.abs(val));
                              }}
                            />
                            {!!currencySymbolAfter && currencySymbolAfter}
                          </Text>
                        </View>
                        <View style={[styles.incomeWrapper, { justifyContent: "flex-end" }]}>
                          <Image source={
                              rankData?.current - rankData?.last_price > 0
                                ? assets.arr_up_red
                                : assets.arrow_down_blue
                            }
                            style={styles.arrowIcon}
                          />
                          <Text
                            style={[
                              styles.downText,
                              rankData?.current - rankData?.last_price > 0 &&
                                styles.upText,
                              { fontSize: 11 },
                            ]}
                          >
                            
                            {avoidNaN(
                              Math.abs(
                                ((rankData?.current - rankData?.last_price) /
                                  rankData?.last_price) *
                                  100
                              ),
                              (v) => `${v.toFixed(2)}%`,
                              "N/A"
                            )}
                          </Text>
                        </View>
                      </View>
                  </React.Fragment>
                </TouchableHighlight>
              );
            })}
          </View>
        </View>
        {/* End: Custom data table With Up and Down Status */}
      </>
    );
  };

  return (
    <ScrollView>
      <View style={styles.marqueeContainer}>
     
    <StockMarquee data={indexData} /> 
      </View>
      <Header />
      {/* <FeedWatchlist WatchData={watchData} /> */}
      <Footer />
    </ScrollView>
  );
};

export default FeedData;
``