import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Modal from '#components/Modal';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import assets from '../../assets';
import colors from '#common/colors';
import Svg, { Polygon } from 'react-native-svg';
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingBottom: 17,
  },
  header: {
    height: 50,
    backgroundColor: colors.purply,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 19,
  },
  title: {
    fontSize: 20,
    // fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    color: colors.white,
  },
  headerClose: { width: 12, height: 12 },
  iconButton: { width: 38, height: 38 },
  headerWrapper: {
    flexDirection: 'row',
    borderTopWidth: 1.5,
    borderTopColor: colors.paleLilacThree,
    height: 31,
    alignItems: 'center',
  },
  dataWrapper: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.paleLilacThree,
  },
  cellTitle: { flex: 1, color: colors.blueGrey },
  cell: { width: 60, textAlign: 'center' },
  tableRow: {
    flexDirection: 'row',
    height: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: colors.purply,
    letterSpacing: -0.26,
    marginTop: 9,
  },
  buttonWrapper: {
    alignSelf: 'flex-end',
    marginRight: 24,
    marginVertical: 5,
  },
  footerTableRow: {
    flexDirection: 'row',
    height: 31,
    alignItems: 'center',
    borderBottomColor: colors.paleLilacThree,
    borderBottomWidth: 1,
  },
  arrowButtonWrapper: {
    alignSelf: 'flex-end',
    marginRight: 24,
    marginTop: 16,
  },
  titleText: {
    marginBottom: 8,
    fontSize: 15,
    color: colors.blackTwo,
    letterSpacing: -0.37,
  },
});

const Rect3DBar = (props) => {
  const {
    color1 = colors.purply,
    color2 = '#651e9a',
    color3 = '#cf95fa',
    height = 105,
    style,
    title,
  } = props;

  return (
    <View
      style={[
        {
          height,
          marginRight: 10,
          justifyContent: 'flex-end',
        },
        style,
      ]}
    >
      <Svg style={{ bottom: 0 }} height={height} width="10">
        <Polygon points={`0,${height} 0,5 10,0,10,${height}`} fill={color1} />
      </Svg>

      <Svg
        style={{ position: 'absolute', left: 10, bottom: 0 }}
        height={height}
        width="10"
      >
        <Polygon points={`0,${height} 0,5 5,0 5,${height - 5}`} fill={color2} />
      </Svg>

      <Svg
        style={{ position: 'absolute', bottom: 0 }}
        height={height}
        width="15"
      >
        <Polygon points={`5,0 15,0 10,5 0,5`} fill={color3} />
      </Svg>
      <View
        style={{
          marginLeft: -5,
          minHeight: 15,
          position: 'absolute',
          bottom: -20,
          width: 35,
        }}
      >
        <Text style={{ color: colors.blueGrey, fontSize: 12, marginTop: 5 }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

const Chart3DBar = (props) => {
  const persentInterval = 20;
  const intervelCount = 7;
  const persentArray = Array(intervelCount)
    .fill(persentInterval)
    .map((num, index) => num * (index + 1) + '%')
    .reverse();
  console.log('persentArray', persentArray);

  const chartHeight = 176;
  const getHeight = (percent) => {
    return (
      percent * ((chartHeight * 100) / (persentInterval * intervelCount)) - 10
    );
  };
  return (
    <View
      style={{
        width: 260,
        height: chartHeight,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginVertical: 18,
      }}
    >
      <View
        style={{
          position: 'absolute',
          width: 260,
          height: chartHeight,
          justifyContent: 'flex-end',
        }}
      >
        {persentArray.map((data) => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: 30,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: colors.blueGrey, fontSize: 12 }}>
                  {data}
                </Text>
              </View>
              <View
                style={{
                  height: 1,
                  backgroundColor: 'rgb(216,218,233)',
                  flex: 1,
                  marginLeft: 10,
                }}
              />
            </View>
          );
        })}
      </View>
      <View
        style={{
          flexDirection: 'row',
          height: 176,
          alignItems: 'flex-end',
          marginLeft: 50,
        }}
      >
        <Rect3DBar
          style={{ marginLeft: 23, marginRight: 20 }}
          height={getHeight(1)}
          title="현재"
        />

        <Rect3DBar
          height={getHeight(0.5)}
          color1="#48dcd2"
          color2="#09c7ba"
          color3="#70fff5"
          title="추가후"
        />

        <Rect3DBar
          style={{ marginLeft: 33, marginRight: 20 }}
          height={getHeight(0.2)}
          title="현재"
        />
        <Rect3DBar
          height={getHeight(1.4)}
          color1="#48dcd2"
          color2="#09c7ba"
          color3="#70fff5"
          title="추가후"
        />
      </View>
    </View>
  );
};

const OptimizeRecomPopUp = ({ isVisible, onCancel, data }) => {
  const navigation = useNavigation();
  const [hasStock, setHasStock] = useState(false);
  const hasStockToggle = () => {
    setHasStock(!hasStock);
  };

  return (
    // <Modal isVisible={true} onCancel={onCancel}>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.85}>
          <Image source={undefined} style={styles.headerClose} />
        </TouchableOpacity>
        <Text style={styles.title}>AMZN</Text>
        <TouchableOpacity activeOpacity={0.85} onPress={onCancel}>
          <Image source={assets.icon_close} style={styles.headerClose} />
        </TouchableOpacity>
      </View>
      <Chart3DBar />
      <View style={{ marginHorizontal: 37, marginTop: 20 }}>
        <View style={styles.headerWrapper}>
          <View style={{ flex: 1 }} />
          <Text style={styles.cell}>현재</Text>
          <Text style={styles.cell}>추가후</Text>
        </View>
        <View style={styles.dataWrapper}>
          <View style={styles.tableRow}>
            <Text style={styles.cellTitle}>
              수익률<Text style={{ color: colors.purply }}>*</Text>
            </Text>
            <Text style={styles.cell}>55%</Text>
            <Text style={styles.cell}>62%</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.cellTitle}>변동성</Text>
            <Text style={styles.cell}>40%</Text>
            <Text style={styles.cell}>37%</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.cellTitle}>샤프 지수</Text>
            <Text style={styles.cell}>1.35</Text>
            <Text style={styles.cell}>1.67</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.cellTitle}>베타</Text>
            <Text style={styles.cell}>1.5</Text>
            <Text style={styles.cell}>1.3</Text>
          </View>
        </View>
        <Text style={styles.footerText}>
          *수익률은 유저의 위험선호도로 조정
        </Text>
      </View>
      {/* <View style={styles.buttonWrapper}> */}
      {!hasStock ? (
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.buttonWrapper}
          onPress={hasStockToggle}
        >
          <Image
            source={assets.icon_briefcase}
            style={{
              width: 38,
              height: 38,
            }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      ) : (
        <View style={{ height: 38 }} />
      )}
      {/* </View> */}
      {hasStock && (
        <View style={{ marginHorizontal: 37 }}>
          <Text style={styles.titleText}>보유주식</Text>
          <View style={styles.headerWrapper}>
            <View style={{ flex: 1 }} />
            <Text style={styles.cell}>현재</Text>
            <Text style={styles.cell}>추가후</Text>
          </View>
          <View style={styles.dataWrapper}>
            <View style={styles.tableRow}>
              <Text style={styles.cellTitle}>TSLA</Text>
              <Text style={styles.cell}>40</Text>
              <Text style={styles.cell}>20</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.cellTitle}>AAPL</Text>
              <Text style={styles.cell}>30</Text>
              <Text style={styles.cell}>30</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.cellTitle}>AMZN</Text>
              <Text style={styles.cell}>30</Text>
              <Text style={styles.cell}>30</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.cellTitle}>MRNA</Text>
              <Text style={styles.cell}>0</Text>
              <Text style={styles.cell}>20</Text>
            </View>
          </View>

          <View style={styles.footerTableRow}>
            <Text
              style={[
                styles.cellTitle,
                { color: colors.blackTwo, fontFamily: 'Roboto-Bold' },
              ]}
            >
              Total
            </Text>
            <Text style={[styles.cell, { fontFamily: 'Roboto-Bold' }]}>100</Text>
            <Text style={[styles.cell, { fontFamily: 'Roboto-Bold' }]}>100</Text>
          </View>
        </View>
      )}
      {hasStock && (
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.arrowButtonWrapper}
          onPress={hasStockToggle}
        >
          <Image
            source={assets.arrow_up_on}
            style={{
              width: 27,
              height: 27,
            }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      )}
    </View>
    // </Modal>
  );
};

export default OptimizeRecomPopUp;
