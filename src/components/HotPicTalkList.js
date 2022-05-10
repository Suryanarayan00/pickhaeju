import React, {useState} from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import colors from "#common/colors";
import assets from "../../assets";
import moment from "moment";

const styles = StyleSheet.create({
    // Block Text Box Setion Css
    talkBubbleItem: { marginBottom: 25 },
    itemBox: {
        width: '100%',
        borderRadius: 7,
        borderBottomLeftRadius: 0,
        paddingHorizontal: 15,
        paddingVertical: 12,
        overflow: "visible",
    },
    itemBoxLight: {
        backgroundColor: '#e6d7f2',
    },
    itemBoxDark: {
        backgroundColor: '#d0b1e4',
        borderBottomLeftRadius: 5, 
        borderBottomRightRadius: 0,
    },
    itemIwtBox: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    locationHeading: {
        color: colors.lightIndigo,
    },
    countBox: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 5,
    },
    countWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        marginLeft: 0.1,
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
        left: 0,
        bottom: -17,
        zIndex: 1,
    },
    trangleBorderLeft: {
        width: 0,
        height: 0,
        borderTopWidth: 18,
        borderTopColor: "#e6d7f2",
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
        borderTopColor: "#e6d7f2",
        borderRightWidth: 18,
        borderRightColor: "transparent",
    },
    talkBubbleTrangleRight: {
        position: "absolute",
        right: 0,
        bottom: -17,
        zIndex: 1,
    },
    trangleBorderRight: {
        width: 0,
        height: 0,
        borderTopWidth: 18,
        borderTopColor: "#d0b1e4",
        borderLeftWidth: 21,
        borderLeftColor: 'transparent',
    },
    trangleBgColorRight: {
        position: "absolute",
        top: 0,
        right: 1.5,
        width: 0,
        height: 0,
        borderTopWidth: 14.5,
        borderTopColor: "#d0b1e4",
        borderLeftWidth: 17,
        borderLeftColor: "transparent",
    },
});

const HotPicTalkList = ({ latestNews }) => {

  return (
    <View style={{ width: "100%", marginTop: 30, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 17, fontWeight: "700", color: "#000", marginBottom: 15 }} >
            지금 핫한 픽톡
        </Text>

        <View style={styles.talkBubbleItemWrapper}>
            {/* 1st Item */}
            <View style={styles.talkBubbleItem}>
                <View style={[styles.itemBox, styles.itemBoxLight ]}>
                    <View style={styles.itemIwtBox}>
                        {/* <Image
                            style={{
                            height: 40,
                            width: 40,
                            borderRadius: 50,
                            marginRight: 7,
                            }}
                            source={{
                            uri:
                                data?.logo ||
                                `https://storage.googleapis.com/pickhaeju-static/logo/${data?.ticker}.png`,
                            }}
                        /> */}
                        <Text style={styles.locationHeading}>$SBUX</Text>
                    </View>
                    <Text>삼성 파운드리 위기로 매수 타이밍 잡고 있는데​ 어디에 투자하는 게 좋을까요? 알려주세요.</Text>

                    <View style={styles.countBox}>
                        <TouchableOpacity style={styles.countWrapper} activeOpacity={0.6}>
                            <Image source={assets.icon_news_comment_color} style={styles.iconStyle}/>
                            <Text style={styles.countText}>2</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.countWrapper} activeOpacity={0.6}>
                            <Image source={assets.icon_news_recomm_color} style={styles.iconStyle}/>
                            <Text style={styles.countText}>312</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Trangular Icon */}
                <View style={styles.talkBubbleTrangleLeft}>
                    <View style={styles.trangleBorderLeft}></View>
                    <View style={styles.trangleBgColorLeft}></View>
                </View>
            </View>

            {/* 2nd Item */}
            <View style={styles.talkBubbleItem}>
                <View style={[styles.itemBox, styles.itemBoxDark]}>
                    <View style={styles.itemIwtBox}>
                        {/* <Image
                            style={{
                            height: 40,
                            width: 40,
                            borderRadius: 50,
                            marginRight: 7,
                            }}
                            source={{
                            uri:
                                data?.logo ||
                                `https://storage.googleapis.com/pickhaeju-static/logo/${data?.ticker}.png`,
                            }}
                        /> */}
                        <Text style={styles.locationHeading}>$TWTR</Text>
                    </View>
                    <Text>삼성 파운드리 위기로 매수 타이밍 잡고 있는데​ 어디에 투자하는 게 좋을까요? 알려주세요.</Text>

                    <View style={styles.countBox}>
                        <TouchableOpacity style={styles.countWrapper} activeOpacity={0.6}>
                            <Image source={assets.icon_news_comment_color} style={styles.iconStyle}/>
                            <Text style={styles.countText}>2</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.countWrapper} activeOpacity={0.6}>
                            <Image source={assets.icon_news_recomm_color} style={styles.iconStyle}/>
                            <Text style={styles.countText}>312</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Trangular Icon */}
                <View style={styles.talkBubbleTrangleRight}>
                    <View style={styles.trangleBorderRight}></View>
                    <View style={styles.trangleBgColorRight}></View>
                </View>
            </View>

            {/* 3rd Item */}
            <View style={styles.talkBubbleItem}>
                <View style={[styles.itemBox, styles.itemBoxLight ]}>
                    <View style={styles.itemIwtBox}>
                        {/* <Image
                            style={{
                            height: 40,
                            width: 40,
                            borderRadius: 50,
                            marginRight: 7,
                            }}
                            source={{
                            uri:
                                data?.logo ||
                                `https://storage.googleapis.com/pickhaeju-static/logo/${data?.ticker}.png`,
                            }}
                        /> */}
                        <Text style={styles.locationHeading}>$SBUX</Text>
                    </View>
                    <Text>삼성 파운드리 위기로 매수 타이밍 잡고 있는데​ 어디에 투자하는 게 좋을까요? 알려주세요.</Text>

                    <View style={styles.countBox}>
                        <TouchableOpacity style={styles.countWrapper} activeOpacity={0.6}>
                            <Image source={assets.icon_news_comment_color} style={styles.iconStyle}/>
                            <Text style={styles.countText}>2</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.countWrapper} activeOpacity={0.6}>
                            <Image source={assets.icon_news_recomm_color} style={styles.iconStyle}/>
                            <Text style={styles.countText}>312</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Trangular Icon */}
                <View style={styles.talkBubbleTrangleLeft}>
                    <View style={styles.trangleBorderLeft}></View>
                    <View style={styles.trangleBgColorLeft}></View>
                </View>
            </View>

            {/* 4th Item */}
            <View style={styles.talkBubbleItem}>
                <View style={[styles.itemBox, styles.itemBoxDark]}>
                    <View style={styles.itemIwtBox}>
                        {/* <Image
                            style={{
                            height: 40,
                            width: 40,
                            borderRadius: 50,
                            marginRight: 7,
                            }}
                            source={{
                            uri:
                                data?.logo ||
                                `https://storage.googleapis.com/pickhaeju-static/logo/${data?.ticker}.png`,
                            }}
                        /> */}
                        <Text style={styles.locationHeading}>$TWTR</Text>
                    </View>
                    <Text>삼성 파운드리 위기로 매수 타이밍 잡고 있는데​ 어디에 투자하는 게 좋을까요? 알려주세요.</Text>

                    <View style={styles.countBox}>
                        <TouchableOpacity style={styles.countWrapper} activeOpacity={0.6}>
                            <Image source={assets.icon_news_comment_color} style={styles.iconStyle}/>
                            <Text style={styles.countText}>2</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.countWrapper} activeOpacity={0.6}>
                            <Image source={assets.icon_news_recomm_color} style={styles.iconStyle}/>
                            <Text style={styles.countText}>312</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Trangular Icon */}
                <View style={styles.talkBubbleTrangleRight}>
                    <View style={styles.trangleBorderRight}></View>
                    <View style={styles.trangleBgColorRight}></View>
                </View>
            </View>
        </View>
    </View>
  );
};

export default HotPicTalkList;
