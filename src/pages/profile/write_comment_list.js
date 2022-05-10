import React from 'react';
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
import WriteCommentItem from '#components/WriteCommentItem';

const data = [
  { id: 'dfda', title: 'dfda' },
  { id: 'dfds', title: 'dfds' },
  { id: 'dfdt', title: 'dfdt' },
  { id: 'dfdy', title: 'dfdy' },
];
const WriteCommentListView = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const inset = useSafeAreaInsets();
  console.log('WriteCommentListView', route);
  return (
    <FlatList
      data={route.params?.data || []}
      keyExtractor={(item, index) => item.id}
      style={{ flex: 1, backgroundColor: '#fff' }}
      contentContainerStyle={{ flexGrow: 1 }}
      renderItem={({ item, index }) => <WriteCommentItem item={item} />}
    />
  );
};

export default WriteCommentListView;
