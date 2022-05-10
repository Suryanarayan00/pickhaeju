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
    fontSize: 15,
    color: colors.blackTwo,
    flex: 1,
    lineHeight: 22,
  },
  nameText: {
    fontSize: 12,
    lineHeight: 24,
    color: colors.blackTwo,
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
    name: '존 보글 (뱅가드 설립자)',
    label:
      '“저비용, 패시브 인덱스펀드에 \n' +
      '투자하라. 장기적 관점에서 \n' +
      '초과수익은 신화일 뿐이다.”',
  },
  {
    key: 2,
    name: '워런 버핏 (버크셔 해서웨이 CEO)',
    label: '“양말을 사던 주식을 사던 \n' + '가격이 아닌 가치를 봐라.”',
  },
  {
    key: 3,
    name: '레이 달리오 (올웨더 전략)',
    label: '“멋있어 보이려 하지 마라. \n' + '목표에만 집중해라.”',
  },
  {
    key: 4,
    name: '필립 피셔 (워런 버핏의 스승)',
    label:
      '“포트폴리오 구성에 연연하지 말고 \n' + '똑똑한 소수의 주식에 투자하라.”',
  },
  {
    key: 5,
    name: '제시 리버모어 (전설의 단타 트레이더)',
    label: '“신고가에서 주식을 더 사라. \n' + '오른 것은 오른 이유가 있다.”',
  },
];
const RecommendWord = (props) => {
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
        <View style={[styles.innerProgressBar, { width: '80%' }]} />
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>
          전설적인 투자자들의 투자 격언입니다.{'\n'}회원님 철학과 가장 일치하는
          것은?
        </Text>
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
              <View style={{ paddingLeft: 14 }}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.labelText}>{item.label}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <BottomButton
        disabled={!checked}
        onPress={() => {
          navigation.navigate('RecommendScale');
        }}
        fontSize={18}
      >
        다음
      </BottomButton>
    </>
  );
};

export default RecommendWord;
