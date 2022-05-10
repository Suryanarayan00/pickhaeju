/**
 * @providesModule ActionAuth
 */

import * as ActionTypes from './actionTypes';

const colorsData = [
  {
    colorCode: 'COR001',
    label: '흰색',
    hex: '#ffffff',
  },
  {
    colorCode: 'COR002',
    label: '검정',
    hex: '#000000',
  },
  {
    colorCode: 'COR003',
    label: '은색',
    hex: '#e4e4e4',
  },
  {
    colorCode: 'COR004',
    label: '진주색',
    hex: '#f1e2e2',
  },
  {
    colorCode: 'COR005',
    label: '청색',
    hex: '#556fe1',
  },
];

const gasData = [
  {
    gasCode: 'GAS001',
    label: '휘발유(가솔린)',
  },
  {
    gasCode: 'GAS002',
    label: '경유(디젤)',
  },
  {
    gasCode: 'GAS003',
    label: '하이브리드',
  },
  {
    gasCode: 'GAS004',
    label: 'LPG',
  },
  {
    gasCode: 'GAS005',
    label: '전기',
  },
  {
    gasCode: 'GAS006',
    label: '수소',
  },
  {
    gasCode: 'GAS007',
    label: '가솔린+LPG(겸용)',
  },
  {
    gasCode: 'GAS008',
    label: '가솔린+CNG(겸용)',
  },
  {
    gasCode: 'GAS009',
    label: 'CNG',
  },
];

export const colors = () => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        await dispatch({ type: ActionTypes.SET_COLORS, data: colorsData });
        resolve(colorsData);
      } catch (error) {
        reject();
      }
    });
  };
};

export const gas = () => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        await dispatch({ type: ActionTypes.SET_GAS, data: gasData });
        resolve(colorsData);
      } catch (error) {
        reject();
      }
    });
  };
};
