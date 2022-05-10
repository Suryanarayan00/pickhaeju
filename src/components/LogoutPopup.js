import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from '#components/Modal';
import colors from '#common/colors';
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 15,
    paddingVertical: 36,
    paddingHorizontal: 35,
    alignItems: 'center',
  },

  contentsText: {
    textAlign: 'center',
    marginBottom: 37,
    fontSize: 12,
    lineHeight: 24,
    color: colors.battleshipGrey,
  },
  titleText: {
    fontSize: 18,
    color: colors.greyBlue,
    // fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    marginVertical: 27,
  },
  cancelText: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.battleshipGrey,
  },
  buttonWrapper: { paddingHorizontal: 21 },
  confirmText: { color: colors.lightIndigo, fontSize: 18, textAlign: 'center' },
  updateIcon: { width: 36, height: 36 },
  buttonBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImage: { width: 62, height: 62, borderRadius: 31 },
});

const LogoutPopUp = ({ isVisible, onCancel, onPress }) => {
  return (
    <Modal isVisible={isVisible} onOk={onCancel} onCancel={onPress}>
      <View style={styles.container}>
        <Text style={styles.titleText}>정말 로그아웃 하시나요?</Text>
        <Text style={styles.contentsText}>
          로그인을 유지하면{'\n'}최신 정보를 놓치지 않을 수 있어요.
        </Text>

        <View style={styles.buttonBox}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.buttonWrapper}
            onPress={onPress}

          >
            <Text style={styles.cancelText}>로그아웃</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.buttonWrapper}
            onPress={onCancel}
          >
            <Text style={styles.confirmText}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutPopUp;
