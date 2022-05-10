import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import colors from '#common/colors';
import assets from '../../assets';

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.paleGreyFive,
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingLeft: 160,
  },
  guideLine: {
    width: 1,
    height: 16,
    backgroundColor: colors.dark,
    marginHorizontal: 10,
  },
  footerIconBox: { flexDirection: 'row', marginHorizontal: -10 },
  footerIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  footerLogo: {
    width: 106,
    height: 40,
  },
  footerInfoWrapper: { flexDirection: 'row', marginVertical: 30 },
  infoText: {
    color: colors.greyishBrown,
    fontSize: 14,
    lineHeight: 21,
    flex: 1,
  },
  infoTextBox: { marginLeft: 20, flex: 1 },
  textButtonBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonItem: { flexDirection: 'row', justifyContent: 'space-between' },
  menuButton: { fontSize: 9, color: colors.blackThree },

  itemWrapper: { maxWidth: 1200, width: '100%', alignSelf: 'center' },
  buttonText: {
    fontSize: 16,
    color: colors.blackTwo,
  },
  copyrightText: {
    fontSize: 14,
    color: colors.warmGreyThree,
    marginTop: 10,
  },
});
const WebFooter = (props) => {
  return (
    <View style={styles.footer}>
      <View style={styles.itemWrapper}>
        <View style={styles.buttonItem}>
          <View style={styles.textButtonBox}>
            <TouchableOpacity activeOpacity={0.85} style={styles.textButton}>
              <Text style={styles.buttonText}>이용약관</Text>
            </TouchableOpacity>
            <View style={styles.guideLine} />
            <TouchableOpacity activeOpacity={0.85} style={styles.textButton}>
              <Text style={styles.buttonText}>운영원칙</Text>
            </TouchableOpacity>
            <View style={styles.guideLine} />
            <TouchableOpacity activeOpacity={0.85} style={styles.textButton}>
              <Text style={styles.buttonText}>개인정보처리방침</Text>
            </TouchableOpacity>
            <View style={styles.guideLine} />
            <TouchableOpacity activeOpacity={0.85} style={styles.textButton}>
              <Text style={styles.buttonText}>고객센터</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerIconBox}>
            <TouchableOpacity style={{ paddingHorizontal: 10 }}>
              <Image source={assets.icon_blog} style={styles.footerIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingHorizontal: 10 }}>
              <Image source={assets.icon_facebook} style={styles.footerIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingHorizontal: 10 }}>
              <Image source={assets.icon_youtube} style={styles.footerIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingHorizontal: 10 }}>
              <Image source={assets.icon_instagram} style={styles.footerIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footerInfoWrapper}>
          <Image source={assets.logo_grey} style={styles.footerLogo} />
          <View style={styles.infoTextBox}>
            <Text style={styles.infoText}>
              픽해주가 제공하는 금융 정보는 각 콘텐츠 제공업체로부터 받는 투자
              참고사항이며, 오류가 발생하거나 지연될 수 있습니다.{'\n'}
              픽해주와 콘텐츠 제공업체는 제공된 정보에 의한 투자 결과에 법적인
              책임을 지지 않습니다. 게시된 정보는 무단으로 배포할 수 없습니다.
            </Text>
            <Text style={styles.copyrightText}>
              ⓒ 픽해주. All Rights Reserved.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WebFooter;
