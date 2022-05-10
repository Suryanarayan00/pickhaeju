import React, { useState, useEffect } from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';
import WritePickItem from '#components/WritePickItem';
import { getMyThreads } from '../../common/threadApi';
import { getUserPick } from '../../common/usersApi';

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
  pickWrapper: {
    paddingHorizontal: 20,
    borderBottomColor: colors.paleGrey,
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 18,
  },
});

const WritePostListView = ({ chart }) => {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const route = useRoute();
  const [data, setData] = useState({ threads: [] });

  const loadData = async (userId) => {
    if (userId) {
      const data = await getUserPick(userId);
      setData(data.docs);
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

  return (
    <FlatList
      data={data || []}
      style={{ flex: 1, backgroundColor: '#fff' }}
      contentContainerStyle={{ flexGrow: 1 }}
      // onEndReached={loadNewThreads}
      // onEndReachedThreshold={0.4}
      renderItem={({ item, index }) => (
        <WritePickItem item={item} chart={true} />
      )}
    />
  );
};

export default WritePostListView;
