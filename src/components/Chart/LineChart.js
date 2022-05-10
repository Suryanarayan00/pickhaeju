import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Path, Defs, Stop, LinearGradient } from 'react-native-svg';
import colors from '#common/colors';
import DropShadow from '#modules/DropShadow';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  focusLine: {
    position: 'absolute',
    top: 0,
    bottom: -35,
    width: 1,
    backgroundColor: colors.purpleBlue,
    opacity: 0.35,
  },
  focusCircle: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
  },
  focusCircleInner: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});

const pointsToPath = (points) => {
  if (!Array.isArray(points) || points?.length == 0) return '';
  const [[x, y], ...etc] = points;
  return `M ${x}, ${y} ${etc.map?.(([x, y]) => `L ${x}, ${y}`).join(' ')}`;
};

const LineChartCore = ({
  width,
  height,
  data,
  x = -1,
  min,
  max,
  focusBarHidden,
  color = colors.purpleBlue,
  renderFocusdElement,
  gradient = [
    {
      color: 'rgb(172,79,236)',
      opacity: 0.1,
    },
    {
      color: 'rgb(172,79,236)',
      opacity: 0.1,
    },
    {
      color: 'rgb(255,255,255)',
      opacity: 0,
    },
  ],
}) => {
  if (!width || !height) return null;

  const index = Math.round((x / width) * (data?.length - 1));
  const focusX = (index / (data?.length - 1)) * width;

  console.log(x, index, focusX, data[index]);

  const valueHeight = data.map?.((v, i) => [
    (i * width) / (data?.length - 1),
    height - ((v - min) / (max - min)) * (height - 2),
  ]);

  return (
    <View style={{ position: 'absolute', width, height, paddingTop: 25 }}>
      <Svg width={width} height={height}>
        <Defs>
          {Array.isArray(gradient) && gradient?.length > 1 && (
            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              {gradient.map?.(({ color, opacity }, i, a) => (
                <Stop
                  key={i}
                  offset={i / (a?.length - 1)}
                  stopColor={color}
                  stopOpacity={opacity}
                />
              ))}
            </LinearGradient>
          )}
        </Defs>

        <Path d={pointsToPath(valueHeight)} stroke={color} strokeWidth={2} />

        <Path
          d={pointsToPath([[0, height], ...valueHeight, [width, height]])}
          fill={'url(#grad)'}
        />
      </Svg>
      {/* cursor Bar */}
      {!focusBarHidden && x > -1 && !!valueHeight[index][1] && (
        <View
          style={[
            styles.focusLine,
            {
              left: focusX - 0.5,
            },
          ]}
        />
      )}
      {x > -1 && typeof renderFocusdElement === 'function' && (
        <View
          style={{
            position: 'absolute',
            top: -15,
            left: index < data?.length / 2 ? focusX + 6 : null,
            right: index >= data?.length / 2 ? width - focusX + 6 : null,
          }}
        >
          <Text
            style={{
              color: colors.blueGrey,
              fontSize: 13,
              textAlign: index < data?.length / 2 ? 'left' : 'right',
            }}
          >
            {renderFocusdElement(index)}
          </Text>
        </View>
      )}

      {x > -1 && !!valueHeight[index][1] && (
        <DropShadow
          style={[
            styles.focusCircle,
            {
              left: focusX - 6,
              top: valueHeight[index][1] - 6 + 25,
              shadowColor: color,
            },
          ]}
        >
          {/* borderColor를 white, backgroundColor를 purple로 했을때, 외부가 깔끔하지 않아 아래와 같이 wrapping함 */}
          <View
            style={[
              styles.focusCircleInner,
              {
                backgroundColor: color,
              },
            ]}
          />
        </DropShadow>
      )}
    </View>
  );
};

const LineChart = ({
  style,
  height = 200,
  charts: _charts,
  data,
  onDragStart,
  onDragFocus,
  onDragEnd,
  focusBarHidden,
  renderFocusdElement,
}) => {
  const charts = Array.isArray(_charts) ? _charts : [{ data }];
  const [width, setWidth] = useState(width);
  const [x, setX] = useState(-1);

  const onFocus = ({ nativeEvent: { pageX, pageY: y } }) => {
    if (Math.round(x) != Math.round(pageX)) setX(pageX);
    return pageX;
  };

  const minMaxPerGroup = charts?.reduce?.((p, { data, group }) => {
    const g = group || 'defaultGroup';
    const min = data?.reduce?.(
      (p, v) => Math.min(p, v),
      Number.MAX_SAFE_INTEGER,
    );
    const max = data?.reduce?.(
      (p, v) => Math.max(p, v),
      Number.MIN_SAFE_INTEGER,
    );
    const r = {
      ...p,
      [g]: {
        min: p?.[g]?.min !== undefined ? Math.min(p[g].min, min) : min,
        max: p?.[g]?.max !== undefined ? Math.max(p[g].max, max) : max,
      },
    };
    return r;
  }, {});

  const renderChart = ({ data, gradient, color, group }, index) => {
    const { min, max } = minMaxPerGroup[group || 'defaultGroup'];

    return (
      <LineChartCore
        key={`chart_${index}`}
        {...{
          index,
          min,
          max,
          data,
          gradient,
          color,
          width,
          height: 166,
          focusBarHidden,
          renderFocusdElement,
          x,
        }}
      />
    );
  };

  return (
    <View
      style={[style, { width: windowWidth , height, marginLeft: 'auto'}]}
      onLayout={({
        nativeEvent: {
          layout: { width },
        },
      }) => setWidth(width)}
      {...{
        onStartShouldSetResponder: () => true,
        onResponderGrant: (...args) => {
          onFocus(...args);
          onDragStart &&
            typeof onDragStart === 'function' &&
            onDragStart(...args);
        },
        onResponderMove: (...args) => {
          onFocus(...args);
          onDragFocus &&
            typeof onDragFocus === 'function' &&
            onDragFocus(...args);
        },
        onResponderRelease: (...args) => {
          onFocus(...args);
          onDragEnd && typeof onDragEnd === 'function' && onDragEnd(...args);
        },
      }}
    >
      {!!width && charts.map?.((chart, index) => renderChart(chart, index))}
    </View>
  );
};

export default LineChart;
