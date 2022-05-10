import React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import colors from '#common/colors';
import assets from '../../../assets';
import DefaultButton from '#components/Button/DefaultButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'space-evenly',
  },
  checkIcon: { width: 86, height: 86 },
  finishTextWrapper: { marginVertical: 30 },
  largeText: {
    fontSize: 30,
    color: colors.greyBlue,
    marginBottom: 14,
    letterSpacing: -0.75,
  },
  userName: { color: colors.purply, fontSize: 24 },
  smallText: { fontSize: 24, color: colors.greyBlue, letterSpacing: -0.6 },
  infoText: {
    textAlign: 'center',
    color: colors.blueGrey,
    marginBottom: 41,
    letterSpacing: -0.35,
  },
  progressBar: {
    height: 2.5,
    backgroundColor: colors.paleLilacTwo,
  },
  innerProgressBar: {
    height: 2.5,
    backgroundColor: colors.aqua,
  },
});
const LandingFinish = () => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const userInfo = route.params?.userInfo; //useSelector((state) => state.auth.principal?.userInfo);
  return (
    <>
      {/* <View style={styles.progressBar}>
        <View style={[styles.innerProgressBar, { width: '100%' }]} />
      </View> */}
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Image
            source={assets.finish_check}
            style={styles.checkIcon}
            resizeMode={'contain'}
          />
          <View style={styles.finishTextWrapper}>
            <Text style={styles.largeText}>회원가입 완료</Text>
            <Text style={styles.userName}>
              {userInfo?.name}
              <Text style={{ color: colors.greyBlue }}>님</Text>
            </Text>
            <Text style={styles.smallText}>가입을 환영합니다.</Text>
          </View>
        </View>
        <View style={{ paddingBottom: inset.bottom + 60 }}>
          <Text style={styles.infoText}>
            {Platform.OS === 'web'
              ? '아래 버튼을 클릭하여 PICK을 작성해 주시겠어요?'
              : '아래 버튼을 클릭하여\n나머지 프로필을 마저 완성해 주세요.'}
          </Text>
          <DefaultButton
            onPress={() => {
              if (Platform.OS === 'web') {
              } else {
                navigation.navigate('MakeProfile', { path: 'signUp' });
               }
            }}
          >
            {Platform.OS === 'web' ? 'PICK 작성하러 가기' : '프로필 완성하기'}
          </DefaultButton>
        </View>
      </View>
    </>
  );
};

export default LandingFinish;
