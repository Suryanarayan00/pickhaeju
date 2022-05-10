/**
 * @providesModule
 */

import AsyncStorage from '@react-native-community/async-storage';
import { currencyRate } from '../../common/dataApi';
import * as ActionTypes from './actionTypes';

export const CURRENCY_KRW = 'KRW';
export const CURRENCY_USD = 'USD';

export const KEY_CURRENCY_SETTING = 'key.currency.setting';

export const getCurrency = () => {
  return async (dispatch) => {
    try {
      const currency = await currencyRate();
      console.log(currency);
      const currentCurrency =
        (await AsyncStorage.getItem(KEY_CURRENCY_SETTING)) || CURRENCY_KRW;
      dispatch({
        type: ActionTypes.CHANGE_CURRENCY,
        data: { currency, currentCurrency },
      });
    } catch (e) {
      console.warn(e);
    }
  };
};

export const changeCurrency = (currentCurrency) => {
  return async (dispatch) => {
    const currency = await currencyRate();
    await AsyncStorage.setItem(KEY_CURRENCY_SETTING, currentCurrency);

    dispatch({
      type: ActionTypes.CHANGE_CURRENCY,
      data: { currency, currentCurrency },
    });
  };
};

export const setViewPopUp = (isView) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.SET_VIEW,
      data: isView,
    });
  };
};