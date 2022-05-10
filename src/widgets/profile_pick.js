import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import colors from '#common/colors';
import assets from '../../assets';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import WritePickItem from '#components/WritePickItem';
import { restApi } from '../common/api';
import { getMyThreads } from '../common/threadApi';
import { useSelector } from 'react-redux';
import { toastShow } from '#data/toast/ToastAction';
import { useDispatch } from 'react-redux';

const styles = StyleSheet.create({
  stockName: {
    fontSize: 12,
    paddingTop: 6,
    color: colors.dark,
  },
  pickWrapper: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
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
  },
  stockImage: {
    width: 30,
    height: 30,
  },
  pickContents: {
    paddingLeft: 17,
    flex: 1,
    justifyContent: 'center',
  },
  pickTitle: { fontSize: 14, color: colors.dark },
  pickWriter: { fontSize: 12, color: colors.dark, marginRight: 5 },
  pickTime: { fontSize: 12, color: colors.dark },
  pickIconArea: { flexDirection: 'row', alignItems: 'center' },
  iconText: { color: colors.white, fontSize: 11, letterSpacing: -0.55 },
  chartIcon: { width: 18, height: 18 },

  downIcon: {
    width: 5,
    height: 4,
    marginLeft: 5,
  },
});

const ProfilePick = (props) => {
  const { chart, threads, userId } = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState(props?.threads);
  const userInfo = useSelector((state) => state.auth.principal);

  const loadData = async (userId) => {
    const { data } = await getMyThreads();
    console.log('My Thread Data');
    console.log(data);
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
    // setData(data.result);
    console.log('threads', props);
  };

  useEffect(() => {
    loadData(userId).catch(console.warn);
  }, []);
  return (
    <FlatList
      data={threads?.slice(0, 3) || []}
      extraData={threads}
      keyExtractor={(item, index) => `${index}`}
      contentContainerStyle={{ marginTop: 2 }}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
      ListEmptyComponent={() => {
        return (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5,
            }}
          >
            <Text>PICK이 없습니다.</Text>
          </View>
        );
      }}
       renderItem={({ item, index }) => (
        <WritePickItem item={item} chart={chart} />
       )}
      ListFooterComponent={
        <TouchableOpacity
          onPress={() => {
            if(threads?.length == 0)
             dispatch(toastShow('작성된 PICK이 없습니다.​'));
            else
            navigation.navigate('WritePostListView', { userId });
          }}
          activeOpacity={0.85}
          style={styles.pickFooter}
         >
          <Text style={styles.moreButton}>더보기</Text>
          <Image source={assets.arrow_down_gray} style={styles.downIcon} />
        </TouchableOpacity>
      }
    />
  );
};
export default ProfilePick;
