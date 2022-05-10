import React from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import colors from '#common/colors';
import assets from '../../assets';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    marginHorizontal:-20,
    paddingHorizontal:20,
    paddingVertical:15,
    marginVertical:-15

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
});

  const PickListItem = ({ onPress, item = {} }) => {
  console.log('Pick List Item');
  console.log(item);
//  const { payload = {} } = item;
  const {
    title,
    primaryTicker,
    updatedAt,
    likes,
    views,
    comments,
    scraps,
    user,
  } = item;
  return (
    <TouchableHighlight
    underlayColor= {colors.paleGreyTwo}
      style={styles.container}
      onPress={onPress}
    >
      <React.Fragment>
       <View style={{alignItems:'center',paddingTop:3,width: 35}}>
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
          <Text style={styles.pickName}>{user?.name}</Text>
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
            <Text style={styles.numberText}> {comments}</Text>
          </View>
          <View style={styles.footerContents}>
            <Image source={assets.icon_news_recomm} style={styles.iconStyle} />
            <Text style={styles.numberText}> {likes}</Text>
          </View>
          <View style={styles.footerContents}>
            <Image source={assets.icon_news_clip} style={styles.iconStyle} />
            <Text style={styles.numberText}> {scraps}</Text>
          </View>
        </View>
      </View>
      </React.Fragment>
    </TouchableHighlight>
  );
};

export default PickListItem;
