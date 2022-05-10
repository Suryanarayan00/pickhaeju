/**
 * @flow
 */

import produce from 'immer';
import * as ActionTypes from './actionTypes';

const initialState = {
  principal: null,
  selectedWatchlist:[],
  redwatchlist :[],
  targetIndexVal :0,
  isLogOut :false,
  subscribedTickers:[],
  isVisited:false 
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT':
      return action.data?.auth || state;
    case ActionTypes.SET_PRINCIPAL:
      return produce(state, (draft) => {
        draft.principal = action.data;
      });
    case ActionTypes.CLEAR_PRINCIPAL:
      return produce(state, (draft) => {
        draft.principal = null;
      });

      case ActionTypes.SELECT_WATCHLIST:
      return produce(state, (draft) => {
        draft.selectedWatchlist = action.data;
      });

    case ActionTypes.WATCHLIST:
      return produce(state, (draft) => {
        draft.redwatchlist = action.data;
      });

      case ActionTypes.TARGET_INDEX:
        return produce(state, (draft) => {
          draft.targetIndexVal = action.data;
        });
        
        case ActionTypes.IS_LOGOUT:
        return produce(state, (draft) => {
            draft.isLogOut = action.data;
          });
        
      case ActionTypes.TICKERSDATA:
        return produce(state, (draft) => {
            draft.subscribedTickers = action.data;
          });

          case ActionTypes.ISNOTIFIED:
            return produce(state, (draft) => {
                draft.isVisited = action.data;
              });
          
          

    default:
      return state;
  }
};
