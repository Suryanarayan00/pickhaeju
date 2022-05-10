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
import NewsScrapListItem from '#components/NewsScrapListItem';
import { useNavigation, useRoute } from '@react-navigation/native';
import { restApi } from '../../common/api';
import moment from 'moment';

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

const ScrapNewsList = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  let newsList = route.params?.data || [];
  const [newsArr, setNewsArr] = useState(newsList);

  return (
    <FlatList
      data={newsArr}
      style={{ flex: 1, backgroundColor: '#fff' }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <View style={styles.newsWrapper}>
           <NewsScrapListItem
            item={item}
            view={item?.views}
            title={item?.titleKo}
            time={moment(item?.publication_date).format('YYYY.MM.DD a h:MM')}
            primaryTicker={item?.ticker}
            image={{
              uri:
                item.logo ||
                `https://storage.googleapis.com/pickhaeju-static/logo/${item?.ticker}.png`,
            }}
            isCircular={true}
            onPress={() => {
              navigation.navigate('NewsDetails', { id: item?._id });
            }}
            deleteItem={(id) => {
              let arr = newsArr.filter(function (el) {
                return el._id !== id;
              });
              setNewsArr(arr);
            }}
          />
        </View>
      )}
    />
  );
};

export default ScrapNewsList;
