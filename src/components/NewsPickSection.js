import React, { useState, useRef, useEffect } from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import NewsListItem from '#components/NewsListItem';
import assets from '../../assets';
import PickListItem from '#components/PickListItem';
import colors from '#common/colors';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment';
import { restApi } from '../common/api';
import { getArticles } from '../common/article';
import { getTickersThread } from '../common/threadApi';
import { toastShow } from '#data/toast/ToastAction';
import { useDispatch } from 'react-redux';

const styles = StyleSheet.create({
  newsWrapper: {
    borderBottomColor: colors.paleGrey,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
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
  pickWrapper: {
    paddingHorizontal: 20,
    borderBottomColor: colors.paleGrey,
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 18,
  },
  pickFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 14,
  },
  moreButton: {
    fontSize: 12,
    color: colors.blueGrey,
    letterSpacing: -0.3,
  },
  arrowDownIcon: {
    width: 5,
    height: 4,
    marginLeft: 5,
  },
  title: { fontSize: 18, color: colors.dark },
});

const NewsPickSection = ({ tickers, newsY, pickY }) => {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const [articles, setArticles] = useState([]);
  const [threads, setThreads] = useState([]);
const dispatch = useDispatch();
  const loadData = async () => {
   if(tickers?.length > 0)
   {
    const articles = await getArticles(1, tickers);
    const threads = await getTickersThread(tickers,10,1);

    console.log('loadData', threads);

    // todo : list request count not works.
    setArticles(
      (articles || [])
        .map?.((v) => ({
          ...v,
          isFavorite: false,
          primaryTicker: v?.primaryTicker || v?.ticker || v?.tickers[0],
        }))
        .filter((_, i) => i < 3),
    );
    setThreads(threads?.filter((_, i) => i < 3));
   } 
   else
   {
    setArticles([]);
    setThreads([]); 
   }
  };

  useEffect(() => {
    loadData(undefined).catch(console.warn);
  }, [tickers]);

  return (
    <View style={{ paddingBottom: inset.bottom + 20 }}>
      <View
        style={styles.newsHeader}
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;
          if (newsY) newsY.current = layout.y;
        }}
      >
        <Text style={styles.title}>뉴스</Text>
      </View>
      <FlatList
        data={articles}
        keyExtractor={(item, index) => item._id}
        contentContainerStyle={{}}
        onEndReachedThreshold={0.4}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
              }}
            >
              <Text style={{color: colors.cloudyBlueTwo}}>뉴스가 없습니다.</Text>
            </View>
          );
        }}
        renderItem={({ item, index }) => {
          return (
             <View style={styles.newsWrapper}>
              <NewsListItem
                item={item}
                view={item.views}
                title={item.titleKo}
                time={moment(item.publication_date).format('YYYY.MM.DD a h:MM')}
                primaryTicker={item.primaryTicker}
                image={{
                  uri:
                    item.logo ||
                    `https://storage.googleapis.com/pickhaeju-static/logo/${item.primaryTicker}.png`,
                }}
                isCircular={true}
                onPress={() => {
                  navigation.navigate('NewsDetails', { id: item._id });
                }}
              />
            </View>
          );
        }}
        ListFooterComponent={
          <TouchableOpacity
            onPress={() => {
              if (tickers && articles?.length > 0) {
                navigation.navigate('NewsListView', { tickers });
              } else {
               // Alert.alert('안내', 'News가 없습니다.');
                dispatch(toastShow('뉴스가 없습니다.'));
              }
            }}
            activeOpacity={0.85}
            style={styles.pickFooter}
          >
            <Text style={styles.moreButton}>더보기</Text>
            <Image
              source={assets.arrow_down_gray}
              style={styles.arrowDownIcon}
            />
          </TouchableOpacity>
        }
      />

      <View
        style={styles.newsHeader}
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;
          if (pickY) pickY.current = layout.y;
        }}
      >
        <Text style={styles.title}>PICK</Text>
      </View>
      <FlatList
        data={threads}
        keyExtractor={(item, index) => item._id}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
              }}
            >
              <Text style={{color: colors.cloudyBlueTwo}}>PICK이 없습니다.</Text>
            </View>
          );
        }}
        contentContainerStyle={{}}
        renderItem={({ item, index }) => (
          <View style={styles.pickWrapper}>
            <PickListItem
              item={item}
              onPress={(threadData) => {
                navigation.navigate('PickDetails', { threadId: item._id });
              }}
            />
          </View>
        )}
         ListFooterComponent={
          <TouchableOpacity
            onPress={() => {
              if (tickers && threads?.length > 0) {
                navigation.navigate('PickListView', { tickers });
              } else {
                //dispatch(toastShow('보유중인 PICK이 없습니다.'));
                dispatch(toastShow('PICK이 없습니다.'));   
              }
            }}
            activeOpacity={0.85}
            style={styles.pickFooter}
          >
            <Text style={styles.moreButton}>더보기</Text>
            <Image
              source={assets.arrow_down_gray}
              style={styles.arrowDownIcon}
            />
           </TouchableOpacity>
        }
      />
    </View>
  );
};

export default NewsPickSection;
