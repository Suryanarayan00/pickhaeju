import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomModal from '#components/Modal/BottomModal';
import assets from '../../../assets';
import colors from '#common/colors';
import CheckButton from '#components/Button/CheckButton';
import DefaultButton from '#components/Button/DefaultButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import BottomButton from '#components/Button/BottomButton';
import produce from 'immer';
import { useDispatch, useSelector } from 'react-redux';
import { me } from '../../data/auth/actions';
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
    key: 'twenty',
    label: '10-20대',
  },
  {
    key: 'thirty',
    label: '30대',
  },
  {
    key: 'forty',
    label: '40대',
  },
  {
    key: 'fifty',
    label: '50대',
  },
  {
    key: 'sixty',
    label: '60대 이상',
  },
];
const MakeProfileAge = ({ setForm, setStep, path }) => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const onCancel = () => {
    setIsVisible(false);
  };
  const showModal = () => {
    setIsVisible(true);
  };
  const userInfo = useSelector((state) => state?.auth?.principal?.userInfo);
  const [checked, setChecked] = useState(userInfo?.age);

  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  // const route = useRoute();
  // const { path } = route?.params;
  //
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
        <View style={[styles.innerProgressBar, { width: '20%' }]} />
      </View> */}
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>연령대를 알려주세요.</Text>

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
                { paddingBottom: inset.bottom + 10, justifyContent: 'space-around' },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={async () => {
                  onCancel();
                  await dispatch(me());
                  navigation.navigate('SimplePassword', { path });
                }}
              >
                <Text
                  style={[styles.buttonText, { color: colors.battleshipGrey }]}
                >
                  네, 나중에 할게요.
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onCancel}
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
                  프로필 마저 완성할게요.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomModal>
      </ScrollView>

      <BottomButton
        disabled={!checked}
        onPress={() => {
          // navigation.navigate('MakeProfileSpec', {
          //   path,
          //   data: { age: checked },
          // });
          setStep(1)
          setForm({
            age: checked
          })
        }}
        fontSize={18}
      >
        다음
      </BottomButton>
    </GestureRecognizer>
  );
};

export default MakeProfileAge;
