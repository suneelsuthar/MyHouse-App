import React from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Screen, Text, CustomGallery, Button } from "../../../Components";
import { Header } from "../../../Components/Header";
import { adjustSize, colors, typography } from "../../../theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AdminStackParamList } from "../../../utils/interfaces";
type InfoItem = {
  title: string;
  value: string;
};
export function AdminReservationView({
  route,
  navigation,
}: NativeStackScreenProps<AdminStackParamList, "AdminReservationView">) {

  const data: any = route?.params?.data;

  const list: InfoItem[] = [
    {
      title: "Property Group ID:",
      value: "lorem ipsum",
    },
    {
      title: "Amenity:",
      value: "lorem ipsum",
    },
    {
      title: "Capacity:",
      value: "lorem ipsum",
    },
    {
      title: "Date Added:",
      value: "lorem ipsum",
    },
    {
      title: "Booked by:",
      value: "lorem ipsum",
    },
    {
      title: "Duration:",
      value: "lorem ipsum",
    },
    {
      title: "Status:",
      value: "lorem ipsum",
    },
    {
      title: "Reservation date:",
      value: "lorem ipsum",
    },
  ];
  const timeList: string[] = [
    "9:00 AM - 12:00 PM",
    "9:00 AM - 12:00 PM",
    "9:00 AM - 12:00 PM",
    "9:00 AM - 12:00 PM",
    "9:00 AM - 12:00 PM",
    "9:00 AM - 12:00 PM",
    "9:00 AM - 12:00 PM",
    "9:00 AM - 12:00 PM",
  ];
  return (
    <Screen
      preset="fixed"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top", "bottom"]}
    >
      <Header title={"Visitor Reservation"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomGallery images={data?.images} hideList={true} />
        <View style={styles.container}>
          {list.map((val, index) => {
            return (
              <View key={index} style={styles.list}>
                <Text style={styles.listTitle}>{val.title}</Text>
                <Text style={styles.listValue}>{val.value}</Text>
              </View>
            );
          })}
          <View style={styles.line} />
          <Text style={styles.heading}>Selected Time</Text>
          <View style={styles.timeList}>
            {timeList.map((val, index) => {
              return (
                <View key={index} style={styles.timeListBox}>
                  <Text style={styles.timeListBoxVal}>{val}</Text>
                </View>
              );
            })}
          </View>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelBtnTxt}>Cancel Reservation</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContentContainer: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  container: {
    paddingHorizontal: adjustSize(10),
    marginTop: adjustSize(25),
  },
  heading: {
    color: colors.primary,
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
    marginBottom: adjustSize(5),
  },
  line: {
    height: adjustSize(0.5),
    backgroundColor: "#B0B0B0",
    marginVertical: adjustSize(20),
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: adjustSize(5),
  },
  listTitle: {
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  listValue: {
    color: colors.primaryLight,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.normal,
  },
  timeList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeListBox: {
    backgroundColor: colors.primaryLight,
    height: adjustSize(40),
    borderRadius: adjustSize(20),
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: adjustSize(12),
  },
  timeListBoxVal: {
    color: colors.white,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
  },
  cancelBtn: {
    backgroundColor: "#D51E1E",
    height: adjustSize(47),
    borderRadius: adjustSize(10),
    alignItems: "center",
    justifyContent: "center",
    marginTop: adjustSize(35),
    marginBottom: adjustSize(20),
  },
  cancelBtnTxt: {
    color: colors.white,
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
  },
});
