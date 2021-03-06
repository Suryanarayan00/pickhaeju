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
            ?????? PICK
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
            ?????? PICK
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
                {index === 0 ? '??? ??????' :index ===1 ? '??? ??????':''}
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
      <Text style={styles.picktitle}>PICK ?????? ?????? </Text>
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
            placeholder={'????????? ???????????????.'}
            style={{ height: 40 }}
          />
        </View>
      </View> */}
      <View style={styles.borderBar} />
      <WriteAdd isPreview />
      {/* <View style={styles.textInputWrapper}>
        <TextInput multiline={true} placeholder={'????????? ???????????????.'} />
      </View>
      <View style={styles.checkSection}>
        <Text style={styles.checkTitleText}>
          ?????? - ????????? <Text style={{ color: colors.blueGrey }}>(??????)</Text>
        </Text>
        <View style={styles.checkWrapper}>
          <CheckButton />
          <Text style={styles.checkContents}>
            ????????? ????????? ?????? ????????? ??????????????? ?????? ?????????, ?????? 72?????? ???
            ????????? ??? ????????? ????????????.
          </Text>
        </View>
        <View style={styles.checkWrapper}>
          <CheckButton />
          <Text style={styles.checkContents}>
            ????????? ????????? ?????? ????????? ??????????????? ?????? ?????????, ?????? 72?????? ??? XXX
            (?????? ??????, ???????????? ??????)??? (??????/??????, (*?????? ??????)) ??? ?????????
            ????????????.
          </Text>
        </View>
        <View style={styles.checkWrapper}>
          <CheckButton />
          <Text style={styles.checkContents}>
            ????????? ????????? ?????? ?????? ????????? (??????/?????? (*?????? ??????)) ??? ????????????.
          </Text>
        </View>
      </View> */}
      {/* <View style={styles.checkSection}>
        <Text style={styles.checkTitleText}>
          ??????????????? ?????? ?????????{' '}
          <Text style={{ color: colors.blueGrey }}>(??????)</Text>
        </Text>
        <AddComment placeholder={'???????????? ???????????????.'} />
      </View>
      <View style={styles.checkSection}>
        <Text style={styles.checkTitleText}>
          ?????? - ????????? <Text style={{ color: colors.blueGrey }}>(??????)</Text>
        </Text>
        <View style={styles.checkWrapper}>
          <CheckButton />
          <Text style={styles.checkContents}>
            ?????? ?????? ????????? ????????? ?????? ???????????????, ????????? ??? ?????? ????????????
            ????????? ????????? ?????? ????????????. ???????????? ????????? ????????? ????????? ?????????
            ????????? ????????????. (?????? ?????? ??? ??????)
          </Text>
        </View>
        <View style={styles.checkWrapper}>
          <CheckButton />
          <Text style={styles.checkContents}>
            ?????? ?????? ???3?????? ?????? ??????????????????, ????????? ??? ?????? ???????????? ?????????
            ???????????????. ???????????? ????????? ????????? ????????? ????????? ????????????. (????????????
            ?????? ??? ??????)
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
            ????????????
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.85} style={{ flex: 1 }}>
          <Text style={[styles.textButton]}>????????????</Text>
        </TouchableOpacity>
      </View> */}
  
    </ScrollView>
  );
};

export default PickPreview;
