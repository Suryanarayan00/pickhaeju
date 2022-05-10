import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import colors from '#common/colors';
import StockNameCard from '#components/StockNameCard';
import CheckButton from '#components/Button/CheckButton';
import AddComment from '#components/Input/AddComment';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import assets from '../../../assets';
import { useSelector } from 'react-redux';
import WriteFill from '../../widgets/pickwrite_fill';
import { companyGenerals } from '../../common/dataApi';
import WriteAdd from '../../widgets/pickwrite_add';
import HTML from 'react-native-render-html';

const styles = StyleSheet.create({
  buttonWrapper: {
    maxWidth: 155,
    width: '100%',
    height: 40,
    borderRadius: 20,
    borderColor: colors.cloudyBlue,
    borderWidth: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    letterSpacing: -0.35,
    color: colors.blueyGrey,
    paddingLeft: 6,
  },
  buttonWrapperOn: {
    maxWidth: 155,
    width: '100%',
    height: 40,
    borderRadius: 20,
    borderColor: colors.lightIndigo,
    borderWidth: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapperOff: {
    maxWidth: 155,
    width: '100%',
    height: 40,
    borderRadius: 20,
    borderColor: colors.cloudyBlue,
    borderWidth: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextOn: {
    fontSize: 14,
    letterSpacing: -0.35,
    color: colors.lightIndigo,
    paddingLeft: 6,
  },
  buttonTextOff: {
    fontSize: 14,
    letterSpacing: -0.35,
    color: colors.cloudyBlue,
    paddingLeft: 6,
  },
  titleText: {
    fontSize: 14,
    letterSpacing: -0.35,
    color: colors.blueyGrey,
  },
  greyBar: {
    height: 10,
    backgroundColor: colors.paleGreyThree,
    marginTop: 40,
  },
  bulletInputWrapper: {
    height: 30,
    marginHorizontal: 20,
    justifyContent: 'center',
    marginVertical: 5,
  },
  titleInputWrapper: {
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightPeriwinkle,
    justifyContent: 'center',
    marginTop: 27,
    marginBottom: 21,
  },
  checkWrapper: {
    paddingLeft: 20,
    marginRight: 26,
    flexDirection: 'row',
    paddingVertical: 13,
  },
  checkContents: {
    marginLeft: 10,
    fontSize: 14,
    letterSpacing: -0.35,
    color: colors.blueyGreyTwo,
    flex: 1,
  },
  checkTitleText: {
    fontSize: 16,
    letterSpacing: -0.4,
    color: colors.dark,
    paddingHorizontal: 20,
    marginBottom: 13,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  pickButtonSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  titleWrapper: { justifyContent: 'center', alignItems: 'center' },
  stockCardWrapper: {
    flexDirection: 'row',
    marginTop: 15,
  },
  mainTitle: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  mainTitleText: { fontSize: 16, letterSpacing: -0.4, color: colors.greyBlue },
  bullet: { color: colors.blueyGrey, marginRight: 5 },
  borderBar: {
    height: 1,
    backgroundColor: colors.lightPeriwinkle,
    marginTop: 25,
  },
  textInputWrapper: {
    height: 120,
    marginHorizontal: 20,
    marginBottom: 32,
    marginTop: 18,
  },
  checkSection: {
    marginTop: 22,
  },
  addTitleInput: { fontSize: 18, letterSpacing: -0.45, height: 40 },
  textButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 55,
  },
  textButton: {
    fontSize: 18,
    letterSpacing: -0.45,
    color: colors.lightIndigo,
    textAlign: 'center',
  },
  bulletContents: { flexDirection: 'row', alignItems: 'center' },
  htmlTitle: {
    minHeight: 44,
    padding: 10,
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightPeriwinkle,
  },
  bulletlist: {
    height: 7, 
    width: 7, 
    backgroundColor: 'black', 
    borderRadius: 20, 
    marginLeft: 10, 
    marginTop: 12
  },
    picktitle: {
   fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "700",
    fontStyle: "normal",
    color: colors.dark,
    marginTop:20,
    marginBottom:15,
    marginLeft:15  
  }
});

const PickPreview = (props) => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  const {
    normalPick,
    exclusivePick,
    pickTypeChecks,
    mainStock,
    subStock,
    htmlContentTitle,
    htmlContent,
    bulletPoints  
  } = useSelector((state) => state.pickWriteStore);

  const [stockes, setStockes] = useState([]);

  useEffect(() => {
    companyGenerals([mainStock, ...subStock]).then((datas) => {
      console.log(datas);
      setStockes(datas);
    });
    console.log('Bullet Point');
    console.log(bulletPoints);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.pickButtonSection}>
        <View
          style={[
            normalPick ? styles.buttonWrapperOn : styles.buttonWrapperOff,
            { marginRight: 10 },
          ]}
        >
          <Text style={normalPick ? styles.buttonTextOn : styles.buttonTextOff}>
            일반 PICK
          </Text>
        </View>
        <View
          style={[
            exclusivePick ? styles.buttonWrapperOn : styles.buttonWrapperOff,
          ]}
        >
          <Text
            style={[exclusivePick ? styles.buttonTextOn : styles.buttonTextOff]}
          >
            단독 PICK
          </Text>
        </View>
      </View>
       <FlatList
        data={stockes}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.titleWrapper}>
              <Text style={[styles.titleText, { marginBottom: 18, paddingHorizontal: 20, width: '100%', }]}>
                {index === 0 ? '주 종목' :index ===1 ? '부 종목':''}
              </Text>
              <StockNameCard
                nameKo={item?.nameKo || item?.name}
                ticker={item?.ticker}
              />
            </View>
          );
        }}
      />

      <View style={styles.greyBar} />
      {/* <WriteFill editorDisabled={true} /> */}
      <View style={styles.htmlTitle}>
        <Text>{htmlContentTitle}</Text>
      </View>
      <Text style={styles.picktitle}>PICK 본문 요약 </Text>
      {bulletPoints?.length > 0 && bulletPoints?.[0]!=""? 
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.bulletlist}></View>
        <Text style={{marginTop:5,marginLeft:10}}>{bulletPoints?.length > 0 ? bulletPoints?.[0] : ''}</Text>
        </View>:null}
        {bulletPoints?.length > 1 && bulletPoints?.[1]!=""? 
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.bulletlist}></View>
        <Text style={{marginTop:5,marginLeft:10}}>{bulletPoints?.length > 1 ? bulletPoints?.[1] : ''}</Text>
      </View>:null}
    {bulletPoints?.length > 2 && bulletPoints?.[2]!=""?  <View style={{ flexDirection: 'row' }}>
        <View style={styles.bulletlist}></View>
        <Text style={{marginTop:5,marginLeft:10}}>{bulletPoints?.length > 2 ? bulletPoints?.[2] : ''}</Text>
      </View>:null}
     
      <View style={{ flexDirection: 'row',marginTop:15,marginLeft: 10, }}>
        <HTML source={{ html: htmlContent }} />
      </View>

      {/* <View style={styles.bulletInputWrapper}>
        <View style={styles.bulletContents}>
          <Text style={styles.bullet}>&#8226;</Text>
          <TextInput
            placeholder={'내용을 입력하세요.'}
            style={{ height: 40 }}
          />
        </View>
      </View> */}
      <View style={styles.borderBar} />
      <WriteAdd isPreview />
      {/* <View style={styles.textInputWrapper}>
        <TextInput multiline={true} placeholder={'내용을 입력하세요.'} />
      </View>
      <View style={styles.checkSection}>
        <Text style={styles.checkTitleText}>
          서약 - 포지션 <Text style={{ color: colors.blueGrey }}>(필수)</Text>
        </Text>
        <View style={styles.checkWrapper}>
          <CheckButton />
          <Text style={styles.checkContents}>
            작성자 본인은 해당 주식을 포지션하고 있지 않으며, 향후 72시간 내
            포지션 할 계획도 없습니다.
          </Text>
        </View>
        <View style={styles.checkWrapper}>
          <CheckButton />
          <Text style={styles.checkContents}>
            작성자 본인은 해당 주식을 포지션하고 있지 않지만, 향후 72시간 내 XXX
            (티커 검색, 복수선택 가능)를 (매수/매도, (*옵션 포함)) 할 계획이
            있습니다.
          </Text>
        </View>
        <View style={styles.checkWrapper}>
          <CheckButton />
          <Text style={styles.checkContents}>
            작성자 본인은 현재 해당 주식을 (보유/매도 (*옵션 포함)) 중 있습니다.
          </Text>
        </View>
      </View> */}
      {/* <View style={styles.checkSection}>
        <Text style={styles.checkTitleText}>
          에디터에게 남길 메세지{' '}
          <Text style={{ color: colors.blueGrey }}>(선택)</Text>
        </Text>
        <AddComment placeholder={'로그인이 필요합니다.'} />
      </View>
      <View style={styles.checkSection}>
        <Text style={styles.checkTitleText}>
          서약 - 관계인 <Text style={{ color: colors.blueGrey }}>(필수)</Text>
        </Text>
        <View style={styles.checkWrapper}>
          <CheckButton />
          <Text style={styles.checkContents}>
            해당 글은 작성자 본인이 직접 작성했으며, 픽해주 외 다른 매체에게
            어떠한 보상을 받지 않습니다. 작성자는 언급된 종목과 어떠한 사업적
            관계가 아닙니다. (모두 포함 시 체크)
          </Text>
        </View>
        <View style={styles.checkWrapper}>
          <CheckButton />
          <Text style={styles.checkContents}>
            해당 글은 제3자에 의해 작성되었으며, 픽해주 외 다른 매체에서 보상을
            받았습니다. 작성자는 언급된 종목과 사업적 관계에 있습니다. (하나라도
            해당 시 체크)
          </Text>
        </View>
      </View>
      <View
        style={[styles.textButtonWrapper, { paddingBottom: inset.bottom + 20 }]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          style={{ flex: 1 }}
          onPress={() => {
            navigation.navigate('PickPreview');
          }}
        >
          <Text style={[styles.textButton, , { color: colors.greyBlue }]}>
            삭제하기
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.85} style={{ flex: 1 }}>
          <Text style={[styles.textButton]}>등록하기</Text>
        </TouchableOpacity>
      </View> */}
  
    </ScrollView>
  );
};

export default PickPreview;
