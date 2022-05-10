import React from 'react';
import { View, StyleSheet } from 'react-native';
import Wrapper from 'react-native-modal';
import colors from '#common/colors';

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  container: {
    width: 320,
    borderRadius: 15,
    backgroundColor: 'white',
  },
});

const Modal = ({
  children,
  isVisible,
  onCancel,
  style,
  containerStyle,
  contentsContainer,
}) => {
  return (
    <Wrapper
      style={styles.wrapper}
      transparent={true}
      visible={isVisible}
     // onBackdropPress={onCancel}
    >
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.contentsContainer, contentsContainer]}>
          {children}
        </View>
      </View>
    </Wrapper>
  );
};

export default Modal;
