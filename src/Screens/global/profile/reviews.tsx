import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Screen, Text } from "../../../Components";
import { colors, adjustSize, typography } from "../../../theme";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
import moment from "moment";
import StarRating from "react-native-star-rating-widget";

const reviews = [
  {
    username: "Alice Johnson",
    profileImage: "https://randomuser.me/api/portraits/women/1.jpg",
    reviewDate: "2025-09-10T13:07:32+05:00",
    rating: 4,
    reviewText:
      "Amazing experience! The service was quick and professional.\nI was impressed with how responsive the support team was whenever I had questions.\nThe quality of the product exceeded my expectations, and I will definitely recommend this to my friends and family.",
  },
  {
    username: "Michael Smith",
    profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
    reviewDate: "2025-09-08T10:25:18+05:00",
    rating: 3,
    reviewText:
      "Good quality overall, but delivery took a bit longer than expected.",
  },
  {
    username: "Sophia Martinez",
    profileImage: "https://randomuser.me/api/portraits/women/3.jpg",
    reviewDate: "2025-09-05T15:42:09+05:00",
    rating: 5,
    reviewText: "Loved it! Exceeded my expectations.",
  },
  {
    username: "Daniel Lee",
    profileImage: "https://randomuser.me/api/portraits/men/4.jpg",
    reviewDate: "2025-09-02T09:11:44+05:00",
    rating: 2,
    reviewText: "Decent experience. Could improve packaging.",
  },
  {
    username: "Olivia Brown",
    profileImage: "https://randomuser.me/api/portraits/women/5.jpg",
    reviewDate: "2025-08-29T20:15:31+05:00",
    rating: 4,
    reviewText: "Very helpful support team. Product quality is solid.",
  },
  {
    username: "James Wilson",
    profileImage: "https://randomuser.me/api/portraits/men/6.jpg",
    reviewDate: "2025-08-25T18:03:19+05:00",
    rating: 1,
    reviewText: "Not satisfied. The product didn’t match the description.",
  },
  {
    username: "Emma Davis",
    profileImage: "https://randomuser.me/api/portraits/women/7.jpg",
    reviewDate: "2025-08-20T12:30:55+05:00",
    rating: 4,
    reviewText: "Fantastic! Would definitely recommend to others.",
  },
  {
    username: "William Clark",
    profileImage: "https://randomuser.me/api/portraits/men/8.jpg",
    reviewDate: "2025-08-18T14:45:22+05:00",
    rating: 3,
    reviewText: "Overall good, just wish the price was a bit lower.",
  },
  {
    username: "Ava Thompson",
    profileImage: "https://randomuser.me/api/portraits/women/9.jpg",
    reviewDate: "2025-08-15T09:05:12+05:00",
    rating: 4,
    reviewText: "Superb quality and fast shipping. Very impressed!",
  },
  {
    username: "Benjamin Hall",
    profileImage: "https://randomuser.me/api/portraits/men/10.jpg",
    reviewDate: "2025-08-12T16:20:41+05:00",
    rating: 3,
    reviewText: "Average experience, nothing too special.",
  },
  {
    username: "Mia Allen",
    profileImage: "https://randomuser.me/api/portraits/women/11.jpg",
    reviewDate: "2025-08-10T11:18:26+05:00",
    rating: 4,
    reviewText: "Loved the experience from start to finish.",
  },
  {
    username: "Ethan Scott",
    profileImage: "https://randomuser.me/api/portraits/men/12.jpg",
    reviewDate: "2025-08-07T08:55:15+05:00",
    rating: 3,
    reviewText: "Service was good but could be a little faster.",
  },
  {
    username: "Isabella White",
    profileImage: "https://randomuser.me/api/portraits/women/13.jpg",
    reviewDate: "2025-08-03T13:14:32+05:00",
    rating: 5,
    reviewText: "Absolutely loved it! Will buy again.",
  },
  {
    username: "Alexander Young",
    profileImage: "https://randomuser.me/api/portraits/men/14.jpg",
    reviewDate: "2025-07-29T19:40:05+05:00",
    rating: 2,
    reviewText: "Not a great experience. Customer service was unhelpful.",
  },
  {
    username: "Charlotte King",
    profileImage: "https://randomuser.me/api/portraits/women/15.jpg",
    reviewDate: "2025-07-25T10:09:47+05:00",
    rating: 4,
    reviewText: "Fantastic product, works perfectly!",
  },
  {
    username: "Henry Wright",
    profileImage: "https://randomuser.me/api/portraits/men/16.jpg",
    reviewDate: "2025-07-20T15:55:38+05:00",
    rating: 4,
    reviewText: "Happy with the purchase. Worth the money.",
  },
  {
    username: "Amelia Lopez",
    profileImage: "https://randomuser.me/api/portraits/women/17.jpg",
    reviewDate: "2025-07-16T17:30:11+05:00",
    rating: 4,
    reviewText: "Very smooth process and amazing product quality.",
  },
  {
    username: "Lucas Hill",
    profileImage: "https://randomuser.me/api/portraits/men/18.jpg",
    reviewDate: "2025-07-12T09:44:02+05:00",
    rating: 3,
    reviewText: "It was okay. Expected a bit more.",
  },
  {
    username: "Harper Green",
    profileImage: "https://randomuser.me/api/portraits/women/19.jpg",
    reviewDate: "2025-07-08T14:22:17+05:00",
    rating: 5,
    reviewText: "Perfect in every way! Highly recommend.",
  },
  {
    username: "Jack Adams",
    profileImage: "https://randomuser.me/api/portraits/men/20.jpg",
    reviewDate: "2025-07-05T20:40:56+05:00",
    rating: 4,
    reviewText: "Good product. Packaging could be better though.",
  },
];

export default reviews;

export const Reviews: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            (navigation as any)
              .getParent?.("FacilityManagerDrawer")
              ?.dispatch(DrawerActions.openDrawer())
          }
        >
          <WithLocalSvg asset={Images.user} />
        </TouchableOpacity>
        <View style={styles.headerinfo}>
          <Text style={styles._welcomtext}>Welcome!</Text>
          <Text weight="semiBold" style={styles.username}>
            Brume Djbah
          </Text>
          <Text style={styles.role}>KYC Level: Tier 3</Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: adjustSize(10),
        }}
      >
        <Text style={styles.heading}>Reviews</Text>
        {reviews.map((item, index) => {
          return (
            <View key={index} style={styles.box}>
              <View style={styles.boxHeader}>
                <View style={styles.boxHeaderInner}>
                  <Image
                    source={{ uri: item.profileImage }}
                    style={styles.boxProfileImg}
                  />
                  <View>
                    <Text style={styles.boxUsername}>{item.username}</Text>
                    <Text style={styles.boxDate}>
                      {moment(item.reviewDate).format("DD/MM/YYYY")}
                    </Text>
                  </View>
                </View>
                <View style={styles.boxHeaderInner}>
                  <Text style={styles.totalRating}>{item.rating}</Text>
                  <StarRating
                    rating={item.rating}
                    onChange={() => {}} // disabled, so no action
                    starSize={14}
                    enableHalfStar={true}
                    enableSwiping={false}
                    animationConfig={{ scale: 1 }} // disable animation
                    starStyle={{ padding: 0, margin: 0, width: adjustSize(5) }}
                  />
                </View>
              </View>
              <Text style={styles.reviewText}>{item.reviewText}</Text>
            </View>
          );
        })}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fill,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: adjustSize(7),
    borderBottomWidth: 0.5,
    borderColor: colors.primary,
    marginBottom: adjustSize(2),
    paddingHorizontal: adjustSize(10),
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 16,
  },

  headerinfo: {
    flex: 1,
    paddingHorizontal: 10,
  },
  _welcomtext: {
    color: colors.grey,
    fontSize: adjustSize(10),
    lineHeight: adjustSize(12),
  },
  username: {
    fontSize: adjustSize(15),
    color: colors.primary,
    lineHeight: adjustSize(20),
  },
  role: {
    fontSize: adjustSize(10),
    lineHeight: adjustSize(14),
  },
  heading: {
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
    color: colors.primary,
    marginTop: adjustSize(15),
  },
  box: {
    borderBottomWidth: adjustSize(0.5),
    borderBottomColor: "#B0B0B0",
    paddingVertical: adjustSize(15),
  },
  boxHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  boxProfileImg: {
    backgroundColor: "#D9D9D9",
    width: adjustSize(35),
    height: adjustSize(35),
    borderRadius: adjustSize(35 / 2),
    marginRight: adjustSize(10),
  },
  boxHeaderInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  boxUsername: {
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.semiBold,
    color: "#6369A4",
    lineHeight: adjustSize(20),
  },
  boxDate: {
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.normal,
    color: "#B0B0B0",
    lineHeight: adjustSize(12),
  },
  totalRating: {
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.normal,
    color: colors.primary,
    marginTop: adjustSize(3),
  },
  reviewText: {
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.normal,
    color: "#7E7E7E",
    lineHeight: adjustSize(20),
    marginTop: adjustSize(13),
  },
});
