import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import TabBar from '#components/TabScene/TabBar';
import TabScreens from '#components/TabScene/TabScreens';
import TabProvider from '#components/TabScene';
import FindEmail from '#widgets/find_email_tab';
import FindPassword from '#widgets/find_password_tab';
import colors from '#common/colors';
import { useNavigation } from '@react-navigation/native';
import assets from '../../../assets';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

const LandingFindId = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  /*useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <View
            style={{
              width: 44,
              height: 44,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={assets.icon_prev}
              style={{ width: 15, height: 15 }}
              resizeMode={'contain'}
            />
          </View>
        );
      },
    });
  }, []);*/
  return (
    <View style={styles.container}>
      <TabProvider index={index} onChangeIndex={setIndex}>
        <TabBar type={'center'} />
        <TabScreens>
          <FindEmail title={'이메일 찾기'} />
          <FindPassword title={'비밀번호 찾기'} />
        </TabScreens>
      </TabProvider>
      {/* <TouchableOpacity onPress={() => navigation.replace('LandingFoundId')}>
        <Text>아이디 찾았다?</Text>
      </TouchableOpacity>*/}
    </View>
  );
};

export default LandingFindId;
