import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Text } from 'react-native-svg';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  contentCntainer: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const d2r = (d) => (d * Math.PI) / 180 - Math.PI / 2;

const PieChart = ({
  style,
  width = 164,
  data = [],
  children,
  strokeWidth = 36,
  distance = 0.5,
}) => {
  const c = width / 2;
  const r = (width - strokeWidth - distance * 2) / 2;

  const sum = data?.reduce?.((p, { value }) => p + value, 0);
  
  const accumulated = data?.reduce?.(
    (p, item) => [
      ...p,
      {
        ...item,
        acc: p?.reduce?.((acc, { value }) => acc + value, 0),
      },
    ],
    [],
  );

  const renderArc = (sd, ed) => {
    const sr = d2r(sd);
    const er = d2r(ed);
    const mr = (er - sr) / 2 + sr;
    const cdx = c + Math.cos(mr) * distance;
    const cdy = c + Math.sin(mr) * distance;
    return `M 
      ${Math.cos(sr) * r + cdx} 
      ${Math.sin(sr) * r + cdy}
      A
      ${r} ${r} 
      0 ${er - sr > Math.PI ? 1 : 0} 1
      ${Math.cos(er) * r + cdx}
      ${Math.sin(er) * r + cdy}
    `;
  };

console.log('accumulated');
console.log(accumulated);

  return (
    <View style={[styles.container, style, { width }]}>
      <Svg width={width} height={width}>
        {accumulated.map?.(({ label, value, color, acc, cap }, i) => {
          const sd = (acc / sum) * 360;
          const ed = sd + (value / sum) * 360;
          const middle = d2r(sd + (ed - sd) / 2);
          return [
            <Path
              key={`pie_${i}`}
              d={renderArc(sd, ed, distance)}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap={cap}
            />,
            label && (
              <Text
                key={`label_${i}`}
                x={Math.cos(middle) * r + c}
                y={Math.sin(middle) * r + c}
                fill={'white'}
                fontSize={14}
                textAnchor={'middle'}
              >
                {`${Math.round((value / sum) * 10 * 10).toFixed(2)}%`}
              </Text>
            ),
          ];
        })}
      </Svg>
      {children && <View style={[styles.contentCntainer]}>{children}</View>}
    </View>
  );
};

export default PieChart;
