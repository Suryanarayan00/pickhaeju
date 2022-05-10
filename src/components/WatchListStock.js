import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import colors from '#common/colors';
// import SortableList from 'react-native-sortable-list';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import StockListWide from '#components/StockListWide';
import { useNavigation } from '@react-navigation/native';
import assets from '../../assets';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { me } from '#data/auth/actions';
import { modifyWatchList } from '#common/usersApi';

import DraggableFlatList from 'react-native-draggable-flatlist';
import { toastShow } from '#data/toast/ToastAction';
import { avoidNaN, commaFormat } from '../utils/utils';
import { WatchListAction, targetIndex } from '#data/auth/actions';
import { useFocusEffect } from '@react-navigation/native';
import { getPortfolio, currentStockPrice } from '#common/portfolioApi';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  stockListHeader: {
    flexDirection: 'row',
    flex: 1,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 13,
    color: colors.blueGrey,
  },
  headerBlank: {
    minWidth: 90, 
    maxWidth: 90, 
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    paddingRight: 8,    
    alignItems: 'center',
  },
  stockListWrapper: {
    borderBottomColor: colors.paleGrey,
    borderBottomWidth: 1,
    height: 60,
    flexDirection: 'row',
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
  subjectHeader: {
    flexDirection: 'row',
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
  nameWrapper: { paddingLeft: 10, maxWidth: 140, paddingRight: 5 },
  nameText: { color: colors.dark },
  tickerText: { color: colors.blueyGreyTwo },
  container: { flexDirection: 'row', 
  marginLeft: 0,
  width: '100%',
},
  stockTitleBox: {
    height: 40,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(230,233,244)',
  },
  arrowDownIcon: {
    width: 5,
    height: 4,
    marginLeft: 5,
  },
  stockHeader: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  stockHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 90, 
    maxWidth: 90, 
    justifyContent: 'flex-end', 
    paddingRight: 8,
  },
  emptyWrapper: {
    backgroundColor: colors.paleGreyFour,
    borderRadius: 10,
    height: 200,
    flexGrow: 1,
    marginHorizontal: 20,
    justifyContent: 'center',
    marginVertical: 20,
  },
  emptyContents: {
    fontSize: 18,
    letterSpacing: -0.34,
    color: colors.cloudyBlueTwo,
    marginTop: 10,
    textAlign: 'center',
  },
});

const Columns = [
  { width: 80, name: '현재가', value: (v) => v?.current },
  { width: 80, name: '전일대비', value: (v) =>
  // v?.current - v?.last_price
  avoidNaN(
    Math.abs(((v?.current - v?.last_price) / v?.last_price) * 100),
    (v) => v.toFixed(2),0)
  },
  { width: 80, name: '베타', field: 'beta', value: (v) => v?.beta },
  { width: 80, name: '배당수익률', value: (v) => v?.dividendyield },
  { width: 100, name: '200일 평균', value: (v) => v?.average },
  {
    width: 100,
    name: '52주 최저가',
    field: 'fiftytwo_week_low',
    value: (v) => v?.fiftytwo_week_low,
  },
  {}, // blank
  {
    width: 100,
    name: '52주 최고가',
    field: 'fiftytwo_week_high',
    value: (v) => v?.fiftytwo_week_high,
  },
];

const WatchListStock = ({ watch, watchList, watchData}) => {
  const { principal, redwatchlist } = useSelector((s) => s.auth, shallowEqual);
  const [generalData, setGeneral] = useState(watchData?.generals || []);
  const [currentValue, setCurrentValue] = useState([]);

  const funRef = useRef(null);

  const { stocks } = watch || {};
  const navigation = useNavigation();
  //For changing add button Background on select
  useEffect(() => {
     if(watchData?.generals)
    setGeneral(watchData?.generals);
  }, [watchData]);

  useFocusEffect(
    useCallback(() => {
      if (watchData?.generals) {
        funRef.current = setInterval(() => {
         upDateCurrent(watchData);
      },3000);
    } else {
      clearInterval(funRef.current); // Stop the interval.
    }
     return () => {
        clearInterval(funRef.current);
        console.log('i have done');
      }
    }, [watchData])
  )


  const upDateCurrent = async (watchDataVal) =>{
    const currentValueArr = await currentStockPrice(watchDataVal?.stocks);
    const res1 = currentValueArr.filter((page1) => !currentValue.find(page2 => page1.current === page2.current )) 
    
    if(res1?.length>0)
   {
    setCurrentValue(currentValueArr); 
    let newDta = watchDataVal?.generals?.map((item,idx)=>
    {
      let currentVal = currentValueArr.find((g) => g?.ticker === item?.ticker)
      return (
        {
        ...item,
        current:currentVal?.current
      }) 
    }
   )
   console.log('newDta')
    setGeneral(newDta);
   }
}


  const onAdd = () => {
    if (stocks?.length > 19) {
      // Alert.alert('안내', '워치리스트에 종목을 10개이상 추가하실 수 없습니다.');
      return dispatch(toastShow('종목은 20개까지 추가할 수 있습니다.'));
    }
    navigation.navigate('PortfolioSearch', {
      isWatchList: true,
    });
  };

  const [sortField, setSortField] = useState();
  const [sortDesc, setSortDesc] = useState(false);
  const [isAddclicked, setAddButtonStatus] = useState(false);

  const { width: wWidth } = Dimensions.get('window');

  const [generals, setGenerals] = useState();
  const [order, setOrder] = useState();

  const dispatch = useDispatch();
  const onDeleteTicker = async (targetTicker) => {
    const updatedList = {...watchData, stocks:watchData?.stocks?.filter((ticker) => ticker != targetTicker)} 
    const {name,_id,stocks}=updatedList;
        await modifyWatchList(_id,
          {
          name,
          stocks,
        });
        
        let index = watchList.findIndex(val => val._id === _id);
        await dispatch(targetIndex(index));
        await dispatch(WatchListAction(principal?.userId));

      };

  const sort = (t1, t2) => {
    
    if (typeof sortField === 'undefined') return 0;
    if (sortField === 'name') {
      const name1 = t1?.ticker || t1?.name || 'ㅋ';
      const name2 = t2?.ticker || t2?.name || 'ㅋ';
      return name1.localeCompare(name2) * (sortDesc ? -1 : 1);
    } else {
      const field = Columns.find(({ name }) => name === sortField);
      if (!field) return 0;
      return (field.value(t1) - field.value(t2)) * (sortDesc ? -1 : 1);
    }
  };
 

  //var computeData = watchData?.generals || [];
  console.log('check Data');
  console.log(generalData);
  console.log('End check Data');
  const renderItem = useCallback(({ item, index, drag, isActive }) => {
    return (
      <TouchableOpacity
        // onLongPress={drag}
        onPress={() => {
           navigation.navigate('PortfolioDetails', {
            general:item,
            // watchData: watchDataItem,
          });
        }}
        activeOpacity={0.65}
      >
        <View
          key={index}
          activeOpacity={0.85}
          style={[styles.stockWrapper, {paddingLeft: 20}]}
          onPress={() => {
            navigation.navigate('PortfolioDetails', {
              general:item,
              // watchData: watchDataItem,
            });
          }}
        >
           <Image
            source={{
              uri:
              item?.logo ||
                `https://storage.googleapis.com/pickhaeju-static/logo/${item?.ticker}.png`,
            }}
            style={styles.stockIcon}
            
          />
          <View 
          // style={styles.nameWrapper}
          style={{paddingLeft: 10, maxWidth: wWidth/4.5, paddingRight: 5}}
          >
            <Text style={styles.nameText} numberOfLines={1}>
              {/* {general?.nameKo || general?.name} */}
              {(item?.nameKo?.length > 7 ? item?.nameKo?.slice(0,item?.nameKo?.length/2)+"..." : item?.nameKo) || (item?.name?.length > 7 ? item?.name?.slice(0, item?.name?.length/2)+"..." : item?.name)}
            </Text>
            <Text style={styles.tickerText}>
              {item?.ticker?.toUpperCase?.()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <View>
      {watchData ? (
        <View style={styles.container}>
          <View style={{ maxWidth: wWidth / 2 }}>
            <View style={[styles.stockTitleBox]}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.stockHeader, { minWidth: 120, paddingLeft: 60 }]}
                onPress={() => {
                  if (sortField === 'name')
                    setSortDesc((sortDesc) => !sortDesc);
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
            <DraggableFlatList
              data={generalData?.length>0 ? [...generalData]?.sort(sort):[]}
              renderItem={renderItem}
              keyExtractor={(item, index) =>
                `draggable-item-${item?.ticker}`
              }
              onDragEnd={({ data }) => console.log('DRAGEND', data)}
            />
            

            {/* <SortableList
              data={watchData?.stockDetails?.sort(sort)}
              renderRow={({ data, active, index }) => {
                const { general } = data;

                console.log('active 123123', active);
                return <Row data={general} index={index} active={active} />;
              }}
            /> */}
            {/* {watchData?.stockDetails
              ?.sort(sort)
              ?.map?.(({ general }, index) => {
                // const watchDataItem = watchData?.stockDetails?.find(
                //   ({ ticker }) => general?.ticker === ticker,
                // );
                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.85}
                    style={styles.stockWrapper}
                    onPress={() => {
                      navigation.navigate('PortfolioDetails', {
                        general,
                        // watchData: watchDataItem,
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
                      <Text style={styles.nameText} numberOfLines={1}>
                        {general?.nameKo || general?.name}
                      </Text>
                      <Text style={styles.tickerText}>
                        {general?.ticker?.toUpperCase?.()}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })} */}
          </View>

          <ScrollView
            style={styles.stockListHeader}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={[styles.subjectHeader]}>
              {Columns.map?.(({ width, name }, index) => {
                if (!name) return <View style={styles.headerBlank} />;
                if (["200일 평균", "52주 최저가", "52주 최고가"].includes(name)) {
                  return (
                    <View
                      key={index}
                      style={[styles.stockHeaderRight, { width }]}
                    >
                      <Text
                        style={[
                          styles.headerText
                        ]}
                      >
                        {name}
                      </Text>
                    </View>)
                }
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
                    >{name}</Text>
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
              <Text style={[styles.headerText, { width: 60, textAlign: 'right', paddingRight: 20 }]}>삭제</Text>
            </View>
            {generalData.length>0 && [...generalData]?.sort(sort)?.map?.((item, index) => {
              return (
                <View key={index} style={styles.stockListWrapper}>
                  <StockListWide
                    general={item}
                    watchData={item}
                    columns={Columns}
                    onPressDelete={() => {
                      console.log('onPress delete', stocks?.[index]);
                      onDeleteTicker(stocks?.[index]);
                      dispatch(toastShow('해당종목이 삭제되었습니다'));
                    }}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      ) : null}

      {stocks?.length == 0 && (
        <View
          style={[
            styles.emptyWrapper,
            isAddclicked ? { backgroundColor: colors.paleGreyThree } : '',
          ]}
        >
          <View style={{ alignItems: 'center' }}>
            <TouchableWithoutFeedback
              onPress={() => {
                setAddButtonStatus(true);
                onAdd();
              }}
            >
              <Image
                source={assets.icon_add}
                style={{ width: 48, height: 48 }}
              />
            </TouchableWithoutFeedback>
            <Text style={styles.emptyContents}>종목을 추가해 주세요.</Text>
          </View>
        </View>
      )}

      {stocks?.length > 0 && (
        <TouchableOpacity
          style={styles.addButtonWrapper}
          onPress={onAdd}
          activeOpacity={0.85}
        >
          <View style={styles.addButton}>
            <Image source={assets.icon_plus_sm} style={styles.addIcon} />
          </View>
          <Text style={styles.addText}>종목추가</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const stylesRow = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',

    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },

  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
  },

  list: {
    height: 210,
    width: window.width,
  },

  contentContainer: {
    ...Platform.select({
      ios: {
        paddingVertical: 30,
      },

      android: {
        paddingVertical: 0,
      },
    }),
  },

  row: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    width: 110,
    height: 150,
    marginHorizontal: 10,
    borderRadius: 4,

    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: { height: 2, width: 2 },
        shadowRadius: 2,
      },

      android: {
        elevation: 0,
        marginHorizontal: 30,
      },
    }),
  },

  image: {
    width: 50,
    height: 50,
    marginBottom: 15,
    borderRadius: 25,
  },

  text: {
    fontSize: 18,
    color: '#222222',
  },
});

export default WatchListStock;
