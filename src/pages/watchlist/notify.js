import React, { useEffect, useState } from 'react';
import {
  Animated,
  Easing,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '#common/colors';
import assets from '../../../assets';
import { useNavigation, useRoute } from '@react-navigation/native';
import ToggleSwitch from '#components/ToggleSwitch';
import { toastShow } from '#data/toast/ToastAction';
import { useDispatch, useSelector } from 'react-redux';
import { subscribeDevice, unsubscribeDevice, getDeviceList } from '../../common/deviceApi';
import {checkNotifyTickers, checkUserNotified} from '#data/auth/actions';

const styles = StyleSheet.create({
  titleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    paddingLeft: 25,
    paddingRight: 22,
    justifyContent: 'space-between',
  },
  arrowIcon: { width: 10, height: 6, marginRight: 12 },
  titleText: {
    fontSize: 18,
    letterSpacing: -0.45,
    color: colors.dark,
    marginRight: 11,
  },
  numText: { fontSize: 18, letterSpacing: -0.45, color: colors.blueyGrey },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 44,
    marginVertical: 12,
    paddingRight: 32,
  },
  userName: { fontSize: 14, letterSpacing: -0.35, color: colors.greyBlue },
  alarmIcon: { width: 14, height: 18 },
  deleteWrapper: {
    backgroundColor: colors.greyBlue,
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: { width: 15, height: 15 },
  switchStyle: { width: 40, height: 20 },
  switchCircleStyle: { width: 16, height: 16 },
});
const data = [
  { id: 'dfda', title: 'dfda' },
  { id: 'dfds', title: 'dfds' },
  { id: 'dfdt', title: 'dfdt' },
  { id: 'dfdy', title: 'dfdy' },
];

const ListRender = (props) => {
  console.log('prop item');
  console.log(props?.item);
 
  const watch = props?.item;
  const deviceID = props?.deviceID;
  const defaultSel = props?.defaultSel;
  console.log('defaultSel');
  console.log(defaultSel);
  const rotateValue = React.useRef(new Animated.Value(0)).current;
  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-90deg'],
  });
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const userInfo = useSelector((s) => s.auth?.principal);
  const isVisited = useSelector((s) => s.auth?.isVisited);
  let subscribedTickers = useSelector((s) => s.auth?.subscribedTickers);

  React.useEffect(() => {
    if(defaultSel?._id == watch?._id)
    {
      setIsOpen(true); 
    }
    else{
      setIsOpen(false); 
    }
    checkSubs();
  }, [props?.defaultSel]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

 
const checkSubs = () =>{
  const userId=userInfo?.userId;
    getDeviceList(userId).then((data) => {
       dispatch(checkNotifyTickers(data?.docs[0]?.topics || [])); 
      let checktoggle = watch?.stocks.filter(x => data?.docs[0]?.topics.includes(x));
      if(isVisited && checktoggle?.length == 0)
        setIsEnabled(false);
        else
        setIsEnabled(true);
     });
}

const toggleAction = () =>{
  const userId=userInfo?.userId;
    getDeviceList(userId).then((data) => {
       dispatch(checkNotifyTickers(data?.docs[0]?.topics || []));
       setIsEnabled(!isEnabled);
     });
}
  

  const getTickerVal = (isActive,Item) =>{
    console.log('isActive,Item');
    console.log(isActive,Item);
     if(isActive) 
     {
      subscribeDevice(deviceID,[Item]).then((data) => {
        checkSubs();
      });
     }
     else
     {
      unsubscribeDevice(deviceID,[Item]).then((data) => {
        checkSubs();
      });
     }
  }

  // React.useEffect(() => {
  //   if (!!isEnabled) {
  //     dispatch(toastShow('PUSH 알림이 설정되었습니다.'));
  //   } else {
  //     dispatch(toastShow('PUSH 알림이 해제되었습니다.'));
  //   }
  // }, [isEnabled]);

  React.useEffect(() => {
    Animated.timing(rotateValue, {
      toValue: isOpen ? 0 : 1,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  return (
    <>
      <TouchableOpacity style={styles.titleHeader} onPress={toggleOpen}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Animated.Image
            source={assets.arrow_push_down}
            style={[
              styles.arrowIcon,
              {
                transform: [
                  {
                    rotate,
                  },
                ],
              },
            ]}
          />
          <Text style={styles.titleText}>{watch?.name}</Text>
          <Text style={styles.numText}>{watch?.stocks?.length}</Text>
        </View>
        <ToggleSwitch
          state={isEnabled}
          // setState={setIsEnabled}
          onPress={() => {
            setIsEnabled((prev) => !prev)
            if (isEnabled) {  
               let FilterVal = watch?.stocks.filter(x => subscribedTickers.includes(x));
               console.log('unsubscribed called');
               console.log(subscribedTickers);
              let stockData = FilterVal?.length == 0 ? watch?.stocks : FilterVal;
              unsubscribeDevice(deviceID,stockData).then((data) => {
                toggleAction();
              });
              dispatch(toastShow('PUSH 알림이 해제되었습니다.'));
            } else {
             
              let FilterVal = watch?.stocks.filter(x => !subscribedTickers.includes(x));  
               let stockData = FilterVal?.length == 0 ? watch?.stocks : FilterVal;
              subscribeDevice(deviceID,stockData).then((data) => {
                toggleAction();
              });
              dispatch(toastShow('PUSH 알림이 설정되었습니다.'));
            }
          }}
          containerStyle={[styles.switchStyle]}
          circleStyle={[styles.switchCircleStyle]}
          activeColor={colors.lightIndigo}
        />
      </TouchableOpacity>
      {isOpen && (
        <FlatList
          data={watch?.stocks}
          scrollEnabled={false}
          contentContainerStyle={{}}
          renderItem={({ item, index }) => <WatchListRender item={item} isEnable={isEnabled} controlNotify={getTickerVal} />}
        />
      )}
    </>
  );
};

const WatchListRender = (props) => {
  const { item, isEnable } = props;
  const [isAlarm, setIsAlarm] = useState(true);
  let subscribedTickers = useSelector((s) => s.auth?.subscribedTickers);

  React.useEffect(() => {
    const getFound = subscribedTickers.find(element => element == item);
    console.log('getFound');
    console.log(getFound);
    if(getFound)
    {
      setIsAlarm(true);    
    }
    else
    {
      setIsAlarm(false);   
    }
  },[subscribedTickers])
  return (
    <View style={styles.wrapper}>
      <Text style={styles.userName}>{item}</Text>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => {
          props.controlNotify(!isAlarm,item);
          setIsAlarm(!isAlarm)
        }}
      >
        <Image
          source={isAlarm ? assets.icon_alarm_on : assets.icon_alarm_off}
          style={[styles.alarmIcon]}
        />
      </TouchableOpacity>
    </View>
  );
};

const WatchlistNotify = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const userInfo = useSelector((s) => s.auth?.principal);
  const isVisited = useSelector((s) => s.auth?.isVisited);

  const watchdata = route?.params?.watchdata;
  console.log('watchdata list');
  console.log(watchdata);  
  const selWatch = route?.params?.selWatch;
  const [isEnabled, setIsEnabled] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [deviceID, setDeviceId] = useState(false);
  const checkSubs = () =>{
    const userId=userInfo?.userId;
      getDeviceList(userId).then((data) => {
        dispatch(checkNotifyTickers(data?.docs[0]?.topics || []));
       });
  }
  const setEnableNotify = async (deviceID) =>{

    let stocksArray = await watchdata.map?.(({ stocks }) => stocks).flat();
    let uniqueChars = [...new Set(stocksArray)];
    subscribeDevice(deviceID,uniqueChars).then((data) => {
      console.log('subscribed');
      console.log(data);
      dispatch(checkUserNotified(true));
      checkSubs();
    });
  }
  // const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  useEffect(() => {
    const userId=userInfo?.userId;
    
    getDeviceList(userId).then((data) => {
      console.log('user is visited');

      console.log(data?.docs);
      setSubscribed(data?.docs?.topics || []);
       dispatch(checkNotifyTickers(data?.docs[0]?.topics || []));
      if(!isVisited)
      {
       setEnableNotify(data?.docs[0]?._id);  
      }

      setDeviceId(data?.docs[0]?._id)
     });
    },[navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <FlatList
        data={watchdata || []}
        renderItem={({ item }) => <ListRender item={item} deviceID={deviceID} defaultSel={selWatch}/>}
      />
    </View>
  );
};

export default WatchlistNotify;
