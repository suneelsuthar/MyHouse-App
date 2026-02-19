import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Pressable, Alert } from "react-native";
import { Screen, Text, Header2, CustomTabs } from "../../../../Components";
import { colors, typography, adjustSize, spacing } from "../../../../theme";
import {
  VendingHistoryIcon,
  PowerConsumptionIcon,
} from "../../../../assets/svg";
import DropdownComponent from "../../../../Components/DropDown";
import { Images } from "../../../../assets/Images";
import { WithLocalSvg } from "react-native-svg/css";
import AnalysisChart from "../../../../Components/AnalysisChart";
import { CustomDateTimePicker } from "../../../../Components/CustomDateTimePicker";
export const Analysis: React.FC = (props: any) => {
  const [activeTab, setActiveTab] = useState("Power Consumption");
  const [selectBy, setSelectBy] = useState<string | undefined>();
  const [selectedEstate, setSelectedEstate] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  useEffect(() => {
    if (props?.route?.params?.tab === "power_consumption") {
      setActiveTab("Power Consumption");
    } else {
      setActiveTab("Vending History");
    }
  }, [props?.route?.params]);

  // 🔹 Date picker states
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [pickerMode, setPickerMode] = useState<"start" | "end">("start");
  const [tempDate, setTempDate] = useState<Date>(new Date());

  // 🔹 Chart states
  const [selectedPeriod, setSelectedPeriod] = useState<string>("This Week");
  const [chartData, setChartData] = useState<number[]>([
    300, 170, 130, 200, 150, 217, 50,
  ]);

  // Refresh chart whenever active tab changes using current selectedPeriod
  useEffect(() => {
    updateChartByPeriod(selectedPeriod);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);
  const [chartLabels, setChartLabels] = useState<string[]>([
    "Sat",
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
  ]);

  const openPicker = (mode: "start" | "end") => {
    setPickerMode(mode);
    setTempDate(
      mode === "start" ? startDate || new Date() : endDate || new Date(),
    );
    setShowPicker(true);
  };

  const onChange = (date: Date) => {
    if (pickerMode === "start") {
      setStartDate(date);
      if (endDate && date > endDate) {
        setEndDate(null);
      }
    } else {
      if (startDate && date < startDate) {
        Alert.alert(
          "Invalid Date",
          "End date cannot be earlier than start date.",
        );
      } else {
        setEndDate(date);
      }
    }
    setShowPicker(false);
  };

  const formatDate = (date: Date | null) =>
    date ? date.toLocaleDateString() : "Select Date";

  // 🔹 Update chart by selected period
  const updateChartByPeriod = (period: string) => {
    setSelectedPeriod(period);
    if (activeTab === "Power Consumption") {
      switch (period) {
        case "This Week":
          setChartLabels(["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]);
          setChartData([300, 170, 130, 200, 150, 217, 50]);
          break;
        case "This Month":
          setChartLabels(["Week 1", "Week 2", "Week 3", "Week 4"]);
          setChartData([1200, 1500, 1000, 1700]);
          break;
        case "This Year":
          setChartLabels([
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
          ]);
          setChartData([
            5000, 4200, 6000, 5500, 4800, 5000, 6200, 5900, 5700, 6000, 6300,
            6500,
          ]);
          break;
      }
    } else {
      // Vending History datasets
      switch (period) {
        case "This Week":
          setChartLabels(["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]);
          setChartData([20, 35, 18, 42, 26, 30, 22]);
          break;
        case "This Month":
          setChartLabels(["Week 1", "Week 2", "Week 3", "Week 4"]);
          setChartData([140, 160, 120, 180]);
          break;
        case "This Year":
          setChartLabels([
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
          ]);
          setChartData([
            820, 760, 910, 980, 870, 920, 1050, 990, 940, 1010, 970, 1100,
          ]);
          break;
      }
    }
  };

  const renderContent = () => {
    return (
      <ScrollView>
        {/* First Dropdown */}
        <Text style={styles.title}>Search by</Text>
        <DropdownComponent
          data={[
            { label: "Property", value: "Property" },
            { label: "Estate", value: "Estate" },
          ]}
          label="Property"
          placeholder="Property"
          value={selectBy}
          onChangeValue={(v: string) => {
            setSelectBy(v);
            setSelectedEstate(null);
            setSelectedProperty(null);
          }}
          dropdownStyle={styles.dropdown}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelected}
          rightIconColor={colors.primary}
        />

        {/* If Estate selected: show Property/Estate dropdown */}
        {selectBy === "Estate" && (
          <View>
            <Text style={styles.title}>Select Property/Estate</Text>
            <DropdownComponent
              data={[
                { label: "Estate 1", value: "estate_1" },
                { label: "Estate 2", value: "estate_2" },
                { label: "Estate 3", value: "estate_3" },
              ]}
              placeholder="Select Property/Estate"
              label="Select Property/Estate"
              value={selectedEstate ?? undefined}
              selectedTextStyle={styles.dropdownSelected}
              onChangeValue={(v: string) => {
                setSelectedEstate(v);
                setSelectedProperty(null);
              }}
              dropdownStyle={styles.dropdown}
              placeholderStyle={styles.dropdownPlaceholder}
            />
          </View>
        )}

        {/* If Property selected: show Property dropdown */}
        {selectBy === "Property" && (
          <View>
            <Text style={styles.title}>Select Property</Text>
            <DropdownComponent
              data={[
                { label: "Property 1", value: "property_1" },
                { label: "Property 2", value: "property_2" },
                { label: "Property 3", value: "property_3" },
              ]}
              placeholder="Select Property"
              label="Select Property"
              value={selectedProperty ?? undefined}
              selectedTextStyle={styles.dropdownSelected}
              onChangeValue={(v: string) => setSelectedProperty(v)}
              dropdownStyle={styles.dropdown}
              placeholderStyle={styles.dropdownPlaceholder}
            />
          </View>
        )}

        {((selectBy === "Property" && !!selectedProperty) ||
          (selectBy === "Estate" && !!selectedEstate)) && (
          <>
            <View style={styles.line} />
            <View style={styles.section}>
              <View style={styles._seciton_row}>
                <Text weight="semiBold" style={styles.sectionTitle}>
                  {activeTab}
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
                    value={selectedPeriod}
                    onChangeValue={updateChartByPeriod}
                    dropdownStyle={styles.customDropdownStyle}
                    placeholderStyle={styles.customPlaceholderStyle}
                    selectedTextStyle={styles.customSelectedTextStyle}
                  />
                </View>
              </View>
            </View>

            {/* Units */}
            <Text style={styles.units}>
              {activeTab === "Power Consumption" ? "300kwh" : "300 vendings"}
            </Text>

            {/* Chart */}
            <AnalysisChart
              data={chartData}
              labels={chartLabels}
              period={selectedPeriod}
            />

            {/* Custom Date Picker */}
            {showPicker && (
              <CustomDateTimePicker
                mode="date"
                value={tempDate}
                visible={showPicker}
                onChange={onChange}
                onCancel={() => setShowPicker(false)}
                onConfirm={() => setShowPicker(false)}
              />
            )}
          </>
        )}
      </ScrollView>
    );
  };

  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header2 title="Analysis" onNotificationPress={() => {}} />
      <CustomTabs
        tabs={[
          {
            label: "Power Consumption",
            activeIcon: <PowerConsumptionIcon color={colors.white} />,
            inactiveIcon: <PowerConsumptionIcon color={colors.white} />,
          },
          {
            label: "Vending History",
            activeIcon: <VendingHistoryIcon color={colors.white} />,
            inactiveIcon: <VendingHistoryIcon color={colors.white} />,
          },
        ]}
        activeTab={activeTab}
        onTabChange={(label: string) => {
          setActiveTab(label);
          console.log(label);
          setSelectBy(undefined);

          // Reset all filters when switching tabs
          setSelectedEstate(null);
          setSelectedProperty(null);
          setStartDate(null);
          setEndDate(null);
        }}
      >
        {[renderContent()]}
      </CustomTabs>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screenContentContainer: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  multiSelectContainer: {
    marginTop: 16,
  },
  multiSelect: {
    marginTop: 8,
    padding: 0,
    // height:adjustSize(50),
    borderRadius: 15,
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  label: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
    marginBottom: 8,
  },
  required: {
    color: colors.error,
    marginLeft: 4,
  },
  dropdown: {
    height: adjustSize(48),
    borderRadius: adjustSize(10),
    backgroundColor: colors.white,
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    marginBottom: adjustSize(3),
    marginHorizontal: adjustSize(10),
  },
  dropdownPlaceholder: {
    fontSize: adjustSize(12),
    color: colors.primaryLight,
    fontFamily: typography.fonts.poppins.normal,
  },
  dropdownSelected: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
  },
  title: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
    marginTop: adjustSize(20),
    marginHorizontal: adjustSize(10),
    marginBottom: adjustSize(3),
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
    backgroundColor: colors.primary,
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
  units: {
    color: colors.primary,
    fontSize: adjustSize(24),
    fontFamily: typography.fonts.poppins.semiBold,
    marginHorizontal: adjustSize(10),
    lineHeight: adjustSize(35),
    marginTop: adjustSize(10),
  },
  line: {
    height: adjustSize(0.2),
    backgroundColor: "#B0B0B0",
    marginTop: adjustSize(35),
    opacity: 0.9,
  },
});
