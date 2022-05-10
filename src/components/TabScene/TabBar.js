import React, { useContext, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import assets from '../../../assets';
import colors from '#common/colors';
import { TabContext } from '#components/TabScene/index';
// import RNPickerSelect from 'react-native-picker-select';
import CustomPicker from '../CustomPicker/CustomPicker';

const styles = StyleSheet.create({
  tabView_left: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 20,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightPeriwinkle,
    backgroundColor: colors.white,
  },
  tabBar_left: {
    marginHorizontal: 10,
    marginBottom: -2,
  },
  titleOn_left: {
    fontSize: 14,
    color: colors.dark,
  },
  titleOff_left: { fontSize: 14, color: colors.cloudyBlue },
  indicatorOn_left: {
    borderBottomColor: colors.lightIndigo,
    borderBottomWidth: 2,
    marginTop: 10,
    marginBottom: 2
  },
  indicatorOff_left: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 2,
    marginTop: 10,
    marginBottom: 2
  },
  filterWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  tabBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleOn_pick: {
    fontSize: 18,
    color: colors.dark,
    fontFamily: 'Roboto-Medium',
  },
  titleOff_pick: {
    fontSize: 18,
    color: colors.cloudyBlue,
    fontFamily: 'Roboto-Medium',
  },
  indicatorOn_pick: {
    borderBottomColor: colors.lightIndigo,
    borderBottomWidth: 2,
    marginTop: 18,
  },
  indicatorOff_pick: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 2,
    marginTop: 18,
  },
  tabView_pick: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 20,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightPeriwinkle,
    backgroundColor: colors.white,
  },
  tabBar_pick: {
    marginHorizontal: 10,
    marginBottom: -2,
  },
  tabView_portfolio: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -100,
  },
  tabBar_portfolio: {
    marginHorizontal: 11,
  },
  titleOn_portfolio: {
    color: colors.white,
    fontSize: 18,
  },
  titleOff_portfolio: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 18,
  },
  indicatorOn_portfolio: {
    borderBottomColor: colors.white,
    borderBottomWidth: 2,
    marginTop: 10,
  },
  indicatorOff_portfolio: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 2,
    marginTop: 10,
  },
  filterText: {
    color: colors.cloudyBlue,
    fontSize: 14,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  arrowIcon: { width: 6, height: 4 },
  tabView_center: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  tabBar_center: {
    marginHorizontal: 11,
  },
  titleOn_center: {
    color: colors.lightIndigo,
    fontSize: 18,
  },
  titleOff_center: {
    color: colors.blueyGrey,
    opacity: 0.5,
    fontSize: 18,
  },
  indicatorOn_center: {
    borderBottomColor: colors.lightIndigo,
    borderBottomWidth: 2,
    marginTop: 10,
  },
  indicatorOff_center: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 2,
    marginTop: 10,
  },
  tabView_detail: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 38,
  },
  tabBar_detail: {
    marginHorizontal: 11,
  },
  titleOn_detail: {
    color: colors.lightIndigo,
    fontSize: 18,
  },
  titleOff_detail: {
    color: colors.dark,
    fontSize: 18,
  },
  indicatorOn_detail: {
    borderBottomColor: colors.lightIndigo,
    borderBottomWidth: 2,
    marginTop: 10,
  },
  indicatorOff_detail: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 2,
    marginTop: 10,
  },
  tabView_popup: {
    flexDirection: 'row',
    marginTop: 25,
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  tabBar_popup: {
    marginHorizontal: 11,
  },
  titleOn_popup: {
    color: colors.lightIndigo,
    fontSize: 18,
  },
  titleOff_popup: {
    color: colors.dark,
    fontSize: 18,
  },
  indicatorOn_popup: {
    borderBottomColor: colors.lightIndigo,
    borderBottomWidth: 2,
    marginTop: 10,
  },
  indicatorOff_popup: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 2,
    marginTop: 10,
  },
  closeButton: {
    width: 15,
    height: 15,
    marginTop: 5,
    marginRight: 15,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

const TabBar = ({
  type,
  onPress,
  pickerItems,
  onPickerChange,
  selectedPickerItem,
}) => {
  const { screens, onChangeIndex, index } = useContext(TabContext);
  const [selectedFilter, setSelectedFilter] = useState(
    selectedPickerItem || '',
  );
  return (
    <View
      style={[
        styles['tabView_' + type],
        Platform.OS === 'android' && { paddingRight: 0 },
      ]}
    >

      {
        type=='feed'?
        <View style={[styles.tabBarWrapper,{flex:1}]}>
        {screens?.map?.((v, ix) => (
          <TouchableOpacity
            key={ix}
            activeOpacity={0.85}
            style={{flex:1}}
            onPress={() => onChangeIndex?.(ix)}
          >
            {ix === index ? (
               <View style={{alignItems:'center'}}>
             <Text style={styles['titleOn_left']}>{v.props.title}</Text>

               </View>
            ) : (
              <View style={{alignItems:'center'}}>

              <Text style={styles['titleOff_left']}>{v.props.title}</Text>
              </View>
            )}

            {ix === index ? (
              <View style={[styles['indicatorOn_left'], Platform.OS === 'android' && {paddingTop: 4}]} />
            ) : (
              <View style={[styles['indicatorOff_left'], Platform.OS === 'android' && {paddingTop: 4}]} />
            )}
          </TouchableOpacity>
        ))}
      </View>:
      <View style={styles.tabBarWrapper}>
        {screens?.map?.((v, ix) => (
          <TouchableOpacity
            key={ix}
            activeOpacity={0.85}
            style={styles['tabBar_' + type]}
            onPress={() => onChangeIndex?.(ix)}
          >
            {ix === index ? (
              <Text style={styles['titleOn_' + type]}>{v.props.title}</Text>
            ) : (
              <Text style={styles['titleOff_' + type]}>{v.props.title}</Text>
            )}

            {ix === index ? (
              <View style={[styles['indicatorOn_' + type], Platform.OS === 'android' && {paddingTop: 4}]} />
            ) : (
              <View style={[styles['indicatorOff_' + type], Platform.OS === 'android' && {paddingTop: 4}]} />
            )}
          </TouchableOpacity>
        ))}
      </View>
      }

      {type === 'pick' ? (
        <View style={{ justifyContent: 'center' }}>
          <CustomPicker
            value={selectedFilter}
            onSelect={(value) => {
              setSelectedFilter(value);
              onPickerChange && onPickerChange(value);
            }}
            data={pickerItems}
          />
        </View>
      ) : null}
      {type === 'popup' ? (
        <TouchableOpacity activeOpacity={0.85} onPress={onPress} >
          <Image source={assets.icon_close_lg} style={styles.closeButton} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default TabBar;
