import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '#common/colors';
import Assets from '../../assets';
import Modal from '#components/Modal';

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
    paddingTop: 34,
    paddingBottom: 53,
    fontSize: 15,
    lineHeight: 24,
    color: colors.battleshipGrey,
  },
  updateTitle: {
    fontSize: 18,
    paddingLeft: 13,
    // fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    color: colors.greyBlue,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const UpdatePopUp = ({ isVisible, onCancel }) => {
  return (
    <Modal isVisible={isVisible} onCancel={onCancel}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={Assets.icon_update} style={styles.updateIcon} />
          <Text style={styles.updateTitle}>업데이트 안내</Text>
        </View>

        <Text style={styles.contentsText}>
          새버전의 앱버전(1.0.1)이 있습니다.{'\n'}지금 업데이트 하시겠습니까?
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
            <Text style={styles.confirmText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UpdatePopUp;
