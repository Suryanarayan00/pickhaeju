import { restApi, getAPIHost,getToken } from '#common/api';
import axios from 'axios';

// const API = {
//   kakaoSignUp: '/users/auth/kakao',
//   appleSignUp: '/users/auth/apple',
//   getMe: '​/users​/auth​/getme',
//   withdraw: '/users/auth/withdraw',
//   changeInfo: '/users/auth/changeInfo',
//   addFollowing: '/users/modify/addfollowing',
//   removeFollowing: '/users/modify/removefollowing',
//   addPreference: '/users/auth/v2/addpreference',
// };

const API = {
  kakaoSignUp: '/api/v3/user/authenticate/kakao',
  appleSignUp: '/api/v3/user/authenticate/apple',
  getMe: '​​/api​/v3​/user​/info​/me',
  withdraw: '​/api/v3/user/account/deactivate',
  changeInfo: '/api/v3/user/change/me',
  addFollowing: '​/api​/v3​/user​/follow/',
  removeFollowing: '​/api​/v3​/user​/follow/unfollow/',
  addPreference: '​/api​/v3​/user​/preference',
  //
  followerApi: '/api/v3/user/follow/list',
  googleSignUp: '/api/v3/user/authenticate/google',

 };

export const getUserFollower = async (userId) => {
  try {
    const res = await restApi.get(
      API.followerApi + `?limit=5000&followerUserId=${userId}`,
    );
    console.log('res', res);
    return res;
  } catch (error) {
    console.log('error', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const getUserFollowing = async (userId) => {
  try {
    const res = await restApi.get(
      API.followerApi + `?limit=5000&followedUserId=${userId}`,
    );
    console.log('res', res);
    return res;
  } catch (error) {
    console.log('error', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const kakaoSignUp = async (token) => {
  try {
    const res = await restApi.post(API.kakaoSignUp, {
      token,
      register: true,
    });
    console.log('resData', res);
    return res;
  } catch (error) {
    console.log('error', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const kakaoSignIn = async (token) => {
  try {
    const res = await restApi.post(API.kakaoSignUp, {
      token,
      register: false,
    });
    console.log('resnew', res);
    return res;
  } catch (error) {
    console.log('error', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const appleSignUp = async (token) => {
  try {
    const res = await restApi.post(API.appleSignUp, {
      token,
      register: true,
    });
    console.log('res', res);
    return res;
  } catch (error) {
    console.log('error', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const appleSignIn = async (token) => {
  try {
    const res = await restApi.post(API.appleSignUp, {
      token,
      register: false,
    });
    console.log('res', res);
    return res;
  } catch (error) {
    console.log('error', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const googleSignUp = async (token,isRegister=true) => {
  try {
    const res = await restApi.post(API.googleSignUp, {
      token,
      register: isRegister,
    });
    console.log('google res', res);
    return res;
  } catch (error) {
    console.log('error Google', error.response);
    return error.response;
    // throw error as ApiError
  }
};


export const withdraw = async () => {
  try {
  //  const res = await restApi.delete(API.withdraw);
  console.log(getAPIHost()+API.withdraw);
  let authorizationToken = getToken();
  const res = await axios.delete('https://pickhaeju-server.appspot.com/api/v3/user/account/deactivate', {
    headers: {
      Authorization: authorizationToken
    },
    data: {}
  });  
  console.log('withdraw', res);
    return res;
  } catch (error) {
    console.log('withdraw error', error.response);
    return error.response;
    // throw error as ApiError
  }
};

export const changeNickName = async (name) => {
  try {
    const res = await restApi.patch(API.changeInfo, {
      payload: {
        name,
      },
    });
    return res;
  } catch (error) {
    return error.response;
    // throw error as ApiError
  }
};

/**
 * 팔로잉 추가
 * @param {number} targetId
 */
export const addFollowing = async (targetId) => {
  try {
    console.log('targetId');
    console.log(targetId);
    const res = await restApi.get(API.addFollowing+ _id);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
    // throw error as ApiError
  }
};

/**
 * 팔로잉 제거
 * @param {number} id
 */

export const removeFollowing = async (_id) => {
  try {
    const res = await restApi.delete(API.removeFollowing + _id);
    console.log('Remove Following', res);
    return res;
  } catch (error) {
    console.log('Remove err', error.response);
    return error.response;
    // throw error as ApiError
  }
};


export const addPreference = async (data) => {
  try {
    // const res = await restApi.patch(API.addPreference, {
    //   ...data,
    // });
    let authorizationToken = getToken();
    const res = await axios.patch('https://pickhaeju-server.appspot.com/api/v3/user/me/preference',
     {...data},
    {
      headers: {
        Authorization:authorizationToken
      },
     
    }); 
    console.log('addPreference', res);
    return res;
  } catch (error) {
    console.log('addPreference err', error.response);
    return error.response;
    // throw error as ApiError
  }
};
