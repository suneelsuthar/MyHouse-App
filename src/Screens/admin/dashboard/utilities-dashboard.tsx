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
import { CustomDateTimePicker } from "../../../Components/CustomDateTimePicker";
import DropdownComponent from "../../../Components/DropDown";
import { HorizontalPropertyCard } from "../../../Components/tenant/HorizontalPropertyCard";
import BookingsChart from "../../../Components/BookingChart";

const width = Dimensions.get("screen").width;

export const AdminUtilitiesDashboard = () => {
  const navigation = useNavigation();
  const analyticsData = [
    { label: "Monthly", value: "monthly" },
    { label: "Weekly", value: "weekly" },
    { label: "Daily", value: "daily" },
    { label: "Yearly", value: "yearly" },
    { label: "Range", value: "range" },
  ];

  const [analyticsRange, setAnalyticsRange] = useState<string>("monthly");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const propertiesData = [
    {
      id: "1",
      title: "Suppliers",
      value: 70,
      subtitle: "Get from last month",
      isLoss: false,
      onPress: () => console.log("Bookings pressed"),
      chartdata: [1, 4, 6, 7, 8, 2],
    },
    {
      id: "2",
      title: "Meters",
      value: 104,
      subtitle: "Get from last month",
      onPress: () => console.log("Bookings pressed"),
      isLoss: true,
      chartdata: [1, 4, 16, 7, 8, 2],
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
              .getParent?.("AdminDrawer")
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
          <Text style={styles.role}>Admin</Text>
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
            <TouchableOpacity
              style={styles._card}
              activeOpacity={0.7}
              onPress={() =>
                (navigation as any).navigate("AdminPropertyRequests")
              }
            >
              <WithLocalSvg asset={Images.met} />
              <Text text="Meters" style={styles._card_text} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles._card}
              activeOpacity={0.7}
              onPress={() =>
                (navigation as any).navigate("AdminManageBookings")
              }
            >
              <WithLocalSvg asset={Images.tra} />
              <Text text="Transactions" style={styles._card_text} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles._card}
              activeOpacity={0.7}
              onPress={() =>
                (navigation as any).navigate("AdminManagePropertyGroup")
              }
            >
              <WithLocalSvg asset={Images.est} />
              <Text text="Estates" style={styles._card_text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Notifications */}
        <View style={styles.section}>
          <View style={styles._seciton_row}>
            <View style={styles.analyticsLeftRow}>
              <Text weight="semiBold" style={styles.sectionTitle}>
                Analytics
              </Text>
              {analyticsRange === "range" && (
                <View style={styles.dateRangeRow}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.dateIconBtn}
                    onPress={() => setShowStartPicker(true)}
                  >
                    <WithLocalSvg asset={Images.calendar} />
                  </TouchableOpacity>
                  <Text style={styles.toText}>To</Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.dateIconBtn}
                    onPress={() => setShowEndPicker(true)}
                  >
                    <WithLocalSvg asset={Images.calendar} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View style={styles.dropdownContainer}>
              <DropdownComponent
                data={analyticsData}
                label="Select Period"
                placeholder="Range"
                value={analyticsRange}
                onChangeValue={setAnalyticsRange}
                dropdownStyle={styles.customDropdownStyle}
                placeholderStyle={styles.customPlaceholderStyle}
                selectedTextStyle={styles.customSelectedTextStyle}
              />
            </View>
          </View>
          <CustomDateTimePicker
            mode="date"
            value={startDate}
            visible={showStartPicker}
            onChange={(d) => setStartDate(d)}
            onCancel={() => setShowStartPicker(false)}
            onConfirm={() => setShowStartPicker(false)}
          />
          <CustomDateTimePicker
            mode="date"
            value={endDate}
            visible={showEndPicker}
            onChange={(d) => setEndDate(d)}
            onCancel={() => setShowEndPicker(false)}
            onConfirm={() => setShowEndPicker(false)}
          />
          {/* ÷÷ */}
        </View>

        <Button
          preset="reversed"
          text="Total Suppliers"
          style={{
            width: "95%",
            alignSelf: "center",
          }}
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
              Total Suppliers
            </Text>
            <Text style={[styles.change, { color: "#0AD029" }]}>
              ▲ 35% more
            </Text>
          </View>

          <View style={{ paddingHorizontal: adjustSize(10) }}>
            <Text style={styles.subtitle}>
              You have got 10% increase in Suppliers from the last month
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
    flex: 1,
  },
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },

  headerinfo: {
    flex: 1,
    paddingHorizontal: 10,
  },
  _welcomtext: {
    color: colors.black,
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
    backgroundColor: colors.primary,
    height: adjustSize(102),
    borderRadius: adjustSize(10),
    alignItems: "center",
    // width: adjustSize(106),
    flexDirection: "column",
    justifyContent: "space-evenly",
    flex: 1,
  },

  _card_text: {
    color: colors.white,
    fontSize: adjustSize(14),
    textAlign: "center",
  },
  _seciton_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: adjustSize(20),
    marginBottom: adjustSize(5),
  },
  analyticsLeftRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: adjustSize(10),
    flex: 1,
  },
  dateRangeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: adjustSize(10),
    marginLeft: adjustSize(10),
  },
  dateIconBtn: {
    width: adjustSize(36),
    height: adjustSize(36),
    borderRadius: adjustSize(10),
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  toText: {
    color: colors.primary,
    marginHorizontal: adjustSize(4),
  },
  dropdownContainer: {
    width: adjustSize(120),
    marginLeft: 15,
  },
  customDropdownStyle: {
    height: adjustSize(40),
    borderRadius: adjustSize(100),
    backgroundColor: colors.primary,
    width: adjustSize(125),
    marginRight: adjustSize(20),
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
