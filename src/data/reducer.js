import { combineReducers } from 'redux';
import { common } from '#data/common/reducer';
import { auth } from '#data/auth/reducer';
import codes from '#data/codes/reducer';
import pickWriteSlice from '#data/pickWriteStore';
import toast from '#data/toast/ToastReducer';

const AppReducer = combineReducers({
  common,
  auth,
  toast,
  ...codes,
  pickWriteStore: pickWriteSlice,
});

export default AppReducer;
