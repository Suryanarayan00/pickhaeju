import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import colors from '#common/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import assets from '../../../assets';
import { useNavigation, useRoute } from '@react-navigation/native';
/*import { TabBar, TabView } from 'react-native-tab-view';*/
import Animated from 'react-native-reanimated';
import ScrapPick from '#widgets/scrap_pick';
import ScrapNews from '#widgets/scrap_news';
import ProfilePick from '#widgets/profile_pick';
import ProfileComment from '#widgets/profile_comment';
import ProfileCommentPick from '#widgets/profile_comment_pick';
import TabView from '#components/TabView';
import TabBar from '#components/TabScene/TabBar';
import TabScreens from '#components/TabScene/TabScreens';
import TabProvider from '#components/TabScene';
import ProfileRound from '#components/ProfileRound';
import Document from '#components/Document';
import { getProfile, getProfiles } from '../../common/usersApi';
// import { setUserId } from 'appcenter';

const styles = StyleSheet.create({
  stockName: {
    fontSize: 12,
    paddingTop: 6.5,
    color: colors.dark,
  },
  subText: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
  },

  cameraButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: 'rgb(210,210,210)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    position: 'absolute',
    top: 60,
    right: 0,
  },
  userName: {
    fontSize: 18,
    color: colors.blackTwo,
    letterSpacing: -0.81,
    marginTop: 12.5,
  },
  greyBar: {
    backgroundColor: 'rgb(216,220,223)',
    width: 260,
    height: 6,
    borderRadius: 3,
    marginTop: 24,
  },
  purpleBar: {
    width: 130,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgb(156,79,209)',
  },
  levelWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 260,
    marginTop: 8.5,
  },
  levelText: {
    fontSize: 10,
    letterSpacing: -0.45,
    color: colors.brownishGrey,
  },
  userLevelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    letterSpacing: -0.4,
    color: colors.blackTwo,
    marginVertical: 15,
  },
  titleText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    marginTop: 40,
    alignItems: 'center',
  },
  subTitle: {
    paddingHorizontal: 20,
    marginTop: 34,
  },
  subTitleText: {
    fontSize: 16,
    letterSpacing: -0.4,
    color: colors.dark,
  },
  guideLine: {
    backgroundColor: colors.blueyGrey,
    height: 15,
    width: 1,
    marginHorizontal: 10,
  },

  pickWrapper: {
    flexDirection: 'row',
    backgroundColor: colors.paleGreyTwo,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  pickFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: colors.paleGreyTwo,
  },
  footerIcon: {
    alignItems: 'center',
    width: 40,
    height: 20,
    borderRadius: 5,
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  approveIcon: {
    marginRight: 6,
    alignItems: 'center',
    width: 40,
    height: 20,
    borderRadius: 5,
    justifyContent: 'center',
  },
  deleteButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightIndigo,
    position: 'absolute',
    top: 50,
    right: 0,
  },
  deleteIcon: { width: 10, height: 12 },
  deleteBorder: {
    width: 80,
    height: 80,
    borderWidth: 5,
    borderRadius: 40,
    borderColor: colors.lightIndigo,
  },
  followUserName: {
    fontSize: 12,
    color: colors.blueGrey,
    textAlign: 'center',
    marginTop: 12,
  },
  moreButton: {
    fontSize: 12,
    color: colors.blueGrey,
    letterSpacing: -0.3,
  },
  tabBar: { borderBottomWidth: 1, borderBottomColor: colors.lightPeriwinkle },
  indicatorContainerStyle: {
    overflow: 'visible',
    marginBottom: -6,
  },
  contentContainerStyle: {
    marginBottom: -4,
  },
  labelStyle: {
    fontSize: 14,
    textAlign: 'center',
    width: 100,
  },
  indicator: {
    bottom: 2,
    height: 4,
    position: 'absolute',
    alignItems: 'center',
  },
  indicatorItem: {
    width: 40,
    height: 2,
    backgroundColor: colors.lightIndigo,
  },
  countText: {
    fontSize: 16,
    letterSpacing: -0.4,
    color: colors.lightIndigo,
    paddingLeft: 9,
  },
  mainTitleText: {
    fontSize: 18,
    color: colors.blackTwo,
    paddingHorizontal: 20,
    marginTop: 5,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 0.1,
  },
  userInfoSection: { alignItems: 'center', marginVertical: 20 },
  levelBar: {
    flexDirection: 'row',
  },
  purpleCircle: {
    backgroundColor: 'rgb(156,79,209)',
    width: 10,
    height: 10,
    borderRadius: 5,
    position: 'absolute',
    top: -2,
  },
  infoText: {
    fontSize: 14,
    letterSpacing: -0.62,
    color: colors.blackTwo,
  },
  levelCircle: {
    width: 40,
    height: 18,
    borderRadius: 9,
    borderWidth: 0.5,
    borderColor: 'rgb(156,79,209)',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelCircleText: {
    fontSize: 10,
    letterSpacing: -0.45,
    color: 'rgb(156,79,209)',
  },
  container: { flex: 1, backgroundColor: colors.white },
  scrapTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 34,
    paddingHorizontal: 22,
    marginBottom: 16,
  },
  borderBar: { height: 10, backgroundColor: colors.whiteTwo, marginTop: 40 },
  followSection: { marginVertical: 30, paddingHorizontal: 12 },
  followTitleWrapper: { flexDirection: 'row', alignItems: 'center' },
  followTitle: {
    fontSize: 16,
    letterSpacing: -0.4,
    color: colors.blackTwo,
    marginLeft: 10,
  },
  smallUserImage: { width: 70, height: 70, borderRadius: 35 },
  largeUserImage: { width: 80, height: 80, borderRadius: 40 },
  banner: {
    height: 80,
    width: '100%',
  },
});

const OtherProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const inset = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const [scrapIndex, setScrapIndex] = useState(0);
  const [user, setUser] = useState();
  const [followingDatas, setFollowingDatas] = useState();
  const [followerDatas, setFollowerDatas] = useState();

  useEffect(() => {
    const init = async () => {
      const otherProfile = route?.params?.userId;
      console.log('otherProfile!ssssssssssss', otherProfile);
      setUser(otherProfile);

      Promise.all([
        getProfiles(otherProfile.data?.user?.following),
        getProfiles(otherProfile.data?.user?.followers || []),
      ]).then((datas) => {
        console.log('otherprofile follow', datas);
        setFollowingDatas(datas[0].data.result);
        setFollowerDatas(datas[1].data.result);
      });
    };
    init();
  }, []);

  const getMemberRank = (score) => {
    const rankData = { percent: 0, grade: '주린이' };

    if (score > 99) {
      return { percent: 25, grade: '초보' };
    }
    if (score > 299) {
      return { percent: 50, grade: '중수' };
    }
    if (score > 599) {
      return { percent: 75, grade: '고수' };
    }
    if (score > 1499) {
      return { percent: 100, grade: '신' };
    }

    return rankData;
  };

  

  const rankData = getMemberRank(user?.memberPoints);
  console.log('RANKKK', rankData);
  return (
    <>
      <Document footerContents={true}>
        <View style={styles.container}>
          <View style={{flexDirection:'row'}}>
          <Text style={styles.mainTitleText}>{user?.name}님의 페이지</Text>
          <View style={{height:30,width:70,backgroundColor:colors.lightIndigo,borderRadius:20,marginTop:3,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'white'}}>팔로잉</Text>
          </View>
          </View>
          <View style={styles.userInfoSection}>
            <Image
              source={{
                uri: user?.avatar,
              }}
              style={styles.profileImage}
            />

            <Text style={styles.userName}>{user?.name}</Text>
            <View style={styles.greyBar}>
              <View style={styles.levelBar}>
                <View style={styles.purpleCircle} />
                {rankData?.percent !== 0 && (
                  <View
                    style={[
                      styles.purpleBar,
                      { width: rankData.percent + '%' },
                    ]}
                  >
                    <View
                      style={[
                        styles.purpleCircle,
                        {
                          right: 0,
                          marginRight: -5,
                        },
                      ]}
                    />
                  </View>
                )}
              </View>
            </View>
            <View style={styles.levelWrapper}>
              <Text style={styles.levelText}>주린이</Text>
              <Text style={styles.levelText}>초보</Text>
              <Text style={styles.levelText}>중수</Text>
              <Text style={styles.levelText}>고수</Text>
              <Text style={styles.levelText}>신</Text>
            </View>
            <View style={styles.userLevelWrapper}>
              <Text style={styles.infoText}>{user?.name}님은 </Text>
              <View style={styles.levelCircle}>
                <Text style={styles.levelCircleText}>{rankData.grade}</Text>
              </View>
              <Text style={styles.infoText}> 등급입니다.</Text>
            </View>
          </View>

          <Image
            source={assets.banner_img}
            style={styles.banner}
            resizeMode={'contain'}
          />

          <View style={[styles.subTitle, { marginBottom: 25 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.subTitleText}>작성글 관리</Text>
            </View>
          </View>

          <TabProvider index={index} onChangeIndex={setIndex}>
            <TabBar type={'left'} />
            <TabScreens>
              {user && (
                <ProfilePick
                  chart={false}
                  title={'작성 PICK'}
                  threads={user?.threads}
                  userId={route?.params?.userId}
                />
              )}
              {user?.threadComments?.comments?.length > 0 && (
                <ProfileComment
                  title={'작성 댓글'}
                  data={
                    user?.threadComments?.comments
                      .flat()
                      .filter((d) => d)
                      .sort() || []
                  }
                />
              )}
            </TabScreens>
          </TabProvider>

          <View style={styles.borderBar} />
          <View style={styles.followSection}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.followTitleWrapper}
              onPress={() => {
                navigation.navigate('OtherFollowList', {
                  user
                });
              }}
            >
              <Text style={styles.followTitle}>팔로워</Text>
              <Text style={styles.countText}>{followerDatas?.length || 0}</Text>
            </TouchableOpacity>
            <FlatList
              data={followerDatas || []}
              horizontal={true}
              contentContainerStyle={{ marginTop: 26 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => <ProfileRound item={item} />}
            />
          </View>
          <View style={styles.followSection}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.followTitleWrapper}
              onPress={() => {
                navigation.navigate('OtherFollowList');
              }}
            >
              <Text style={styles.followTitle}>팔로잉</Text>
              <Text style={styles.countText}>
                {followingDatas?.length || 0}
              </Text>
            </TouchableOpacity>
            <FlatList
              data={followingDatas || []}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ marginTop: 26 }}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => {
                    // alert(JSON.stringify(item));
                    // navigation.push('OtherProfile', {
                    //   userId: item.userId,
                    // });
                  }}
                >
                  <ProfileRound item={item} />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Document>
    </>
  );
};
export default OtherProfile;
