import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import colors from '#common/colors';
import assets from '../../../assets';

const styles = StyleSheet.create({
  container: {},
  inputBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 12,
    borderColor: colors.lightPeriwinkle,
    borderBottomWidth: 1,
  },
  input: { flex: 1, paddingVertical: 12 },
  subTitle: { color: colors.greyBlue },
  blindIcon: { width: 20, height: 18 },
  message: { marginTop: 10, color: colors.watermelon },
  messageSuccess: { marginTop: 10, color: colors.softBlue },
});

const InputBox = ({
  placeholder,
  title,
  value,
  onChangeText,
  message,
  onFocus,
  maxLength,
  blindIcon,
  blindState,
  autoCapitalize,
  inputStatus,
  placeholderTextColor,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [blind, setBlind] = useState(blindState);

   return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>{title}</Text>
      <View
        style={
          inputStatus === 'focused'
            ? [styles.inputBox, { borderBottomColor: colors.lightIndigo }]
            : inputStatus === 'error'
            ? [styles.inputBox, { borderBottomColor: colors.watermelon }]
            : [styles.inputBox, { borderBottomColor: colors.lightPeriwinkle }]
        }
      >
        <TextInput
          style={[styles.input]}
          maxLength={maxLength}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={blind}
          autoCapitalize={autoCapitalize}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {blindIcon && (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              setBlind(!blind);
            }}
          >
            <Image
              source={
                blind ? assets.icon_news_view : assets.icon_news_view_color
              }
              style={styles.blindIcon}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        )}
      </View>
      {message?.error ? (
        <Text style={[styles.message]}>{message.error}</Text>
      ) : null}
      {message?.success ? (
        <Text style={[styles.messageSuccess]}>{message.success}</Text>
      ) : null}
    </View>
  );
};

export default InputBox;
