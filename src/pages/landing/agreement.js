import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '#common/colors';
import BottomButton from '#components/Button/BottomButton';
import produce from 'immer';
import assets from '../../../assets';
import { useDispatch } from 'react-redux';
import { setToken } from '../../common/api';
import AsyncStorage from '@react-native-community/async-storage';
import LandingAgreementDetails from './agreement_details';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    width: '100%',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  agreementList: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  listWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  allAgreeListWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },

  darkText: { paddingLeft: 10, color: colors.dark },
  greyText: { color: colors.blueGrey },
  textButton: { color: colors.cloudyBlue },
  titleText: { fontSize: 20, color: colors.dark },
   titleBoldText: {
    // fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: colors.dark,
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    height: 2.5,
    backgroundColor: colors.paleLilacTwo,
  },
  innerProgressBar: {
    height: 2.5,
    backgroundColor: colors.aqua,
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
const AGREE_LABELS = [
  {
    key: 'use',
    label: '이용약관 동의',
    uri: 'http://pickhaeju-server.appspot.com/static/termsofservice.html',
  },
  {
    key: 'privacy',
    label: '개인정보 처리방침 동의',
    uri: 'http://pickhaeju-server.appspot.com/static/privacypolicy.html',
  },
  // {
  //   key: 'termsid',
  //   label: '본인확인 서비스 이용 동의',
  //   uri: '',
  // },
  // {
  //   key: 'termsphone',
  //   label: '통신사 이용 약관 동의',
  //   uri: '',
  // },
  {
    key: 'newsletter',
    label: '뉴스레터 및 마케팅 정보 수신 동의',
    uri: 'http://pickhaeju-server.appspot.com/static/marketingagreement.html',
  },
];
const LandingAgreement = ({ route, navigation }) => {
  const { form } = route.params;
  const dispatch = useDispatch();
  const [agreements, setAgreements] = useState({
    use: false,
    privacy: false,
    termsid: false,
    termsphone: false,
    newsletter: false,
  });

  const [isShowPopup, setIsShowPopup] = useState(false);
  const KaKaoWrapButton =
    !agreements.use ||
    !agreements.privacy ||
    !agreements.termsid ||
    !agreements.termsphone
      ? TouchableOpacity
      : React.Fragment;

  const allCheck =
    agreements.use &&
    agreements.privacy &&
    agreements.termsid &&
    agreements.termsphone &&
    agreements.newsletter;

  const allCheckHandle = () => {
    if (allCheck) {
      setAgreements(
        produce((draft) => {
          draft.use = false;
          draft.privacy = false;
          draft.termsid = false;
          draft.termsphone = false;
          draft.newsletter = false;
        }),
      );
    } else {
      setAgreements(
        produce((draft) => {
          draft.use = true;
          draft.privacy = true;
          draft.termsid = true;
          draft.termsphone = true;
          draft.newsletter = true;
        }),
      );
    }
  };

  const handleSingUp = async () => {
    //회원가입 진행
    setToken(form.token);
    await AsyncStorage.setItem('token', form.token);
    //   navigation.navigate('LandingFinish', {
    //   path: 'signUp',
    //   userInfo: form,
    //  });
    navigation.navigate('JoinNickname', {
      path: 'signUp',
      userInfo: form,
     });
  
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <View style={styles.progressBar}>
        <View style={[styles.innerProgressBar, { width: '36%' }]} />
      </View> */}

      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>
            픽해주 <Text style={styles.titleBoldText}>서비스 이용약관</Text>
            <Text style={styles.titleText}>에</Text>
          </Text>
        </View>
        <Text style={[styles.titleText, { paddingHorizontal: 20 }]}>
          동의해주세요.
        </Text>
        <View style={styles.agreementList}>
          <View style={styles.allAgreeListWrapper}>
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={allCheckHandle}
              activeOpacity={0.85}
            >
              {allCheck ? (
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
              <Text
                style={[styles.darkText, { paddingLeft: 10, fontSize: 16 }]}
              >
                전체 동의{' '}
              </Text>
              <Text style={[styles.greyText, { fontSize: 16 }]}>
                (선택 정보 포함)
              </Text>
            </TouchableOpacity>
          </View>
          {AGREE_LABELS?.map?.((item) => {
            return (
              <View style={styles.listWrapper}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={styles.buttonWrapper}
                  onPress={() => {
                    setAgreements(
                      produce((draft) => {
                        draft[item.key] = !draft[item.key];
                      }),
                    );
                  }}
                >
                  {agreements[item.key] ? (
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
                  <Text style={styles.darkText}>{item.label} </Text>
                  {item?.key === 'newsletter' ? (
                    <Text style={styles.greyText}>(선택)</Text>
                  ) : (
                    <Text style={styles.greyText}>(필수)</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => {
                    // if (Platform.OS === 'web') {
                    setIsShowPopup(item);
                    //   return;
                    // }
                    // setIsShowPopup(item.uri);
                    // navigation.navigate('LandingAgreementDetails', {
                    //   uri: item.uri,
                    // });
                  }}
                >
                  <Text style={styles.textButton}>약관보기</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
      <LandingAgreementDetails
        data={isShowPopup}
        onCancel={() => setIsShowPopup()}
      />
      {/* {!!isShowPopup && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#00000020',
          }}
          onPress={() => setIsShowPopup()}
        >
          <View
            style={{
              maxWidth: 481,
              backgroundColor: 'white',
              borderRadius: 15,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                maxWidth: 481,
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 50,
                paddingHorizontal: 15,
                marginTop: 10,
                borderRadius: 15,
              }}
            >
              <View />
              <Text>{isShowPopup.label}</Text>
              <TouchableOpacity onPress={() => setIsShowPopup()}>
                <Text>X</Text>
              </TouchableOpacity>
            </View>
            <LandingAgreementDetails uri={isShowPopup.uri} />

            <TouchableOpacity
              style={{
                justifyContent: 'center',

                height: 43,
                borderTopWidth: 1,
                alignItems: 'center',
                marginTop: 10,
              }}
              onPress={() => setIsShowPopup()}
            >
              <Text>확인</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )} */}
      <BottomButton
        disabled={
          !agreements.use ||
          !agreements.privacy
        }
        onPress={handleSingUp}
        style={{ width: '100%' }}
      >
        닉네임 설정하기
      </BottomButton>
    </View>
  );
};

export default LandingAgreement;
