import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '#common/colors';
import assets from '../../assets';
import { useSelector, useDispatch } from 'react-redux';
import { removeFollowing, addFollowing } from '../common/authApi';
import { me } from '../data/auth/actions';
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
  buttonWrapper_on: {
    maxWidth: 74,
    width: '100%',
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.lightIndigo,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper_off: {
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
  buttonText_on: {
    fontSize: 12,
    letterSpacing: -0.3,
    color: colors.white,
  },
  buttonText_off: {
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
});

const RnderItem = (props) => {
  const { item } = props;
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  return (
    <View style={styles.itemWrapper}>
      <View style={styles.contentsWrapper}>
        <Image
          source={{
            uri: item.avatar,
          }}
          style={styles.userImage}
        />

        <Text style={styles.followUserName}>{item.name}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.85}
        style={checked ? styles.buttonWrapper_on : styles.buttonWrapper_off}
        onPress={async () => {
          // setChecked(!checked);
          console.log('item!!', item);
          if (checked) {
            const res = await removeFollowing(item?.userId);
            dispatch(me());
            console.log('res', res);
            setChecked(!checked);
          } else {
            const res = await addFollowing(item.userId);
            dispatch(me());
            setChecked(!checked);
          }
        }}
      >
        {checked ? (
          <Text style={styles.buttonText_on}>팔로잉</Text>
        ) : (
          <Text style={styles.buttonText_off}>팔로우</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const FollowingMy = (props) => {
  const [searchText, setSearchText] = useState('');
  const { data } = props;
  const userInfo = useSelector((state) => state?.auth?.principal);
  console.log('data', data, userInfo);
  return (
    <View style={styles.container}>
      <View style={styles.selectWrapper}>
        <TextInput
          style={styles.selectText}
          placeholderTextColor={colors.cloudyBlue}
          value={searchText}
          onChangeText={setSearchText}
          placeholder={'팔로잉 검색'}
        />
        <TouchableOpacity activeOpacity={0.85}>
          <Image source={assets.icon_search_color} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.followTitleWrapper}>
        <Text style={styles.followTitle}>모든 팔로잉</Text>
        <Text style={styles.countText}>{data?.length}</Text>
      </View>
      <FlatList
        data={
          data?.filter((data) => data.user.name?.includes?.(searchText)) || []
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => <RnderItem item={item} />}
      />
    </View>
  );
};

export default FollowingMy;
