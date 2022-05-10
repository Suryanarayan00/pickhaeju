import React, { useEffect, useRef, useState } from 'react';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NewsListItem from '#components/NewsListItem';
import { useNavigation, useRoute } from '@react-navigation/native';
import { restApi } from '../../common/api';
import moment from 'moment';
import { getArticles } from '../../common/article';

const styles = StyleSheet.create({
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomColor: colors.lightPeriwinkle,
    borderBottomWidth: 1,
    paddingBottom: 15,
    paddingTop: 32,
  },
  newsWrapper: {
    borderBottomColor: colors.paleGrey,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
  topHeader: {
    backgroundColor: 'rgb(136,62,189)',
  },
  logo: {
    width: 68,
    height: 25,
    marginLeft: 21,
  },
  headerRightText: {
    fontSize: 16,
    color: colors.blueGrey,
    marginRight: 20,
  },
  searchIcon: { width: 19, height: 19, marginRight: 23 },
  gearIcon: { width: 20, height: 20, marginRight: 23 },
  tabIcon: { width: 25, height: 25 },
});
// const data = [
//   { id: 'dfda', title: 'dfda' },
//   { id: 'dfds', title: 'dfds' },
//   { id: 'dfdt', title: 'dfdt' },
//   { id: 'dfdy', title: 'dfdy' },
// ];
const NewsListView = (props) => {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const route = useRoute();
  const [data, setData] = useState([]);
  const isLoading = useRef();
  const [articles, setArticles] = useState([]);
  const currentPage = useRef(0);
  // const loadData = async () => {
  //    if (isLoading.current) return;
  //   currentPage.current++;
  //   isLoading.current = true;
  //   const articles = await getArticles(
  //     currentPage.current,
  //     route?.params?.tickers,
  //     100,
  //   );
  //   const newArr = articles.map(v => ({...v, isFavorite: false}));
  //   setData(newArr);
  //   isLoading.current = false;
  //   // todo : list request count not works.
  //   // setArticles(
  //   //   (articles || []).map?.((v) => ({
  //   //     ...v,
  //   //     isFavorite: false,
  //   //     page: currentPage.current,
  //   //   })),
  //   // );
  // };

  const loadData = async () => {
    if (isLoading.current) return;
    currentPage.current++;
    isLoading.current = true;
     const { data } = await restApi.get(`api/v3/article/list`, {
      params: {
        limit: 10,
        page: currentPage.current,
        tickers: route?.params?.tickers.join(','),
        sort:'-publication_date'
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
        const newArticles = [...s.docs, ...data.docs].map?.((v) => 
      {
        console.log('Ticker Data');
        console.log(v.ticker);
        return ({
          ...v,
          isFavorite: false,
          primaryTicker: v?.primaryTicker || v?.ticker || v?.tickers[0],
        })
      }
       );
        console.log('datadatadata nextData', newArticles);
        return { ...data, docs: newArticles };
      });
    }
    isLoading.current = false;
  };

  const loadNextArticle = () => {
    console.log('loadNext', articles);
    loadData().catch(console.warn);
  };

  useEffect(() => {
    loadData(undefined).catch(console.warn);
  }, [route?.params?.tickers]);
  console.log('123123123', data);
  return (
    <FlatList
       data={data?.docs}
        extraData={data?.docs}
      style={{ flex: 1, backgroundColor: '#fff' }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyExtractor={(item) => item._id}
      onEndReached={loadNextArticle}
      onEndReachedThreshold={0.4}
      renderItem={({ item, index }) => (
        <View style={styles.newsWrapper}>
          <NewsListItem
            item={item}
            view={item?.view}
            title={item.titleKo}
            time={moment(item.publication_date).format('YYYY.MM.DD a h:MM')}
            primaryTicker={item.primaryTicker}
            image={{
              uri:
                item?.logo ||
                `https://storage.googleapis.com/pickhaeju-static/logo/${item?.ticker}.png`,
            }}
            isCircular={true}
            onPress={() => {
              navigation.navigate('NewsDetails', { id: item._id });
            }}
          />
        </View>
      )}
    />
  );
};

export default NewsListView;
