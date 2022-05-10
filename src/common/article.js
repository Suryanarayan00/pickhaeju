import { restApi, setToken } from '#common/api';

// const API = {
//   getArticle: '/data/article/single',
//   getArticles: '/data/article/getarticles',
//   addlike: '/data/article/addlike',
//   removelike: '/data/article/removelike',
//   addComment: '/data/article/addcomment',
//   removeComment: '/data/article/removecomment',
//   addSubComment: '/data/article/addsubcomment',
//   removeSubComment: '/data/article/removesubcomment',
//   addScrap: '/data/article/addscrap',
//   removeScrap: '/data/article/removeScrap',
//   tickersArticles: '/data/article/multiplerelatedarticles',
//   multipleArticle: '/data/article/multiple',
//   myComments: '/data/article/mycomments',
//   likecomment: '/data/article/likecomment',
//   unlikecomment: '/data/article/unlikecomment',
//   likeSubComment: '/data/article/likesubcomment',
//   unlikeSubComment: '/data/article/unlikesubcomment',
//   articleUpdatedUrl  : '/data/article/v2/',
//   realtedTicker    :'/related-tickers'
// };
const API = {
  getArticle: '/api/v3/article/',
  getArticles: '/api/v3/article/list',
  addlike: '/api/v3/article/like',
  removelike: '/api/v3/article/like/',
  addComment: '/api/v3/article/comment',
  removeComment: '/api/v3/article/comment/',
  // addSubComment: '/data/article/addsubcomment',
  // removeSubComment: '/data/article/removesubcomment',
  addScrap: '/api/v3/article/scrap/',
  removeScrap: '/api/v3/article/scrap/',
  getMyScrap: '/api/v3/article/scrap/info/me',
  // tickersArticles: '/data/article/multiplerelatedarticles',
  // multipleArticle: '/api/v3/article/list',
  myComments: '/api/v3/article/comment/info/me',
  likecomment: '/api/v3/article/commentlike/',
  unlikecomment: '/api/v3/article/commentlike/',
  // likeSubComment: '/data/article/likesubcomment',
  // unlikeSubComment: '/data/article/unlikesubcomment',
  // articleUpdatedUrl: '/data/article/v2/',
  realtedTicker: '/api/v3/article/related-tickers/',
  //
  getArticleComments: '/api/v3/article/comment/list',
  getArticleScraps: '/api/v3/article/scrap/list',
  getArticleLikes: '/api/v3/article/like/list',

  getMyArticleLikes: 'api/v3/article/like/info/me',
  postArticleView:'api/v3/article/view',
};

export const getMyArticleLikes = async () => {
  try {
    const data = await restApi.get(API.getMyArticleLikes + `?limit=5000`);
    return data.data.docs;
  } catch (e) {
    console.log(e?.response);
    return e?.response;
  }
};

export const getArticleComments = async (articleId,userID) => {
  try {
    const data = await restApi.get(
      API.getArticleComments +
        `?article=${articleId}&limit=5000&combineSubcomments=true&showUserLiked=${userID}`,
    );
    console.log('Article Comments');
    console.log(data?.data);
    return data?.data || [];
  } catch (e) {
    console.log(e?.response);
    return e?.response;
  }
};

export const getArticleScraps = async (articleId) => {
  try {
    const data = await restApi.get(
      API.getArticleScraps + `?article=${articleId}&limit=5000`,
    );
    return data.data.docs;
  } catch (e) {
    console.log(e?.response);
    return e?.response;
  }
};

export const getArticleLikes = async (articleId) => {
  try {
    const data = await restApi.get(
      API.getArticleLikes + `?article=${articleId}&limit=5000`,
    );
    return data?.data?.docs;
  } catch (e) {
    console.log(e?.response);
    return e?.response;
  }
};

export const getArticle = async (articleId) => {
  const data = await restApi.get(API.getArticle + articleId);
  console.log('API.getArticle:response', data);
  return data.data;
};

export const getArticles = async (page, tickers, count = 3) => {
  console.log('API.Url', API.getArticles +
  `?limit=${count}&page=${page}&tickers=${tickers.join(',')}&sort=-publication_date`);
  if (Array.isArray(tickers)) {
    const {
      data: { docs },
    } = await restApi.get(
      API.getArticles +
        `?limit=${count}&page=${page}&tickers=${tickers.join(',')}&sort=-publication_date`,
    );
    console.log('API.tickersArticles:response', docs);
    return docs;
  }
  const { docs } = await restApi.get(
    API.getArticles + `?limit=${count}&page=${page}&sort=-publication_date`,
  );
  console.log('API.tickersArticles:response', docs);
  return docs;
};

export const addlikeArticle = async (articleId) => {
  try {
    const res = await restApi.post(API.addlike, {
      article: articleId,
    });
    console.log('addlikeArticle', res);
    return res;
  } catch (error) {
    console.log('addlikeArticle', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const removelikeArticle = async (articleId) => {
  try {
    const res = await restApi.delete(API.removelike + articleId);
    console.log('removelikeArticle', res);
    return res;
  } catch (error) {
    console.log('removelikeArticle', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const addCommentArticle = async (articleId, content) => {
  try {
    const res = await restApi.post(API.addComment, {
      article: articleId,
      parent: null,
      content,
    });
    console.log('addCommentArticle', res);
    return res;
  } catch (error) {
    console.log('addCommentArticle', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const addSubCommentArticle = async (articleId, parentId, content) => {
  try {
    console.log({
      article: articleId,
      parent: parentId,
      content,
    });
    const res = await restApi.post(API.addComment, {
      article: articleId,
      parent: parentId,
      content,
    });

    console.log('addSubCommentArticle', {
      article: articleId,
      parent: parentId,
      content,
    });
    return res;
  } catch (error) {
    console.log('addSubCommentArticle err', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const removeCommentArticle = async (articleId, commentId) => {
  try {
    const res = await restApi.delete(API.removeComment + commentId);
    console.log('removeCommentArticle', res);
    return res;
  } catch (error) {
    console.log('removeCommentArticle err', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const removeSubCommentArticle = async (articleId, commentId) => {
  try {
    const res = await restApi.delete(API.removeComment + commentId);
    console.log('removeSubCommentArticle', res);
    return res;
  } catch (error) {
    console.log('removeSubCommentArticle err', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const addScrapArticle = async (articleId) => {
  try {
    const res = await restApi.post(API.addScrap, {
      article: articleId,
    });
    console.log('addScrapArticle', res);
    return res;
  } catch (error) {
    console.log('addScrapArticle', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const removeScrapArticle = async (articleId) => {
  try {
    const res = await restApi.delete(API.removeScrap + articleId);
    console.log('removeScrapArticle', res);
    return res;
  } catch (error) {
    console.log('removeScrapArticle', error.response);
    return error.response;
    // throw error as ApiError
  }
};

// export const getMultipleArticle = async (articleIds) => {
//   try {
//     const res = await restApi.get(API.multipleArticle + `?`);
//     return res;
//   } catch (error) {
//     return error.response;
//     // throw error as ApiError
//   }
// };

export const getMyArticleScraps = async () => {
  try {
    const res = await restApi.get(API.getMyScrap + `?limit=5000`);
    console.log('res.data.docs');
    console.log(res.data.docs);
    return res.data.docs;
  } catch (e) {
    return e.response;
  }
};

export const getArticleMyComments = async () => {
  try {
    const res = await restApi.get(API.myComments + `?limit=5000`);
    console.log('getArticleMyComments', res);
    return res.data.docs;
  } catch (error) {
    console.log('getArticleMyComments', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const newsLikeComment = async (articleId, commentId) => {
  try {
    const res = await restApi.post(API.likecomment, {
      articleComment: commentId,
    });
    
    console.log('likeComment', res);
    return res.data;
  } catch (error) {
    console.log('likeComment', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const newsUnlikeComment = async (articleId, commentId) => {
  try {
    const res = await restApi.delete(API.unlikecomment + commentId);
    console.log('unlikeComment', res);
    return res.data;
  } catch (error) {
    console.log('unlikeComment', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const newsLikeSubComment = async (articleId, commentId) => {
  try {
    const res = await restApi.post(API.likecomment, {
      articleComment: commentId,
    });
    console.log('newsLikeSubComment', res);
    return res.data;
  } catch (error) {
    console.log('newsLikeSubComment', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const newsUnlikeSubComment = async (articleId, commentId) => {
  try {
    const res = await restApi.delete(API.unlikecomment + commentId);
    console.log('newsUnlikeSubComment', res);
    return res.data;
  } catch (error) {
    console.log('newsUnlikeSubComment', error.response);
    return error.response;
    // throw error as ApiError
  }
};
//Get Related Company Ticker
export const getRelatedCompany = async (Id) => {
  try {
    // const res = await restApi.get(API.articleUpdatedUrl+Id+API.realtedTicker);
    const res = await restApi.get(API.realtedTicker + Id);
    return res;
  } catch (error) {
    console.log('related Company', error.response);
    return error.response;
    // throw error as ApiError
  }
};

//Add Article View
export const addArticleView = async (articleId) => {
  try {
    const res = await restApi.post(API.postArticleView, {
      article: articleId,
    });
    console.log('addArticleView', res);
    return res;
  } catch (error) {
    console.log('addArticleView', error.response);
    return error.response;
  }
};