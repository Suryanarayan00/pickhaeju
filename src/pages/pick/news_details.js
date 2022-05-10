import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Share,
} from 'react-native';
import colors from '#common/colors';
import ReplyBlock from '#components/ReplyBlock';
import AddComment from '#components/Input/AddComment';
import DefaultButton from '#components/Button/DefaultButton';
import assets from '../../../assets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { restApi } from '#common/api';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import HTML from 'react-native-render-html';
import WebView from 'react-native-webview';
import StockNameCard from '#components/StockNameCard';
import { getKeyboardState } from '../../components/KeyboardEvent';

import {
  companyGeneral,
} from '../../common/dataApi';
import {
  addlikeArticle,
  removelikeArticle,
  addCommentArticle,
  addScrapArticle,
  removeCommentArticle,
  removeScrapArticle,
  addSubCommentArticle,
  getArticle,
  getRelatedCompany,
  getArticleComments,
  getArticleScraps,
  getArticleLikes,
  addArticleView,
  getMyArticleLikes,
  getMyArticleScraps
} from '../../common/article';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { me } from '../../data/auth/actions';
import useKeyboard from '../../utils/useKeyboard';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import KeyboardSpace from '#components/KeyboardSpace';

 const styles = StyleSheet.create({
  buttonItem: {
    maxWidth: 110,
    width: '100%',
  },
  buttonWrapper_off: {
    height: 35,
    borderRadius: 17.5,
    borderColor: colors.cloudyBlue,
    borderWidth: 1,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonWrapper_on: {
    height: 35,
    borderRadius: 17.5,
    borderColor: colors.lightIndigo,
    borderWidth: 1,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText_off: {
    fontSize: 14,
    letterSpacing: -0.35,
    color: colors.blueyGrey,
    paddingLeft: 6,
  },
  buttonText_on: {
    fontSize: 14,
    letterSpacing: -0.35,
    color: colors.lightIndigo,
    paddingLeft: 6,
  },
  contentTextWrapper: {
    marginTop: 15,
    marginBottom: 41,
    paddingBottom: 30,
    flex: 1,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  greyBar: {
    marginTop: 41,
    height: 10,
    backgroundColor: colors.paleGreyThree,
  },
  commentCount: {
    fontSize: 16,
    color: colors.lightIndigo,
    letterSpacing: -0.4,
    marginTop: 24,
    marginBottom: 20,
  },
  borderBar: {
    borderBottomWidth: 1,
    borderBottomColor: colors.paleGreyThree,
  },

  buttonFrame: {
    paddingHorizontal: 20,
    marginVertical: 20,
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
  timeText: {
    fontSize: 13,
    color: colors.blueyGrey,
    letterSpacing: -0.32,
    marginTop: 15,
  },
  container: { backgroundColor: colors.white, flex: 1 },
  mainTextWrapper: { paddingHorizontal: 20, marginTop: 5 },
  titleText: { fontSize: 16, letterSpacing: -0.4, color: colors.dark },
  countBox: { flexDirection: 'row', marginTop: 12 },
  countIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },

  fullTextButton: {
    color: colors.blueyGrey,
    letterSpacing: -0.35,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  buttonBorder: {
    backgroundColor: colors.blueyGrey,
    height: 1,
    marginTop: 3,
    width: 40,
  },
  buttonInnerIcon: {
    width: 9,
    height: 10,
  },
  replySection: { paddingHorizontal: 20 },
  nameCardBox: {},
  nameCardBoxContentContainer: {
    flexDirection: 'row',
    paddingHorizontal: 0,
  },
  imageStyleCircular: { width: 30, height: 30, borderRadius: 15 },

  stockName: {
    fontSize: 12,
    paddingTop: 6.5,
    textAlign: 'center',
    marginTop:10
  },
  newDetails: {
    fontSize: 14,
    textAlign: 'left',
    lineHeight: 24,
  },
  shareIcon: {
    width: 15,
    height: 16.5,
  },
  title: {
    fontSize: 16,
    letterSpacing: -0.4,
  },
  nameCardBoxView: {
    marginBottom: 0
  },
  nameCardBoxContentContain: {
    flexDirection: 'row',
  },
  compHeaderText: {
    fontSize: 13,
    color: colors.blueyGrey,
    marginVertical:8
  },
  secComp: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageNewsStyle: { width: 100 + '%', height: 250,resizeMode:'contain'},

});

 const NewsDetails = (props) => {
  const [data, setData] = useState();
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const route = useRoute();
  const [like, setLike] = useState(false);
  const [focusColor, setFocusColor] = useState(false);
  const isKeyboardOpen = getKeyboardState();

  console.log('Get ID');
  console.log(route?.params?.id,"okokokokokopkopjihufvychtxrzxyrzyrxrtxhtxh");

  const [scrap, setScrap] = useState(false);
  const [comment, setComment] = useState('');
  const { userId } = useSelector((state) => state.auth.principal) || {};
  const dispatch = useDispatch();
  const [nestedReply, setNestedReply] = useState();
  const [keyboardHeight] = useKeyboard();
  const [tickerCompany, setTickerCompany] = useState([]);
  const principal = useSelector((s) => s.auth.principal, shallowEqual);
  const [dataComment, setDataComment] = useState([]);
  const [dataScraps, setDataScraps] = useState([]);
  const [dataLikes, setDataLikes] = useState([]);
  const [pcinfo, setPcinfo] = useState('');
  const [totalComments, setCommentsCount] = useState(0);

  React.useEffect(() => {
    if(isKeyboardOpen){
     if(scrollViewRef?.current)
     scrollViewRef.current.scrollToEnd({ animated: true });
   }
   }, [isKeyboardOpen])
  
  const loadData = async () => {
    const articleView =await addArticleView(route?.params?.id);
    const data = await getArticle(route?.params?.id);
    data.primaryTicker = data?.primaryTicker || data?.ticker || data?.tickers[0];
    const prcInfo = await companyGeneral(data?.primaryTicker);
     setPcinfo(prcInfo);
    
     console.log('load Data');
     console.log(data);

     setData(data);
    const articleComments = await getArticleComments(route?.params?.id,principal?.userId);
    const articleScraps = await getMyArticleScraps();
    const articleLikes = await getMyArticleLikes();
    console.log(articleScraps);
    setDataComment(articleComments);
    let totalComment = articleComments?.reduce?.((acc, { subcomments }) => acc + subcomments?.length, articleComments?.length)
    setCommentsCount(totalComment);
     setDataScraps(articleScraps.map((el) => el?.article?._id));
    setDataLikes(articleLikes.map((el) => el.article));
    let likeData = articleLikes.map((el) => el.article);
    let scrapData = articleScraps.map((el) => el?.article?._id);
    setLike(likeData ? likeData?.includes?.(route?.params?.id) : false);
    setScrap(
      scrapData ? scrapData?.includes?.(route?.params?.id) : false,
    );
  };

  const  refreshData = async() =>{
 
    const articleScraps = await getMyArticleScraps();
    const articleLikes = await getMyArticleLikes();
    setDataScraps(articleScraps.map((el) => el?.article?._id));
    setDataLikes(articleLikes.map((el) => el.article));
    let likeData = articleLikes.map((el) => el.article);
    let scrapData = articleScraps.map((el) => el?.article?._id);
    setLike(likeData ? likeData?.includes?.(route?.params?.id) : false);
    setScrap(
      scrapData ? scrapData?.includes?.(route?.params?.id) : false,
    );
    const articleView =await addArticleView(route?.params?.id);
    const data = await getArticle(route?.params?.id);
    data.primaryTicker = data?.primaryTicker || data?.ticker || data?.tickers[0];
    const prcInfo = await companyGeneral(data?.primaryTicker);
    console.log('get data Value');
    console.log(prcInfo);
    setPcinfo(prcInfo);
    
     setData(data);
  }


  useEffect(() => {
    loadData().catch(console.warn);
  }, [route?.params?.id]);
  const scrollViewRef = useRef();

  const shareMe = async () => {
    try {
      const title = data?.titleKo;
      const message = data?.summaryKo;
      const result = await Share.share({
        title: title,
        message: message,
        url: 'https://pickhaeju-9e5ca.firebaseapp.com/',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  if (!data) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Text style={{ fontSize: 14, color: '#666', marginBottom: 20 }}>
          종목 상세 데이터를 조회 중입니다.
        </Text>
        <ActivityIndicator color={'#666'} />
      </View>
    );
  }
  const { result, author } = data;

  console.log({ principal });

  const changeFocusColor = (value) => {
    setFocusColor(value);
}
  const commentArea = () => {
    return (
      <>
        <AddComment
          value={comment}
          setValue={setComment}
          placeholder={'댓글을 남겨보세요.'}
          nestedReply={nestedReply}
          changeFocusColor={changeFocusColor && changeFocusColor}
          focusColor={focusColor}
        />
        <View
          style={[
            styles.buttonFrame,
            // { paddingBottom: inset.bottom  },
          ]}
        >
          <DefaultButton
             focusColor={focusColor}
             disabled={!comment}
             onPress={async () => {
              if (nestedReply) {
                await addSubCommentArticle(
                  route.params.id,
                  nestedReply._id,
                  comment,
                );
              } else {
                const result = await addCommentArticle(
                  route.params.id,
                  comment,
                );
                console.log('result', result);
              }
              await loadData();
              setNestedReply(undefined);
              setComment('');
            }}
          >
            {nestedReply ? '답글 등록' : '댓글 등록'}
          </DefaultButton>
        </View>
      </>
    );
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      // onContentSizeChange={() => {
      //   if (nestedReply) {
      //     scrollViewRef.current.scrollToEnd({ animated: false });
      //   }
      // }}
      // contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      ref={scrollViewRef}
    >
      <View style={styles.mainTextWrapper}>
        <Text style={styles.titleText}>{data?.titleKo}</Text>
        <Text style={styles.timeText}>
          {moment(data?.publication_date).format('YYYY.MM.DD a h:MM')}
        </Text>
        <View
          style={[
            styles.borderBar,
            {
              marginTop: 20,
            },
          ]}
        />
        <View style={[styles.countBox, { justifyContent: 'space-between' }]}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.countWrapper}>
              <Image source={assets.icon_news_view} style={styles.countIcon} />
              <Text style={styles.countText}>{data?.views}</Text>
            </View>
            <View style={styles.countWrapper}>
              <Image
                source={assets.icon_news_comment}
                style={styles.countIcon}
              />
              <Text style={styles.countText}>
                {totalComments || 0}
              </Text>
            </View>
            <View style={styles.countWrapper}>
              <Image
                source={assets.icon_news_recomm}
                style={styles.countIcon}
              />
              <Text style={styles.countText}>{data?.likes || 0}</Text>
            </View>
             <View style={styles.countWrapper}>
              <Image source={assets.icon_news_clip} style={styles.countIcon} />
              <Text style={styles.countText}>
                {data?.scraps || 0}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={shareMe}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <Image source={assets.share_icon} style={styles.shareIcon} />
            </View>
          </TouchableOpacity>
        </View>
        {
          //Changing for Company List
        }
        <View style={{ flexDirection: 'row',marginTop: 10 }}>
        <View style={{ width: 50 + '%' }}>
            <Text style={[styles.compHeaderText]}>주 종목</Text>
             <TouchableOpacity
              onPress={() => {
                navigation.navigate('PortfolioDetails', {
                  general: {ticker:data.primaryTicker },
                });
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={{
                    uri: `https://storage.googleapis.com/pickhaeju-static/logo/${data?.primaryTicker}.png`,
                  }}
                  style={[styles.imageStyleCircular, { marginRight: 10 }]}
                />
                <View>
                  <Text style={{ color: colors.dark, fontSize: 14 }}>
                  {(pcinfo?.nameKo?.length > 7 ? pcinfo?.nameKo?.slice(0,pcinfo?.nameKo?.length/2)+"..." : pcinfo?.nameKo) || (pcinfo?.name?.length > 7 ? pcinfo?.name?.slice(0, pcinfo?.name?.length/2)+"..." : pcinfo?.name)}
                  </Text>
                  <Text style={{ color: colors.blueyGrey, fontSize: 13 }}>
                    {pcinfo?.ticker}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ width: 50 + '%' }}>
            <Text style={styles.compHeaderText}>연관 주식</Text>
            <View style={styles.secComp}>
              <ScrollView
                contentContainerStyle={[styles.nameCardBoxContentContainer]}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                 { data?.tickers && data?.tickers.slice(0, 6)?.map?.((tickerInfo, i) => {
                   console.log('tickerInfo Data');
                   console.log(tickerInfo);
                  let general = {};
                  general.ticker = tickerInfo;
                  if(i > 0)
                  {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('PortfolioDetails', {
                            general: general,
                          });
                        }}
                      >
                        <View>
                          <Image
                            source={{
                              uri: `https://storage.googleapis.com/pickhaeju-static/logo/${tickerInfo}.png`,
                            }}
                            style={[styles.imageStyleCircular,{marginRight:5}]}
                          />
                        </View>
                      </TouchableOpacity>
                    );
                  }
                 
                })}
              </ScrollView>
            </View>
          </View>
        </View>
      
        <View style={styles.contentTextWrapper}>
        
        {data?.imageUrl!=""?
         <View>
          <Image
            source={{
              uri: data?.imageUrl,
            }}
            style={[styles.imageNewsStyle]}
          />
        </View>:null
        }
       
          
          
           <Text style={{color:colors.dark,fontFamily: 'Roboto-Regular',fontSize:16,lineHeight:28,letterSpacing: -0.35}}>{data?.summaryKo}</Text> 
          {/* <HTML source={{ html: data?.summaryKo }} /> */}
        </View>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => {
            navigation.navigate('NewsOriginalText', {
              url: data?.url,
            });
          }}
          data={data}
        >
          <Text style={styles.fullTextButton}>원문보기</Text>
        </TouchableOpacity>
        <View style={styles.buttonBox}>
          <TouchableOpacity
            onPress={async () => {
              if (!principal) return;
              if (!like) {
                const result = await addlikeArticle(route?.params?.id);
                console.log('like add', result);
                // if (result.data.status === 200) {
                setLike(true);
                await refreshData();
                // }
              } else {
                const result = await removelikeArticle(route?.params?.id);
                console.log('like remove', result);
                // if (result.data.status === 200) {
                setLike(false);
                await refreshData();
                // }
              }
            }}
            activeOpacity={0.85}
            style={styles.buttonItem}
          >
            <View
              style={like ? styles.buttonWrapper_on : styles.buttonWrapper_off}
            >
              <Image
                source={
                  like ? assets.icon_news_recomm_color : assets.icon_news_recomm
                }
                style={styles.buttonInnerIcon}
              />
              <Text style={like ? styles.buttonText_on : styles.buttonText_off}>
                좋아요
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonItem}
            activeOpacity={0.85}
            onPress={async () => {
              if (!principal) return;
              if (scrap) {
                const result = await removeScrapArticle(route?.params?.id);
                if (result.data) {
                  setScrap(false);
                  await loadData();

                }
              } else {
                const result = await addScrapArticle(route?.params?.id);
                console.log('result', result);
                if (result.data) {
                  setScrap(true);
                  await loadData();
                  
                }
              }
            }}
          >
            <View
              style={scrap ? styles.buttonWrapper_on : styles.buttonWrapper_off}
            >
              <Image
                source={
                  scrap ? assets.icon_news_clip_color : assets.icon_news_clip
                }
                style={styles.buttonInnerIcon}
              />
              <Text
                style={scrap ? styles.buttonText_on : styles.buttonText_off}
              >
                스크랩
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.greyBar} />
      <View style={styles.replySection}>
        <Text style={styles.commentCount}>
          {dataComment ? dataComment?.length : 0}
          <Text style={{ color: colors.greyBlue }}>개의 댓글</Text>
        </Text>
        <View style={styles.borderBar} />
        <FlatList
          data={dataComment || []}
          contentContainerStyle={{}}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.borderBar,
                {
                  paddingTop: 20,
                  paddingBottom: 10,
                },
              ]}
            >
              <ReplyBlock
                comment={item}
                id={route?.params?.id}
                onPressRemove={async (commentId) => {
                  // Ryan's Comment: Not sure where commentId comes from
                  await removeCommentArticle(
                    route?.params?.id,
                    commentId._id || commentId,
                  );
                  await loadData();
                }}
                setNestedReply={(data) => {
                  // Ryan's Comment: Need to test this
                  if (data?._id === nestedReply?._id) {
                    setNestedReply(undefined);
                  } else {
                    setNestedReply(data);
                  }
                }}
                nestedReply={nestedReply}
                onRefresh={loadData}
              />
            </View>
          )}
        />
      </View>
      {!!principal && commentArea()}
      {/*<KeyboardSpace />*/}
    </KeyboardAwareScrollView>
  );
};

export default NewsDetails;
