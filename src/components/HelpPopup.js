import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '#common/colors';
import React from 'react';
import Modal from '#components/Modal';
import assets from '../../assets';

const styles = StyleSheet.create({
  container: {
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 9,
    paddingHorizontal: 20,
  },
  contentsText: {
    color: colors.dark,
    letterSpacing: -0.35,
    fontSize: 14,
    marginLeft: 10,
  },
  bottomButtonText: {
    fontSize: 16,
    letterSpacing: -0.4,
    paddingVertical: 18,
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: colors.dark,
  },
  buttonTopBorder: { height: 1, backgroundColor: colors.lightPeriwinkle },
  buttonBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.lightPeriwinkle,
  },
  addButton: {
    flex: 1,
    borderRightColor: colors.lightPeriwinkle,
    borderRightWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    paddingHorizontal: 20,
  },
  descContainer: {
    padding: 20,
  },
  descRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  descBullet: {
    fontSize: 13,
    color: '#333',
    marginRight: 5,
  },
  desc: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  tipRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
  tipBullet: {
    fontSize: 13,
    color: colors.purple,
  },
  tip: {
    flex: 1,
    fontSize: 13,
    color: '#666',
  },
});
const HelpPopup = ({ isVisible, help, onCancel,desclinetwo }) => {
  const { title, desc, tip } = help || {};
  return (
    <Modal isVisible={isVisible} onCancel={onCancel}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{title}</Text>
          <TouchableOpacity activeOpacity={0.85} onPress={onCancel}>
            <Image
              source={assets.icon_close_lg}
              style={{ width: 15, height: 15 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.descContainer}>
          {desc?.map?.((d, index) => {
            return (
              <View key={index} style={styles.descRow}>
                <Text style={styles.descBullet}>-</Text>
                <Text style={styles.desc}>{d}</Text>
              </View>
            );
          })}
             {!!desclinetwo && (
            <View style={styles.tipRow}>
               <Text style={styles.descBullet}>-</Text>
                <Text style={styles.desc}>{desclinetwo}</Text>
            </View>
          )}
          {!!tip && (
            <View style={styles.tipRow}>
              <Text style={styles.tipBullet}>Tip! </Text>
              <Text style={styles.tip}>{tip}</Text>
            </View>
          )}
        </View>

        <View style={styles.buttonBox}>
          <TouchableOpacity style={{ flex: 1 }} onPress={onCancel}>
            <Text
              style={[styles.bottomButtonText, { color: colors.lightIndigo }]}
            >
              닫기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default HelpPopup;
