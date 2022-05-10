import colors from '#common/colors';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import React, { useState } from 'react';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 30,
    backgroundColor: '#ffffff',
  },
  stockName: { fontSize: 19, color: colors.blueGrey },
  iconStyle: {
    width: 8,
    height: 8,
    marginLeft: 30,
  },
  timeText: { fontSize: 15, color: colors.cloudyBlue, alignSelf: 'center' },
  searchWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: 16,
    paddingLeft: 30,
  },
});
const LatestSearch = ({ nameKo,ticker, name, date, onPress, onRemove }) => {
  let KoreanName=nameKo;
  let EngName=name;
  let showName=nameKo ? nameKo : name;
  
  const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  if (check_kor.test(showName)) {
    if (showName.length > 8) {
      showName=showName.substring(0,8)+"..."
    }
  } else {
    if(typeof showName === 'object' && showName !== null)
      {
        showName=Object.values(showName)[0];
      }
    if (showName && showName.length > 14) {
      
      showName=showName.substring(0,14)+"..."
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.searchWrapper,{justifyContent:'flex-start'}]} onPress={onPress}>
        <View style={{width:80}}><Text style={styles.stockName}>{ticker}</Text></View>
        <View><Text style={styles.stockName}>{showName}</Text></View>

        <Text style={styles.timeText}>{date}</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.1} onPress={onRemove}>
        <View
          style={{
            height: 8.5,
            width: 8.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              position: 'absolute',
              borderRadius: 1,
              height: 1.5,
              width: 8.5,
              top: 0,
              backgroundColor: colors.cloudyBlueTwo,
            }}
          />
          <View
            style={{
              position: 'absolute',
              height: 8.5,
              borderRadius: 1,
              width: 1.5,
              left: 0,
              backgroundColor: colors.cloudyBlueTwo,
            }}
          />

          <View
            style={{
              position: 'absolute',
              borderRadius: 1,
              height: 1.5,
              width: 11,
              transform: [{ rotate: '45deg' }],
              backgroundColor: colors.cloudyBlueTwo,
            }}
          />
        </View>
        {/* <Image source={assets.icon_close_sm} style={styles.iconStyle} /> */}
      </TouchableOpacity>
    </View>
  );
};
export default LatestSearch;
