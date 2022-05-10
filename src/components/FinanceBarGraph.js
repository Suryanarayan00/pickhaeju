import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '#common/colors';
import React, { useState } from 'react';
import assets from '../../assets';
import HelpPopup from './HelpPopup';
import Gauge from '#components/Gauge';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 16,
  },
  title: {
    fontSize: 14,
    letterSpacing: -0.35,
    color: colors.greyBlue,
    marginRight: 7,
  },
  graphBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 13,
    marginTop: 8,
  },
  outsideBar: {
    width: 140,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgb(230,233,244)',
  },
  pointStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.lightIndigo,
    shadowColor: 'rgba(182,101,293,0.4)',
    shadowOffset: {
      height: 3,
    },
    shadowOpacity: 0.4,
    elevation: 4,
  },
  questionIcon: {
    width: 16,
    height: 16,
    borderRadius: 7,
  },
  text: { color: colors.dark, fontSize: 14 },
});
const FinanceBarGraph = ({ title, startingText, endingText, help, value }) => {
  const [showHelp, setShowHelp] = useState(null);
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setShowHelp(help)}
        >
          <Image source={assets.icon_question} style={styles.questionIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.graphBox}>
        <Text style={styles.text}>{startingText}</Text>
        <View style={{ width: 140 }}>
          <Gauge value={value} />
        </View>

        {/* <View style={styles.outsideBar}>
          <View style={styles.pointStyle} />
        </View> */}
        <Text style={styles.text}>{endingText}</Text>
      </View>

      <HelpPopup
        isVisible={!!showHelp}
        help={showHelp}
        onCancel={() => {
          setShowHelp(null);
        }}
      />
    </>
  );
};
export default FinanceBarGraph;
