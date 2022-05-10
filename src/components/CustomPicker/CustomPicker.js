import React, { useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  Modal,
  View,
  Dimensions,
  Platform,
  Image,
  Text,
  TouchableOpacity,
  } from 'react-native';
import assets from '../../../assets';
 import { Picker } from '@react-native-community/picker';
const CustomPicker = ({ onSelect, value, style, width = 110, ...props }) => {
  const [selectedValue, setSelectedValue] = useState(
    value === undefined ? '' : value,
  );
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const { width: WindowWidth } = Dimensions.get('window');
  const selectText = props.data.find((data) => data.value === selectedValue);

  const _maybeRenderModal = () => {
    if (!modalIsVisible) {
      return null;
    }

    const buttons = props.data.map((value) => {
      return (
        <Picker.Item key={value.text} label={value.text} value={value.value} />
      );
    });

    return (
      <Modal transparent={true} visible={modalIsVisible} animationType="slide">
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
          }}
          pointerEvents={modalIsVisible ? 'auto' : 'none'}
        >
          <View style={styles.toolbar}>
            <View style={styles.toolbarRight}>
              <Button title="Done" onPress={_handlePressDone} />
            </View>
          </View>
          <Picker
            style={{
              width: WindowWidth,
              height: 300,
              backgroundColor: '#e1e1e1',
            }}
            selectedValue={selectedValue}
            onValueChange={(itemValue) => {
              setSelectedValue(itemValue);
              // onSelect(itemValue);
            }}
          >
            {buttons}
          </Picker>
        </View>
      </Modal>
    );
  };

  const _handlePressDone = () => {
    if (modalIsVisible && selectedValue === '') {
      const value = props.data[0].value;
      setSelectedValue(value);
      onSelect(value);
    }
    onSelect(selectedValue);
    setModalIsVisible(false);
  };

  const _handlePressOpen = () => {
    if (modalIsVisible) {
      return;
    }
    setModalIsVisible(true);
  };

  const buttons = props.data.map((value) => {
    return (
      <Picker.Item key={value.text} label={value.text} value={value.value} />
    );
  });

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && (
        <TouchableOpacity
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
            },
            style,
          ]}
          onPress={_handlePressOpen}
        >
          <Text
            onPress={_handlePressOpen}
            placeholder={props.placeholder}
            value={selectText && selectText.text}
          >
            {selectText && selectText.text}
          </Text>
          <Image
            source={assets.arrow_down_gray}
            style={{
              width: 6,
              height: 4,
              marginLeft: 5,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      {Platform.OS === 'android' && (
        <View style={[styles.pickerContainer, style]}>
          <Picker
            enabled={props.enabled}
            style={{ width: width, margin: 0 }}
            mode="dropdown"
            selectedValue={selectedValue}
            onValueChange={(itemValue) => {
              setSelectedValue(itemValue);
              onSelect(itemValue);
            }}
          >
            {buttons}
          </Picker>
        </View>
      )}

      {Platform.OS === 'ios' && _maybeRenderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#cecece',
    flex: 1,
  },
  labelStyle: {
    fontSize: 13,
    fontFamily: 'Roboto-Bold',
    // fontWeight: '700',
    color: 'red',
  },
  dropdownContainer: {
    width: 100,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  toolbar: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  toolbarRight: {
    alignSelf: 'flex-end',
  },
});

export default CustomPicker;
