import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
 import colors from '#common/colors';
import assets from '../../../assets';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import QuitPopUp from '#components/QuitPopUp';
import DeleteFollowerPopUp from '#components/DeleteFollowerPopUp';
import { useSelector } from 'react-redux';
import moment from 'moment';

const styles = StyleSheet.create({
  myInfoWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20.5,

    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: colors.dark,
    letterSpacing: -0.4,
    marginRight: 15,
  },
  contents: {
    fontSize: 16,
    color: colors.greyBlue,
    letterSpacing: -0.4,
  },
  modifyButton: {
    maxWidth: 65,
    width: '100%',
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.cloudyBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    letterSpacing: -0.35,
    color: colors.blueyGrey,
  },
  textButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 32,
  },
  textButton: {
    fontSize: 16,
    letterSpacing: -0.4,
    color: colors.dark,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  myInfoSection: { marginVertical: 20 },
  greyBar: { height: 10, backgroundColor: colors.paleGreyThree },
  arrowIcon: { width: 8, height: 14, marginRight: 40 },
  contentsText: { fontSize: 14, letterSpacing: -0.35, color: colors.greyBlue },
  bottomContents: {
    justifyContent: 'space-between',
    flex: 1,
  },
});
const ProfileSettings = (props) => {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const [isVisible, setIsVisible] = useState(false);
  const userInfo = useSelector((state) => state.auth.principal);


    console.log('Profile Setting');
    console.log(userInfo);
  
    return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.myInfoSection}>
        <View
          style={[
            styles.myInfoWrapper,
            { justifyContent: 'space-between', paddingVertical: 5 },
          ]}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.title}>닉네임</Text>
            <Text style={styles.contents}>{userInfo?.name}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.modifyButton}
            onPress={() => {
              navigation.navigate('ModifyNickname');
            }}
          >
            <Text style={styles.buttonText}>수정</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.greyBar} />
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.textButtonWrapper}
        onPress={() => {
          navigation.push('MakeProfile', { path: 'main' });
        }}
      >
        <Text style={[styles.textButton, { marginLeft: 21 }]}>
          프로필 질문 응답 업데이트
        </Text>
        <Image source={assets.notify_arrow} style={styles.arrowIcon} />
      </TouchableOpacity>
      {/* <View style={styles.greyBar} />
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.textButtonWrapper}
        onPress={() => {
          navigation.navigate('RecommendReason');
        }}
      >
        <Text style={[styles.textButton, { marginLeft: 21 }]}>
          종목 추천을 위한 질문 응답 업데이트
        </Text>
        <Image source={assets.notify_arrow} style={styles.arrowIcon} />
      </TouchableOpacity> */}
      <View style={styles.greyBar} />

      <View style={styles.bottomContents}>
        <View style={[styles.textButtonWrapper, { paddingHorizontal: 20 }]}>
          <Text style={styles.textButton}>앱 버전</Text>
          <Text style={styles.contentsText}>
            최신 버전을 사용중입니다 (1.1.1)
          </Text>
        </View>

        <View
          style={[
            styles.textButtonWrapper,
            {
              paddingHorizontal: 20,
              paddingBottom: inset.bottom + 35,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setIsVisible(true);
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.textButton}>탈퇴하기</Text>
          </TouchableOpacity>
          {/* <Text style={styles.contentsText}>
            {moment(_seconds * 1000).format('YYYY.MM.DD')} 가입
          </Text> */}
        </View>
        <QuitPopUp
          isVisible={isVisible}
          onCancel={() => {
            setIsVisible(false);
          }}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileSettings;
