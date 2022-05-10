export const toastActionTypes = {
  show: 'toast/show',
  hide: 'toast/hide',
};

export const toastHide = () => (dispatch) => {
  dispatch({ type: toastActionTypes.hide });
};
export const toastShow = (message, timeout) => (dispatch) => {
  dispatch({
    type: toastActionTypes.show,
    message,
    timeout,
  });
};
