import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, Text, View , TouchableOpacity } from 'react-native';
import InputBox from '#components/Input/InputBox';
import CheckLabel from '#components/CheckLabel';
import DefaultButton from '#components/Button/DefaultButton';
import colors from '#common/colors';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { restApi } from '#common/api';
import { changeNickName } from '../../common/authApi';
import { me } from '../../data/auth/actions';
import BottomButton from '#components/Button/BottomButton';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  titleWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
    marginBottom: 26,
  },
  inputPassword: { paddingHorizontal: 30, marginVertical: 16 },
  inputBox: {
    borderBottomColor: colors.lightIndigo,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 45,
    paddingRight: 12,
  },
  checkTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonWrapper: { paddingHorizontal: 30, marginTop: 19 },
  titleText: { fontSize: 20, color: colors.dark },
  boldText: {
    // fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: colors.dark,
  },
  normalText: { fontSize: 20, color: colors.dark },
  checkIcon: { width: 12, height: 8 },
  subTitle: { color: colors.greyBlue },
  checkText: { color: colors.lightIndigo },
  progressBar: {
    height: 2.5,
    backgroundColor: colors.paleLilacTwo,
  },
  innerProgressBar: {
    height: 2.5,
    backgroundColor: colors.aqua,
  },
  inputContainer: {
    paddingHorizontal: 30,
    marginVertical: 16,
  },

  checkLabelDistance: {
    marginRight: 10,
  },

  inputCheckLabelContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft:30
  },
});
 const ModifyNickname = (props) => {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const route = useRoute();
  const [nickname, setNickname] = useState();
  const [nicknameResult, setNicknameResult] = useState(false);
  const [valid, setValid] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.principal);
  const isDisabled = !(nicknameResult && valid);

  const nicknameChecker = async (nickname) => {
    setNickname(nickname);
    const reg = /^[0-9a-zA-Z가-힣]{4,}$/;
    if (!nickname) {
      setNicknameResult(false);
      return;
    } else if (nickname.length > 12) {
      setNicknameResult(false);
      return;
    } else if (!reg.test(nickname)) {
      setNicknameResult(false);
    } else {
      setNicknameResult(true);
    }
    try {
      
      const { data } = await restApi.get(`api/v3/user/check-duplicate`, {
        params: {
          name: nickname,
      }
      });
      if (data) {
        setValid(false);
      } else {
        setValid(true);
      }
    } catch (error) { console.log(error)}
  };

  const onPressModifyNickName = async () => {
    await changeNickName(nickname);
    await dispatch(me());
    navigation.goBack();
  };

  return (
    // <ScrollView keyboardDismissMode={'on-drag'} style={styles.container}>
    //   <View style={[styles.inputContainer]}>
    //     <InputBox
    //       title={'닉네임'}
    //       blindIcon={false}
    //       value={nickname}
    //       onChangeText={nicknameChecker}
    //       autoCapitalize={'none'}
    //       placeholder={userInfo?.name}
    //       placeholderTextColor={colors.dark}
    //     />
    //     <View style={[styles.inputCheckLabelContainer]}>
    //       <CheckLabel
    //         text={'12자 이내'}
    //         containerStyle={[styles.checkLabelDistance]}
    //         disabled={!nicknameResult}
    //       />
    //       <CheckLabel
    //         text={'중복 되지 않음'}
    //         containerStyle={[styles.checkLabelDistance]}
    //         disabled={!valid}
    //       />
    //     </View>
    //   </View>
    //   <View style={styles.buttonWrapper}>
    //     <DefaultButton disabled={isDisabled} onPress={onPressModifyNickName}>
    //       닉네임 수정하기
    //     </DefaultButton>
    //   </View>
    // </ScrollView>
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={[styles.inputContainer]}>
      <InputBox
        title={'닉네임'}
        blindIcon={false}
        value={nickname}
        onChangeText={nicknameChecker}
        autoCapitalize={'none'}
        placeholder={userInfo?.name}
        placeholderTextColor={colors.dark}
      />
      </View>
      <View style={[styles.inputCheckLabelContainer]}>
        {/* <CheckLabel
          text={'12자 이내'}
          containerStyle={[styles.checkLabelDistance]}
          disabled={!nicknameResult}
        />
        <CheckLabel
          text={'중복 되지 않음'}
          containerStyle={[styles.checkLabelDistance]}
          disabled={!valid}
        /> */}
         <CheckLabel
          text={'12자 이내'}
          containerStyle={[styles.checkLabelDistance]}
          disabled={!nicknameResult}
        />
        <CheckLabel
          text={'중복 되지 않음'}
          containerStyle={[styles.checkLabelDistance]}
          disabled={!valid}
        />
      </View>
       {/* <TouchableOpacity 
      onPress={() => onPressModifyNickName()}
      style={{bottom:0,position:'absolute',backgroundColor:colors.lightIndigo,height:60,width:'100%',alignItems:'center',justifyContent:'center'}}>
        <Text style={{color:'white'}}>닉네임 수정하기</Text>
       </TouchableOpacity> */}
       
       <BottomButton
        disabled={
          !nicknameResult ||
          !valid 
        }
        onPress={onPressModifyNickName}
        style={{ width: '100%',bottom:0,position:'absolute' }}
      >
        닉네임 수정하기
      </BottomButton>
    </View>
  );
};

export default ModifyNickname;
