import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '#common/colors';
import assets from '../../assets';
import DeletePickPopUp from '#components/DeletePickPopUp';
import moment from 'moment';
import { addFollowing, removeFollowing } from '../common/authApi';
import { me } from '../data/auth/actions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { deleteThread } from '../common/threadApi';
 const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  userName: {
    color: colors.greyBlue,
    paddingVertical: 4,
    fontSize: 14,
    letterSpacing: -0.35,
  },
  timeText: {
    color: colors.blueyGrey,
    paddingVertical: 4,
    fontSize: 13,
    letterSpacing: -0.32,
  },
  countText: {
    color: colors.blueyGrey,
    letterSpacing: -0.32,
    fontSize: 13,
  },
  countWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  imageStyle: { width: 30, height: 30, borderRadius: 15 },
  header: {
    marginTop: 10,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userWrapper: {
    flex: 1,
    marginLeft: 15,
  },
  nameFollowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  followButtonWrapper: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  flagIcon: {
    width: 8,
    height: 10,
    alignSelf: 'center',
  },
  followText: {
    paddingLeft: 8,
    color: colors.blueyGrey,
    fontSize: 13,
  },
  borderLine: {
    borderBottomWidth: 1,
    borderBottomColor: colors.paleGreyThree,
  },
  countBox: { flexDirection: 'row' },
  bottomBox: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  countIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  buttonWrapper: { flexDirection: 'row', alignItems: 'center' },
  textButton: {
    fontSize: 13,
    letterSpacing: -0.32,
    color: colors.cloudyBlue,
  },
   guideLine: {
    height: 11,
    width: 1,
    backgroundColor: colors.lightPeriwinkle,
    marginHorizontal: 10,
  },
});



const PickUser = ({ userData, data, threadId, totalComments }) => {
   console.log('PickUser userData',data);
  const [isVisible, setIsVisible] = useState(false);
  const [isImageExit, setisImageExit] = useState(false);

  const [isFollowing, setIsFollowing] = useState(!!data?.isFollowing);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.principal);
  const navigation = useNavigation();
  const isMyThread = userInfo?.userId === data.userId;
  const { views, likes, comments, scraps } = data;

   useEffect(()=>{
    Image.getSize(userData?.avatar, (width, height) => {
      if(width>0){
        setisImageExit(true);
      }
      else{
        setisImageExit(false);
      }
  }, () => {
    setisImageExit(false);
  });
  },[userData?.avatar])

  const getMemberRank = (score) => {
    const rankData = { percent: 0, grade: '주린이' };

    if (score > 99 &&  score<=299) {
      return { percent: 25, grade: '초보' };
    }
    if (score > 299 &&  score<=299) {
      return { percent: 50, grade: '중수' };
    }
    if (score > 599 &&  score<=1499) {
      return { percent: 75, grade: '고수' };
    }
    if (score > 1499) {
      return { percent: 100, grade: '신' };
    }
    return rankData;
  };

  const rankData = getMemberRank(userInfo && userInfo.userInfo && userInfo.userInfo.memberPoints && userInfo.userInfo.memberPoints);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
           // navigation.push('OtherProfile', { userId: data?.user });
          }}
        >
          <Image
            source={
              isImageExit ? {
                uri: userData?.avatar 
              } : 
              assets.app_dafault_pic
            }
            style={styles.imageStyle}
          />
        </TouchableOpacity>
        <View style={styles.userWrapper}>
          <View style={styles.nameFollowWrapper}>
            <TouchableOpacity 
            onPress={() => {
             // navigation.push('OtherProfile', { userId: data?.userId });
            }}
            activeOpacity={0.85}>
              <Text style={styles.userName}>
                {userData ? userData.name : '노다지'}
              </Text>
            </TouchableOpacity>
            {!isMyThread && userData && (
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.followButtonWrapper}
                onPress={async () => {
                  if (isFollowing) {
                    const res = await removeFollowing(userData?._id);
                    setIsFollowing(false);
                  } else {
                    const res = await addFollowing(userData._id);
                    setIsFollowing(true);
                  }

                  dispatch(me());
                }}
              >
                <Image
                  source={assets.icon_news_flag}
                  style={[
                    styles.flagIcon,
                    {
                      tintColor: isFollowing
                        ? colors.lightIndigo
                        : colors.cloudyBlue,
                    },
                  ]}
                />
                <Text style={styles.followText}>
                  {isFollowing ? '팔로잉 중' : '팔로우하기'}
                </Text>
                <Text style={styles.followText}>
                  {rankData && rankData.grade}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.timeText}>
            {moment(new Date(data?.updatedAt)).format(
              'YYYY.MM.DD a hh:mm',
            )}
          </Text>
        </View>
      </View>
       <View style={styles.borderLine} />
      <View style={styles.bottomBox}>
        <View style={styles.countBox}>
          <View style={styles.countWrapper}>
            <Image source={assets.icon_news_view} style={styles.countIcon} />
            <Text style={styles.countText}>{views}</Text>
          </View>
          <View style={styles.countWrapper}>
            <Image source={assets.icon_news_comment} style={styles.countIcon} />
            <Text style={styles.countText}>{totalComments}</Text>
          </View>
          <View style={styles.countWrapper}>
            <Image source={assets.icon_news_recomm} style={styles.countIcon} />
            <Text style={styles.countText}>{likes?.length}</Text>
          </View>
          <View style={styles.countWrapper}>
            <Image source={assets.icon_news_clip} style={styles.countIcon} />
            <Text style={styles.countText}>{scraps?.length || 0}</Text>
          </View>
        </View>
        {isMyThread && (
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => {
                setIsVisible(true);
              }}
            >
              <Text style={styles.textButton}>삭제</Text>
            </TouchableOpacity>
            <View style={styles.guideLine} />
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate('PickModify', { data, threadId })
              }
            >
              <Text style={styles.textButton}>수정</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <DeletePickPopUp
        isVisible={isVisible}
        onCancel={() => {
          setIsVisible(false);
        }}
        onDelete={async () => {
          await deleteThread(threadId);
          setIsVisible(false);
          navigation.navigate('Pick', { refresh: true, index: 1 });
        }}
      />
    </View>
  );
};

export default PickUser;
