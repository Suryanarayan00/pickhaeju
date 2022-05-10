import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
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
import TickerSearch from '#components/TickerSearch';
import WatchlistPopUp from '#components/WatchListPopUp';
import { useNavigation, useRoute } from '@react-navigation/native';
import PortfolioPopUp from '#components/PortfolioPopUp';
import { searchtickers } from '#common/dataApi';
import {useSelector} from 'react-redux';
import { getPortfolio } from '../../common/portfolioApi';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import {
  getAutoSave,
  getRecentKeywords,
  removeAllRecentKeyword,
  removeRecentKeyword,
  saveAutoSave,
  saveRecentKeywords,
} from '../../utils/recent.keyword';

const styles = StyleSheet.create({
  textInputWrapper: {
    height: 50,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    marginTop: 12,
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
  container: { backgroundColor: colors.white, flexGrow: 1, flex: 1 },
  textInput: {
    fontSize: 19,
    letterSpacing: -0.48,
    flex: 1,
  },
  searchButton: {
    paddingHorizontal: 14,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    width: 18,
    height: 18,
  },
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

  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 211,
    backgroundColor: 'white',
  },

  emptyIcon: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: colors.lightPeriwinkle,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyIconInner1: {
    width: 2,
    height: 10,
    borderRadius: 1,
    backgroundColor: colors.lightPeriwinkle,
    marginBottom: 3,
  },
  emptyIconInner2: {
    width: 2,
    height: 3,
    borderRadius: 1,
    backgroundColor: colors.lightPeriwinkle,
  },
  emptyMessage: {
    fontSize: 13.8,
    letterSpacing: -0.34,
    color: colors.cloudyBlueTwo,
    marginTop: 29,
  },
});

 const PortfolioSearch = ({ onSelect }) => {
  const [keyword, setKeyword] = useState('');
  const [focused, setFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [watchForAdd, setWatcForAdd] = useState();
  const [autoSave, setAutoSave] = useState(true);
  const [recentKeywords, setRecentKeywords] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const navigatior = useNavigation();

  const route = useRoute();

  const userId = useSelector((state) => state.auth?.principal?.userId);

  const { params: { isWatchList, mode } = {} } = route;

  console.log('PortfolioSearch', !!(isWatchList && !!watchForAdd), {
    isWatchList,
    watchForAdd,
  });
  const [portfolioList, setPortfolioList] = useState([]);

  const refreshPortfolio = async () => {
    const portfolio = await getPortfolio(userId);
    setPortfolioList(portfolio || []);
  };
  useEffect(() => {
    refreshPortfolio();
    getRecentKeywords().then((keywords) => {
      setRecentKeywords(keywords || []);
    });

    getAutoSave().then((autoSave) => {
      setAutoSave(autoSave);
    });
  }, []);

  useEffect(() => {
    if (mode === 'search')
      navigatior.setOptions({
        title: '종목 검색하기',
      });
  }, []);

  const onRemove = async (index) => {
    const list = await removeRecentKeyword(index);
    setRecentKeywords(list);
  };

  const optionsClear = async () => {
    await removeAllRecentKeyword();
    setRecentKeywords([]);
  };

  const onSearch = async (keyword) => {
      if (!keyword) return;
    if (autoSave) {
      const list = await saveRecentKeywords(keyword);
      setRecentKeywords(list);
    }
    const searchResult = await searchtickers(keyword);
    setSearchResult(searchResult);
  };

  //Get Search on Every Key Press
  const onSearchPress= async (keyword) => {
    const searchResult = await searchtickers(keyword);
    setSearchResult(searchResult);
    console.log(searchResult);

  };

  const autoSaveColor = autoSave ? 'rgb(155, 79, 209)' : 'rgb(178,182,202)';

   return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', position:'relative', zIndex:99,elevation:99 }}>
      <View style={styles.container}>
        <View
          style={[
            styles.textInputWrapper,
            {
              borderBottomColor: focused
                ? colors.lightIndigo
                : colors.lightPeriwinkle,
            },
          ]}
        >
          <TextInput
            placeholder={'종목 검색'}
            value={keyword}
            onChangeText={(keyword) => {
              onSearchPress(keyword);
              setKeyword(keyword)
            }}
            style={styles.textInput}
            onSubmitEditing={() => onSearch(keyword)}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
           <TouchableOpacity
            style={[styles.searchButton]}
            onPress={() => onSearch(keyword)}
          >
            <Image
              source={assets.icon_search_color}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{ marginTop: 12, flex: 1 }}
          contentContainerStyle={{
            backgroundColor: 'white', // colors.paleGreyFour,
            flexGrow: 1,
          }}
        >
          {/*empty contents*/}
          {(!searchResult || searchResult?.length == 0) &&
            (!recentKeywords || recentKeywords?.length == 0) && (
              <View style={styles.emptyContainer}>
                <View style={styles.emptyIcon}>
                  <View style={styles.emptyIconInner1} />
                  <View style={styles.emptyIconInner2} />
                </View>
                <Text style={styles.emptyMessage}>
                  최근 검색어 내역이 없습니다.
                </Text>
              </View>
            )}
          {recentKeywords.map?.(({ keyword, date }, index) => (
            <LatestSearch
              key={`keyword_${index}`}
              name={keyword}
              date={date}
              onPress={() => {
                setKeyword(keyword);
                onSearch(keyword);
              }}
              onRemove={() => onRemove(index)}
            />
          ))}
           {searchResult.map?.((item, index) => (
            <TickerSearch
              name={item?.name}
              nameKo={item?.nameKo}
              ticker={item?.ticker}
              onPress={() => {
                if (mode === 'search') {
                  console.log('generalgeneral', item);
                  navigatior.navigate('PortfolioDetailsTab', {
                    general: item,
                  });
                  return;
                }
              
                if (typeof onSelect === 'function') {
                  onSelect(item?.ticker);
                } else {
                  setWatcForAdd(item?.ticker);
                }
              }}
            />
          ))}
        </ScrollView>

         <PortfolioPopUp
          isVisible={!!(!isWatchList && !!watchForAdd)}
          watchForAdd={watchForAdd}
          isFromSetting={mode === 'setting'? true : false}
          onCancel={(hasSave) => {
            setWatcForAdd(null);
            if (hasSave) navigatior.pop();
          }}
          portfolioData={portfolioList}
        />
        
        <WatchlistPopUp
          isVisible={!!(isWatchList && !!watchForAdd)}
          watchForAdd={watchForAdd}
          onCancelButton={() => setWatcForAdd(null)}
          onCancel={(hasSave) => {
            setWatcForAdd(null);
            console.log(hasSave);
            if (hasSave) navigatior.pop();
          }}
        />

        <View style={{ paddingBottom: 40,marginBottom: focused == true ? 220 : 0 }}>
          <View style={styles.footer}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.deleteWrapper}
              onPress={optionsClear}
            >
              <Image source={assets.icon_trash} style={styles.closeIcon} />
              <Text style={styles.deleteText}>전체삭제</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.autoSaveButton}
              onPress={() =>
                saveAutoSave(!autoSave).then((autoSave) =>
                  setAutoSave(autoSave),
                )
              }
            >
              <Image
                source={assets.join_check}
                style={[
                  styles.checkIcon,
                  {
                    tintColor: autoSaveColor,
                  },
                ]}
              />
              <Text style={[styles.autoSaveText, { color: autoSaveColor }]}>
                자동저장 {autoSave ? '끄기' : '켜기'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PortfolioSearch;
