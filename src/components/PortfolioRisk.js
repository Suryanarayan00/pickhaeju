import { Text, View, StyleSheet } from 'react-native';
import colors from '#common/colors';
import React from 'react';
import RadialChart from './Chart/RadialChart';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingLeft: 22,
    paddingRight: 28,
  },
  title: { fontSize: 15, color: colors.blackTwo },
  outsideBar: {
    width: 167.5,
    height: 20,
    marginRight: 9,
  },
  insideBar: {
    width: '50%',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  riskGraph: {
    width: 300,
    height: 200,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  titleWrapper: { width: 84 },
  innerText: { color: colors.white },
  outerNum: { fontSize: 18, color: colors.blueGrey, fontFamily: 'Roboto-Bold' },
  outerText: { fontSize: 12, fontFamily: 'Roboto' },

  radialChartTextWrapper: {
    paddingHorizontal: 12,
    paddingVertical: 3,
    backgroundColor: '#ffffff90',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#00000015',
  },
  radialChartText: {
    fontSize: 20,
    color: `white`,
    fontFamily: 'Roboto-Bold'
    // fontWeight: '800',
  },
  radialChartSmallText: {
    fontSize: 10,
    // fontFamily: 'Roboto-light'
    // fontWeight: '300',
  },
  radialChartText2: {
    fontSize: 20,
    color: `rgb(${(172 + 87) / 2},${(215 + 79) / 2},${236})`,
    // fontWeight: '800',
    fontFamily: 'Roboto-Bold'
  },
});
const PortfolioRisk = ({
  count,
  beta,
  portfolioSize,
  volatility,
  sharpRatio,
  score,
  currencyCalc
}) => {
  console.log('123', count, beta, portfolioSize, volatility, sharpRatio);
  return (
    <>
      <View style={styles.riskGraph}>
        <RadialChart
          data={[
            { label: '종목 수', value: count },
            { label: '수익률', value: beta },
            { label: '포트폴리오 규모', value: portfolioSize },
            { label: '배당률', value: volatility },
            { label: '샤프지수', value: sharpRatio },
          ]}
        >
          {/* as-is */}
          {/* <Text style={styles.radialChartText}>
            25<Text style={styles.radialChartSmallText}>점</Text>
          </Text> */}
          {/* to-be */}
          <View style={styles.radialChartTextWrapper}>
            <Text style={styles.radialChartText2}>
              {score}
              <Text style={styles.radialChartSmallText}>점</Text>
            </Text>
          </View>
        </RadialChart>
      </View>
    </>
  );
};
export default PortfolioRisk;
