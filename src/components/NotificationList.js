import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '#common/colors';
import assets from '../../assets';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  contents: {
    color: colors.dark,
    letterSpacing: -0.35,
    fontSize: 14,
  },
  timeText: {
    fontSize: 13,
    color: colors.cloudyBlue,
    letterSpacing: -0.32,
  },
  stockName: {
    color: colors.lightIndigo,
    fontSize: 13,
    letterSpacing: -0.32,
  },
  nickName: {
    color: colors.greyBlue,
    fontSize: 13,
    letterSpacing: -0.32,
  },
  titleText: {
    marginLeft: 0.5,
    color: colors.greyBlue,
    fontSize: 13,
    letterSpacing: -0.32,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bullet: { color: colors.cloudyBlueTwo },
  headerWrapper: { flexDirection: 'row', alignItems: 'center' },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  textWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  textBox: { marginLeft: 12, flex: 1 },
  newIcon: { width: 17, height: 17, marginLeft: 5 },
  contentsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 0.5,
  },
  badgeWrapper: { flexDirection: 'row', alignItems: 'flex-end' },
});

const NotificationList = ({
  time,
  stockname,
  nickname,
  contents,
  image,
  title,
  newbadge,
  type,
  userId,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.container}
      onPress={() => {
        if (type === 'admin') {
          // navigation.navigate();
        }
        if (type === 'pick') {
          // navigation.navigate('PickDetails', { threadId: item.id });
        }
        if (type === 'follow') {
         // navigation.push('OtherProfile', { userId });
        }
      }}
    >
      {!image ? (
        <>
          {!stockname ? (
            <>
              <View style={styles.wrapper}>
                <View style={styles.badgeWrapper}>
                  <Text style={styles.contents} numberOfLines={3}>{contents}</Text>
                  {newbadge === 'new' ? (
                    <Image
                      source={assets.icon_new_badge}
                      style={styles.newIcon}
                      resizeMode={'contain'}
                    />
                  ) : null}
                </View>
                <View>
                  <Text style={styles.timeText}>{time}</Text>
                </View>
              </View>
            </>
          ) : (
            <>
              <View style={styles.wrapper}>
                <View style={styles.headerWrapper}>
                  {/* <Text style={styles.stockName}>{stockname}</Text> */}
                  {!nickname ? (
                    <></>
                  ) : (
                    <Text style={styles.nickName}>
                      <Text style={styles.bullet}> &#183;</Text> {nickname}
                    </Text>
                  )}
                </View>
                <View>
                  <Text style={styles.timeText}>{time}</Text>
                </View>
              </View>
              <View style={[styles.contentsWrapper, { paddingTop: 7 }]}>
                <Text
                  numberOfLines={2}
                  ellipsizeMode={'tail'}
                  style={[styles.contents]}
                >
                  {contents}
                </Text>
                {newbadge ? (
                  <Image
                    source={assets.icon_new_badge}
                    style={styles.newIcon}
                    resizeMode={'contain'}
                  />
                ) : null}
              </View>
            </>
          )}
        </>
      ) : (
        <>
          <View style={styles.headerWrapper}>
            <Image source={{ uri: image }} style={styles.userImage} />
            <View style={styles.textBox}>
              <View style={styles.textWrapper}>
                <Text style={styles.titleText}>{title}</Text>
                <Text style={styles.timeText}>{time}</Text>
              </View>
              <View style={styles.contentsWrapper}>
                <Text style={styles.contents}>{contents}</Text>
                {newbadge ? (
                  <Image
                    source={assets.icon_new_badge}
                    style={styles.newIcon}
                    resizeMode={'contain'}
                  />
                ) : null}
              </View>
            </View>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

export default NotificationList;
