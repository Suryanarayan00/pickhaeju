import { restApi, setToken } from '#common/api';

const API = {
  standard: '/recommendation/standard',
  recommend: '/recommendation/recommend',
};

export const getRecommendStandard = async (points) => {
  const data = await restApi.post(API.standard, { points });
  console.log('API.getRecommendStandard:response', data);
  return data.data;
};
export const getRecommend = async () => {
  try {
    const data = await restApi.post(API.recommend);
    console.log('API.getRecommend:response', data);
    return data.data;
  } catch (e) {
    console.log('API.getRecommend:error', e?.response);
    return null;
  }
};
