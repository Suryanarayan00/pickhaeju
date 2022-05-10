import React, { useState } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import assets from '../../assets';
import colors from '#common/colors';
import ProfileRound from '#components/ProfileRound';

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
    paddingVertical: 13,
  },
  selectText: {
    flex: 1,
    letterSpacing: -0.35,
    fontSize: 14,
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
  userImage: { width: 62, height: 62, borderRadius: 31 },
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
const data = [
  { id: '1', name: '주린이' },
  { id: '2', name: '주린이다' },
  { id: '3', name: '주린이네' },
  { id: '4', name: '배우자' },
  { id: '5', name: '주식고수' },
  { id: '6', name: '소행성' },
  { id: '7', name: '주시기' },
];

const FollowerOther = (props) => {
  const [checked, setChecked] = useState();
  const [searchText, setSearchText] = useState('');
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
        <Text style={styles.countText}>145</Text>
      </View>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <View style={styles.itemWrapper}>
            <View style={styles.contentsWrapper}>
              <Image
                source={{
                  uri:
                    'https://cdn.mediasr.co.kr/news/photo/201910/54832_18280_4434.jpg',
                }}
                style={styles.userImage}
              />

              <Text style={styles.followUserName}>주린이박</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.85}
              style={
                checked ? styles.buttonWrapper_on : styles.buttonWrapper_off
              }
              onPress={() => {
                setChecked(!checked);
              }}
            >
              {checked ? (
                <Text style={styles.buttonText_on}>팔로잉</Text>
              ) : (
                <Text style={styles.buttonText_off}>팔로우</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default FollowerOther;
