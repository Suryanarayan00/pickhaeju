import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import colors from '#common/colors';

const styles = StyleSheet.create({
  modalWrapper: {
    width: '100%',
    backgroundColor: colors.white,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  container: {
    padding: 0,
    margin: 0,
    justifyContent: 'flex-end',
  },
});

const BottomModal = ({ onCancel, children, isVisible }) => (
  <Modal
    isVisible={isVisible}
    transparent={true}
    style={styles.container}
    onBackButtonPress={onCancel}
    //onBackdropPress={onCancel}
  >
    <View style={[styles.modalWrapper]}>
      <View style={[styles.contents]}>{children}</View>
    </View>
  </Modal>
);
export default BottomModal;
