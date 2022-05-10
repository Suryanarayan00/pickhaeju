import {
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import colors from '#common/colors';
import React, { useState } from 'react';
import assets from '../../../assets';

const styles = StyleSheet.create({
  inputWrapper: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: colors.paleGreyThree,
    marginHorizontal: 20,
  },
  inputStyle: {
    height: 80,
    color: colors.dark,
    letterSpacing: -0.35,
    fontSize: 14,
    paddingHorizontal: 8,
    textAlignVertical: 'top',
  },
  commentLengthView: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  
  commentLengthTextStyle: {
    fontSize: 13,
    color: 'rgb(19,21,35)',
  },
  gray: {
    color: 'rgb(187,191,209)',
  },
});
const AddComment = ({
  placeholder,
  value,
  setValue,
  defaultValue,
  nestedReply,
  changeFocusColor,
  focusColor,
  isEditable=true
}) => {
  // const [comment, setComment] = useState('');
  // if(value == 's'){
  //   alert('hi')
  // }
  return (
    <>
      {nestedReply && (
        <View
          style={{
            marginHorizontal: 30,
            marginVertical: 8,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image
            source={assets.icon_news_comment}
            style={[
              {
                width: 10,
                height: 9,
                tintColor: colors.lightIndigo,
              },
            ]}
            resizeMode="contain"
            
          />
           <Text
            style={{
              fontSize: 13,
              color: colors.cloudyBlue,
            }}
          >
            <Text style={{ color: colors.lightIndigo }}>
              {` ${nestedReply?.user?.name} `}
            </Text>
              님에게 답글을 작성 중입니다...
          </Text>
        </View>
      )}
      <View style={[styles.inputWrapper,{borderColor:value == '' ? colors.paleGreyThree : colors.lightIndigo}]}>
        <TextInput
        onFocus={() => {
          changeFocusColor && changeFocusColor(true);
        }}
          multiline
          style={[styles.inputStyle, {borderColor:  focusColor && focusColor ? colors.lightIndigo : colors.paleGreyThree , borderWidth: 1}]}
          maxLength={500}
          placeholder={nestedReply ? '답글을 남겨보세요.' : placeholder}
          onChangeText={(value) => setValue(value)}
          defaultValue={defaultValue}
          value={value}
          onEndEditing={() => {
            changeFocusColor && changeFocusColor(false);
          }}
          editable={isEditable}
        />
      </View>
      {/* {(value === '' || value) && (
        <View style={styles.commentLengthView}>
          <Text style={styles.commentLengthTextStyle}>
            {value?.length}
            <Text style={styles.gray}>/500</Text>
          </Text>
        </View>
      )} */}
    </>
  );
};
export default AddComment;
