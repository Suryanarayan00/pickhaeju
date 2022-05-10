import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '#common/colors';
import assets from '../../../assets';
import SnsLogin from '#components/SnsLogin';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Document from '#components/Document';
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  emailButton: {
    borderColor: colors.veryLightPink,
    borderWidth: 1,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    marginHorizontal: 30,
  },
  emailText: {
    color: colors.lightIndigo,
    fontSize: 15,
    paddingLeft: 12,
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
  loginWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 38,
  },
  loginButton: {
    color: colors.lightIndigo,
    // fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
  },
  introImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
  introInfoWrapper: { marginVertical: 26 },
  emailIcon: { width: 20, height: 17 },
  loginText: { color: colors.battleshipGrey },
  logoTextWrapper: {
    marginLeft: 30,
    marginTop: '25%',
    zIndex: 10,
  },
  logoStyle: { width: 100, height: 40, marginBottom: 19 },
  titleWrapper: {
    fontSize: 23,
    color: colors.blueGrey,
  },
});
const LandingIntro = ({ navigation }) => {
  // const inset = useSafeAreaInsets();
  const Wrapper = Platform.OS === 'web' ? Document : React.Fragment;
  return (
    <Wrapper>
      <View style={styles.container}>
        <View style={{ flex: 1, overflow: 'hidden' }}>
          <View style={[styles.logoTextWrapper, {}]}>
            <Image
              source={assets.logo}
              style={styles.logoStyle}
              resizeMode={'contain'}
            />
            <Text style={styles.titleWrapper}>
              <Text style={{ fontFamily: 'Roboto-Bold' }}>개미</Text>에{' '}
              <Text style={{ fontFamily: 'Roboto-Bold' }}>날개</Text>를 달다
            </Text>
          </View>
          <Image
            source={assets.bg_login_visual}
            style={styles.introImage}
            resizeMode={'stretch'}
          />
        </View>
        <View style={[styles.introInfoWrapper, { paddingBottom: 10 }]}>
          <View style={{ marginTop: 34, paddingBottom: 10 }}>
            <SnsLogin />
          </View>
        </View>
      </View>
    </Wrapper>
  );
};

export default LandingIntro;
