import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text as RNText, TouchableOpacity, Image } from 'react-native';
import assets from '../../../assets';
import help from '../../common/help';
import HelpPopup from '../HelpPopup';
import Svg, {
  Path,
  Defs,
  Rect,
  Stop,
  Circle,
  Text,
  TSpan,
} from 'react-native-svg';
import colors from '#common/colors';

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    width: '100%',
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendBullet: {
    alignSelf: 'center',
    width: 15,
    height: 1.5,
    marginLeft: 20,
    marginRight: 10,
  },
  legendLabel: {
    fontSize: 13,
    color: colors.blueGrey,
  },
  
  questionIcon: {
    width: 16,
    height: 16,
    marginLeft: 5,
  },
});

const BarHeightMax = 60;
const XAxisHeight = 40;

const pointsToPath = (points) => {
  const [[x, y], ...etc] = points;
  return `M ${x}, ${isNaN(y) ? 0 : y} ${etc
    .map?.(([x, y]) => `L ${x}, ${isNaN(y) ? 0 : y}`)
    .join(' ')}`;
};

export const Bar = 'bar';
export const Line = 'Line';
export const Average = 'Average';

const BarLineChart = ({
  tag,
  xAxis = ['2018', '2019', '2020'],
  charts = [],
  containerHeight = 190,
  chartMargin = 20,
  chartPadding = 50,

}) => {
  const [{ width, height }, setLayout] = useState({});
  const [showHelp, setShowHelp] = useState(false);
  const [isModal, setIsModal] = React.useState(false);

  const space = chartPadding + chartMargin;
  const cx = (i) => (i * (width - space * 2)) / (xAxis?.length - 1) + space;
  const defenceValue = (v) => (v === null || isNaN(v + 1) ? 0 : v);

  const renderBarChart = ({
    data,
    color,
    format,
    barWidth = 24,
    min,
    max,
    minRatio = 1,
  }) => {
    console.log('renderBarChart', data, min, max);
    const heightRatio = (v) => (v - min) / (max - min || 1);
    return data.map?.((v, i) => {
      const h = BarHeightMax * heightRatio(v);
      const valueLabel = typeof format === 'function' ? format(v) : v;
      return [
        <Rect
          key={`bar_${i}`}
          x={cx(i) - barWidth / 2}
          y={height - h - XAxisHeight}
          width={barWidth}
          height={h}
          fill={color}
        />,
        // min < 0 && (
        //   <Text
        //     key={`value_${i}`}
        //     x={20}
        //     y={height - BarHeightMax * heightRatio(0) - XAxisHeight}
        //     textAnchor={'end'}
        //     fontSize="12"
        //     fill={color}
        //   >
        //     {0}
        //   </Text>
        // ),
        // min < 0 && (
        //   <Path
        //     key={`path-zero`}
        //     d={pointsToPath([
        //       [25, height - BarHeightMax * heightRatio(0) - XAxisHeight],
        //       [
        //         width - 25,
        //         height - BarHeightMax * heightRatio(0) - XAxisHeight,
        //       ],
        //     ])}
        //     stroke={color}
        //     strokeOpacity={0.2}
        //     strokeWidth={0.5}
        //   />
        // ),
        !!valueLabel && (
          <Text
            key={`value_${i}`}
            x={cx(i)}
            y={height - h - XAxisHeight - 10}
            textAnchor={'middle'}
            fontSize="12"
            fill={color}
          >
            {valueLabel}
          </Text>
        ),
      ].filter((e) => e);
    });
  };

  const renderLineChart = ({ data, color, format, min, max, minRatio = 1 }) => {
    console.log('renderLineChart', data, min, max);
    const heightRatio = (v) => (v - min) / (max - min || 1);
   let maxVal =  Math.max(...data);
  if(maxVal > 0)
    return (
       <>
        <Path
          key={`path`}
          d={pointsToPath(
            data.map?.((v, i) => [
              cx(i),
              height - 80 * heightRatio(v) - XAxisHeight - 20,
            ]),
          )}
          stroke={color}
          strokeWidth={1}
        />
        {/* {min < 0 && (
          <Path
            key={`path-zero`}
            d={pointsToPath([
              [25, height - 80 * heightRatio(0) - XAxisHeight - 20],
              [width - 25, height - 80 * heightRatio(0) - XAxisHeight - 20],
            ])}
            stroke={color}
            strokeOpacity={0.5}
            strokeWidth={0.5}
          />
        )} */}
        {data.map?.((v, i) => [
          <Circle
            key={`circle_${i}`}
            cx={cx(i)}
            cy={height - 80 * heightRatio(v) - XAxisHeight - 20}
            r="4"
            fill={color}
          />,
          <Text
            key={`value_${i}`}
            x={cx(i)}
            y={height - 80 * heightRatio(v) - XAxisHeight - 20 - 10}
            textAnchor={'middle'}
            fill={color}
          >
            {typeof format === 'function' ? format(v) : v}
          </Text>,
        ])}
      </> 
    );
  };

  const renderAverageChart = ({ data, color, min, max, minRatio = 1 }) => {
    console.log('renderAverageChart', data, min, max);
    const heightRatio = (v) => (v - min) / (max - min || 1);

    return (
      <Path
        d={data
          .map?.((v, i) => {
            const y = height - BarHeightMax * heightRatio(v) - XAxisHeight - 10;
            console.log('avg', v, i);
            return ` M ${cx(i) - 15} ${y} L ${cx(i) + 15} ${y}`;
          })
          .join(' ')}
        stroke={color}
        strokeWidth={1.5}
      />
    );
  };

  const minMaxPerGroup = charts?.reduce?.(
    (p, { data, type, group, min: _min, max: _max }) => {
      const g = group || type;
      const min = data?.reduce?.(
        (p, v) => Math.min(p, defenceValue(v)),
        typeof _min == 'number' ? _min : Number.MAX_SAFE_INTEGER,
      );
      const max = data?.reduce?.(
        (p, v) => Math.max(p, defenceValue(v)),
        typeof _max == 'number' ? _max : Number.MIN_SAFE_INTEGER,
      );
      const r = {
        ...p,
        [g]: {
          min: p?.[g]?.min !== undefined ? Math.min(p[g].min, min) : min,
          max: p?.[g]?.max !== undefined ? Math.max(p[g].max, max) : max,
        },
      };
      return r;
    },
    {},
  );

  // console.log(tag, JSON.stringify(minMaxPerGroup, undefined, 2));
console.log('Chart Data');
console.log(charts);
  return (
    <View style={[styles.container, { height: containerHeight }]}>
       <View style={styles.legend}>
        {charts.map?.(({ color, label , data}, i) => {
          console.log('Chart data');
          console.log(label);
           return (
            label && [
              <View
                key={`bullet_${i}`}
                style={[styles.legendBullet, { backgroundColor: color }]}
              />,
              <RNText key={`label_${i}`} style={styles.legendLabel}>
                {label}
              </RNText>,
              label =='ROE'? 
              <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => {
                setShowHelp(help['ROE']);
              }}
              style={{ zIndex: 1 }}
            >
              <Image source={assets.icon_question} style={styles.questionIcon} />
            </TouchableOpacity>:null,
            ,
              label =='ROA'?<TouchableOpacity
              activeOpacity={0.85}
              onPress={() => {
                setShowHelp(help['ROA']);
              }}
              style={{ zIndex: 1 }}
            >
              <Image
                source={assets.icon_question}
                style={styles.questionIcon}
              />
            </TouchableOpacity>:null
            ]
          );
        })}
      </View>
      <View
        style={{ width: '100%', flex: 1 }}
        onLayout={({ nativeEvent: { layout } }) => setLayout({ ...layout })}
      >
        {!!width && !!height && (
          <Svg width={width} height={height}>
            {charts.map?.((chart, index) => {
              const { group, type, data: _data } = chart;
              const { min, max } = minMaxPerGroup[group || type];
              const data = (_data || []).map?.((d) => defenceValue(d));
              if (type == Bar)
                return renderBarChart({
                  ...chart,
                  max,
                  min,
                  index,
                  data,
                });
              if (type === Line)
                return renderLineChart({
                  ...chart,
                  max,
                  min,
                  index,
                  data,
                });
              if (type === Average)
                return renderAverageChart({
                  ...chart,
                  max,
                  min,
                  index,
                  data,
                });
            })}

            {/* xaxis */}
            <Path
              d={`M ${chartMargin} ${height - XAxisHeight} L ${
                width - chartMargin
              } ${height - XAxisHeight}`}
              stroke={colors.cloudyBlue}
              strokeWidth={1}
            />

            {xAxis.map?.((x, i) => {
              return (
                <Text
                  key={`xaxis_${i}`}
                  x={cx(i)}
                  y={height - (XAxisHeight - 23)}
                  textAnchor={'middle'}
                  fontSize={12}
                  fill={colors.blueGrey}
                >
                  {`${x}`.split('\n').map?.((xe, y) => {
                    return (
                      <TSpan key={y} x={cx(i)} dy={y * 12}>
                        {xe}
                      </TSpan>
                    );
                  })}
                </Text>
              );
            })}
          </Svg>
        )}
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

export default BarLineChart;
