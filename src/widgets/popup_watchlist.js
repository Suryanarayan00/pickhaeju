import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import colors from '#common/colors';
import CheckButton from '#components/Button/CheckButton';
import { useDispatch, useSelector } from 'react-redux';
import { modifyWatchList, watchlistdata } from '../common/usersApi';
import { me, WatchListAction, targetIndex } from '../data/auth/actions';
import BottomModal from '#components/Modal/BottomModal';
import WatchModalContents from '#components/WatchModalContents';
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 15,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 9,
    paddingHorizontal: 20,
  },
  contentsText: {
    color: colors.dark,
    letterSpacing: -0.35,
    fontSize: 14,
    marginLeft: 10,
  },
  bottomButtonText: {
    fontSize: 16,
    letterSpacing: -0.4,
    paddingVertical: 18,
    textAlign: 'center',
  },
  buttonBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.lightPeriwinkle,
  },
  addButton: {
    flex: 1,
    borderRightColor: colors.lightPeriwinkle,
    borderRightWidth: 1,
  },
  containerStyle: { marginTop: 21, marginBottom: 32 },
});
const data = [
  {
    id: 'dfdf',
    title: 'dfdfs',
  },
  {
    id: 'dfs',
    title: 'dfa',
  },
];
const WatchlistPopUpTab = (props) => {
  const { onCancel, general } = props;
  const userInfo = useSelector((s) => s.auth?.principal);
  const navigation = useNavigation();

  const watchForAdd = [];
  const [checkedItems, setCheckedItems] = useState([]);
  const [isVisibleWatchCategory, setIsVisibleWatchCategory] = useState(false);
  const [watchdata, setWatchdata] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const userId=userInfo?.userId;
      // do something
     
      dispatch(WatchListAction(userId));
      watchlistdata(userId).then((data) => {
        setWatchdata(data);
      });
     const unsubscribe = navigation.addListener('focus', () => {
   
      StatusBar.setBarStyle('light-content');
     });
    return unsubscribe;
  }, [navigation]);


  console.log('userInfo', userInfo);
  const onCheck = (item, checked) => {
    if (checked) {
      const _checkedItems = [item, ...checkedItems].filter(
        (e, i, a) => a.findIndex((_e) => _e === e) == i,
      );
      setCheckedItems(_checkedItems);
      console.log('add', _checkedItems);
    } else if (!checked) {
      const _checkedItems = checkedItems.filter((e, i, a) => e !== item);
      setCheckedItems(_checkedItems);
      console.log('remove', _checkedItems);
    }
  };
  const onSave = async () => {
    const userId=userInfo?.userId;
    const watchList = watchdata?.map?.((watch) => {
      if (checkedItems.find((w) => w === watch)) {
        return {
          ...watch,
          stocks: [...(watch?.stocks || []), general?.ticker],
        };
      }
      return { ...watch, stocks: [...(watch?.stocks || [])] };
    });
    console.log('datadata', watchList);
    new Promise.all(
      watchList.length>0 && watchList.map(async (arrayData)=>{
        const {name,_id,stocks}=arrayData;
        await modifyWatchList(_id,
          {
          name,
          stocks,
        });
      })
    ).then(res =>{
    //   var max = matchedInx.reduce(function(a, b) {
    //     return Math.max(a, b);
    // }, 0);
    //  dispatch(targetIndex(max));
     dispatch(WatchListAction(userId));
       
      onCancel(true)});
  };
  console.log('checkedItems',watchdata);
  return (
    <View style={styles.container}>
       <FlatList
        keyExtractor={(item) => item.category}
        data={watchdata}
        contentContainerStyle={{ marginVertical: 20 }}
        renderItem={({ item, index }) => (
          <CheckButton
            style={styles.wrapper}
            checked={!!checkedItems.find((e) => e === item)}
            setChecked={(checked) => {
              console.log(
                'item!',
                item,
                item?.stocks?.includes(general?.ticker),
                general?.ticker,
              );
              if (item?.stocks?.includes(general?.ticker)) {
                Alert.alert(
                  '안내',
                  '해당 관심목록에 이미 추가되어 있는 종목입니다',
                );
              } else if (item?.stocks?.length > 19) {
                Alert.alert(
                  '안내',
                  '관심목록 종목을 20개 이상 추가하실 수 없습니다.',
                );
              } else {
                onCheck(item, checked);
              }
            }}
          >
            <Text style={styles.contentsText}>{item.name}</Text>
          </CheckButton>
        )}
      />
      <View style={styles.buttonBox}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.addButton}
          onPress={() => {
            setIsVisibleWatchCategory(true);
          }}
        >
          <Text style={[styles.bottomButtonText, { color: colors.blueyGrey }]}>
            관심목록 추가
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.85}
          style={{ flex: 1 }}
          onPress={onSave}
        >
          <Text
            style={[styles.bottomButtonText, { color: colors.lightIndigo }]}
          >
            저장
          </Text>
        </TouchableOpacity>
      </View>
      <BottomModal
        isVisible={isVisibleWatchCategory}
        onCancel={() => {
          setIsVisibleWatchCategory(false);
        }}
      >
        <WatchModalContents
          onCancel={() => {
            setIsVisibleWatchCategory(false);
          }}
        />
      </BottomModal>
    </View>
  );
};

export default WatchlistPopUpTab;
