import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '#common/colors';
const styles = StyleSheet.create({
  container: { backgroundColor: colors.white, flex: 1 },
  titleArea: { paddingVertical: 15, paddingHorizontal: 20 },
  titleText: { letterSpacing: -0.35, color: colors.dark },
  dateText: {
    color: colors.greyBlue,
    fontSize: 13,
    letterSpacing: -0.32,
    marginTop: 3,
  },
  mainTextArea: {
    borderTopWidth: 1,
    borderTopColor: colors.paleGrey,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  bullet: {
    color: colors.dark,
  },
  mainText: { letterSpacing: -0.35, color: colors.dark, lineHeight: 19 },
  tableWrapper: { flexDirection: 'row', marginVertical: 15 },
  table: {
    borderWidth: 1,
    borderColor: colors.blueyGrey,
    flex: 1,
  },
  tableText: { padding: 10, letterSpacing: -0.35, color: colors.dark },
  tableItems: {
    borderTopWidth: 1,
    borderColor: colors.blueyGrey,
  },
});
const NoticeDetails = (props) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.titleArea}>
        <Text style={styles.titleText}>픽해주 서비스 이용 약관 변경 안내</Text>
        <Text style={styles.dateText}>2021.02.20</Text>
      </View>
      {/*공지 사항 내용 부분*/}
      <View style={styles.mainTextArea}>
        <Text style={styles.mainText}>
          안녕하세요. 픽해주 팀입니다.{'\n'}
          {'\n'}다가오는 2021년 2월 25일부로 픽해주 서비스 이용 약관이 다음과
          같이 변경됨을 안내드립니다.
          {'\n'}
          {'\n'}
          <Text style={{ fontFamily: 'Roboto-Bold' }}>서비스 이용 약관 개정 내용</Text>
          {'\n'}
          {'\n'}
          <Text style={styles.bullet}> &#8901;</Text>
          <Text>서비스 관련 수탁사 확장</Text>
        </Text>
        <View style={styles.tableWrapper}>
          <View style={styles.table}>
            <Text style={styles.tableText}>개정 전</Text>
            <View style={styles.tableItems}>
              <Text style={[styles.tableText, { lineHeight: 19 }]}>
                제6장. 개인정보처리의 위탁 {'\n'}- (신규)
              </Text>
            </View>
          </View>
          <View style={[styles.table, { borderLeftWidth: 0 }]}>
            <Text style={styles.tableText}>개정 후</Text>
            <View style={styles.tableItems}>
              <Text style={[styles.tableText, { lineHeight: 19 }]}>
                제6장. 개인정보처리의 위탁 {'\n'}- (주)씨제이올리브네트웍스,
                (주)인포뱅크: 카카오 알림톡, SMS/LMS/MMS 발송 서비스
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.mainText}>
          본 개정에 동의하지 않으시는 경우 거부 의사 표시(회원탈 퇴를 하실 수
          있으며, 거부 의사를 표시하지 않으신 경우 개정에 동의하신 것으로
          간주됩니다.
          {'\n'}
          {'\n'}
          픽해주는 회원님의 개인정보를 안전하게 활용하고 관련 법규에 의거하여
          보호하고 있습니다.
        </Text>
      </View>
    </ScrollView>
  );
};

export default NoticeDetails;
