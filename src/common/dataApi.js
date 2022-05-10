import { restApi, getAPIHost } from '#common/api';
import moment from 'moment';

const API = {
  fearAndGreed: '/data/fearandgreed',
  companySearch: '/data/company/search',
  searchtickers: '/data/v2/searchtickers',
  //searchtickers: '/data/searchtickers',
  companyGeneral: '/data/company/general',
  // currencyRate: '​/data​/currencyrate', // error
  currencyRate: '/data/currencyrate',
  // price: '/data/price',
  price: '/data/prices',
  history: '/data/company/data_point/historical',

  macd: '/data/company/macd',
  sr: '/data/company/sr',
  rsi: '/data/company/rsi',

  sectorAverage: '/data/company/sector-average',
  movingAverage: '/data/company/moving-average',
};

export const fearAndGreed = async () => {
  try {
    const res = await restApi.get(API.fearAndGreed);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const companySearch = async () => {
  try {
    const {
      data: { result },
    } = await restApi.post(API.companySearch);
    return result;
  } catch (error) {
    return error.response;
  }
};

export const searchtickers = async (keyword) => {
  try {
    const {
      data: { result },
    } = await restApi.post(API.searchtickers, {
      keyword,
    });
    return result;
  } catch (error) {
    return error.response;
  }
};

export const companyGeneral = async (ticker) => {
  if (!ticker) return Promise.reject();
  try {
    const {
      data: { result },
    } = await restApi.post(API.companyGeneral, {
      ticker: (ticker || '')?.toUpperCase(),
    });
    console.log('Result Data');
    console.log(result);
    return result;
  } catch (error) {
    return {};
    return error.response;
  }
};

export const companyGenerals = async (stocks) => {
  if (!stocks || !Array.isArray(stocks) || stocks?.length == 0)
    return Promise.reject();
  try {
    return Promise.all(stocks?.map?.((stock) => companyGeneral(stock)));
  } catch (error) {
    return error.response;
  }
};

export const currencyRate = async () => {
  try {
    const {
      data: { currency },
    } = await restApi.get(API.currencyRate);
    console.log('currency', currency);
    return currency;
  } catch (error) {
    console.log('currency error', error);
    return error.response;
  }
};

export const DurationHistory1Month = {
  label: '1M',
  frequency: 'daily',
  page_size: 30,
  dateFormat: 'Y년 M월 D일',
  calcStartDate: (d) => d - 86400 * 1000 * 30,
};
export const DurationHistory3Months = {
  label: '3M',
  frequency: 'daily',
  page_size: 90,
  dateFormat: 'Y년 M월 D일',
  calcStartDate: (d) => d - 86400 * 1000 * 3 * 30,
};
export const DurationHistory6Months = {
  label: '6M',
  frequency: 'daily',
  page_size: 6 * 30,
  dateFormat: 'Y년 M월 D일',
  calcStartDate: (d) => d - 86400 * 1000 * 6 * 30,
};
export const DurationHistory1Year = {
  label: '1Y',
  frequency: 'daily',
  page_size: 365,
  dateFormat: 'Y년 M월 D일',
  calcStartDate: (d) => d - 86400 * 1000 * 365,
};
export const DurationHistory5Years = {
  label: '5Y',
  frequency: 'monthly',
  page_size: 5 * 12,
  dateFormat: 'Y년 M월 D일',
  calcStartDate: (d) => d - 86400 * 1000 * 365 * 5,
};

export const priceHistoryDurations = [
  DurationHistory1Month,
  DurationHistory3Months,
  DurationHistory6Months,
  DurationHistory1Year,
  DurationHistory5Years,
];

export const priceHistory = async ({ ticker, duration }) => {
  try {
    const { frequency, page_size, calcStartDate } = duration;

    const d = Date.now();
    const start_date = moment(calcStartDate(d)).format('YYYY-MM-DD');
    const end_date = moment(d).format('YYYY-MM-DD');
    const params = {
      ticker,
      start_date,
      end_date,
      frequency,
      page_size,
      next_page: '',
    };
    console.log(`${start_date} to ${end_date}`, params);

    const {
      data: {
        result: { stock_prices },
      },
    } = await restApi.post(API.price, params);
    // // const priceHistory = (stock_prices || [])?.reduce?.((r, {date, close})=>());
    // console.log(
    //   stock_prices,
    //   stock_prices.map?.(({ date, close }) => `${date}-${close}`).join('\n'),
    // );
    return stock_prices;
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

const historyTag = async ({ ticker, tag }) => {
  try {
    const {
      data: {
        result: { historical_data },
      },
    } = await restApi.post(API.history, {
      ticker,
      tag,
      frequency: 'yearly',
    });
    return { [tag]: historical_data };
  } catch (e) {
    return e.response;
  }
};

const macd = async (ticker) => {
  try {
    const {
      data: {
        result: { technicals },
      },
    } = await restApi.post(API.macd, {
      ticker,
    });
    return { macd: technicals };
  } catch (e) {
    return e.response;
  }
};

const sr = async (ticker) => {
  try {
    const {
      data: {
        result: { technicals },
      },
    } = await restApi.post(API.sr, {
      ticker,
    });
    return { sr: technicals };
  } catch (e) {
    return e.response;
  }
};
const sectorAverage = async (ticker) => {
  try {
    const {
      data: {
        result: { average },
      },
    } = await restApi.post(API.sectorAverage, {
      ticker,
    });
    return { sectorAverage: average };
  } catch (e) {
    return e.response;
  }
};
const rsi = async (ticker) => {
  try {
    const {
      data: { result },
    } = await restApi.post(API.rsi, {
      ticker,
    });
    return { rsi: result };
  } catch (e) {
    return e.response;
  }
};
const movingAverage = async (ticker) => {
  try {
    const {
      data: { result },
    } = await restApi.post(API.movingAverage, {
      ticker,
    });
    return { movingAverage: result };
  } catch (e) {
    return e.response;
  }
};

export const companyHistory = async (ticker) => {
  try {
    const data = await Promise.all([
      ...[
        'operatingmargin',
        'totalrevenue',
        'roe',
        'roa',
        'debttoequity',
        'debttototalcapital',
      ].map?.((tag) => {
        return historyTag({ ticker, tag });
      }),
      macd(ticker),
      sr(ticker),
      sectorAverage(ticker),
      rsi(ticker),
      movingAverage(ticker),
    ]);
    const r = data?.reduce?.((p, c) => ({ ...p, ...c }), {});
    console.log(JSON.stringify(r, undefined, 2));
    return r;
  } catch (e) {
    console.log(e);
    return e.response;
  }
};
