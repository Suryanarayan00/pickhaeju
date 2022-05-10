/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import AppContainer from '#nav/AppContainer';
import AppReducer from '#data/reducer';
import AsyncStorage from '@react-native-community/async-storage';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { setCustomTextInput, setCustomText } from 'react-native-global-props';
import RichTextEditor from 'react-rte';

const fontFamilyProps = {
  style: {
    fontFamily: 'Roboto-Regular',
  },
  allowFontScaling: false,
};
setCustomText(fontFamilyProps);
setCustomTextInput(fontFamilyProps);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['commom', 'auth', 'colors', 'gas'], // persist 하지 않을 것
};

const persistedReducer = persistReducer(persistConfig, AppReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
// const store = createStore(AppReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

const App = () => {
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());

  const onChange = (value) => {
    setValue(value);
  };

  return (
    // <Document>
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
    // </Document>
  );
};

export default App;
