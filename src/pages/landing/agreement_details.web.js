import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import WebView from 'react-native-webview';
import PickAgreement2 from '../../agreementHtml/PickAgreement2';
import PickAgreement1 from '../../agreementHtml/PickAgreement';
import { useRoute } from '@react-navigation/native';
import assets from '../../../assets';
import colors from '../../common/colors';

const LandingAgreementDetails = (props) => {
  const { onCancel, data } = props;
  const route = useRoute();

  if (!data) {
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
        backgroundColor: '#00000020',
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
          <Text style={{ fontSize: 12, color: colors.dark }}>
            {data?.label}
          </Text>
          {data?.key === 'newsletter' ? (
            <Text style={{ color: colors.blueGrey, fontSize: 15 }}>
              {' '}
              (선택)
            </Text>
          ) : (
            <Text style={{ color: colors.blueGrey, fontSize: 15 }}>
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
        <iframe
          style={{
            maxWidth: 480,
            minWidth: 400,
            width: '100%',
            height: 428,
          }}
          originWhitelist={['*']}
          src={data?.uri}
          frameborder={0}
          framespacing={0}
          marginheight={0}
          marginwidth={0}
          vspace={0}
        />

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

export default LandingAgreementDetails;
