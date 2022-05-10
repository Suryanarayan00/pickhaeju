import React from 'react';
import KakaoLogin from 'react-kakao-login';
import BottomButton from '../components/Button/BottomButton';

const token = '265aa124b9d19662d3d7ca9659d63bf0';

// const KakaoLogin = {};

export const RKakaoLogin = ({ children, onSuccess }) => (
  <KakaoLogin
    token={token}
    onSuccess={onSuccess}
    onFail={console.error}
    onLogout={console.info}
    style={{
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {children}
  </KakaoLogin>
);

export default RKakaoLogin;
