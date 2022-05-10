import colors from '#common/colors';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import CheckButton from '#components/Button/CheckButton';
import assets from '../../assets';
import Modal from '#components/Modal';
import { addPortfolio, updatePortfolio } from '#common/portfolioApi';
import { me } from '#data/auth/actions';
import { useDispatch } from 'react-redux';
import { parseNumber, setDecimal, isPositiveInteger } from '../utils/utils';
import { toastShow } from '#data/toast/ToastAction';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 15,
  },
  titleBox: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 30,
    alignItems: 'center',
    marginBottom: 18,
  },
  titleText: {
    marginHorizontal: 10,
    fontSize: 13,
    color: colors.blueGrey,
  },
  contentsBox: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 5,
    height: 30,
  },
  textInputWrapper: {
    width: '25%',
    marginHorizontal: 10,
    // paddingBottom: 9,
    // paddingLeft: 11,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightPeriwinkle,
  },
  textInputWrapperOn: {
    borderBottomColor: colors.lightIndigo,
  },

  headerTitle: {
    fontSize: 18,
    color: colors.dark,
  },
  bottomButtonText: {
    fontSize: 16,
    letterSpacing: -0.4,
    paddingVertical: 18,
    textAlign: 'center',
  },
  stockName: {
    width: '20%',
    marginHorizontal: 10,
    color: colors.dark,
  },
  deleteIcon: {
    width: 15,
    height: 15,
    marginHorizontal: 10,
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.lightPeriwinkle,
    marginTop: 29,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    paddingHorizontal: 20,
  },
});

const PortfolioPopUp = ({isVisible, onCancel, watchForAdd, isFromSetting=false,portfolioData=[]}) => {
  const navigation = useNavigation();

  console.log('PortfolioPopUpVisible', isVisible);
  const [price, setPrice] = useState(null);
  const [amount, setAmount] = useState(null);

  const [focusPrice, setFocusPrice] = useState(null);
  const [focusAmount, setFocusAmount] = useState(null);

  const dispatch = useDispatch();
  const onAdd = async () => {
    var portId = await AsyncStorage.getItem('portID') || false;
    if (!price || !parseNumber(price)) {
      return dispatch(toastShow('평균 매수가를 입력해주세요'));
    }
    if (parseNumber(price) <= 0) {
      return dispatch(toastShow('평균 매수가는 0보다 작을 수 없습니다.'));
    }
    if (!amount || !parseNumber(amount)) {
      return dispatch(toastShow('수량를 입력해주세요'));
    }

    if (amount <= 0) {
      return dispatch(toastShow('수량이 0보다 작을 수 없습니다.'));
    }

   //Testing for duplicate company in Portfolio 
    var foundIndex = portfolioData.findIndex(x => x.ticker == watchForAdd);
    if(foundIndex != -1)
    {
      onCancel(true);
      return dispatch(toastShow('포트폴리오에 이미 추가되어 있는 종목입니다.')); 
    }

    if(isFromSetting)
    {
        navigation.navigate('PortfolioSettings', {
          'portfolioList':[],
          'general':{
            ticker: watchForAdd,
            price,
            amount,
            isAdded:true,
          }
        });
       return ;
      }
     if(portId=="")
     {
      await addPortfolio({
        ticker: watchForAdd,
        price,
        amount,
      });
     }
 
    else
  {
    let updateData=[];
    if(portfolioData)
    {
      let portId=portfolioData[0]?.portId;
      let portData = portfolioData?.map(({ticker,price,amount})=>{
        updateData.push({
          ticker,
          price,
          amount,
        })
      }) 
      updateData.push({
        ticker: watchForAdd,
        price,
        amount,
      })
    }
   else
   {
    updateData.push({
      ticker: watchForAdd,
      price,
      amount,
    }) 
   }
   await updatePortfolio(updateData,portId);
  }
    //dispatch(me());
    onCancel(true);
  };
  console.log({price})
  return (
     <Modal isVisible={isVisible} onCancel={onCancel}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>포트폴리오</Text>
          <TouchableOpacity activeOpacity={0.85} onPress={onCancel}>
            <Image
              source={assets.icon_close_lg}
              style={{ width: 15, height: 15 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleBox}>
          <Text
            style={[
              styles.titleText,
              {
                width: '20%',
              },
            ]}
          >
            종목
          </Text>
          <Text
            style={[
              styles.titleText,
              {
                width: '26%',
              },
            ]}
          >
            평균 매수가($)
          </Text>
          <Text
            style={[
              styles.titleText,
              {
                width: '55%',
              },
            ]}
          >
            수량 (주식 수)
          </Text>
        </View>

         <View style={styles.contentsBox}>
          <Text style={styles.stockName}>{watchForAdd}</Text>
          <View
            style={[
              styles.textInputWrapper,
              focusPrice && styles.textInputWrapperOn,
            ]}
          >
            <TextInput
              keyboardType={'decimal-pad'}
              onFocus={() => setFocusPrice(true)}
              onBlur={() => setFocusPrice(false)}
              style={{ margin: 0, padding: 0}}
              value={price}
              onChangeText={(price) =>{ 
                let decimalCheckVal= setDecimal(price);
                setPrice(decimalCheckVal)}
              }
            />
          </View>
          <View
            style={[
              styles.textInputWrapper,
              focusAmount && styles.textInputWrapperOn,
            ]}
          >
            <TextInput style={{padding:0,color:colors.dark}}
              keyboardType={'number-pad'}
              // placeholder={'200'}
              onFocus={() => setFocusAmount(true)}
              onBlur={() => setFocusAmount(false)}
              value={amount}
              onChangeText={(amt) => {
                let decimalCheckVal= isPositiveInteger(amt);
                 setAmount(decimalCheckVal);
              }}
            />
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={{ flex: 1 }}
            onPress={() => {
              onAdd();
            }}
          >
            <Text
              style={[styles.bottomButtonText, { color: (amount && price) ? colors.lightIndigo :  colors.blueGrey}]}
            >
              저장
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default PortfolioPopUp;
