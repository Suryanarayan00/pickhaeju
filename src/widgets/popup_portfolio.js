import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import colors from '#common/colors';
import assets from '../../assets';
import { parseNumber, setDecimal, isPositiveInteger } from '../utils/utils';
import { useDispatch } from 'react-redux';
import { me } from '../data/auth/actions';
import { addPortfolio, updatePortfolio } from '../common/portfolioApi';
import { toastShow } from '#data/toast/ToastAction';
import { findIndex } from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
  titleBox: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  titleText: {
    marginHorizontal: 10,
    fontSize: 13,
    color: colors.blueGrey,
  },
  contentsBox: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 22,
    marginBottom: 38,
    height: 20,
  },
  textInputWrapper: {
    width: '25%',
    marginHorizontal: 10,
    // paddingBottom: 9,
    // paddingLeft: 11,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightPeriwinkle,
  },
  bottomButtonText: {
    fontSize: 16,
    color: colors.blueyGrey,
    letterSpacing: -0.4,
    textAlign: 'center',
    paddingVertical: 18,
  },
  stockName: { width: '20%', marginHorizontal: 10, color: colors.dark },
  deleteIcon: {
    width: 15,
    height: 15,
    marginHorizontal: 10,
  },
  container: { backgroundColor: colors.white, borderRadius: 15 },
  buttonWrapper: { borderTopWidth: 1, borderTopColor: colors.lightPeriwinkle },
  textInputWrapperOn: {
    borderBottomColor: colors.lightIndigo,
  },
});
const PortfolioPopUpTab = (props) => {
  const { watchForAdd, onCancel, portfolioList } = props;
  const [price, setPrice] = useState(null);
  const [amount, setAmount] = useState(null);
  const [indexValue, setIndex] = useState(-1);

  const [focusPrice, setFocusPrice] = useState(null);
  const [focusAmount, setFocusAmount] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('use Effect Called');
    console.log(portfolioList);
    const findIndex= portfolioList.findIndex(a => a.ticker === watchForAdd);
    if(findIndex >= 0)
    {
      setIndex(findIndex);
      setAmount(portfolioList[findIndex]?.amount?.toString());
      setPrice(portfolioList[findIndex]?.price?.toString());
    }
 },[watchForAdd]);
 
  const onAdd = async () => {
    var userPortId = await AsyncStorage.getItem('portID') || false;
    if (!price || !parseNumber(price)) {
      return dispatch(toastShow('평균 매수가를 입력해주세요' + watchForAdd));
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
    let updateData=[];
    
    if(portfolioList.length > 0)
    {
       let portId=portfolioList[0]?.portId;
      let portData = portfolioList?.map(({ticker,price,amount})=>{
        updateData.push({
          ticker,
          price,
          amount,
        })
      })
      if(indexValue == -1)
      {
        updateData.push({
          ticker: watchForAdd,
          price,
          amount,
        })
      }  
      
    await updatePortfolio(updateData,portId);
     onCancel(true);
    }
    else if(userPortId && portfolioList.length == 0)
    {
      updateData.push({
        ticker: watchForAdd,
        price,
        amount,
      })
      await updatePortfolio(updateData,userPortId);
      onCancel(true);
    }
    else
    {
      await addPortfolio({
        ticker: watchForAdd,
        price,
        amount,
      });
      onCancel(true);
    }
  };

  return (
    <View style={styles.container}>
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
            keyboardType={'number-pad'}
            onFocus={() => setFocusPrice(true)}
            style={{ margin: 0, padding: 0}}
            onBlur={() => setFocusPrice(false)}
            value={price}
            onChangeText={(price) => 
            { 
              if(indexValue >= 0) 
              portfolioList[indexValue].price= setDecimal(price) 
               
              setPrice(setDecimal(price))
            }
            }
          />
        </View>
        <View
          style={[
            styles.textInputWrapper,
            focusAmount && styles.textInputWrapperOn,
          ]}
        >
          <TextInput
            keyboardType={'number-pad'}
            // placeholder={'200'}
            style={{ margin: 0, padding: 0}}
            onFocus={() => setFocusAmount(true)}
            onBlur={() => setFocusAmount(false)}
            value={amount}
            onChangeText={(amount) => {
              if(indexValue >= 0) 
              portfolioList[indexValue].amount= isPositiveInteger(amount) 
             
              setAmount(isPositiveInteger(amount))}}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => {
            setPrice(null);
            setAmount(null);
          }}
        >
          <Image source={assets.icon_trash_color} style={styles.deleteIcon} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.buttonWrapper}
        onPress={onAdd}
      >
        <Text
          style={[
            styles.bottomButtonText,
            { color: price && amount ? colors.lightIndigo : colors.blueyGrey },
          ]}
        >
          포트폴리오에 해당 종목 추가하기
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default PortfolioPopUpTab;
