import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { restApi, setToken } from '#common/api';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import InputBox from '#components/Input/InputBox';
import DefaultButton from '#components/Button/DefaultButton';
import colors from '#common/colors';
import CheckLabel from '#components/CheckLabel';
import isDisabled from 'react-native-web/dist/modules/AccessibilityUtil/isDisabled';
import AsyncStorage from '@react-native-community/async-storage';
import { useRoute } from '@react-navigation/native';
import { me } from '#data/auth/actions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { changeNickName } from '../../common/authApi';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  titleWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
    marginBottom: 26,
  },
  inputPassword: { paddingHorizontal: 30, marginVertical: 16 },
  inputBox: {
    borderBottomColor: colors.lightIndigo,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 45,
    paddingRight: 12,
  },
  checkTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonWrapper: { paddingHorizontal: 30, marginTop: 19 },
  titleText: { fontSize: 20, color: colors.dark },
  boldText: {
    // fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: colors.dark,
  },
  normalText: { fontSize: 20, color: colors.dark },
  checkIcon: { width: 12, height: 8 },
  subTitle: { color: colors.greyBlue },
  checkText: { color: colors.lightIndigo },
  progressBar: {
    height: 2.5,
    backgroundColor: colors.paleLilacTwo,
  },
  innerProgressBar: {
    height: 2.5,
    backgroundColor: colors.aqua,
  },
  inputContainer: {
    paddingHorizontal: 30,
    marginVertical: 16,
  },

  checkLabelDistance: {
    marginRight: 10,
  },

  inputCheckLabelContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
 const JoinNickname = (props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [nickname, setNickname] = useState();
  const [nicknameResult, setNicknameResult] = useState(false);
  const [valid, setValid] = useState(false);
  const dispatch = useDispatch();

  const isDisabled = !(nicknameResult && valid);
  const userInfo = route.params?.userInfo; 
  console.log('userInfo');
  console.log(userInfo);

  const nicknameChecker = async (nickname) => {
    setNickname(nickname);
    const reg = /^[0-9a-zA-Z가-힣]{4,}$/;
    if (!nickname) {
      setNicknameResult(false);
      return;
    } else if (nickname.length > 12) {
      setNicknameResult(false);
      return;
    } else if (!reg.test(nickname)) {
      setNicknameResult(false);
    } else {
      setNicknameResult(true);
    }
    try {
      
      const { data } = await restApi.get(`api/v3/user/check-duplicate`, {
        params: {
          name: nickname,
      }
      });
      if (data) {
        setValid(false);
      } else {
        setValid(true);
      }
    } catch (error) { console.log(error)}
  };
  const joinChecking = async () => {
   
    try {
       let {data} = await changeNickName(nickname);
        console.log('response');
        console.log(data);
       navigation.navigate('LandingFinish', {
          path: 'signUp',
          userInfo: data,
     });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <View style={{ flex: 1, backgroundColor: colors.white }}>

      <ScrollView keyboardDismissMode={'on-drag'} style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>마지막으로 픽해주에서 활동할</Text>
          <Text style={styles.boldText}>
            닉네임
            <Text style={styles.normalText}>을 입력해주세요.</Text>
          </Text>
        </View>
        <View style={[styles.inputContainer]}>
          <InputBox
            title={'닉네임'}
            blindIcon={false}
            maxLength={12}
            value={nickname}
            onChangeText={nicknameChecker}
            autoCapitalize={'none'}
          />
          <View style={[styles.inputCheckLabelContainer]}>
            <CheckLabel
              text={'12자 이내'}
              containerStyle={[styles.checkLabelDistance]}
              disabled={!nicknameResult}
            />
            <CheckLabel
              text={'중복 되지 않음'}
              containerStyle={[styles.checkLabelDistance]}
              disabled={!valid}
            />
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <DefaultButton disabled={isDisabled} onPress={joinChecking}>
          회원가입 완료
          </DefaultButton>
        </View>
      </ScrollView>
      </View>
    </>
  );
};

export default JoinNickname;
