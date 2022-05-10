import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import WebView from 'react-native-webview';
import { restApi } from '#common/api';
import { useRoute } from '@react-navigation/native';

const NewsOriginalText = () => {
  const [data, setData] = useState();
  const route = useRoute();
  // useEffect(() => {
  //   const loadData = async () => {
  //     const { data } = await restApi.post(`/data/article/single`, {
  //       articleId: `${route?.params?.id}`,
  //     });
  //     setData(data);
  //     console.log('data', data);
  //   };
  //   loadData().catch(console.warn);
  // }, []);
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: route.params?.url }}
        automaticallyAdjustContentInsets={true}
      />
    </View>
  );
};

export default NewsOriginalText;
