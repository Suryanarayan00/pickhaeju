import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import assets from '../../assets';
import colors from '#common/colors';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const styles = StyleSheet.create({
  stockName: {
    fontSize: 12,
    paddingTop: 6,
    color: colors.dark,
  },
  pickWrapper: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.paleGrey,
  },
  pickFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: colors.white,
  },
  pickIcon: {
    marginRight: 6,
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 4,
    width: 40,
    height: 18,
  },
  moreButton: {
    color: colors.blueGrey,
    fontSize: 12,
  },
  subText: {
    flexDirection: 'row',
    marginTop: 5,
  },
  stockImage: {
    width: 30,
    height: 30,
  },
  pickContents: {
    paddingLeft: 17,
    flex: 1,
    justifyContent: 'center',
  },
  pickTitle: { fontSize: 14, color: colors.dark },
  pickWriter: { fontSize: 12, color: colors.dark, marginRight: 5 },
  pickTime: { fontSize: 12, color: colors.dark },
  pickIconArea: { flexDirection: 'row', alignItems: 'center' },
  iconText: { color: colors.white, fontSize: 11, letterSpacing: -0.55 },
  chartIcon: { width: 18, height: 18 },

  downIcon: {
    width: 5,
    height: 4,
    marginLeft: 5,
  },
});
const WritePickItem = ({ chart, item }) => {
  const navigation = useNavigation();
  

  const getPickStatus = () =>{
    let colorVal = "";
    let statusVal = "";
    if(item?.verified)
    {
      colorVal =  'rgb(127,41,186)';
      statusVal = '승인';
    }
    else if (!item?.verified && item?.editorMessages?.length == 0)
    {
      colorVal =  'rgb(177,177,177)';
      statusVal = '미승인';
    }
    else if (!item?.verified && item?.editorMessages?.length > 0)
    {
      colorVal =  'rgb(182,148,251)';
      statusVal = '수정요청';
    }
  
    return ( <View
      style={[
        styles.pickIcon,
        {
          backgroundColor: colorVal
        },
      ]}
    >
      <Text style={styles.iconText}>
        {statusVal}
      </Text>
    </View>)
  }

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => {
        navigation.navigate('PickDetails', { threadId: item._id });
      }}
    >
      <View style={styles.pickWrapper}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={{
              uri: 'http://www.econovill.com/news/photo/201901/354410_238616_443.PNG',
            }}
            style={styles.stockImage}
          />
          <Text style={styles.stockName}>{item?.primaryTicker}</Text>
        </View>
        <View style={styles.pickContents}>
          <Text
            ellipsizeMode={'tail'}
            numberOfLines={1}
            style={styles.pickTitle}
          >
            {item?.title}
          </Text>
          <View style={styles.subText}>
            <Text style={styles.pickWriter}>{item?.user?.name}</Text>

            <Text style={styles.pickTime}>
              {moment(new Date(item?.updatedAt)).format('YYYY.MM.DD a hh:mm')}
            </Text>
          </View>
        </View>
        <View style={styles.pickIconArea}>
         {getPickStatus()}
          {/*다른 아이콘*/}
          {
            /*<View style={[styles.pickIcon, { backgroundColor: colors.aqua }]}>
                <Text style={styles.iconText}>작성중</Text>
              </View>
              <View
                style={[
                  styles.pickIcon,
                  {
                    backgroundColor: colors.blueGreen,
                  },
                ]}
              >
                <Text style={styles.iconText}>검토중</Text>
              </View>
              <View
                style={[
                  styles.pickIcon,
                  {
                    backgroundColor: colors.liliac,
                    width: 50,
                  },
                ]}
              >
                <Text style={styles.iconText}>수정요청</Text>
              </View>
              <View
                style={[
                  styles.pickIcon,
                  {
                    backgroundColor: 'rgb(177,177,177)',
                  },
                ]}
              >
                <Text style={styles.iconText}>미승인</Text>
              </View>*/
            //daya you need to change
          }
          {/* {!!chart ? (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => {
                navigation.navigate('PickStatistics');
              }}
            >
              <Image
                source={assets.icon_chart}
                style={styles.chartIcon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          ) : null} */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WritePickItem;
