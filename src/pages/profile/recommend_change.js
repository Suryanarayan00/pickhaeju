import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import assets from '../../../assets';
import BottomModal from '#components/Modal/BottomModal';
import colors from '#common/colors';
import BottomButton from '#components/Button/BottomButton';
const styles = StyleSheet.create({
  container: { backgroundColor: colors.white, flex: 1 },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    paddingTop: 53,
    paddingBottom: 30,
    paddingHorizontal: 28,
  },
  titleText: {
    paddingLeft: 6,
    fontSize: 18,
    color: colors.greyBlue,
    // fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
  },
  contentsWrapper: { paddingHorizontal: 28, marginTop: 26 },
  contentsText: {
    textAlign: 'center',
    fontSize: 15,
    color: colors.battleshipGrey,
    lineHeight: 24,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 58,
  },
  selectWrapper_on: {
    borderColor: colors.lightIndigo,
    borderRadius: 28,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 26,
    paddingHorizontal: 18,
    paddingVertical: 17,
    marginVertical: 7,
  },
  selectWrapper_off: {
    borderColor: colors.lightPeriwinkleTwo,
    borderRadius: 28,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 26,
    paddingHorizontal: 18,
    paddingVertical: 17,
    marginVertical: 7,
  },
  headerText: {
    fontSize: 20,
    paddingHorizontal: 28,
    marginTop: 49,
    marginBottom: 43,
    color: colors.blackTwo,
    lineHeight: 30,
  },
  labelText: {
    paddingLeft: 14,
    fontSize: 16,
    color: colors.blackTwo,
    flex: 1,
    lineHeight: 24,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  progressBar: {
    height: 2.5,
    backgroundColor: colors.paleLilacTwo,
  },
  innerProgressBar: {
    height: 2.5,
    backgroundColor: colors.aqua,
  },
  headerRightText: {
    fontSize: 16,
    color: colors.blueGrey,
    marginRight: 20,
  },
  check_on: {
    width: 22,
    height: 22,
  },
  check_off: {
    width: 22,
    height: 22,
  },
  closeButton: { width: 15, height: 15, marginRight: 20 },
  logo: {
    width: 68,
    height: 25,
    marginLeft: 21,
  },
});
const CHECK_LABELS = [
  {
    key: 1,
    label: '주 수입원 없음 (은퇴 등)',
  },
  {
    key: 2,
    label: '변동 없음',
  },
  {
    key: 3,
    label: '감소할 것으로 예상',
  },
  {
    key: 4,
    label: '증가할 것으로 예상',
  },
  {
    key: 5,
    label: '불안정할 것으로 예상',
  },
];
const RecommendChange = (props) => {
  const [checked, setChecked] = useState(null);

  const inset = useSafeAreaInsets();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Image source={assets.logo} style={styles.logo} />,
      headerRight: () => {
        return (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              navigation.navigate('ProfileSettings');
            }}
          >
            <Image
              source={assets.icon_close_lg}
              style={styles.closeButton}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        );
      },
    });
  }, []);
  return (
    <>
      <View style={styles.progressBar}>
        <View style={[styles.innerProgressBar, { width: '40%' }]} />
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>향후 소득의 예상 변화는?</Text>
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
              {checked === item.key ? (
                <Image
                  source={assets.checkbox_on}
                  style={styles.check_on}
                  resizeMode={'contain'}
                />
              ) : (
                <Image
                  source={assets.checkbox_off}
                  style={styles.check_off}
                  resizeMode={'contain'}
                />
              )}
              <Text style={styles.labelText}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <BottomButton
        disabled={!checked}
        onPress={() => {
          navigation.navigate('RecommendIncome');
        }}
        fontSize={18}
      >
        다음
      </BottomButton>
    </>
  );
};

export default RecommendChange;
