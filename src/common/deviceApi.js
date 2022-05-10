import { restApi, setToken } from '#common/api';

const API = {
    subscribe: '/api/v3/device/subscribe',
    unsubscribe: '/api/v3/device/unsubscribe',
    listdevice: '/api/v3/device/list'
};

export const subscribeDevice = async (_id,tickers) => {
  const data = await restApi.post(API.subscribe, {_id:_id,topics:tickers });
  console.log('API.subscribe:response', data);
  return data.data;
};
export const unsubscribeDevice = async (_id,tickers) => {
  try {
    console.log('unsubscribe Api');
    console.log(_id,tickers);
    const data = await restApi.post(API.unsubscribe, {_id:_id,topics:tickers });
    console.log('API.unsubscribe:response', data);
    return data.data;
  } catch (e) {
    console.log('API.unsubscribe:error', e?.response);
    return null;
  }
};

export const getDeviceList = async (userId) => {
  try {
    const data = await restApi.get(API.listdevice+'?limit=12&page=1&sort=-createdAt&userId='+userId);
    console.log('API.unsubscribe:response', data);
    return data.data;
  } catch (e) {
    console.log('API.unsubscribe:error', e?.response);
    return null;
  }
};