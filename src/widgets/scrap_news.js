import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import NewsListItem from '#components/NewsListItem';
import colors from '#common/colors';
import PickListItem from '#components/PickListItem';
import { useNavigation } from '@react-navigation/native';
import assets from '../../assets';

const styles = StyleSheet.create({
  newsWrapper: {
    borderBottomColor: colors.paleGrey,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
  container: { marginTop: 10 },
  pickFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: colors.white,
  },
  moreButton: {
    color: colors.blueGrey,
    fontSize: 12,
  },
  downIcon: {
    width: 5,
    height: 4,
    marginLeft: 5,
  },
});

const ScrapNews = (props) => {
  const { data } = props;
console.log('News data')
  console.log(data.slice(0, 3));

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        data={data.slice(0, 3)}
        ListEmptyComponent={() => {
          return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text>스크랩된 뉴스가 없습니다.</Text>
            </View>
          );
        }}
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          <View style={styles.newsWrapper}>
            <NewsListItem
              item={item}
              primaryTicker={item.ticker}
              image={{
                uri:
                  item.logo ||
                  `https://storage.googleapis.com/pickhaeju-static/logo/${item?.ticker}.png`,
              }}
              isCircular={true}
              onPress={() => {
                navigation.navigate('NewsDetails', { id: item._id });
              }}
            />
          </View>
        )}
        ListFooterComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ScrapNewsList', {
                data,
              });
            }}
            activeOpacity={0.85}
            style={styles.pickFooter}
          >
            <Text style={styles.moreButton}>더보기</Text>
            <Image source={assets.arrow_down_gray} style={styles.downIcon} />
          </TouchableOpacity>
        }
      />
    </View>
  );
};
export default ScrapNews;
