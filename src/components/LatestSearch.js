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
import assets from '../../assets';
import PortfolioPopUp from '#components/PortfolioPopUp';
import WatchlistPopUp from '#components/WatchListPopUp';

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
const LatestSearch = ({ name, date, onPress, onRemove }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.searchWrapper} onPress={onPress}>
        <Text style={styles.stockName}>{name}</Text>
        <Text style={styles.timeText}>{date}</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.1} onPress={onRemove}>
        <Image source={assets.icon_close_sm} style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );
};
export default LatestSearch;
