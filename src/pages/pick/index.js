import React, { useEffect, useState, useRef } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import colors from '#common/colors';
import Animated from 'react-native-reanimated';
import PickNews from '#widgets/pick_news';
import PickPickTab from '#widgets/pick_pick';
//import HotPicTalkList from '#widgets/HotPicTalkList';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import assets from '../../../assets';
import { useNavigation, useRoute } from '@react-navigation/native';
import TabView from '#components/TabView';
import AddStockPopUp from '#components/AddStockPopUp';
import WatchlistPopUp from '#components/WatchListPopUp';
import PortfolioPopUp from '#components/PortfolioPopUp';
import RecommendPopUp from '#components/RecommendPopUp';
import UpdatePopUp from '#components/UpdatePopUp';
import TabProvider from '#components/TabScene';
import TabScreens from '#components/TabScene/TabScreens';
import TabBar from '#components/TabScene/TabBar';
import Document from '#components/Document';
import FearChart from '../../components/FearChart';
import { useSelector } from 'react-redux';
 
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    borderBottomColor: colors.lightPeriwinkle,
    borderRightColor: colors.lightPeriwinkle,
    borderLeftColor: colors.lightPeriwinkle,
  },
  indicatorContainerStyle: {
    overflow: 'visible',
    marginBottom: -4,
  },
  contentContainerStyle: {
    marginBottom: -4,
  },
  labelStyle: {
    fontSize: 18,
    // fontWeight: '500',
    textAlign: 'center',
    width: 50,
  },
  indicator: {
    bottom: 2,
    height: 4,
    position: 'absolute',
    alignItems: 'center',
  },
  indicatorItem: {
    width: 40,
    height: 2,
    backgroundColor: colors.lightIndigo,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  pageCircle: {
    marginHorizontal: 7,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  container: { backgroundColor: colors.white, flex: 1 },
  writeButton: {
    backgroundColor: colors.purply,
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  writeIcon: { width: 14, height: 14 },

});
console.disableYellowBox = true;

const PickIndex = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [index, setIndex] = useState(route.params?.index || 0);
  const inset = useSafeAreaInsets();
  const { principal } = useSelector((s) => s.auth);
  const [refreshing, setRefreshing] = useState(true);

  const ref = React.useRef(null);

  /* const anim = useRef(new Animated.Value(0));*/
  useEffect(() => {
    setIndex(route.params?.index || 0);
  }, [route.params?.index]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      ref.current.scrollToOffset({ offset: 0 })
     });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <TabProvider index={index} onChangeIndex={setIndex}>
        <View
          style={{ height: 55 + inset.top, backgroundColor: colors.white }}
        />
         <Document isTab='isTab'>
          <TabScreens>
          {/* <View title={'픽톡'} style={{ flex: 1 }}>
              <HotPicTalkList  scrollRef={ref}/>
            </View> */}
            <View title={'뉴스'} style={{ flex: 1 }}>
              <PickNews scrollRef={ref} />
            </View>
            <View title={'PICK'} style={{ flex: 1 }}>
              <PickPickTab scrollRef={ref} />
            </View>
            
          </TabScreens>
        </Document>
        {/* {index === 1 && principal ? (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              if (principal) {
                navigation.navigate('PickWrite');
              } else {
                Alert.alert('안내', '로그인 후 이용 가능합니다.');
              }
            }}
            style={[
              styles.writeButton,
              {
                bottom: inset.bottom + 20,
              },
            ]}
          >
            <Image source={assets.topButton} style={styles.writeIcon} />
           </TouchableOpacity>
        ) : null} */}
       
      </TabProvider>
    </View>
  );
};

export default PickIndex;
