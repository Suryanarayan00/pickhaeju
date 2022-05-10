import React, { useState } from 'react';
import {
  Image, ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '#common/colors';
import assets from '../../../assets';
import { useNavigation } from '@react-navigation/native';
import NotifyPopUp from '#components/NotifyPopUp';
import ToggleSwitch from '#components/ToggleSwitch';

const styles = StyleSheet.create({
  notifyWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  mainTitle: {
    paddingHorizontal: 1,
    fontSize: 18,
    letterSpacing: -0.45,
    color: colors.dark,
    paddingBottom: 12,
  },
  subTitle: {
    fontSize: 14,
    letterSpacing: -0.35,
    color: colors.greyBlue,
  },
  followerBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followerNum: {
    fontSize: 14,
    color: colors.greyBlue,
    letterSpacing: -0.35,
    paddingRight: 14,
  },
  container: { backgroundColor: colors.white, flex: 1 },
  section: { paddingHorizontal: 20, marginTop: 20 },
  switchStyle: { width: 40, height: 20 },
  switchCircleStyle: { width: 16, height: 16 },
  arrowIcon: {
    width: 8,
    height: 14,
    marginRight: 16,
  },
});
const NotifySettings = (props) => {
  const navigation = useNavigation();
  const [isEnables, setIsEnables] = useState(Array(9).fill(false));
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const toggleEnables = (index) => {
    const tempEnables = [...isEnables];

    tempEnables[index] = !tempEnables[index];
    setIsEnables(tempEnables);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.mainTitle}>전체</Text>
        <View style={styles.notifyWrapper}>
          <Text style={styles.subTitle}>전체 알림 받기</Text>
          <ToggleSwitch
            state={isEnables[0]}
            setState={() => toggleEnables(0)}
            containerStyle={[styles.switchStyle]}
            circleStyle={[styles.switchCircleStyle]}
            activeColor={colors.lightIndigo}
          />
        </View>
        <View style={styles.notifyWrapper}>
          <Text style={styles.subTitle}>공지 알림 받기</Text>
          <ToggleSwitch
            state={isEnables[1]}
            setState={() => toggleEnables(1)}
            containerStyle={[styles.switchStyle]}
            circleStyle={[styles.switchCircleStyle]}
            activeColor={colors.lightIndigo}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => {
            navigation.navigate('Notice');
          }}
          style={[styles.notifyWrapper, { marginVertical: 5 }]}
        >
          <Text style={styles.subTitle}>공지사항</Text>
          <Image source={assets.notify_arrow} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.mainTitle}>팔로워</Text>
        <View style={styles.notifyWrapper}>
          <Text style={styles.subTitle}>전체 알림 받기</Text>
          <ToggleSwitch
            state={isEnables[2]}
            setState={() => toggleEnables(2)}
            containerStyle={[styles.switchStyle]}
            circleStyle={[styles.switchCircleStyle]}
            activeColor={colors.lightIndigo}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => {
            navigation.navigate('NotifyFollower');
          }}
          style={[styles.notifyWrapper, { marginVertical: 5 }]}
        >
          <Text style={styles.subTitle}>팔로워별 알림 설정</Text>
          <View style={styles.followerBox}>
            <Text style={styles.followerNum}>4</Text>
            <Image source={assets.notify_arrow} style={styles.arrowIcon} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.mainTitle}>MY</Text>
        <View style={styles.notifyWrapper}>
          <Text style={styles.subTitle}>전체 알림 받기</Text>
          <ToggleSwitch
            state={isEnables[3]}
            setState={() => toggleEnables(3)}
            containerStyle={[styles.switchStyle]}
            circleStyle={[styles.switchCircleStyle]}
            activeColor={colors.lightIndigo}
          />
        </View>
        <View style={styles.notifyWrapper}>
          <Text style={[styles.subTitle]}>
            - 관리자 승인 알림 받기
          </Text>
          <ToggleSwitch
            state={isEnables[4]}
            setState={() => toggleEnables(4)}
            containerStyle={[styles.switchStyle]}
            circleStyle={[styles.switchCircleStyle]}
            activeColor={colors.lightIndigo}
          />
        </View>
        <View style={styles.notifyWrapper}>
          <Text style={[styles.subTitle]}>
            - 관리자 미승인 알림 받기
          </Text>
          <ToggleSwitch
            state={isEnables[5]}
            setState={() => toggleEnables(5)}
            containerStyle={[styles.switchStyle]}
            circleStyle={[styles.switchCircleStyle]}
            activeColor={colors.lightIndigo}
          />
        </View>
        <View style={styles.notifyWrapper}>
          <Text style={[styles.subTitle]}>
            - 관리자 수정요청 알림 받기
          </Text>
          <ToggleSwitch
            state={isEnables[6]}
            setState={() => toggleEnables(6)}
            containerStyle={[styles.switchStyle]}
            circleStyle={[styles.switchCircleStyle]}
            activeColor={colors.lightIndigo}
          />
        </View>
        <View style={styles.notifyWrapper}>
          <Text style={[styles.subTitle]}>
            - 내 PICK의 댓글 알림 받기
          </Text>
          <ToggleSwitch
            state={isEnables[7]}
            setState={() => toggleEnables(7)}
            containerStyle={[styles.switchStyle]}
            circleStyle={[styles.switchCircleStyle]}
            activeColor={colors.lightIndigo}
          />
        </View>
        <View style={styles.notifyWrapper}>
          <Text style={[styles.subTitle]}>
            - 내 댓글의 답글 알림 받기
          </Text>
          <ToggleSwitch
            state={isEnables[8]}
            setState={() => toggleEnables(8)}
            containerStyle={[styles.switchStyle]}
            circleStyle={[styles.switchCircleStyle]}
            activeColor={colors.lightIndigo}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default NotifySettings;
