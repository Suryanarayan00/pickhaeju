import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  RefreshControl
} from 'react-native';
import colors from '#common/colors';
import FeedData from '#widgets/feed_data';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import Document from '#components/Document';
import moment from 'moment';

import { useSelector } from 'react-redux';


const FeedIndex = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [index, setIndex] = useState(route.params?.index || 0);
  const inset = useSafeAreaInsets();
  const { principal } = useSelector((s) => s.auth);
  const [refreshing, setRefreshing] = useState(true);
  const [refreshTime, setRefreshTime] = useState(false);

  const ref = React.useRef(null);
  const docScrollRef = useRef(null);

  /* const anim = useRef(new Animated.Value(0));*/

  useEffect(() => {
     setRefreshing(true);
     docScrollRef?.current.scrollTo({ y:0})
     onRefresh();
  }, [route.params?.refreshTime]);
 
 const onRefresh =()=>{
  setRefreshTime(new Date().getTime());
  setRefreshing(false);
 }
 
  return (
    <View style={{ flex: 1 }}>
        <View
          style={{ height: 55 + inset.top, backgroundColor: colors.white }}
        />
        <Document  scrollRef={docScrollRef}
        scrollProps={{
          refreshControl: (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} 
            tintColor={colors.aqua}
            colors={[colors.aqua, colors.aqua,colors.aqua]}
            progressBackgroundColor="#ffffff"
             title={`업데이트 :${moment().format('YYYY.MM.DD a h:MM')}`}
            />
          ),
        }}>
        <FeedData refreshTimeVal={refreshTime}/>
        </Document>
    </View>
    
  );
};

export default FeedIndex;
