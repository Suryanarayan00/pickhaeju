import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '#common/colors';
/*import { TabBar, TabView } from 'react-native-tab-view';*/
import WriteFill from '#widgets/pickwrite_fill';
import WriteSort from '#widgets/pickwrite_sort';
import WriteAdd from '#widgets/pickwrite_add';
import assets from '../../../assets';
import TabProvider from '#components/TabScene';
import TabScreens from '#components/TabScene/TabScreens';
import TabBar from '#components/TabScene/TabBar';
import { useDispatch, useSelector } from 'react-redux';
import { pickWriteStoreclear } from '../../data/pickWriteStore';
import { toastShow } from '#data/toast/ToastAction';
import { add } from 'lodash';
import ClosePickWritePopUp from '#components/ClosePickWritePopUp';

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
  const [isModalClose, setModal] = useState(false);
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
        dispatch(toastShow('필수 입력사항을 입력해 주세요.'));
      }
      return;
    } else if (index === 2) {
      if (htmlContentTitle && htmlContent) {
        setIndex(index);
      } else {
        dispatch(toastShow('필수 입력사항을 입력해 주세요.'));
      }
      return;
    }
    setIndex(index);

  };

  const inset = useSafeAreaInsets();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => {showModal()}}
        >
          <Image
            source={assets.icon_close_lg}
            style={{ width: 15, height: 15, marginRight: 25 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

const showModal=()=>{
  setModal(!isModalClose);
  // Alert.alert(
  //   '안내',
  //   'PICK을 삭제하겠습니까? 기존의 작성 내용은 저장되지 않습니다.',
  //   [
  //     { text: '아니오' },
  //     {
  //       text: '예',
  //       onPress: async () => {
  //         await dispatch(pickWriteStoreclear());
  //         navigation.goBack();
  //       },
  //     },
  //   ],
  // );
}

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
     
      <ClosePickWritePopUp
        isVisible={isModalClose}
        onCancel={() => {
          setModal(false);
        }}
         onBack={async () => {
          await dispatch(pickWriteStoreclear());
               navigation.goBack(); 
        }}
      />
    </Wrapper>
  );
};

export default PickWrite;
