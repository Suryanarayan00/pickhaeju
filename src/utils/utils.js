import AsyncStorage from '@react-native-community/async-storage';

/**
 * Number utils
 */
const simplePasswordData = 'simplePasswordData';
// String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
export const zf = (value, len) => {
  const s = `${value}`;
  return s?.length > len ? s : '0'.repeat(len - s?.length) + s;
};

export const commaFormat = (value, digit = 3, comma = ',', tofixed) => {
  if (!value) return '0';
  var reg = new RegExp('(^[+-]?\\d+)(\\d{' + digit + '})');
  var s = tofixed ? `${parseNumber(value).toFixed(tofixed)}` : `${value}`;
  while (reg.test(s)) s = s.replace(reg, '$1' + comma + '$2');
  var [n, f] = s.split('.');
  if (f && f?.length > tofixed) {
    return `${n}.${f.substring(0, 2)}`;
  } else if (typeof f === 'undefined' && typeof tofixed === 'number') {
    return `${n}.${'0'.repeat(tofixed)}`;
  } else if (typeof tofixed === 'undefined' || typeof f === 'undefined') {
    return `${n}`;
  }
  return `${n}.${f}`;
};

const eachUnits = ['천', '백', '십', ''];
const splitUnits = ['', '만', '억', '조', '경'];
const correspondingKorean = '일이삼사오육칠팔구'.split();

export const parseNumber = (value, defaultValue = 0) => {
  if (typeof value == 'string')
    value = parseFloat((value || '0').replace(/,/gi, ''));
  if (isNaN(value)) return defaultValue;
  if (typeof value == 'number') return value;
  else return defaultValue;
};

export const numberToKorean = (
  _number,
  isCommaFormat = false,
  isChangeUnit = false,
  isChangeNumber = false,
) => {
  if (_number !== 0 && !_number) return null;
  if (_number === 'N/A') return _number;
  let number = parseInt(_number);
  return splitUnits
    .map?.((v, i) => {
      let eachNumber = Math.floor(
        (number % Math.pow(10000, i + 1)) / Math.pow(10000, i),
      );
      if (eachNumber <= 0) return false;

      if (isChangeUnit) {
        let calcEachNumber = Array.from(`${eachNumber}`.zf(4));
        return (
          calcEachNumber
            .map?.(
              (k, ki) =>
                k > 0 &&
                `${isChangeNumber ? correspondingKorean[k - 1] : k}${
                  eachUnits[ki]
                }`,
            )
            .filter((e) => e)
            .join('') + splitUnits[i]
        );
      }
      return (
        (isCommaFormat ? commaFormat(eachNumber) : eachNumber) + splitUnits[i]
      ); // 역순
    })
    .filter((e) => e)
    .reverse()
    .join(' ');
};

export const avoidNaN = (v, format, asDefault = 0) => {
  return isNaN(v) ? asDefault : typeof format === 'function' ? format(v) : v;
};

export const setSimplePassword = async (password) => {
  const simpleData = await AsyncStorage.getItem(simplePasswordData);
  const simplePwData = simpleData
    ? JSON.parse(simpleData)
    : { isSecurity: false, isBio: false, password: '', periodTime: '' };
  simplePwData.isSecurity = true;
  simplePwData.password = password;
  await AsyncStorage.setItem(simplePasswordData, JSON.stringify(simplePwData));
  return simplePwData;
};

export const setIsSecurity = async (isSecurity) => {
  const simpleData = await AsyncStorage.getItem(simplePasswordData);
  const simplePwData = simpleData
    ? JSON.parse(simpleData)
    : { isSecurity: false, isBio: false, password: '', periodTime: '' };
  simplePwData.isSecurity = isSecurity;
  await AsyncStorage.setItem(simplePasswordData, JSON.stringify(simplePwData));
  return simplePwData;
};

export const setIsBio = async (isBio) => {
  const simpleData = await AsyncStorage.getItem(simplePasswordData);
  const simplePwData = simpleData
    ? JSON.parse(simpleData)
    : { isSecurity: false, isBio: false, password: '', periodTime: '' };
  simplePwData.isBio = isBio;
  await AsyncStorage.setItem(simplePasswordData, JSON.stringify(simplePwData));
  return simplePwData;
};

export const setPeriodTime = async (periodTime) => {
  const simpleData = await AsyncStorage.getItem(simplePasswordData);
  const simplePwData = simpleData
    ? JSON.parse(simpleData)
    : { isSecurity: false, isBio: false, password: '', periodTime: '' };
  simplePwData.periodTime = periodTime;
  await AsyncStorage.setItem(simplePasswordData, JSON.stringify(simplePwData));
  return simplePwData;
};

export const getSimplePwData = async () => {
  const simpleData = await AsyncStorage.getItem(simplePasswordData);
  const simplePwData = simpleData
    ? JSON.parse(simpleData)
    : { isSecurity: false, isBio: false, password: '', periodTime: '' };
  return simplePwData;
};


export const setDecimal = (value,tofixed) => {
  var amounttext = null;
      if (/^\d*(\.\d{0,2})?$/.test(value) || value === "") 
      {
        return value;
      }
      else
      {
        let repl=value;
        var str2 = repl.slice(0, -1);
        return str2;
      }
    }

    export const isPositiveInteger=(val) => {

      if(/^\+?[1-9][\d]*$/.test(val) || val===""){
        return val;
      }
      else
      {
        let repl=val;
        var str2 = repl.slice(0, -1);
        return str2; 
      }
  }