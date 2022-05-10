import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import assets from '../../assets';
import colors from '#common/colors';

const styles = StyleSheet.create({
  deleteButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightIndigo,
    position: 'absolute',
    top: 50,
    right: 0,
  },
  deleteIcon: { width: 10, height: 12 },
  deleteBorder: {
    width: 80,
    height: 80,
    borderWidth: 5,
    borderRadius: 40,
    borderColor: colors.lightIndigo,
  },
  followUserName: {
    fontSize: 12,
    color: colors.blueGrey,
    textAlign: 'center',
    marginTop: 12,
  },
  smallUserImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ffffff',
  },
  largeUserImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
  },
  levelCircle: {
    width: 40,
    height: 18,
    borderRadius: 9,
    borderWidth: 0.5,
    borderColor: colors.lightIndigoTwo,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 5, 
    marginBottom: 3
  },
  levelCircleText: {
    fontSize: 10,
    letterSpacing: -0.45,
    color: colors.lightIndigoTwo,
  },
});
const ProfileRound = ({ deleteButton, item, onDelete, handleLongPress, isLongPressProfile }) => {

  const getMemberRank = (score) => {
    const rankData = { percent: 0, grade: '주린이' };

    if (score > 99 &&  score<=299) {
      return { percent: 25, grade: '초보' };
    }
    if (score > 299 &&  score<=299) {
      return { percent: 50, grade: '중수' };
    }
    if (score > 599 &&  score<=1499) {
      return { percent: 75, grade: '고수' };
    }
    if (score > 1499) {
      return { percent: 100, grade: '신' };
    }
    return rankData;
  };

  const rankData = getMemberRank(item && item.memberPoints && item.memberPoints);
  console.log('ProfileRound', item);
  return (
    <View style={{ marginHorizontal: 10, }}>
      <View
        style={
          (deleteButton === true && isLongPressProfile === true)
            ? styles.deleteBorder
            : {
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              // shadowOpacity: 0.29,
              // shadowRadius: 4.65,

              // elevation: 7,
            }
        }
      >
        <Image
          source={{
            uri: item?.avatar,
          }}
          style={(deleteButton && isLongPressProfile === true) ? styles.smallUserImage : styles.largeUserImage}
        />
        {(deleteButton && isLongPressProfile === true)? (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.deleteButton}
            hitSlop={{ left: 10, right: 5, top: 10, bottom: 10 }}
            onPress={onDelete}
          >
            <Image source={assets.icon_delete} style={styles.deleteIcon} />
          </TouchableOpacity>
        ) : null}
      </View>
      <Text style={styles.followUserName}>{item?.name}</Text>
      <View style={styles.levelCircle}>
        <Text style={styles.levelCircleText}>{rankData && rankData.grade && rankData.grade}</Text>
      </View>
    </View>
  );
};

export default ProfileRound;
