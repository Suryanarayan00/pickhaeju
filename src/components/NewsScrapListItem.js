import React,{useState} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '#common/colors';
import assets from '../../assets';
import moment from 'moment';
import DeleteScrapPopUp from '#components/DeleteScrapPopUp';
import { clear, me } from '../data/auth/actions';
import { useDispatch } from 'react-redux';

import {
  removeScrapArticle,
 } from '../common/article';
 const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 13,
  },
  stockName: {
    fontSize: 12,
    paddingTop: 6.5,
    textAlign:'center'
  },

  footer: { flexDirection: 'row' },
  footerContents: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  imageStyleCircular: { width: 30, height: 30, borderRadius: 15 },

  imageStyle: {
    width: 85,
    height: 58,
  },


  textWrapper: { paddingLeft: 15, flex: 1, justifyContent: 'center' },
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
  trashIcon: {
    width: 15,
    height: 15,
  },
  trashIconWrapper: {
    width: 60,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexGrow: 1, 
  },
});

const NewsScrapListItem = ({deleteItem, onPress, title, time, item,primaryTicker,image,isCircular=false}) => {
  const dispatch = useDispatch();

    const [isVisible, setIsVisible] = useState(false);
    const [articleID, setArticleID] = useState('');
  console.log('NEWSSCRAPLIST', item);
  const remove=(newsID)=>{
    console.log('Remove Item');
    console.log(newsID); 
    setArticleID(newsID);
    setIsVisible(true);
 }

  return (
   <View>
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.container}
      onPress={onPress}
    >
      <View>
        <Image
          source={image}
          style={[isCircular?styles.imageStyleCircular:styles.imageStyle]}
        />
     <Text style={styles.stockName}>{!!primaryTicker?primaryTicker:''}</Text>

      </View>
      <View style={styles.textWrapper}>
        <Text
          ellipsizeMode={'tail'}
          numberOfLines={2}
          style={styles.newsHeader}
        >
          {item?.titleKo}
        </Text>

        <Text style={styles.timeText}>
          {moment(item?.publication_date).format('YYYY.MM.DD a h:MM')}
        </Text>

        <View style={styles.footer}>
          <View style={styles.footerContents}>
            <Image source={assets.icon_news_view} style={styles.iconStyle} />
            <Text style={styles.numberText}>{item?.view || 0}</Text>
          </View>
          <View style={styles.footerContents}>
            <Image source={assets.icon_news_comment} style={styles.iconStyle} />
            <Text style={styles.numberText}>
              {item?.comments}
            </Text>
          </View>
          <View style={styles.footerContents}>
            <Image source={assets.icon_news_recomm} style={styles.iconStyle} />
            <Text style={styles.numberText}>
              {item?.likes}
            </Text>
          </View>
          <View style={styles.footerContents}>
            <Image source={assets.icon_news_clip} style={styles.iconStyle} />
            <Text style={styles.numberText}>
              {item?.scraps}
            </Text>
          </View>
        </View>
       
      </View>
      <View style={{ 
          justifyContent: 'center'}}>
      <TouchableOpacity
                  style={{alignItems:'center', justifyContent:'center', paddingHorizontal:7, paddingVertical:10}}
                  activeOpacity={0.7}
                  onPress={() => remove(item?._id)}>
                  <Image source={assets.icon_trash} style={styles.trashIcon} />
                </TouchableOpacity>  
     
 
       </View> 
    </TouchableOpacity>
    
    
     <DeleteScrapPopUp
        isVisible={isVisible}
        onCancel={() => {
          setIsVisible(false);
        }}
        onDelete={async () => {
            const result = await removeScrapArticle(articleID);
          setIsVisible(false);
          dispatch(me());
          deleteItem(articleID);
        }}
      />
    </View>
  );
};

export default NewsScrapListItem;
