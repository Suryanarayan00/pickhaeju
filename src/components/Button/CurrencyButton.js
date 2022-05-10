import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import colors from '#common/colors';
import assets from '../../../assets';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  changeCurrency,
  CURRENCY_KRW,
  CURRENCY_USD,
} from '../../data/common/actions';
import Animated, { Easing } from 'react-native-reanimated';

const styles = StyleSheet.create({
  currency: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
});

const CurrencyButton = ({
  color = colors.purple,
  rotateCount = 2,
  duration = 700,
  enableAnimated = true,
}) => {
  const [animated] = useState(new Animated.Value(0));
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const { currentCurrency } =
    useSelector((s) => s?.common?.currency, shallowEqual) || {};
  const [currencySymbol, setCurrencySymbol] = useState(currentCurrency);

  useEffect(() => {
    setCurrencySymbol(currentCurrency);
  }, [currencySymbol]);

  // console.log('usd', currencyCalc(1));
  const change = () => {
    let toValue = toggle ? 0 : rotateCount * 2;

    if (!!enableAnimated) {
      Animated.timing(animated, {
        easing: Easing.ease,
        toValue,
        duration,
        delay: 0,
      }).start();
    } else {
      animated.setValue(toValue);
    }

    setToggle(!toggle);

    if (currentCurrency === CURRENCY_KRW) {
      dispatch(changeCurrency(CURRENCY_USD));
    } else {
      dispatch(changeCurrency(CURRENCY_KRW));
    }

    setTimeout(() => {
      setCurrencySymbol(
        currentCurrency === CURRENCY_KRW ? CURRENCY_USD : CURRENCY_KRW,
      );
    }, duration / 2);
  };

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={change}>
      <Animated.Image
        style={[
          styles.currency,
          {
            tintColor: color,
            transform: [
              {
                translateY: animated.interpolate({
                  inputRange: [0, rotateCount, rotateCount * 2],
                  outputRange: [0, -30, 0],
                }),
              },
              {
                scaleX: animated.interpolate({
                  inputRange: Array(rotateCount * 2 + 1)
                    .fill(0)
                    .map?.((_, i) => i),
                  outputRange: Array(rotateCount * 2 + 1)
                    .fill(0)
                    .map?.((_, i) => (i % 2 == 0 ? 1 : -1)),
                }),
              },
            ],
          },
        ]}
        source={
          currencySymbol == CURRENCY_KRW
            ? assets.won
            : assets.title_dollor_color
        }
        resizeMode={'contain'}
      />
    </TouchableOpacity>
  );
};

export default CurrencyButton;
