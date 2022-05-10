import React, { useState } from 'react';
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

const ArcChart = ({
  width = 135,
  height = 80,
  strokeWidth = 10,
  value = 100,
}) => {
  const cx = width / 2;
  const cy = height - 5;
  const rotation = (Math.max(0, Math.min(value, 100)) / 100) * 180 - 90;
  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id="Gradient" x1="0" y1="0" x2="1" y2="0">
          {[
            colors.pastelRed,
            colors.sicklyYellow,
            colors.brightLightBlue,
          ].map?.((c, i, a) => (
            <Stop offset={i / (a?.length - 1)} stopColor={c} stopOpacity="1" />
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

      <Path
        d={`M ${cx - 3}  ${height - 5} L ${cx} ${0} L ${cx + 3} ${
          height - 5
        } L ${cx - 3} ${height - 5}`}
        fill={'white'}
        rotation={rotation}
        origin={`${cx}, ${cy}`}
      />
      <Circle cx={cx} cy={cy} r={5} fill={colors.blueyGrey} />
    </Svg>
  );
};

export default ArcChart;