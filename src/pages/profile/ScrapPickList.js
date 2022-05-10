import React,{useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PickUser from '#components/PickUser';
import colors from '#common/colors';
import ReplyBlock from '#components/ReplyBlock';
import DefaultButton from '#components/Button/DefaultButton';
import AddComment from '#components/Input/AddComment';
import assets from '../../../assets';
import CheckButton from '#components/Button/CheckButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NewsListItem from '#components/NewsListItem';
import PickListScrapItem from '#components/PickListScrapItem';
import { useNavigation, useRoute } from '@react-navigation/native';

  const styles = StyleSheet.create({
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomColor: colors.lightPeriwinkle,
    borderBottomWidth: 1,
    paddingBottom: 15,
    paddingTop: 32,
  },
  newsWrapper: {
    borderBottomColor: colors.paleGrey,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
  pickWrapper: {
    paddingHorizontal: 20,
    borderBottomColor: colors.paleGrey,
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 18,
  },
});

  const ScrapPickList = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const inset = useSafeAreaInsets();
  let pickList =route.params?.data || [];
  const [pickArr,setPickArr]=useState(pickList);
  console.log('pick list val');
  console.log(pickList);

  return (
    <FlatList
      data={pickArr}
      style={{ flex: 1, backgroundColor: '#fff' }}
      contentContainerStyle={{ flexGrow: 1 }}
      renderItem={({ item, index }) => (
        <View style={styles.pickWrapper}>
           <PickListScrapItem
            item={item?.thread}
            onPress={() => {
              navigation.navigate('PickDetails', { threadId: item?.thread._id });
            }}
            deleteItem={(id)=>{
              let arr = pickArr.filter(function(el){
                return el.id !== id;
              });
              setPickArr(arr);
            }}
          />
        </View>
      )}
    />
  );
};

export default ScrapPickList;
