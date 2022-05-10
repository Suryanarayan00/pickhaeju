import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import InputBox from '#components/Input/InputBox';
import CheckLabel from '#components/CheckLabel';
import DefaultButton from '#components/Button/DefaultButton';
import colors from '#common/colors';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
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
  inputContainer: {
    paddingHorizontal: 30,
    marginVertical: 16,
  },
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
  blindIcon: { width: 20, height: 18 },
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

  checkLabelDistance: {
    marginRight: 10,
  },

  inputCheckLabelContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
const ChangePassword = (props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [password, setPassword] = useState();
  const [authPassword, setAuthPassword] = useState();

  const [passwordResult, setPasswordResult] = useState(false);
  const [passwordLengthResult, setPasswordLengthResult] = useState(false);
  const [passwordNumResult, setPasswordNumResult] = useState(false);
  const authPasswordResult = password === authPassword;

  const isDisabled = !(
    passwordResult &&
    passwordLengthResult &&
    passwordNumResult &&
    authPasswordResult
  );

  const passwordChecker = (password) => {
    setPassword(password);
    const reg = /^(?=.*[A-Za-z])/;
    const regNum = /\d/;

    if (password?.length >= 8 && password?.length <= 20) {
      setPasswordLengthResult(true);
    } else {
      setPasswordLengthResult(false);
    }
    if (regNum.test(password)) {
      setPasswordNumResult(true);
    } else {
      setPasswordNumResult(false);
    }

    if (reg.test(password)) {
      setPasswordResult(true);
    } else {
      setPasswordResult(false);
    }
  };
  return (
    <ScrollView keyboardDismissMode={'on-drag'} style={styles.container}>
      <View style={[styles.inputContainer]}>
        <InputBox
          title={'현재 비밀번호'}
          maxLength={20}
          value={password}
          autoCapitalize={'none'}
          onChangeText={passwordChecker}
          blindIcon={true}
          blindState={true}
        />
        <View style={[styles.inputCheckLabelContainer]}>
          <CheckLabel
            text={'일치'}
            containerStyle={[styles.checkLabelDistance]}
            disabled={!passwordLengthResult}
          />
        </View>
      </View>
      <View style={[styles.inputContainer]}>
        <InputBox
          title={'새 비밀번호'}
          maxLength={20}
          value={password}
          autoCapitalize={'none'}
          onChangeText={passwordChecker}
          blindIcon={true}
          blindState={true}
        />
        <View style={[styles.inputCheckLabelContainer]}>
          <CheckLabel
            text={'8~20자 이내'}
            containerStyle={[styles.checkLabelDistance]}
            disabled={!passwordLengthResult}
          />
          <CheckLabel
            text={'영문 포함'}
            containerStyle={[styles.checkLabelDistance]}
            disabled={!passwordResult}
          />
          <CheckLabel text={'숫자 포함'} disabled={!passwordNumResult} />
        </View>
      </View>
      <View style={[styles.inputContainer]}>
        <InputBox
          title={'새 비밀번호 확인'}
          blindIcon={true}
          maxLength={20}
          autoCapitalize={'none'}
          value={authPassword}
          onChangeText={setAuthPassword}
          blindState={true}
        />
        <View style={[styles.inputCheckLabelContainer]}>
          <CheckLabel
            text={'비밀번호 일치'}
            disabled={!(passwordLengthResult && authPasswordResult)}
          />
        </View>
      </View>

      <DefaultButton
        containerStyle={styles.buttonWrapper}
        disabled={isDisabled}
      >
        비밀번호 변경하기
      </DefaultButton>
    </ScrollView>
  );
};

export default ChangePassword;
