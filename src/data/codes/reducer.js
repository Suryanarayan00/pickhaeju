/**
 * @flow
 */

import produce from 'immer';
import * as ActionTypes from './actionTypes';

const initialState = {
  colors: [],
};

export const colors = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_COLORS:
      return produce(state, (draft) => {
        draft.colors = action.data;
      });
    default:
      return state;
  }
};

export const gas = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_GAS:
      return produce(state, (draft) => {
        draft.gas = action.data;
      });
    default:
      return state;
  }
};

export default { colors, gas };
