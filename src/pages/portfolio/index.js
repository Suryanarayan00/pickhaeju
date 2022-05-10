import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '#common/colors';
import PortfolioNews from '#widgets/portfolio_news';
import PortfolioAnalysis from '#widgets/portfolio_analysis';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import assets from '../../../assets';
import Document from '#components/Document';
import TabBar from '#components/TabScene/TabBar';
import TabScreens from '#components/TabScene/TabScreens';
import PickNews from '#widgets/pick_news';
import PickPickTab from '#widgets/pick_pick';
import TabProvider from '#components/TabScene';
import RecommendPopUp from '#components/RecommendPopUp';
import OptimizeRecomPopUp from '#components/OptimizeRecomPopUp';
import { shallowEqual, useDispatch, useSelector, useStore } from 'react-redux';
import {
  changeCurrency,
  CURRENCY_KRW,
  CURRENCY_USD,
} from '../../data/common/actions';
import CurrencyButton from '../../components/Button/CurrencyButton';
import { getPortfolio, currentStockPrice } from '../../common/portfolioApi';
import { Platform } from 'react-native';
import { RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

 const styles = StyleSheet.create({
  iconButton: {
    width: 32,
    height: 32,
    marginHorizontal: 4,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  titleText: { fontSize: 30, color: colors.white, marginRight: 9 },
  topHeader: {
    backgroundColor: 'rgb(136,62,189)',
  },
  backImage: {
    height: '100%',
    width: '50%',
    position: 'absolute',
    right: 0,
  },
});

const PortfolioIndex = ({route}) => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const inset = useSafeAreaInsets();
  const { principal } = useSelector((s) => s.auth, shallowEqual);
   const { userId } = principal || {};

  const [isVisible, setIsVisible] = useState(false);
  const { width: wWidth } = Dimensions.get('window');

  const [portfolioList, setPortfolioList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [currentValue, setCurrentValue] = useState([]);
  const refreshPortfolio = async () => {
    const portfolio = await getPortfolio(userId);
    console.log('portfolio List');
    console.log(portfolio);
    setRefreshing(false);
    setPortfolioList(portfolio || []);
  };
  const docScrollRef = useRef(null);
  const funRef = useRef(null);

  useEffect(() => {
    if (route.params?.refreshTime) {
      onRefresh();
      docScrollRef?.current.scrollTo({ y:0})
    }
  }, [route.params?.refreshTime]);

   useEffect(() => {
    refreshPortfolio();
   }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      setRefreshing(true);
      refreshPortfolio();
      docScrollRef?.current.scrollTo({ y:0});
      e.preventDefault();
     
    });

    return unsubscribe;
  }, [navigation]);
  
   useFocusEffect(
    React.useCallback(() => {
      refreshPortfolio();
    }, []),
   );

  useEffect(() => {
    if (Platform.OS === 'web') {
      navigation.navigate('PickWrite');
    }
  },[]);
  
  const onRefresh = async () => {
    setRefreshing(true);
    refreshPortfolio();
    upDateCurrent();
  };

  const upDateCurrent = async () =>{
    let tickers = portfolioList?.map?.(({ ticker }) => ticker);
    let portData = portfolioList;
    const currentValueArr = await currentStockPrice(tickers);
    console.log('currentValueArr');
    console.log(currentValueArr); 
    const res1 = currentValueArr.filter((page1) => !currentValue.find(page2 => page1.current === page2.current )) 
      if(res1?.length>0)
     {
      setCurrentValue(currentValueArr); 
      let newDta = portfolioList?.map((item,idx)=>
      {
        let currentVal = currentValueArr.find((g) => g?.ticker === item?.ticker)
        return (
          {
          ...item,
          general:{...item.general,current:currentVal?.current}
        })
      }
     )
      setPortfolioList(newDta);
      console.log('Portfolio price');  
      console.log(portfolioList);  
     }
      
  
  }


  useFocusEffect(
    useCallback(() => {
      if (portfolioList?.length > 0) {
        funRef.current = setInterval(() => {
         upDateCurrent();
      },2000);
    } else {
      clearInterval(funRef.current); // Stop the interval.
    }
     return () => {
        clearInterval(funRef.current);
        console.log('i have done');
      }
    }, [portfolioList])
  )

  return (
    <TabProvider index={index} onChangeIndex={setIndex}>
      <Document
        scrollRef={docScrollRef}
        scrollProps={{
          refreshControl: (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} 
            tintColor={colors.aqua}
            colors={[colors.aqua, colors.aqua,colors.aqua]}
            progressBackgroundColor="#ffffff"
             title={`업데이트 :${moment().format('YYYY.MM.DD a h:MM')}`}
            />
          ),
        }}

        headerHeight={230 - 44}
        showTopButton={false}
        renderHeader={() => (
          <View style={[styles.topHeader, { height: 55 + inset.top }]} />
        )}
        footerContents={true}
      >
        {/* <StatusBar
          backgroundColor={'rgb(136,62,189)'}
          barStyle={'light-content'}
        /> */}
         <LinearGradient
          colors={['rgb(136,62,189)', 'rgb(111,5,180)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ height: 230 + inset.top }}
        >
          <Image source={assets.bg_pf_visual} style={styles.backImage} />
         
          {/* <View style={{ marginTop:70 + inset.top,}}>
            <Text style={{color:'#fff', fontSize:16, textAlign:'center',}}>업데이트: 2021.05.07 오전 6:05</Text>
          </View> */}

          <View
            style={[
              styles.header,
              {
                paddingTop: 65 + inset.top,
              },
            ]}
          >

            <Text style={styles.titleText}>포트폴리오</Text>
            <CurrencyButton color={'white'} />
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => {
                navigation.navigate('PortfolioSettings', {
                  'portfolioList':portfolioList,
                  'general':{}
                });
              }}
            >
              <Image source={assets.management} style={styles.iconButton} />
            </TouchableOpacity>
          </View>
          </LinearGradient>

        <TabBar type={'portfolio'} />

         <TabScreens>
          <View title={'개요'} style={{ marginTop: 20 }}>
            <PortfolioNews
              portfolioList={portfolioList}
              scrollTo={(obj) => docScrollRef?.current.scrollTo(obj)}
              refresh={refreshPortfolio}
             />
          </View>
          <View title={'분석'} style={{ marginTop: 35 }}>
            <PortfolioAnalysis portfolioList={portfolioList} />
          </View>
        </TabScreens>
      </Document>
    </TabProvider>
  );
};

export default PortfolioIndex;
