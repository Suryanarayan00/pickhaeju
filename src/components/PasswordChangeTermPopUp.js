import React from 'react';
import Modal from '#components/Modal';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import RadioButton from '#components/Button/RadioButton';
import colors from '#common/colors';

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.lightPeriwinkle,
    marginTop: 21,
  },
  bottomButtonText: {
    fontSize: 16,
    letterSpacing: -0.4,
    paddingVertical: 18,
    textAlign: 'center',
    color: colors.lightIndigo,
  },
  title: {
    fontSize: 18,
    letterSpacing: -0.45,
    color: colors.dark,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 30,
  },
  radioWrapper: { marginVertical: 13 },
});
const PasswordChangeTermPopUp = ({ isVisible = false, onPressSave }) => (
  <Modal isVisible={isVisible}>
    <Text style={styles.title}>비밀번호 변경주기</Text>
    <View style={{ marginHorizontal: 22 }}>
      <View style={styles.radioWrapper}>
        <RadioButton color={colors.dark}>항상</RadioButton>
      </View>
      <View style={styles.radioWrapper}>
        <RadioButton color={colors.dark}>하루에 한번</RadioButton>
      </View>
      <View style={styles.radioWrapper}>
        <RadioButton color={colors.dark}>
          로그아웃 하지 않은 이상 계속 유지
        </RadioButton>
      </View>
    </View>
    <View style={styles.buttonWrapper}>
      <TouchableOpacity style={{ flex: 1 }} onPress={onPressSave}>
        <Text style={styles.bottomButtonText}>저장</Text>
      </TouchableOpacity>
    </View>
  </Modal>
);

export default PasswordChangeTermPopUp;
