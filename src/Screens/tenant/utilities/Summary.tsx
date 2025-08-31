import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import { Screen, Text, Header2 } from "../../../Components";
import { colors, typography, adjustSize, spacing } from "../../../theme";
import DropdownComponent from "../../../Components/DropDown";
import { Images } from "../../../assets/Images";
import { WithLocalSvg } from "react-native-svg/css";
import AnalysisChart from "../../../Components/AnalysisChart";
import { CustomDateTimePicker } from "../../../Components/CustomDateTimePicker";
import { TenantUtilitiesTabs } from "./Components/TenantUtilitiesTabs";
// 🔹 Keep static lists outside to avoid re-creating on every render
const SummaryList = [
  {
    icon: Images.person,
    title: "Client Name",
    data: "0123456****",
    btnTxt: "Update Profile",
    path: "TenantUtilitiesUpdateProfile",
  },
  {
    icon: Images.wallet2,
    title: "Wallet Ball",
    data: "N10,000.00",
    btnTxt: "Add Funds",
    path: "Wallet",
  },
  {
    icon: Images.dollar,
    title: "Outstanding Charges",
    data: "$10.00",
    btnTxt: "Pay Charges",
    path: "TenantUtilitiesCharges",
  },
  {
    icon: Images.meter,
    title: "My meter",
    data: "70.01",
    btnTxt: "Top up",
    path: "TenantUtilitiesMyMeter",
  },
];

export const UtilitiesSummary: React.FC = ({ navigation }: any) => {
  // 🔹 Tabs
  const [activeTab] = useState("Summary");

  // 🔹 Dropdown
  const [selectBy, setSelectBy] = useState<string | null>(null);

  // 🔹 Date range (grouped state)
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
    showPicker: boolean;
    pickerMode: "start" | "end";
    tempDate: Date;
  }>({
    start: null,
    end: null,
    showPicker: false,
    pickerMode: "start",
    tempDate: new Date(),
  });

  // 🔹 Chart (grouped state)
  const [chart, setChart] = useState<{
    period: "This Week" | "This Month" | "This Year";
    data: number[];
    labels: string[];
  }>({
    period: "This Week",
    data: [300, 170, 130, 200, 150, 217, 50],
    labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
  });

  // --- HANDLERS ---
  const openPicker = (mode: "start" | "end") => {
    setDateRange((prev) => ({
      ...prev,
      pickerMode: mode,
      tempDate: prev[mode] || new Date(),
      showPicker: true,
    }));
  };

  const onChangeDate = (date: Date) => {
    setDateRange((prev) => ({
      ...prev,
      [prev.pickerMode]: date,
      showPicker: false,
    }));
  };

  const updateChartByPeriod = (
    period: "This Week" | "This Month" | "This Year"
  ) => {
    switch (period) {
      case "This Week":
        setChart({
          period,
          labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
          data: [300, 170, 130, 200, 150, 217, 50],
        });
        break;
      case "This Month":
        setChart({
          period,
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          data: [1200, 1500, 1000, 1700],
        });
        break;
      case "This Year":
        setChart({
          period,
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          data: [
            5000, 4200, 6000, 5500, 4800, 5000, 6200, 5900, 5700, 6000, 6300,
            6500,
          ],
        });
        break;
    }
  };

  const formatDate = (date: Date | null) =>
    date ? date.toLocaleDateString() : "Select Date";
  // onTabChangeHandler
  // --- UI ---
  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header2 title="Utilities" onNotificationPress={() => {}} />
      <TenantUtilitiesTabs activeTab={activeTab} navigation={navigation}>
        <ScrollView>
          {/* Heading */}
          <Text style={styles.heading}>Summary</Text>

          {/* Summary List */}
          <View style={styles.summaryList}>
            {SummaryList.map((val, index) => (
              <View key={index} style={styles.summaryListBox}>
                <View style={styles.summaryListIcon}>
                  <WithLocalSvg asset={val.icon} />
                </View>
                <Text style={styles.summaryListTitle}>{val.title}</Text>
                <Text style={styles.summaryListData}>{val.data}</Text>
                <Pressable
                  style={styles.summaryListBtn}
                  onPress={() => navigation.navigate(val.path)}
                >
                  <Text style={styles.summaryListBtnTxt}>{val.btnTxt}</Text>
                </Pressable>
              </View>
            ))}
          </View>

          {/* Divider line */}
          <View style={styles.line} />

          {/* First Dropdown */}
          <DropdownComponent
            data={[
              { label: "Property", value: "Property" },
              { label: "Property Group", value: "Property Group" },
            ]}
            label="Choose type"
            placeholder="Select Properties"
            value={selectBy}
            onChangeValue={(v: string) => {
              setSelectBy(v);
              setDateRange((prev) => ({ ...prev, start: null, end: null }));
            }}
            dropdownStyle={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelected}
            rightIconColor={colors.white}
          />

          {/* Power Consumption Section */}
          <View style={styles.section}>
            <View style={styles._seciton_row}>
              <Text weight="semiBold" style={styles.sectionTitle}>
                Power Consumption
              </Text>
              <View style={styles.dropdownContainer}>
                <DropdownComponent
                  data={[
                    { label: "This Week", value: "This Week" },
                    { label: "This Month", value: "This Month" },
                    { label: "This Year", value: "This Year" },
                  ]}
                  label="Select Period"
                  placeholder="Sort by"
                  value={chart.period}
                  onChangeValue={updateChartByPeriod}
                  dropdownStyle={styles.customDropdownStyle}
                  placeholderStyle={styles.customPlaceholderStyle}
                  selectedTextStyle={styles.customSelectedTextStyle}
                />
              </View>
            </View>
          </View>

          {/* Date Pickers */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: adjustSize(10),
            }}
          >
            <Pressable
              style={[styles.dtButton, { width: "48%" }]}
              onPress={() => openPicker("start")}
            >
              <Text style={styles.dtText}>
                {dateRange.start ? formatDate(dateRange.start) : "Start Date"}
              </Text>
              <WithLocalSvg asset={Images.calendar} />
            </Pressable>

            <Pressable
              style={[styles.dtButton, { width: "48%" }]}
              onPress={() => openPicker("end")}
            >
              <Text style={styles.dtText}>
                {dateRange.end ? formatDate(dateRange.end) : "End Date"}
              </Text>
              <WithLocalSvg asset={Images.calendar} />
            </Pressable>
          </View>

          {/* Chart */}
          <AnalysisChart
            data={chart.data}
            labels={chart.labels}
            period={chart.period}
          />

          {/* Custom Date Picker Modal */}
          {dateRange.showPicker && (
            <CustomDateTimePicker
              mode="date"
              value={dateRange.tempDate}
              visible={dateRange.showPicker}
              onChange={onChangeDate}
              onCancel={() =>
                setDateRange((prev) => ({ ...prev, showPicker: false }))
              }
              onConfirm={() =>
                setDateRange((prev) => ({ ...prev, showPicker: false }))
              }
            />
          )}
        </ScrollView>
      </TenantUtilitiesTabs>
    </Screen>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  screenContentContainer: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  dropdown: {
    height: adjustSize(47),
    borderRadius: adjustSize(10),
    backgroundColor: "#6369A4",
    marginBottom: adjustSize(3),
    marginHorizontal: adjustSize(10),
  },
  dropdownPlaceholder: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.normal,
  },
  dropdownSelected: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.normal,
  },
  dropdownContainer: { width: adjustSize(120) },
  customDropdownStyle: {
    height: adjustSize(33),
    borderRadius: adjustSize(100),
    backgroundColor: colors.primary,
  },
  customPlaceholderStyle: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.normal,
  },
  customSelectedTextStyle: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.normal,
  },
  section: {
    marginHorizontal: adjustSize(10),
    marginTop: adjustSize(10),
    marginBottom: adjustSize(15),
  },
  sectionTitle: {
    fontSize: adjustSize(15),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  _seciton_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: adjustSize(10),
  },
  dtButton: {
    height: adjustSize(49),
    borderRadius: adjustSize(10),
    backgroundColor: colors.fill,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    marginHorizontal: adjustSize(1),
    marginBottom: adjustSize(5),
  },
  dtText: {
    color: colors.primaryLight,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.normal,
  },
  line: {
    height: adjustSize(0.5),
    backgroundColor: "#B0B0B0",
    marginBottom: adjustSize(35),
    marginTop: adjustSize(20),
  },
  summaryList: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    paddingHorizontal: adjustSize(15),
    justifyContent: "space-between",
  },
  summaryListBox: {
    borderWidth: adjustSize(0.5),
    borderColor: "#B0B0B0",
    backgroundColor: colors.fill,
    borderRadius: adjustSize(10),
    width: "48%",
    marginTop: adjustSize(50),
  },
  summaryListIcon: {
    backgroundColor: colors.white,
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 1,
    width: adjustSize(50),
    height: adjustSize(50),
    borderRadius: adjustSize(50 / 2),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: adjustSize(-25),
  },
  summaryListTitle: {
    fontSize: adjustSize(12),
    color: "#7E7E7E",
    fontFamily: typography.fonts.poppins.normal,
    textAlign: "center",
    marginTop: adjustSize(5),
  },
  summaryListData: {
    fontSize: adjustSize(15),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    textAlign: "center",
  },
  summaryListBtn: {
    height: adjustSize(35),
    borderRadius: adjustSize(7),
    backgroundColor: colors.primary,
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: adjustSize(5),
    marginTop: adjustSize(10),
  },
  heading: {
    fontSize: adjustSize(15),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    marginHorizontal: adjustSize(15),
    marginTop: adjustSize(25),
    marginBottom: adjustSize(25),
  },
  summaryListBtnTxt: {
    fontSize: adjustSize(15),
    color: colors.white,
    fontFamily: typography.fonts.poppins.semiBold,
  },
});
