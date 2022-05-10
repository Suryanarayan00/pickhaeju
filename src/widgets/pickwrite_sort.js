import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, Dimensions
} from 'react-native';
import React, { useState } from 'react';
import colors from '#common/colors';
import RadioButton from '#components/Button/RadioButton';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import assets from '../../assets';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSubStock,
  removeSubStock,
  setExclusivePick,
  setMainStock,
  setNormalPick,
  setPickTypeChecks,
} from '../data/pickWriteStore';
import Search from '../pages/portfolio/search';
import Modal from '#components/Modal';
import moment from 'moment';
import useInterval from '../hooks/useInterval';
import { toastShow } from '#data/toast/ToastAction';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  checkWrapper: {
    paddingLeft: 20,
    paddingRight: 26,
    flexDirection: 'row',
    paddingVertical: 13,
  },
  checkContents: {
    marginLeft: 10,
    fontSize: 14,
    letterSpacing: -0.35,
    color: colors.dark,
  },
  titleText: {
    fontSize: 16,
    letterSpacing: -0.4,
    color: colors.dark,
  },
  labelRequired: {
    color: '#f55867',
    marginLeft: 6,
  },
  saveMarkWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 18,
    letterSpacing: -0.45,
    color: colors.greyBlue,
    textAlign: 'center',
  },
  textButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 55,
  },
  saveMark: {
    fontSize: 14,
    letterSpacing: -0.35,
    color: colors.cloudyBlue,
    marginLeft: 10,
  },
  buttonWrapper_on: {
    height: 40,
    borderRadius: 20,
    borderColor: colors.lightIndigo,
    borderWidth: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonWrapper_off: {
    height: 40,
    borderRadius: 20,
    borderColor: colors.cloudyBlue,
    borderWidth: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText_on: {
    fontSize: 14,
    letterSpacing: -0.35,
    color: colors.lightIndigo,
    paddingLeft: 6,
  },
  buttonText_off: {
    fontSize: 14,
    letterSpacing: -0.35,
    color: colors.blueyGrey,
    paddingLeft: 6,
  },
  selectWrapper: {
    backgroundColor: colors.paleGreyFour,
    height: 40,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 21,
    marginVertical: 5,
  },
  selectText: {
    color: colors.cloudyBlue,
    letterSpacing: -0.35,
    fontSize: 14,
  },
  radioButtonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  radioWrapper: { flex: 1, marginHorizontal: 20 },
  titleHeader: {
    marginTop: 22,
    flexDirection: 'row',
    paddingHorizontal: 21,
    alignItems: 'center',
    marginBottom: 13,
  },
  questionIcon: {
    width: 16,
    height: 16,
    marginLeft: 6,
  },
  pickButtonArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  sortHeader: {
    marginTop: 31,
    paddingHorizontal: 21,
    marginBottom: 18,
  },
  searchIcon: { width: 19, height: 19 },
  saveIcon: { width: 21, height: 21 },
  pickButtonItem: { maxWidth: 155, width: '100%' },
  fullModalView: {
    width: '100%',
    height: '100%',
  },
  cancelImage: {
    width: 15,
    height: 15,
    marginRight: 25,
  },
  subStockView: {
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginRight: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelView: {
    borderRadius: 15 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 15,
    width: 15,
  },
  cancelLine1: {
    position: 'absolute',
    width: 10,
    height: 1,
    backgroundColor: '#000000',
    transform: [{ rotate: '45deg' }],
  },
  cancelLine2: {
    position: 'absolute',
    width: 10,
    height: 1,
    backgroundColor: '#000000',
    transform: [{ rotate: '-45deg' }],
  },
  bottomButtonText: {
    fontSize: 12,
    letterSpacing: -0.4,
    paddingVertical: 18,
    textAlign: 'center',
  },
  questionPopupView: {
    width: "95%", flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    alignSelf: 'center',
  },
  popupText: {
    lineHeight: 24,
    fontSize: 14,
  },
  popupHeaderText: { 
    fontSize: 18,
    color: colors.dark,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  }
});

export const pickOptionsTypes = [
  { value: 'buy', text: '매수 의견' },
  { value: 'sell', text: '매도 의견' },
  { value: 'hold', text: '중립 의견' },
  { value: 'marketcomment', text: '시황 의견' },
];

 const WriteSort = (props) => {
  const { normalPick, exclusivePick, pickTypeChecks, mainStock, subStock } =
    useSelector((state) => state.pickWriteStore);
  const dispatch = useDispatch();
  const [isMainStocksVisible, setIsMainStocksVisible] = useState(false);
  const [isSubStocksVisible, setIsSubStocksVisible] = useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [savedTime, setSavedTime] = React.useState(moment())
  const [isQuestionMark, setIsQuestionMark] = useState(false);


  // const [normalPick, setNormalPick] = useState(false);
  // const [exclusivePick, setExclusivePick] = useState(false);
  // const [pickTypeChecks, setPickTypeChecks] = useState(
  //   new Array(4).fill(false),
  // );
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();

  const onPressRadioButton = (index) => () => {
    dispatch(setPickTypeChecks(index));
  };

  const nextCheck = () => {
    if (
      (normalPick || exclusivePick) &&
      pickTypeChecks?.includes?.(true) &&
      mainStock
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onCloseMainStockModal = () => setIsMainStocksVisible(false);
  const onCloseSubStockModal = () => setIsSubStocksVisible(false);

  useInterval(() => {
    setIsSaving(true);
    setSavedTime(moment());
  }, 30000);

  React.useEffect(() => {
    setTimeout(() => {
      setIsSaving(false)
    }, 3000)
  }, [savedTime])

  console.log({ isSaving })

  const saveStatus = () => {
    if (isSaving) {
      return (
        <View style={[styles.saveMarkWrapper, { marginTop: 78 }]}>
          <Image source={assets.icon_sort_saving} style={styles.saveIcon} />
          <Text style={styles.saveMark}>Saving</Text>
        </View>
      );
    } else
      return (
        <View style={{ marginTop: 78 }}>
          <View style={styles.saveMarkWrapper}>
            <Image source={assets.icon_sort_saved} style={styles.saveIcon} />
            <Text style={styles.saveMark}>Saved</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <Text style={{ color: colors.cloudyBlue, }}>업데이트: {moment(savedTime).format('YYYY.MM.DD a h:MM')}</Text>
          </View>
        </View>
      );
  };


  return (
    <>
      <ScrollView style={{ flex: 1, paddingBottom: inset.bottom }}>
        <View style={styles.titleHeader}>
          <Text style={styles.titleText}>
            PICK <Text style={styles.titleText}>종류</Text>
          </Text>
          <TouchableOpacity activeOpacity={0.85} onPress={() => {
            // alert("demo")
            setIsQuestionMark(true);
          }}>
            <Image source={assets.icon_question} style={styles.questionIcon} />
          </TouchableOpacity>
          <Text style={[styles.titleText, styles.labelRequired]}>(필수)</Text>
        </View>
        <View style={styles.pickButtonArea}>
          <TouchableOpacity
            onPress={() => {
              if (!normalPick) {
                dispatch(setExclusivePick(false));
              }
              dispatch(setNormalPick(!normalPick));
            }}
            style={styles.pickButtonItem}
            activeOpacity={0.85}
          >
            <View
              style={
                normalPick ? styles.buttonWrapper_on : styles.buttonWrapper_off
              }
            >
              <Text
                style={
                  normalPick ? styles.buttonText_on : styles.buttonText_off
                }
              >
                일반 PICK
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!exclusivePick) {
                dispatch(setNormalPick(false));
              }
              dispatch(setExclusivePick(!exclusivePick));
            }}
            style={styles.pickButtonItem}
            activeOpacity={0.85}
          >
            <View
              style={
                exclusivePick
                  ? styles.buttonWrapper_on
                  : styles.buttonWrapper_off
              }
            >
              <Text
                style={
                  exclusivePick ? styles.buttonText_on : styles.buttonText_off
                }
              >
                단독 PICK
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.radioButtonBox}>
          <View style={[styles.radioWrapper, { alignItems: 'flex-end' }]}>
            <RadioButton
              color={colors.blueyGrey}
              checked={pickTypeChecks[0]}
              onPress={onPressRadioButton(0)}
            >
              {pickOptionsTypes[0].text}
            </RadioButton>
          </View>
          <View style={styles.radioWrapper}>
            <RadioButton
              color={colors.blueyGrey}
              checked={pickTypeChecks[1]}
              onPress={onPressRadioButton(1)}
            >
              {pickOptionsTypes[1].text}
            </RadioButton>
          </View>
        </View>
        <View style={styles.radioButtonBox}>
          <View style={[styles.radioWrapper, { alignItems: 'flex-end' }]}>
            <RadioButton
              color={colors.blueyGrey}
              checked={pickTypeChecks[2]}
              onPress={onPressRadioButton(2)}
            >
              {pickOptionsTypes[2].text}
            </RadioButton>
          </View>
          <View style={styles.radioWrapper}>
            <RadioButton
              color={colors.blueyGrey}
              checked={pickTypeChecks[3]}
              onPress={onPressRadioButton(3)}
            >
              {pickOptionsTypes[3].text}
            </RadioButton>
          </View>
        </View>

        <View style={styles.sortHeader}>
          <Text style={styles.titleText}>분류  
            <Text style={[styles.titleText, styles.labelRequired]}> (주 종목 필수)</Text>
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.selectWrapper}
          onPress={() => {
            // navigation.navigate('Search');
            setIsMainStocksVisible(true);
          }}
        >
          <Text style={styles.selectText}>
            {mainStock || '분석하실 주 종목을 선택해 주세요.'}
          </Text>
          <Image source={assets.icon_search_color} style={styles.searchIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.selectWrapper}
          onPress={() => {
            if (subStock?.length > 2) {
              return dispatch(toastShow('부 종목은 최대 3개까지만 선택 가능합니다.​'));

              //Alert.alert('안내', '부 종목은 최대 3개까지 등록 가능합니다');
              //return;
            }
            setIsSubStocksVisible(true);
          }}
        >
          {subStock?.length > 0 ? (
            <View style={{ flexDirection: 'row' }}>
              {subStock.map?.((data) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.subStockView}
                    onPress={() => dispatch(removeSubStock(data))}
                  >
                    <Text style={{ fontSize: 12, color: '#131523' }}>
                      {data}
                    </Text>
                    <View style={styles.cancelView}>
                      <View style={styles.cancelLine1} />
                      <View style={styles.cancelLine2} />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
              <Text style={styles.selectText}>
                분석하실 부 종목을 선택해 주세요.
              </Text>
            )}

          <Image source={assets.icon_search_color} style={styles.searchIcon} />
        </TouchableOpacity>
        {saveStatus()}
        <View
          style={[
            styles.textButtonWrapper,
            { paddingBottom: inset.bottom + 20 },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.85}
            style={{ flex: 1 }}
            onPress={() => {
              navigation.navigate('PickPreview');
            }}
          >
            <Text style={styles.textButton}>임시저장</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={0.85}
            onPress={() => props.setIndex(1)}
          >
            <Text style={[styles.textButton, { color: colors.lightIndigo }]}>
              다음
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal isVisible={isMainStocksVisible} containerStyle={{ width: '100%' }}>
        <SafeAreaView style={[styles.fullModalView, { paddingVertical: 15 }]}>
          <View
            style={{
              alignItems: 'flex-end',
              backgroundColor: 'white',
              paddingTop: 20,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onCloseMainStockModal}
            >
              <Image source={assets.icon_close_lg} style={styles.cancelImage} />
            </TouchableOpacity>
          </View>
          <Search
            onSelect={(ticker) => {
              dispatch(setMainStock(ticker));
              setIsMainStocksVisible(false);
            }}
          />
        </SafeAreaView>
      </Modal>
      <Modal isVisible={isSubStocksVisible} containerStyle={{ width: '100%' }}>
        <SafeAreaView style={[styles.fullModalView, { paddingVertical: 15 }]}>
          <View
            style={{
              alignItems: 'flex-end',
              backgroundColor: 'white',
              paddingTop: 20,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onCloseSubStockModal}
            >
              <Image source={assets.icon_close_lg} style={styles.cancelImage} />
            </TouchableOpacity>
          </View>
          <Search
            onSelect={(ticker) => {
              dispatch(addSubStock(ticker));
              setIsSubStocksVisible(false);
            }}
          />
        </SafeAreaView>
      </Modal>
      <Modal isVisible={isQuestionMark} containerStyle={{ width: '90%', backgroundColor: "white" }}>
        <SafeAreaView>
          <View>
            <View style={styles.questionPopupView}>
              <Text style={styles.popupHeaderText}>PICK 종류</Text>
              <TouchableOpacity style={{ position: 'absolute',
                    top: 18,
                    right: 10,}} onPress={() => {
                setIsQuestionMark(false);
              }}>
                <Image source={assets.icon_close_lg}
                  resizeMode='contain'
                  style={{
                    width: 16,
                    height: 18,
                  }} />
              </TouchableOpacity>
            </View>
            <View style={styles.questionPopupView}>
              <Text style={styles.popupText}>
                <Text
                  style={{ color: colors.lightIndigo, fontWeight: 'bold' }}>
                  일반 PICK이란?</Text> 픽해주 외 매체에 게시/배포될 수 있으나, 추후 경품 및 보상 대상에는 제외됩니다.</Text>
            </View>
            <View style={styles.questionPopupView}>
              <Text style={styles.popupText}>
                <Text
                  style={{ color: colors.lightIndigo, fontWeight: 'bold' }}>단독 PICK이란?</Text> 픽해주에만 게시되는 글이며, 추후 경품 및 보상을 받을 수 있습니다.</Text>
            </View>
            <View style={styles.questionPopupView}>
              <Text style={styles.popupText}>자세한 사항은 등록 탭의 서약을 참고해 주세요.</Text>
            </View>
          </View>
          <View style={[styles.questionPopupView, {paddingHorizontal: 0,}]}>
            <TouchableOpacity style={{ flex: 1, borderTopWidth: 1, borderColor: colors.lightPeriwinkle, marginHorizontal: -9 }} onPress={() => {
              setIsQuestionMark(false)
            }}>
              <Text
                style={[styles.bottomButtonText, { color: colors.lightIndigo }]}
              >
                닫기
            </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};
export default WriteSort;
