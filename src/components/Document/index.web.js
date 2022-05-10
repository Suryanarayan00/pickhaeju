import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import colors from '#common/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import assets from '../../../assets';
import WebHeader from '#components/WebHeader';
import WebFooter from '#components/WebFooter';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
  },
  upButton: {
    width: 50,
    height: 50,
    position: 'absolute',
    zIndex: 140,
    right: 20,
    bottom: 20,
  },
});

const Document = ({ children }) => {
  return (
    <>
      <ScrollView style={{ backgroundColor: colors.white }}>
        <WebHeader />
        <View style={styles.container}>{children}</View>
        <WebFooter />
      </ScrollView>
      <TouchableOpacity activeOpacity={0.85}>
        <Image source={assets.btn_up} style={styles.upButton} />
      </TouchableOpacity>
    </>
  );
};

export default Document;
