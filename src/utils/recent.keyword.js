import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

const KEY_RECENT_KEYWORDS = 'item_recent_search';
const KEY_AUTO_SAVE_OFF = 'auto_save_off';
export const getRecentKeywords = async () => {
  const result = await AsyncStorage.getItem(KEY_RECENT_KEYWORDS);
  return JSON.parse(result || '[]');
};
export const saveRecentKeywords = async (keyword) => {
  const list = await getRecentKeywords();
  const date = moment().format('MM.DD');
  const _list = [
    {
      keyword,
      date,
    },
    ...list,
  ].filter(
    ({ keyword }, index, a) =>
      a.findIndex((r) => r.keyword.toLowerCase() === keyword.toLowerCase()) ===
      index,
  );
  await AsyncStorage.setItem(KEY_RECENT_KEYWORDS, JSON.stringify(_list));

  console.log(_list);
  return _list;
};

export const removeRecentKeyword = async (index) => {
  const list = await getRecentKeywords();
  if (index > -1) list.splice(index, 1);
  await AsyncStorage.setItem(KEY_RECENT_KEYWORDS, JSON.stringify(list));
  return list;
};

export const removeAllRecentKeyword = async () => {
  await AsyncStorage.setItem(KEY_RECENT_KEYWORDS, JSON.stringify([]));
};

export const getAutoSave = async () => {
  const result = await AsyncStorage.getItem(KEY_AUTO_SAVE_OFF);
  return !result;
};

export const saveAutoSave = async (autoSave) => {
  if (!autoSave) {
    await AsyncStorage.setItem(KEY_AUTO_SAVE_OFF, 'true');
  } else {
    await AsyncStorage.removeItem(KEY_AUTO_SAVE_OFF);
  }
  return await getAutoSave();
};
