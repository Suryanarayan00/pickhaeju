const NamedColors = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkgrey: '#a9a9a9',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  grey: '#808080',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgreen: '#90ee90',
  lightgrey: '#d3d3d3',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32',
};

const _toHex = (c) => {
  let hex = Math.floor(Math.max(0, Math.min(c, 0xff))).toString(16);
  return c < 16 ? `0${hex}` : hex;
};
export const rgbToHex = ({ r, g, b } = {}) =>
  `#${_toHex(r)}${_toHex(g)}${_toHex(b)}`;
export const rgbaToHex = ({ r, g, b, a } = {}) =>
  `#${_toHex(r)}${_toHex(g)}${_toHex(b)}${_toHex(a)}`;
export const hexToRgb = (color) => {
  let colorHex = NamedColors[color] || color;
  let result = null;
  if (colorHex?.length === 4)
    result = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(colorHex);
  else if (colorHex?.length === 7)
    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorHex);
  else if (colorHex?.length === 9)
    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
      colorHex,
    );
  let [_, r, g, b, a] = result || [0, 0, 0, 0];
  return {
    r: parseInt(r, 16),
    g: parseInt(g, 16),
    b: parseInt(b, 16),
    a: parseInt(a, 16),
  };
};

export const colorDevide = (color, v) => {
  const c = hexToRgb(color);
  return {
    r: c.r / v,
    g: c.g / v,
    b: c.b / v,
  };
};
export const colorDevideColor = (color, ref) => {
  const c = hexToRgb(color);
  const r = hexToRgb(ref);
  return {
    r: c.r / r.r,
    g: c.g / r.g,
    b: c.b / r.b,
  };
};

export const colorMutiply = (color, v) => {
  const { r, g, b } = hexToRgb(color);
  return rgbToHex({
    r: r * v,
    g: g * v,
    b: b * v,
  });
};

export const colorMutiplyColor = (color, { r, g, b }) => {
  const c = hexToRgb(color);
  return rgbToHex({
    r: c.r * r,
    g: c.g * g,
    b: c.b * b,
  });
};

export const colorInterpolate = (value, values, colors) => {
  if (
    !Array.isArray(values) ||
    !Array.isArray(colors) ||
    values?.length != colors?.length
  ) {
    return console.warn(
      'colorInterpolate params are abnormal. values and colors are must same length array',
    );
  }

  const index = values.findIndex((v) => value <= v);
  if (index === 0) return colors[0];
  if (index < 0) return colors[colors?.length - 1];

  const hex1 = hexToRgb(colors[index - 1]);
  const hex2 = hexToRgb(colors[index]);

  const v1 = values[index - 1];
  const v2 = values[index];

  const p = (value - v1) / (v2 - v1);

  return rgbToHex({
    r: hex1.r * (1 - p) + hex2.r * p,
    g: hex1.g * (1 - p) + hex2.g * p,
    b: hex1.b * (1 - p) + hex2.b * p,
  });
};
