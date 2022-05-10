import React, { useState } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput
} from 'react-native';
import colors from '#common/colors';
import assets from '../../../assets';
import CheckButton from '#components/Button/CheckButton';
import NotifyPopUp from '#components/NotifyPopUp';

const styles = StyleSheet.create({
  titleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 27,
  },
  arrowIcon: { width: 6, height: 10, marginRight: 12 },
  titleText: {
    fontSize: 18,
    letterSpacing: -0.45,
    color: colors.dark,
    marginRight: 11,
  },
  numText: { fontSize: 18, letterSpacing: -0.45, color: colors.blueyGrey },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginVertical: 14,
  },
  userName: { fontSize: 14, letterSpacing: -0.35, color: colors.greyBlue },
  alarmIcon: { width: 14, height: 18 },
  deleteWrapper: {
    backgroundColor: colors.greyBlue,
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: { width: 15, height: 15 },
  selectWrapper: {
    backgroundColor: colors.paleGreyFour,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 21,
    marginVertical: 5,
    paddingVertical: 10,
  },
  selectText: {
    flex: 1,
    letterSpacing: -0.35,
    fontSize: 14,
    padding: 0,
  },
  searchIcon: { width: 19, height: 19, marginLeft: 5 },
});
const data = [
  { id: 'dfda', title: 'dfda' },
  { id: 'dfds', title: 'dfds' },
  { id: 'dfdt', title: 'dfdt' },
  { id: 'dfdy', title: 'dfdy' },
];
const NotifyFollower = (props) => {
  const [onPressIcon, setOnPressIcon] = useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={styles.titleHeader}>
        {/* <Image source={assets.arrow_push_right} style={styles.arrowIcon} /> */}
        <Text style={styles.titleText}>팔로워</Text>
        <Text style={styles.numText}>3</Text>
      </View>
      <View style={styles.selectWrapper}>
        <TextInput
          style={styles.selectText}
          placeholderTextColor={colors.cloudyBlue}
          // onChangeText={setSearchText}

          // value={searchText}
          placeholder={'팔로워 검색'}
        />
        <TouchableOpacity activeOpacity={0.85}>
          <Image source={assets.icon_search_color} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        contentContainerStyle={{}}
        renderItem={({ item, index }) => (
          <View style={styles.wrapper}>
            <Text style={styles.userName}>건도리(asdf***)</Text>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => {
                setOnPressIcon(!onPressIcon);
              }}
            >
              <Image
                source={
                  onPressIcon ? assets.icon_alarm_on : assets.icon_alarm_off
                }
                style={styles.alarmIcon}
              />
            </TouchableOpacity>
          </View>
        )}
      />
      {/*삭제 버튼*/}
      {/* <View style={styles.wrapper}>
      <Text style={styles.userName}>건도리(asdf***)</Text>
      <View style={styles.deleteWrapper}>
        <Image source={assets.icon_trash} style={styles.deleteIcon} />
      </View>
    </View>*/}
    </View>
  );
};

export default NotifyFollower;
