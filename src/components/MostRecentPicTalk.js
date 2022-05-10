import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "#common/colors";
import assets from "../../assets";
import moment from "moment";

const styles = StyleSheet.create({
    newsHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        alignItems: "center",
        borderBottomColor: colors.lightPeriwinkle,
        borderBottomWidth: 1,
        paddingBottom: 15,
        paddingTop: 30,
    },
    title: { 
        fontSize: 18, 
        fontWeight: '700', 
        color: colors.dark 
    },
    commentWrapper: {
        marginTop: 15,
        marginBottom: 10,
        marginHorizontal: 20,
    },
    topBar: {
        flexDirection: "row",
        zIndex: 1,
    },
    commentedRow: {
        flexDirection: "row",
        borderColor: "#eeeff5",
        borderWidth: 1.5,
        borderRadius: 6,
        borderBottomLeftRadius: 0,
        backgroundColor: "#eeeff5",
        padding: 18.5,
        paddingLeft: 0,
        marginTop: -15,
    },
    replyHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
        justifyContent: "space-between",
    },
    userName: {
        fontSize: 13,
        letterSpacing: -0.32,
        color: colors.greyBlue,
    },
    timeText: {
        fontSize: 13,
        letterSpacing: -0.32,
        color: colors.cloudyBlue,
    },
    contents: { fontSize: 14, letterSpacing: -0.35, color: colors.dark },
    countText: {
        color: colors.blueyGrey,
        letterSpacing: -0.33,
        fontSize: 13,
    },
    countWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 15,
    },
    textButton: {
        fontSize: 13,
        letterSpacing: -0.32,
        color: colors.cloudyBlue,
    },
    borderLine: {
        height: 11,
        width: 1,
        backgroundColor: colors.lightPeriwinkle,
        marginHorizontal: 10,
    },
    userImage: {
        width: 43,
        height: 43,
        borderRadius: 22,
        borderWidth: 6.5,
        borderColor: "#fff",
        marginLeft: -6.5,
    },
    userImageBlank: {
        width: 43,
        height: 43,
        borderRadius: 22,
        borderWidth: 0,
        borderColor: "#fff",
        marginLeft: -6.5,
    },
    replyWrapper: { marginLeft: 10, flex: 1 },
    userInfo: { flexDirection: "row", alignItems: "center" },
    bullet: { color: colors.cloudyBlueTwo, marginHorizontal: 4 },
    countBox: { flexDirection: "row", marginTop: 5 },
    iconStyle: {
        width: 10,
        height: 10,
        marginRight: 5,
    },
    /* Trangular Icon */
    talkBubbleTrangleLeft: {
        position: "absolute",
        left: 0,
        bottom: -16.5,
        zIndex: 1,
    },
    trangleBorderLeft: {
        width: 0,
        height: 0,
        borderTopWidth: 18,
        borderTopColor: "#eeeff5",
        borderRightWidth: 21,
        borderRightColor: "transparent",
    },
    trangleBgColorLeft: {
        position: "absolute",
        top: 0,
        left: 1.5,
        width: 0,
        height: 0,
        borderTopWidth: 14.5,
        borderTopColor: "#eeeff5",
        borderRightWidth: 17,
        borderRightColor: "transparent",
    },
    talkBubbleTrangleRight: {
        position: "absolute",
        right: 0,
        bottom: -16.5,
        zIndex: 1,
    },
    trangleBorderRight: {
        width: 0,
        height: 0,
        borderTopWidth: 18,
        borderTopColor: "#eeeff5",
        borderLeftWidth: 21,
        borderLeftColor: "transparent",
    },
    trangleBgColorRight: {
        position: "absolute",
        top: 0,
        right: 1.5,
        width: 0,
        height: 0,
        borderTopWidth: 14.5,
        borderTopColor: "#eeeff5",
        borderLeftWidth: 17,
        borderLeftColor: "transparent",
    },
    /* Load More */
    pickFooter: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 14,
        borderTopColor: "#eee",
        borderTopWidth: 1,
        marginTop: 30,
    },
    moreButton: {
        fontSize: 12,
        color: colors.blueGrey,
        letterSpacing: -0.3,
    },
    arrowDownIcon: {
        width: 5,
        height: 4,
        marginLeft: 5,
    },
});

const MostRecentPicTalk = () => {
  return (
    <View style={{ paddingBottom: 10 }}>
        <View style={styles.newsHeader}>
            <Text style={styles.title}>픽톡</Text>
        </View>

        <View style={styles.mainCommentWrapper}>
            {/* Comment Row 1 For Left Trangle */}
            <View style={styles.commentWrapper}>
                <View style={styles.topBar}>
                    <Image source={assets.icon_briefcase} style={styles.userImage} />
                    <View style={styles.replyWrapper}>
                    <View style={styles.userInfo}>
                        <TouchableOpacity activeOpacity={0.85}>
                        <Text style={styles.userName}>Daya</Text>
                        </TouchableOpacity>
                        <Text style={styles.bullet}>&#183;</Text>
                        <Text style={styles.timeText}>2022.03.26 Time 06:47</Text>
                    </View>
                    </View>
                </View>
                
                <View style={styles.commentedRow}>
                    <View style={styles.userImageBlank}></View>
                    <View style={styles.replyWrapper}>
                    <Text style={styles.contents}>
                        이번 주 불장입니다. 이대로 쭈욱쭉 올라가길...
                    </Text>
                    <View style={styles.countBox}>
                        <TouchableOpacity
                        style={styles.countWrapper}
                        activeOpacity={0.6}
                        >
                        <Image
                            source={assets.icon_news_recomm}
                            style={styles.iconStyle}
                        />
                        <Text style={styles.countText}>312</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        style={styles.countWrapper}
                        activeOpacity={0.6}
                        >
                        <Image
                            source={assets.icon_news_comment}
                            style={styles.iconStyle}
                        />
                        <Text style={styles.countText}>2</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>

                {/* Trangular Icon */}
                <View style={styles.talkBubbleTrangleLeft}>
                    <View style={styles.trangleBorderLeft}></View>
                    <View style={styles.trangleBgColorLeft}></View>
                </View>
            </View>

            {/* Comment Row 2 For Right Trangle */}
            <View style={styles.commentWrapper}>
                <View style={styles.topBar}>
                    <Image source={assets.icon_briefcase} style={styles.userImage} />
                    <View style={styles.replyWrapper}>
                        <View style={styles.userInfo}>
                            <TouchableOpacity activeOpacity={0.85}>
                            <Text style={styles.userName}>Dayatripathi</Text>
                            </TouchableOpacity>
                            <Text style={styles.bullet}>&#183;</Text>
                            <Text style={styles.timeText}>2022.03.26 Time 06:47</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.commentedRow}>
                    <View style={styles.userImageBlank}></View>
                    <View style={styles.replyWrapper}>
                        <Text style={styles.contents}>
                            이번 주 불장입니다. 이대로 쭈욱쭉 올라가길...
                        </Text>
                        <View style={styles.countBox}>
                            <TouchableOpacity style={styles.countWrapper} activeOpacity={0.6}>
                                <Image
                                    source={assets.icon_news_recomm}
                                    style={styles.iconStyle}
                                />
                                <Text style={styles.countText}>312</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.countWrapper} activeOpacity={0.6}>
                                <Image
                                    source={assets.icon_news_comment}
                                    style={styles.iconStyle}
                                />
                                <Text style={styles.countText}>2</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Trangular Icon */}
                <View style={styles.talkBubbleTrangleLeft}>
                    <View style={styles.trangleBorderLeft}></View>
                    <View style={styles.trangleBgColorLeft}></View>
                </View>
            </View>

            {/* Comment Row 3 For Left Trangle */}
            <View style={styles.commentWrapper}>
                <View style={styles.topBar}>
                    <Image source={assets.icon_briefcase} style={styles.userImage} />
                    <View style={styles.replyWrapper}>
                    <View style={styles.userInfo}>
                        <TouchableOpacity activeOpacity={0.85}>
                        <Text style={styles.userName}>Daya</Text>
                        </TouchableOpacity>
                        <Text style={styles.bullet}>&#183;</Text>
                        <Text style={styles.timeText}>2022.03.26 Time 06:47</Text>
                    </View>
                    </View>
                </View>
                
                <View style={styles.commentedRow}>
                    <View style={styles.userImageBlank}></View>
                    <View style={styles.replyWrapper}>
                    <Text style={styles.contents}>
                        이번 주 불장입니다. 이대로 쭈욱쭉 올라가길...
                    </Text>
                    <View style={styles.countBox}>
                        <TouchableOpacity
                        style={styles.countWrapper}
                        activeOpacity={0.6}
                        >
                        <Image
                            source={assets.icon_news_recomm}
                            style={styles.iconStyle}
                        />
                        <Text style={styles.countText}>312</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        style={styles.countWrapper}
                        activeOpacity={0.6}
                        >
                        <Image
                            source={assets.icon_news_comment}
                            style={styles.iconStyle}
                        />
                        <Text style={styles.countText}>2</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>

                {/* Trangular Icon */}
                <View style={styles.talkBubbleTrangleLeft}>
                    <View style={styles.trangleBorderLeft}></View>
                    <View style={styles.trangleBgColorLeft}></View>
                </View>
            </View>
        </View>

        {/* Load More */}
        <TouchableOpacity activeOpacity={0.85} style={styles.pickFooter}>
            <Text style={styles.moreButton}>더보기</Text>
            <Image source={assets.arrow_down_gray} style={styles.arrowDownIcon} />
        </TouchableOpacity>
    </View>
  );
};
export default MostRecentPicTalk;
