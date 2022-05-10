import { restApi, getAPIHost } from "#common/api";
import WatchList from "../pages/watchlist";
import { companyGenerals } from "./dataApi";

const API = {
   pickTalkList: "/api/v3/pick_talk/list",
   addPickTalk :"/api/v3/pick_talk",
   addComment: "/api/v3/pick_talk/comment",
   pickTalkLike: "/api/v3/pick_talk/like",
   pickTalkCommentLike: "/api/v3/pick_talk/comment/like",
};

/**
 *
 * PickTalk List Api
 * Get list of PickTalk documents. if isDeleted is true, it will not be queried.
 */
export const pickTalklistdata = async (sort,limit,ticker="",commentsLimit=50) => {
  try {
    const {
      data: { docs },
    } = await restApi.get(API.pickTalkList, {
      params: {
        limit: limit,
        page: 1,
        sort: sort,
        ticker:ticker,
        commentsLimit:commentsLimit,
      },
    });
    console.log("API.pick_talk:response", API.pickTalkList, {
      params: {
        limit: limit,
        page: 1,
        sort: sort,
        ticker:ticker,
        commentsLimit:commentsLimit,
      },
    });
    return docs;
  } catch (e) {
    console.warn(e);
    return e?.message;
  }
};

export const addPickTalk = async ({ tickers,content ,opinion }) => {
  try {
    console.log('addPickTalk', {tickers,content ,opinion });
  
    const { data } = await restApi.post(API.addPickTalk, {
      tickers,
      content,
      opinion
    });
    console.log('Data value');
    console.log(data);
   return data;
  } catch (e) {
    console.warn(e);
    return e.response;
  }
};

export const addPickTalkComment = async ({ pickTalk,content ,opinion }) => {
  try {
    console.log('addPickTalk', {pickTalk,content ,opinion });
  
    const { data } = await restApi.post(API.addComment, {
      pickTalk,
      content,
      opinion
    });
    console.log('Data value');
    console.log(data);
   return data;
  } catch (e) {
    console.warn(e);
    return e.response;
  }
};


export const addPickTalkLike = async ({ pickTalk }) => {
  try {
    console.log('addPickTalk Like', {pickTalk});
  
    const { data } = await restApi.post(API.pickTalkLike, {
      pickTalk
    });
    console.log('Data like');
    console.log(data);
   return data;
  } catch (e) {
    console.warn(e);
    return e.response;
  }
};


export const removePickTalkLike = async ({ pickTalk }) => {
  try {
    const res = await restApi.delete(API.pickTalkLike +'/'+pickTalk);
    console.log('removePicktalkLike', res);
    return res;
  } catch (error) {
    console.log('removePicktalkLike', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const addPickTalkCommentLike = async ({ pickTalkComment }) => {
  try {
    console.log('addPickTalk Like', {pickTalkComment});
  
    const { data } = await restApi.post(API.pickTalkCommentLike, {
      pickTalkComment
    });
    console.log('Data like');
    console.log(data);
   return data;
  } catch (e) {
    console.warn(e);
    return e.response;
  }
};


export const removePickTalkCommentLike = async ({ pickTalkComment }) => {
  try {
    const res = await restApi.delete(API.pickTalkCommentLike +'/'+pickTalkComment);
    console.log('removePicktalkLike', res);
    return res;
  } catch (error) {
    console.log('removePicktalkLike', error.response);
    return error.response;
    // throw error as ApiError
  }
};