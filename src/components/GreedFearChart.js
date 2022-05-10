import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '#common/colors';
import FeedArcChart from '#components/Chart/FeedArcChart';
import assets from '../../assets';
import { colorInterpolate } from '../utils/color.utils';
import help from '../common/help';
import HelpPopup from './HelpPopup';

 const FGITextMap = {
  'Extreme Fear': '극도의 공포',
  Fear: '공포',
  Neutral: '중립',
  Greed: '탐욕',
  'Extreme Greed': '극도의 탐욕',
};
const styles = StyleSheet.create({
  container: {
    // height: 210,
    paddingTop: 30,
    paddingBottom: 23,
    paddingHorizontal: 20,
    backgroundColor: '#eff0f2',
  },
  // backImage: {
  //   position: 'absolute',
  //   height: 210,
  //   width: '50%',
  //   zIndex: -1,
  //   top: 0,
  //   bottom: 40,
  //   right: 0,
  //   resizeMode: 'stretch',
  //   tintColor: 'rgb(91,  96,  124)',
  // },
  // title: {
  //   color: 'white',
  //   fontSize: 18,
  //   textAlign: 'center',
  // },
  wrapper: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'flex-start'
 },
  graphContainer: {
    width: '100%',
    paddingTop: 13,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 7
  },
  graphLegend: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendFear: { fontSize: 10, fontWeight: '700', color: colors.pastelRed },
  legendGreed: { fontSize: 10, fontWeight: '700', color: colors.brightLightBlue },
  pastFear: { flexDirection: 'row', flex: 1, justifyContent: 'space-between', marginBottom: 7, backgroundColor: '#fff', paddingVertical: 13, paddingHorizontal: 10, borderRadius: 7 },
  pastFearCircle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoIcon: {
    height: 13,
    width: 13,
    borderRadius: 6.5,
    backgroundColor: 'rgb(167, 174, 212)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 5,
  },
  exclamationMark1: {
    height: 4,
    width: 2,
    borderRadius: 2,
    backgroundColor: '#515571',
    marginBottom: 2,
  },
  exclamationMark2: {
    height: 2,
    width: 2,
    borderRadius: 2,
    backgroundColor: '#515571',
  },
  updatedDate: {
    fontSize: 10,
    color: colors.cloudyBlueThree,
  },
  questionIcon: {
    width: 16,
    height: 16,
    marginLeft: 4.5,
  },
});
//    [colors.tealishtwo, colors.sicklyYellow, colors.darkishPink],

const getCurrentFearColor = (v) =>
  colorInterpolate(
    v,
    [0, 40,70,100],
    [ colors.darkishPink,
      colors.fadedOrangeTwo,
      colors.sicklyYellow,
      colors.tealishtwo],
  ) || colors.sicklyYellow;

const PastFear = ({ value, valueText, label }) => {
  const currentFearColor = getCurrentFearColor(value);
  return (
    <View style={styles.pastFear}>
      <View style={{ marginRight: 5, width: '70%' }}>
        <Text style={{ fontSize: 10, fontFamily: 'Roboto-Bold', color: '#959ba7', }} numberOfLines={1}>
          {label}
        </Text>
        <Text numberOfLines={1}
          style={{
            fontSize: 13,
            fontFamily: 'Roboto-Bold',
            color: currentFearColor,
            marginTop: 2,
          }}
        >
          {FGITextMap[valueText] || '-'}
        </Text>
      </View>

      <View style={[ styles.pastFearCircle, { backgroundColor: currentFearColor,} ]}>
        <Text style={{ color: '#fff', fontSize: 14, fontFamily: 'Roboto-Medium', }}>
          {value}
        </Text>
      </View>
    </View>
  );
};

const GreedFearChart = ({ updatedDate, fgi, setFgi, setUpdatedDate }) => {
    const [showHelp, setShowHelp] = useState(false);
  const [isModal, setIsModal] = React.useState(false);
 
  const currentFearColor = getCurrentFearColor(fgi?.now?.value);
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={{ width: '60%', marginRight: '4%',}}>
          <View style={styles.graphContainer}>
            <View style={{ width: '100%',marginBottom:21 }}>
              <View >
                <Text style={{ fontSize: 17, fontWeight: '700', textAlign: 'center' }}>공포 탐욕 지수</Text>
                <Text style={{ fontSize: 13, fontWeight: '700', color: '#959ba7', textAlign: 'center' }}>Fear & Greed Index</Text>
              </View>
              
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => {
                  setShowHelp(help['공포탐욕지수']);
                }}
                style={{ position: 'absolute', top: 2, right: -4, zIndex: 1 }}
              >
                <Image
                  source={assets.icon_question}
                  style={styles.questionIcon}
                />
              </TouchableOpacity>
            </View>

             <FeedArcChart value={fgi?.now?.value || 50} />

            <View
              style={[
                styles.pastFearCircle,
                {
                  position: 'absolute',
                  backgroundColor: getCurrentFearColor(fgi?.now?.value),
                  bottom: 30,
                },
              ]}
            >
              <Text
                style={{ color: '#fff', fontSize: 14, fontFamily: 'Roboto-Medium', }}
              >
                {fgi?.now?.value}
              </Text>
            </View>

            <View style={[styles.graphLegend,{marginTop:5}]}>
              <Text style={styles.legendFear}>극도의 공포</Text>
              <Text style={styles.legendGreed}>극도의 탐욕</Text>
            </View>
          </View>
        </View>

        <View style={{width: '36%'}}>
          <PastFear {...(fgi?.oneWeekAgo || {})} label="1주일 전" />
          <PastFear {...(fgi?.oneMonthAgo || {})} label="1개월 전" />
          <PastFear {...(fgi?.oneYearAgo || {})} label="1년 전" />
        </View>
      </View>
      <HelpPopup
        isVisible={!!showHelp}
        help={showHelp}
        onCancel={() => {
          setIsModal(false);
          setShowHelp(null);
        }}
      />
    </View>
  );
};

export default  GreedFearChart;
