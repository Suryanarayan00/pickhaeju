import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '#common/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import assets from '../../../assets';
import BottomModal from '#components/Modal/BottomModal';
import BottomButton from '#components/Button/BottomButton';
import { me } from '../../data/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import GestureRecognizer from 'react-native-swipe-gestures';

const styles = StyleSheet.create({
  container: { backgroundColor: colors.white, flex: 1 },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    paddingTop: 53,
    paddingBottom: 30,
    paddingHorizontal: 28,
  },
  titleText: {
    paddingLeft: 6,
    fontSize: 18,
    color: colors.greyBlue,
    // fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
  },
  contentsWrapper: { paddingHorizontal: 28, marginTop: 26 },
  contentsText: {
    textAlign: 'center',
    fontSize: 15,
    color: colors.battleshipGrey,
    lineHeight: 24,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 58,
  },
  selectWrapper_on: {
    borderColor: colors.lightIndigo,
    borderRadius: 28,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 26,
    paddingHorizontal: 18,
    paddingVertical: 17,
    marginVertical: 7,
  },
  selectWrapper_off: {
    borderColor: colors.lightPeriwinkleTwo,
    borderRadius: 28,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 26,
    paddingHorizontal: 18,
    paddingVertical: 17,
    marginVertical: 7,
  },
  headerText: {
    fontSize: 20,
    paddingHorizontal: 28,
    marginTop: 49,
    marginBottom: 43,
    color: colors.blackTwo,
    lineHeight: 30,
  },
  labelText: {
    paddingLeft: 14,
    fontSize: 16,
    color: colors.blackTwo,
    flex: 1,
    lineHeight: 24,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  progressBar: {
    height: 2.5,
    backgroundColor: colors.paleLilacTwo,
  },
  innerProgressBar: {
    height: 2.5,
    backgroundColor: colors.aqua,
  },
  headerRightText: {
    fontSize: 16,
    color: colors.blueGrey,
    marginRight: 20,
  },
  check_on: {
    width: 22,
    height: 22,
  },
  check_off: {
    width: 22,
    height: 22,
  },
});
const CHECK_LABELS = [
  {
    key: 1,
    label: '????????? ??????????????? ????????? ?????? ??? ????????? ???????????? ?????????.',
  },
  {
    key: 2,
    label: '????????? ??? ???????????? ????????? ?????? ?????? ??? ?????? ????????? ???????????? ??????.',
  },
  {
    key: 3,
    label: '???????????? ????????? ????????? ?????? ???????????? ?????????.',
  },
  {
    key: 4,
    label: '????????? ???????????? ?????????????????? ????????? ????????? ???????????? ?????????.',
  },
  {
    key: 5,
    label: '????????? ?????? ?????? ?????? ????????????.',
  },
];
const MakeProfileDown = ({ setForm, setStep, path }) => {
  const [isVisible, setIsVisble] = useState(false);
  const onCancel = () => {
    setIsVisble(false);
  };
  const showModal = () => {
    setIsVisble(true);
  };
  const userInfo = useSelector((state) => state?.auth?.principal);
  const [checked, setChecked] = useState(userInfo?.reaction);
  const dispatch = useDispatch();
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  // const route = useRoute();
  // const { path, data } = route.params;

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => {
  //       if (path === 'signUp') {
  //         return (
  //           <TouchableOpacity activeOpacity={0.85} onPress={showModal}>
  //             <Text style={styles.headerRightText}>????????????</Text>
  //           </TouchableOpacity>
  //         );
  //       }
  //     },
  //   });
  // }, []);
  return (
    <GestureRecognizer onSwipeDown={onCancel} style={{ flex: 1 }}>
      {/* <View style={styles.progressBar}>
        <View style={[styles.innerProgressBar, { width: '75%' }]} />
      </View> */}
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>
          ????????? ????????? ???????????? 10% ??????????????????.???????????? ??????????
        </Text>
        {CHECK_LABELS?.map?.((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={
                checked === item.key
                  ? styles.selectWrapper_on
                  : styles.selectWrapper_off
              }
              activeOpacity={0.85}
              onPress={() => setChecked(item.key)}
            >
              {checked === item.key ? (
                <Image
                  source={assets.checkbox_on}
                  style={styles.check_on}
                  resizeMode={'contain'}
                />
              ) : (
                <Image
                  source={assets.checkbox_off}
                  style={styles.check_off}
                  resizeMode={'contain'}
                />
              )}
              <Text style={styles.labelText}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
        <View style={{ height: 40 }} />
      </ScrollView>
      <BottomModal isVisible={isVisible} onCancel={onCancel}>
        <View style={styles.modalContainer}>
          <View style={styles.titleWrapper}>
            <Image
              source={assets.profile_popup}
              style={{
                width: 33,
                height: 37,
              }}
              resizeMode={'contain'}
            />
            <Text style={styles.titleText}>???, ?????? ???????????????????</Text>
          </View>
          <View style={styles.contentsWrapper}>
            <Text style={styles.contentsText}>
              ???????????? ????????? ?????????, ????????? ?????? ????????? ??? ????????? ?????? ?????? ???
              ????????????. ?????? ????????? ?????? ?????? ???????????? ?????? ??????????????? ?????????
              ????????????.
            </Text>
          </View>
          <View
            style={[
              styles.buttonWrapper,
              {
                paddingBottom: inset.bottom + 10,
                justifyContent: 'space-around',
              },
            ]}
          >
            <TouchableOpacity
              // style={{ flex: 1 }}
              activeOpacity={0.85}
              onPress={() => {
                onCancel();
                dispatch(me());
                navigation.navigate('SimplePassword', { path });
              }}
            >
              <Text
                style={[styles.buttonText, { color: colors.battleshipGrey }]}
              >
                ???, ????????? ?????????.
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onCancel}
              // style={{ flex: 1 }}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: colors.lightIndigo,
                  },
                ]}
              >
                ????????? ?????? ???????????????.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomModal>
      <BottomButton
        disabled={!checked}
        onPress={() => {
          // navigation.navigate('MakeProfileHaving', {
          //   path,
          //   data: { ...data, reaction: checked },
          // });
          setStep(3);
          setForm((prev) => ({
            ...prev,
            reaction: checked,
          }));
        }}
        fontSize={18}
      >
        ??????
      </BottomButton>
    </GestureRecognizer>
  );
};

export default MakeProfileDown;
