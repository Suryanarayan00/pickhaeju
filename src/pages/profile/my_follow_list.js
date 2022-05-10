import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import TabBar from '#components/TabScene/TabBar';
import TabScreens from '#components/TabScene/TabScreens';
import ScrapPick from '#widgets/scrap_pick';
import ScrapNews from '#widgets/scrap_news';
import TabProvider from '#components/TabScene';
import colors from '#common/colors';
import FollowerMy from '#widgets/follower_my';
import FollowingMy from '#widgets/following_my';
import { useRoute } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  contentContainer: { flexGrow: 1, paddingBottom: 50 },
});
const MyFollowList = (props) => {
  const route = useRoute();
  const [index, setIndex] = useState(route.params?.isFollower ? 0 : 1);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <TabProvider index={index} onChangeIndex={setIndex}>
        <TabBar type={'center'} />
        <TabScreens>
          <FollowerMy title={'팔로워'} data={route.params?.followers} />
          <FollowingMy title={'팔로잉'} data={route.params?.following} />
        </TabScreens>
      </TabProvider>
    </ScrollView>
  );
};

export default MyFollowList;
