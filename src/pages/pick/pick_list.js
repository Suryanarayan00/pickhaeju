import React, { useState, useEffect, useRef } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PickUser from '#components/PickUser';
import colors from '#common/colors';
import ReplyBlock from '#components/ReplyBlock';
import DefaultButton from '#components/Button/DefaultButton';
import AddComment from '#components/Input/AddComment';
import assets from '../../../assets';
import CheckButton from '#components/Button/CheckButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NewsListItem from '#components/NewsListItem';
import PickListItem from '#components/PickListItem';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getTickersThread } from '../../common/threadApi';

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

const PickListView = (props) => {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const [threads, setThreads] = useState([]);
  const route = useRoute();
  const currentPage = useRef(0);
  const isLoading = useRef(false);
  const loadData = async (next) => {
    if (isLoading.current) return;
    currentPage.current++;
    isLoading.current = true;

    if (route?.params?.tickers) {
      const thread = await getTickersThread(
        route?.params?.tickers,
        20,
        currentPage.current,
      );

      setThreads((s) => {
        const newThreads = [...s, ...thread].map?.((v) => ({
          ...v,
          isFavorite: false,
        }));
        console.log('loadData', newThreads, route?.params?.tickers);
        return newThreads;
      });
      isLoading.current = false;
    } else {
      isLoading.current = false;
      setThreads([]);
    }
    // todo : list request count not works.
  };

  const loadNextThreads = () => {
    loadData().catch(console.warn);
  };

  useEffect(() => {
    loadData(undefined).catch(console.warn);
  }, [route?.params?.tickers]);

  return (
    <FlatList
      data={threads}
      style={{ height: 10, backgroundColor: '#fff' }}
      contentContainerStyle={{ flexGrow: 1 }}
      onEndReached={() => loadNextThreads()}
      renderItem={({ item, index }) => (
        <View style={styles.pickWrapper}>
          <PickListItem
            item={item}
            onPress={() => {
              navigation.navigate('PickDetails', { threadId: item?._id });
            }}
          />
        </View>
      )}
    />
  );
};

export default PickListView;
