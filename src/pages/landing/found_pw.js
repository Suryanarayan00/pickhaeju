import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RoundButton from '#components/Button/RoundButton';
import colors from '#common/colors';
import { useNavigation } from '@react-navigation/native';
import InputBox from '#components/Input/InputBox';
import CheckLabel from '#components/CheckLabel';
import { useRoute } from '@react-navigation/native';
import DefaultButton from '#components/Button/DefaultButton';
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  titleText: {
    fontSize: 18,
    letterSpacing: -0.45,
    color: colors.dark,
    marginHorizontal: 21,
    marginTop: 21,
    // fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
  },
  emailWrapper: { height: 186, justifyContent: 'center', alignItems: 'center' },
  emailText: {
    fontSize: 16,
    letterSpacing: -0.4,
    color: colors.greyBlue,
  },
  buttonWrapper: { marginHorizontal: 30 },
  buttonStyle: {
    backgroundColor: colors.white,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.veryLightPink,
    borderWidth: 1,
  },
  buttonText: { fontSize: 15, color: colors.blueyGrey },
  inputContainer: {
    paddingHorizontal: 30,
    marginVertical: 16,
  },
  inputCheckLabelContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },

  checkLabelDistance: {
    marginRight: 10,
  },
});
const LandingFoundPw = (props) => {
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
    <View style={styles.container}>
      <Text style={styles.titleText}>
        ????????? ????????????
        <Text style={[styles.titleText]}>
          ??? ????????? ?????????.
        </Text>
      </Text>
      <View style={[styles.inputContainer, { marginTop: 40 }]}>
        <InputBox
          title={'?????? ????????????'}
          maxLength={20}
          value={password}
          autoCapitalize={'none'}
          onChangeText={passwordChecker}
          blindIcon={true}
          blindState={true}
        />
        <View style={[styles.inputCheckLabelContainer]}>
          <CheckLabel
            text={'??????'}
            containerStyle={[styles.checkLabelDistance]}
            disabled={!passwordLengthResult}
          />
        </View>
      </View>
      <View style={[styles.inputContainer]}>
        <InputBox
          title={'??? ????????????'}
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
          title={'??? ???????????? ??????'}
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
      <DefaultButton
        containerStyle={[styles.buttonWrapper, { marginTop: 40 }]}
        //disabled={isDisabled}
        onPress={() => {
          navigation.navigate('FoundFinish');
        }}
      >
        ???????????? ???????????????
      </DefaultButton>
    </View>
  );
};

export default LandingFoundPw;
