import { toastActionTypes } from '#data/toast/ToastAction';


const initToast = {
  open: false,
  message: '',
};

export default function toast(state = initToast, action) {
  switch (action.type) {
    case toastActionTypes.show:
      return {
        ...state,
        ...action,
        open: true,
      };

    case toastActionTypes.hide:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
}
