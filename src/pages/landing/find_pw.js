import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const LandingFindPw = ({ navigation }) => {
  return (
    <View>
      <Text>LandingFindPw</Text>
      <TouchableOpacity onPress={() => navigation.replace('LandingFoundPw')}>
        <Text>비번찾았다</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandingFindPw;
