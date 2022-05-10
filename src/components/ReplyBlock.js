import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import colors from '#common/colors';
import React, { useState, useEffect } from 'react';
import assets from '../../assets';
import moment from 'moment';
import {
  removeThreadComment,
  theradLikeComment,
  theradUnlikeComment,
  removeThreadSubComment,
  theradLikeSubComment,
  theradUnlikeSubComment,
} from '../common/threadApi';
import { useSelector } from 'react-redux';
import {
  getMyArticleLikes,
  newsLikeComment,
  newsLikeSubComment,
  newsUnlikeComment,
  newsUnlikeSubComment,
  removeSubCommentArticle,
} from '../common/article';
import DeleteDynamicPopUp from './DeleteDynamicPopUp';
import { toastShow } from '#data/toast/ToastAction';
import { useDispatch } from 'react-redux';

const styles = StyleSheet.create({
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: 13,
    letterSpacing: -0.32,
    color: colors.greyBlue,
  },
  timeText: {
    fontSize: 13,
    letterSpacing: -0.32,
    color: colors.cloudyBlue,
  },
  // borderBar: {
  //   borderBottomWidth: 1,
  //   borderBottomColor: colors.paleGreyThree,
  // },
  contents: { fontSize: 14, letterSpacing: -0.35, color: colors.dark },
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
  textButton: {
    fontSize: 13,
    letterSpacing: -0.32,
    color: colors.cloudyBlue,
  },
  borderLine: {
    height: 11,
    width: 1,
    backgroundColor: colors.lightPeriwinkle,
    marginHorizontal: 10,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginTop: 2,
    borderWidth:1,
    borderColor:colors.veryLightBlueTwo
  },
  borderBar: {
    borderTopWidth: 1,
    borderTopColor: colors.paleGreyThree,
  },
  replyWrapper: { marginLeft: 16, flex: 1 },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  bullet: { color: colors.cloudyBlueTwo, marginHorizontal: 4 },
  buttonWrapper: { flexDirection: 'row', alignItems: 'center' },
  countBox: { flexDirection: 'row', marginTop: 12 },
  iconStyle: {
    width: 13,
    height: 13,
    marginRight: 5,
  },
});
const ReplyBlock = (props) => {
  const {
    comment,
    id,
    onPressRemove,
    setNestedReply,
    onRefresh,
    nestedReply,
    isSub,
    userDetails
  } = props;

  const [isVisibleDel,setIsVisibleDel] = useState(false)
  const [isImage,setImage] = useState(false);

  console.log('PROPS');
  console.log(props);

const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth?.principal?.userId);
  let isLike = false;
  getMyArticleLikes().then((docs) => {
    for (let i = 0; i < docs.length; i++) {
      if (docs[i].userId == userId) {
        isLike = true;
        break;
      }
    }
  });
  const getTimeDiff = () => {
    console.log('comment date');
    console.log(comment.updatedAt);
    const sec = Math.round(
      moment
        .duration(moment(new Date()).diff(moment(new Date(comment.updatedAt))))
        .asSeconds(),
    );

    const min = Math.round(
      moment
        .duration(moment(new Date()).diff(moment(new Date(comment.updatedAt))))
        .asMinutes(),
    );
    const hour = Math.round(
      moment
        .duration(moment(new Date()).diff(moment(new Date(comment.updatedAt))))
        .asHours(),
    );

    const day = Math.round(
      moment
        .duration(moment(new Date()).diff(moment(new Date(comment.updatedAt))))
        .asDays(),
    );

    if (day >= 7) {
      return Math.floor(Math.floor(day) / 7) + '주 전';
      
    }
     if (day >= 1) {
      return day + '일 전';
    }
    if (hour >= 1) {
      return hour + '시간 전';
    }
    if (min >= 1) {
      return min + '분 전';
    }

    return '방금 전';
  };

  const threadLikeToggle = async () => {
    if (!comment?.isLiked) {
      if (isSub) {
        await theradLikeSubComment(comment?.thread, comment?._id);
      } else {
        const res = await theradLikeComment(comment?.thread, comment?._id);
        console.log('comment! thread ', res);
      }
    } else {
      if (isSub) {
        await theradUnlikeSubComment(comment?.thread, comment?._id);
      } else {
        const res = await theradUnlikeComment(comment?.thread, comment?._id);
        console.log('comment! thread un', res);
      }
    }
  };

  const newLikeToggle = async () => {

    if (!comment?.isLiked) {
      if (isSub) {
         await newsLikeSubComment(comment?.article, comment?._id);
      } else {
        const res = await newsLikeComment(comment?.article, comment?._id);
      }
    } else {
      if (isSub) {
        await newsUnlikeSubComment(comment?.article, comment?._id);
      } else {
        const res = await newsUnlikeComment(comment?.article, comment?._id);
        console.log('comment! thread un', res);
      }
    }
  };
  const cancelButtonFunction = () => {
    setIsVisibleDel(false)
  }

  const deleteButtonFunction = () => {
    onPressRemove(comment._id)
    setIsVisibleDel(false)
    if(isSub)
    dispatch(toastShow('해당 답글이 삭제되었습니다.​'));
    else
    dispatch(toastShow('해당 댓글이 삭제되었습니다.​'));

  }

  useEffect(()=>{
    Image.getSize(comment.user?.avatar, (width, height) => {
      if(width>0){
        setImage(true);
      }
      else{
        setImage(false);
      }
  }, () => {
    setImage(false);
  });
  },[ comment?.user?.avatar])
  
  const getMemberRank = (score) => {
    
    const rankData = { percent: 0, grade: '주린이',image:assets.Profile_Level1 };

    if (score > 99 &&  score<=299) {
      return { percent: 25, grade: '초보',image:assets.Profile_Level2};
    }
    if (score > 299 &&  score<=299) {
      return { percent: 50, grade: '중수',image:assets.Profile_Level3 };
    }
    if (score > 599 &&  score<=1499) {
      return { percent: 75, grade: '고수',image:assets.Profile_Level4 };
    }
    if (score > 1499) {
      return { percent: 100, grade: '신',image:assets.Profile_Level5 };
    }
    return rankData;
  };

  const rankData = getMemberRank(userDetails?.memberPoints || 0);
  console.log('comment islike!', userDetails?.memberPoints);
  return (
    <View style={{ flexDirection: 'row' }}>
      <Image
        source={
          isImage ? {
            uri: comment.user.avatar 
          } : 
          assets.defaultUserImg
        }
        style={styles.userImage}
      />
       <View style={styles.replyWrapper}>
        <View style={styles.replyHeader}>
          <View style={styles.userInfo}>
            <TouchableOpacity activeOpacity={0.85}>
              <Text style={styles.userName}>{comment.user.name}</Text>
            </TouchableOpacity>
            <View style={{border:1,height:20,width:50,borderColor: colors.lightIndigo,borderWidth:1,marginLeft:5,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
             <Text style={{color:colors.lightIndigo,fontSize:10}}>{rankData?.grade}</Text>
            </View>
               {/* <Image
              source={rankData?.image}
              style={{height:25,width:40,resizeMode:'contain'}} /> */}
            <Text style={styles.bullet}> &#183;</Text>
            <Text style={styles.timeText}>{getTimeDiff()}</Text>
          </View>
          {userId === comment.userId && (
            <View style={styles.buttonWrapper}>
               <TouchableOpacity
                activeOpacity={0.85}
                onPress={async () => {
                  console.log('ISCOMMENT');
                  console.log(isSub);
                  //onPressRemove(comment._id);
                  setIsVisibleDel(true)
                }}
               >
                <Text style={styles.textButton}>삭제</Text>
              </TouchableOpacity>
              <DeleteDynamicPopUp
               header  = {isSub ? '해당 덧글을 삭제하시나요?':'해당 댓글을 삭제하시나요?'}
               title  = {isSub ? '한번 삭제된 덧글은 복구가 불가능합니다.':'한번 삭제된 댓글은 복구가 불가능합니다.'}
              isVisible = {isVisibleDel}
              onCancel={() => cancelButtonFunction()}
              onDelete = {() => deleteButtonFunction()}
              
              />
              {/* <View style={styles.borderLine} />
              <TouchableOpacity activeOpacity={0.85}>
                <Text style={styles.textButton}>수정</Text>
              </TouchableOpacity> */}
            </View>
          )}
        </View>
        <Text style={styles.contents}>{comment.content}</Text>
        <View style={styles.countBox}>
          <TouchableOpacity
            style={styles.countWrapper}
            activeOpacity={0.6}
            onPress={async () => {
              if (comment?.thread) {
                await threadLikeToggle();
              } else if (comment?.article) {
                await newLikeToggle();
              }
              onRefresh && onRefresh();
            }}
          >
            <Image
              source={assets.icon_news_recomm}
              style={[
                styles.iconStyle,
                { tintColor: comment?.isLiked ? colors.lightIndigo : colors.cloudyBlue },
              ]}
              
            />
            <Text style={styles.countText}>{comment?.likes}</Text>
          </TouchableOpacity>
          {setNestedReply && (
            <TouchableOpacity
              style={styles.countWrapper}
              onPress={() => {
                console.log('what we get on comment');
                console.log(comment);
                setNestedReply && setNestedReply(comment);
              }}
            >
              <Image
                source={assets.icon_news_comment}
                style={[
                  styles.iconStyle,
                  {
                    tintColor:
                      nestedReply?._id === comment?._id
                        ? colors.lightIndigo
                        : colors.cloudyBlue,
                  },
                ]}
              />
              <Text style={styles.countText}>
                {comment?.subcomments?.length || 0}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const ReplyBox = (props) => {
  const { comment, id, onPressRemove, setNestedReply, onRefresh, nestedReply } =
    props;

  return (
     <>
      <ReplyBlock {...props} />
      {comment?.subcomments?.length > 0 && (
        <View style={{ marginTop: 10 }}>
          <FlatList
            data={comment?.subcomments || []}
            contentContainerStyle={{}}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.borderBar,
                  {
                    paddingTop: 20,
                    paddingBottom: 10,
                    paddingLeft: 50,
                    // backgroundColor: 'red'
                  },
                ]}
              >
                <ReplyBlock
                  comment={item}
                  onPressRemove={async (commentId) => {
                    if (comment?.thread) {
                      await removeThreadSubComment(
                        id,
                        commentId._id || commentId,
                      );
                    } else if (comment?.article) {
                      await removeSubCommentArticle(
                        id,
                        commentId._id || commentId,
                      );
                    }
                    onRefresh();
                  }}
                  nestedReply={nestedReply}
                  onRefresh={onRefresh}
                  isSub
                />
              </View>
            )}
          />
        </View>
      )}
    </>
  );
};

export default ReplyBox;
