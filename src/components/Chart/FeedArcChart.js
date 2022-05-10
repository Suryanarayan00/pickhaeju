import React, { useState, useEffect, useRef } from 'react';
import Svg, {
  Defs,
  LinearGradient,
  Path,
  Stop,
  Mask,
  Rect,
  Text,
  Use,
  Circle,
} from 'react-native-svg';
import colors from '#common/colors';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Easing,
  Image,
  View,
} from 'react-native';
const AnimatedPath = Animated.createAnimatedComponent(Path);
const { width: fullWidth } = Dimensions.get('window');

const D2R = (d) => (d * Math.PI) / 180 - Math.PI / 2;
const renderArc = (sd, ed, r, cx, cy, distance) => {
  const sr = D2R(sd);
  const er = D2R(ed);
  const mr = (er - sr) / 2 + sr;
  const _cx = cx + Math.cos(mr) * distance;
  const _cy = cy + Math.sin(mr) * distance;
  return `M 
    ${Math.cos(sr) * r + _cx} 
    ${Math.sin(sr) * r + _cy}
    A
    ${r} ${r} 
    0 ${er - sr > Math.PI ? 1 : 0} 1
    ${Math.cos(er) * r + _cx}
    ${Math.sin(er) * r + _cy}
  `;
};
const style = StyleSheet.create({
  imageWrapper: {
    position: 'absolute',
    top: -35,
    left: '38%',
    zIndex: 10,
  },

  imageWrapperStyle: {},
  image: { backgroundColor: 'red' },
});
const FeedArcChart = ({
  width = 135,
  height = 80,
  strokeWidth = 10,
  value = 100,
}) => {
  const cx = width / 2;
  const cy = height - 5;
  const dy = `M ${cx - 3}  ${height - 5} L ${cx} ${0} L ${cx + 3} ${
    height - 5
  } L ${cx - 3} ${height - 5}`;
  console.log(dy);

  const rotation = (Math.max(0, Math.min(value, 100)) / 100) * 180 - 90;
  const anim = useRef(new Animated.Value(0)).current;

  const size = width - 20;
  const defaultValue = 50;
  const minValue = 0;
  const maxValue = 100;
  const easeDuration = 500;
  const allowedDecimals = 0;

  function limitValue(value, minValue, maxValue, allowedDecimals) {
    let currentValue = 0;
    if (!isNaN(value)) {
      if (!isNaN(allowedDecimals) && allowedDecimals > 0) {
        currentValue = parseFloat(value).toFixed(
          allowedDecimals < 4 ? parseInt(allowedDecimals) : 4,
        );
      } else {
        currentValue = parseInt(value);
      }
    }
    return Math.min(Math.max(currentValue, minValue), maxValue);
  }
  React.useEffect(() => {
    Animated.timing(anim, {
      toValue: limitValue(value, minValue, maxValue, allowedDecimals),
      duration: easeDuration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);

  const rotate = anim.interpolate({
    inputRange: [minValue, maxValue],
    outputRange: ['-90deg', '90deg'],
  });

  function validateSize(current, original) {
    let currentSize = original;
    if (!isNaN(current)) {
      currentSize = parseInt(current);
    }
    return currentSize;
  }
  const currentSize = validateSize(size, fullWidth - 20);
  return (
    <View
      style={{
        overflow: 'hidden',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <Svg width={width} height={height} stroke={colors.slate} d="M5 20 l215 0">
        <Defs>
          <LinearGradient id="Gradient" x1="0" y1="0" x2="1" y2="0">
            {[
              colors.darkishPink,
              colors.fadedOrangeTwo,
              colors.sicklyYellow,
              colors.tealishtwo,
            ].map?.((c, i, a) => (
              <Stop
                offset={i / (a?.length - 1)}
                stopColor={c}
                stopOpacity="1"
              />
            ))}
          </LinearGradient>
        </Defs>
        <Path
          d={[
            [-90, -46],
            [-44, -1],
            [1, 44],
            [46, 90],
          ]
            .map?.(([sd, ed]) =>
              renderArc(sd, ed, (width - strokeWidth) / 2, cx, cy, 0),
            )
            .join()}
          stroke={'url(#Gradient)'}
          strokeWidth={10}
        />
        {/* <Animated.View
        style={{transform: [{ rotate }]}}
      > 
         <Svg  width={width} height={height}  > 
       <Path
        d={`M ${cx - 2}  ${height - 5} L ${cx} ${0} L ${cx + 3} ${
          height - 5
        } L ${cx - 3} ${height - 5}`}
        fill={colors.slate}
        origin={`${cx}, ${cy}`}
       /> 
    </Svg> 
    </Animated.View>  */}
        <Animated.View
          style={[
            style.imageWrapper,
            {
              transform: [{ rotate }],
            },
          ]}
        >
          <Image
            style={[
              {
                width: 30,
                height: 220,
              },
            ]}
            source={require('../../../assets/niddle_updated.png')}
          />
        </Animated.View>

        <Circle cx={cx} cy={cy} r={5} fill={colors.blueyGrey} />
      </Svg>

      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', zIndex:-1 }}>
        <View
          style={{
            height: 155,
            width: 155,
            borderStyle: 'solid',
            borderWidth: 28,
            borderRadius: 105,
            borderColor: '#eee',
          }}
        ></View>
      </View>
    </View>
  );
};

export default FeedArcChart;
