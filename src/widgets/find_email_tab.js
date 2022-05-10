import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import colors from '#common/colors';
import DefaultButton from '#components/Button/DefaultButton';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: { paddingHorizontal: 31, marginTop: 26 },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: colors.cloudyBlueTwo,
    flex: 1,
  },
  textInput: { paddingVertical: 14, fontSize: 15 },
  buttonWrapper_on: {
    minWidth: 74,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.lightIndigo,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 7,
  },
  buttonText_on: {
    fontSize: 10,
    letterSpacing: -0.25,
    color: colors.lightIndigo,
  },
  buttonWrapper_off: {
    minWidth: 74,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.cloudyBlue,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 7,
  },
  buttonText_off: {
    fontSize: 10,
    letterSpacing: -0.25,
    color: colors.blueyGrey,
  },
});
const FindEmail = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder={"휴대폰 번호 ('-' 제외)"}
            keyboardType={'numeric'}
            placeholderTextColor={colors.cloudyBlueTwo}
          />
        </View>
        <TouchableOpacity activeOpacity={0.85} style={styles.buttonWrapper_off}>
          <Text style={styles.buttonText_off}>인증번호 전송</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.wrapper, { marginTop: 20 }]}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder={'인증 번호'}
            keyboardType={'numeric'}
            placeholderTextColor={colors.cloudyBlueTwo}
          />
        </View>
        <TouchableOpacity activeOpacity={0.85} style={styles.buttonWrapper_off}>
          <Text style={styles.buttonText_off}>확인</Text>
        </TouchableOpacity>
      </View>
      <DefaultButton
        containerStyle={{ marginTop: 42 }}
        onPress={() => {
          navigation.navigate('LandingFoundId');
        }}
      >
        이메일 찾기
      </DefaultButton>
    </View>
  );
};

export default FindEmail;
