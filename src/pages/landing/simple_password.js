import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import assets from '../../../assets';
import colors from '#common/colors';
import AsyncStorage from '@react-native-community/async-storage';
import {
  setSimplePassword,
  getSimplePwData,
  setIsSecurity,
} from '../../utils/utils';
import { useNavigation, useRoute } from '@react-navigation/native';
import { toastShow } from '#data/toast/ToastAction';
import { useDispatch } from 'react-redux';

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
  headerView: {
    alignItems: 'flex-end',
    height: 40,
    justifyContent: 'center',
  },
  headerRightText: {
    fontSize: 16,
    color: colors.blueGrey,
    marginRight: 20,
  },
});
const passwordPadArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
passwordPadArray.sort(() => Math.random() - Math.random());
passwordPadArray.splice(9, null, '');

const SimplePassword = () => {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isCheckMode, setIsCheckMode] = useState(false);
  const currentPassword = isCheckMode ? password2 : password;
  const navigation = useNavigation();
  const route = useRoute();

  const onPressNumber = (num) => {
    if (!password) {
      setPassword(num);
    } else if (password?.length < 4) {
      setPassword(password + num);
      if (password?.length === 3) {
        setIsCheckMode(true);
      }
    }

    if (isCheckMode && !password2) {
      setPassword2(num);
    } else if (isCheckMode && password2?.length < 4) {
      setPassword2(password2 + num);
    }
  };

  const deletePassword = () => {
    if (isCheckMode) {
      setPassword2(password2.slice(0, -1));
    } else {
      setPassword(password.slice(0, -1));
    }
  };

  const dispatch = useDispatch();

  const handleNextPage = async (password) => {
    await setSimplePassword(password);
    if (route.params?.path === 'signUp') {
      navigation.replace('MainStack');
    } else {
      navigation.navigate('PasswordSecurity', { refresh: true });
    }
  };

  useEffect(() => {
    const asyncUseEffect = async () => {
      if (isCheckMode && password2?.length === 4 && password2 !== password) {
        dispatch(toastShow('비밀번호가 틀렸습니다. 다시 입력해 주세요.'));
        setPassword2('');
      } else if (
        isCheckMode &&
        password2?.length === 4 &&
        password2 === password
      ) {
        dispatch(toastShow('비밀번호가 설정되었습니다.'));
        setTimeout(async () => {
          await handleNextPage(password);
        }, 1000);

        // Alert.alert('안내', '비밀번호가 설정되었습니다.', [
        //   {
        //     text: '확인',
        //     onPress: async () => {
        //       await setSimplePassword(password);
        //       if (route.params?.path === 'signUp') {
        //         navigation.replace('MainStack');
        //       } else {
        //         navigation.navigate('PasswordSecurity', { refresh: true });
        //       }
        //     },
        //   },
        // ]);
      }
    };
    asyncUseEffect();
  }, [password2]);

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={async () => {
            const pwData = await getSimplePwData();
            if (!pwData.password) {
              await setIsSecurity(false);
            }
            if (route.params?.path === 'signUp') {
              navigation.replace('MainStack');
            } else {
              navigation.navigate('PasswordSecurity', { refresh: true });
            }
          }}
        >
          <Text style={styles.headerRightText}>취소</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Image source={assets.logo} style={styles.logoIcon} />
        <Text style={styles.headerText}>
          {isCheckMode
            ? '다시 한번 입력해주세요 '
            : '간편 비밀번호를 설정해 주세요.'}
        </Text>
        {/*다시 한번 입력해주세요 하며 한 번 더 입력 요청 필요.*/}
      </View>
      <View style={styles.circleWrapper}>
        <Image
          source={currentPassword[0] ? assets.pw_purple : assets.pw_grey}
          style={styles.circleIcon}
        />
        <Image
          source={currentPassword[1] ? assets.pw_purple : assets.pw_grey}
          style={styles.circleIcon}
        />
        <Image
          source={currentPassword[2] ? assets.pw_purple : assets.pw_grey}
          style={styles.circleIcon}
        />
        <Image
          source={currentPassword[3] ? assets.pw_purple : assets.pw_grey}
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
export default SimplePassword;
