import React from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import colors from '#common/colors';
import assets from '../../assets';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 13,
    marginHorizontal:-20,
    paddingHorizontal:20
  },
  stockName: {
    fontSize: 12,
    paddingTop: 6.5,
    // textAlign:'center',
    // width :45,
   
  },

  footer: { flexDirection: 'row' },
  footerContents: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  imageStyleCircular: { 
    width: 30, 
    height: 30, 
    borderRadius: 18,
    // borderWidth:1,
    // borderColor:colors.veryLightBlueTwo 
  },

  imageStyle: {
    width: 85,
    height: 58,
  },


  textWrapper: { paddingLeft: 15, flex: 1 },
  newsHeader: {
    color: colors.dark,
  },
  newsName: { fontSize: 13, color: colors.greyBlue },
  bullet: { color: colors.cloudyBlueTwo, marginHorizontal: 4 },
  timeText: {
    fontSize: 13,
    color: colors.blueyGrey,
    paddingVertical: 3,
  },
  iconStyle: {
    width: 10,
    height: 10,
  },
  numberText: { fontSize: 13, color: colors.blueyGrey, marginLeft: 4 },
});

const NewsListItem = ({ onPress, title, time, item,primaryTicker,image,isCircular=false}) => {
  
  console.log('NEWSLISTITEM', primaryTicker,item?.source);
  const payload = item;
  return (
    <TouchableHighlight
    underlayColor= {colors.paleGreyTwo}
    style={styles.container}
      onPress={onPress}
    >
      <React.Fragment>
      <View style={{alignItems:'center',paddingTop:3,width: 35}}>
        <Image
          source={image}
          style={[isCircular?styles.imageStyleCircular:styles.imageStyle]}
        />
       <Text style={styles.stockName} numberOfLines={1}>{primaryTicker}</Text>

      </View>
      <View style={styles.textWrapper}>
        <Text
          ellipsizeMode={'tail'}
          numberOfLines={2}
          style={styles.newsHeader}
        >
          {payload?.titleKo}
        </Text>

        <Text style={styles.timeText}>
          {moment(payload?.publication_date).format('YYYY.MM.DD a h:MM')}
        </Text>

        <View style={styles.footer}>
          <View style={styles.footerContents}>
            <Image source={assets.icon_news_view} style={styles.iconStyle} />
            <Text style={styles.numberText}>{payload?.views || 0}</Text>
          </View>
          <View style={styles.footerContents}>
            <Image source={assets.icon_news_comment} style={styles.iconStyle} />
            <Text style={styles.numberText}>
              {payload?.comments || 0}
            </Text>
          </View>
          <View style={styles.footerContents}>
            <Image source={assets.icon_news_recomm} style={styles.iconStyle} />
            <Text style={styles.numberText}>
              {payload?.likes}
            </Text>
          </View>
          <View style={styles.footerContents}>
            <Image source={assets.icon_news_clip} style={styles.iconStyle} />
            <Text style={styles.numberText}>
              {payload?.scraps || 0}
            </Text>
          </View>
        </View>
      </View>
      </React.Fragment>
    </TouchableHighlight>
  );
};

export default NewsListItem;
