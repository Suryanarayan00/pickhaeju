import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '#common/colors';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.paleGreyThree,
  },
  replyText: {
    fontSize: 16,
    color: colors.dark,
    marginVertical: 2,
  },
  timeText: {
    color: colors.blueyGrey,
    paddingVertical: 4.5,
    fontSize: 13,
    letterSpacing: -0.32,
    marginVertical: 2,
  },
  title: {
    fontSize: 14,
    letterSpacing: -0.35,
    color: colors.dark,
    marginVertical: 2,
  },
});
const WriteCommentItem = (props) => {
  const { item } = props;
  console.log('props Val');
  console.log(item);
  const title = item?.article?.titleKo || item?.articleTitle || item?.threadTitle;
  let primaryTicker = item?.article?.primaryTicker || item?.article?.ticker ||item?.article?.tickers[0];

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.wrapper}
      onPress={() => {
        if (item?.article) {
          navigation.navigate('NewsDetails', { id: item?.article?._id });
        } else {
          navigation.navigate('PickDetails', { threadId: item.thread });
        }
      }}
    >
      <Text style={styles.replyText} numberOfLines={1}>
        {item?.content}
      </Text>
      <Text style={styles.timeText}>
      {moment(item?.article?.publication_date).format('YYYY.MM.DD a h:MM')}
      </Text>
      <Text style={styles.title} numberOfLines={1}>
        <Text style={{color: colors.blueyGrey}}> ({item?.article && primaryTicker}) </Text>{title}
      </Text>
    </TouchableOpacity>
  );
};
export default WriteCommentItem;
