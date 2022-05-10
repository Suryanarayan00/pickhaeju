import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import assets from '../../assets';
import colors from '#common/colors';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const styles = StyleSheet.create({
  stockName: {
    fontSize: 12,
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
    marginRight: 10,
    width: 50,
    alignItems: 'center',
  },
  stockImage: {
    width: 30,
    height: 30,
    marginRight: 5,
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
  const { payload, id } = item;
  console.log('payload', payload, id);
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => {
        navigation.navigate('PickDetails', { threadId: id });
      }}
    >
      <View style={styles.pickWrapper}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Image
            source={{
              uri:
                'http://www.econovill.com/news/photo/201901/354410_238616_443.PNG',
            }}
            style={styles.stockImage}
          />
          <Text style={styles.stockName}>{payload?.primaryTicker}</Text>
        </View>
        <View style={styles.pickContents}>
          <Text
            ellipsizeMode={'tail'}
            numberOfLines={1}
            style={styles.pickTitle}
          >
            {payload?.title}
          </Text>
        </View>

        <View style={[styles.subText, { width: 70 }]}>
          <Text style={styles.pickTime}>
            {moment(new Date(payload?.updatedAt?._seconds * 1000)).format(
              'YYYY.MM.DD',
            )}
          </Text>
        </View>

        <View style={styles.subText}>
          <Text style={styles.pickTime}>{payload?.view || 0}</Text>
        </View>

        <View style={styles.subText}>
          <Text style={styles.pickTime}>{payload?.likes_count || 0}</Text>
        </View>

        <View style={styles.subText}>
          <Text style={styles.pickTime}>0</Text>
        </View>

        <View style={styles.pickIconArea}>
          <View
            style={[
              styles.pickIcon,
              {
                backgroundColor: payload?.verified
                  ? 'rgb(127,41,186)'
                  : 'rgb(177,177,177)',
              },
            ]}
          >
            <Text style={styles.iconText}>
              {payload?.verified ? '승인' : '미승인'}
            </Text>
          </View>
          {/*다른 아이콘*/}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WritePickItem;
