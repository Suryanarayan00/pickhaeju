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
import { useNavigation } from '@react-navigation/native';

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
const data = [
  { id: 'dfda', title: 'dfda' },
  { id: 'dfds', title: 'dfds' },
  { id: 'dfdt', title: 'dfdt' },
  { id: 'dfdy', title: 'dfdy' },
];
const CommentPostListView = (props) => {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  return (
    <FlatList
      data={data}
      style={{ flex: 1, backgroundColor: '#fff' }}
      contentContainerStyle={{ flexGrow: 1 }}
      renderItem={({ item, index }) => (
        <View style={styles.pickWrapper}>
          <PickListItem
            onPress={() => {
              navigation.navigate('PickDetails');
            }}
          />
        </View>
      )}
    />
  );
};

export default CommentPostListView;
