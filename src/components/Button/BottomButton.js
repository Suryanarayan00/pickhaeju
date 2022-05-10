import React from 'react';
import DefaultButton from '#components/Button/DefaultButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '#common/colors';


const BottomButton = ({ children, onPress, disabled, style }) => {
  const inset = useSafeAreaInsets();
  return (
     <DefaultButton
      fontSize={18}
      disabled={disabled}
      focusColor= {colors.lightIndigo}
      containerStyle={[{ paddingBottom: inset.bottom }, style]}
      onPress={onPress}
    >
      {children}
    </DefaultButton>
  );
};

export default BottomButton;
