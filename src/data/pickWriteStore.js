import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { Alert } from 'react-native';

//초기 스테이트 정의
const initialState = {
  normalPick: false,
  exclusivePick: false,
  pickTypeChecks: [false, false, false, false],
  mainStock: undefined,
  subStock: [],
  htmlContentTitle: undefined,
  htmlContent: '',
  editorText: undefined,
  isGeneralPledge: false,
  positionPledgeIndex: undefined,
  relationPledgeIndex: undefined,
  bulletPoints:[]
};

// const [normalPick, setNormalPick] = useState(false);
// const [exclusivePick, setExclusivePick] = useState(false);
// const [pickTypeChecks, setPickTypeChecks] = useState(
//   new Array(4).fill(false),
// );
const pickWriteSlice = createSlice({
  name: 'pickWriteStore',
  initialState,
  reducers: {
    setNormalPick(state, { payload: normalPick }) {
      return { ...state, normalPick };
    },

    setExclusivePick(state, { payload: exclusivePick }) {
      return { ...state, exclusivePick };
    },

    setPickTypeChecks(state, { payload: index }) {
      const tempChecklist = [...state.pickTypeChecks];
      tempChecklist.fill(false);
      tempChecklist[index] = true;
      return { ...state, pickTypeChecks: tempChecklist };
    },

    setMainStock(state, { payload: mainStock }) {
        return { ...state, mainStock };
    },

    setSubStock(state, { payload: subStock }) {
      return { ...state, subStock: [subStock] };
    },
    addSubStock(state, { payload: subStock }) {
      if (state.subStock?.length > 2) {
        console.log('state.subStock', state.subStock);
        Alert.alert('안내', '부 종목은 최대 3개까지 등록 가능합니다');
        return { ...state };
      }
      return { ...state, subStock: state.subStock?.concat?.(subStock) };
    },
    removeSubStock(state, { payload: subStock }) {
      const findIndex = state.subStock.findIndex((data) => subStock === data);
      if (findIndex === -1) {
        return { ...state };
      } else {
        return {
          ...state,
          subStock: [
            ...state.subStock.slice(0, findIndex),
            ...state.subStock.slice(findIndex + 1),
          ],
        };
      }
    },
    setHtmlContentTitle(state, { payload: htmlContentTitle }) {
      return { ...state, htmlContentTitle };
    },
    setHtmlContent(state, { payload: htmlContent }) {
      return { ...state, htmlContent };
    },

    setBullet(state, { payload: bulletPoints }) {
        return { ...state, bulletPoints: bulletPoints };
    },
    
    

    pickWriteStoreclear(state) {
      return {
        normalPick: false,
        exclusivePick: false,
        pickTypeChecks: [false, false, false, false],
        mainStock: undefined,
        subStock: [],
        htmlContentTitle: undefined,
        htmlContent: '',
        editorText: undefined,
        isGeneralPledge: false,
        positionPledgeIndex: undefined,
        relationPledgeIndex: undefined,
        bulletPoints:[]
      };
    },
    setEditorText(state, { payload: editorText }) {
      return { ...state, editorText };
    },
    setRelationPledgeIndex(state, { payload: relationPledgeIndex }) {
      return { ...state, relationPledgeIndex };
    },
    setPositionPledgeIndex(state, { payload: positionPledgeIndex }) {
      return { ...state, positionPledgeIndex };
    },
    setIsGeneralPledge(state, { payload: isGeneralPledge }) {
      return { ...state, isGeneralPledge };
    },
  },
});

export const {
  setNormalPick,
  setExclusivePick,
  setPickTypeChecks,
  setMainStock,
  setSubStock,
  addSubStock,
  removeSubStock,
  setHtmlContent,
  setHtmlContentTitle,
  pickWriteStoreclear,
  setEditorText,
  setRelationPledgeIndex,
  setPositionPledgeIndex,
  setIsGeneralPledge,
  setBullet
} = pickWriteSlice.actions;
export default pickWriteSlice?.reducer;
