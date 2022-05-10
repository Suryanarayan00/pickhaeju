import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '#common/colors';
import assets from '../../../assets';
import DefaultButton from '#components/Button/DefaultButton';
import { useNavigation } from '@react-navigation/native';
import { restApi } from '#common/api';
import InputBox from '#components/Input/InputBox';
import CheckLabel from '#components/CheckLabel';
import isDisabled from 'react-native-web/dist/modules/AccessibilityUtil/isDisabled';

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
const LandingJoin = (props) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [emailResult, setEmailResult] = useState({
    error: '',
    success: '',
  });
  const [valid, setValid] = useState(true);

  const emailChecker = (email) => {
    setEmail(email);
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    console.log(reg.test(email));
    console.log(email);
    if (!reg.test(email)) {
      setEmailResult({ error: '이메일 형식이 올바르지 않습니다.' });
      setValid(true);
      return;
    }
    const checkEmail = async () => {
      const { data } = await restApi.post('/users/auth/checkemailvalid', {
        email: email,
      });

      if (data.valid) {
        setEmailResult({ success: '사용 가능한 이메일입니다.' });
        setValid(false);
      } else {
        setEmailResult({ error: '이미 사용중인 이메일입니다.' });
        setValid(true);
      }
    };
    checkEmail().catch(console.warn);
  };
  return (
    <>
      <View style={styles.progressBar}>
        <View style={[styles.innerProgressBar, { width: '25%' }]} />
      </View>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>로그인에 사용할</Text>
          <Text style={styles.boldText}>
            이메일
            <Text style={styles.normalText}>을 입력해주세요.</Text>
          </Text>
        </View>
        <View style={[styles.inputContainer]}>
          <InputBox
            title={'이메일'}
            blindIcon={false}
            value={email}
            onChangeText={emailChecker}
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType={'email-address'}
            message={emailResult}
            inputStatus={''}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <DefaultButton
            disabled={valid}
            onPress={() => {
              navigation.navigate('JoinPw', {
                email: email,
              });
            }}
          >
            다음
          </DefaultButton>
        </View>
      </View>
    </>
  );
};

export default LandingJoin;
