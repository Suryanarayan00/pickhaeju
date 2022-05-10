import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import colors from '#common/colors';
import LatestReplyBlock from '#components/LatestReplyBlock';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import Document from '#components/Document';

import { useSelector } from 'react-redux';


const PickTalkIndex = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [index, setIndex] = useState(route.params?.index || 0);
  const inset = useSafeAreaInsets();
  const { principal } = useSelector((s) => s.auth);
  const [refreshing, setRefreshing] = useState(true);
  const [tickerVal, setTicker] = useState(route.params?.ticker);

  
  const ref = React.useRef(null);
  /* const anim = useRef(new Animated.Value(0));*/

   return (
  
        <Document>
        <LatestReplyBlock scrollRef={ref} tickerVal={route.params?.ticker} />
        </Document>
  
  );
};

export default PickTalkIndex;