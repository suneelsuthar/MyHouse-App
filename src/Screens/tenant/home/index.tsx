import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { adjustSize, colors, typography } from "../../../theme";
import { WithLocalSvg } from "react-native-svg/css";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Images } from "../../../assets/Images";
import { Text, Screen, Button } from "../../../Components";
import DropdownComponent from "../../../Components/DropDown";
import { HorizontalPropertyCard } from "../../../Components/tenant/HorizontalPropertyCard";
import BookingsChart from "../../../Components/BookingChart";

const width = Dimensions.get("screen").width;

export const TenantHome = () => {
  const navigation: any = useNavigation();
  const analyticsData = [
    { label: "Last 7 days", value: "last_7_days" },
    { label: "Weekly", value: "weekly" },
    { label: "Daily", value: "daily" },
    { label: "Yearly", value: "yearly" },
  ];

  const propertiesData = [
    {
      id: "1",
      title: "Properties",
      value: 70,
      subtitle: "Get from last month",
      isLoss: false,
      onPress: () => console.log("Bookings pressed"),
      chartdata: [1, 4, 6, 7, 8, 2],
    },
    {
      id: "2",
      title: "Bookings",
      value: 104,
      subtitle: "Get from last month",
      onPress: () => console.log("Bookings pressed"),
      isLoss: true,
      chartdata: [1, 4, 16, 7, 8, 2],
    },
    {
      id: "3",
      title: "Work Requests",
      value: 70,
      subtitle: "Get from last month",
      onPress: () => console.log("Bookings pressed"),
      isLoss: true,
      chartdata: [1, 4, 6, 7, 8, 2],
    },
    {
      id: "4",
      title: "Work Orders",
      value: 70,
      subtitle: "Get from last month",
      onPress: () => console.log("Bookings pressed"),
      isLoss: false,
      chartdata: [1, 14, 6, 7, 8, 2],
    },
    {
      id: "5",
      title: "Team",
      value: 170,
      subtitle: "Get from last month",
      onPress: () => console.log("Bookings pressed"),
      isLoss: true,
      chartdata: [1, 4, 6, 7, 8, 2],
    },
    {
      id: "6",
      title: "Visitors",
      value: 120,
      subtitle: "Get from last month",
      onPress: () => console.log("Bookings pressed"),
      isLoss: false,
      chartdata: [1, 4, 6, 10, 8, 2],
    },
    {
      id: "7",
      title: "Wallet",
      value: 120,
      subtitle: "Get from last month",
      onPress: () => console.log("Bookings pressed"),
      isLoss: true,
      chartdata: [1, 4, 6, 12, 8, 2],
    },
  ];

  return (
    <Screen
      contentContainerStyle={styles.container}
      preset="fixed"
      safeAreaEdges={["top"]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            (navigation as any)
              .getParent?.("TenantDrawer")
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
          <Text style={styles.role}>Tenant</Text>
        </View>
        <TouchableOpacity style={styles.headerIcons} activeOpacity={0.6}>
          <WithLocalSvg asset={Images.notofication} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles._card}>
              <WithLocalSvg asset={Images.visitormanagement} />
              <Text text="Visitor Management" style={styles._card_text} />
            </TouchableOpacity>

            <TouchableOpacity style={styles._card}>
              <WithLocalSvg asset={Images.workrequests} />
              <Text text="Work Requests" style={styles._card_text} />
            </TouchableOpacity>

            <TouchableOpacity style={styles._card}>
              <WithLocalSvg asset={Images.makepayment} />
              <Text text="Make Payment" style={styles._card_text} />
            </TouchableOpacity>

            <TouchableOpacity style={styles._card}>
              <WithLocalSvg asset={Images.kyc} />
              <Text text="KYC" style={styles._card_text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Notifications */}
        <View style={styles.section}>
          <View style={styles._seciton_row}>
            <Text weight="semiBold" style={styles.sectionTitle}>
              Analytics
            </Text>
            <View style={styles.dropdownContainer}>
              <DropdownComponent
                data={analyticsData}
                label="Select Period"
                placeholder="Last 7 days"
                dropdownStyle={styles.customDropdownStyle}
                placeholderStyle={styles.customPlaceholderStyle}
                selectedTextStyle={styles.customSelectedTextStyle}
              />
            </View>
          </View>
          {/* ÷÷ */}
        </View>

        <Button
          preset="reversed"
          text="Assigned Properties"
          style={{
            width: "95%",
            alignSelf: "center",
          }}
          onPress={() => navigation.navigate("TenantAssignedProp")}
        />
        {/* PROPERTIES CARD */}
        <View style={styles.propertiesSection}>
          <FlatList
            data={propertiesData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.propertiesList}
            renderItem={({ item }) => <HorizontalPropertyCard data={item} />}
          />
        </View>
        <View>
          <View
            style={[
              styles._seciton_row,
              { paddingHorizontal: adjustSize(10), marginTop: adjustSize(30) },
            ]}
          >
            <Text weight="semiBold" style={styles.sectionTitle}>
              Upcoming Bookings
            </Text>
            <Text style={[styles.change, { color: "#0AD029" }]}>
              ▲ 35% more
            </Text>
          </View>

          <View style={{ paddingHorizontal: adjustSize(10) }}>
            <Text style={styles.subtitle}>
              You have got
              <Text
                text=" 54 more "
                style={{
                  color: "#0AD029",
                  fontSize: adjustSize(10),
                }}
              />
              bookings from the last month
            </Text>
          </View>
          <BookingsChart
            data={[14, 20, 28, 32]}
            lables={["Week1", "Week2", "Week3", "Week4"]}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: adjustSize(15),
    borderBottomWidth: 0.5,
    borderColor: colors.primary,
    marginBottom: adjustSize(15),
    paddingHorizontal: adjustSize(10),
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 16,
  },

  section: {
    marginBottom: 24,
    marginHorizontal: adjustSize(10),
  },
  sectionTitle: {
    fontSize: adjustSize(15),
    color: colors.primary,
  },
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 15,
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
  _card: {
    backgroundColor: "#6369A4",
    height: adjustSize(102),
    borderRadius: adjustSize(10),
    alignItems: "center",
    width: "48%",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },

  _card_text: {
    color: colors.white,
    fontSize: adjustSize(14),
  },
  _seciton_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: adjustSize(20),
    marginBottom: adjustSize(5),
  },
  dropdownContainer: {
    width: adjustSize(130),
  },
  customDropdownStyle: {
    height: adjustSize(40),
    borderRadius: adjustSize(100),
    backgroundColor: colors.primary,
  },
  customPlaceholderStyle: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
  customSelectedTextStyle: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
  propertiesSection: {
    marginTop: adjustSize(20),
    borderBottomWidth: 0.5,
    borderColor: colors.grey,
  },
  propertiesList: {
    marginTop: adjustSize(30),
    marginBottom: adjustSize(10),
    marginHorizontal: adjustSize(10),
  },
  title: {
    fontSize: adjustSize(14),
    color: colors.primary,
  },
  subtitle: {
    fontSize: adjustSize(10),
    color: colors.primaryLight,
  },

  change: {
    fontSize: adjustSize(10),
    color: "#0AD029",
  },
});
