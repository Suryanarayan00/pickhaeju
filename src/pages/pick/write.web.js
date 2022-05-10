import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '#common/colors';
/*import { TabBar, TabView } from 'react-native-tab-view';*/
import Animated from 'react-native-reanimated';
import WriteFill from '#widgets/pickwrite_fill';
import WriteSort from '#widgets/pickwrite_sort';
import WriteAdd from '#widgets/pickwrite_add';
import TabView from '#components/TabView';
import assets from '../../../assets';
import TabProvider from '#components/TabScene';
import TabScreens from '#components/TabScene/TabScreens';
import TabBar from '#components/TabScene/TabBar';
import { useSelector, useDispatch } from 'react-redux';
import { pickWriteStoreclear } from '../../data/pickWriteStore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

const { width: wWidth } = Dimensions.get('window');

const PickWrite = (props) => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const {
    normalPick,
    exclusivePick,
    pickTypeChecks,
    mainStock,
    subStock,
    htmlContentTitle,
    htmlContent,
  } = useSelector((state) => state.pickWriteStore);
  const dispatch = useDispatch();
  const changeTab = (index) => {
    /**
     * Todo..
     * 다 안눌리면 탭 못넘어가게 막으면서 ToastMessage 띄워주기.
     */
    if (index === 1) {
      if (
        (normalPick || exclusivePick) &&
        pickTypeChecks?.includes?.(true) &&
        mainStock
      ) {
        setIndex(index);
      } else {
        alert('필수 입력사항을 입력해 주세요.');
      }
      return;
    } else if (index === 2) {
      if (htmlContentTitle && htmlContent) {
        setIndex(index);
      } else {
        alert('필수 입력사항을 입력해 주세요.');
      }
      return;
    }
    setIndex(index);
    return;
  };

  const inset = useSafeAreaInsets();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => {
            Alert.alert(
              '안내',
              'PICK을 삭제하겠습니까? 기존의 작성 내용은 저장되지 않습니다.',
              [
                { text: '아니오' },
                {
                  text: '예',
                  onPress: async () => {
                    await dispatch(pickWriteStoreclear());
                    navigation.goBack();
                  },
                },
              ],
            );
          }}
        >
          <Image
            source={assets.icon_close_lg}
            style={{ width: 15, height: 15, marginRight: 25 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  const insets = useSafeAreaInsets();
  const Wrapper = index !== 1 ? SafeAreaView : View;
  return (
    <Wrapper style={{ flex: 1 }}>
      <TabProvider index={index} onChangeIndex={changeTab}>
        {/* <View style={{ backgroundColor: 'transparent' }} />*/}
        <View style={styles.container}>
          <TabBar type={'center'} />
          <TabScreens>
            <WriteSort title={'분류'} setIndex={changeTab} />
            <WriteFill title={'작성'} setIndex={changeTab} />
            <WriteAdd title={'등록'} setIndex={changeTab} />
          </TabScreens>
        </View>
      </TabProvider>
    </Wrapper>
  );
};

export default PickWrite;
