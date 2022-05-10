import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import colors from '#common/colors';
import TabProvider from '#components/TabScene';
import TabBar from '#components/TabScene/TabBar';
import TabScreens from '#components/TabScene/TabScreens';
import FollowerOther from '#widgets/follower_other';
import FollowingOther from '#widgets/following_other';
import MutualOther from '#widgets/mutual_other';
import { useNavigation, useRoute } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  contentContainer: { flexGrow: 1, paddingBottom: 50 },
});
const OtherFollowList = (props) => {
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();
  const { params } = useRoute();

  React.useEffect(() => {
    navigation.setOptions({
      title: params?.user?.name,
    });
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <TabProvider index={index} onChangeIndex={setIndex}>
        <TabBar type={'center'} />
        <TabScreens>
          <MutualOther title={'뮤추얼'} />
          <FollowerOther title={'팔로워'} />
          <FollowingOther title={'팔로잉'} />
        </TabScreens>
      </TabProvider>
    </ScrollView>
  );
};

export default OtherFollowList;
