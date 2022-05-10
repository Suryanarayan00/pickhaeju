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
import { useNavigation, useRoute } from '@react-navigation/native';
import assets from '../../../assets';
import BottomModal from '#components/Modal/BottomModal';
import BottomButton from '#components/Button/BottomButton';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { me } from '../../data/auth/actions';
import { addPreference } from '../../common/authApi';
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
    label: '일주일 미만',
  },
  {
    key: 2,
    label: '일주일 이상 ~ 1개월 미만',
  },
  {
    key: 3,
    label: '1개월 이상 ~ 3개월 미만',
  },
  {
    key: 4,
    label: '3개월 이상 ~ 1년 미만',
  },
  {
    key: 5,
    label: '1년 이상',
  },
];
const MakeProfileHaving = ({ setForm, setStep, form, path }) => {
  const [isVisible, setIsVisble] = useState(false);
  const dispatch = useDispatch();
  const onCancel = () => {
    setIsVisble(false);
  };
  const showModal = () => {
    setIsVisble(true);
  };
  const userInfo = useSelector((state) => state?.auth?.principal);
  const [checked, setChecked] = useState(userInfo?.averageStocks);

  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  const { principal } = useSelector((s) => s.auth, shallowEqual);

  // const route = useRoute();
  // const { path, data } = route.params;

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => {
  //       if (path === 'signUp') {
  //         return (
  //           <TouchableOpacity activeOpacity={0.85} onPress={showModal}>
  //             <Text style={styles.headerRightText}>건너뛰기</Text>
  //           </TouchableOpacity>
  //         );
  //       }
  //     },
  //   });
  // }, []);

  return (
    <GestureRecognizer onSwipeDown={onCancel} style={{ flex: 1 }}>
      {/* <View style={styles.progressBar}>
        <View style={[styles.innerProgressBar, { width: '100%' }]} />
      </View> */}
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>
          가슴에 손을 얹고{'\n'}평균 주식 보유기간을 알려주세요.
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
              <Text style={styles.titleText}>엇, 그냥 지나가시나요?</Text>
            </View>
            <View style={styles.contentsWrapper}>
              <Text style={styles.contentsText}>
                프로필을 완성해 주시면, 취향에 맞는 종목과 픽 추천을 받아 보실
                수 있습니다. 물론 선택해 주신 답은 언제든지 나의 프로필에서
                수정이 가능해요.
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
                  네, 나중에 할게요.
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onCancel} activeOpacity={0.85}>
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: colors.lightIndigo,
                    },
                  ]}
                >
                  프로필 마저 완성할게요.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomModal>
      </ScrollView>

      <BottomButton
        disabled={!checked}
        onPress={async () => {
          console.log('navigation sss', principal, {
            ...form,
            averageStocks: checked,
          });
          await addPreference({ ...form, averageStocks: checked });
          if (principal) {
            navigation.navigate('MainStack');
            dispatch(me());
          } else {
            dispatch(me());
            navigation.navigate('MainStack');
          }
        }}
        fontSize={18}
      >
        피드 페이지로 이동
      </BottomButton>
    </GestureRecognizer>
  );
};

export default MakeProfileHaving;
