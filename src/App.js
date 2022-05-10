/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import AppContainer from '#nav/AppContainer';
import AppReducer from '#data/reducer';
import AsyncStorage from '@react-native-community/async-storage';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer,  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import codePush from 'react-native-code-push';
import { Platform } from 'react-native';

import { setCustomTextInput, setCustomText } from 'react-native-global-props';

import * as Sentry from '@sentry/react-native';

import SplashScreen from 'react-native-splash-screen'

if (!__DEV__) {
  codePush
    .getUpdateMetadata()
    .then((update) => {
      if (update) {
        Sentry.init({
          dsn:
            'https://eda89f2ab4f6479b9660e126b475f88f@o560687.ingest.sentry.io/5696452',
          release: `${update.appVersion}+codepush:${update.label}`,
        });
      }
    })
    .then(() => {
      // Sentry.nativeCrash();
    });
}

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
  blacklist: ['commom', 'colors', 'gas'], // persist 하지 않을 것
};

const persistedReducer = persistReducer(persistConfig, AppReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: [...getDefaultMiddleware(), thunk],
// });


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// const store = createStore(AppReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

const App = () => {
  useEffect(() => {
    setTimeout(() => SplashScreen.hide() , 2000);
        const _codePushSync = async () => {
      if (__DEV__) return;

      const deploymentKey = Platform.select({
        ios: 'ou6aAVyLxOl4f04l__HStezo5j6fKEiJUjSyt',
        android: 'EotnG8zXSKOola8iKNTlmvv-GwJ3NKEpRmkde',
      });
      const remote = await codePush.checkForUpdate(deploymentKey);
      const status = await codePush.notifyAppReady();

      if (!remote) return;

      console.info('[Code Push] - notifyAppReady', status);
      console.info('[Code Push] - remote', remote);

      await codePush.sync({
        deploymentKey,
        installMode: codePush.InstallMode.IMMEDIATE,
        checkFrequency: codePush.CheckFrequency.MANUAL,
        mandatoryInstallMode: codePush.InstallMode.ON_NEXT_RESTART,
        updateDialog: false,
      });
      await codePush.notifyAppReady();
      codePush.restartApp();
    };
    _codePushSync();
  }, []);
  return (
    <>
      {/* <StatusBar barStyle="dark-content" backgroundColor="red" /> */}
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppContainer />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </>
  );
};

export default App;
