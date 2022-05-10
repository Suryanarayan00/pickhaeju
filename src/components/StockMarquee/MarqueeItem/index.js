import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import PropTypes from 'prop-types';
import colors from '#common/colors';
import assets from '../../../../assets';
import { commaFormat, numberToKorean } from '../../../utils/utils';

class MarqueeItem extends Component {
  render() {
    const {title, price, change, isGain, itemWidth, style} = this.props;
    return ( <View style={styles.marqueeIwt}>
      <Text style={styles.marqueeTextBlack}>{title}</Text>
      <Text
        style={[
          styles.marqueeTextBlack,
          { color: isGain < 0 ? colors.softBlue:isGain > 0 ? colors.watermelon: colors.lightIndigo, marginLeft: 10 },
        ]}
      >
        {`${commaFormat(price,undefined,undefined,2)} ( `}
       <Image
            source={
              isGain > 0 ? assets.arr_up_red :isGain < 0 ? assets.arrow_down_blue: null
            }
            style={styles.arrowIcon}
          /> {`${change})`}
      </Text>
     </View>) 
  }
}

const styles = StyleSheet.create({
  item: {
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textLight: {
    color: '#fff',
    fontSize: 10,
    marginLeft: 4,
    paddingBottom: 2,
  },
  gain: {
    color: '#15a767',
  },
  loss: {
    color: '#D35C6D',
  },
  
  marqueeIwt: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  marqueeTextBlack: {
    fontSize: 16,
    fontWeight: '700',
    color: '#131523',
    marginLeft:15
  },
  arrowIcon: { width: 6, height: 4 },

});


export default MarqueeItem;
