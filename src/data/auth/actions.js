/**
 * @providesModule ActionAuth
 */
import { restApi } from '../../common/api';
import { watchlistdata } from '../../common/usersApi'
import * as ActionTypes from './actionTypes';

export const me = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return restApi
        .get('/api/v3/user/info/me')
        .then((response) => {
          console.log(
            `\n\n${`=`.repeat(60)}\n${' '.repeat(25)}getMe\n${`=`.repeat(
              60,
            )}\n\n`,
            JSON.stringify(response.data, undefined, 2),
          );
          dispatch({
            type: ActionTypes.SET_PRINCIPAL,
            data: response.data,
          });
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  };
};

export const SelectWatchList = (selectedData) => {
  return (dispatch) => dispatch({ type: ActionTypes.SELECT_WATCHLIST,data:selectedData});
};

//WatchList Data
export const WatchListAction = (userID) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return watchlistdata(userID)
        .then((response) => {
          dispatch({
            type: ActionTypes.WATCHLIST,
            data: response,
          });
          resolve(response);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  };
 // return (dispatch) => dispatch({ type:ActionTypes.WATCHLIST,data:watchList});
};

export const clear = () => {
  return (dispatch) => dispatch({ type: ActionTypes.CLEAR_PRINCIPAL });
};


export const targetIndex = (indexInfo) => {
  return (dispatch) => dispatch({ type: ActionTypes.TARGET_INDEX,data:indexInfo});
};



export const logOut = (isLogout) => {
  return (dispatch) => dispatch({ type: ActionTypes.IS_LOGOUT,data:isLogout});
};

export const checkNotifyTickers = (tickersArray) => {
   return (dispatch) => dispatch({ type: ActionTypes.TICKERSDATA,data:tickersArray});
};

export const checkUserNotified = (isVisited) => {
  return (dispatch) => dispatch({ type: ActionTypes.ISNOTIFIED,data:isVisited});
};

