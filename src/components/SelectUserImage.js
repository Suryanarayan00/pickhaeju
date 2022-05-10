import React, { useState } from 'react';
import {
  Modal as Wrapper,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import colors from '#common/colors';
import ImagePicker from 'react-native-image-crop-picker';
import { removeProfileImage, uploadProfileImage, updateUser } from '../common/usersApi';
import { useDispatch } from 'react-redux';
import { me } from '../data/auth/actions';
import DeleteProfilePopUp from '#components/DeleteProfilePopUp';
import { toastShow } from '#data/toast/ToastAction';
import KakaoSDK from '@actbase/react-kakaosdk';

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: colors.white,
    borderRadius: 4.5,
    paddingVertical: 20,
    paddingHorizontal: 18,
    shadowColor: colors.blueGrey,
    shadowOffset: {
      height: 1,
    },
    shadowOpacity: 0.25,
  },
  buttonWrapper: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 16, letterSpacing: -0.4, color: colors.blackTwo },
  icon: { width: 16, height: 16 },
  contents: {
    color: colors.blackTwo,
    letterSpacing: -0.62,
    marginLeft: 11,
  },
  wrapper: {
    backgroundColor: '#00000050',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: colors.white,
    width: '90%',
    borderRadius: 15,
  },
});
const SelectUserImage = ({ isVisible, onCancel, userId }) => {
  const dispatch = useDispatch();
  const [isDeletePopup, setDeletePopup] = useState(false);
  const openAlbum = async () => {
    const image = await ImagePicker.openPicker({
      compressImageMaxWidth: 100,
      compressImageMaxHeight: 100,
    });
    const result = await uploadProfileImage(image);
    dispatch(me());
    onCancel();
    dispatch(toastShow('프로필 사진이 변경되었습니다.'));
    return image;
  };

  //Delete Profile Image
  const deleteProfilePopUp = () => {
    setDeletePopup(true);
    onCancel();
  };


    //update Profile Image
    const updateprofileImg = async (imgUrl) => {
      let info=await updateUser(userId,imgUrl);
      console.log('Response Update');
      console.log(info);
      dispatch(me());
      onCancel();
    };
  

  //openSocialImage
  const openSocialImage = async () => {
    const kakaoAppkey =
        Platform.OS === 'web'
          ? '265aa124b9d19662d3d7ca9659d63bf0'
          : '930cb8e9c572b17bd291a47db4fbc594';
      await KakaoSDK.init(kakaoAppkey);
    const profile = await KakaoSDK.getProfile();
    let socialProfile = profile?.kakao_account?.profile?.thumbnail_image_url;
      updateprofileImg(socialProfile);
  };

  return (
    <View>
      <Wrapper
        transparent={true}
        visible={isVisible}
        onBackButtonPress={onCancel}
      >
        <TouchableWithoutFeedback onPress={onCancel}>
          <View style={[styles.wrapper]}>
            <TouchableWithoutFeedback>
              <View style={[styles.container]}>
                <View style={styles.contentContainer}>
                  <Text style={styles.title}>프로필 사진</Text>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={[styles.buttonWrapper, { marginTop: 21 }]}
                    onPress={openAlbum}
                  >
                    <Text style={styles.contents}>앨범에서 사진 선택​</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={[styles.buttonWrapper, { marginTop: 15 }]}
                    onPress={openSocialImage}
                  >
                    <Text style={styles.contents}>기본 이미지로 변경​</Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={deleteProfilePopUp}
                    style={[styles.buttonWrapper, { marginTop: 15 }]}
                  >
                    <Text style={styles.contents}>프로필 사진 삭제​</Text>
                  </TouchableOpacity> */}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Wrapper>

      <DeleteProfilePopUp
        isVisible={isDeletePopup}
        onCancel={() => {
          setDeletePopup(false);
        }}
        onDelete={async () => {
          const result = await removeProfileImage();
          dispatch(me());
          setDeletePopup(false);
        }}
      />
    </View>
  );
};

export default SelectUserImage;
