import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '#common/colors';
import ArcChart from '#components/Chart/ArcChart';
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
    height: 210,
    paddingTop: 20,
    backgroundColor: 'rgb(86,  91, 120)',
  },
  backImage: {
    position: 'absolute',
    height: 210,
    width: '50%',
    zIndex: -1,
    top: 0,
    bottom: 40,
    right: 0,
    resizeMode: 'stretch',
    tintColor: 'rgb(91,  96,  124)',
  },
  title: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  wrapper: { flexDirection: 'row', marginTop: 20 },
  graphContainer: {
    width: 190,
    maxWidth: 190,
    marginLeft: 20,
    marginTop: 4,
    alignItems: 'center',
  },
  graphDescription: {
    color: 'rgb(187, 191 ,209)',
    textAlign: 'center',
    fontSize: 10,
  },
  graphLegend: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendFear: { fontSize: 10, color: colors.pastelRed },
  legendGreed: { fontSize: 10, color: colors.brightLightBlue },
  pastFear: { flexDirection: 'row', marginBottom: 10, marginLeft: 20 },
  pastFearCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
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
    borderRadius: 7,
    marginLeft: 4.5,
  },
});

const getCurrentFearColor = (v) =>
  colorInterpolate(
    v,
    [0, 50, 100],
    [colors.pastelRed, colors.sicklyYellow, colors.brightLightBlue],
  ) || colors.sicklyYellow;

const PastFear = ({ value, valueText, label }) => {
  const currentFearColor = getCurrentFearColor(value);
  return (
    <View style={styles.pastFear}>
      <View
        style={[
          styles.pastFearCircle,
          {
            backgroundColor: currentFearColor,
          },
        ]}
      >
        <Text style={{ color: colors.slate, fontSize: 14 }}>
          {value}
        </Text>
      </View>
      <View style={{}}>
        <Text style={{ fontSize: 9, color: 'rgb(187, 191, 209)' }}>
          {label}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'Roboto-Bold',
            color: 'white',
            marginTop: 5,
          }}
        >
          {FGITextMap[valueText] || '-'}
        </Text>
      </View>
    </View>
  );
};

const FearChart = ({ updatedDate, fgi, setFgi, setUpdatedDate }) => {
  // const [updatedDate, setUpdatedDate] = useState('-');
  // const [fgi, setFgi] = useState({});
  const [showHelp, setShowHelp] = useState(false);
  const [isModal, setIsModal] = React.useState(false);
  // useEffect(() => {
  //   const getFear = async () => {
  //     const { data } = await fearAndGreed();
  //     const {
  //       result: { updatedAt, fgi },
  //     } = data;
  //     console.log(data, updatedAt, moment(updatedAt._seconds * 1000));
  //     setFgi(fgi);
  //     setUpdatedDate(
  //       `${moment(updatedAt._seconds * 1000).format('MM.DD A hh')}시 기준`,
  //     );
  //   };

  //   getFear();
  //   return () => {};
  // }, []);
  const currentFearColor = getCurrentFearColor(fgi?.now?.value);
  return (
    <View style={styles.container}>
      <Image
        source={assets.bg_pf_visual}
        style={styles.backImage}
        resizeMode={'stretch'}
      />
      <View style={{}}>
        <Text style={styles.title}>
          현 시장은 정서적으로{' '}
          <Text style={{ color: currentFearColor }}>
            {FGITextMap[fgi?.now?.valueText]}
          </Text>
          에 가깝습니다.
        </Text>
      </View>
      <View style={styles.wrapper}>
        <View style={{ flex: 2, alignItems: 'center' }}>
          <View style={styles.graphContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styles.graphDescription}>
                {'공포 탐욕 지수(Fear & Greed Index)'}
              </Text>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => {
                  setShowHelp(help['공포탐욕지수']);
                }}
                style={{ zIndex: 1 }}
              >
                <Image
                  source={assets.icon_question}
                  style={styles.questionIcon}
                />
              </TouchableOpacity>
            </View>
            <ArcChart value={fgi?.now?.value || 50} />
            <View
              style={[
                styles.pastFearCircle,
                {
                  position: 'absolute',
                  backgroundColor: getCurrentFearColor(fgi?.now?.value),
                  bottom: 0,
                },
              ]}
            >
              <Text
                style={{
                  color: colors.slate,
                  fontSize: 14,
                  // fontWeight: 'bold',
                }}
              >
                {fgi?.now?.value}
              </Text>
            </View>
            <View style={styles.graphLegend}>
              <Text style={styles.legendFear}>극도의 공포</Text>
              <Text style={styles.legendGreed}>극도의 탐욕</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1.5 }}>
          <PastFear {...(fgi?.oneWeekAgo || {})} label="1주일 전" />
          <PastFear {...(fgi?.oneMonthAgo || {})} label="1개월 전" />
          <PastFear {...(fgi?.oneYearAgo || {})} label="1년 전" />

          {/* <View style={{ flexDirection: 'row'}}>
            <View style={styles.infoIcon}>
              <View style={styles.exclamationMark1} />
              <View style={styles.exclamationMark2} />
            </View>
            <Text style={styles.updatedDate}>{updatedDate}</Text>
          </View> */}
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

export default FearChart;
