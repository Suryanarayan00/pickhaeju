import React, { useEffect, useState, useRef } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '#common/colors';
import assets from '../../../assets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WatchListCard from '#components/WatchListCard';
import WatchListStock from '#components/WatchListStock';
import BottomModal from '#components/Modal/BottomModal';
import WatchModalContents from '#components/WatchModalContents';
import Document from '#components/Document';
import NewsPickSection from '#components/NewsPickSection';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { hexToRgb, rgbaToHex } from '../../utils/color.utils';
import { CURRENCY_KRW } from '../../data/common/actions';
import CurrencyButton from '../../components/Button/CurrencyButton';
import { watchlistdata } from '../../common/usersApi';
import { categoryIcon } from '../../common/category';
import { me, WatchListAction, targetIndex} from '#data/auth/actions';
import { RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

const styles = StyleSheet.create({
  iconButton: {
    width: 32,
    height: 32,
    marginHorizontal: 4,
  },
  stockListHeader: {
    flexDirection: 'row',
    marginLeft: 18,
    borderBottomColor: 'rgb(230,233,244)',
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 13,
    color: colors.blueGrey,
    paddingHorizontal: 10,
  },
  stockWrapper: {
    paddingLeft: 20,
    width: '80%',
    borderBottomColor: colors.paleGrey,
    borderBottomWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 21,
    marginTop: 27,
    marginBottom: 24,
  },
  tabContentWrapper: {
    // borderRadius: 10,
    // borderTopLeftRadius: 10,
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    // borderColor: colors.paleLavender,
    // borderWidth: 0.5,
    marginLeft: 0,
    flex: 1,
  },
  tabHeader: {
    paddingLeft: 18,
    backgroundColor: colors.paleLavender,
    height: 74,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //borderTopLeftRadius: 10,
  },
  addButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 15,
  },
  emptyWrapper: {
    backgroundColor: colors.paleGreyFour,
    borderRadius: 10,
    height: 400,
    flexGrow: 1,
    marginHorizontal: 20,
    justifyContent: 'center',
    marginVertical: 40,
  },
  emptyContents: {
    fontSize: 18,
    letterSpacing: -0.34,
    color: colors.cloudyBlueTwo,
    marginTop: 23,
    textAlign: 'center',
  },
  cardIconBox: {
    marginRight: 10,
    width: 33,
    height: 33,
    borderRadius: 7.5,
    backgroundColor: colors.white,
    shadowOpacity: 0.9,
    shadowOffset: {
      width: 3.3,
      height: 5.6,
    },
    elevation: 8,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleInputWrapper: {
    height: 35,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightPeriwinkle,
    justifyContent: 'center',
    marginTop: 22,
    marginBottom: 21,
  },

  titleText: { fontSize: 30, color: colors.white, marginRight: 9 },
  titleWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  plusButton: { width: 26, height: 26 },
  cardWrapper: {
    paddingLeft: 12,
    flexGrow: 1,
    alignItems: 'flex-start',
    // maxHeight: 176,
    // marginBottom: 40,
  },
  alarmIcon: {
    width: 18,
    height: 18, 
    marginRight: 16,
  },
  cardTitle: { fontSize: 18, color: colors.dark },
  tabHeaderText: { flexDirection: 'row', alignItems: 'center' },
  tabHeaderKor: {
    fontSize: 23,
    color: colors.purple,
    marginRight: 6,
  },
  tabHeaderEng: { fontSize: 16, color: colors.purple },
  writeIcon: { width: 18, height: 18, marginRight: 26 },
  cardIcon: {
    width: 18,
    height: 18,
    tintColor: colors.purple,
  },
  tailStyle: {
    position: 'absolute',
    left: 50,
    top: -15,
  },
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

const WatchList = () => {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const { principal, targetIndexVal} = useSelector((s) => s.auth, shallowEqual);
  const [watch, setWatch] = useState(redwatchlist?.[targetIndexVal]);
  const [watchdata, setWatchdata] = useState(null);
  const [selectedIndex, setIndex ]= useState(targetIndexVal);

  const docScrollRef = useRef(null);
  const { selectedWatchlist, redwatchlist, } = useSelector((s) => s.auth, shallowEqual);

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      docScrollRef?.current.scrollTo({ y:0});
      e.preventDefault();
      onRefresh();
    });

    return unsubscribe;
  }, [navigation]);

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerTransparent: true,
  //   });

  //   watchlistdata().then((data) => {
  //     //console.log('setWatchdata', JSON.stringify(data, undefined, 2));
  //     setWatchdata(data);
  //   });

  //   setWatch(
  //     principal?.userInfo?.watchlist?.find(
  //       (w) => w.category == watch?.category,
  //     ) || principal?.userInfo?.watchlist?.[0],
  //   );

  //   const unsubscribe = navigation.addListener('focus', () => {
  //     // do something
  //     StatusBar.setBarStyle('light-content');
  //   });
  //   return unsubscribe;
  // }, [navigation, principal]);


  useEffect(() => {
    const userId=principal?.userId;
      // do something
      dispatch(WatchListAction(principal?.userId));
      watchlistdata(userId).then((data) => {
         setWatchdata(data);
         console.log('Watch Data Detail');
         console.log(data?.[targetIndexVal]);
         setWatch(data?.[targetIndexVal]);
        setIndex(targetIndexVal)
      });
     const unsubscribe = navigation.addListener('focus', () => {
   
      StatusBar.setBarStyle('light-content');
     });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setWatch(redwatchlist?.[targetIndexVal]); 
    setIndex(targetIndexVal)
  
 },[redwatchlist]);
  
 
 const [isVisibleWatchListAdd, setIsVisibleWatchListAdd] = useState(false);
  const [isVisibleWatchListModify, setIsVisibleWatchListModify] =
    useState(false);

  const handleWatchListDelete = (deletedIndex) => {
    if (deletedIndex === 0) {
      setWatch(watchdata?.[0]);
      setIndex(0)

    } else {
      setWatch(redwatchlist?.[deletedIndex - 1]);
      
      setIndex(deletedIndex - 1)

    }
  };

  const handleWatchListFocus = async (targetIndexValue) => {
    setWatch(redwatchlist?.[targetIndexValue]);
    setIndex(targetIndexValue);
  };

  const handleFocusNewWatchList = async () => {
    watchlistdata(principal?.userId).then((data) => {
    dispatch(targetIndex(data?.length -1));
    setWatch(data?.[data?.length -1]);
    setIndex(data?.length -1);

     });
  };

  const color = watch
    ? rgbaToHex({
        ...hexToRgb(watch?.color),
        a: 32,
      })
    : 'white';

  const { currency, currentCurrency } = useSelector(
    (s) => s?.common?.currency,
    shallowEqual,
  );

  const currencyCalc = (v) => {
    const usd = currency?.rates?.USD;
    return v * (currentCurrency == CURRENCY_KRW ? 1 / usd : 1);
  };

  //Refresh Control
  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(WatchListAction(principal?.userId));

    watchlistdata(principal?.userId).then((data) => {
      setWatchdata(data);
       setWatch(
        data?.[0],
      );
      setIndex(0);

      setRefreshing(false);
   });
   
  };

console.log('selectedWatchlist');
console.log('targetIndexVal');
console.log(targetIndexVal);

var leftVal=selectedIndex > 0 ? selectedIndex * 110  + 50 : 50;



//console.log(principal);
 // console.log('watchdata', JSON.stringify(watchdata, undefined, 2));
  return (
    <>
      <Document
        headerHeight={140 - 44}
        renderHeader={() => (
          <View style={[styles.topHeader, { height: 55 + inset.top }]} />
        )}
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
        footerContents={true}
      >
        <LinearGradient
           colors={['rgb(136,62,189)', 'rgb(111,5,180)']}
           start={{ x: 0, y: 0 }}
           end={{ x: 0, y: 1 }}
           style={{ height: 140 + inset.top }}
        >
          <Image source={assets.bg_pf_visual} style={styles.backImage} />

          <View
            style={[
              styles.titleWrapper,
              {
                paddingTop: 75 + inset.top,
              },
            ]}
          >
            <Text style={styles.titleText}>관심목록</Text>
            <CurrencyButton color={'white'} />
           </View>
        </LinearGradient>
         {redwatchlist?.length > 0 ? (
          <>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>나의 관심목록</Text>
              <TouchableOpacity onPress={() => setIsVisibleWatchListAdd(true)}>
                <Image source={assets.watch_plus} style={styles.plusButton} />
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cardWrapper}
            >
              {redwatchlist?.map?.((_watch, index) => (
                <WatchListCard
                  key={index}
                  watch={_watch}
                  onPress={() => {
                    console.log(_watch);
                    setWatch(_watch);
                    setIndex(index);
                  }}
                  isSelected={selectedIndex==index ? true : false}
                />
              ))}
            </ScrollView>
            <View>
              {/* <Image
                source={assets.tail_watchlist}
                style={[
                  styles.tailStyle,
                  {
                    transform: [{ translateX: 0 }, { translateY: -1 }],
                    tintColor: color,
                    left:leftVal
                    
                  },
                ]}
              /> */}
              <View style={[styles.tabContentWrapper, { borderColor: color }]}>
                <View
                  style={[
                    styles.tabHeader,
                    {
                      backgroundColor: color,
                    },
                  ]}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <View
                      style={[
                        styles.cardIconBox,
                        {
                          shadowColor: color,
                        },
                      ]}
                    >
                      <Image
                        source={categoryIcon[watch?.icon]}
                        style={[
                          styles.cardIcon,
                          { tintColor: watch?.color },
                        ]}
                      />
                    </View>

                    <View style={styles.tabHeaderText}>
                      <Text
                        style={[
                          styles.tabHeaderKor,
                          { color: watch?.color },
                        ]}
                      >
                        {watch?.name}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    {/* <TouchableOpacity
                      style={{ marginRight: 10 }}
                      activeOpacity={0.85}
                      onPress={() => {
                        console.log('watch info');
                        console.log(watch);
                         navigation.navigate('WatchlistNotify', { watchdata:redwatchlist,selWatch:watch });
                      }}
                    >
                      <Image
                        source={assets.icon_alarm_on}
                        style={[
                          styles.alarmIcon,
                          { tintColor: watch?.color },
                        ]}
                      />
                    </TouchableOpacity> */}
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => setIsVisibleWatchListModify(true)}
                    >
                      <Image
                        source={assets.watch_write}
                        style={[
                          styles.writeIcon,
                          { tintColor: watch?.color },
                        ]}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                 <WatchListStock
                  watch={watch}
                  watchData={watch}
                  watchList={redwatchlist}
                  setWatch={setWatch}
                  
                />
              </View>
            </View>
            {/*EMPTY contents*/}
          </>
        ) : (
          <View
            style={[
              styles.emptyWrapper,
              isVisibleWatchListAdd
                ? { backgroundColor: colors.paleGreyThree }
                : '',
            ]}
          >
            <View style={{ alignItems: 'center' }}>
              <TouchableWithoutFeedback
                onPress={() => setIsVisibleWatchListAdd(true)}
              >
                <Image
                  source={assets.icon_add}
                  style={{ width: 48, height: 48 }}
                />
              </TouchableWithoutFeedback>
              <Text style={styles.emptyContents}>
                관심목록을{'\n'}추가해 주세요.
              </Text>
            </View>
          </View>
        )}

        {!!watchdata && (
          <NewsPickSection
            tickers={watch?.stocks}
          />
        )}

         <BottomModal
          isVisible={isVisibleWatchListAdd}
          onCancel={() => {
            setIsVisibleWatchListAdd(false);
          }}
        >
           <ScrollView>
             <WatchModalContents
              onEdit={handleWatchListFocus}
              onAddItem={handleFocusNewWatchList}
              onCancel={() => {
                setIsVisibleWatchListAdd(false);
              }}
              defaultTitle={
                '관심목록' + (watchdata?.length + 1)
              }
            />
          </ScrollView>
        </BottomModal>

        <BottomModal
          isVisible={isVisibleWatchListModify}
          onCancel={() => {
            setIsVisibleWatchListModify(false);
          }}
        >
          <ScrollView>
            <WatchModalContents
              onCancel={() => {
                setIsVisibleWatchListModify(false);
              }}
              targetWatch={watch}
              onDelete={handleWatchListDelete}
              onEdit={handleWatchListFocus}
            />
          </ScrollView>
        </BottomModal>
      </Document>
    </>
  );
};

export default WatchList;
