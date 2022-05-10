import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import colors from '#common/colors';
import ReplyBlock from '#components/ReplyBlock';
import assets from '../../assets';
import { useNavigation } from '@react-navigation/native';
import WriteCommentItem from '#components/WriteCommentItem';
import { useSelector } from 'react-redux';
import { toastShow } from '#data/toast/ToastAction';
import { useDispatch } from 'react-redux';
const styles = StyleSheet.create({
  container: { marginTop: 10 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13.5,
    backgroundColor: colors.white,
  },
  moreButton: {
    fontSize: 12,
    color: colors.blueGrey,
    letterSpacing: -0.3,
  },
  arrowIcon: {
    width: 6,
    height: 4,
    marginLeft: 5,
  },
  moreButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ProfileComment = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // const userInfo = useSelector((state) => state.auth.principal.userInfo);

  return (
    <FlatList
      data={props?.data?.slice(0, 3) || []}
      keyExtractor={(item, index) => index}
      contentContainerStyle={{ marginTop: 10 }}
      scrollEnabled={false}
      ListEmptyComponent={() => {
        return (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>작성된 댓글이 없습니다</Text>
          </View>
        );
      }}
      renderItem={({ item, index }) => <WriteCommentItem item={item} />}
      ListFooterComponent={
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.moreButtonWrapper}
            activeOpacity={0.85}
            onPress={() => {
              if(props?.data?.length == 0)
              dispatch(toastShow('작성된 댓글이 없습니다.​​'));
              else
              navigation.navigate('WriteCommentListView', { data: props.data });
            }}
          >
            <Text style={styles.moreButton}>더보기</Text>
            <Image source={assets.arrow_down_gray} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
      }
    />
  );
};

export default ProfileComment;
