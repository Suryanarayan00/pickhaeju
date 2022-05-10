import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import colors from '#common/colors';
import NoticeItem from '#components/NoticeItem';
import ProfileRound from '#components/ProfileRound';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  listContainer: { flexGrow: 1 },
});

const data = [
  {
    title: '픽해주 서비스 이용 약관 변경 안내',
    date: '2021. 02. 20',
  },
  {
    title: '픽해주 서비스 PICK 이벤트 당첨자 안내',
    date: '2021. 02. 17',
  },
  {
    title: '픽해주 서비스 개인정보처리방침 개정 내용 안내',
    date: '2021. 02. 05',
  },
  {
    title: '픽해주 서비스 개인정보 이용내역 통지 안내',
    date: '2021. 01. 03',
  },
];

const Notice = (props) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <NoticeItem title={item.title} date={item.date} />
        )}
      />
    </View>
  );
};

export default Notice;
