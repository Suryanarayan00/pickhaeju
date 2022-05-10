import React, { useState } from 'react';
import Modal from '#components/Modal';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '#common/colors';
import { withdraw } from '#common/authApi';
import assets from '../../assets';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { clear } from '../data/auth/actions';
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 15,
    paddingBottom: 37,
    paddingTop: 10,
    paddingHorizontal: 35,
  },
  contentsText: {
    textAlign: 'center',
    marginBottom: 25,
    fontSize: 15,
    lineHeight: 24,
    color: colors.battleshipGrey,
  },
  titleText: {
    fontSize: 18,
    color: colors.greyBlue,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    marginVertical: 27,
  },
  cancelText: {
    fontSize: 18,
    color: colors.lightIndigo,
    textAlign: 'center',
  },
  buttonWrapper: { paddingHorizontal: 20 },
  confirmText: {
    fontSize: 18,
    color: colors.battleshipGrey,
    textAlign: 'center',
  },
  updateIcon: { width: 36, height: 36 },
  buttonBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImage: { width: 62, height: 62, borderRadius: 31 },
  inputPassword: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightIndigo,
    paddingVertical: 15,
    justifyContent: 'space-between',
    marginTop: 21,
    marginBottom: 37,
    alignItems: 'center',
  },
  pwText: { fontSize: 13, color: colors.cloudyBlueTwo },
  blindIcon: { width: 20, height: 18 },
  textInput: { flex: 1, paddingHorizontal: 5 },
});
const QuitPopUp = ({ isVisible, onCancel }) => {
  const [blind, setBlind] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <Modal isVisible={isVisible} onCancel={onCancel}>
      <View style={styles.container}>
        <Text style={styles.titleText}>정말로 탈퇴하시나요?</Text>

        <Text style={styles.contentsText}>
          탈퇴 시, 모든 개인정보 및 설정이 삭제되며 이후 복구가 불가능합니다.
        </Text>
        {/* <Text style={styles.contentsText}>
          탈퇴하시려면 비밀번호를 입력해주세요.
        </Text> */}

        {/* <View style={styles.inputPassword}>
          <Text style={styles.pwText}>비밀번호</Text>
          <TextInput style={styles.textInput} secureTextEntry={blind} />
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              setBlind(!blind);
            }}
          >
            <Image
              source={
                blind ? assets.icon_news_view : assets.icon_news_view_color
              }
              style={styles.blindIcon}
            />
          </TouchableOpacity>
        </View> */}
        <View style={styles.buttonBox}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.buttonWrapper}
            onPress={async () => {
              onCancel && onCancel();
              await withdraw();
              await AsyncStorage.clear();
              await dispatch(clear());
              await navigation.popToTop();
              navigation.replace('IntroStack');
            }}
          >
            <Text style={styles.confirmText}>탈퇴하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.buttonWrapper}
            onPress={onCancel}
          >
            <Text style={styles.cancelText}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default QuitPopUp;
