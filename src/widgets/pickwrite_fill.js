import React, { useState, useRef } from 'react';
import {
  Text,
  Image,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import useKeyboard from '../utils/useKeyboard';
import { useSelector, useDispatch } from 'react-redux';
import { setHtmlContent, setHtmlContentTitle, setBullet } from '../data/pickWriteStore';
import ImagePicker from 'react-native-image-crop-picker';
import { editorImageUpload } from '../common/threadApi';
import assets from '../../assets';
import colors from '#common/colors';
import { useNavigation } from '@react-navigation/native';

// import { RichToolbar, RichEditor, actions } from '#components/RichEditor';
import { RichEditor, RichToolbar, actions, defaultActions } from 'react-native-pell-rich-editor'
import { toastShow } from '#data/toast/ToastAction';
import { getKeyboardState } from '../components/KeyboardEvent';

import moment from 'moment';
import useInterval from '../hooks/useInterval';
const styles = StyleSheet.create({
  titleInput: {
    minHeight: 44,
    padding: 10,
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightPeriwinkle,
  },
  labelRequired: {
    color: '#f55867',
    marginLeft: 6,
  },
  btnBold: {
    color: 'gray',
    fontWeight: '600',
  },
  saveMarkWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  saveMark: {
    fontSize: 14,
    letterSpacing: -0.35,
    color: colors.cloudyBlue,
    marginLeft: 10,
  },
  saveIcon: { width: 21, height: 21 },
  bulletlist: {
    height: 7, 
    width: 7, 
    backgroundColor: 'black', 
    borderRadius: 20, 
    marginLeft: 10, 
    marginTop: 12
  },
  bottomtabs: {
    borderWidth: 0, 
    height: 30, 
    width: 80, 
    alignSelf: 'center', 
    marginTop: 10, 
    borderRadius: 5, 
    justifyContent: 'center', 
    alignItems: 'center'
  }

});

 const WriteFill = (props,{editorDisabled = false }) => {
  const editor = useRef();
  const RichText = useRef();
  
  const [showToolbar, setShowToolbar] = useState(false);
  const [bulletArray, setBulletArray] = useState([]);

  const [keyboardHeight] = useKeyboard();
  const scrollViewRef = useRef();
  const navigation = useNavigation();
  const isKeyboardOpen = getKeyboardState();

  const { htmlContent, htmlContentTitle, bulletPoints } = useSelector(
    (state) => state.pickWriteStore,
  );
 
  React.useEffect(() => {
   if(isKeyboardOpen){
    if(scrollViewRef?.current)
    scrollViewRef.current.scrollToEnd({ animated: true });
  }
  }, [isKeyboardOpen])

  const [webContent, setWebContent] = useState(
    RichEditor?.createValueFromString?.(htmlContent, 'html'),
  ); //web전용
  const [isSaving, setIsSaving] = useState(false);
  const [savedTime, setSavedTime] = useState(moment())

  console.log('htmlContent', htmlContent);
  const dispatch = useDispatch();
      useInterval(() => {
        setIsSaving(true);
        setSavedTime(moment());
      }, 30000);

      React.useEffect(() => {
        setTimeout(() => {
          setIsSaving(false)
        }, 3000)
      }, [savedTime])
  
    const goNextButton = (index) => {
      if (index === 2) {
        if (htmlContentTitle && htmlContent) {
          props.setIndex(index);
        } else {
          dispatch(toastShow('필수 입력사항을 입력해 주세요.'));
        }
        return;
      }
  }

  const addImageFunction = () => {
    ImagePicker.openPicker({
      multiple: true,
      includeBase64: true,
      compressImageQuality: 0.5,
      maxFiles: 5,
      mediaType:'photo'
    }).then(images => {
      // let imageSrc = `data:${images.mime};base64,${images.data}`;
      // RichText.current?.insertImage(imageSrc)
      RichText.current?.insertImage(`data:${images[0].mime};base64,${images[0].data}`)
      
    });
    // RichText.current?.insertImage('file:///storage/emulated/0/Android/data/com.pickhaeju/files/Pictures/86481a80-857c-4fc3-9d37-fcbfa0b85c4b.jpg',
    // 'background: black;',)
  }

  const saveStatus = () => {
    if (isSaving) {
      return (
        <View style={[styles.saveMarkWrapper, { marginTop: 78 }]}>
          <Image source={assets.icon_sort_saving} style={styles.saveIcon} />
          <Text style={styles.saveMark}>Saving</Text>
        </View>
      );
    } else
      return (
        <View style={{ marginTop: 70 }}>
          <View style={styles.saveMarkWrapper}>
            <Image source={assets.icon_sort_saved} style={styles.saveIcon} />
            <Text style={styles.saveMark}>Saved</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <Text style={{ color: colors.cloudyBlue, }}>업데이트: {moment(savedTime).format('YYYY.MM.DD 오후 HH:mm')}</Text>
          </View>
        </View>
      );
  };

  //Set Bullet Point 
const setBulletFunc=(value,Index)=>{
  var newArray=[...bulletArray];
  newArray[Index]=value;
  console.log(bulletArray);
  setBulletArray(newArray);
  dispatch(setBullet(newArray));
}

const saveData=()=>{
  setIsSaving(true);
  setSavedTime(moment());
}

console.log('bulletPoints');
console.log(bulletPoints);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{marginBottom: 50}} ref={scrollViewRef}>
      {/* <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
        <TouchableOpacity style={{ borderWidth: 1, height: 30, width: 80, alignSelf: 'center', marginTop: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
          <Text>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => saveData()}
          style={{ borderWidth: 1, height: 30, width: 100, alignSelf: 'center', marginTop: 10, borderRadius: 5, marginLeft: 20, marginRight: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Text>임시저장</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>goNextButton(2)} style={{ borderWidth: 1, height: 30, width: 80, alignSelf: 'center', marginTop: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
          <Text>다음</Text>
        </TouchableOpacity>
      </View> */}

      <TextInput
        placeholder="제목을 입력해 주세요."
        placeholderTextColor="#999"
        style={styles.titleInput}
        defaultValue={htmlContentTitle}
        autoCorrect={false}
        onChangeText={(value) => dispatch(setHtmlContentTitle(value))}
        editable={!editorDisabled}
      />
      {/* <View
        style={{
          borderBottomColor: '#999',
          borderBottomWidth: 1,
          marginTop: 20,
          width: '95%',
          alignSelf: 'center'
        }}
      /> */}

      <Text style={{ color: 'black', marginLeft: 10, marginTop: 20, marginBottom: 10, fontSize: 15, fontWeight: '600' }}>PICK 본문 요약 <Text style={styles.labelRequired}>(최소 1개 필수)</Text></Text>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.bulletlist}></View>
        <TextInput defaultValue={bulletPoints?.length > 0 ? bulletPoints?.[0] : ''} placeholder={'내용을 입력해 주세요.'} style={{ height: 40, marginTop: -4, padding: 5, width: '100%',  marginLeft: 5 }} placeholderTextColor='gray' onChangeText={(text) => setBulletFunc(text, 0)} />
      </View>

     { bulletPoints?.length > 0 && bulletPoints?.[0] !=""?
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.bulletlist}></View>
        <TextInput defaultValue={bulletPoints?.length > 1 ? bulletPoints?.[1] : ''} placeholder={'내용을 입력해 주세요.'} style={{ height: 40, marginTop: -4, padding: 5, width: '100%',  marginLeft: 5 }} placeholderTextColor='gray' onChangeText={(text) => setBulletFunc(text, 1)} />
      </View>:null}

    {bulletPoints?.length > 1 && bulletPoints?.[1]!= ""?
     <View style={{ flexDirection: 'row' }}>
     <View style={styles.bulletlist}></View>
     <TextInput defaultValue={bulletPoints?.length > 2 ? bulletPoints?.[2] : ''} placeholder={'내용을 입력해 주세요.'} style={{ height: 40, marginTop: -4, padding: 5, width: '100%',  marginLeft: 5 }} placeholderTextColor='gray' onChangeText={(text) => setBulletFunc(text, 2)} />
   </View>:null 
    } 

     

      <View
        style={{
          borderBottomColor: colors.lightPeriwinkle,
          borderBottomWidth: 1,
          marginTop: 20,
          width: '100%',
          alignSelf: 'center'
        }}
      />

     <View style={{height:85, overflow: 'hidden'}}>
      <RichEditor style={{height:'100%', overflow: 'scroll'}}
          ref={RichText}
          placeholder={'내용을 입력해 주세요.'}
          scrollEnabled={true}
          initialContentHTML={htmlContent}
          onChange={(data) => {
            if (Platform.OS === 'web') {
              console.log('onchange', data, data.toString('html'));
              setWebContent(data);
              dispatch(setHtmlContent(data.toString('html')));
            } else {
              dispatch(setHtmlContent(data));
            }
          }}
        />
      </View> 

      {saveStatus()}

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 3, marginBottom: 10 }}>
        <TouchableOpacity 
        onPress={() => props.setIndex(0)}
        style={styles.bottomtabs}>
          <Text style={styles.btnBold}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity
           onPress={() => saveData()}
          style={{ borderWidth: 0, height: 30, width: 100, alignSelf: 'center', marginTop: 10, borderRadius: 5, marginLeft: 20, marginRight: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.btnBold}>임시저장</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=>goNextButton(2)}
        style={styles.bottomtabs}>
          <Text style={[styles.btnBold, {color: '#883EBD'}]}>다음</Text>
        </TouchableOpacity>
      </View>

      </ScrollView>
      
      <RichToolbar
        editor={RichText}
        style={{ bottom: 0, position: 'absolute' }}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setStrikethrough,
          actions.table,
          actions.setUnderline,
          actions.alignLeft,
          actions.alignCenter,
          actions.alignRight,
          actions.alignFull,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.blockquote,
          actions.insertLink,
          actions.removeFormat,
          actions.insertImage,
          actions.fontSize,
          actions.undo,
          actions.redo
        ]}
        iconSize={20}
        selectedIconTint={'blue'}
        onPressAddImage={addImageFunction}
      /> 
      {/* <TextInput
        placeholder="제목ffffffffffffffffffllllllllllll"
        placeholderTextColor="#999"
        style={styles.titleInput}
        defaultValue={htmlContentTitle}
        autoCorrect={false}
        onChangeText={(value) => dispatch(setHtmlContentTitle(value))}
        editable={!editorDisabled}
      /> */}
      {/* 
      <ScrollView
        style={{ flex: 1 }}
        ref={scrollViewRef}
        onContentSizeChange={(contentWidth, contentHeight) => {
          // scrollViewRef.current?.scrollToEnd({ animated: false });
        }}
      >
        <RichEditor
          // style={{ flex: 1 }}
          scrollEnabled={false}
          ref={editor}
          disabled={editorDisabled}
          onFocus={() => {
            console.log('focus');
            setShowToolbar(true);
          }}
          onBlur={() => {
            console.log('blur');
            setShowToolbar(false);
          }}
          initialContentHTML={htmlContent}
          placeholder={'내용을 입력해주세요.'}
          editorInitializedCallback={() => {
            console.log('editorInitialized');
          }}
          onChange={(data) => {
            if (Platform.OS === 'web') {
              console.log('onchange', data, data.toString('html'));
              setWebContent(data);
              dispatch(setHtmlContent(data.toString('html')));
            } else {
              dispatch(setHtmlContent(data));
            }
          }}
          value={webContent}
        />
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
      )} */}
    </View>
  );
};

export default WriteFill;
