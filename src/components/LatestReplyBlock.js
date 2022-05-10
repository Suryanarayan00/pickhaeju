import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";
import colors from "#common/colors";
import assets from "../../assets";
import moment from "moment";
import DeletePickPopUp from "./DeletePickPopUp";
import BottomModal from "#components/Modal/BottomModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomButton from "#components/Button/BottomButton";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import {
  pickTalklistdata,
  addPickTalk,
  addPickTalkComment,
  addPickTalkLike,
  removePickTalkLike,
  addPickTalkCommentLike,
  removePickTalkCommentLike,
} from "../common/pickTalkApi";
import { searchtickers } from "#common/dataApi";
import { lastIndexOf } from "lodash";
import { useSelector } from "react-redux";
import { getProfile, getProfiles } from "#common/usersApi";

const styles = StyleSheet.create({
  mainCommentWrapper: {
    paddingHorizontal: 20,
  },
  menuWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 10,
  },
  flexWrapper: {
    flexDirection: "row",
    width: "50%",
  },
  textRight: {
    justifyContent: "flex-end",
  },
  commentReplyWrapper: {
    marginTop: 10,
  },
  newsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomColor: colors.lightPeriwinkle,
    borderBottomWidth: 1,
    paddingBottom: 15,
    paddingTop: 32,
  },
  title: {
    fontSize: 18,
    color: colors.dark,
  },
  commentWrapper: {
    marginTop: 10,
    marginBottom: 10,
  },
  commentedRow: {
    flexDirection: "row",
    borderColor: "#eeeff5",
    borderWidth: 1.5,
    borderRadius: 5,
    borderBottomLeftRadius: 0,
    backgroundColor: "#eeeff5",
    padding: 18.5,
    paddingLeft: 0,
    marginTop: -15,
  },
  topBar: {
    flexDirection: "row",
    zIndex: 1,
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    justifyContent: "space-between",
  },
  bottomSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  userName: {
    fontSize: 13,
    letterSpacing: -0.33,
    color: colors.greyBlue,
    fontWeight: "700",
  },
  userProfile: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderColor: colors.lightIndigo,
    borderWidth: 1,
    marginLeft: 5,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  userProfileText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.lightIndigo,
  },
  timeText: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: -0.32,
    color: colors.cloudyBlue,
  },
  middleSection: {
    // flexDirection: 'row',
  },
  iconImgStyle: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  contents: {
    fontSize: 14,
    letterSpacing: -0.35,
    color: colors.dark,
  },
  subContents: {
    fontSize: 13,
    letterSpacing: -0.33,
    color: colors.blueyGrey,
    marginTop: 6,
  },
  purpleText: {
    color: colors.lightIndigo,
  },
  countText: {
    color: colors.blueyGrey,
    letterSpacing: -0.32,
    fontSize: 13,
  },
  countWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  textButton: {
    fontSize: 13,
    letterSpacing: -0.32,
    color: colors.cloudyBlue,
  },
  userImage: {
    width: 43,
    height: 43,
    borderRadius: 22,
    borderWidth: 6.5,
    borderColor: "#fff",
    marginLeft: -6.5,
  },
  userImageBlank: {
    width: 43,
    height: 43,
    borderRadius: 22,
    borderWidth: 0,
    borderColor: "#fff",
    marginLeft: -6.5,
  },
  userImageNormal: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#fff",
  },
  replyWrapper: {
    marginLeft: 10,
    flex: 1,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  bullet: {
    color: colors.cloudyBlueTwo,
    marginHorizontal: 4,
  },
  dots: {
    fontSize: 30,
    lineHeight: 20,
    color: colors.cloudyBlueTwo,
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  countBox: {
    flexDirection: "row",
  },
  iconStyle: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  circleImageSmall: {
    width: 20,
    height: 20,
    borderRadius: 12,
    marginLeft: 8,
  },
  purpleBorder: {
    width: 23,
    height: 23,
    borderColor: colors.lightIndigo,
    borderWidth: 1.5,
  },
  /* Trangular Icon */
  talkBubbleTrangleLeft: {
    position: "absolute",
    left: 0,
    bottom: -16.5,
    zIndex: 1,
  },
  trangleBorderLeft: {
    width: 0,
    height: 0,
    borderTopWidth: 18,
    borderTopColor: "#eeeff5",
    borderRightWidth: 21,
    borderRightColor: "transparent",
  },
  trangleBgColorLeft: {
    position: "absolute",
    top: 0,
    left: 1.5,
    width: 0,
    height: 0,
    borderTopWidth: 14.5,
    borderTopColor: "#eeeff5",
    borderRightWidth: 17,
    borderRightColor: "transparent",
  },
  talkBubbleTrangleRight: {
    position: "absolute",
    right: 0,
    bottom: -16.5,
    zIndex: 1,
  },
  trangleBorderRight: {
    width: 0,
    height: 0,
    borderTopWidth: 18,
    borderTopColor: "#eeeff5",
    borderLeftWidth: 21,
    borderLeftColor: "transparent",
  },
  trangleBgColorRight: {
    position: "absolute",
    top: 0,
    right: 1.5,
    width: 0,
    height: 0,
    borderTopWidth: 14.5,
    borderTopColor: "#eeeff5",
    borderLeftWidth: 17,
    borderLeftColor: "transparent",
  },

  // Bottom Search Area Code
  inputAreaWrapper: {
    // position: 'absolute',
    // bottom: 0,
    // zIndex:1,
    backgroundColor: "#fff",
    borderTopColor: "#eee",
    borderTopWidth: 1,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  inputIconcover: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputcover: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    maxHeight: 40,
    lineHeight: 18,
  },
  inputField: {
    fontSize: 14,
    letterSpacing: -0.35,
    width: "94%",
    paddingRight: 10,
  },
  sendButton: {
    width: 22,
    minWidth: 22,
    height: 22,
  },
  badgeSearchCover: {
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    fontSize: 14,
    color: colors.lightIndigoTwo,
    backgroundColor: colors.paleLavender,
    borderRadius: 6,
    paddingVertical: 4.5,
    paddingHorizontal: 10,
    marginRight: 10,
  },

  // For Overlay Model CSS
  modalContainer: {
    paddingTop: 50,
  },
  container: {
    paddingHorizontal: 35,
  },
  headerText: {
    fontSize: 18,
    color: colors.greyBlue,
    fontWeight: "700",
    marginBottom: 13.5,
  },
  selectWrapper_on: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  selectWrapper_off: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  check_on: {
    width: 22,
    height: 22,
  },
  check_off: {
    width: 22,
    height: 22,
  },
  closeButton: {
    width: 15,
    height: 15,
    marginRight: 20,
  },
  labelText: {
    fontSize: 16,
    color: colors.battleshipGrey,
    flex: 1,
    lineHeight: 24,
  },
  OverlayPopupSubmit: {
    fontSize: 20,
    color: "#fff",
    borderRadius: 0,
    height: 53,
    paddingHorizontal: 28,
    marginTop: 20,
  },
});

const CHECK_LABELS = [
  {
    key: 1,
    label: "스팸 또는 광고",
  },
  {
    key: 2,
    label: "욕설 또는 혐오 표현",
  },
  {
    key: 3,
    label: "음란물 또는 선정적인 글",
  },
  {
    key: 4,
    label: "저작권 침해",
  },
  {
    key: 5,
    label: "기타",
  },
];

const LatestReplyBlock = ({ tickerVal }) => {
  const [isVisibleDel, setIsVisibleDel] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const inset = useSafeAreaInsets();
  const [checked, setChecked] = useState(null);
  const [pickTalkData, setPickTalk] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [focused, setFocused] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [searchedKeyword, setSearched] = useState([]);
  const [dollarIndex, setDollarIndex] = useState(-1);
  const [opinion, setOpinion] = useState("none");
  const [filterData, setFilter] = useState([]);
  const [selpickTalk, setSelpickTalk] = useState("");
  const [selSort, setSelSort] = useState(1);
  const [selPicKComment, setPickComment] = useState('');
  const [selPicKTalkVal, setPickTalkReport] = useState('');
  const [modaltype, setModalType] = useState(0);



  const [isReply, setReply] = useState(false);
  const navigation = useNavigation();
  const userId = useSelector((state) => state.auth?.principal?._id);

  const onCancel = () => {
    setIsVisible(false);
  };
  const showModal = () => {
    setIsVisible(true);
  };

  const getPicktalk = async (sortBy='-score') => {
    let sortingBy = sortBy;
    let limit = 1000;
    let commentLimit = 500;

    const data = await pickTalklistdata(
      sortingBy,
      limit,
      tickerVal,
      commentLimit
    );

    let pickTalkData = data.map(v =>({...v, isReadMore: false}));

    setPickTalk(pickTalkData);
  };

  useFocusEffect(
    React.useCallback(() => {
      setKeyword([]);
      setSearched([]);
      setSearchResult([]);
      getPicktalk();
    }, [tickerVal])
  );

  const getMemberRank = (score) => {
    const rankData = { percent: 0, grade: "주린이" };

    if (score > 99 && score <= 299) {
      return { percent: 25, grade: "초보" };
    }
    if (score > 299 && score <= 299) {
      return { percent: 50, grade: "중수" };
    }
    if (score > 599 && score <= 1499) {
      return { percent: 75, grade: "고수" };
    }
    if (score > 1499) {
      return { percent: 100, grade: "신" };
    }
    return rankData;
  };

  const getTimeDiff = (createdAt) => {
    const sec = Math.round(
      moment
        .duration(moment(new Date()).diff(moment(new Date(createdAt))))
        .asSeconds()
    );

    const min = Math.round(
      moment
        .duration(moment(new Date()).diff(moment(new Date(createdAt))))
        .asMinutes()
    );
    const hour = Math.round(
      moment
        .duration(moment(new Date()).diff(moment(new Date(createdAt))))
        .asHours()
    );

    const day = Math.round(
      moment
        .duration(moment(new Date()).diff(moment(new Date(createdAt))))
        .asDays()
    );
    if (day >= 7) {
      return Math.floor(Math.floor(day) / 7) + "주 전";
    }

    if (day >= 1) {
      return day + "일 전";
    }
    if (hour >= 1) {
      return hour + "시간 전";
    }
    if (min >= 1) {
      return min + "분 전";
    }

    return "방금 전";
  };

  //for Toggle comment on picktalk
  const setComment = (pickdata) => {
    setReply(!isReply);
    setSelpickTalk(pickdata);
  };

  //Like PickTalk
  const likePicktalk = async (data) => {
    //setLike(data.likers?.includes?.(userId));
    let likeStatus = data.likers?.includes?.(userId);
    if (!likeStatus) {
      await addPickTalkLike({ pickTalk: data?._id });
    } else {
      await removePickTalkLike({ pickTalk: data?._id });
    }
    getPicktalk();
    console.log(userId);
    console.log(data);
  };

  //Like PickTalk Comment
  const likePicktalkComment = async (data) => {
    //setLike(data.likers?.includes?.(userId));
    let likeStatus = data.likers?.includes?.(userId);
    if (!likeStatus) {
      await addPickTalkCommentLike({ pickTalkComment: data?._id });
    } else {
      await removePickTalkCommentLike({ pickTalkComment: data?._id });
    }
    getPicktalk();
    console.log(userId);
    console.log(data);
  };

  const reportPopupComment =(data)=>{  
    setPickComment(data?._id);
    setModalType(1);
    setIsVisible(!isVisible);
    
  }
  const reportPopup =(data)=>{  
    setPickTalkReport(data?._id);
    setModalType(0);
    setIsVisible(!isVisible);
  }
  
  const ReplyList = ({ defaultComment,commentsCount, comments }) => {
    return comments?.slice(0,defaultComment)?.map((data, index) => {
      const rankData = getMemberRank(data?.user?.memberPoints);
      return (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            padding: 15,
            paddingTop: 0,
            paddingLeft: 0,
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
            marginLeft: 15,
          }}
        >
          <Image
            source={
              data?.user?.avatar && data?.user?.avatar != ""
                ? {
                    uri: data?.user?.avatar,
                  }
                : assets.defaultUserImg
            }
            style={styles.userImage}
          />
          <View style={styles.replyWrapper}>
            <View style={styles.topSection}>
              <View style={styles.userInfo}>
                <TouchableOpacity activeOpacity={0.85}>
                  <Text style={styles.userName}>{data?.user?.name}</Text>
                </TouchableOpacity>
                <View style={styles.userProfile}>
                  <Text style={styles.userProfileText}>{rankData.grade}</Text>
                </View>
                <Text style={styles.bullet}> &#183;</Text>
                <Text style={styles.timeText}>
                  {getTimeDiff(data?.createdAt)}
                </Text>
              </View>

              <View style={styles.buttonWrapper}>
                <TouchableOpacity activeOpacity={0.85} onPress={()=>reportPopupComment(data)}>
                  {/* <Text style={styles.textButton}>삭제</Text> */}
                  <Text style={[styles.dots]}>...</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.middleSection}>
              {/* <Image source={assets.icon_chart_complex} style={ styles.iconImgStyle } /> */}
              <Text style={styles.contents}>{data?.content}</Text>
            </View>

            <View style={styles.bottomSection}>
              <View style={styles.countBox}>
                <TouchableOpacity
                  style={styles.countWrapper}
                  activeOpacity={0.6}
                  onPress={() => likePicktalkComment(data)}
                >
                  <Image
                    source={assets.icon_news_recomm}
                    style={styles.iconStyle}
                  />
                  <Text style={styles.countText}>
                    {data?.likers?.length || 0}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.buttonWrapper}>
                <TouchableOpacity activeOpacity={0.85}>
                  {data?.opinion != "none" ? (
                    <Image
                      source={
                        data?.opinion == "up"
                          ? assets.rise_red
                          : assets.down_green
                      }
                      style={styles.circleImageSmall}
                    />
                  ) : null}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    });
  };

  const PickTalkList = ({readMoreFunc,pickTalkInfo }) => {
    const rankData = getMemberRank(pickTalkInfo?.user?.memberPoints);
   console.log('pickTalkInfo s'); 
   console.log(pickTalkInfo);

   const getPickContent = () => {
     //define delimiter
     let delimiter = /\s+/;
     //split string
     let _text = pickTalkInfo?.content;
     let token,
       index,
       parts = [];
     while (_text) {
       delimiter.lastIndex = 0;
       token = delimiter.exec(_text);
       if (token === null) {
         break;
       }
       index = token.index;
       if (token[0].length === 0) {
         index = 1;
       }
       parts.push(_text.substr(0, index));
       parts.push(token[0]);
       index = index + token[0].length;
       _text = _text.slice(index);
     }
     parts.push(_text);

     let val = parts.map((text) => {
      if (/^\$/.test(text)) {
        return (
          <Text key={text} style={styles.purpleText}  onPress={() => {
            navigation.navigate('PortfolioDetails', {
              general: {ticker:text?.replace("$","")},
            });
          }}>
            {text.toUpperCase()}
          </Text>
        );
      } else {
        return (
          <Text key={text} style={{ fontSize: 14,}}>
            {text}
          </Text>
        );
      }
    });
    return val;
   };



    {
      /* Comment Row 1 For Left Trangle */
    }
    return (
      <View style={styles.commentReplyWrapper}>
        <View style={styles.commentWrapper}>
          <View style={styles.topBar}>
            <Image
              source={
                pickTalkInfo?.user?.avatar != ""
                  ? {
                      uri: pickTalkInfo?.user?.avatar,
                    }
                  : assets.defaultUserImg
              }
              style={styles.userImage}
            />
            <View style={styles.replyWrapper}>
              <View style={styles.userInfo}>
                <View style={styles.userDetails}>
                  <TouchableOpacity activeOpacity={0.85}>
                    <Text style={styles.userName}>
                      {pickTalkInfo?.user?.name}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.userProfile}>
                    <Text style={styles.userProfileText}>{rankData.grade}</Text>
                  </View>
                  <Text style={styles.bullet}> &#183;</Text>
                  <Text style={styles.timeText}>
                    {getTimeDiff(pickTalkInfo?.createdAt)}
                  </Text>
                </View>
                <TouchableOpacity activeOpacity={0.5} onPress={()=>reportPopup(pickTalkInfo)}>
                  <Text style={[styles.dots]}>...</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.commentedRow}>
            <View style={styles.userImageBlank}></View>
            <View style={styles.replyWrapper}>
              <View style={styles.middleSection}>
                <Text numberOfLines={5} style={styles.contents}>
                  <Text>{getPickContent()}</Text>
                </Text>
              </View>
              <View style={styles.bottomSection}>
                <View style={styles.countBox}>
                  <TouchableOpacity
                    style={styles.countWrapper}
                    activeOpacity={0.6}
                    onPress={() => likePicktalk(pickTalkInfo)}
                  >
                    <Image
                      source={assets.icon_news_recomm}
                      style={styles.iconStyle}
                    />
                    <Text style={styles.countText}>
                      {pickTalkInfo?.likeCounts}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.countWrapper}
                    activeOpacity={0.6}
                    onPress={() => setComment(pickTalkInfo)}
                  >
                    <Image
                      source={assets.icon_news_comment}
                      style={styles.iconStyle}
                    />
                    <Text style={styles.countText}>
                      {pickTalkInfo?.commentCounts}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.buttonWrapper}>
                  <TouchableOpacity activeOpacity={0.85}>
                    {pickTalkInfo?.opinion != "none" ? (
                      <Image
                        source={
                          pickTalkInfo?.opinion == "up"
                            ? assets.rise_red
                            : assets.down_green
                        }
                        style={styles.circleImageSmall}
                      />
                    ) : null}
                    {/* <Text style={styles.textButton}>삭제</Text> */}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Left Trangular Icon
           */}
          <View style={styles.talkBubbleTrangleLeft}>
            <View style={styles.trangleBorderLeft}></View>
            <View style={styles.trangleBgColorLeft}></View>
          </View>
          {/*Right  Trangular Icon 
              <View style={[styles.commentedRow, { borderBottomLeftRadius: 5, borderBottomRightRadius: 0 }]}>

             */}

          {/* <View style={styles.talkBubbleTrangleRight}>
                            <View style={styles.trangleBorderRight}></View>
                            <View style={styles.trangleBgColorRight}></View>
                        </View> */}
        </View>

        {/* Reply Comment Code */}
        <View
          style={{
            justifyContent: "flex-end",
            borderLeftColor: "#eee",
            borderLeftWidth: 4,
            marginTop: 20,
          }}
        >
          <ReplyList
            commentsCount={pickTalkInfo?.commentCounts}
            comments={pickTalkInfo?.comments}
            defaultComment = {pickTalkInfo?.isReadMore ? 100 : 2}
          />
        </View>
        {pickTalkInfo?.commentCounts > 2 ? (
          <View style={[styles.buttonWrapper, { marginTop: 10 }]}>
            <TouchableOpacity activeOpacity={0.5}
             onPress={() => readMoreFunc(pickTalkInfo)}
            >
              <Text
                style={[
                  styles.dots,
                  styles.purpleText,
                  {
                    transform: [{ rotate: "90deg" }],
                    marginLeft: -8,
                    marginTop: 6,
                  },
                ]}
              >
                ...
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{ marginLeft: 50 }}
              onPress={() => readMoreFunc(pickTalkInfo)}
            >
              <Text style={[styles.subContents, styles.purpleText]}>
               {pickTalkInfo?.isReadMore ? '답글 숨기기' : '더보기'} 
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  };

  //Get Search on Every Key Press
  const onSearchPress = async (keywordVal) => {
    let lastDollarSign = keywordVal.lastIndexOf("$");
    let lastSpace = keywordVal.lastIndexOf(" ");

    setDollarIndex(lastDollarSign);
    if (lastDollarSign != -1) {
      let newVal = keywordVal.split(" ");
      let getData = newVal.filter((item) => item.includes("$"));
      setFilter(getData);
      let searhTicker = getData[getData?.length - 1];

      if (!searchedKeyword.includes(searhTicker)) {
        searchedKeyword.push(searhTicker);
        let searchVal = searhTicker.replace("$", "");
        if (searchVal?.length > 0) {
          const searchResult = await searchtickers(searchVal);
          setSearchResult(searchResult);
          console.log("searchres");
          console.log(searchResult);
          console.log("lastDollarSign");
          console.log(lastDollarSign);

          if (lastDollarSign < lastSpace) {
            let obj = searchResult.findIndex((x) => x.ticker == searchVal);
            console.log("Search index");
            console.log(obj);
            if (obj == -1) {
              console.log("New Val");

              let newText = keywordVal?.replace(newVal[newVal?.length - 2], "");
              setKeyword(newText);
              console.log(newText);
            }
          }
          // let newVal = keyword.substring(0, lastSpace);
        }
      }
    } else {
      setSearched([]);
      setSearchResult([]);
      setFilter([]);
    }
  };

  const OnSuggestion = (text) => {
    let inputVal = keyword;
    let tickerVal = searchedKeyword[searchedKeyword?.length - 1];
    let finalOut = inputVal?.replace(tickerVal, "$" + text);
    searchedKeyword.pop();
    searchedKeyword.push("$" + text);
    setKeyword(finalOut);
  };

  //define delimiter
  let delimiter = /\s+/;

  //split string
  let _text = keyword;
  let token,
    index,
    parts = [];
  while (_text) {
    delimiter.lastIndex = 0;
    token = delimiter.exec(_text);
    if (token === null) {
      break;
    }
    index = token.index;
    if (token[0].length === 0) {
      index = 1;
    }
    parts.push(_text.substr(0, index));
    parts.push(token[0]);
    index = index + token[0].length;
    _text = _text.slice(index);
  }
  parts.push(_text);

  //highlight hashtags
  parts = parts.map((text) => {
    if (/^\$/.test(text)) {
      return (
        <Text key={text} style={{ fontSize: 14, color: colors.lightIndigoTwo }}>
          {text.toUpperCase()}
        </Text>
      );
    } else {
      return text;
    }
  });

  const sendMessage = async () => {
    let content = keyword;
    let orContent = keyword;
    if (!isReply) {
      let newVal = content.split(" ");
      let getData = newVal.filter((item) => item.includes("$"));
      let tickerVal = "";
      if (getData?.length > 0) {
        tickerVal = getData.join(",");
      }
      console.log({
        tickers: tickerVal?.replace("$", ""),
        content: orContent,
        opinion: opinion,
      });
      await addPickTalk({
        tickers: tickerVal?.replace("$", ""),
        content: orContent,
        opinion: opinion,
      });
    } else {
      await addPickTalkComment({
        pickTalk: selpickTalk?._id,
        content: orContent,
        opinion: opinion,
      });
    }

    getPicktalk();
    setSearched([]);
    setSearchResult([]);
    setFilter([]);
    setKeyword("");
    setReply(false);
    setSelpickTalk("");
  };

  const getReadMore = (val) =>{
let markers = [...pickTalkData];
let index = markers.findIndex(el => el._id === val?._id);
markers[index] = {...markers[index], isReadMore: (!markers[index].isReadMore)};
setPickTalk(markers);
  }

  return (
    <>
      <View
        style={{
          paddingBottom: 30,
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
        }}
      >
        <View style={styles.mainCommentWrapper}>
          {/* Tor Menu Bar */}
          <View style={styles.menuWrapper}>
            <View style={styles.flexWrapper}>
              <Text style={[styles.purpleText, { fontSize: 16 }]}>${tickerVal}</Text>
              <Text style={{ color: colors.greyBlue, fontSize: 16 }}>
                {" "}
                | <Text style={styles.purpleText}>{pickTalkData?.length || 0}</Text>개의 픽톡
              </Text>
            </View>
            <View style={[styles.flexWrapper, styles.textRight]}>
             <TouchableOpacity onPress={()=>{getPicktalk('-updatedAt')
            setSelSort(0); 
            }
            
            }>
              <Text style={{ color: selSort == 0 ? colors.blueGrey:colors.cloudyBlue, fontSize: 13 }}>
                최신순 |{" "}
              </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{getPicktalk('-score')
            setSelSort(1);  
            }
            }>
              <Text style={{ color:selSort==1 ? colors.blueGrey:colors.cloudyBlue, fontSize: 13 }}>
                인기순
              </Text>
              </TouchableOpacity>
              
            </View>
          </View>

          <FlatList
            data={pickTalkData || []}
            extraData={pickTalkData}
            contentContainerStyle={{}}
            renderItem={({ item, index }) => (
              <PickTalkList pickTalkInfo={item} readMoreFunc={getReadMore}/>
            )}
          />
        </View>
      </View>

      {isReply && (
        <View
          style={{
            marginHorizontal: 30,
            marginVertical: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={assets.icon_news_comment}
            style={[
              {
                width: 10,
                height: 9,
                tintColor: colors.lightIndigo,
              },
            ]}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: 13,
              color: colors.cloudyBlue,
            }}
          >
            <Text style={{ color: colors.lightIndigo }}>
              {` ${selpickTalk?.user?.name} `}
            </Text>
            님에게 답글을 작성 중입니다...
          </Text>
        </View>
      )}
      {/* Search Input Section Code */}
      <View style={styles.inputAreaWrapper}>
        <View style={styles.inputIconcover}>
          <TouchableOpacity
            activeOpacity={0.75}
            style={{ marginRight: 20, marginLeft: -8 }}
          >
            <Image
              source={assets.icon_close_lg}
              style={styles.circleImageSmall}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => {
              setOpinion("up");
            }}
          >
            <Image
              source={assets.rise_red}
              style={[
                styles.circleImageSmall,
                opinion == "up" ? styles.purpleBorder : null,
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => {
              setOpinion("down");
            }}
          >
            <Image
              source={assets.down_green}
              style={[
                styles.circleImageSmall,
                ,
                opinion == "down" ? styles.purpleBorder : null,
              ]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputcover}>
          <TextInput
            style={styles.inputField}
            placeholder="나도 한마디 할래요."
            onChangeText={(keywordVal) => {
              onSearchPress(keywordVal);
              setKeyword(keywordVal);
            }}
            // value={keyword}
            autoCorrect={false}
            autoCapitalize={"none"}
            autoCompleteType={"off"}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          >
            <Text>{parts}</Text>
          </TextInput>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => {
              sendMessage();
            }}
          >
            <Image source={assets.send_button_grey} style={styles.sendButton} />
          </TouchableOpacity>
        </View>
        <View style={styles.badgeSearchCover}>
          {searchResult?.length > 0 &&
            searchResult?.slice(0, 5)?.map((item, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.75}
                  onPress={() => {
                    OnSuggestion(item?.ticker);
                  }}
                >
                  <Text style={styles.badge}>${item?.ticker}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </View>

      {/* Modal Overlay Section Code */}
      
      <BottomModal isVisible={isVisible} onCancel={onCancel}>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.container}>
          <TouchableWithoutFeedback onPress={()=>alert('hi')}>
            <>
            <Text style={styles.headerText}>
              해당 글의 어떤 점이 문제인가요?
            </Text>
            {CHECK_LABELS?.map?.((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={
                    checked === item.key
                      ? styles.selectWrapper_on
                      : styles.selectWrapper_off
                  }
                  activeOpacity={0.85}
                  onPress={() => setChecked(item.key)}
                >
                  <Text style={styles.labelText}>{item.label}</Text>
                  {checked === item.key ? (
                    <Image
                      source={assets.checkbox_on}
                      style={styles.check_on}
                      resizeMode={"contain"}
                    />
                  ) : (
                    <Image
                      source={assets.checkbox_off}
                      style={styles.check_off}
                      resizeMode={"contain"}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
            </>
          </TouchableWithoutFeedback>
          </ScrollView>

          <BottomButton
            disabled={!checked}
            onPress={onCancel}
            style={styles.OverlayPopupSubmit}
          >
            신고하기
          </BottomButton>
        </View>
      </BottomModal>
      
      
    </>
  );
};
export default LatestReplyBlock;
