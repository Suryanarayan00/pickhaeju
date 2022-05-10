import { restApi, getAPIHost } from '#common/api';
import moment from 'moment';
import { companyGenerals } from './dataApi';
import AsyncStorage from '@react-native-community/async-storage';

// const API = {
//   add: '/users/portfolio/add',
//   get: '/users/portfolio/get',
//   update: '/users/portfolio/update',
//   delete: '/users/portfolio/remove',
//   getDividend: '/data/company/v2/dividend'
// };

//portfolio
const API = {
  add: "/api/v3/portfolio/", // POST
  get: "/api/v3/portfolio/list", // GET, portfolio has it's own _id, so it should be stored OR you can use /api/v3/portfolio/list (GET) for all list
  update: "/api/v3/portfolio/", // PATCH, should change the logic because it can replace the whole
  delete: "/api/v3/portfolio/", // DELETE
  getDividend: "/data/company/v2/dividend",
  portfolioReplace: "/api/v3/portfolio/", // PATCH, should change the logic because it can replace the whole
  getSectors:'/api/v3/sector/list',
  currentStockPrice:'/data/company/v2/current-price-multiple'
};

export const getPortfolio = async (userId) => {
  try {
    const {
      data: { docs: portfolioList },
    } = await restApi.get(API.get+'?limit=12&page=1&sort=-createdAt&userId='+userId);
    let itemData= portfolioList[0]; 
    await AsyncStorage.setItem('portID', itemData?._id || "");
    const generals = await companyGenerals(
      portfolioList[0]?.items?.map?.(({ ticker }) => ticker),
    );
  
    return itemData?.items?.map?.((p) => ({
      ...p,
      general: generals.find((g) => g?.ticker === p?.ticker),
      user:itemData?.user,
      userId:itemData?.userId,
      portId:itemData?._id,
    }));

  } catch (e) {
    console.log('getPortfolio err', e);
    return e?.response;
  }
};

export const addPortfolio = async ({ ticker, price, amount }) => {
  try {
    console.log('addPortfolio', { ticker, price, amount });
  
    const { data } = await restApi.post(API.add, {
      "items": [
        {
          ticker,
          price,
          amount
        }
      ]
    });
   return data;
  } catch (e) {
    console.warn(e.response);
    return e.response;
  }
};

export const updatePortfolio = async (updateData,portId) => {
  try {

    const { data } = await restApi.patch(API.update+portId, {
      "payload": {
        "items":updateData
      }
    });
    console.log('update Portfolio');
    console.log(data);
    return data;
  } catch (e) {
    console.warn('updatePortfolio', e.response);
    return e.response;
  }
};

//Update Existing Portfolio 
export const updateExistingPortfolio = async (updateArray,_id) => {
  try {
      console.log('updateArray');
      console.log(updateArray);
  } catch (e) {
    console.warn('updateExistingPortfolio', e.response);
    return e.response;
  }
};


export const removePortfolio = async ({ ticker }) => {
  try {
    const { data } = await restApi.get(API.portfolioMe);
    const docs = data?.docs;
    // if none, create one.
    let portfolio = undefined;
    if (docs.length < 1) {
      const { data } = await restApi.post(API.portfolio);
      portfolio = data;
    } else {
      portfolio = docs[0];
    }

    if (portfolio.items.map((el) => el.ticker).includes(ticker)) {
      // there is already same ticker. replacing it.
      const idx = portfolio.items.findIndex((el) => el.ticker == ticker);
      portfolio.items.splice(idx, 1);
      const res = await restApi.patch(API.portfolio + portfolio._id, {
        payload: {
          items: portfolio.items,
        },
      });
      return res.data;
    } else {
      return portfolio;
    }
  } catch (e) {
    console.warn('removePortfolio', e.response);
    return e.response;
  }
};

export const getDividend = async (ticker) => {
  try {
    let yearBfDate = moment().subtract(1, 'years').format('YYYY-MM-DD');
    const {data} = await restApi.post(API.getDividend, {
      'ticker':ticker,
      'start_date':yearBfDate,
    });
      return data?.result || [];
  } catch (e) {
    console.warn(e);
    return e.response;
  }
};

//getSectors
export const getSectorList = async () => {
  try {
     const {data} = await restApi.get(API.getSectors+'?limit=100&page=1&sort=-createdAt');
      return data?.docs || [];
  } catch (e) {
    console.warn(e);
    return e.response;
  }
};

//Get Stock Current price..
//data/company/v2/current-price-multiple

export const currentStockPrice = async (ticker) => {
  try {
    const {data} = await restApi.post(API.currentStockPrice, {
      'tickers':ticker,
    });
      return data?.result || [];
  } catch (e) {
    console.warn(e);
    return e.response;
  }
};