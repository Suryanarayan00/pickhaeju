import React from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import PickListItem from '#components/PickListItem';
import assets from '../../assets';
import { useNavigation } from '@react-navigation/native';
import colors from '#common/colors';

const styles = StyleSheet.create({
  pickWrapper: {
    paddingHorizontal: 20,
    borderBottomColor: colors.paleGrey,
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 18,
  },
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

const ProfileCommentPick = (props) => {
  const navigation = useNavigation();
  return (
    <FlatList
      data={[]}
      scrollEnabled={false}
      ListEmptyComponent={() => {
        return (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>작성된 댓글단 글이 없습니다</Text>
          </View>
        );
      }}
      contentContainerStyle={{ marginTop: 10 }}
      renderItem={({ item, index }) => (
        <View style={styles.pickWrapper}>
          <PickListItem
            onPress={() => {
              navigation.navigate('PickDetails');
            }}
          />
        </View>
      )}
      ListFooterComponent={
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CommentPostListView');
            }}
            style={styles.moreButtonWrapper}
            activeOpacity={0.85}
          >
            <Text style={styles.moreButton}>더보기</Text>
            <Image source={assets.arrow_down_gray} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
      }
    />
  );
};

export default ProfileCommentPick;
