import React, { useState } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import assets from '../../assets';
import colors from '#common/colors';
import ProfileRound from '#components/ProfileRound';
import Assets from '../../assets';
import Modal from '#components/Modal';
import DeleteFollowerPopUp from '#components/DeleteFollowerPopUp';
import Document from '#components/Document';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  selectWrapper: {
    backgroundColor: colors.paleGreyFour,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 21,
    marginVertical: 5,
    marginTop: 20,
    paddingVertical: 10,
  },
  selectText: {
    flex: 1,
    letterSpacing: -0.35,
    fontSize: 14,
    padding: 0,
  },
  searchIcon: { width: 19, height: 19, marginLeft: 5 },
  followTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 21,
    marginTop: 22,
    marginBottom: 16,
  },
  followTitle: {
    fontSize: 16,
    letterSpacing: -0.4,
    color: colors.blackTwo,
    marginLeft: 10,
  },
  countText: {
    fontSize: 16,
    letterSpacing: -0.4,
    color: colors.lightIndigo,
    paddingLeft: 9,
  },
  followUserName: {
    fontSize: 12,
    color: colors.blueGrey,
    textAlign: 'center',
    letterSpacing: -0.54,
    marginLeft: 20,
  },
  userImage: { width: 62, height: 62, borderRadius: 31, borderWidth: 0.1 },
  listContainer: {
    marginHorizontal: 20,
  },
  deleteButtonWrapper: {
    maxWidth: 74,
    width: '100%',
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.cloudyBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 12,
    letterSpacing: -0.3,
    color: colors.blueyGrey,
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  contentsWrapper: { flexDirection: 'row', alignItems: 'center' },
  topHeader: {
    backgroundColor: colors.white,
  },
});

const FollowerMy = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const inset = useSafeAreaInsets();
  const { data } = props;
  return (
    <View style={styles.container}>
      <View style={styles.selectWrapper}>
        <TextInput
          style={styles.selectText}
          placeholderTextColor={colors.cloudyBlue}
          onChangeText={setSearchText}
          value={searchText}
          placeholder={'팔로워 검색'}
        />
        <TouchableOpacity activeOpacity={0.85}>
          <Image source={assets.icon_search_color} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.followTitleWrapper}>
        <Text style={styles.followTitle}>모든 팔로워</Text>
        <Text style={styles.countText}>{data?.length}</Text>
      </View>
      <FlatList
        data={
          data?.filter((data) => data.user?.name?.includes?.(searchText)) || []
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <View style={styles.itemWrapper}>
            <View style={styles.contentsWrapper}>
              <Image
                source={{
                  uri: item?.user.avatar,
                }}
                style={styles.userImage}
              />

              <Text style={styles.followUserName}>{item.user.name}</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.deleteButtonWrapper}
              onPress={() => setIsVisible(item)}
            >
              <Text style={styles.deleteButtonText}>삭제</Text>
            </TouchableOpacity>
            <DeleteFollowerPopUp
              isVisible={isVisible}
              onCancel={() => {
                setIsVisible(false);
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default FollowerMy;
