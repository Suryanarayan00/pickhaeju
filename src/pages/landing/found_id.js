import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import colors from '#common/colors';
import RoundButton from '#components/Button/RoundButton';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  titleText: {
    fontSize: 18,
    letterSpacing: -0.45,
    color: colors.dark,
    marginHorizontal: 21,
    marginTop: 21,
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
});
const LandingFoundId = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        회원님의 이메일 주소는 아래와 같습니다.
      </Text>
      <View style={styles.emailWrapper}>
        <Text style={styles.emailText}>pickhaeju@gmail.com</Text>
      </View>
      <RoundButton
        style={styles.buttonWrapper}
        onPress={() => navigation.navigate('LandingLogin')}
      >
        로그인
      </RoundButton>
      <View style={[styles.buttonWrapper, { marginTop: 14 }]}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('LandingFindId')}
        >
          <Text style={styles.buttonText}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LandingFoundId;
