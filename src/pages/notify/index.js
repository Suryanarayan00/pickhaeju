import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '#common/colors';
import { TabBar, TabView } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NotificationList from '#components/NotificationList';
import assets from '../../../assets';
import Document from '#components/Document';
import { useSelector } from 'react-redux';
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: colors.white,
    marginHorizontal: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(237,239,245)',
    paddingVertical: 18,
  },
  timeTitle: { fontSize: 16, letterSpacing: -0.4, color: colors.dark },
  headerButtonWrapper: { flexDirection: 'row', alignItems: 'center' },
  checkIcon: {
    width: 11.5,
    height: 7.5,
    marginRight: 7,
  },
  checkText: {
    fontSize: 14,
    color: colors.cloudyBlue,
    letterSpacing: -0.35,
  },
  notifyWrapper: {
    backgroundColor: 'rgb(250,251,255)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(237,239,245)',
    paddingHorizontal: 20,
  },
  notifyWrapperWhite: {
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(237,239,245)',
  },
});

const data = [
  {
    stockname: 'AAPL',
    time: '1분 전',
    contents: '애플 새로운 아이폰 런칭 그 이후는?',
    nickname: '노다지',
    newbadge: 'new',
  },
  {
    stockname: 'TSLA',
    time: '30분 전',
    contents: '애플 새로운 아이폰 런칭 그 이후는?',
    nickname: '정갈한',
  },
  {
    time: '30분 전',
    contents:
        '관리자가 ‘재범팍’님의 PICK “[ADBE] \n' +
        '장기적 투자 가능할까?”에 수정을 요청..',
  },
];
const prevData = [
  {
    image:
        'https://pgnqdrjultom1827145.cdn.ntruss.com/img/02/aa/02aa082830c02f5b1326651eaaf4401785e1e7c8ecfc65eda5510bc8328b8fb9_v1.jpg',
    time: '40분 전',
    contents: 'wnfls이 님이 팔로우를 요청하였습니다.',
    title: '팔로워 알림',
  },
  {
    stockname: 'TSLA',
    time: '1시간 전',
    contents: '애플 새로운 아이폰 런칭 그 이후는?',
    nickname: '정갈한',
  },
  {
    time: '30분 전',
    contents:
        '관리자가 ‘재범팍’님의 PICK “[ADBE] \n' +
        '장기적 투자 가능할까?”에 수정을 요청..',
  },
  {
    stockname: 'AAPL',
    time: '1분 전',
    contents: '애플 새로운 아이폰 런칭 그 이후는?',
    nickname: '노다지',
  },
];

const { width: wWidth } = Dimensions.get('window');

const NotifyIndex = (props) => {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();

  const inbox = useSelector((state) => state.auth.principal?.inbox) || [];

  const inboxArray = cloneDeep(inbox)
      ?.reverse()
      ?.reduce((p, v) => {
        if (p?.length === 0) {
          p.push({
            dt: moment(v?.updatedAt?._seconds * 1000)?.format('yyyy.MM.DD (ddd)'),
            data: [{ ...v }],
          });
        } else {
          const findIndex = p?.findIndex(
              (data) =>
                  data.dt ===
                  moment(v?.updatedAt?._seconds * 1000)?.format('yyyy.MM.DD (ddd)'),
          );
          if (findIndex === -1) {
            p.push({
              dt: moment(v?.updatedAt?._seconds * 1000)?.format(
                  'yyyy.MM.DD (ddd)',
              ),
              data: [{ ...v }],
            });
          } else {
            p[findIndex].data.push(v);
          }
        }
        return p;
      }, []);

  console.log('NotifyIndex', inboxArray);
  return (
      <>
        <View style={{ height: 55 + inset.top, backgroundColor: colors.white }} />
        <Document>
          {/*<View style={{ flex: 1, marginBottom: 33 }}>*/}
          {/*  <FlatList*/}
          {/*      data={inboxArray}*/}
          {/*      renderItem={({ item }) => {*/}
          {/*        return (*/}
          {/*            <View>*/}
          {/*              <View style={styles.header}>*/}
          {/*                <Text style={styles.timeTitle}>{item.dt}</Text>*/}
          {/*              </View>*/}
          {/*              {item.data?.map?.((item, index) => (*/}
          {/*                  <View key={index} style={styles.notifyWrapper}>*/}
          {/*                    <NotificationList*/}
          {/*                        newbadge={item.newbadge}*/}
          {/*                        stockname={item.stockname}*/}
          {/*                        time={item.time}*/}
          {/*                        contents={item.content}*/}
          {/*                        nickname={item.nickname}*/}
          {/*                        title={*/}
          {/*                          item.type === 'follow' ? '팔로워 알림' : item.title*/}
          {/*                        }*/}
          {/*                        image={item.avatar}*/}
          {/*                    />*/}
          {/*                  </View>*/}
          {/*              ))}*/}
          {/*            </View>*/}
          {/*        );*/}
          {/*      }}*/}
          {/*  />*/}
          {/*</View>*/}
           <ScrollView style={styles.container}>
          <View>
            <View style={styles.header}>
              <Text style={styles.timeTitle}>10. 04. 일</Text>
              <TouchableOpacity style={styles.headerButtonWrapper}>
                <Image
                  source={assets.icon_input_condition_off}
                  style={styles.checkIcon}
                />
                <Text style={styles.checkText}>모두 읽음</Text>
              </TouchableOpacity>
            </View>
            {data.map?.((item, index) => (
              <View key={index} style={styles.notifyWrapper}>
                <NotificationList
                  newbadge={item.newbadge}
                  stockname={item.stockname}
                  time={item.time}
                  contents={item.contents}
                  nickname={item.nickname}
                  title={item.title}
                  image={item.image}
                />
              </View>
            ))}

            <View style={styles.header}>
              <Text style={styles.timeTitle}>10. 03. 토</Text>
            </View>
            {prevData.map?.((item, index) => (
              <View key={index} style={styles.notifyWrapperWhite}>
                <NotificationList
                  newbadge={item.newbadge}
                  image={item.image}
                  stockname={item.stockname}
                  time={item.time}
                  contents={item.contents}
                  nickname={item.nickname}
                  title={item.title}
                />
              </View>
            ))}
          </View>
        </ScrollView>
        </Document>
      </>
  );
};

export default NotifyIndex;
