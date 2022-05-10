import { restApi, getAPIHost } from '#common/api';
import WatchList from '../pages/watchlist';
import { companyGenerals } from './dataApi';

// const API = {
//   addCategory: '/users/modify/addcategory',
//   modifyWatchList: '/users/modify/watchlist',
//   watchlistdata: '/users/watchlistdata',
//   userThreads: '/users/userthreads',
//   getProfiles: '/users/multipleprofiles',
//   getProfile: '/users/profile',
//   uploadProfileImage: '/uploads/image/avatar',
//   mystatistics: '/users/mystatistics',

// };

const API = {
  addCategory: "/api/v3/watchlist/", // POST, Concept of watchlist category has been replaced to making multiple watchlist per User. Whole logic is changed. (/api/v3/watchlist/)
  modifyWatchList: "/api/v3/watchlist/", // PATCH
 // watchlistdata: "/api/v3/watchlist/{_id}/with-stock-info", // GET, data format has been changed. you should rebind this.
  watchlistdata: "/api/v3/watchlist/list",
  userThreads: "/api/v3/thread/list", // GET, use _ids query
  getProfiles: "/api/v3/user/list", // GET. use query
  getProfile: "/api/v3/user/", // GET
  uploadProfileImage: "/api/v3/user/avatar/me", // NO CHANGE
  //mystatistics: "/users/mystatistics", // I don't think I made this one in v3. If it is used, let me know.
  mystatistics: "/api/v3/user/statistics/mystatistics", 

  updateUser: "/api/v3/user/", // NO CHANGE

}
export const addCategory = async ({ categoryName, colorIndex, iconIndex }) => {
  try {
    const res = await restApi.post(API.addCategory, {
      'index': 0,
      'name': categoryName,
      'color': colorIndex,
      'icon': iconIndex,
      'stocks':[]
    });
     console.log('addCategory res', res);
    return res;
  } catch (error) {
    console.log('addCategory res error', error.response);
    return error.response;
  }
};

export const modifyWatchList = async (id,newWatchList) => {
  try {
    console.log(
      'modifyWatchList',
      JSON.stringify({ newWatchList }, undefined, 2),
    );
    const res = await restApi.patch(API.modifyWatchList+id, {
      payload:newWatchList,
    });
    return res;
  } catch (error) {
    console.warn(error);
    return error.response;
  }
};

//Delete Watchlist
export const deleteWatchList = async (id) => {
  try {
       const res = await restApi.delete(API.modifyWatchList+id);
    return res;
  } catch (error) {
    console.warn(error);
    return error.response;
  }
};


/**
 * watchlist data를 조회
 *
 */
export const watchlistdata = async (userID) => {
  try {
    const {
      data: { docs },
    } = await restApi.get(API.watchlistdata+'?limit=100&page=1&sort=createdAt&userId='+userID);
    let tickerData=[];
    console.log('Watchlist Info');
    console.log(docs);
    
    console.log(docs.map?.(({ stocks }) => stocks).flat());
    let stocksArray = docs.map?.(({ stocks }) => stocks).flat();
    var generals=[];
    if(stocksArray?.length>0)
    {
      generals = await companyGenerals(
        docs.map?.(({ stocks }) => stocks).flat(),
      )
    }
   return docs?.map((watchList,index)=>{
    if(watchList?.stocks?.length>0)
    {
      return {
        ...watchList,
        generals: watchList?.stocks?.map((tickerData)=>{
         return generals.find(({ ticker }) => tickerData == ticker)
        })
      }
    }
   else
   {
    return {
      ...watchList,
      generals: []
    }
   } 
  }
    )
  } catch (e) {
    console.warn(e);
    return e?.message;
  }
};

/**
 * 해당 유저가 작성한 pick들을 조회합니다.
 * @param {number} userId
 */
export const getUserPick = async (userId) => {
  try {
    const res = await restApi.post(API.userThreads, {
      userId,
    });
    console.log('getUserPick', res);
    return res.data;
  } catch (error) {
    console.log('getUserPick err', error?.response);
    console.warn(error);
    return error.response;
  }
};

export const getProfiles = async (userIds) => {
  try {
    const res = await restApi.post(API.getProfiles, {
      userIds,
    });
    console.log(res);
    return res;
  } catch (error) {
    console.warn(error);
    return error.response;
  }
};

export const getProfile = async (userId) => {
  try {
    const res = await restApi.get(API.getProfile+userId);
    console.log(res);
    return res;
  } catch (error) {
    console.warn(error);
    return error.response;
  }
};

export const uploadProfileImage = async (img) => {
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
    const res = await restApi.post(API.uploadProfileImage, formData, config);
    console.log('uploadProfileImage', res);
    return res;
  } catch (error) {
    console.warn('uploadProfileImage err', error.response);
    return error.response;
  }
};

 export const getMystatistics = async (field) => {
  try {
    const res = await restApi.get(API.mystatistics+'?field='+field, {
    
    });
    console.log('getMystatistics', res);
    return res;
  } catch (error) {
    console.warn('getMystatistics err', error);
    return error.response;
  }
};

//Delete Profile Pic
export const removeProfileImage = async () => {
  try {
    const res = await restApi.delete(API.uploadProfileImage, {
      data: {},
    });
    console.log('remove Image', res);
    return res;
  } catch (error) {
    console.log('remove Image', error.response);
    return error.response;
  }
};

export const updateUser = async (id,payloadVal) => {
  try {
    console.log(payloadVal);
    console.log('update Url');
    console.log(API.updateUser+id);
    const res = await restApi.patch(API.updateUser+id,  {
      payload: {
        avatar:payloadVal,
      },
    });
    return res;
  } catch (error) {
    console.warn(error);
    return error.response;
  }
};
