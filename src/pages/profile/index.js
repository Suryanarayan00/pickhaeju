import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Clipboard,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '#common/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import assets from '../../../assets';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ScrapPick from '#widgets/scrap_pick';
import ScrapNews from '#widgets/scrap_news';
import ProfilePick from '#widgets/profile_pick';
import ProfileComment from '#widgets/profile_comment';
import Document from '#components/Document';
import TabProvider from '#components/TabScene';
import TabScreens from '#components/TabScene/TabScreens';
import TabBar from '#components/TabScene/TabBar';
import { getToken } from '#common/api';
import { useDispatch, useSelector } from 'react-redux';
import ProfileRound from '#components/ProfileRound';
import SelectUserImage from '#components/SelectUserImage';
import AsyncStorage from '@react-native-community/async-storage';
import { clear, me, logOut} from '../../data/auth/actions';
import { getArticleMyComments, getMyArticleScraps } from '../../common/article';
import {
  getMultipleThread,
  getMyScrapThreads,
  getMyThreads,
  getThreadMyComments,
} from '../../common/threadApi';
import { getProfiles } from '../../common/usersApi';
import {
  getUserFollower,
  getUserFollowing,
  removeFollowing,
} from '../../common/authApi';
import LogoutPopUp from '#components/LogoutPopup';
import { toastShow } from '#data/toast/ToastAction';
import HelpPopup from '../../components/HelpPopup';
import help from '../../common/help';
import moment from 'moment';

const styles = StyleSheet.create({
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
    marginTop: 12,
  },
  greyBar: {
    backgroundColor: 'rgb(216,220,223)',
    width: 260,
    height: 6,
    borderRadius: 3,
    marginTop: 24,
  },
  purpleBar: {
    width: '0%',
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.lightIndigoTwo,
  },
  levelWrapper: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 15,
    width: 260,
  },
  levelText: {
    fontSize: 10,
    letterSpacing: -0.45,
    color: colors.brownishGrey,
    width: 50,
    position: 'absolute',
    textAlign: 'center',
    transform: [
      {
        translateX: -25,
      },
    ],
  },
  userLevelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    justifyContent: 'center',
    position: 'relative',
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
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 34,
    justifyContent: 'space-between',
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
  moreButton: {
    fontSize: 12,
    color: colors.blueGrey,
    letterSpacing: -0.3,
  },
  countText: {
    fontSize: 16,
    letterSpacing: -0.4,
    color: colors.lightIndigo,
    paddingLeft: 9,
  },
  container: { flex: 1, backgroundColor: colors.white },
  mainTitleText: {
    fontSize: 18,
    color: colors.blackTwo,
    paddingHorizontal: 20,
    /*   fontFamily: Platform.OS === 'android' ? 'serif' : 'Apple SD Gothic Neo',*/
  },
  userInfoSection: { alignItems: 'center', marginTop: 20 },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cameraIcon: { width: 15, height: 14 },
  levelBar: {
    flexDirection: 'row',
  },
  purpleCircle: {
    backgroundColor: colors.lightIndigoTwo,
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
    borderColor: colors.lightIndigoTwo,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelCircleText: {
    fontSize: 10,
    letterSpacing: -0.45,
    color: colors.lightIndigoTwo,
  },
  subTitleWrapper: { flexDirection: 'row', alignItems: 'center' },
  writeIcon: { width: 14, height: 14 },
  writeButtonText: {
    fontSize: 15,
    letterSpacing: -0.38,
    color: colors.blueGrey,
    paddingLeft: 12,
  },
  scrapTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 34,
    paddingHorizontal: 22,
    marginBottom: 16,
  },
  borderBar: {
    height: 10,
    backgroundColor: colors.whiteTwo,
    marginTop: 40,
  },
  followSection: { marginVertical: 30 },
  followTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  followTitle: {
    fontSize: 16,
    letterSpacing: -0.4,
    color: colors.blackTwo,
    marginLeft: 10,
  },
  settingButtonWrapper: { marginTop: 18, paddingHorizontal: 20 },
  banner: {
    height: 80,
    width: '100%',
  },
  listContainer: { marginTop: 26, paddingHorizontal: 12 },
  writeButtonBox: { flexDirection: 'row', alignItems: 'center' },
});

const { width: wWidth } = Dimensions.get('window');
const ProfileIndex = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const [scrapIndex, setScrapIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [scrapArticles, setScrapArticles] = useState([]);
  const [scrapThreads, setScrapThreads] = useState([]);
  const [myComments, setMyComments] = useState([]);
  const [followingDatas, setFollowingDatas] = useState();
  const [followerDatas, setFollowerDatas] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [threads, setThreads] = useState([]);
  const [isLogoutPopup, setIsLogoutPopup] = useState(false);
  const userInfo = useSelector((state) => state.auth.principal);
  const docScrollRef = useRef(null);
  const [showHelp, setShowHelp] = useState(false);
  const [isImageExit, setisImageExit] = useState(false);
  const [isLongPressProfile, setIsLongPressProfile] = useState(false);

  
  console.log('principal', userInfo);

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      // Prevent default behavior
      e.preventDefault();
      dispatch(me());
      docScrollRef?.current.scrollTo({ y: 0 });
      // Do something manually
    });

    return unsubscribe;
  }, [navigation]);

   useEffect(() => {
    // getMultipleArticle(userInfo?.newsscraps).then((res) => {
    //   setScrapArticles(res.data.result?.filter((d) => d));
    // });

    getMyArticleScraps().then((res) => {
       setScrapArticles(res?.map((el) => el.article?.[0]));
    });

    getMyScrapThreads().then((scrapThreads) => {
        setScrapThreads(scrapThreads?.map((el) => el.thread?.[0]));
     // setScrapThreads(scrapThreads.filter((d) => d));
    });

    Promise.all([getArticleMyComments(), getThreadMyComments()]).then(
      (datas) => {
        console.log('myComments', datas.flat());
        setMyComments(
          datas
            .flat()
            .filter((d) => d)
            .sort(),
        );
      },
    );

    Promise.all([
      getUserFollowing(userInfo?.userId),
      getUserFollower(userInfo?.userId),
      getMyThreads(),
    ]).then((datas) => {
      console.log('threadsthreads', datas);
      setFollowingDatas(datas[0].data.docs);
      setFollowerDatas(datas[1].data.docs);
      setThreads(datas[2].data.docs);
    });
  }, [userInfo]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(me());
    setRefreshing(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(me());
      docScrollRef?.current?.scrollTo({ y: 0 })
    }, []),
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      onRefresh();
      docScrollRef?.current.scrollTo({ y: 0 });
      e.preventDefault();
    console.log('Usr Details');
    console.log(userInfo);
    Image.getSize(userInfo?.avatar, (width, height) => {
      if(width>0){
        setisImageExit(true);
      }
      else{
        setisImageExit(false);
      }
  }, () => {
    setisImageExit(false);
  });
    });

    return unsubscribe;
  }, [navigation]);
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
  if (!userInfo) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#c8c8c8" />
      </View>
    );
  }

  const rankData = getMemberRank(userInfo?.memberPoints);

  const handleLongPress = (data) => {
    setIsLongPressProfile(data);
  }
  return (
    <>
      <View style={{ height: 55 + inset.top, backgroundColor: colors.white }} />
      <Document
        footerContents={true}
        scrollRef={docScrollRef}
        scrollProps={{
          refreshControl: (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.aqua}
              colors={[colors.aqua, colors.aqua, colors.aqua]}
              progressBackgroundColor="#ffffff"
              title={`업데이트 :${moment().format('YYYY.MM.DD a h:MM')}`}
              />
          ),
        }}
      >
        <View style={styles.container}>
          {/* <Text style={styles.mainTitleText}>마이페이지</Text> */}
          <View style={styles.userInfoSection}>
            <View>
              <Image
                source={
                  isImageExit?  
                  {
                  uri: userInfo?.avatar,
                }:assets.defaultUserImg}
                style={styles.profileImage}
              />
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.cameraButton}
                onPress={() => {
                  setIsVisible(true);
                }}
              >
              <Image source={assets.icon_camera} style={styles.cameraIcon} />
              </TouchableOpacity>
               <SelectUserImage
                isVisible={isVisible}
                onCancel={() => {
                  setIsVisible(false);
                }}
                userId={userInfo?._id}
              />
            </View>
            <Text style={styles.userName}>{userInfo?.name}</Text>
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
              <Text
                style={[
                  styles.levelText,
                  {
                    left: 0,
                  },
                ]}
              >
                주린이
              </Text>
              <Text
                style={[
                  styles.levelText,
                  {
                    left: '25%',
                  },
                ]}
              >
                초보
              </Text>
              <Text
                style={[
                  styles.levelText,
                  {
                    left: '50%',
                  },
                ]}
              >
                중수
              </Text>
              <Text
                style={[
                  styles.levelText,
                  {
                    left: '75%',
                  },
                ]}
              >
                고수
              </Text>
              <Text
                style={[
                  styles.levelText,
                  {
                    left: '100%',
                  },
                ]}
              >
                신
              </Text>
            </View>
            <View style={styles.userLevelWrapper}>
              <Text style={styles.infoText}>회원님은 </Text>
              <View style={styles.levelCircle}>
                <Text style={styles.levelCircleText}>{rankData.grade}</Text>
              </View>
              <Text style={styles.infoText}> 등급입니다.</Text>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => {
                  Clipboard.setString(getToken());
                  setShowHelp(help.profileHelp)
                  // dispatch(toastShow('Dev::토큰 정보가 복사 되었습니다.'));
                }}
              >
                <Image
                  source={assets.icon_question}
                  style={{ width: 16, height: 16, marginLeft: 5 }}
                />
              </TouchableOpacity>
             </View>
          </View>
          <View style={styles.settingButtonWrapper}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.navigate('PasswordSecurity')}
            >
              <Text style={styles.buttonText}>비밀번호 및 보안</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={async () => {
                setIsLogoutPopup(true);
              }}
            >
              <Text style={styles.buttonText}>로그아웃</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={assets.banner_img}
            style={styles.banner}
            resizeMode={'contain'}
          />

          <View style={[styles.subTitle, { marginBottom: 25 }]}>
            <View style={styles.subTitleWrapper}>
              <Text style={styles.subTitleText}>활동​</Text>
            </View>

            {/* <TouchableOpacity
              activeOpacity={0.85}
              style={styles.writeButtonBox}
              onPress={() => {
                if (userInfo) {
                  navigation.navigate('PickWrite');
                } else {
                  Alert.alert('안내', '로그인 후 이용 가능합니다.');
                }
              }}
            >
              <Image source={assets.icon_write} style={styles.writeIcon} />
              <Text style={styles.writeButtonText}>PICK 작성</Text>
            </TouchableOpacity> */}
          </View>
          <TabProvider index={index} onChangeIndex={setIndex}>
            <TabBar type={'left'} />
            <TabScreens>
              <ProfilePick title={'작성 PICK'} threads={threads} />
              <ProfileComment data={myComments} title={'작성 댓글'} />
              {console.log(myComments,"PPPPPPPPP")}
              {/* <ProfileCommentPick title={'댓글단 글'} /> */}
            </TabScreens>
          </TabProvider>
          <View style={[styles.scrapTitleWrapper, { marginBottom: 25 }]}>
            <Text style={styles.subTitleText}>스크랩</Text>
          </View>
          <TabProvider index={scrapIndex} onChangeIndex={setScrapIndex}>
            <TabBar type={'left'} />
            <TabScreens>
              <ScrapNews title={'뉴스'} data={scrapArticles} />
              <ScrapPick title={'PICK'} data={scrapThreads} />
            </TabScreens>
          </TabProvider>

          <View style={styles.borderBar} />
          <View style={styles.followSection}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.followTitleWrapper}
              onPress={() => {
                // navigation.navigate('MyFollowList', {
                //   isFollower: true,
                //   following: followingDatas,
                //   followers: followerDatas,
                // });
              }}
            >
              <Text style={styles.followTitle}>팔로워</Text>
              {/* <Text style={styles.countText}>{followerDatas?.length || 0}</Text>
              <Image source={assets.arrow_push_right}
                resizeMode='contain'
                style={{
                  width: 15, height: 14, marginLeft: 3
                }} /> */}
            </TouchableOpacity>
            <FlatList
              data={followerDatas || []}
              horizontal={true}
              ListEmptyComponent={() => {
                return (
                  <Text style={{ marginLeft: 20 }}>팔로워가 없습니다</Text>
                );
              }}
              contentContainerStyle={styles.listContainer}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => {
                      navigation.navigate('OtherProfile', {
                        userId: item.userId,
                      });
                    }}
                  >
                    <ProfileRound item={item} />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View style={styles.followSection}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.followTitleWrapper}
              onPress={() => {
                // navigation.navigate('MyFollowList', {
                //   following: followingDatas,
                //   followers: followerDatas,
                // });
              }}
            >
              <Text style={styles.followTitle}>팔로잉</Text>
              {/* <Text style={styles.countText}>
                {followingDatas?.length || 0}
              </Text>
              <Image source={assets.arrow_push_right}
                resizeMode='contain'
                style={{
                  width: 15, height: 14, marginLeft: 3
                }} /> */}
            </TouchableOpacity>
            <FlatList
              data={followingDatas || []}
              horizontal={true}
              ListEmptyComponent={() => {
                return (
                  <Text style={{ marginLeft: 20 }}>팔로잉이 없습니다</Text>
                );
              }}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={0.85}
                  onLongPress={() => {
                    handleLongPress(true)
                  }}
                  onPress={() => {
                    handleLongPress(false);
                    navigation.navigate('OtherProfile', {
                      userId: item.userId,
                    });
                  }}
                >
                  <ProfileRound
                    deleteButton={true}
                    handleLongPress={handleLongPress}
                    isLongPressProfile={isLongPressProfile}
                    item={item}
                    onDelete={() => {
                      Alert.alert('안내', '팔로잉을 취소하시겠습니까?', [
                        { text: '취소' },
                        {
                          text: '확인',
                          onPress: async () => {
                            await removeFollowing(item.follower.user._id);
                            dispatch(me());
                          },
                        },
                      ]);
                    }}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <LogoutPopUp
          isVisible={isLogoutPopup}
          onCancel={() => setIsLogoutPopup(false)}
          onPress={async () => {
            dispatch(toastShow('로그아웃 되었습니다.'));
           // await AsyncStorage.removeItem('persist:root');
            await AsyncStorage.clear();
            await dispatch(clear());
            await dispatch(logOut(true));
            await navigation.popToTop();
            navigation.replace('UserExistStack');
          }}
        />

        <HelpPopup
          isVisible={!!showHelp}
          help={showHelp}
          onCancel={() => {
            setShowHelp(null);
          }}
          desclinetwo={help.profileHelp.desclinetwo}

        />
      </Document>
    </>
  );
};

export default ProfileIndex;
