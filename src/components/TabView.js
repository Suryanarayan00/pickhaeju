import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '#common/colors';
import assets from '../../assets';

const styles = StyleSheet.create({
  tabView_left: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 20,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightPeriwinkle,
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
  },
  indicatorOff_left: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 2,
    marginTop: 10,
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
  },
  titleOff_pick: { fontSize: 18, color: colors.cloudyBlue },
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
  filterText: { color: colors.cloudyBlue, fontSize: 14 },
  arrowIcon: { width: 6, height: 4, marginLeft: 10 },
  tabView_center: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 38,
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
    justifyContent: 'center',
    marginTop: 25,
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
});

const TabView = ({ type, children, index, onChangeIndex }) => {
  const screens = React.Children.toArray(children);

  /* console.log(screens[0].props.title);*/

  return (
    <>
      <View style={styles['tabView_' + type]}>
        <View style={styles.tabBarWrapper}>
          {screens.map?.((v, ix) => (
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
                <View style={styles['indicatorOn_' + type]} />
              ) : (
                <View style={styles['indicatorOff_' + type]} />
              )}
            </TouchableOpacity>
          ))}
        </View>
        {type === 'pick' ? (
          <TouchableOpacity activeOpacity={0.85} style={styles.filterWrapper}>
            <Text style={styles.filterText}>최신순</Text>
            <Image source={assets.arrow_down_gray} style={styles.arrowIcon} />
          </TouchableOpacity>
        ) : null}
      </View>
      {screens[index || 0]}
    </>
  );
};

export default TabView;
