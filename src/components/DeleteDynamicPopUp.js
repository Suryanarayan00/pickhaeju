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
const DeleteDynamicPopUp = ({header,title,isVisible, onCancel, onDelete }) => {
    console.log('header');
    console.log(header);

  return (
    <Modal isVisible={isVisible} onCancel={onCancel}>
      <View style={styles.container}>
        <Text style={styles.titleText}>{header}</Text>
        <Text style={styles.contentsText}>
        {title}</Text>

        <View style={styles.buttonBox}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.buttonWrapper}
            onPress={onCancel}
          >
            <Text style={styles.cancelText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.buttonWrapper}
            onPress={onDelete}
          >
            <Text style={styles.confirmText}>삭제</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteDynamicPopUp;
