import React, {useState} from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import colors from "#common/colors";
import assets from "../../assets";
import moment from "moment";
import { useNavigation, useRoute} from '@react-navigation/native';

const styles = StyleSheet.create({
  // Block Text Box Setion Css
  talkBubble: {
    flexDirection: "row",
  },
  itemBox: {
    width:140,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: '#ebedf2',
    borderRadius: 5,
    borderBottomLeftRadius: 0,
    paddingHorizontal: 15,
    paddingVertical: 12,
    paddingBottom: 35,
    marginLeft: 15,
    overflow: "visible",
  },
  itemIwtBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  locationHeading: {
    color: colors.lightIndigo,
  },
  itemContent: {
    marginBottom: 5,
  },
  countBox: {
    flexDirection: "row",
    justifyContent: "flex-end",
    position: "absolute",
    bottom: 12,
    right: 15,
    width: '100%',
  },
  countWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  iconStyle: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  countText: {
    color: colors.blueyGrey,
    letterSpacing: -0.32,
    fontSize: 13,
  },
  /* Trangular Icon */
  talkBubbleTrangleLeft: {
    position: "absolute",
    left: -1,
    bottom: -18,
    zIndex: 1,
  },
  trangleBorderLeft: {
    width: 0,
    height: 0,
    borderTopWidth: 18,
    borderTopColor: "#ebedf2",
    borderRightWidth: 21,
    borderRightColor: 'transparent',
  },
  trangleBgColorLeft: {
    position: "absolute",
    top: 0,
    left: 1,
    width: 0,
    height: 0,
    borderTopWidth: 15,
    borderTopColor: "#fff",
    borderRightWidth: 18,
    borderRightColor: "transparent",
  },
});

const LatestLocationFeed = ({ pickTalkList }) => {
  console.log("props", pickTalkList);
  const [active, setActive] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={{ width: "100%", marginTop: 30, }}>
      <Text
        style={{
          fontSize: 17,
          fontWeight: "700",
          color: "#000",
          marginBottom: 20,
          paddingHorizontal: 20,
        }}
      >
        급상승 픽톡
      </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={{ flexDirection: "row", paddingLeft: 5, paddingBottom: 25 }}
        >
           {pickTalkList?.map((data) => {
            console.log('Data');
            console.log(data);
            let ticker = data?.ticker || data?.tickers[0];
            return (
              <TouchableHighlight style={[styles.itemBox, { backgroundColor: 'transparent' }]}
                activeOpacity={0.6}
                underlayColor={colors.paleLavender}
                onPress={() => navigation.navigate('picktalk',{'ticker':ticker})}
              >
                <React.Fragment>
                
                  <View style={styles.itemIwtBox}>
                    <Text style={styles.locationHeading}>${ticker}</Text>
                  </View>

                  <Text ellipsizeMode={'tail'} numberOfLines={3} style={styles.itemContent}>
                    {data?.content}
                  </Text>

                  <View style={styles.countBox}>
                    <TouchableOpacity style={styles.countWrapper}>
                      <Image
                        source={assets.icon_news_comment_color}
                        style={styles.iconStyle}
                      />
                      <Text style={styles.countText}>{data?.comments?.length || 0}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.countWrapper}
                      activeOpacity={0.6}
                    >
                      <Image
                        source={assets.icon_news_recomm_color}
                        style={styles.iconStyle}
                      />
                      <Text style={styles.countText}>{data?.likers?.length || 0}</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Trangular Icon */}
                  <View style={styles.talkBubbleTrangleLeft}>
                    <View style={styles.trangleBorderLeft}></View>
                    <View style={styles.trangleBgColorLeft}></View>
                  </View>
                </React.Fragment>
              </TouchableHighlight>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default LatestLocationFeed;
