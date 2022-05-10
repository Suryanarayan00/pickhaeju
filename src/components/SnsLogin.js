import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '#common/colors';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import {
  appleSignIn,
  appleSignUp,
  kakaoSignIn,
  kakaoSignUp,
  googleSignUp
} from '#common/authApi';
import AsyncStorage from '@react-native-community/async-storage';
import { appleAuth } from '#modules/appleLogin';
import assets from '../../assets';
import { me, logOut } from '#data/auth/actions';
import { setToken } from '#common/api';
import { toastShow } from '#data/toast/ToastAction';
import KakaoSDK from '@actbase/react-kakaosdk';
// import { appleAuth } from '../customModules/appleLogin';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const styles = StyleSheet.create({
  snsTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 18.5,
  },
  centerLine: {
    backgroundColor: colors.veryLightPink,
    height: 1,
    width: 90,
  },
  snsButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { color: colors.battleshipGrey, paddingHorizontal: 14 },
  socialIcon: { width: 46, height: 46, marginHorizontal: 14 },
  socialText: { fontSize: 12, color: colors.cloudyBlue, marginTop: 10 },
});
const LandingJoin = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  GoogleSignin.configure({
    webClientId: '246176937000-eiqm7tvda1hg59q8b6kq30v0h8ev27ij.apps.googleusercontent.com',
    offlineAccess: true,
  });

// Somewhere in your code
const signInGoogle = async () => {
try {
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  console.log('userInfo',userInfo);
 // alert(JSON.stringify(userInfo));

  const result = await googleSignUp(userInfo?.idToken);
  if (result?.data?.message == 'already registered') {
    //로그인 진행
    const loginResult = await googleSignUp(userInfo?.idToken,false);
    if (loginResult.data.token) {
      setToken(loginResult.data.token);
      await dispatch(me());
      dispatch(logOut(false));
      await AsyncStorage.setItem('token', loginResult.data.token);
       navigation.replace('MainStack');
    }
  } else {
    navigation.navigate('LandingAgreement', {
      form: result?.data,
    });
  console.log('login agreement');
  console.log(result?.data);
  }
} catch (error) {
  alert(JSON.stringify(error));
  if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    // user cancelled the login flow
    console.log('SIGN_IN_CANCELLED');
      console.log(error.code);
  } else if (error.code === statusCodes.IN_PROGRESS) {
    console.log('IN_PROGRESS');
      console.log(error.code);
    // operation (e.g. sign in) is in progress already
  } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    console.log('PLAY_SERVICES_NOT_AVAILABLE');
    console.log(error.code);
    // play services not available or outdated
  } else {
    // some other error happened
  }
}
};
  const appleLogin = async () => {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    console.log('appleAuthRequestResponse', appleAuthRequestResponse);
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );
    console.log('appleAuthcredentialState', credentialState);
    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated

      return appleAuthRequestResponse;
    }
  };

  const onPressSignIn = async (social) => {
  
    if (social === 'kakao') {
      const kakaoAppkey =
        Platform.OS === 'web'
          ? '265aa124b9d19662d3d7ca9659d63bf0'
          : '930cb8e9c572b17bd291a47db4fbc594';
      await KakaoSDK.init(kakaoAppkey);
      const kakaoInfo = await KakaoSDK.login();
       const result = await kakaoSignUp(kakaoInfo.access_token);
       if (result?.data?.message == 'already registered') {
        //로그인 진행
        const loginResult = await kakaoSignIn(kakaoInfo.access_token);
        if (loginResult.data.token) {
          setToken(loginResult.data.token);
          await dispatch(me());
          dispatch(logOut(false));
          await AsyncStorage.setItem('token', loginResult.data.token);
           navigation.replace('MainStack');
        }
      } else {
        navigation.navigate('LandingAgreement', {
          form: result?.data,
        });
      console.log('login agreement');
      console.log(result?.data);
      }
    } else if (social === 'apple') {
      const info = await appleLogin();
      console.log('apple info', info);
      const result = await appleSignUp(info.identityToken);
      if (result.message == 'already registered') {
        //로그인 진행
        const loginResult = await appleSignIn(info.identityToken);
        console.log('apple signin info', info);
        if (loginResult.data.token) {
          setToken(loginResult.data.token);
          await dispatch(me());
          await AsyncStorage.setItem('token', loginResult.data.token);
          navigation.replace('MainStack');
        }
      } else {
        navigation.navigate('LandingAgreement', {
          form: result?.data,
        });
      }
    }
  };

  return (
    <View>
      <View style={styles.snsTextWrapper}>
        <View style={styles.centerLine} />
        <Text style={styles.title}>SNS로 계정연결</Text>
        <View style={styles.centerLine} />
      </View>
      <View style={styles.snsButtonWrapper}>
        {/* <TouchableOpacity
          activeOpacity={0.85}
          style={{ alignItems: 'center' }}
          onPress={() => {
            dispatch(toastShow('준비 중인 기능입니다.'));
          }}
        >
          <Image
            source={assets.icon_social_naver}
            style={styles.socialIcon}
            resizeMode={'contain'}
          />
          <Text style={styles.socialText}>네이버</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          activeOpacity={0.85}
          style={{ alignItems: 'center' }}
          onPress={async () => {
            await onPressSignIn('kakao');
            // navigation.navigate('LandingAgreement', {
            //   platform: 'kakao',
            // });
          }}
        >
          <Image
            source={assets.icon_social_kakao}
            style={styles.socialIcon}
            resizeMode={'contain'}
          />
          <Text style={styles.socialText}>카카오</Text>
        </TouchableOpacity>

         <TouchableOpacity
          activeOpacity={0.85}
          style={{ alignItems: 'center' }}
          onPress={async () => {
            await signInGoogle();
            //dispatch(toastShow('준비 중인 기능입니다.'));
          }}
         >
           <Image
            source={assets.icon_social_google}
            style={styles.socialIcon}
            resizeMode={'contain'}
           />
          <Text style={styles.socialText}>구글</Text>
        </TouchableOpacity>

        {Platform.OS === 'ios' && (
          <TouchableOpacity
            activeOpacity={0.85}
            style={{ alignItems: 'center' }}
            onPress={async () => {
              await onPressSignIn('apple');
              // navigation.navigate('LandingAgreement', {
              //   platform: 'apple',
              // });
            }}
          >
            <Image
              source={assets.icon_social_apple}
              style={styles.socialIcon}
              resizeMode={'contain'}
            />
            <Text style={styles.socialText}>애플</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default LandingJoin;
