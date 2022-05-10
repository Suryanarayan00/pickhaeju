import React, { useEffect, useState, useMemo, useRef } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PickListItem from '#components/PickListItem';
import colors from '#common/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { restApi } from '../../common/api';
import Document from '#components/Document';
import { getMyThreads } from '../../common/threadApi';
import { getUserPick } from '../../common/usersApi';
import WritePickItem from '#components/WritePickItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
import assets from '../../../assets';

const styles = StyleSheet.create({
  pickWrapper: {
    borderBottomColor: colors.paleGrey,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 18,
    paddingLeft: 160,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: colors.lightIndigo,
  },
  header: {
    backgroundColor: colors.violetBlue,
    marginTop: 60,
    height: 45,
    width: '100%',
    justifyContent: 'center',
    paddingLeft: 160,
  },
  header2: {
    backgroundColor: '#8537bc',
    height: 57,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 160,
  },
  writeButton: {
    borderRadius: 15,
    backgroundColor: colors.aqua,
    paddingHorizontal: 20,
    paddingVertical: 7,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  stockName: {
    fontSize: 12,
    paddingTop: 6,
    color: colors.dark,
  },
  pickWrapper2: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingLeft: 150,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.paleGrey,
  },
  pickFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: colors.white,
  },
  pickIcon: {
    marginRight: 6,
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 4,
    width: 40,
    height: 18,
  },
  moreButton: {
    color: colors.blueGrey,
    fontSize: 12,
  },
  subText: {
    flexDirection: 'row',
    marginTop: 5,
    marginRight: 10,
    width: 50,
    alignItems: 'center',
  },
  stockImage: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  pickContents: {
    paddingLeft: 17,
    flex: 1,
    justifyContent: 'center',
  },
  pickTitle: { fontSize: 14, color: colors.dark },
  pickWriter: { fontSize: 12, color: colors.dark, marginRight: 5 },
  pickTime: { fontSize: 12, color: colors.blueGrey },
  pickIconArea: { flexDirection: 'row', alignItems: 'center' },
  iconText: { color: colors.white, fontSize: 11, letterSpacing: -0.55 },
  chartIcon: { width: 18, height: 18 },

  downIcon: {
    width: 5,
    height: 4,
    marginLeft: 5,
  },
});

// const data = [
//   {
//     id: 3,
//     title: 'dfd',
//   },
// ];
const dataHeader = [
  {
    uri: 'https://pgnqdrjultom1827145.cdn.ntruss.com/img/02/aa/02aa082830c02f5b1326651eaaf4401785e1e7c8ecfc65eda5510bc8328b8fb9_v1.jpg',
  },
  {
    uri: 'https://www.google.com/search?q=image&sxsrf=ALeKk020-ZqQ6wgMny2eGldrt2uNVKVK8g:1615896734168&tbm=isch&source=iu&ictx=1&fir=gxFxsvFBmxeZ9M%252C0JWe7yDOKrVFAM%252C_&vet=1&usg=AI4_-kReDzFRmzDAOj_DsRSOvMu2NwesqQ&sa=X&ved=2ahUKEwjfv9W25LTvAhXEad4KHTNMDdIQ9QF6BAgUEAE#imgrc=gxFxsvFBmxeZ9M',
  },
  {
    uri: 'https://pgnqdrjultom1827145.cdn.ntruss.com/img/02/aa/02aa082830c02f5b1326651eaaf4401785e1e7c8ecfc65eda5510bc8328b8fb9_v1.jpg',
  },
  {
    uri: 'https://pgnqdrjultom1827145.cdn.ntruss.com/img/02/aa/02aa082830c02f5b1326651eaaf4401785e1e7c8ecfc65eda5510bc8328b8fb9_v1.jpg',
  },
  {
    uri: 'https://pgnqdrjultom1827145.cdn.ntruss.com/img/02/aa/02aa082830c02f5b1326651eaaf4401785e1e7c8ecfc65eda5510bc8328b8fb9_v1.jpg',
  },
];

const pickerItems = [
  { text: '최신순', value: 'updatedAt' },
  { text: '조회순', value: 'view' },
  { text: '댓글순', value: 'comments_count' },
  { text: '공감순', value: 'likes_count' },
];

const PickIndex = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = useState({ threads: [] });

  const loadData = async (userId) => {
    if (userId) {
      const data = await getUserPick(userId);
      setData(data.threads);
    } else {
      const {
        data: { docs },
      } = await getMyThreads();

      setData(docs || []);
    }

    // const { data } = await restApi.post(`/users/thread/threads`, {
    //   count: 3,
    //   next: next,
    // });

    // setData((s) => {
    //   console.log('SSSS', s, ...data.threads);
    //   const newThreads = [...s, ...data.threads].map?.((v) => ({
    //     ...v,
    //     isFavorite: false,
    //   }));
    //   return [...data.threads, newThreads];
    // });

    console.log('threads', data);
  };

  useEffect(() => {
    loadData(route?.params?.userId).catch(console.warn);
  }, []);

  useEffect(() => {
    if (route.params?.refresh) {
      loadData(route?.params?.userId).catch(console.warn);
      navigation.setParams({ refresh: false });
    }
  }, [navigation, route]);

  return (
    <Document>
      <View style={{ marginTop: 10, flex: 1 }}>
        <View style={styles.header}>
          <Text style={{ color: 'white', fontSize: 12 }}>
            내가 작성한 PICK 관리
          </Text>
        </View>

        <View style={styles.header2}>
          <TouchableOpacity
            style={styles.writeButton}
            onPress={() => {
              navigation.navigate('PickWrite');
            }}
          >
            <Image
              source={assets.icon_write_white}
              style={{
                width: 10,
                height: 10,
                marginRight: 5,
                tintColor: colors.dark,
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                color: colors.dark,
                fontSize: 12,
                marginTop: 3,
                fontFamily: 'Roboto-Bold',
                // fontWeight: 'bold',
              }}
            >
              PICK 작성
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pickWrapper2}>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <View style={styles.stockImage} />
            <Text style={styles.pickTime}>주 종목</Text>
          </View>
          <View style={styles.pickContents}>
            <Text
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={styles.pickTime}
            >
              제목
            </Text>
          </View>

          <View style={[styles.subText, { width: 70 }]}>
            <Text style={styles.pickTime}>작성일</Text>
          </View>

          <View style={styles.subText}>
            <Text style={styles.pickTime}>조회</Text>
          </View>

          <View style={styles.subText}>
            <Text style={styles.pickTime}>좋아요</Text>
          </View>

          <View style={styles.subText}>
            <Text style={styles.pickTime}>스크랩</Text>
          </View>

          <View
            style={[styles.subText, { width: 40, justifyContent: 'center' }]}
          >
            <Text style={styles.pickTime}>상태</Text>
          </View>
        </View>

        <FlatList
          data={data || []}
          style={{ flex: 1, backgroundColor: '#fff', paddingLeft: 130 }}
          contentContainerStyle={{ flexGrow: 1 }}
          // onEndReached={loadNewThreads}
          // onEndReachedThreshold={0.4}
          renderItem={({ item, index }) => (
            <WritePickItem item={item} chart={true} />
          )}
        />
      </View>
    </Document>
  );
};

export default PickIndex;
