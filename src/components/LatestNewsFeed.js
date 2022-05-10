import React from 'react';
import { Text, View, StyleSheet, Image,ScrollView, TouchableHighlight, } from 'react-native';
import colors from '#common/colors';
import assets from '../../assets';
import moment from 'moment';
import { useNavigation, useRoute } from "@react-navigation/native";

const styles = StyleSheet.create({
// Block Text Box Setion Css
itemBox: {
    maxWidth: 140, borderWidth: 1, borderStyle: 'solid', borderColor: '#ebedf2', borderRadius: 5, padding: 15, marginLeft: 15
  },
  itemIwtBox: { 
    flexDirection: 'row', alignItems: 'center', marginBottom: 10 
  },
});

const LatestNewsFeed = ({latestNews}) => {
  const navigation = useNavigation();
  console.log('props',latestNews);
  return (
    <View style={{ width: '100%', marginVertical: 30,}}>
    <Text style={{ fontSize: 17, fontWeight: '700', color: '#000', marginBottom: 20, paddingHorizontal: 20, }}>뉴스 한눈에 보기</Text>
    <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
      <View style={{ flexDirection: 'row', paddingLeft: 5}}>
        {latestNews?.map((data)=>{
          let ticker=data.ticker || data.primaryTicker || data?.tickers?.[0];
          return(
            <TouchableHighlight underlayColor= {colors.paleGreyTwo} style={[styles.itemBox]} 
            onPress={() => {
              navigation.navigate('NewsDetails', { id: data._id });
            }}
            >
              <React.Fragment>
                <View style={[styles.itemIwtBox]}>
                  <Image style={{height: 40, width: 40, borderRadius: 50, marginRight: 7 }} 
                  source={{uri:`https://storage.googleapis.com/pickhaeju-static/logo/${data?.ticker}.png`}} />
                  <Text style={styles.marqueeTextBlack}>{ticker}</Text>
                </View>
                <Text numberOfLines={3}>{data?.titleKo}</Text>
              </React.Fragment>
             </TouchableHighlight>
          )     
        })
        }
      </View>
    </ScrollView>
  </View>
  );
};

export default LatestNewsFeed;
