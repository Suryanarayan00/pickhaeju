import React from 'react';
import Svg, {
  Circle,
  Defs,
  Path,
  LinearGradient,
  Stop,
  Text,
} from 'react-native-svg';
import { View, StyleSheet } from 'react-native';
import colors from '#common/colors';

const styles = StyleSheet.create({
  childContainer: {
    zIndex: 1,
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const pointsToPath = (points) => {
  const [[x, y], ...etc] = points;
  return `M ${x}, ${y} ${etc
    .map?.(([x, y]) => `L ${x}, ${y}`)
    .join(' ')} L ${x}, ${y}`;
};

const RadialChart = ({
  width = 320,
  height = 260,
  radius = 80,
  data = [
    { label: '종목 편중성', value: 80 },
    { label: '수익률', value: 20 },
    { label: '포트폴리오 규모     ', value: 80 },
    { label: '배당률', value: 70 },
    { label: '샤프지수', value: 55 },
  ],
  min = 0,
  max = 100,
  children,
  childContainerStyle,
}) => {
  const points = data?.length;
  const cx = width / 2;
  const cy = height / 2;
  const r = radius;
  const valueMax = Math.max(
    max,
    data?.reduce?.(
      (p, { value }) => Math.max(p, value),
      Number.MIN_SAFE_INTEGER,
    ),
  );
  const valueMin = Math.min(
    min,
    data?.reduce?.(
      (p, { value }) => Math.min(p, value),
      Number.MAX_SAFE_INTEGER,
    ),
  );
  const valueRange = valueMax - valueMin;
  const valueRatio = data.map?.(({ value }) => (value - valueMin) / valueRange);
  console.log({ valueRange, valueMin, valueMax, valueRatio });

  const dots = Array(points)
    .fill(0)
    .map?.((_, i) => [
      Math.cos(((Math.PI * 2) / points) * i - Math.PI / 2),
      Math.sin(((Math.PI * 2) / points) * i - Math.PI / 2),
    ]);

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height} style={{}}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="rgb(172,79,236)" stopOpacity="1" />
            <Stop offset="1" stopColor="rgb(87,215,230)" stopOpacity="1" />
          </LinearGradient>
        </Defs>

        <Path
          d={pointsToPath(dots.map?.(([x, y]) => [x * r + cx, y * r + cy]))}
          stroke={colors.blueGrey}
          strokeWidth={1}
        />

        {/* concentric */}
        {Array(3)
          .fill(0)
          .map?.((_, i) => (
            <Path
              key={`concentric_${i}`}
              d={pointsToPath(
                dots.map?.(([x, y]) => [
                  x * r * (i * 0.25 + 0.2) + cx,
                  y * r * (i * 0.25 + 0.2) + cy,
                ]),
              )}
              stroke={colors.blueGrey}
              strokeOpacity={0.1 * i + 0.1}
              strokeWidth={1}
            />
          ))}

        {dots.map?.(([x, y], i) => (
          <Circle
            key={`circle_${i}`}
            cx={x * (r - 1) + cx}
            cy={y * (r - 1) + cy}
            r={5}
            fill={'white'}
            strokeWidth={1}
            stroke={colors.blueGrey}
          />
        ))}
        <Path
          d={pointsToPath(
            dots.map?.(([x, y], i) => [
              x * r * valueRatio[i] + cx,
              y * r * valueRatio[i] + cy,
            ]),
          )}
          fill="url(#grad)"
        />
        {/* label */}
        {dots.map?.(([x, y], i, a) => {
          const deg = (360 / a?.length) * i;
          let anchor = 'middle';
          if (deg >= 30 && deg <= 120) {
            anchor = 'start';
          } else if (deg >= 240 && deg <= 330) {
            anchor = 'end';
          }
          return (
            <Text
              key={`label_${i}`}
              x={x * (r + 20) + cx}
              y={y * (r + 20) + cy + 8}
              fill={colors.blueGrey}
              fontSize={13}
              alignmentBaseline={'central'}
              textAnchor={anchor}
            >
              {data[i].label}
            </Text>
          );
        })}
      </Svg>
      {children && (
        <View
          style={[
            styles.childContainer,
            childContainerStyle,
            { width, height },
          ]}
        >
          {children}
        </View>
      )}
    </View>
  );
};

export default RadialChart;
