/**
 * @format
 */
import 'intl';
import 'intl/locale-data/jsonp/ko';
import 'moment/locale/ko';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from '../app.json';
import { decode, encode } from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

global.__DEV__ = process.env.NODE_ENV === 'development';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('root'),
});
