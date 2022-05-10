import React, { useEffect, useState, useRef, useMemo } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, 
} from 'react-native';
import colors from '#common/colors';
import NewsListItem from '#components/NewsListItem';
import { useNavigation } from '@react-navigation/native';
import { restApi } from '#common/api';
import moment from 'moment';
import 'moment/locale/ko';
import TabBar from '#components/TabScene/TabBar';
import FearChart from '#components/FearChart';
import { fearAndGreed } from '../common/dataApi';
import assets from '../../assets';

const styles = StyleSheet.create({
  newsWrapper: {
    borderBottomColor: colors.paleGrey,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
  upButtonWrapper: {
    
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upIcon: { width: 50, height: 50 },
});

const pickerItems = [
  { text: '최신순', value: '-publication_date' },
  { text: '조회순', value: '-views' },
  { text: '댓글순', value: '-comments' },
  { text: '좋아요순', value: '-likes' },
];

const PickNews = (props) => {
  const navigation = useNavigation();
  const [data, setData] = useState({ articles: [] });
  const [updatedDate, setUpdatedDate] = useState('-');
  const [fgi, setFgi] = useState({});
  const [orderBy, setOrderBy] = useState('-publication_date');
  const currentPage = useRef(0);
  const isLoading = useRef();

  // const loadData = async (order,IsNavigate=false) => {
  //   if (isLoading.current) return;
  //   currentPage.current++;
  //   console.log(currentPage.current);
  //   isLoading.current = true;
  //    const { data } = await restApi.get(`api/v3/article/list`, {
  //     params: {
  //       limit: 10,
  //       page: IsNavigate ? 1 : currentPage.current,
  //       sort:order,
  //   }
  //   });
  //   if (currentPage.current === 1 || IsNavigate) {
  //     let newData= data?.docs?.map?.((v) => ({
  //           ...v,
  //           isFavorite: false,
  //           primaryTicker: v?.primaryTicker || v?.ticker || v?.tickers[0],
  //         }));
  //       let processed={...data,docs:newData};
  //         setData(processed);  
      
  //   } else {
  //      setData((s) => {
  //       const newArticles = [...s.docs, ...data.docs].map?.((v) => ({
  //         ...v,
  //         isFavorite: false,
  //         primaryTicker: v?.primaryTicker || v?.ticker || v?.tickers[0],
  //       }));
  //       console.log('datadatadata nextData', newArticles);
  //       return { ...data, docs: newArticles };
  //     });
  //   }
  //   isLoading.current = false;
  // };

  const loadData = async (order) => {
    console.log('loadData', isLoading.current);
    if (isLoading.current) return;
    currentPage.current++;
    isLoading.current = true;
    const { data } = await restApi.get(`api/v3/article/list`, {
      params: {
        limit: 10,
        page: currentPage.current,
        sort:order,
    }
    });
    if (currentPage.current === 1) {
      let newData= data?.docs.map?.((v) => ({
        ...v,
        isFavorite: false,
        primaryTicker: v?.primaryTicker || v?.ticker || v?.tickers[0],
      }));
    let processed={...data,docs:newData};
      setData(processed);
    } else {
      setData((s) => {
        const newArticles = [...s.docs, ...data.docs].map?.((v) => ({
          ...v,
          isFavorite: false,
          primaryTicker: v?.primaryTicker || v?.ticker || v?.tickers[0],
        }));
        console.log('datadatadata nextData', order);
        return { ...data, docs: newArticles };
      });
    console.log('set Data');
    }
    isLoading.current = false;
  };

  const loadNextArticle = (order) => {
    loadData(order).catch(console.warn);
  };
  const onPickerChange = (value) => {
    currentPage.current = 0;

    console.log('pickerChanhg', value);
    setOrderBy(value);
    loadData(value);
  };
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

  useEffect(() => {
    const getFear = async () => {
      const { data } = await fearAndGreed();
      const {
        result: { updatedAt, fgi },
      } = data;
      console.log('test!!!!', data);
      setFgi(fgi);
      setUpdatedDate(`${moment(updatedAt).format('MM.DD A hh')}시 기준`);
    };

    getFear();
    return () => {};
  }, []);
  console.log('checkData!!!!', data);
  const Header = () => {
    return (
      <>
        {/* <View style={{ height: 230 + 28, width: '100%' }}>
          {useMemo(() => {
            return (
              <FearChart
                value={20}
                updatedDate={updatedDate}
                setUpdatedDate={setUpdatedDate}
                fgi={fgi}
                setFgi={setFgi}
              />
            );
          }, [fgi])}
        </View> */}
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
    <View style={{ marginVertical: 10, flex: 1 }}>
     
      <FlatList
        ref={props.scrollRef}
        style={{ flex: 1 }}
        ListHeaderComponent={<Header />}
        data={data?.docs}
        extraData={data?.docs}
        keyExtractor={(item, index) => index}
        onEndReached={() => loadNextArticle(orderBy)}
        onEndReachedThreshold={0.4}
        renderItem={({ item, index }) => {
           return (
            <View style={styles.newsWrapper}>
              <NewsListItem
                item={item}
                view={item?.views}
                title={item?.titleKo}
                time={moment(item.publication_date).format(
                  'YY.MM.DD a h:MM',
                )}
                primaryTicker={item.primaryTicker}
                image={{ uri:item?.logo ||`https://storage.googleapis.com/pickhaeju-static/logo/${item?.ticker}.png`}}
                 isCircular={true}
                 onPress={() => {
                  navigation.navigate('NewsDetails', { id: item._id});
                }}
              />
            </View>
          )
        }}
      />
        {/* <View style={styles.upButtonWrapper}>
        <TouchableOpacity  onPress={()=>{
           props.scrollRef.current.scrollToOffset({ animated: true, offset: 0 })
        }}>
          <Image
            source={assets.topButton}
            style={styles.upIcon}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default PickNews;
