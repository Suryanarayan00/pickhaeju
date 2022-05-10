import React, { useRef } from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import assets from '../../assets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '#common/colors';
import PieChart from '#components/Chart/PieChart';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { Animated } from 'react-native';

export const BottomIcon = ({ onPress, size = 67 }) => {
  const { width } = Dimensions.get('screen');
  const inset = useSafeAreaInsets();
  const anim = useRef(new Animated.Value(0)).current;

   const handleOnPress = () => {
    Animated.sequence([
      Animated.timing(anim, {
        toValue: -20,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(anim, {
        toValue: 0,
        // damping: 20,
        bounciness: 20,
        useNativeDriver: true,
      }),
    ]).start();
    onPress?.();
  };

  return (
    <View
      style={{
        position: 'absolute',
        bottom: inset.bottom + 15,
        zIndex: 20,
        alignSelf: 'center',
        alignItems: 'center',
        paddingHorizontal: 17 / 2,
        width: 100,
      }}
    >
      <Svg
        width={size}
        height={size}
        style={{ position: 'absolute', top: 0, alignSelf: 'center' }}
      >
        <Defs>
          <RadialGradient id={'radial'}>
            <Stop offset={0} stopColor={colors.purply} stopOpacity={0.4} />
            <Stop offset={1} stopColor={colors.purply} stopOpacity={0.0} />
          </RadialGradient>
        </Defs>

        <Circle
          cy={size / 2}
          cx={size / 2}
          fill={'url(#radial)'}
          r={size / 2}
        />
      </Svg>
      <Animated.View
        style={{
          transform: [
            {
              translateY: anim,
            },
          ],
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleOnPress}
          style={{
            backgroundColor: colors.purply,
            borderRadius: 25,
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [
              {
                translateY: 0,
              },
            ],
          }}
        >
          {/* <PieChart
            width={25}
            strokeWidth={4}
            distance={0}
            data={[
              {
                value: 25,
                color: colors.aqua,
              },
              { value: 60, color: colors.white, cap: 'round' },
            ]}
          /> */}
            <Image
            source={require('../../assets/FeedPageCircle.png')}
            style={{width: 67.5, height: 67.5,marginTop:11.8}}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export const StackOptions = {
  headerTitleAlign: 'left',
  headerTitleContainerStyle: {
    left: 45,
  },
  headerStyle: {
    shadowOpacity: 0,
    elevation: 0,
  },
  headerTitleStyle: {
    fontSize: 20,
    // fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.5,
    textAlign: 'left',
    color: colors.dark,
  },
  title: '',
  headerBackTitleVisible: false,
  headerBackImage: () => {
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
};
export const StackOptionsModal = {
  headerTitleAlign: 'left',
  headerTitleContainerStyle: {
    left: 45,
  },
  headerTitleStyle: {
    fontSize: 20,
    // fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.5,
    textAlign: 'left',
    color: colors.dark,
  },
  headerBackTitleVisible: false,
};

export default {
  BottomIcon,
  StackOptions,
  StackOptionsModal,
};
