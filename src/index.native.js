/**
 * @format
 */
import React from 'react';
import { AppRegistry, Platform, StyleSheet, Text } from 'react-native';
import App from './App';
import { name as appName } from '../app.json';
//import messaging from '@react-native-firebase/messaging';

const textRender = Text.render;
Text.render = function (...args) {
  const origin = textRender.call(this, ...args);
  const styles = StyleSheet.flatten(origin?.props?.style);

  const extraStyles = {};

  if (!styles?.fontFamily) {
    extraStyles.fontFamily = 'Roboto-Regular';
    extraStyles.fontWeight = styles?.fontWeight || '400';

    switch (extraStyles.fontWeight) {
      case '100': // Thin (Hairline)
      case '200': // Extra Light (Ultra Light)
        extraStyles.fontFamily = 'Roboto-ExtraLight';
        break;
      case '300': // Light
        extraStyles.fontFamily = 'Roboto-Light';
        break;
      case '400': // Normal
        extraStyles.fontFamily = 'Roboto';
        break;
      case '500': // Medium
        extraStyles.fontFamily = 'Roboto-Medium';
        break;
      case '600': // Semi Bold (Demi Bold)
        extraStyles.fontFamily = 'Roboto-SemiBold';
        break;
      case '700': // Bold
        extraStyles.fontFamily = 'Roboto-Bold';
        break;
      case '800': // Extra Bold (Ultra Bold)
      case '900': // Black (Heavy)
      case 'bold':
        extraStyles.fontFamily = 'Roboto-Bold';
        break;
      default:
        extraStyles.fontFamily = 'Roboto-Regular';
        break;
    }

    if (Platform.OS === 'android') {
      extraStyles.fontWeight = 'Roboto-Regular';
    }
  }

  return React.cloneElement(origin, {
    allowFontScaling: args[0]?.allowFontScaling === true,
    style: [styles, extraStyles],
  });
};
// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   console.log('Message handled in the background!', remoteMessage);
// });

AppRegistry.registerComponent(appName, () => App);
