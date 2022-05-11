import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  AppState,
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import assets from '../../assets';
import defStyle from '#common/defStyle';
import { BottomIcon, StackOptions, StackOptionsModal } from '#nav/utils';
import messaging from '@react-native-firebase/messaging'
import LandingIntro from '../pages/landing/intro';
import LandingIndex from '../pages/landing';
import LandingAgreement from '../pages/landing/agreement';
import LandingJoin from '../pages/landing/join_email';
import JoinPw from '../pages/landing/join_pw';
import JoinNickname from '../pages/landing/join_nickname';
import LandingLogin from '../pages/landing/login';
import SimplePassword from '../pages/landing/simple_password';
import LandingAgreementDetails from '../pages/landing/agreement_details';
import LandingFindId from '../pages/landing/find_id';
import LandingFoundId from '../pages/landing/found_id';
import LandingFindPw from '../pages/landing/find_pw';
import LandingFoundPw from '../pages/landing/found_pw';
import FoundFinish from '../pages/landing/found_finish';
import LandingFinish from '../pages/landing/finish';
import PortfolioIndex from '../pages/portfolio';
import PortfolioSearch from '../pages/portfolio/search';
import PasswordSecurity from '../pages/profile/security';
import PickIndex from '../pages/pick';
import PickWrite from '../pages/pick/write';
import PickPreview from '../pages/pick/preview';
import WatchList from '../pages/watchlist';
import WatchlistNotify from '../pages/watchlist/notify';
import NotifyIndex from '../pages/notify';
import Notice from '../pages/notify/notice';
import NoticeDetails from '../pages/notify/notice_details';
import NotifyFollower from '../pages/notify/follower';
import ProfileIndex from '../pages/profile';
import CommentPostListView from '../pages/profile/comment_post_list';
import WriteCommentListView from '../pages/profile/write_comment_list';
import WritePostListView from '../pages/profile/write_post_list';
import MyFollowList from '../pages/profile/my_follow_list';
import OtherFollowList from '../pages/profile/other_follow_list';
import OtherProfile from '../pages/profile/other_profile';
import ProfileSettings from '../pages/profile/settings';
import ModifyNickname from '../pages/profile/modify_nickname';
import ChangePassword from '../pages/profile/change_password';
import RecommendReason from '../pages/profile/recommend_reason';
import RecommendChange from '../pages/profile/recommend_change';
import RecommendIncome from '../pages/profile/recommend_income';
import RecommendWord from '../pages/profile/recommend_word';
import RecommendScale from '../pages/profile/recommend_scale';
import PickStatistics from '../pages/profile/statistics';
import PickListView from '../pages/pick/pick_list';
import NewsListView from '../pages/pick/news_list';
import PickDetails from '../pages/pick/pick_details';
import NewsDetails from '../pages/pick/news_details';
import NewsOriginalText from '../pages/pick/news_original_text';
import PortfolioDetails from '../pages/portfolio/details';
import PortfolioSettings from '../pages/portfolio/settings';
import MakeProfileAge from '../pages/make_profile/age';
import MakeProfileSpec from '../pages/make_profile/spec';
import MakeProfileDown from '../pages/make_profile/down';
import MakeProfileHaving from '../pages/make_profile/having';
import NotifySettings from '../pages/notify/settings';
import OptimizeRecomPopUp from '#components/OptimizeRecomPopUp';
import colors from '#common/colors';
import RecommendPopUp from '#components/RecommendPopUp';
import { restApi, setToken } from '#common/api';
import { me } from '../data/auth/actions';

import AsyncStorage from '@react-native-community/async-storage';
import SimplePasswordCheck from '../pages/profile/SimplePasswordCheck';
import { getSimplePwData } from '../utils/utils';
import { getCurrency,setViewPopUp } from '#data/common/actions';
import ScrapNewsList from '../pages/profile/ScrapNewsList';
import ScrapPickList from '../pages/profile/ScrapPickList';
import PickModify from '../pages/pick/PickModify';
import MakeProfile from '../pages/make_profile/make_profile';
import Toast from '#components/Toast/Toast';
import { getDevice, getModel, getVersion } from 'react-native-device-info';
import { toastShow } from '#data/toast/ToastAction';
import KeyboardSpace from '#components/KeyboardSpace';
import FeedIndex from '../pages/feeds';
import PickTalkIndex from '../pages/picktalk';




const styles = StyleSheet.create({
  logo: {
    width: 68,
    height: 30,
    marginLeft: 21,
  },
  headerRightText: {
    fontSize: 16,
    color: colors.blueGrey,
    marginRight: 20,
  },
  searchIcon: { width: 19, height: 19, marginRight: 23 },
  gearIcon: { width: 20, height: 20, marginRight: 23 },
  tabIcon_on: {
    width:21,height:21,
    opacity: 0,
    zIndex: 1,
    position: 'absolute',
  },
  tabIcon_off: { width:21,height:21,},
 
  labelView :{width:175,
    height:52,
    zIndex:9,
    position:'absolute', 
    left:0, 
    top:30, display:'flex', justifyContent:'center', alignItems:'center'
  },
});

const barStylesArray = ['default', 'dark-content', 'light-content'];

const TabBar = (props) => {
  return (
    <View style={{ marginTop: -15 }}>
      <View
        pointerEvents={'none'}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <View style={{ height: 18 }}>
          <Image
            source={assets.tab_deco}
            style={{
              width: '100%',
              height: 18,
              backgroundColor: 'transparent',
            }}
            resizeMode={'cover'}
            fadeDuration={0}
          />
        </View>
        <View style={{ backgroundColor: colors.white, flex: 1 }} />
      </View>
      <BottomTabBar
        {...props}
        style={{
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: 'transparent',
        }}
      />
    </View>
  );
};

const HomeTab = ({ navigation, route }) => {
  const [isVisible, setIsVisible] = useState(false);
  const TabNav = useMemo(() => createBottomTabNavigator(), []);
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  const { principal, isLogOut } = useSelector((s) => s.auth, shallowEqual);
  console.log('principal', principal);
  const appStateBefore = useRef(null);
  const [isShowAuth, setIsShowAuth] = useState(false);
  const dispatch = useDispatch();
  const getImage = (bool) => {
    // bool false = white
    if (bool) {
      return {
        logo: <Image source={assets.logo_white} style={styles.logo} />,
        icon: (
          <Image source={assets.icon_search_white} style={styles.searchIcon} />
        ),
      };
    } else {
      return {
        logo: <Image source={assets.logo} style={styles.logo} />,
        icon: (
          <Image source={assets.icon_search_color} style={styles.searchIcon} />
        ),
      };
    }
  };

  console.log({ principal });
  fcm
  const fcm = async () => {
    if (Platform.OS !== 'web') {
      const model = getModel()
      const version = getVersion()
      const enabled = await messaging().hasPermission();
      console.log({enabled}, ':::::::')
      if (!enabled) {
        const permission = await messaging().requestPermission()
        !!permission && setIsAuthorized(true);
      }
      const fcmToken = await messaging().getToken();
      const fcmTokenSt= await AsyncStorage.getItem('fcmToken');
      const userIdSt= await AsyncStorage.getItem('userId');

      if(userIdSt == principal?.userId && fcmTokenSt == fcmToken)
      {
       console.log('do nothing'); 
      }
      else
      {
        await restApi.post('/api/v3/device', {
          deviceToken: fcmToken,
          os: Platform.OS,
           userId: principal?.userId,
          version,
          model
        })
       await AsyncStorage.setItem('fcmToken',fcmToken);
       await AsyncStorage.setItem('userId',principal?.userId); 
      }   
    }
  }
  
  React.useEffect(() => {
   fcm();
  },[])
  // useEffect(() => {
  //   const routeName = getFocusedRouteNameFromRoute(route) || 'WatchList';
  //   const whiteHeaderRouteNames = ['WatchList', 'Portfolio'];
  //   console.log('routeName', routeName);
  //   if (whiteHeaderRouteNames.indexOf(routeName) > -1) {
  //     navigation.setOptions({
  //       headerLeft: () => (
  //         <TouchableOpacity activeOpacity={0.85}>
  //           <Image
  //             source={assets.logo_white}
  //             style={styles.logo}
  //             resizeMode="contain"
  //           />
  //         </TouchableOpacity>
  //       ),
  //       headerRight: () => (
  //         <TouchableOpacity
  //           activeOpacity={0.85}
  //           onPress={() => {
  //             navigation.navigate('');
  //           }}
  //         >
  //           <Image
  //             source={assets.icon_search_white}
  //             style={styles.searchIcon}
  //           />
  //         </TouchableOpacity>
  //       ),
  //     });
  //   } else {
  //     navigation.setOptions({
  //       headerLeft: () => {
  //         return (
  //           <>
  //             <RecommendPopUp
  //               isVisible={isVisible}
  //               onCacnel={() => setIsVisible(false)}
  //             />
  //             <TouchableOpacity
  //               activeOpacity={0.85}
  //               onPress={() => {
  //                 setIsVisible(true);
  //               }}
  //             >
  //               <Image
  //                 source={assets.logo}
  //                 style={styles.logo}
  //                 resizeMode="contain"
  //               />
  //             </TouchableOpacity>
  //           </>
  //         );
  //       },
  //       headerRight: () => (
  //         <TouchableOpacity
  //           activeOpacity={0.85}
  //           onPress={() => {
  //             navigation.navigate('NotifySettings');
  //           }}
  //         >
  //           <Image
  //             source={assets.icon_search_color}
  //             style={styles.searchIcon}
  //           />
  //         </TouchableOpacity>
  //       ),
  //     });
  //   }
  //   if (routeName === 'Notify') {
  //     navigation.setOptions({
  //       headerRight: () => (
  //         <TouchableOpacity
  //           activeOpacity={0.85}
  //           onPress={() => {
  //             navigation.navigate('NotifySettings');
  //           }}
  //         >
  //           <Image source={assets.icon_gear} style={styles.gearIcon} />
  //         </TouchableOpacity>
  //       ),
  //     });
  //   }
  //   if (routeName === 'MyProfile') {
  //     navigation.setOptions({
  //       headerRight: () => (
  //         <TouchableOpacity
  //           activeOpacity={0.85}
  //           onPress={() => {
  //             navigation.navigate('ProfileSettings');
  //           }}
  //         >
  //           <Image source={assets.icon_gear} style={styles.gearIcon} />
  //         </TouchableOpacity>
  //       ),
  //     });
  //   }
  // }, [navigation, route]);

  console.log(
    Platform.OS === 'web' ? 'Pick' : principal ? 'feed' : 'feed',
    ':::::Testing',
  );
  return (
    <>
      <TabNav.Navigator
        tabBarOptions={{
          showLabel: false,
          tabStyle: {
            backgroundColor: 'transparent',
          },
        }}
        tabBar={(props) => {
          return Platform.OS === 'web' ? null : <TabBar {...props} />;
        }}
        initialRouteName={
          Platform.OS === 'web' ? 'Pick' : principal ? 'feed' : 'feed'
        }
        screenOptions={({ route }) => ({
          tabBarButton: [
            'PortfolioSearchTab',
            'PortfolioDetailsTab',
          ]?.includes?.(route.name)
            ? () => {
                return null;
              }
            : undefined,
         })}
      >
        <TabNav.Screen
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              console.log({ e });
              if (!principal) {
                dispatch(toastShow('회원가입 후 이용할 수 있는 서비스입니다.'));
                navigation.replace('LandingIntro');
                return;
              }
              if (route.name && route.name.length > 0 && principal) {
                navigation.navigate(route.name);
              }
            },
          })}
          name={'Portfolio'}
          component={PortfolioIndex}
      
         options={{
            tabBarIcon: ({ focused }) => {
              console.log('focusedfocused', focused);
              return (
                <>
                  <Image
                     source={assets.Portfolio}
                    style={
                      focused
                        ? [styles.tabIcon_on, { opacity: 1}]
                        : [styles.tabIcon_on]
                    }
                    resizeMode={'contain'}
                  />
                  <Image
                     source={assets.PortfolioUnsel}
                    style={[styles.tabIcon_off,]}
                    resizeMode={'contain'}
                  />
                </>
              );
            },
          }}
        />
        <TabNav.Screen
          name={'WatchList'}
          component={WatchList}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              console.log({ e });
              if (!principal) {
                dispatch(toastShow('회원가입 후 이용할 수 있는 서비스입니다.'));
                navigation.replace('LandingIntro');
                return;
              }
              if (route.name && route.name.length > 0 && principal) {
                navigation.navigate(route.name);
              }
            },
          })}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <>
                  <Image
                    source={assets.Watchlist}
                    style={
                      focused
                        ? [styles.tabIcon_on, { opacity: 1 }]
                        : [styles.tabIcon_on]
                    }
                    resizeMode={'contain'}
                  />
                  <Image
                    source={assets.WatchlistUnsel}
                    style={styles.tabIcon_off}
                    resizeMode={'contain'}
                  />
                </>
              );
            },
          }}
        />

          

        <TabNav.Screen
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              console.log({ e });
              if (!principal) {
                dispatch(toastShow('회원가입 후 이용할 수 있는 서비스입니다.'));
                navigation.replace('LandingIntro');
                return;
              }
              if (route.name && route.name.length > 0 && principal) {
                navigation.navigate(route.name);
              }
            },
          })}
          name={'feed'}
          component={FeedIndex}
        />
           <TabNav.Screen
              listeners={({ navigation, route }) => ({
                tabPress: (e) => {
                  console.log({ e });
                  if (!principal) {
                    dispatch(toastShow('회원가입 후 이용할 수 있는 서비스입니다.'));
                    navigation.replace('LandingIntro');
                    return;
                  }
                  if (route.name && route.name.length > 0 && principal) {
                    navigation.navigate(route.name);
                  }
                },
              })}
              name={'picktalk'}
              component={PickTalkIndex}
            />



          <TabNav.Screen
          name={'Pick'}
          component={PickIndex}
          options={{
            tabBarIcon: ({ focused }) => {
              console.log('focusedfocused', focused);
              return (
                <>
                  <Image
                    source={assets.NewsPICK}
                    style={
                      focused
                        ? [styles.tabIcon_on, { opacity: 1 }]
                        : [styles.tabIcon_on]
                    }
                    resizeMode={'contain'}
                  />
                  <Image
                    source={assets.NewsPICKUnsel}
                    style={styles.tabIcon_off}
                    resizeMode={'contain'}
                  />
                </>
              );
            },
          }}
        />
        {/* <TabNav.Screen
          name={'Notify'}
          component={NotifyIndex}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              console.log({ e });
              if (!principal) {
                dispatch(toastShow('회원가입 후 이용할 수 있는 서비스입니다.'));
                navigation.replace('LandingIntro');
                return;
              }
              if (route.name && route.name.length > 0 && principal) {
                navigation.navigate(route.name);
              }
            },
          })}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <>
                  <Image
                    source={assets.icon_tab03_on}
                    style={
                      focused
                        ? [styles.tabIcon_on, { opacity: 1 }]
                        : [styles.tabIcon_on]
                    }
                    resizeMode={'contain'}
                  />
                  <Image
                    source={assets.icon_tab03_off}
                    style={styles.tabIcon_off}
                    resizeMode={'contain'}
                  />
                </>
              );
            },
          }}
        /> */}
        <TabNav.Screen
          name={'MyProfile'}
          component={ProfileIndex}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              if (!principal) {
                dispatch(toastShow('회원가입 후 이용할 수 있는 서비스입니다.'));
                navigation.replace('LandingIntro');
                return;
              }
              if (route.name && route.name.length > 0) {
                navigation.navigate(route.name);
              }
            },
          })}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <>
                  <Image
                     source={assets.MyProfile}
                    style={
                      focused
                        ? [styles.tabIcon_on, { opacity: 1 }]
                        : [styles.tabIcon_on]
                    }
                    resizeMode={'contain'}
                  />
                  <Image
                      source={assets.MyProfileUnsel}
                    style={styles.tabIcon_off}
                    resizeMode={'contain'}
                  />
                </>
              );
            },
          }}
        />
        <TabNav.Screen
          name={'PortfolioSearchTab'}
          component={PortfolioSearch}
        />
        <TabNav.Screen
          name={'PortfolioDetailsTab'}
          component={PortfolioDetails}
        />
      </TabNav.Navigator>
      {Platform.OS !== 'web' && (
        <BottomIcon
          onPress={() => {
            if (!principal) {
              dispatch(toastShow('회원가입 후 이용할 수 있는 서비스입니다.'));
              navigation.replace('LandingIntro');
              return;
            }
            navigation.navigate('feed', {
              refreshTime: new Date().getTime(),
            });
          }}
        />
      )}
    </>
  );
};

const MainStack = () => {
  const StackNav = useMemo(() => createStackNavigator(), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const appStateBefore = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isShowAuth, setIsShowAuth] = useState(false);
  const [isBio, setIsBio] = useState(false);
  const userInfo = useSelector((state) => state.auth.principal);
  const isView = useSelector((state) => state.common?.isView);

  const handleAppStateChange = async (currentAppState) => {
    const pwData = await getSimplePwData();
    if (
      currentAppState === 'active' &&
      appStateBefore.current === 'background'
    ) {
      if (pwData.isSecurity) {
        setIsShowAuth((prev) => {
          console.log('prev.', prev);
          return true;
        });
      }
    }
    appStateBefore.current = currentAppState;
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    getSimplePwData().then((pwData) => {
      if (pwData.isSecurity) {
        setIsShowAuth(true);
        setIsBio(pwData.isBio);
      }
    });
    return () => AppState.removeEventListener('change', handleAppStateChange);
  }, []);

  return (
    <>
      <StackNav.Navigator
        screenOptions={{
          ...StackOptions,
        }}
      >
        <StackNav.Screen
          name={'HomeTab'}
          component={HomeTab}
          options={({ route }) => {
            
            let routeName;
            if (userInfo) {
              routeName = getFocusedRouteNameFromRoute(route) || 'feed';
            } else {
              routeName = getFocusedRouteNameFromRoute(route) || 'feed';
            }
            // const routeName =
            //   getFocusedRouteNameFromRoute(route) || userInfo ? 'WatchList' : 'Pick';
            const whiteHeaderRouteNames = ['WatchList', 'Portfolio'];
            console.log('routeName', routeName);
            if (Platform.OS === 'web') return { headerTransparent: true };
            if (!!userInfo && whiteHeaderRouteNames.indexOf(routeName) > -1) {
              return {
                headerTransparent: true,
                headerLeft: () => (
                  <>
                    <RecommendPopUp
                      isVisible={isVisible}
                      onCancel={() => setIsVisible(false)}
                    />
                    <TouchableOpacity
                      style={{ zIndex: 10 }}
                      activeOpacity={0.85}
                      onPress={() => {
                       // dispatch(setViewPopUp(true));
                      // setIsVisible(true);
                      }}
                    > 
                      <Image
                        source={assets.logo_white}
                        style={styles.logo}
                        resizeMode="contain"
                      />
                     {/* {!isView && <ImageBackground  source={assets.pop_over}
                        resizeMode="contain" style={styles.labelView}>
                          <Text style={{fontSize:13,}}>종목 추천을 받아보세요!</Text>
                       </ImageBackground>}  */}
                    </TouchableOpacity>
                  </>
                ),
                headerRight: () => (
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => {
                      navigation.navigate('PortfolioSearchTab', {
                        mode: 'search',
                      });
                    }}
                  >
                    <Image
                      source={assets.icon_search_white}
                      style={styles.searchIcon}
                    />
                  </TouchableOpacity>
                ),
              };
            } else {
              console.log('!!!!');
              StatusBar.setBarStyle(barStylesArray[1]);
              if (routeName === 'Notify') {
                return {
                  headerTransparent: true,
                  headerLeft: () => {
                    return (
                      <View>
                        <RecommendPopUp
                          isVisible={isVisible}
                          onCancel={() => {
                            setIsVisible(false);
                          }}
                        />
                        <TouchableOpacity
                          style={{ zIndex: 10 }}
                          activeOpacity={0.85}
                          onPress={() => {
                            // setIsVisible(true);
                            // dispatch(setViewPopUp(true));
                          }}
                        >
                          <Image
                            source={assets.logo}
                            style={styles.logo}
                            resizeMode="contain"
                          />
                           {/* {!isView && <ImageBackground  source={assets.pop_over}
                        resizeMode="contain" style={styles.labelView}>
                          <Text style={{fontSize:13,}}>종목 추천을 받아보세요!</Text>
                       </ImageBackground>}   */}
                        </TouchableOpacity>
                      </View>
                    );
                  },
                  headerRight: () => (
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => {
                        navigation.navigate('NotifySettings');
                      }}
                    >
                      <Image
                        source={assets.icon_gear}
                        style={styles.gearIcon}
                      />
                    </TouchableOpacity>
                  ),
                };
              }
              if (routeName === 'MyProfile') {
                return {
                  headerTransparent: true,
                  headerLeft: () => {
                    return (
                      <View>
                        <RecommendPopUp
                          isVisible={isVisible}
                          onCancel={() => {
                            setIsVisible(false);
                            dispatch(setViewPopUp(true));
                          }}
                        />
                        <TouchableOpacity
                          style={{ zIndex: 10 }}
                          activeOpacity={0.85}
                          onPress={() => {
                           // setIsVisible(true);
                          }}
                        >
                          <Image
                            source={assets.logo}
                            style={styles.logo}
                            resizeMode="contain"
                          />
                              {/* {!isView && <ImageBackground  source={assets.pop_over}
                        resizeMode="contain" style={styles.labelView}>
                          <Text style={{fontSize:13,}}>종목 추천을 받아보세요!</Text>
                       </ImageBackground>}  */}

                        </TouchableOpacity>
                      </View>
                    );
                  },
                  headerRight: () => (
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => {
                        navigation.navigate('ProfileSettings');
                      }}
                    >
                      <Image
                        source={assets.icon_gear}
                        style={styles.gearIcon}
                      />
                    </TouchableOpacity>
                  ),
                };
              }
              if (routeName === 'Pick') {
                console.log('here');
                return {
                  headerTransparent: true,
                  headerLeft: () => {
                    return (
                      <>
                        <TouchableOpacity
                          style={{ zIndex: 10 }}
                          activeOpacity={0.85}
                          onPress={() => {
                            // setIsVisible(true);
                            // dispatch(setViewPopUp(true));

                          }}
                        >
                          <Image
                            source={assets.logo}
                            style={styles.logo}
                            resizeMode="contain"
                            onPress={() => {
                             // setIsVisible(true);
                            }}
                          />
                           {/* {!isView && <ImageBackground  source={assets.pop_over}
                        resizeMode="contain" style={styles.labelView}>
                          <Text style={{fontSize:13,}}>종목 추천을 받아보세요!</Text>
                       </ImageBackground>}  */}
                        
                        </TouchableOpacity>
                        <RecommendPopUp
                          isVisible={isVisible}
                          onCancel={() => setIsVisible(false)}
                        />
                      </>
                    );
                  },
                  headerRight: () => (
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => {
                        navigation.navigate('PortfolioSearchTab', {
                          mode: 'search',
                        });
                      }}
                    >
                      <Image
                        source={assets.icon_search_color}
                        style={styles.searchIcon}
                      />
                    </TouchableOpacity>
                  ),
                };
              }
              if (routeName === 'feed') {
                console.log('here');
                return {
                  headerTransparent: true,
                  headerLeft: () => {
                    return (
                      <>
                        <TouchableOpacity
                          style={{ zIndex: 10 }}
                          activeOpacity={0.85}
                          onPress={() => {
                            // setIsVisible(true);
                            // dispatch(setViewPopUp(true));

                          }}
                        >
                          <Image
                            source={assets.logo}
                            style={styles.logo}
                            resizeMode="contain"
                            onPress={() => {
                             // setIsVisible(true);
                            }}
                          />      
                        </TouchableOpacity>
                        <RecommendPopUp
                          isVisible={isVisible}
                          onCancel={() => setIsVisible(false)}
                        />
                      </>
                    );
                  },
                  headerRight: () => (
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => {
                        navigation.navigate('PortfolioSearchTab', {
                          mode: 'search',
                        });
                      }}
                    >
                      <Image
                        source={assets.icon_search_color}
                        style={styles.searchIcon}
                      />
                    </TouchableOpacity>
                  ),
                };
              }
              if (routeName === 'PortfolioDetailsTab') {
                return {
                  headerLeft: () => {
                    return (
                      <>
                        <RecommendPopUp
                          isVisible={isVisible}
                          onCancel={() => setIsVisible(false)}
                        />
                        <TouchableOpacity
                          style={{ zIndex: 10 }}
                          activeOpacity={0.85}
                          onPress={() => {
                           // setIsVisible(true);
                          }}
                        >
                          <Image
                            source={assets.logo}
                            style={styles.logo}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                      </>
                    );
                  },
                  headerRight: () => (
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => {
                        navigation.navigate('PortfolioSearchTab', {
                          mode: 'search',
                        });
                      }}
                    >
                      <Image
                        source={assets.icon_search_color}
                        style={styles.searchIcon}
                      />
                    </TouchableOpacity>
                  ),
                };
              }
              if (routeName === 'PortfolioSearchTab') {
                return {
                  headerTransparent: true,
                };
              }
            }
          }}
        />
        <StackNav.Screen
          name={'PickListView'}
          component={PickListView}
          options={{ title: 'PICK' }}
        />
        <StackNav.Screen
          name={'PickDetails'}
          component={PickDetails}
          options={{ title: 'PICK' }}
        />
        <StackNav.Screen
          name={'NewsListView'}
          component={NewsListView}
          options={{ title: '뉴스' }}
        />
        <StackNav.Screen
          name={'NewsDetails'}
          component={NewsDetails}
          options={{ title: '뉴스' }}
        />
        <StackNav.Screen
          name={'NewsOriginalText'}
          component={NewsOriginalText}
        />
        <StackNav.Screen
          name={'PortfolioSettings'}
          component={PortfolioSettings}
          options={{ title: '포트폴리오 설정' }}
        />
        <StackNav.Screen
          name={'PortfolioSearch'}
          component={PortfolioSearch}
          options={{ title: '종목 추가하기' }}
        />
        <StackNav.Screen
          name={'PortfolioDetails'}
          component={PortfolioDetails}
          options={{
            headerRight: () => (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => {
                  navigation.navigate('PortfolioSearchTab', {
                    mode: 'search',
                  });
                }}
              >
                <Image
                  source={assets.icon_search_color}
                  style={styles.searchIcon}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <StackNav.Screen
          name={'NotifySettings'}
          component={NotifySettings}
          options={{ title: '알림 설정' }}
        />
        <StackNav.Screen
          name={'Notice'}
          component={Notice}
          options={{ title: '공지사항' }}
        />
        <StackNav.Screen
          name={'NoticeDetails'}
          component={NoticeDetails}
          options={{ title: '공지사항' }}
        />
        <StackNav.Screen
          name={'PickWrite'}
          component={PickWrite}
          options={{ title: 'PICK 작성' }}
        />
        <StackNav.Screen
          name={'PickPreview'}
          component={PickPreview}
          options={{ title: 'PICK 미리보기' }}
        />
        <StackNav.Screen name={'Notify'} component={NotifyIndex} />
        <StackNav.Screen
          name={'OtherProfile'}
          component={OtherProfile}
          options={{
            headerTitle: () => {
              return (
                <Image
                  source={assets.logo}
                  style={[
                    styles.logo,
                    { marginLeft: Platform.OS === 'android ' ? 5 : 0 },
                  ]}
                  resizeMode="contain"
                />
              );
            },
          }}
        />
        <StackNav.Screen name={'MakeProfile'} component={MakeProfile} />
        <StackNav.Screen name={'MakeProfileAge'} component={MakeProfileAge} />
        <StackNav.Screen name={'MakeProfileSpec'} component={MakeProfileSpec} />
        <StackNav.Screen name={'MakeProfileDown'} component={MakeProfileDown} />
        <StackNav.Screen
          name={'MakeProfileHaving'}
          component={MakeProfileHaving}
        />
        <StackNav.Screen
          name={'NotifyFollower'}
          component={NotifyFollower}
          options={{ title: '팔로워별 알림 설정' }}
        />
        <StackNav.Screen
          name={'ProfileSettings'}
          component={ProfileSettings}
          options={{ title: '프로필 설정' }}
        />
        <StackNav.Screen
          name={'ModifyNickname'}
          component={ModifyNickname}
          options={{ title: '닉네임 수정' }}
        />
        <StackNav.Screen name={'RecommendReason'} component={RecommendReason} options={{animationEnabled: false}}/>
        <StackNav.Screen name={'RecommendChange'} component={RecommendChange} options={{animationEnabled: false}}/>
        <StackNav.Screen name={'RecommendIncome'} component={RecommendIncome} options={{animationEnabled: false}}/>
        <StackNav.Screen name={'RecommendWord'} component={RecommendWord} options={{animationEnabled: false}}/>
        <StackNav.Screen name={'RecommendScale'} component={RecommendScale} options={{animationEnabled: false}}/>
        <StackNav.Screen
          name={'PasswordSecurity'}
          component={PasswordSecurity}
          options={{ title: '비밀번호 및 보안' }}
        />
        <StackNav.Screen
          name={'ChangePassword'}
          component={ChangePassword}
          options={{ title: '비밀번호 변경' }}
        />
        <StackNav.Screen
          name={'WatchlistNotify'}
          component={WatchlistNotify}
          options={{ title: '관심목록 알림 설정' }}
        />
        <StackNav.Screen
          name={'PickStatistics'}
          component={PickStatistics}
          options={{ title: 'PICK 통계' }}
        />
        <StackNav.Screen
          name={'CommentPostListView'}
          component={CommentPostListView}
          options={{ title: '댓글단 글' }}
        />
        <StackNav.Screen
          name={'WritePostListView'}
          component={WritePostListView}
          options={{ title: '작성 PICK' , animationEnabled: false }}
        />
        <StackNav.Screen
          name={'WriteCommentListView'}
          component={WriteCommentListView}
          options={{ title: '작성 댓글' , animationEnabled: false }}
        />
        <StackNav.Screen
          name={'MyFollowList'}
          component={MyFollowList}
          options={{ title: `${userInfo?.name}` }}
        />
        <StackNav.Screen
          name={'OtherFollowList'}
          component={OtherFollowList}
          options={{ title: '[타인의 닉네임]' }}
        />
        <StackNav.Screen
          name={'OptimizeRecomPopUp'}
          component={OptimizeRecomPopUp}
        />
        <StackNav.Screen
          name={'SimplePassword'}
          component={SimplePassword}
          options={{
            headerShown: false,
          }}
        />
      
        <StackNav.Screen
          name={'ScrapNewsList'}
          component={ScrapNewsList}
          options={{ title: '스크랩 뉴스', animationEnabled: false }}
        />
        <StackNav.Screen
          name={'ScrapPickList'}
          component={ScrapPickList}
          options={{ title: '스크랩 PICK' , animationEnabled: false}}
        />
        <StackNav.Screen
          name={'PickModify'}
          component={PickModify}
          options={{ title: 'Pick 수정' }}
        />
        <StackNav.Screen
          name={'LandingIntro'}
          component={LandingIntro}
          options={{ headerShown: false }}
        />
      </StackNav.Navigator>
      {Platform.OS !== 'web' && (
        <View>
          <Modal
            style={{ margin: 0 }}
            isVisible={isShowAuth}
            presentationStyle="overFullScreen"
          >
            <SimplePasswordCheck
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: 21,
              }}
              setIsShowAuth={setIsShowAuth}
              navigation={navigation}
              isBio={isBio}
              isShowAuth={isShowAuth}
            />
          </Modal>
        </View>
      )}
      {/*<View*/}
      {/*  style={{*/}
      {/*    position: 'absolute',*/}
      {/*    top: 0,*/}
      {/*    left: 0,*/}
      {/*    right: 0,*/}
      {/*    bottom: 0,*/}
      {/*    backgroundColor: 'rgba(0,0,0,0.8)',*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<View*/}
      {/*  style={{*/}
      {/*    position: 'absolute',*/}
      {/*    bottom: inset.bottom,*/}
      {/*    zIndex: 20,*/}
      {/*    left: width / 2 - 67 / 2,*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Image*/}
      {/*    source={assets.tab_center}*/}
      {/*    style={{ width: 67, height: 67 }}*/}
      {/*    resizeMode={'cover'}*/}
      {/*  />*/}
      {/*</View>*/}
    </>
  );
};

const IntroStack = () => {
  const StackNav = useMemo(() => createStackNavigator(), []);
  const navigation = useNavigation();
  const { principal} = useSelector((v) => v.auth, shallowEqual);
  return (
    <StackNav.Navigator initialRouteName={principal?'JoinNickname':'LandingIndex'} screenOptions={StackOptions}>
      <StackNav.Screen
        name={'LandingIndex'}
        component={LandingIndex}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <StackNav.Screen
        name={'LandingAgreement'}
        component={LandingAgreement}
        options={{
          headerLeft: () => (
            <Image
              source={assets.logo}
              style={styles.logo}
              resizeMode="contain"
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.navigate('LandingIntro')}
            >
              <Text style={styles.headerRightText}>취소</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <StackNav.Screen
        name={'LandingAgreementDetails'}
        component={LandingAgreementDetails}
      />
      <StackNav.Screen
        name={'LandingJoin'}
        component={LandingJoin}
        options={{
          headerLeft: () => (
            <Image
              source={assets.logo}
              style={styles.logo}
              resizeMode="contain"
            />
          ),
        }}
      />
      <StackNav.Screen
        name={'LandingFindId'}
        component={LandingFindId}
        options={{ title: '이메일 / 비밀번호 찾기' }}
      />
      <StackNav.Screen
        name={'LandingFoundId'}
        component={LandingFoundId}
        options={{ title: '이메일 조회 결과' }}
      />
      <StackNav.Screen
        name={'LandingFindPw'}
        component={LandingFindPw}
        options={{ title: '비밀번호 재설정' }}
      />
      <StackNav.Screen
        name={'LandingFoundPw'}
        component={LandingFoundPw}
        options={{ title: '비밀번호 재설정' }}
      />
      <StackNav.Screen
        name={'FoundFinish'}
        component={FoundFinish}
        options={{ title: '비밀번호 재설정' }}
      />
      <StackNav.Screen
        name={'JoinPw'}
        component={JoinPw}
        options={{
          headerLeft: () => (
            <Image
              source={assets.logo}
              style={styles.logo}
              resizeMode="contain"
            />
          ),
        }}
      />
      <StackNav.Screen
        name={'JoinNickname'}
        component={JoinNickname}
        options={{
          headerLeft: () => (
            <Image
              source={assets.logo}
              style={styles.logo}
              resizeMode="contain"
            />
          ),
        }}
      />
      <StackNav.Screen
        name={'LandingIntro'}
        component={LandingIntro}
        options={{ headerShown: false }}
      />
      <StackNav.Screen
        name={'MakeProfile'}
        component={MakeProfile}
        options={{
          headerLeft: () => (
            <Image
              source={assets.logo}
              style={styles.logo}
              resizeMode="contain"
            />
          ),
        }}
      />
      <StackNav.Screen
        name={'MakeProfileAge'}
        component={MakeProfileAge}
        options={{
          headerLeft: () => (
            <Image
              source={assets.logo}
              style={styles.logo}
              resizeMode="contain"
            />
          ),
        }}
      />
      <StackNav.Screen
        name={'MakeProfileSpec'}
        component={MakeProfileSpec}
        options={{
          headerLeft: () => (
            <Image
              source={assets.logo}
              style={styles.logo}
              resizeMode="contain"
            />
          ),
        }}
      />
      <StackNav.Screen
        name={'MakeProfileDown'}
        component={MakeProfileDown}
        options={{
          headerLeft: () => (
            <Image
              source={assets.logo}
              style={styles.logo}
              resizeMode="contain"
            />
          ),
        }}
      />
      <StackNav.Screen
        name={'MakeProfileHaving'}
        component={MakeProfileHaving}
        options={{
          headerLeft: () => (
            <Image
              source={assets.logo}
              style={styles.logo}
              resizeMode="contain"
            />
          ),
        }}
      />
      <StackNav.Screen
        name={'LandingLogin'}
        component={LandingLogin}
        options={{ headerShown: false }}
      />

      <StackNav.Screen
        name={'LandingFinish'}
        component={LandingFinish}
        options={{
          headerLeft: () => (
            <Image
              source={assets.logo}
              style={styles.logo}
              resizeMode="contain"
            />
          ),
        }}
      />
      <StackNav.Screen
        name={'SimplePassword'}
        component={SimplePassword}
        options={{
          headerShown: false,
        }}
      />
    </StackNav.Navigator>
  );
};

const UserExistStack = () => {
  const StackNav = useMemo(() => createStackNavigator(), []);
  const navigation = useNavigation();
  return (
    <StackNav.Navigator screenOptions={StackOptions}>
      
      <StackNav.Screen
        name={'LandingLogin'}
        component={LandingLogin}
        options={{ headerShown: false }}
      />

      <StackNav.Screen
        name={'LandingFinish'}
        component={LandingFinish}
        options={{
          headerLeft: () => (
            <Image
              source={assets.logo}
              style={styles.logo}
              resizeMode="contain"
            />
          ),
        }}
      />
      <StackNav.Screen
        name={'SimplePassword'}
        component={SimplePassword}
        options={{
          headerShown: false,
        }}
      />
    </StackNav.Navigator>
  );
};
const AppContainer = () => {
  const StackNav = useMemo(() => createStackNavigator(), []);
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  const nav = useRef();
  const { principal, isLogOut } = useSelector((v) => v.auth, shallowEqual);
  console.log(principal, 'this is principle and ')
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Login
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        console.log('token', token, isLogOut);
        if (token) {
          setToken(token);
          // console.log(`::token::\n\n${token}\n\n`);
          await dispatch(me());
          await dispatch(getCurrency());
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    loadData().catch(console.warn);
  }, []);

  return loading ? null : (
    <View style={defStyle.flex1}>
      <NavigationContainer ref={nav}>
        <StackNav.Navigator
          mode={'modal'}
          screenOptions={{
            ...StackOptionsModal,
            headerShown: false,
            headerTransparent: true,
          }}
          initialRouteName={(principal&& principal?.name!='') ?'MainStack' : isLogOut ? 'UserExistStack' : 'IntroStack'}
         //initialRouteName={principal ?'IntroStack' : isLogOut ? 'UserExistStack' : 'IntroStack'}
        >
          <StackNav.Screen name={'IntroStack'} component={IntroStack} />
          <StackNav.Screen name={'UserExistStack'} component={UserExistStack} />

          <StackNav.Screen
            name={'MainStack'}
            component={MainStack}
            options={({ route }) => {
              const routeName = getFocusedRouteNameFromRoute(route);
              console.log('routeName!!!', routeName);
              if (routeName !== 'HomeTab') {
                StatusBar.setBarStyle(barStylesArray[1]);
              }
              return {
                gestureEnabled: false,
              };
            }}
          />
        </StackNav.Navigator>
        <Toast />
      </NavigationContainer>
    </View>
  );
};

export default React.memo(AppContainer);
