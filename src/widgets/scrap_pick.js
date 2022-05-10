import PickListItem from '#components/PickListItem';
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import colors from '#common/colors';
import assets from '../../assets';
import { getMyScrapThreads } from '../common/threadApi';

const styles = StyleSheet.create({
  pickWrapper: {
    borderBottomColor: colors.paleGrey,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 18,
  },
  container: { marginTop: 10 },
  pickFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: colors.white,
  },
  moreButton: {
    color: colors.blueGrey,
    fontSize: 12,
  },
  downIcon: {
    width: 5,
    height: 4,
    marginLeft: 5,
  },
});

const ScrapPick = (props) => {
  const navigation = useNavigation();
  const { data } = props;
  console.log('single thread', data);
  return (
    <View style={styles.container}>
      <FlatList
        data={data?.slice(0, 3)}
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled={false}
        ListEmptyComponent={() => {
          return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text>스크랩된 PICK이 없습니다.</Text>
            </View>
          );
        }}
        renderItem={({ item, index }) => (
          <View style={styles.pickWrapper}>
            <PickListItem
              item={item}
              onPress={() => {
                navigation.navigate('PickDetails', { threadId: item?._id });
              }}
            />
          </View>
        )}
        ListFooterComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ScrapPickList', {
                data,
              });
            }}
            activeOpacity={0.85}
            style={styles.pickFooter}
          >
            <Text style={styles.moreButton}>더보기</Text>
            <Image source={assets.arrow_down_gray} style={styles.downIcon} />
          </TouchableOpacity>
        }
      />
    </View>
  );
};
export default ScrapPick;
