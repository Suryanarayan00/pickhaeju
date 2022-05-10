import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import colors from '#common/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import assets from '../../../assets';
import ToggleSwitch from '#components/ToggleSwitch';
import { getSimplePwData, setIsSecurity, setIsBio } from '../../utils/utils';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  notifyWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    letterSpacing: -0.4,
    color: colors.dark,
  },
  switchStyle: { width: 40, height: 20 },
  switchCircleStyle: { width: 16, height: 16 },
  greyBar: { backgroundColor: colors.paleGreyThree, height: 10 },
  arrowIcon: {
    width: 8,
    height: 14,
    marginRight: 16,
  },
});
const PasswordSecurity = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [enableSecurity, setEnableSecurity] = useState(false);
  const [enableBio, setEnableBio] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);

  const [bool, setBool] = useState(false);
  const [bioBool, setBioBool] = useState(false);

  const password = useRef();
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [isVisible, setIsVisible] = useState(false);
  const onPressSecurity = async () => {
    let secVal = !bool;
    setBool(secVal);
    if (secVal && !password.current) {
      navigation.push('SimplePassword');
    }
    setEnableSecurity(secVal);
    await setIsSecurity(secVal);

    if (!secVal) {
      setEnableBio(false);
      await setIsBio(false);
      setBioBool(false);

    }
  };

  const onPressBio = () => {
    let bioVal=!bioBool;
    if (!password.current || !enableSecurity) {
      return;
    }
    if (Platform.OS === 'android' && Platform.Version < 22) {
      Alert.alert('안내', '사용하실수 없는 기종입니다.');
      return;
    }
    setBioBool(bioVal);
    setEnableBio(bioVal);
    setIsBio(bioVal);
  };

  useEffect(() => {
    (async () => {
      const result = await getSimplePwData();
      setEnableSecurity(result.isSecurity);
      setEnableBio(result.isBio);
      password.current = result.password;
      return result;
    })();
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={[styles.greyBar, { marginTop: 38 }]} />

      <View style={styles.notifyWrapper}>
        <Text style={styles.text}>잠금 활성화</Text>
        <ToggleSwitch
          state={enableSecurity}
          onPress={onPressSecurity}
          containerStyle={[styles.switchStyle]}
          circleStyle={[styles.switchCircleStyle]}
          activeColor={colors.lightIndigo}
        />
      </View>
      <View style={styles.greyBar} />
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.notifyWrapper}
        onPress={() => navigation.push('SimplePassword')}
      >
        <Text style={styles.text}>간편 비밀번호 변경</Text>
        <Image source={assets.notify_arrow} style={styles.arrowIcon} />
      </TouchableOpacity>
      {/* <View style={styles.greyBar} />
      <View style={styles.notifyWrapper}>
        <Text style={styles.text}>생체인증 사용</Text>
        <ToggleSwitch
          state={enableBio}
          onPress={onPressBio}
          containerStyle={[styles.switchStyle]}
          circleStyle={[styles.switchCircleStyle]}
          activeColor={colors.lightIndigo}
        />
      </View> */}
      {/* <View style={styles.greyBar} /> */}
      {/* <TouchableOpacity
        activeOpacity={0.85}
        style={styles.notifyWrapper}
        onPress={async () => {
          setIsVisible(true);
        }}
      >
        <PasswordChangeTermPopUp
          isVisible={isVisible}
          onPressSave={() => setIsVisible(false)}
        />
        <Text style={styles.text}>비밀번호 입력 주기</Text>
        <Image source={assets.notify_arrow} style={styles.arrowIcon} />
      </TouchableOpacity> */}
      <View style={styles.greyBar} />
      {/*     <PasswordChangeTermPopUp />*/}
    </View>
  );
};

export default PasswordSecurity;
