/**
 * @flow
 */

import produce from 'immer';
import * as ActionTypes from './actionTypes';

const initialState = {
  firstRun: null,
  currency: {},
  isView:false,

};

export const common = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_CURRENCY:
      return produce(state, (draft) => {
        draft.currency = action.data;
      });
      case ActionTypes.SET_VIEW:
        return {
          ...state,
          isView:action.data
      };
    default:
      return state;
  }
};
