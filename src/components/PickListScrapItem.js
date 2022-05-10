import React,{ useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '#common/colors';
import assets from '../../assets';
import moment from 'moment';
import DeletePickPopUp from '#components/DeletePickPopUp';
import {useDispatch} from 'react-redux';
import { clear, me } from '../data/auth/actions';

import {
  threadRemoveScrap,
  } from '../common/threadApi';
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: 'row',
  },
  stockName: {
    fontSize: 12,
    paddingTop: 6.5,
  },
  subText: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
  },
  footer: { flexDirection: 'row' },
  footerContents: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  imageStyle: { width: 30, height: 30, borderRadius: 15 },
  headerText: { color: colors.dark, overflow: 'hidden' },
  pickName: { fontSize: 13, color: colors.greyBlue },
  bullet: { color: colors.cloudyBlueTwo },
  timeText: { fontSize: 13, color: colors.blueyGrey },
  iconStyle: {
    width: 10,
    height: 10,
  },
  numberText: { fontSize: 13, color: colors.blueyGrey },
  pickHeader: { paddingLeft: 15, flex: 1 },
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

const PickListScrapItem = ({ deleteItem,onPress, item = {} }) => {
  const payload = item;
  console.log('scrap pick list');
  console.log(payload);
  const {
    title,
    primaryTicker,
    updatedAt,
    likes,
    views,
    comments,
    scraps,
    author,
  } = payload;

  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);
  const [threadID, setthreadID] = useState('');

const remove=(threadID)=>{
   console.log('Remove Item');
   console.log(threadID); 
   setthreadID(threadID);
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
          source={{
            uri: `https://storage.googleapis.com/pickhaeju-static/logo/${primaryTicker}.png`,
          }}
          style={styles.imageStyle}
        />
        <Text style={styles.stockName}>{primaryTicker}</Text>
      </View>
   
      
      <View style={styles.pickHeader}>
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={styles.headerText}
        >
          {title}
        </Text>
        <View style={styles.subText}>
          <Text style={styles.pickName}>{author?.name}</Text>
          <Text style={styles.bullet}> &#183;</Text>
          <Text style={styles.timeText}>
            {' '}
            {moment(new Date(updatedAt)).format(
              'YYYY.MM.DD a hh:mm',
            )}
          </Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerContents}>
            <Image source={assets.icon_news_view} style={styles.iconStyle} />
            <Text style={styles.numberText}> {views}</Text>
          </View>
          <View style={styles.footerContents}>
            <Image source={assets.icon_news_comment} style={styles.iconStyle} />
            <Text style={styles.numberText}> {comments?.length}</Text>
          </View>
          <View style={styles.footerContents}>
            <Image source={assets.icon_news_recomm} style={styles.iconStyle} />
            <Text style={styles.numberText}> {likes || 0}</Text>
          </View>
          <View style={styles.footerContents}>
            <Image source={assets.icon_news_clip} style={styles.iconStyle} />
            <Text style={styles.numberText}> {scraps || 0}</Text>
          </View>
        </View>
      </View>
      <View style={{ 
          justifyContent: 'flex-end'}}>
      <TouchableOpacity
                  style={styles.trashIconWrapper}
                  activeOpacity={0.7}
                 onPress={() => remove(item?._id)}
                  // onPress={() =>deleteItem(item?.id)}
                 >
                  <Image source={assets.icon_trash} style={styles.trashIcon} />
                </TouchableOpacity>  
     
 
       </View>
      </TouchableOpacity>  
    
      <DeletePickPopUp
        isVisible={isVisible}
        onCancel={() => {
          setIsVisible(false);
        }}
         onDelete={async () => {
            const result = await threadRemoveScrap(threadID);
          setIsVisible(false);
          console.log(result);
          dispatch(me());
          deleteItem(threadID);
          
        }}
      />
    </View>
    
  );
};

export default PickListScrapItem;
