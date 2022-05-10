import axios from 'axios';

export const getAPIHost = () => {
  return 'https://pickhaeju-server.appspot.com';
  // return true
  //   ? 'https://pickhaeju-server.appspot.com'
  //   : 'https://pickhaeju-server.appspot.com';
};

export const restApi = axios.create({
  baseURL: getAPIHost(),
});

export const authApi = axios.create({
  baseURL: getAPIHost(),
  auth: {
    username: '',
    password: '',
  },
});

export const setToken = (access_token, social) => {
  // const { token: access_token } = cookies;
  if (access_token) {
    restApi.defaults.headers.common.authorization = `${access_token}`;
    restApi.defaults.headers.common.authorization = `${access_token}`;
    // restApi.defaults.headers.common.social = social;
  } else {
    delete restApi.defaults.headers.common.authorization;
  }
};

export const getToken = () => {
  // const { token: access_token } = cookies;
  return restApi.defaults.headers.common.authorization;
};

export default {
  getAPIHost,
  restApi,
  authApi,
  getToken,
  setToken,
};
