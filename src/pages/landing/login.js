import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '#common/colors';
import assets from '../../../assets';
import RoundButton from '#components/Button/RoundButton';
import SnsLogin from '#components/SnsLogin';
import { useLinkTo } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Document from '#components/Document';
import { useNavigation } from '@react-navigation/native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { restApi, setToken } from '#common/api';
import AsyncStorage from '@react-native-community/async-storage';
import { me } from '#data/auth/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoTextWrapper: {
    paddingHorizontal: 30,
    paddingTop: 40,
    flex: 2,
  },
  titleWrapper: {
    fontSize: 23,
    color: colors.blueGrey,
  },
  inputPassword: { paddingHorizontal: 30, marginTop: 34 },
  inputBox: {
    borderBottomColor: colors.cloudyBlueTwo,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 12,
    marginHorizontal: 30,
  },
  checkText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonWrapper: { paddingHorizontal: 30, marginVertical: 23 },
  findWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 48,
  },
  guideLine: {
    height: 12,
    width: 1,
    backgroundColor: colors.greyBlue,
    marginHorizontal: 24,
  },
  joinButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 38,
  },
  blindIcon: { width: 20, height: 18 },
  findText: { color: colors.greyBlue },
  joinButton: { color: colors.lightIndigo, fontFamily: 'Roboto-Bold' },
  logoStyle: { width: 100, height: 40, marginBottom: 19 },
  checkIcon: { width: 12, height: 8 },
  input: { fontSize: 15, flex: 1, paddingVertical: 15 },
});
const LandingLogin = () => {
  const linkTo = useLinkTo();
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [blind, setBlind] = useState(true);

  const handlePress = async () => {
    try {
      const { data } = await restApi.post('/users/auth/login', {
        email,
        password,
      });
      if (data) {
        setToken(data);
        AsyncStorage.setItem('token', JSON.stringify(data));
        dispatch(me(data?.userId));
        navigation.navigate('MainStack');
      }
    } catch (e) {
      console.log('이메일 주소 혹은,\n비밀번호가 올바르지 않습니다.');
    }
  };
  return (
    <Document>
      <View style={[styles.container, { paddingTop: inset.top }]}>
        <View style={styles.logoTextWrapper}>
          <Image
            source={assets.logo}
            style={styles.logoStyle}
            resizeMode={'contain'}
          />
          <Text style={styles.titleWrapper}>
            <Text style={{ fontFamily:'Roboto-Bold' }}>개미</Text>에{' '}
            <Text style={{ fontFamily:'Roboto-Bold' }}>날개</Text>를 달다
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          {/*<View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize={'none'}
              placeholder={'이메일'}
            />
          </View>*/}

          {/*<View style={[styles.inputBox, { marginTop: 20 }]}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={blind}
              placeholder={'비밀번호'}
            />

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => {
                setBlind(!blind);
              }}
            >
              <Image
                source={
                  blind ? assets.icon_news_view : assets.icon_news_view_color
                }
                style={styles.blindIcon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>*/}
          {/*<View style={styles.buttonWrapper}>
            <RoundButton onPress={handlePress}>로그인</RoundButton>
          </View>*/}
          {/*<View style={styles.findWrapper}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.navigate('LandingFindId')}
            >
              <Text style={styles.findText}>아이디 찾기</Text>
            </TouchableOpacity>
            <View style={styles.guideLine} />
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.navigate('LandingFindPw')}
            >
              <Text style={styles.findText}>비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>*/}

          <SnsLogin />
          <View style={styles.joinButtonWrapper}>
            <Text style={{ color: colors.battleshipGrey }}>
              계정이 없으신가요?{' '}
            </Text>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.navigate('LandingJoin')}
            >
              <Text style={styles.joinButton}>회원가입</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Document>
  );
};

export default LandingLogin;
