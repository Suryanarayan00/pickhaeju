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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
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
const DeleteFollowerPopUp = ({ isVisible, onCancel }) => {
  console.log({ isVisible });
  return (
    <Modal isVisible={!!isVisible} onCancel={onCancel}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{
              uri: isVisible?.avatar,
            }}
            style={styles.userImage}
          />
        </View>

        <Text style={styles.titleText}>팔로워를 삭제하시나요?</Text>
        <Text style={styles.contentsText}>
          {`${isVisible?.name}님은 회원님의 팔로워 리스트에서 삭제됐다는 알림을 받지 않습니다.`}
        </Text>

        <View style={styles.buttonBox}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.buttonWrapper}
            onPress={onCancel}
          >
            <Text style={styles.cancelText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.85} style={styles.buttonWrapper}>
            <Text style={styles.confirmText}>삭제</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteFollowerPopUp;
