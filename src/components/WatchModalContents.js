import React, { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
 import assets from '../../assets';
import colors from '#common/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { categoryColors, categoryIcons } from '../common/category';

 import { addCategory } from '../common/usersApi';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { me,WatchListAction,targetIndex} from '#data/auth/actions';
import { modifyWatchList, deleteWatchList } from '#common/usersApi';
import { toastShow } from '#data/toast/ToastAction';
import DeleteWatchListPopUp from '#components/DeleteWatchListPopUp';

const styles = StyleSheet.create({
  modalContainer: { paddingTop: 32 },
  modalTitle: {
    fontSize: 12,
    color: colors.greyBlue,
    fontFamily: 'Roboto-Bold',
    paddingHorizontal: 20,
  },
  titleInputWrapper: {
    height: 35,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightPeriwinkle,
    justifyContent: 'center',
    marginTop: 22,
    marginBottom: 21,
  },
  iconBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
    justifyContent: 'flex-start',
  },
  watchIcon: { width: 25, height: 25 },
  iconWrapper: {
    width: 56,
    height: 56,
    backgroundColor: colors.white,
    marginVertical: 3,
    marginHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapperOn: {
    borderColor: colors.veryLightBlueTwo,
    borderWidth: 0.5,

    shadowColor: 'rgb(32,32,32)',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0.8, height: 1.3 },
    shadowRadius: 2.5,

    elevation: 8,
    borderRadius: 7.5,
  },

  colorPallet: {
    width: 22,
    height: 22,
    borderRadius: 7.5,
  },

  colorWrapper: {
    width: 42,
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 14,
    borderRadius: 7.5,
  },

  colorWrapperOn: {
    borderColor: colors.veryLightBlueTwo,
    borderWidth: 0.5,
    backgroundColor: 'white',

    shadowColor: 'rgb(32,32,32)',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0.8, height: 1.3 },
    shadowRadius: 2.5,

    elevation: 8,
    borderRadius: 7.5,
  },

  colorBox: {
    marginHorizontal: 20,
    marginVertical: 6,
  },
  colorRow: {
    flexDirection: 'row',
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: colors.whiteThree,
    paddingTop: 14,
    width: '25%',
  },
  buttonFrame: {
    alignItems: 'center',
    width: '37.5%',
    justifyContent: 'center',
    paddingTop: 14,
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginTop: 24,
  },
  cancelText: { fontSize: 18, color: colors.battleshipGrey },
  saveText: { fontSize: 18, color: colors.white },
});
const WatchModalContents = ({
  onCancel,
  targetWatch,
  defaultTitle,
  onDelete,
  onEdit,
  onAddItem,
}) => {
  const inset = useSafeAreaInsets();
  const [watchTitle, setName] = useState(targetWatch?.name || defaultTitle);
  const [selectedIcon, setSelectedIcon] = useState(
    targetWatch?.icon || 'building',
  );
  const [selectedColor, setSelectedColor] = useState(
    targetWatch?.color || '#fd7061',
  );
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();
  //Set Random Selection
  useEffect(() => {
    //Category Randomize
    let iconArray = [];
    let colorArray = [];
    categoryIcons.map?.(({ icon, name }, index) => {
      iconArray.push(name);
    });
    const random = Math.floor(Math.random() * iconArray.length);
    setSelectedIcon(targetWatch?.icon || iconArray[random]);
    //Color Randomize
    categoryColors.map?.((row, index) => {
      colorArray.push(...row);
    });
    const randomColor = Math.floor(Math.random() * colorArray.length);
    setSelectedColor(targetWatch?.color || colorArray[randomColor]);
  }, []);
  const { principal , redwatchlist} = useSelector((s) => s.auth, shallowEqual);

  const onAdd = async () => {
    await addCategory({
      categoryName: watchTitle,
      colorIndex: selectedColor,
      iconIndex: selectedIcon,
    });
    await dispatch(WatchListAction(principal?.userId));
     onCancel();
     onAddItem();
  };


  const onModify = async () => {
    const targetIdx = redwatchlist?.findIndex(
      (x) => x === targetWatch,
    );
    const watchList = redwatchlist?.map?.((watch) => {
      if (watch === targetWatch) {
        return {
          ...watch,
          name: watchTitle,
          color: selectedColor,
          icon: selectedIcon,
        };
      }
      return { ...watch };
    });
   
    const {name,color,icon,_id,stocks}=watchList[targetIdx];
    await modifyWatchList(_id,
      {
        name,
        color,
        icon,
        stocks,
    });
    await dispatch(targetIndex(targetIdx));
    await dispatch(WatchListAction(principal?.userId));
    
    console.log({ targetIdx });
    onEdit(targetIdx);
    onCancel(true);
  };

  const onDeleteWatch = async () => {
    const targetIdx = redwatchlist?.findIndex(
      (x) => x._id === targetWatch._id,
    );
  console.log('Delete ID');
  console.log(targetIdx);
  console.log('targetIdx ID');
  console.log(targetWatch._id);
  console.log('RedWath');
  console.log(redwatchlist);
   await deleteWatchList(redwatchlist[targetIdx]?._id);
   await dispatch(targetIndex(targetIdx >0 ? targetIdx -1 : 0));

   await dispatch(WatchListAction(principal?.userId));
    console.log('onDeleteWatch');
    onDelete(targetIdx);
    onCancel(true);
  };

  //Check Watchlist Title Length
  const checkWatchListTitle = (nametitle) => {
    const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (check_kor.test(nametitle)) {
      if (nametitle.length > 8) {
        return dispatch(toastShow('제공된 문자 수를 초과하셨습니다.'))
      }
    } else {
      if (nametitle.length > 14) {
        return dispatch(toastShow('제공된 문자 수를 초과하셨습니다.'))
      }
    }
    setName(nametitle);
  };

  return (
    <>
      <View style={[styles.modalContainer]}>
        <Text style={styles.modalTitle}>관심목록 이름</Text>
        <View style={styles.titleInputWrapper}>
          <TextInput
            style={{ paddingTop: 0, fontSize: 18 }}
            value={watchTitle}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            onChangeText={(name) => checkWatchListTitle(name)}
            placeholder={'관심목록 이름을 지어주세요'}
            placeholderTextColor={colors.battleshipGrey + 50}
            maxLength={15}
          />
        </View>
        <View style={styles.iconBox}>
          {categoryIcons.map?.(({ icon, name }, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.85}
                style={[
                  styles.iconWrapper,
                  selectedIcon === name && styles.iconWrapperOn,
                ]}
                onPress={() => setSelectedIcon(name)}
              >
                <Image source={icon} style={styles.watchIcon} />
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.colorBox}>
          {categoryColors.map?.((row, index) => (
            <View key={index} style={styles.colorRow}>
              {row.map?.((color, colorIndex, a) => (
                <TouchableOpacity
                  key={`color_${colorIndex}`}
                  style={{ flex: 1 }}
                  onPress={() => setSelectedColor(color)}
                >
                  <View
                    style={[
                      styles.colorWrapper,
                      color == selectedColor && styles.colorWrapperOn,
                    ]}
                  >
                    <View
                      style={[styles.colorPallet, { backgroundColor: color }]}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.deleteButton, { paddingBottom: inset.bottom + 10 }]}
          onPress={() => {
            setIsVisible(true);
          }}
        >
          <Image
            source={assets.icon_delete_grey}
            style={{ width: 22, height: 24 }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonFrame,
            {
              backgroundColor: colors.lightPeriwinkleTwo,
              paddingBottom: inset.bottom + 20,
            },
          ]}
          onPress={onCancel}
          activeOpacity={0.85}
        >
          <Text style={styles.cancelText}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonFrame,
            {
              backgroundColor: colors.lightIndigo,
              paddingBottom: inset.bottom + 20,
            },
          ]}
          activeOpacity={0.85}
          onPress={targetWatch ? onModify : onAdd}
        >
          <Text style={styles.saveText}>저장</Text>
        </TouchableOpacity>

        <DeleteWatchListPopUp
        isVisible={isVisible}
        onCancel={() => {
          setIsVisible(false);
        }}
        onDelete={async () => {
          onDeleteWatch();
          setIsVisible(false);
        }}
      />


      </View>
    </>
  );
};

export default WatchModalContents;
