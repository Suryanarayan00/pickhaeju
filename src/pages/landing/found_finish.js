import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import colors from '#common/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import assets from '../../../assets';
import DefaultButton from '#components/Button/DefaultButton';
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
const FoundFinish = (props) => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Image
            source={assets.finish_check}
            style={styles.checkIcon}
            resizeMode={'contain'}
          />
          <View style={styles.finishTextWrapper}>
            <Text style={styles.largeText}>비밀번호 설정 완료</Text>

            <Text style={styles.smallText}>
              새로운 비밀번호로{'\n'}변경이 완료되었습니다.
            </Text>
          </View>
        </View>
        <View style={{ paddingBottom: inset.bottom + 60 }}>
          <Text style={styles.infoText}>
            비밀번호 재설정과 함께{'\n'}자동으로 로그인 되었습니다.
          </Text>
          <DefaultButton
            onPress={() => {
              navigation.navigate('MainStack');
            }}
          >
            포트폴리오 페이지로 이동
          </DefaultButton>
        </View>
      </View>
    </>
  );
};

export default FoundFinish;
