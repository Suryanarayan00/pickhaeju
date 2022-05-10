import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import PickAgreement2 from '../../agreementHtml/PickAgreement2';
import PickAgreement1 from '../../agreementHtml/PickAgreement';
import { useRoute } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import Modal from '#components/Modal';
import { Image } from 'react-native';
import assets from '../../../assets';
import colors from '../../common/colors';

const LandingAgreementDetails = (props) => {
  const route = useRoute();
  const { onCancel, data } = props;

  console.log('data?.uri');
  console.log(data?.uri);
  return (
    <Modal
      onCancel={onCancel}
      isVisible={!!data}
      containerStyle={{
        width: Dimensions.get('window').width * 0.8,
        height: 400,
      }}
    >
      <View
        style={{
          width: Dimensions.get('window').width * 0.8,
          height: 400,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            maxWidth: 481,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 5,
            paddingHorizontal: 15,
            marginTop: 10,
            borderRadius: 15,
          }}
        >
          <View />
          <Text style={{ fontSize: 13, color: colors.dark }}>
            {data?.label}
          </Text>
          {data?.key === 'newsletter' ? (
            <Text style={{ color: colors.blueGrey, fontSize: 13 }}>
              {' '}
              (선택)
            </Text>
          ) : (
            <Text style={{ color: colors.blueGrey, fontSize: 13 }}>
              {' '}
              (필수)
            </Text>
          )}
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
        <WebView
        useWebKit={false} 
        scalesPageToFit={false}
        
          style={{
            marginTop: 15,
            width: Dimensions.get('window').width * 0.7,
            height: 350,
          }}
          originWhitelist={['*']}
         
          source={{
            uri: data?.uri,
          }}
        />
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            width: '100%',
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
    </Modal>
  );
};

export default LandingAgreementDetails;
