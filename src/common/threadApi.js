import { restApi, getAPIHost } from '#common/api';

const API = {
  publish: '/api/v3/thread/',
  getMyThreads: '/api/v3/thread/info/me',
  getMyScrapThreads: '/api/v3/thread/scrap/info/me',
  getSingleThread: '/api/v3/thread/',
  addlike: '/api/v3/thread/like/',
  removelike: '/api/v3/thread/like/',
  scrap: '/api/v3/thread/scrap/',
  removeScrap: '/api/v3/thread/scrap/',
  addComment: '/api/v3/thread/comment/',
  // addsubComment: '/users/thread/addsubcomment',
  removeComment: '/api/v3/thread/comment/',
  // removesubcomment: '/users/thread/removesubcomment',
  multipleThread: '/api/v3/thread/list',
  tickersThreads: '/api/v3/thread/list',
  myComments: '/api/v3/thread/comment/info/me',
  editorImageUpload: '/uploads/image/thread',
  likecomment: '/api/v3/thread/commentlike/',
  unlikecomment: '/api/v3/thread/commentlike/',
  // likeSubComment: '/users/thread/likesubcomment',
  // unlikeSubComment: '/users/thread/unlikesubcomment',
  getCarousel: '/data/carousel',
  editThread: '/api/v3/thread/',
  deleteThread: '/api/v3/thread/',
  //

  getThreadComments: '/api/v3/thread/comment/list',
  getThreadScraps: '/api/v3/thread/scrap/list',
  getThreadLikes: '/api/v3/thread/like/list',
};

/**
 * pick등록
 * @param {*} body 
 * {
  "type": "shared",
  "opinion": "buy",
  "title": "제목",
  "primaryTicker": "AAPL",
  "tickers": [],
  "content": "<p>내용</p>",
  "messageForEditor": "string"
}
 * 
 */
export const pickRegist = async (body) => {
  try {
    const res = await restApi.post(API.publish, {
      ...body,
    });
    console.log('pickRegist', res);
    return res;
  } catch (error) {
    console.log('pickRegist err', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const getTickersThread = async (tickers = [], count, page) => {
  try {
    const {
      data: { docs },
    } = await restApi.get(
      API.tickersThreads +
        `?limit=${count}&page=${page}&tickers=${tickers.join(',')}`,
    );
    console.log('getTickersThread', docs);
    return docs;
  } catch (error) {
    console.log('getMyThreads err', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const getMyThreads = async () => {
  try {
    const res = await restApi.get(API.getMyThreads + `?limit=5000`);
    console.log('getMyThreads', res);
    return res;
  } catch (error) {
    console.log('getMyThreads err', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const getMyScrapThreads = async () => {
  try {
    const res = await restApi.get(API.getMyScrapThreads + `?limit=5000`);
    console.log('getMyScrapThreads', res);
    return res.data.docs;
  } catch (error) {
    console.log('getMyThreads err', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const getSingleThread = async (threadId) => {
  try {
    const res = await restApi.get(API.getSingleThread + threadId);
    console.log('getSingleThread', res);
    return res.data;
  } catch (error) {
    console.log('getSingleThread err', error.response);
    return error.response;
    // throw error as ApiError
  }
};

//
 export const getThreadComments = async (threadId,userID) => {
  try {
    console.log('threadIdSS');
    console.log(threadId);
    const res = await restApi.get(
      API.getThreadComments +
        `?thread=${threadId}&limit=5000&combineSubcomments=true&showUserLiked=${userID}`,
    );
    console.log('getSingleThread', res);
    return res.data;
  } catch (error) {
    console.log('getSingleThread err', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const getThreadScraps = async (threadId) => {
  try {
    const data = await restApi.get(
      API.getThreadScraps + `?thread=${threadId}&limit=5000`,
    );
    return data.data.docs;
  } catch (e) {
    console.log(e?.response);
    return e?.response;
  }
};

export const getThreadLikes = async (threadId) => {
  try {
    const data = await restApi.get(
      API.getThreadLikes + `?thread=${threadId}&limit=5000`,
    );
    return data.data.docs;
  } catch (e) {
    console.log(e?.response);
    return e?.response;
  }
};
//

export const threadAddLike = async (threadId) => {
  try {
    const res = await restApi.post(API.addlike, {
      thread: threadId,
    });
    console.log('threadAddLike', res);
    return res;
  } catch (error) {
    console.log('threadAddLike err', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const threadRemoveLike = async (threadId) => {
  try {
    const res = await restApi.delete(API.removelike + threadId);
    console.log('threadRemoveLike', res);
    return res;
  } catch (error) {
    console.log('threadRemoveLike err', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const threadAddScrap = async (threadId, title, authorId) => {
  try {
    const res = await restApi.post(API.scrap, {
      thread: threadId,
    });
    console.log('threadAddScrap', res);
    return res;
  } catch (error) {
    console.log('threadAddScrap err', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const threadRemoveScrap = async (threadId) => {
  try {
    const res = await restApi.delete(API.removeScrap + threadId);
    console.log('threadRemoveScrap', res);
    return res;
  } catch (error) {
    console.log('threadRemoveScrap err', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const addThreadComment = async (threadId, content) => {
  try {
    const res = await restApi.post(API.addComment, {
      thread: threadId,
      parent: null,
      content,
    });
    console.log('addThreadComment', res);
    return res;
  } catch (error) {
    console.log('addThreadComment err', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const addThreadSubComment = async (threadId, parentId, content) => {
  try {
    const res = await restApi.post(API.addComment, {
      thread: threadId,
      parent: parentId,
      content,
    });
    console.log('addSubThreadComment', res);
    return res;
  } catch (error) {
    console.log('addSubThreadComment err', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const removeThreadComment = async (threadId, commentId) => {
  try {
    const res = await restApi.delete(API.removeComment + commentId);
    console.log('removeThreadComment', res);
    return res;
  } catch (error) {
    console.log('removeThreadComment err', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const removeThreadSubComment = async (threadId, commentId) => {
  try {
    const res = await restApi.delete(API.removeComment + commentId);
    console.log('removeThreadComment', res);
    return res;
  } catch (error) {
    console.log('removeThreadComment err', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const getMultipleThread = async (threadIds) => {
  try {
    const res = await restApi.post(
      API.multipleThread + `?ids=${threadIds.join(',')}`,
    );
    console.log('getMultipleThread', res);
    return res;
  } catch (error) {
    console.log('getMultipleThread', error?.response);
    return error.response;
    // throw error as ApiError
  }
};

export const getThreadMyComments = async () => {
  try {
    const res = await restApi.get(API.myComments);
    console.log('getThreadMyComments', res);
    return res.data.result.comments;
  } catch (error) {
    console.log('getThreadMyComments', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const editorImageUpload = async (img) => {
  try {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    const formData = new FormData();
    const file = {
      uri: img.path,
      type: img.mime,
      name:
        img.filename === null || img.filename === undefined
          ? 'profileImg'
          : img.filename,
    };
    formData.append('file', file);
    const res = await restApi.post(API.editorImageUpload, formData, config);
    console.log('editorImageUpload', res);
    return res;
  } catch (error) {
    console.warn('editorImageUpload err', error.response);
    return error.response;
  }
};

export const theradLikeComment = async (threadId, commentId) => {
  try {
    const res = await restApi.post(API.likecomment, {
      threadComment: commentId,
    });
    console.log('theradLikeComment', res);
    return res.data.result;
  } catch (error) {
    console.log('theradLikeComment', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const theradUnlikeComment = async (threadId, commentId) => {
  try {
    const res = await restApi.delete(API.unlikecomment + commentId);
    console.log('theradUnlikeComment', res);
    return res.data.result;
  } catch (error) {
    console.log('theradUnlikeComment', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const theradLikeSubComment = async (threadId, commentId) => {
  try {
    const res = await restApi.post(API.likecomment, {
      threadComment: commentId,
    });
    console.log('theradLikeSubComment', res);
    return res.data.result;
  } catch (error) {
    console.log('theradLikeSubComment', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const theradUnlikeSubComment = async (threadId, commentId) => {
  try {
    const res = await restApi.delete(API.unlikecomment + commentId);
    console.log('theradUnlikeSubComment', res);
    return res.data.result;
  } catch (error) {
    console.log('theradUnlikeSubComment', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const getCarousel = async () => {
  try {
    const res = await restApi.get(API.getCarousel);
    console.log('getCarousel', res);
    return res.data.result;
  } catch (error) {
    console.log('getCarousel', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const editThread = async (data) => {
  try {
    const res = await restApi.patch(API.editThread, { payload: data });
    console.log('editThread', res);
    return res.data;
  } catch (error) {
    console.log('editThread', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const deleteThread = async (threadId) => {
  try {
    const res = await restApi.delete(API.deleteThread + threadId);
    console.log('deleteThread', res);

    return res;
  } catch (error) {
    console.log('deleteThread err', error.response);
    return error.response;
    // throw error as ApiError
  }
};
