import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Platform,
  SafeAreaView,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import assets from '../../../assets';
import colors from '#common/colors';
import AsyncStorage from '@react-native-community/async-storage';
import { getSimplePwData } from '../../utils/utils';
import { useNavigation, StackActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { clear } from '../../data/auth/actions';
import FingerprintScanner from '#modules/FingerprintScanner';

const styles = StyleSheet.create({
  container: { backgroundColor: colors.white, flex: 1 },
  header: { alignItems: 'center', marginTop: 30 },
  numberText: { fontSize: 28, color: colors.dark },
  headerText: { fontSize: 17, color: colors.blueGrey, marginTop: 32 },
  logoIcon: { width: 115, height: 42 },
  buttonWrapper: {
    alignItems: 'center',
    width: '33.3%',
    height: 70,
    justifyContent: 'center',
  },
  circleWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 94,
  },
  circleIcon: { width: 14, height: 14, marginHorizontal: 16 },
  buttonBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginTop: 60,
  },
  deleteIcon: { width: 19, height: 19 },
});

let passwordPadArrayInit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
passwordPadArrayInit.sort(() => Math.random() - Math.random());
passwordPadArrayInit.splice(9, null, '');

const SimplePasswordCheck = (props) => {
  const { setIsShowAuth, navigation } = props;
  const [password, setPassword] = useState('');
  const [passwordPadArray, setPasswordPadArray] = useState(
    passwordPadArrayInit,
  );
  const userPw = useRef(null);
  const [inCorrectCount, setInCorrectCount] = useState(1);
  const dispatch = useDispatch();
  const onPressBiometricsAuth = () => {
    const bioAuth = async () => {
      console.log('bioAuth');
      const result = await FingerprintScanner.authenticate({
        description: '생체정보로 인증해 주세요',
        title: '생체인증',
      });

      if (result === true) {
        if (Platform.OS === 'android') {
          FingerprintScanner.release(); //안해주면 안드로이드에서 2번째부터 지문인식 안됨.
        }
        setIsShowAuth(false);
      }
    };

    //생체인증
    if (Platform.OS === 'android' && Platform.Version > 22) {
      bioAuth();
    } else if (Platform.OS === 'ios') {
      bioAuth();
    } else {
      Alert.alert('안내', '사용하실수 없는 기종입니다');
    }
  };

  useEffect(() => {
    passwordPadArrayInit = passwordPadArrayInit
      .filter((d) => d)
      .sort(() => Math.random() - Math.random());
    passwordPadArrayInit.splice(9, null, '');
    console.log('passwordPadArrayInit', passwordPadArrayInit);
    setPasswordPadArray(passwordPadArrayInit);
  }, [inCorrectCount]);

  const onPressNumber = async (num) => {
    if (!password) {
      setPassword(num);
    } else if (password?.length < 4) {
      setPassword(password + num);
      if (password?.length === 3) {
        if (userPw.current === password + num) {
          setIsShowAuth && setIsShowAuth(false);
        } else {
          // inCorrectCount.current++;
          if (inCorrectCount > 4) {
            // 로그아웃
            setInCorrectCount(0); //.current = 0;
            setPassword('');
            await AsyncStorage.clear();
            await dispatch(clear());
            await navigation.popToTop();
            setIsShowAuth && setIsShowAuth(false);
            navigation.replace('IntroStack');
          } else {
            setPassword('');
            Alert.alert(
              '안내',
              `비밀번호를 ${inCorrectCount}회 잘못 입력하셨습니다.\n5회 오류 시, 로그인 페이지로 돌아갑니다`,
              [{ text: '확인', onPress: () => setPassword('') }],
            );
          }
          setInCorrectCount(inCorrectCount + 1);
        }
      }
    }
  };

  const deletePassword = () => {
    setPassword(password.slice(0, -1));
  };

  useEffect(() => {
    (async () => {
      const pwData = await getSimplePwData();
      userPw.current = pwData.password;
    })();
  }, []);

  useEffect(() => {
    getSimplePwData().then((pwData) => {
      if (pwData.isSecurity) {
        if (pwData.isBio) {
          onPressBiometricsAuth();
        }
      }
    });
  }, []);

  // console.log('pwData isBio', isBio, password);

  return (
    <SafeAreaView style={[styles.container, props.style]}>
      <View style={styles.header}>
        <Image source={assets.logo} style={styles.logoIcon} />
        <Text style={styles.headerText}>간편 비밀번호를 입력해 주세요.</Text>
      </View>
      <View style={styles.circleWrapper}>
        <Image
          source={password[0] ? assets.pw_purple : assets.pw_grey}
          style={styles.circleIcon}
        />
        <Image
          source={password[1] ? assets.pw_purple : assets.pw_grey}
          style={styles.circleIcon}
        />
        <Image
          source={password[2] ? assets.pw_purple : assets.pw_grey}
          style={styles.circleIcon}
        />
        <Image
          source={password[3] ? assets.pw_purple : assets.pw_grey}
          style={styles.circleIcon}
        />
      </View>
      <View style={styles.buttonBox}>
        {passwordPadArray.map?.((num) => (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.buttonWrapper}
            onPress={() => onPressNumber(num)}
          >
            <Text style={styles.numberText}>{num}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.buttonWrapper}
          onPress={deletePassword}
        >
          <Image source={assets.pw_delete} style={styles.deleteIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default SimplePasswordCheck;
