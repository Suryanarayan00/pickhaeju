import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '#common/colors';
import assets from '../../../assets';
import LatestSearch from '#components/LatestSearch';
import WatchlistPopUp from '#components/WatchListPopUp';

const styles = StyleSheet.create({
  textInputWrapper: {
    height: 35,
    marginHorizontal: 20,
    borderBottomWidth: 1,

    marginTop: 27,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  latestSearchTitle: {
    fontSize: 15,
    color: colors.dark,
    letterSpacing: -0.37,
    marginHorizontal: 0.5,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    marginHorizontal: 20,
    borderTopColor: colors.lightPeriwinkle,
    borderTopWidth: 1,
  },
  deleteWrapper: {
    flexDirection: 'row',
    marginRight: 21,
    alignItems: 'center',
  },
  deleteText: {
    fontSize: 14,
    letterSpacing: -0.34,
    color: colors.cloudyBlueTwo,
  },
  container: { backgroundColor: colors.white, flexGrow: 1 },
  textInput: {
    fontSize: 19,
    letterSpacing: -0.48,
    flex: 1,
    paddingBottom: 14,
  },
  searchIcon: { width: 18, height: 18, marginLeft: 15, marginBottom: 14 },
  latestSearchWrapper: {},
  closeIcon: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  autoSaveButton: { flexDirection: 'row', alignItems: 'center' },
  checkIcon: { width: 12, height: 8, marginRight: 11 },
  autoSaveText: {
    fontSize: 14,
    color: colors.lightIndigo,
    letterSpacing: -0.34,
  },
});
const Search = (props) => {
  const [focused, setFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View
        style={
          focused
            ? [
                styles.textInputWrapper,
                { borderBottomColor: colors.lightIndigo },
              ]
            : [
                styles.textInputWrapper,
                { borderBottomColor: colors.lightPeriwinkle },
              ]
        }
      >
        <TextInput
          placeholder={'종목 검색'}
          style={styles.textInput}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <Image source={assets.icon_search_color} style={styles.searchIcon} />
      </View>
      <ScrollView
        style={{ marginTop: 12, flex: 1 }}
        contentContainerStyle={{
          backgroundColor: colors.paleGreyFour,
          flexGrow: 1,
        }}
      >
        {/*empty contents*/}
        {/*<View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 211,
          }}
        >
          <Image
            source={{}}
            style={{
              width: 48,
              height: 48,
              backgroundColor: colors.lightPeriwinkle,
            }}
          />
          <Text
            style={{
              fontSize: 13.8,
              letterSpacing: -0.34,
              color: colors.cloudyBlueTwo,
              marginTop: 29,
            }}
          >
            최근 검색어 내역이 없습니다.
          </Text>
        </View>*/}

        <LatestSearch
          name={'TSL'}
          date={'12.30'}
          onPress={() => setIsVisible(true)}
        />
        <LatestSearch name={'TSLA'} date={'12.24'} />
        <LatestSearch name={'TSLAB'} date={'12.12'} />

        <LatestSearch name={'TSN'} />
        <LatestSearch name={'TSN'} />
        <LatestSearch name={'TSN'} />
        <LatestSearch name={'TSN'} />
        <LatestSearch name={'TSN'} />
        <WatchlistPopUp
          isVisible={isVisible}
          onCancel={() => {
            setIsVisible(false);
          }}
        />
      </ScrollView>
      <View style={{ flexGrow: 1 }}>
        <View style={styles.footer}>
          <TouchableOpacity activeOpacity={0.85} style={styles.deleteWrapper}>
            <Image source={assets.icon_trash} style={styles.closeIcon} />
            <Text style={styles.deleteText}>전체삭제</Text>
          </TouchableOpacity>
          {/*클릭에 따라 ? 자동저장 끄기 추가 필요. 회색 체크 아이콘은 아직 없습니다.*/}
          <TouchableOpacity activeOpacity={0.85} style={styles.autoSaveButton}>
            <Image source={assets.join_check} style={styles.checkIcon} />
            <Text style={styles.autoSaveText}>자동저장 켜기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Search;
