import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '#common/colors';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stockIcon: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: '#eee',
  },
  stockName: {
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
  stockKo: {
    color: colors.dark,
    fontSize: 14,
  },
  stockEn: {
    color: colors.blueyGreyTwo,
    fontSize: 13,
  },
});

const StockNameCard = ({ name, ticker, nameKo }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={() => {
        console.log('generalgeneral', name, ticker);
        navigation.navigate('PortfolioDetails', {
          general: { name, ticker },
        });
      }}
    >
      <Image
        style={styles.stockIcon}
        source={{
          uri: `https://storage.googleapis.com/pickhaeju-static/logo/${ticker}.png`,
        }}
      />
      <View style={styles.stockName}>
        <Text style={styles.stockKo}>{nameKo || name}</Text>
        <Text style={styles.stockEn}>{ticker?.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default StockNameCard;
