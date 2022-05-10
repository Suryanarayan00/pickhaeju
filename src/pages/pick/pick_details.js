import React, { useState, useEffect, useRef } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions,

} from 'react-native';
import PickUser from '#components/PickUser';
import colors from '#common/colors';
import ReplyBlock from '#components/ReplyBlock';
import DefaultButton from '#components/Button/DefaultButton';
import AddComment from '#components/Input/AddComment';
import assets from '../../../assets';
import CheckButton from '#components/Button/CheckButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { pickOptionsTypes } from '../../widgets/pickwrite_sort';
import {
  companyGeneral,
} from '../../common/dataApi';
import {
  getSingleThread,
  threadAddLike,
  threadRemoveLike,
  threadAddScrap,
  addThreadComment,
  removeThreadComment,
  threadRemoveScrap,
  getMultipleThread,
  addThreadSubComment,
  getThreadComments,
  getThreadScraps,
  getThreadLikes,
} from '../../common/threadApi';
import { useNavigation, useRoute } from '@react-navigation/native';
import  RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { me } from '../../data/auth/actions';
import useKeyboard from '../../utils/useKeyboard';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getKeyboardState } from '../../components/KeyboardEvent';

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
  contentText: {
    fontSize: 14,
    letterSpacing: -0.35,
    color: colors.dark,
    marginTop: 34,
    marginBottom: 41,
    lineHeight: 19,
    flex: 1,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
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
  container: { backgroundColor: colors.white, flex: 1 },
  mainTextWrapper: { paddingHorizontal: 20, marginTop: 5 },
  titleText: { fontSize: 16, letterSpacing: -0.4, color: colors.dark },
  buttonInnerIcon: {
    width: 9,
    height: 10,
  },
  replySection: { paddingHorizontal: 20 },
  nameCardBox: {},
  nameCardBoxContentContainer: {
    flexDirection: 'row',
    paddingHorizontal: 0,
    justifyContent: 'flex-start',
  },
  imageStyleCircular: { width: 31, height: 31, borderRadius: 15 },

  stockName: {
    fontSize: 12,
    paddingTop: 6.5,
    textAlign: 'center',
  },
  secComp: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compHeaderText: {
    fontSize: 13,
    marginVertical: 15,
    color: colors.blueyGrey,
  },
  pickDetails: {
    fontSize: 14,
    textAlign: 'left',
    lineHeight: 20,
  },
  bulletlist: {
    height: 7, 
    width: 7, 
    backgroundColor: 'black', 
    borderRadius: 20, 
    marginLeft: 10, 
    marginTop: 12
  },
});
const data = [
  { id: 'dfda', title: 'dfda' },
  { id: 'dfds', title: 'dfds' },
  { id: 'dfdt', title: 'dfdt' },
  { id: 'dfdy', title: 'dfdy' },
];
// ('ow0L78zCqIbtapYjEeA3');

const PickDetails = (props) => {
  const inset = useSafeAreaInsets();
  const [like, setLike] = useState(false);
  const [scrap, setScrap] = useState(false);
  const [comment, setComment] = useState('');
  const [nestedReply, setNestedReply] = useState();
  const route = useRoute();
  const [threadData, setThreadData] = useState();
  const [tickerCompany, setTickerCompany] = useState([]);
  const [primaryCompany, setPrimaryCompany] = useState('');
  const [pickType, setPickType] = useState('');
  const [pickoptionType, setPickoptionType] = useState('');

  const [focusColor, setFocusColor] = useState(false);
  const [pcinfo, setPcinfo] = useState('');
  const [totalComments, setCommentsCount] = useState(0);
  const [bulletPoints, setBulletPoints] = useState([]);
  const [htmlContent, setHtmlContent] = useState([]);
  const scrollViewRef = useRef();
  
  const [keyboardHeight] = useKeyboard();
  const { userId } = useSelector((state) => state.auth.principal) || {};
  const principal = useSelector((s) => s.auth.principal, shallowEqual);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isKeyboardOpen = getKeyboardState();

   const getPickData = async () => {
    const data = await getSingleThread(route?.params?.threadId);
    const commentsList = await getThreadComments(route?.params?.threadId,principal?.userId);
    const threadScraps = await getThreadScraps(route?.params?.threadId);
    const threadLikes = await getThreadLikes(route?.params?.threadId);
    
    //   const subcomments = data?.data?.result?.subcomments?.filter((subData) => {
    //     return subData.parentId === d.id;
    //   });
    //   return {
    //     ...d,
    //     subcomments,
    //   };
    // });
    console.log('data?.primaryTicker');
    console.log(data);
    const prcInfo = await companyGeneral(data?.primaryTicker);
     setPcinfo(prcInfo);
   
 
     setBulletPoints(data?.summary.split(','));
    data.comments = commentsList;
    data.scraps = threadScraps.map((el) => el.userId);
    data.likes = threadLikes.map((el) => el.userId);

   

    setThreadData(data);
    setLike(data.likes?.includes?.(userId));
    setScrap(data?.scraps?.includes?.(userId));
    setTickerCompany(data?.tickers || []);
    setPrimaryCompany(data?.primaryTicker || '');

    let totalComment = commentsList?.reduce?.((acc, { subcomments }) => acc + subcomments?.length, commentsList?.length)
    console.log('total Comments');
    console.log(data);
    setCommentsCount(totalComment);

    switch (data?.type) {
      case 'shared':
        setPickType('일반 PICK');
        break;
      case 'exclusive':
        setPickType('단독 PICK');
        break;
      default:
        setPickType('Not Matched');
    }
    console.log(' data?.data?');
    console.log( data);
    let pickOption = data?.opinion;
    let pickSelData = pickOptionsTypes.filter(
      (picOpt) => picOpt.value == pickOption,
    )[0]?.text;
    setPickoptionType((pickSelData && pickSelData) || 'no option');


    var updatedContent = data?.content;
    const searchRegExp = /0/gi;
    const images = data?.images;
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const replaceText = `\\{${i}\\}`;
     
      const searchRegExp = new RegExp(`${replaceText}`, "g");
      updatedContent = updatedContent.replace(searchRegExp, `<img src="${image}">`);
    }

    setHtmlContent(updatedContent);
  };

  useEffect(() => {
    console.log('route?.params?.threadId,', route);
    getPickData();
  }, []);
  React.useEffect(() => {
    if(isKeyboardOpen){
     if(scrollViewRef?.current)
     scrollViewRef.current.scrollToEnd({ animated: true });
   }
   }, [isKeyboardOpen])

  useEffect(() => {
    if (route.params?.refresh) {
      getPickData();
      navigation.setParams({ refresh: false });
    }
  }, [route.params?.refresh]);

  if (!threadData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
  var result = "";
  if (threadData?.content) {
    const regex = /(<([^>]+)>)/gi;
    result = threadData?.content.replace(regex, '');
  }

  const onCommentButtonFunction = async () => {
    if (nestedReply) {
      await addThreadSubComment(
        route.params.threadId,
        nestedReply.id,
        comment,
      );
    } else {
      const result = await addThreadComment(
        route.params.threadId,
        comment,
      );
      console.log('result', result, nestedReply);
    }
    setComment('');
    setNestedReply(undefined);
    await getPickData();
  }

   const commentArea = () => {
    return (
      <>
        <AddComment
          value={comment}
          setValue={setComment}
          placeholder={
            nestedReply ? '답글을 남겨보세요.' : '댓글을 남겨보세요.'
          }
          changeFocusColor={changeFocusColor && changeFocusColor}
          focusColor={focusColor}
          nestedReply={nestedReply}
          //onFocus={scrollToBottom}
        />
        <View
          style={[
            styles.buttonFrame,
            // { paddingBottom: inset.bottom  },
          ]}
        >
          <DefaultButton
            disabled={!comment}
            focusColor = {comment == '' ? colors.paleGreyThree : colors.lightIndigo}
            onPress={async () => {
              if (nestedReply) {
                await addThreadSubComment(
                  route.params.threadId,
                  nestedReply._id,
                  comment,
                );
              } else {
                const result = await addThreadComment(
                  route.params.threadId,
                  comment,
                );
                console.log('result', result, nestedReply);
              }
              setComment('');
              setNestedReply(undefined);
              await getPickData();
            }}
          >
            {nestedReply ? '답글 등록' : '댓글 등록'}
          </DefaultButton>
          {/* <TouchableOpacity
            style={{ backgroundColor: 'gray', height: 50, width: 360, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text>{nestedReply ? '답글 등록' : '댓글 등록'}</Text>
          </TouchableOpacity> */}
        </View>
      </>
    );
  };

  const changeFocusColor = (value) => {
     setFocusColor(value);
    }

  //const systemFonts = [...defaultSystemFonts, 'Roboto-Regular', 'Roboto-Bold'];

   return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      ref={scrollViewRef}
    >
      <View style={styles.mainTextWrapper}>
        <Text style={styles.titleText}>{threadData?.title}</Text>
         <PickUser
          userData={threadData?.user}
          data={threadData}
          content={threadData?.content}
          title={threadData?.title}
          threadId={route?.params?.threadId}
          totalComments={totalComments}
        />

        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}
        >
          <View
            style={{
              borderColor: colors.lightIndigo,
              borderWidth: 1,
              borderRadius: 17,
              paddingVertical: 6,
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ fontSize: 14, color: colors.lightIndigo }}>
              {pickType}
            </Text>
          </View>
          <Text
            style={{ fontSize: 14, color: colors.lightIndigo, marginLeft: 20 }}
          >
            {pickoptionType}
          </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: 50 + '%' }}>
            <Text style={styles.compHeaderText}>주 종목</Text>
           
            <TouchableOpacity
                      onPress={() => {
                         let general = {};
                  general.ticker = tickerInfo;
                        navigation.navigate('PortfolioDetails', {
                          general: general,
                        });
                      }}
                    >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={{
                  uri: `https://storage.googleapis.com/pickhaeju-static/logo/${primaryCompany}.png`,
                }}
                style={[styles.imageStyleCircular, { marginRight: 10 }]}
              />
              <View>
                <Text style={{ color: colors.dark, fontSize: 14 }}>
                {pcinfo?.nameKo}
                </Text>
                <Text style={{ color: colors.blueyGrey, fontSize: 13 }}>
                  {pcinfo?.ticker}
                </Text>
              </View>
            </View>
            </TouchableOpacity>
        
          </View>
          <View style={{ width: 50 + '%' }}>
            <Text style={styles.compHeaderText}>부 종목</Text>
            <View style={styles.secComp}>
              <ScrollView
                contentContainerStyle={[styles.nameCardBoxContentContainer]}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                 {tickerCompany.map?.((tickerInfo, i) => {
                  let general = {};
                  general.ticker = tickerInfo;
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
                })}
              </ScrollView>
            </View>
          </View>
        </View>

      
                
        {/* <Text style={styles.contentText}>{threadData?.result?.content}</Text> */}
        <View style={{ minHeight: 100, marginTop: 30, paddingBottom: 30 }}>
     <View style={{marginBottom:10}}>
     {bulletPoints?.length > 0 && bulletPoints?.[0]!=""? 
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.bulletlist}></View>
        <Text style={{marginTop:5,marginLeft:10,fontSize:16}}>{bulletPoints?.length > 0 ? bulletPoints?.[0] : ''}</Text>
        </View>:null}
        {bulletPoints?.length > 1 && bulletPoints?.[1]!=""? 
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.bulletlist}></View>
        <Text style={{marginTop:5,marginLeft:10,fontSize:16}}>{bulletPoints?.length > 1 ? bulletPoints?.[1] : ''}</Text>
      </View>:null}
    {bulletPoints?.length > 2 && bulletPoints?.[2]!=""?  <View style={{ flexDirection: 'row' }}>
        <View style={styles.bulletlist}></View>
        <Text style={{marginTop:5,marginLeft:10,fontSize:16}}>{bulletPoints?.length > 2 ? bulletPoints?.[2] : ''}</Text>
      </View>:null}
     </View>
      
      <RenderHtml 
        contentWidth={Dimensions.get('window').width}
        source={{ html: htmlContent }} 
      tagsStyles={{p: {color:colors.dark,fontFamily: 'Roboto-Regular',fontSize:16,lineHeight:28,letterSpacing: -0.35},img:{ width: 100 + '%', height: 250,resizeMode:'contain'}}}
      />
         
         
          {/* <HTML source={{ html: threadData?.result?.content }} /> */}
          {/* <Text style={styles.contentText}>{result}</Text> */}
        </View>

        <View style={styles.buttonBox}>
          <TouchableOpacity
            onPress={async () => {
              if (!principal) return;
              if (!like) {
                const result = await threadAddLike(route?.params?.threadId);
                console.log('like', result);
                if (result.data) {
                  getPickData();
                  setLike(true);
                }
              } else {
                const result = await threadRemoveLike(route?.params?.threadId);
                console.log('like', result);
                if (result.data) {
                  getPickData();
                  setLike(false);
                }
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
                const result = await threadRemoveScrap(route?.params?.threadId);
                if (result.data) {
                  getPickData();
                }
              } else {
                const result = await threadAddScrap(
                  route?.params?.threadId,
                  threadData?.title,
                  threadData?.userId,
                );
                if (result.data) {
                  getPickData();
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
          {totalComments || 0}
          <Text style={{ color: colors.greyBlue }}>개의 댓글</Text>
        </Text>
        <View style={styles.borderBar} />
        <FlatList
          data={threadData?.comments || []}
          contentContainerStyle={{}}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.borderBar,
                {
                  paddingTop: 20,
                  paddingBottom: 18,
                },
              ]}
            >
               <ReplyBlock
                comment={item}
                userDetails={threadData?.user}
                id={route?.params?.threadId}
                onPressRemove={async (commentId) => {
                  await removeThreadComment(route?.params?.threadId, commentId);
                  await getPickData();
                  setComment('');
                }}
                setNestedReply={(data) => {

                  if (data?._id === nestedReply?._id) {
                    setNestedReply(undefined);
                  } else {
                    setNestedReply(data);
                  }
                }}
                nestedReply={nestedReply}
                onRefresh={getPickData}
              />
            </View>
          )}
        />
      </View>
      {!!principal && commentArea()}
    </ScrollView>
  );
};

export default PickDetails;
