import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import WebView from 'react-native-webview';
import PickAgreement2 from '../agreementHtml/PickAgreement2';
import PickAgreement1 from '../agreementHtml/PickAgreement';
import { useRoute } from '@react-navigation/native';
import assets from '../../assets';
import colors from '../common/colors';

const Modal = (props) => {
  const {
    onCancel,
    data,
    children,
    isVisible,
    style,
    containerStyle,
    contentsContainer,
  } = props;
  const route = useRoute();

  if (!isVisible) {
    return null;
  }
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
      }}
      onPress={onCancel}
    >
      <View
        style={{
          maxWidth: 481,
          backgroundColor: 'white',
          borderRadius: 15,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            maxWidth: 481,
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            paddingHorizontal: 15,
            marginTop: 10,
            borderRadius: 15,
          }}
        >
          <View />
          <Text style={{ fontSize: 15, color: colors.dark }}>
            {data?.label}
          </Text>
          <TouchableOpacity
            style={{ position: 'absolute', right: 15 }}
            onPress={onCancel}
          >
            <Image
              style={{ width: 13, height: 13 }}
              source={assets.icon_close_lg}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {children}

        <TouchableOpacity
          style={{
            justifyContent: 'center',

            height: 43,
            borderTopWidth: 1,
            borderColor: colors.lightPeriwinkle,
            alignItems: 'center',
            marginTop: 10,
          }}
          onPress={onCancel}
        >
          <Text style={{ color: colors.lightIndigo, fontSize: 12 }}>확인</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default Modal;
