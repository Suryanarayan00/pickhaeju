import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import colors from '#common/colors';
import CheckButton from '#components/Button/CheckButton';
import AddComment from '#components/Input/AddComment';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import assets from '../../assets';
import Document from '#components/Document';
import RadioButton from '#components/Button/RadioButton';
import { pickRegist } from '../common/threadApi';
import { useDispatch, useSelector } from 'react-redux';
import { pickOptionsTypes } from './pickwrite_sort';
import { useNavigation } from '@react-navigation/native';
 import {
  pickWriteStoreclear,
  setEditorText,
  setIsGeneralPledge,
  setPositionPledgeIndex,
  setRelationPledgeIndex,
} from '../data/pickWriteStore';
import LandingAgreementDetails from '../pages/landing/agreement_details';
import useKeyboard from '../utils/useKeyboard';
import { toastShow } from '#data/toast/ToastAction';
import DeleteWritePickPopUp from '#components/DeleteWritePickPopUp';

const styles = StyleSheet.create({
  checkWrapper: {
    flexDirection: 'row',
    paddingVertical: 13,
    marginLeft: 20,
    marginRight: 25,
  },
  checkContents: {
    marginLeft: 5,
    fontSize: 14,
    letterSpacing: -0.35,
    color: colors.dark,
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    letterSpacing: -0.4,
    color: colors.dark,
    paddingHorizontal: 20,
    marginBottom: 13,
  },
  saveMarkWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 18,
    letterSpacing: -0.45,
    color: colors.greyBlue,
    textAlign: 'center',
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 55,
  },
  saveMark: {
    fontSize: 14,
    letterSpacing: -0.35,
    color: colors.cloudyBlue,
    marginLeft: 10,
  },
  section: {
    marginTop: 22,
  },
  saveIcon: { width: 21, height: 21 },
  agreeCheckWrapper: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    marginLeft: 20,
  },
  agreeText: { marginLeft: 5, lineHeight: 21, color: colors.dark },
  linkText: { marginLeft: 2, textDecorationLine: 'underline' },
  goToTopButton: {
    borderRadius: 50,
    width: 50,
    height: 50,
    backgroundColor: colors.greyish,
  },
  disclaimer: {
    backgroundColor: colors.whiteThree,
    paddingLeft: 20,
    paddingTop: 28,
    paddingBottom: 53,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  disclaimerText: { fontSize: 10, color: colors.blueyGreyTwo, lineHeight: 15 },
});

const AGREE_LABELS = [
  {
    key: 'nomal',
    label: '일반 PICK 서약',
    uri: 'http://pickhaeju-server.appspot.com/static/normalpick_policy.html',
  },
  {
    key: 'exclusive',
    label: '단독 PICK 서약',
    uri: 'http://pickhaeju-server.appspot.com/static/exclusivepick_policy.html',
  },
];

const WriteAdd = ({ isPreview }) => {
   const inset = useSafeAreaInsets();
  // const [isGeneralPledge, setIsGeneralPledge] = useState(false);
  // const [positionPledgeIndex, setPositionPledgeIndex] = useState();
  // const [relationPledgeIndex, setRelationPledgeIndex] = useState();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    normalPick,
    exclusivePick,
    pickTypeChecks,
    mainStock,
    subStock,
    htmlContentTitle,
    htmlContent,
    editorText,
    isGeneralPledge,
    positionPledgeIndex,
    relationPledgeIndex,
    bulletPoints
  } = useSelector((state) => state.pickWriteStore);
  const [keyboardHeight] = useKeyboard();
  // const [isGeneralPledge, setIsGeneralPledge] = useState(false);

  const [popupData, setPopupData] = useState();
  const [consents, setConsents] = useState([]);
  const [isModal, setModal] = useState(false);
  const [focusColor, setFocusColor] = useState(false);

  const screenRef = React.useRef(null);
  const positionPledgeArray=['작성자 본인은 해당 주식을 포지션하고 있지 않으며, 향후 72시간 내 포지션 할 계획도 없습니다.','작성자 본인은 해당 주식을 포지션하고 있지 않지만, 향후 72시간 내 XXX (티커 검색, 복수선택 가능)를 (매수/매도, (*옵션 포함)) 할 계획이 있습니다.','작성자 본인은 현재 해당 주식을 (보유/매도 (*옵션 포함)) 중 있습니다.'];
  const relationPledgeArray=['해당 글은 작성자 본인이 직접 작성했으며, 픽해주 외 다른 매체에게 어떠한 보상을 받지 않습니다. 작성자는 언급된 종목과 어떠한 사업적 관계가 아닙니다. (모두 포함 시 체크)','해당 글은 제3자에 의해 작성되었으며, 픽해주 외 다른 매체에서 보상을 받았습니다. 작성자는 언급된 종목과 사업적 관계에 있습니다. (하나라도 해당 시 체크)'];
  const onPressPositionPledge = (index) => () => {
    if(!isPreview)
    dispatch(setPositionPledgeIndex(index));   
  };

  const onPressRelationPledge = (index) => () => {
    if(!isPreview)
    dispatch(setRelationPledgeIndex(index));
  };
  
  
  const registerChecking = () => {
    if (
      isGeneralPledge &&
      positionPledgeIndex !== undefined &&
      relationPledgeIndex !== undefined &&
      htmlContentTitle &&
      htmlContent &&
      (normalPick || exclusivePick) &&
      pickTypeChecks?.includes?.(true) &&
      mainStock
    ) {
      return true;
    } else {
      return false;
    }
  };

  const register = async () => {
    if (registerChecking()) {
      const consentArray = [];
      const combined = [...consentArray,positionPledgeArray[positionPledgeIndex],relationPledgeArray[relationPledgeIndex]];
      const summary=bulletPoints?.join('# '); 
      console.log('Pick Add');
      console.log({
        type: normalPick ? 'shared' : 'exclusive',
        opinion:
          pickOptionsTypes[pickTypeChecks.findIndex((data) => data)].value,
        title: htmlContentTitle,
        primaryTicker: mainStock,
        tickers: subStock,
        content: htmlContent,
        messageForEditor: editorText,
        consents:combined,
        summary: summary,
      });
      const result = await pickRegist({
        type: normalPick ? 'shared' : 'exclusive',
        opinion:
          pickOptionsTypes[pickTypeChecks.findIndex((data) => data)].value,
        title: htmlContentTitle,
        primaryTicker: mainStock,
        tickers: subStock,
        content: htmlContent,
        messageForEditor: editorText,
        consents:combined,
        summary: summary,
      });

      if (Platform.OS === 'web') {
        await dispatch(pickWriteStoreclear());
        navigation.navigate('Pick', { refresh: true });
      } else {
        dispatch(toastShow('등록되었습니다. 관리자의 승인을 기다려주세요.​'));
        await dispatch(pickWriteStoreclear());
        navigation.goBack();
        // Alert.alert('안내', '등록 되었습니다. 관리자의 승인을 기다려주세요.', [
        //   {
        //     text: '확인',
        //     onPress: async () => {
        //       await dispatch(pickWriteStoreclear());
        //       navigation.goBack();
        //     },
        //   },
        // ]);
      }
    } else {
      dispatch(toastShow('필수 항목을 선택해 주세요.​'));
    }
  };

  const changeFocusColor = (value) => {
    setFocusColor(value);
}

  return (
    <Document footerContents={true}>
      <ScrollView
        style={{ flex: 1, paddingBottom: inset.bottom + keyboardHeight }}
        ref={screenRef}
      >
        <View style={styles.agreeCheckWrapper}>
          <CheckButton
            checked={isGeneralPledge}
            setChecked={(data) => 
              {
                !isPreview ? dispatch(setIsGeneralPledge(data)) : null
              }
          }


            
          />
          <Text
            style={styles.agreeText}
            onPress={() => 
              !isPreview ? dispatch(setIsGeneralPledge(!isGeneralPledge)) : null
              
            
            }
          >
            {normalPick ? '일반' : '단독'} PICK과 관련된{' '}
            <Text
              style={styles.linkText}
              onPress={() => {
                setPopupData(normalPick ? AGREE_LABELS[0] : AGREE_LABELS[1]);
              }}
            >
              서약
            </Text>
            에 동의합니다.
            <Text style={{ color: colors.watermelon }}> (필수)</Text>
          </Text>
          {/*<Text style={styles.agreeText}>
            단독 PICK과 관련된
            <TouchableOpacity activeOpacity={0.85}>
              <Text style={styles.linkText}>서약</Text>
            </TouchableOpacity>
            에 동의합니다.
            <Text style={{ color: colors.watermelon }}>(필수)</Text>
          </Text>*/}
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>
            서약 - 포지션{' '}
            <Text style={{ color: colors.watermelon }}>(필수 택1)</Text>
          </Text>
          <View style={styles.checkWrapper}>
            <RadioButton
              checked={positionPledgeIndex === 0}
              onPress={onPressPositionPledge(0)}
            />
            <Text
              style={styles.checkContents}
              onPress={onPressPositionPledge(0)}
            >
              작성자 본인은 해당 주식을 포지션하고 있지 않으며, 향후 72시간 내
              포지션 할 계획도 없습니다.
            </Text>
          </View>
          <View style={styles.checkWrapper}>
            <RadioButton
              checked={positionPledgeIndex === 1}
              onPress={onPressPositionPledge(1)}
            />
            <Text
              style={styles.checkContents}
              onPress={onPressPositionPledge(1)}
            >
              작성자 본인은 해당 주식을 포지션하고 있지 않지만, 향후 72시간 내
              XXX (티커 검색, 복수선택 가능)를 (매수/매도, (*옵션 포함)) 할
              계획이 있습니다.
            </Text>
          </View>
          <View style={styles.checkWrapper}>
            <RadioButton
              checked={positionPledgeIndex === 2}
              onPress={onPressPositionPledge(2)}
            />
            <Text
              style={styles.checkContents}
              onPress={onPressPositionPledge(2)}
            >
              작성자 본인은 현재 해당 주식을 (보유/매도 (*옵션 포함)) 중 있습니다.
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 22,
          }}
        >
          <Text style={styles.titleText}>
            서약 - 관계인{' '}
            <Text style={{ color: colors.watermelon }}>(필수 택1)</Text>
          </Text>
          <View style={styles.checkWrapper}>
            <RadioButton
              checked={relationPledgeIndex === 0}
              onPress={onPressRelationPledge(0)}
            />
            <Text
              style={styles.checkContents}
              onPress={onPressRelationPledge(0)}
            >
              해당 글은 작성자 본인이 직접 작성했으며, 픽해주 외 다른 매체에게
              어떠한 보상을 받지 않습니다. 작성자는 언급된 종목과 어떠한 사업적
              관계가 아닙니다. (모두 포함 시 체크)
            </Text>
          </View>
          <View style={styles.checkWrapper}>
            <RadioButton
              checked={relationPledgeIndex === 1}
              onPress={onPressRelationPledge(1)}
            />
            <Text
              style={styles.checkContents}
              onPress={onPressRelationPledge(1)}
            >
              해당 글은 제3자에 의해 작성되었으며, 픽해주 외 다른 매체에서
              보상을 받았습니다. 작성자는 언급된 종목과 사업적 관계에 있습니다.
              (하나라도 해당 시 체크)
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>
            에디터에게 남길 메세지{' '}
            <Text style={{ color: colors.blueGrey }}>(선택)</Text>
          </Text>
           <AddComment
            placeholder={
              '에디터에게 남기고 싶은 말이 있으신가요? 자유롭게 남겨주세요.'
            }
            defaultValue={editorText}
            setValue={(data) => dispatch(setEditorText(data))}
            isEditable={!isPreview ? true : false }
            changeFocusColor={changeFocusColor && changeFocusColor}
            focusColor={focusColor}
            value={editorText}
           />
        </View>
        {!isPreview ? (
          <>
            <View style={[styles.saveMarkWrapper, { marginTop: 50 }]}>
              {/*<Image source={assets.icon_sort_saving} style={styles.saveIcon} />*/}
              {/*<Text style={styles.saveMark}>Saving</Text>*/}
            </View>
            <View style={[styles.saveMarkWrapper, { marginTop: 14 }]}>
              <Image source={assets.icon_sort_saved} style={styles.saveIcon} />
              <Text style={styles.saveMark}>Saved</Text>
            </View>

            <View
              style={[
                styles.buttonWrapper,
                {
                  minHeight: 50,
                  alignItems: 'flex-start',
                },
              ]}
            >
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => navigation.navigate('PickPreview')}
              >
                <Text style={styles.textButton}>미리보기</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1 }} onPress={register}>
                <Text
                  style={[
                    styles.textButton,
                    {
                      color: colors.lightIndigo,
                    },
                  ]}
                >
                  등록
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View
            style={[
              styles.buttonWrapper,
              { minHeight: 50, alignItems: 'flex-start' },
            ]}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={()=>setModal(!isModal)}
            >
              <Text style={[styles.textButton, { color: colors.greyBlue }]}>
              수정
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1 }} onPress={register}>
              <Text
                style={[
                  styles.textButton,
                  {
                    color: registerChecking()
                      ? colors.lightIndigo
                      : colors.greyBlue,
                  },
                ]}
              >
                등록
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {/*<View style={styles.disclaimer}>*/}
        {/*  <Text style={styles.disclaimerText}>*/}
        {/*    본 플랫폼은 투자판단에 참고용으로만 사용하실 수 있으며,*/}
        {/*    {'\n'}본 정보를 이용한 모든 투자판단은 주자자의 책임으로*/}
        {/*    {'\n'}당사는 이에 대한 일체의 법적 책임을 지지 않습니다.*/}
        {/*  </Text>*/}
        {/*  <TouchableOpacity*/}
        {/*    onPress={() => screenRef.current.scrollTo(0)}*/}
        {/*    activeOpacity={0.85}*/}
        {/*  >*/}
        {/*    <Image source={assets.arrow_up_off} style={styles.arrowIcon} />*/}
        {/*  </TouchableOpacity>*/}
        {/*</View>*/}
        <DeleteWritePickPopUp
        isVisible={isModal}
        onCancel={() => {
          setModal(false);
        }}
         onBack={async () => {
          await dispatch(pickWriteStoreclear());
               navigation.goBack(); 
        }}
      />
      </ScrollView>
      <LandingAgreementDetails
        data={popupData}
        onCancel={() => setPopupData()}
      />
    </Document>
  );
};
export default WriteAdd;
