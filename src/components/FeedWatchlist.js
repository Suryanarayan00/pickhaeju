import React from 'react';
import { Text, View, StyleSheet, Image,ScrollView, TouchableOpacity, onPress, } from 'react-native';
import colors from '#common/colors';
import assets from '../../assets';
import moment from 'moment';
import { categoryColors,categoryIcon } from '../common/category';

const styles = StyleSheet.create({
// Watchlist Card Section Css
container: {
    marginVertical: 30,
  },
  watchListCard: {
    height: 146,
    paddingTop:20,
    paddingLeft:15,
    borderRadius: 5,
    width: 140,
    marginLeft: 15,
  },
  cardIconBox: {
    alignSelf: 'flex-start',
    marginLeft:5
    
   },
  cardTitle: {
    fontSize: 15,
    marginVertical: 20,
  },

});
const colorArray =[
    '#fd7061',
    '#ffaa5a',
    '#f1c209',
    '#d6c161',
    '#c7d435',
    '#87f571',
    '#84d27a',
    '#3ddb9a',
  ];
const FeedWatchlist = ({WatchData}) => {
    let colorArray = [];
      //Color Randomize
      categoryColors.map?.((row, index) => {
        colorArray.push(...row);
      });
    
  return (
  <View>
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 17,
          fontWeight: '700',
          color: '#000',
          marginBottom: 20,
          paddingHorizontal: 20
        }}
      >
        눈길이 가는 테마가 있으신가요?
      </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', paddingLeft: 5, }}>
          
          {WatchData?.map((feedWatch)=>{
            let randomColor = Math.floor(Math.random() * colorArray.length);
              console.log('feedWatch');
              console.log(feedWatch)
            return( <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.watchListCard,
                { backgroundColor:  feedWatch?.color || colorArray[randomColor]},
              ]}
              onPress={onPress}
            >
              <View style={[styles.cardIconBox]}>
                <Image
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 50,
                    marginRight: 7,
                  }}
                  source={categoryIcon[feedWatch?.icon]}
                />
              </View>
              <Text
                style={[
                  styles.cardTitle,
                  { color: '#fff', fontWeight: '700' },
                ]}
                numberOfLines={3}
              >
              {feedWatch?.name}
              </Text>
            </TouchableOpacity>  )
          })}      
          </View>
      </ScrollView>
    </View>
  </View>
  );
};

export default FeedWatchlist;
