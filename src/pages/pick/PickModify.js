import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from '#common/colors';
/*import { TabBar, TabView } from 'react-native-tab-view';*/
import { useDispatch } from 'react-redux';
import useKeyboard from '../../utils/useKeyboard';
// import {
//   actions,
//   RichEditor,
//   RichToolbar,
// } from 'react-native-pell-rich-editor';
// import { RichEditor, RichToolbar } from '#components';
import DefaultButton from '#components/Button/DefaultButton';
import { editThread } from '../../common/threadApi';
import { actions, RichEditor, RichToolbar } from '#components/RichEditor';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  titleInput: {
    minHeight: 44,
    padding: 10,
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#fafafa',
    backgroundColor: '#ffffff',
  },
});

const { width: wWidth } = Dimensions.get('window');

const PickModify = (props) => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const route = useRoute();
  const { data, threadId } = route?.params;
  const {
    content,
    title,
    type,
    opinion,
    primaryTicker,
    secondaryTickers: tickers,
  } = data;
  console.log('data!', data, threadId);
  const dispatch = useDispatch();

  const editor = useRef();
  const [showToolbar, setShowToolbar] = useState(false);
  const [keyboardHeight] = useKeyboard();
  const scrollViewRef = useRef();
  const [htmlContent, setHtmlContent] = useState(content);
  const [htmlTitle, setHtmlContentTitle] = useState(title);
  const [webContent, setWebContent] = useState(
    RichEditor?.createValueFromString?.(content, 'html'),
  ); //web전용
  console.log('content, title', content, title, route);
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <TextInput
        placeholder="제목"
        placeholderTextColor="#999"
        style={styles.titleInput}
        defaultValue={title}
        autoCorrect={false}
        onChangeText={(value) => setHtmlContentTitle(value || '')}
      />

      <ScrollView
        style={{ flex: 1 }}
        ref={scrollViewRef}
        onContentSizeChange={(contentWidth, contentHeight) => {
          // scrollViewRef.current?.scrollToEnd({ animated: false });
        }}
      >
        <RichEditor
          style={{ flex: 1, minHeight: 500 }}
          scrollEnabled={false}
          ref={editor}
          onFocus={() => {
            console.log('focus');
            setShowToolbar(true);
          }}
          onBlur={() => {
            console.log('blur');
            setShowToolbar(false);
          }}
          initialContentHTML={content}
          placeholder={'내용을 입력해주세요.'}
          editorInitializedCallback={() => {
            console.log('editorInitialized');
          }}
          onChange={(data) => {
            if (Platform.OS === 'web') {
              console.log('onchange', data, data.toString('html'));
              setWebContent(data);
            } else {
              setHtmlContent(data);
            }
          }}
          value={webContent}
        />
        <View style={{ paddingHorizontal: 30 }}>
          <DefaultButton
            onPress={async () => {
              console.log(
                'test!!',
                type,
                opinion,
                title,
                primaryTicker,
                tickers,
                content,
                webContent,
              );
              await editThread({
                type,
                opinion,
                title: htmlTitle,
                primaryTicker,
                tickers,
                content:
                  Platform.OS === 'web'
                    ? webContent.toString('html')
                    : htmlContent,
                threadId,
              });
              navigation.navigate('PickDetails', { threadId, refresh: true });
            }}
          >
            등록하기
          </DefaultButton>
        </View>
      </ScrollView>
      <View
        style={{
          width: 1,
          height: Platform.OS === 'ios' ? keyboardHeight + 73 : 0,
        }}
      />
      {showToolbar && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            backgroundColor: 'red',
            bottom: Platform.OS === 'ios' ? keyboardHeight + 33 : 0,
          }}
        >
          <RichToolbar
            editor={editor}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertImage,
            ]}
            selectedIconTint="#000000"
            selectedButtonStyle={{ backgroundColor: '#00000030' }}
            onPressAddImage={() => {
              ImagePicker.openPicker({
                width: 300,
                height: 300,
                cropping: true,
              })
                .then(async (image) => {
                  console.log(image, editor.current.insertImage);
                  const res = await editorImageUpload(image);
                  if (res?.status === 200) {
                    await editor.current.insertImage(res.data.result);
                  }
                })
                .catch((error) => {
                  console.log(
                    `There has been a problem with your fetch operation: ${error}`,
                  );
                });
            }}
          />
        </View>
      )}
    </View>
  );
};

export default PickModify;
