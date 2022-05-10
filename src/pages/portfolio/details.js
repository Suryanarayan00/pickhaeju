import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import StockCard from '#components/StockCard';
import colors from '#common/colors';
import assets from '../../../assets';
import DetailsSummary from '#widgets/details_summary';
import DetailsFinance from '#widgets/details_finance';
import AddStockPopUp from '#components/AddStockPopUp';
import Document from '#components/Document';
import { useNavigation } from '@react-navigation/native';
import TabProvider from '#components/TabScene';
import TabBar from '#components/TabScene/TabBar';
import TabScreens from '#components/TabScene/TabScreens';
import { useRoute } from '@react-navigation/native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  changeCurrency,
  CURRENCY_KRW,
  CURRENCY_USD,
} from '../../data/common/actions';
import CurrencyButton from '../../components/Button/CurrencyButton';
import {
  companyHistory,
  companyGenerals,
  companyGeneral,
} from '../../common/dataApi';
import { getPortfolio } from '../../common/portfolioApi';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import useSWR from 'swr'
import axios from 'axios';
const styles = StyleSheet.create({
  stockCardWrapper: { marginTop: 5, marginBottom: 20 },
  container: { backgroundColor: colors.white },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  targetIcon: {
    width: 12,
    height: 12,
    marginRight: 6,
  },
  interestText: { flexDirection: 'row', alignItems: 'center' },
  dollarIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    tintColor: colors.purple,
  },
  addIcon: { width: 32, height: 32 },
  upButton: {
    position: 'absolute',
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upIcon: { width: 50, height: 50 },
  logo: {
    width: 66,
    height: 25,
    marginLeft: 21,
  },
  searchIcon: { width: 19, height: 19, marginRight: 23 },
  upButtonWrapper: {
    
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upIcon: { width: 50, height: 50 },
});

const { width: wWidth } = Dimensions.get('window');
 const PortfolioDetails = ({ props }) => {
  const {
    params: { general = {}, watchData = {} },
  } = useRoute() || {};
  const docScrollRef = useRef(null);  
  const funRef = useRef(null);

  const navigation = useNavigation();
  const [tabIndex, setTabIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [finance, setFinance] = useState(null);
  const [generalData, setGeneralData] = useState(null);
  const principal = useSelector(s => s.auth.principal, shallowEqual)
  const [portfolioList, setPortfolioList] = useState([]);
  const userId = useSelector((state) => state.auth?.principal?.userId);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    setGeneralData(null);
   if(docScrollRef?.current)
    docScrollRef?.current.scrollTo({ y:0})

  getPortfolio(userId).then((portfolio)=>setPortfolioList(portfolio || []));    
    companyHistory(general?.ticker).then((finance) => setFinance(finance));

    if (general) {
      companyGeneral(general?.ticker)
        .then((data) => {
          setGeneralData(data);
          setTabIndex(0);
        })
        .catch((e) => {
          e && console.warn(e);
          setGeneralData('종목의 상세 데이터를 조회할 수 없습니다.');
        });
        setRefreshing(false);
      }
      //  docScrollRef?.current && docScrollRef?.current.setNativeProps({ scrollEnabled: false});
 
  }, [general]);
  
  // useFocusEffect(
  //   useCallback(() => {
  //     if (generalData) {
  //       funRef.current = setInterval(() => {
  //        upDateCurrent();
  //     },2000);
  //   } else {
  //     clearInterval(funRef.current); // Stop the interval.
  //   }
  //    return () => {
  //       clearInterval(funRef.current);
  //       console.log('i have done');
  //     }
  //   }, [generalData])
  // )
  
  // const upDateCurrent = async () =>{
  //   let tickers = general?.ticker;
  //   let portData = portfolioList;
  //   const currentValueArr = await currentStockPrice(tickers);
  //   console.log('currentValueStock');
  //   const res1 = currentValueArr.filter((page1) => !currentValue.find(page2 => page1.current === page2.current )) 
  //     if(res1?.length>0)
  //    {
  //       console.log('generalData inside');
  //       console.log(generalData);
  //    }
      
  
  // }

  const fetcher = (url) => axios.post(url,{"ticker": general?.ticker}).then((res) => {
     let currentAmt = res.data?.result?.current;
    
     if(generalData && generalData?.current != currentAmt)
    {
      let updatedVal= generalData;
     
      const new_obj = { ...updatedVal, current: currentAmt };
       setGeneralData(new_obj);
       console.log('update data');
       console.log(new_obj);
    }
    return res.data;
  
  });
  
  const { data } = useSWR( 'https://pickhaeju-server.appspot.com/data/company/v2/current-price' ,fetcher, { refreshInterval: 5000 } );

  console.log('get Data interval');
  console.log(generalData);

  const onRefresh =()=>{
    getPortfolio(userId).then((portfolio)=>setPortfolioList(portfolio || []));    
    companyHistory(general?.ticker).then((finance) => setFinance(finance));

    if (general) {
      companyGeneral(general?.ticker)
        .then((data) => {
          setGeneralData(data);
          setTabIndex(0);
        })
        .catch((e) => {
          e && console.warn(e);
          setGeneralData('종목의 상세 데이터를 조회할 수 없습니다.');
        });
        setRefreshing(false);
      }
    setRefreshing(false);
   }
  // console.log(JSON.stringify(general, undefined, 2));

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: () => {
  //       return (
  //         <Image source={assets.icon_search_color} style={styles.searchIcon} />
  //       );
  //     },
  //   });
  // });
  if (generalData === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Text style={{ fontSize: 14, color: '#666', marginBottom: 20 }}>
          종목 상세 데이터를 조회 중입니다.
        </Text>
        <ActivityIndicator color={'#666'} />
      </View>
    );
  }
  if (typeof generalData === 'string') {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Text style={{ fontSize: 14, color: '#666' }}>{generalData}</Text>
      </View>
    );
  }

  console.log('General Data');
  console.log(generalData);
  return (
    <TabProvider index={tabIndex} onChangeIndex={setTabIndex}>
      <Document footerContents={true} scrollRef={docScrollRef}
        scrollProps={{
          refreshControl: (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} 
            tintColor={colors.aqua}
            colors={[colors.aqua, colors.aqua,colors.aqua]}
            progressBackgroundColor="#ffffff"
             title={`업데이트 :${moment().format('YYYY.MM.DD a h:MM')}`}
            />
          ),
        }}>
        <View style={styles.stockCardWrapper}>
          <StockCard general={generalData} watchData={watchData} />
         </View>
        <View style={styles.header}>
          <View style={styles.interestText}>
            <Image source={assets.icon_target} style={styles.targetIcon} />
            <Text style={{ color: colors.aqua, fontSize: 13 }}>
              {generalData?.watchers}
              <Text>명이 관심</Text>
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <CurrencyButton />
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => {
                setIsVisible(true);
              }}
            >
              {principal && <Image style={styles.addIcon} source={assets.icon_add} />}
            </TouchableOpacity>
          </View>
        </View>

        <TabBar type={'detail'} />

        <TabScreens>
          {generalData && (
            <DetailsSummary title={'개요'} general={generalData} />
          )}
          {generalData && (
            <DetailsFinance
              title={'재무분석'}
              general={generalData}
              finance={finance}
            />
          )}
        </TabScreens>
      </Document>

      <AddStockPopUp
        general={generalData}
        isVisible={isVisible}
        portfolioList={portfolioList}
        onCancel={() => {
          setIsVisible(false);
        }}
      
      />
   <View style={styles.upButtonWrapper}>
        <TouchableOpacity  onPress={()=>{

        if(docScrollRef?.current)
        docScrollRef?.current.scrollTo({ y:0})
        }}>
          <Image
            source={assets.topButton}
            style={styles.upIcon}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
    </TabProvider>
  );
};

export default PortfolioDetails;
