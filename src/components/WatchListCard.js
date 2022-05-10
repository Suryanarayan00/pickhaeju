import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import colors from '#common/colors';
import React from 'react';
import assets from '../../assets';
import { categoryIcon } from '../common/category';
import { hexToRgb, rgbaToHex } from '../utils/color.utils';

const styles = StyleSheet.create({
  container: { 
    paddingHorizontal: 8,
  },
  watchListCard: {
    height: 146,
    paddingHorizontal: 14,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: 96,
  },
  cardIconBox: {
    width: 33,
    height: 33,
    borderRadius: 7.5,
    backgroundColor: colors.white,
    shadowOpacity: 0.9,
    shadowOffset: {
      width: 3.3,
      height: 5.6,
    },
    elevation: 8,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 15,
    marginVertical: 20,
  },
  cardNum: {
    fontSize: 24,
    lineHeight: 24,
  },
  cardIcon: {
    width: 18,
    height: 18,
  },
});
const WatchListCard = ({ watch, onPress, isSelected }) => {
  const { name, color, icon, stocks } = watch;
  console.log('Color Val');
  console.log(isSelected);
  const colorVal = rgbaToHex({
    ...hexToRgb(watch.color),
    a: 32,
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={[
          styles.watchListCard,
          { backgroundColor: isSelected ? color : colorVal },
        ]}
        onPress={onPress}
      >
        <View
          style={[
            styles.cardIconBox,
            {
              shadowColor: `${isSelected ? color : colorVal}`,
            },
          ]}
        >
          <Image
            source={categoryIcon[icon]}
            style={[styles.cardIcon, { tintColor: color }]}
          />
        </View>
        <Text
          style={[
            styles.cardTitle,
            { color: isSelected ? colors.white : color },
          ]}
          numberOfLines={3}
        >
          {name}
        </Text>
        <View style={{ position: 'absolute', bottom: 15 }}>
          <Text
            style={[
              styles.cardNum,
              { color: isSelected ? colors.white : color },
            ]}
          >
            {stocks?.length || '0'}
          </Text>
        </View>
      </TouchableOpacity>
      
      {isSelected? <Image
        source={assets.tail_watchlist}
        style={[
          styles.tailStyle,
          {
            tintColor: color,
            opacity: 0.13,
            left:30,
            marginTop: 25
          },
        ]}
      />:null}
     
    </View>
  );
};
export default WatchListCard;
