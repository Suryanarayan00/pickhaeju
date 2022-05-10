import React, { useRef } from 'react';
import {
  Animated,
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import colors from '#common/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useScrollToTop } from '@react-navigation/native';
import assets from '../../../assets';

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    width: '100%',
    top: 0,
    zIndex: 100,
  },
  upButtonWrapper: {
    paddingHorizontal: 20,
  },
  upIcon: { width: 50, height: 50 },
  upButton: {
    position: 'absolute',
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: colors.whiteThree,
    paddingLeft: 20,
    paddingTop: 28,
    // paddingBottom: 68.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: { fontSize: 10, color: colors.blueyGreyTwo, lineHeight: 15 },
});
const Document = ({
  renderHeader,
  headerHeight,
  style,
  children,
  showTopButton = false,
  footerContents = false,
  isTab,
  scrollProps = {},
  scrollRef,
}) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const opacity = scrollY.interpolate({
    inputRange: [0, headerHeight || 0],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const scrollViewRef = React.useRef(null);
  const inset = useSafeAreaInsets();

  const onPress = () => {
    scrollViewRef.current.scrollTo({ y: 0 });
  };
  const Warp =
    (Platform.OS === 'android' || Platform.OS === 'ios') && isTab
      ? Animated.View
      : Animated.ScrollView;
  return (
    <>
      {renderHeader && (
        <Animated.View style={[styles.header, { opacity }]}>
          {renderHeader()}
        </Animated.View>
      )}
      <Warp
        ref={(ref) => {
          scrollViewRef.current = ref;
          if (scrollRef) {
            scrollRef.current = ref;
          }
        }}
        style={[
          {
            flex: 1,
            backgroundColor: colors.white,
          },
          style,
        ]}
        onScroll={Animated.event(
          // scrollX = e.nativeEvent.contentOffset.x
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}
        contentContainerStyle={{
          flexGrow: 1,
          //paddingBottom: inset.bottom,
        }}
        {...scrollProps}
      >
        {children}
        {footerContents && (
          <View style={[styles.footer]}>
            {/* <Text style={[styles.footerText, { flex: 1 }]}>
              본 플랫폼은 투자판단에 참고용으로만 사용하실 수 있으며, 본 정보를
              이용한 모든 투자판단은 투자자의 책임으로 당사는 이에 대한 일체의
              법적 책임을 지지 않습니다.
            </Text>

            <View style={styles.upButtonWrapper}>
              <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
                <Image
                  source={assets.arrow_up_off}
                  style={styles.upIcon}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View> */}
          </View>
        )}
        {showTopButton && (
          <View style={[styles.footer]}>
            {/* <Text style={[styles.footerText, { flex: 1 }]}>
              본 플랫폼은 투자판단에 참고용으로만 사용하실 수 있으며, 본 정보를
              이용한 모든 투자판단은 투자자의 책임으로 당사는 이에 대한 일체의
              법적 책임을 지지 않습니다.
            </Text>

            <View style={styles.upButtonWrapper}>
              <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
                <Image
                  source={assets.arrow_up_off}
                  style={styles.upIcon}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View> */}
         </View>
        )}
      </Warp>
    </>
  );
};

export default Document;
