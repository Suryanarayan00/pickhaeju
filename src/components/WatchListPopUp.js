import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckButton from '#components/Button/CheckButton';
import colors from '#common/colors';
import React, { useState } from 'react';
import Modal from '#components/Modal';
import BottomModal from '#components/Modal/BottomModal';
import WatchModalContents from '#components/WatchModalContents';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { modifyWatchList } from '#common/usersApi';
import { me, SelectWatchList, WatchListAction, targetIndex } from '#data/auth/actions';
import { toastShow } from '#data/toast/ToastAction';

const styles = StyleSheet.create({
  container: {},
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
  headerTitle: {
    fontSize: 18,
    color: colors.dark,
  },
  buttonTopBorder: { height: 1, backgroundColor: colors.lightPeriwinkle },
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    paddingHorizontal: 20,
  },
});
const data = [
  { id: 'dfda', title: 'dfda' },
  { id: 'dfds', title: 'dfds' },
  { id: 'dfdt', title: 'dfdt' },
  { id: 'dfdy', title: 'dfdy' },
];
// Ryan's Comment : not sure how watchlist components work. Need to test it.
const WatchlistPopUp = ({
  isVisible,
  onCancel,
  watchForAdd,
  onCancelButton,
}) => {
  const { principal, redwatchlist } = useSelector((s) => s.auth, shallowEqual);
  
  
  const [isVisibleWatchCategory, setIsVisibleWatchCategory] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const onCheck = (item, checked) => {
    console.log(item, checked);
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

  const dispatch = useDispatch();

  const onSave = async () => {
    dispatch(SelectWatchList(checkedItems));
    let matchedInx=[];
    const watchList = redwatchlist?.map?.((watch,index) => {
      if (checkedItems.find((w) => w === watch)) {
        matchedInx.push(index);
        return {
          ...watch,
          stocks: [...(watch?.stocks || []), watchForAdd],
        };
      }
      return { ...watch, stocks: [...(watch?.stocks || [])] };
    });
    if (checkedItems?.length === 0) {
      return dispatch(toastShow('관심목록을 선택해 주세요.'));
      // Alert.alert('안내', '관심목록을 선택해 주세요.');
    }
    
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
      var max = matchedInx.reduce(function(a, b) {
        return Math.max(a, b);
    }, 0);
    dispatch(targetIndex(max));
     dispatch(WatchListAction(principal?.userId));
       
      onCancel(true)});

  };

  return (
    <Modal isVisible={isVisible} onCancel={onCancel}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>관심목록</Text>
          {/* <TouchableOpacity activeOpacity={0.85} onPress={onCancel}>
            <Image
              source={assets.icon_close_lg}
              style={{ width: 15, height: 15 }}
            />
          </TouchableOpacity> */}
        </View>
        <FlatList
          keyExtractor={(item) => item.name}
          data={redwatchlist}
          contentContainerStyle={{ marginVertical: 20 }}
          renderItem={({ item, index }) => (
            <CheckButton
              style={styles.wrapper}
              checked={!!checkedItems.find((e) => e === item)}
              setChecked={(checked) => {
                if (item?.stocks?.includes(watchForAdd)) {
                  // Alert.alert(
                  //   '안내',
                  //   '해당 워치리스트에 이미 추가되어 있는 종목입니다',
                  // );
                  return dispatch(
                    toastShow('해당 관심목록에 이미 추가되어 있는 종목입니다.'),
                  );
                } else if (item?.stocks?.length > 19) {
                  // Alert.alert(
                  //   '안내',
                  //   '워치리스트에 종목을 10개이상 추가하실 수 없습니다.',
                  // );
                  return dispatch(
                    toastShow('종목은 20개까지 추가할 수 있습니다.'),
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
            style={styles.addButton}
            onPress={() => {
              // setIsVisibleWatchCategory(true);
              onCancelButton();
            }}
          >
            <Text
              style={[
                styles.bottomButtonText,
                {
                  color: colors.blueyGrey,
                },
              ]}
            >
              취소
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }} onPress={onSave}>
            <Text
              style={[
                styles.bottomButtonText,
                {
                  color:
                    checkedItems.length > 0
                      ? colors.lightIndigo
                      : colors.blueyGrey,
                },
              ]}
            >
              저장
            </Text>
          </TouchableOpacity>
        </View>
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
    </Modal>
  );
};
export default WatchlistPopUp;
