import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import colors from '#common/colors';
import assets from '../../assets';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 4.5,
    shadowColor: colors.blueGrey,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
    padding: 20,
  },
  iconStyle: {
    width: 22,
    height: 22,
  },
  arrowStyle: {
    width: 7,
    height: 7,
    marginTop: 7,
    marginRight: 5
  },
  title: {
    color: colors.blueGrey,
    fontSize: 14,
    paddingBottom: 7.5,
  },
  text: {
    fontSize: 16,
    // fontWeight: 'bold',
    // fontFamily: 'Roboto-Bold',
    color: colors.dark,
  },
  wrapper: { flexDirection: 'row', justifyContent: 'space-between' },
  amountWrapper: { flexDirection: 'row', justifyContent: 'flex-start' },
});

const PortfolioCard = ({ title, icon, children, textColor }) => {
  console.log({children})
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>{title}</Text>
        <Image style={styles.iconStyle} source={icon} />
      </View>
      <View style={styles.amountWrapper}>
        {
          textColor === "#5faef0"? <Image style={styles.arrowStyle} source={assets.arrow_down_blue} /> 
          : textColor === "#ec4f4f"?  <Image style={styles.arrowStyle} source={assets.arr_up_red} /> : null
        }
        <Text style={[styles.text, { color: textColor }]}>{children}</Text>
      </View>
    </View>
  );
};

export default PortfolioCard;
