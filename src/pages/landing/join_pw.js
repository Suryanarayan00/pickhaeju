import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { restApi } from '#common/api';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import InputBox from '#components/Input/InputBox';
import DefaultButton from '#components/Button/DefaultButton';
import colors from '#common/colors';
import assets from '../../../assets';
import CheckLabel from '#components/CheckLabel';
import { useRoute } from '@react-navigation/native';
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

const JoinPw = (props) => {
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
    <>
      <View style={styles.progressBar}>
        <View style={[styles.innerProgressBar, { width: '50%' }]} />
      </View>
      <ScrollView keyboardDismissMode={'on-drag'} style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>???????????? ?????????</Text>
          <Text style={styles.boldText}>
            ????????????
            <Text style={styles.normalText}>??? ?????? ??? ??????????????????.</Text>
          </Text>
        </View>
        <View style={[styles.inputContainer]}>
          <InputBox
            title={'????????????'}
            maxLength={20}
            value={password}
            autoCapitalize={'none'}
            onChangeText={passwordChecker}
            blindIcon={true}
            blindState={true}
          />
          <View style={[styles.inputCheckLabelContainer]}>
            <CheckLabel
              text={'8~20??? ??????'}
              containerStyle={[styles.checkLabelDistance]}
              disabled={!passwordLengthResult}
            />
            <CheckLabel
              text={'?????? ??????'}
              containerStyle={[styles.checkLabelDistance]}
              disabled={!passwordResult}
            />
            <CheckLabel text={'?????? ??????'} disabled={!passwordNumResult} />
          </View>
        </View>
        <View style={[styles.inputContainer]}>
          <InputBox
            title={'???????????? ??????'}
            blindIcon={true}
            maxLength={20}
            autoCapitalize={'none'}
            value={authPassword}
            onChangeText={setAuthPassword}
            blindState={true}
          />
          <View style={[styles.inputCheckLabelContainer]}>
            <CheckLabel
              text={'???????????? ??????'}
              disabled={!(passwordLengthResult && authPasswordResult)}
            />
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <DefaultButton
            disabled={isDisabled}
            onPress={() => {
              navigation.navigate('JoinNickname', {
                email: route.params.email,
                password: password,
              });
            }}
          >
            ??????
          </DefaultButton>
        </View>
      </ScrollView>
    </>
  );
};

export default JoinPw;
