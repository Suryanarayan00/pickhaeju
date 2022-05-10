import React, { useState, useEffect } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import assets from '../../../assets';
import colors from '#common/colors';
import {
  getPortfolio,
  removePortfolio,
  updatePortfolio,
  addPortfolio
} from '#common/portfolioApi';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { me } from '#data/auth/actions';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { restApi } from '#common/api';
import { toastShow } from '#data/toast/ToastAction';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useKeyboard from '../../utils/useKeyboard';
import { parseNumber, setDecimal, isPositiveInteger} from '../../utils/utils';

import DefaultButton from '#components/Button/DefaultButton';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  titleBox: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 22,
    alignItems: 'center',
  },
  titleText: {
    marginHorizontal: 10,
    fontSize: 13,
    color: colors.blueGrey,
    width: '20%',
  },
  contentsBox: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 6,
    alignItems: 'center',
  },
  textInputWrapper: {
    width: '25%',
    marginRight: 20,
    paddingBottom: 9,
    paddingLeft: 11,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightPeriwinkle,
  },
  textInputWrapperOn: {
    borderBottomColor: colors.lightIndigo,
  },
  stockName: {
    color: colors.dark,
  },
  deleteIcon: {
    width: 15,
    height: 15,
  },
  addButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  addButton: {
    width: 30,
    height: 30,
    backgroundColor: colors.lightIndigo,
    borderRadius: 15,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    width: 13,
    height: 13,
  },
  buttonFrame: {
    paddingHorizontal: 0,
    marginVertical: 0,
  },
   moveDots : {
    width:5,
    height: 15,
    backgroundColor: colors.LIGHT_INDIGO
  },
});

const PortfolioListItem = ({
  portfolio,
  onChange,
  onRemove,
  onEdit,
  onLongPress,
  index
}) => {

  const [focused, setFocused] = useState(-1);
  const [price, setPrice] = useState(portfolio?.price?.toString());
  const [amount, setAmount] = useState(portfolio?.amount?.toString());

  return (
    <View style={styles.contentsBox}>
      {/*<View style={{ width: '5%' }} />*/}
      {onLongPress && (
        <TouchableOpacity onLongPress={onLongPress} style={{ padding: 10 }}>
          <Image source={assets.menuMoveDots} style={styles.moveDots} resizeMode='contain'/>
        </TouchableOpacity>
      )}
      <View style={[styles.titleText]}>
        <Text style={styles.stockName}>{portfolio?.ticker}</Text>
      </View>
      <View
        style={[
          styles.textInputWrapper,
          focused === 1 && styles.textInputWrapperOn,
          {},
        ]}
      >
        <TextInput
          value={price}
          onFocus={() => setFocused(1)}
          onBlur={() => {
            setFocused(-1);
            onEdit({ ticker: portfolio?.ticker, price, amount,isAdded: portfolio?.isAdded });
          }}
          onChangeText={(price) => {
            
            setPrice(setDecimal(price));
            onChange({ ticker: portfolio?.ticker, price, amount });
          }}
          style={{ flex: 1 }}
          // placeholder={'200'}
        />
      </View>
      <View
        style={[
          styles.textInputWrapper,
          focused === 2 && styles.textInputWrapperOn,
          {},
        ]}
      >
        <TextInput
          value={amount}
          onFocus={() => setFocused(2)}
          onBlur={() => {
            setFocused(-1);
           onEdit({ ticker: portfolio?.ticker, price, amount,isAdded:portfolio?.isAdded});
          }}
          onChangeText={(amount) => {
            let amt=isPositiveInteger(amount);
            console.log(amt);
            setAmount(amt);
            onChange({ ticker: portfolio?.ticker, price, amount });
          }}
          style={{ flex: 1 }}
          // placeholder={'200'}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.85}
        style={{ width: '25%' }}
        onPress={() => {
          onRemove(portfolio?.ticker,index,portfolio?.isAdded);
        }}
      >
        <Image source={assets.icon_trash_color} style={styles.deleteIcon} />
      </TouchableOpacity>
    </View>
  );
};
const PortfolioSettings = ({navigation}) => {
  // const {
  //   params: { portfolioList: _portfolioList,general:_general},
  // } = useRoute();

 const route = useRoute();
 const { principal } = useSelector((s) => s.auth, shallowEqual);
 const { userId } = principal || {};

 let _portfolioList=route?.params?.portfolioList || [];
 let _general=route?.params?.general || {};
 const inset = useSafeAreaInsets();
 const [keyboardHeight] = useKeyboard();
 const portFolId=_portfolioList[0]?.portId || "";


 const [portfolioList, setPortfolioList] = useState(_portfolioList);
  const [general, setGeneral] = useState(_general);
  const [portId, setportId] = useState(portFolId);
  const dispatch = useDispatch();
  console.log('get Params');
  console.log(_portfolioList);

  const onEdit = async ({ ticker, price, amount ,isAdded=false}) => {

    if (!price) {
      dispatch(toastShow('평균 매수가를 입력해주세요'));
      return;
    }
    if (!amount) {
      dispatch(toastShow('수량을 입력해주세요.'));
      return;
    }

    if(isAdded)
    {
     return ;
    }
 let updatePortData= portfolioList ;

   var item = {
    ticker,
    price,
    amount,
  };

var foundIndex = updatePortData.findIndex(x => x.ticker == item.ticker);
 updatePortData[foundIndex] = item; 
  
  const updateArray =  updatePortData?.reduce?.((p, portfolio) => {
    const {
      ticker, amount, price
    } = portfolio || {};
    p.push({ ticker,
      amount,
      price})
    return p ;  
  },[])
  console.log('Updated Data');
  console.log(updateArray);
    await updatePortfolio(updateArray,portId);
    // todo... remove 중복코드.
    await refreshPortfolio();
  };

  //Set Portfolio Data from search screen
  useEffect(() => {
      if (_general?.ticker) {
        var portArray=portfolioList;
        portArray.push(_general);
        console.log('portArray');
        console.log(portArray);
        setPortfolioList(portArray);
    }
   },[_general]);

  const onRemove = async (ticker,index,isAdded=false) => {
    console.log(isAdded);
    if(isAdded)
    {
      let portfolioListData=portfolioList;
      let arr = portfolioListData.filter((item,indexdata) =>
      indexdata !== index
      );
      setPortfolioList(arr);
    return ;
    }
    portfolioList.splice(portfolioList.findIndex(a => a.ticker === ticker) , 1)
    const updateArray =  portfolioList?.reduce?.((p, portfolio) => {
      const {
        ticker, amount, price
      } = portfolio || {};
      p.push({ ticker,
        amount,
        price})
      return p ;  
    },[])
     await updatePortfolio(updateArray,portId);
    dispatch(toastShow('해당 종목이 삭제되었습니다.'));
    await refreshPortfolio();
  };

 


  const refreshPortfolio = async () => {
    const portfolio = await getPortfolio(userId);
    setPortfolioList(portfolio);
    setportId(portfolio[0]?.portId)
  };

  const handleUpdatePortfolio = async (list) => {
    try {
      const { data } = await restApi.put('/users/portfolio/replace', {
        portfolio: list,
      });
      console.log({ data });
    } catch (e) {
      console.warn(e);
    }
  };

  const onAdd = () => {
    navigation.navigate('PortfolioSearch', {
      isWatchList: false,
      mode:'setting'
    });
  };

  const savePortfolioData = async () => {
    console.log(portfolioList);
    if(portId=="")
    {
      portfolioList.length>0 && portfolioList.map(async (arrayData)=>{
        const {ticker,price,amount}=arrayData;
        if(arrayData.isAdded)
        {
          await addPortfolio({
            ticker,
            price,
            amount,
          });
          await refreshPortfolio();

        }
      })
    }
  else
 {
   let updateData=[];
   if(portfolioList)
   {
     let portData = portfolioList?.map(({ticker,price,amount})=>{
       updateData.push({
         ticker,
         price,
         amount,
       })
     }) 
     
   }

  await updatePortfolio(updateData,portId);
  await refreshPortfolio();
  navigation.navigate('Portfolio');
 }
    // new Promise.all(
    //   portfolioList.length>0 && portfolioList.map(async (arrayData)=>{
    //     const {ticker,price,amount}=arrayData;
    //     if(arrayData.isAdded)
    //     {
    //       await addPortfolio({
    //         ticker,
    //         price,
    //         amount,
    //       });
    //       await refreshPortfolio();

    //     }
    //   })
    // ).then(res =>navigation.navigate('Portfolio'));

  }

  console.log({ portfolioList });

  const renderItem = React.useCallback(({ item, index, drag, isActive }) => {
    return (
      <PortfolioListItem
        onEdit={onEdit}
        onRemove={onRemove}
        portfolio={item}
        onLongPress={drag}
        index={index}
        onChange={(portfolio) => {
          console.log(portfolio);
        }}
      />
    );
  }, []);

  return (
    <View style={[styles.container,{position:'relative'}]}>
    <ScrollView
     contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.titleBox}>
        <View style={{ width: '5%' }} />
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
              width: '25%',
            },
          ]}
        >
          평균 매수가($)
        </Text>
        <Text
          style={[
            styles.titleText,
            {
              width: '25%',
            },
          ]}
        >
          수량 (주식 수)
        </Text>

        <View style={{ width: '25%' }} />
      </View>

     <View>
     <DraggableFlatList
        style={{ flex: 1 }}
        data={portfolioList}
        onDragEnd={({ data }) => {
          setPortfolioList(data);
          handleUpdatePortfolio(data);
        }}
        keyExtractor={(item, index) => `${item?.ticker}`}
        renderItem={renderItem}
      />
       <TouchableOpacity
          style={styles.addButtonWrapper}
          onPress={onAdd}
          activeOpacity={0.85}
        >
          <View style={styles.addButton}>
            <Image source={assets.icon_plus_sm} style={styles.addIcon} />
          </View>
          <Text style={styles.addText}>종목추가</Text>
        </TouchableOpacity>
     </View>

     </ScrollView>

     <View
style={[
  styles.buttonFrame,

]}
>
<DefaultButton
  onPress={savePortfolioData}
>
 저장
</DefaultButton>
</View>
     </View>
  );
};

export default PortfolioSettings;
