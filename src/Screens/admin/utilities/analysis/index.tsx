import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import { Screen, Text, Header2, CustomTabs } from "../../../../Components";
import { colors, typography, adjustSize, spacing } from "../../../../theme";
import {
  VendingHistoryIcon,
  PowerConsumptionIcon,
} from "../../../../assets/svg";
import DropdownComponent from "../../../../Components/DropDown";
import { Images } from "../../../../assets/Images";
import { WithLocalSvg } from "react-native-svg/css";
import DateTimePicker from "@react-native-community/datetimepicker";
import AnalysisChart from "../../../../Components/AnalysisChart";
export const AdminAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Power Consumption");
  const [selectBy, setSelectBy] = useState<string | undefined>();
  const [selectedProperty, setSelectedProperty] = useState<
    string | undefined
  >();

  // 🔹 Date picker states
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState<"start" | "end" | null>(null);

  const openPicker = (type: "start" | "end") => {
    setShowPicker(type);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (showPicker === "start") {
      setStartDate(selectedDate || startDate);
    } else if (showPicker === "end") {
      setEndDate(selectedDate || endDate);
    }
    if (Platform.OS !== "ios") {
      setShowPicker(null); // close picker on Android
    }
  };

  const formatDate = (date: Date | null) =>
    date ? date.toLocaleDateString() : "Select Date";

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
            activeIcon: <PowerConsumptionIcon color={colors.primary} />,
            inactiveIcon: <PowerConsumptionIcon color={colors.white} />,
          },
          {
            label: "Vending History",
            activeIcon: <VendingHistoryIcon color={colors.primary} />,
            inactiveIcon: <VendingHistoryIcon color={colors.white} />,
          },
        ]}
        activeTab={activeTab}
        onTabChange={(label) => setActiveTab(label)}
      >
        <ScrollView>
          {/* First Dropdown */}
          <Text style={styles.title}>Select by</Text>
          <DropdownComponent
            data={[
              { label: "Property", value: "Property" },
              { label: "Property Group", value: "Property Group" },
            ]}
            label="Choose type"
            placeholder="Select by"
            value={selectBy}
            onChangeValue={(v: string) => {
              setSelectBy(v);
              setSelectedProperty(undefined);
              setStartDate(null); // reset
              setEndDate(null); // reset
            }}
            dropdownStyle={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelected}
            rightIconColor={colors.primary}
          />

          {/* Show second dropdown only if first one is selected */}
          {selectBy && (
            <>
              <Text style={styles.title}>Select {selectBy}</Text>
              <DropdownComponent
                data={[
                  { label: `${selectBy} A`, value: `${selectBy} A` },
                  { label: `${selectBy} B`, value: `${selectBy} B` },
                  { label: `${selectBy} C`, value: `${selectBy} C` },
                ]}
                label={`Choose ${selectBy}`}
                placeholder={`Select ${selectBy}`}
                value={selectedProperty}
                onChangeValue={(v: string) => {
                  setSelectedProperty(v);
                  setStartDate(null); // reset
                  setEndDate(null); // reset
                }}
                dropdownStyle={styles.dropdown}
                placeholderStyle={styles.dropdownPlaceholder}
                selectedTextStyle={styles.dropdownSelected}
                rightIconColor={colors.primary}
              />
            </>
          )}

          {/* 🔹 Show Power Consumption + Date pickers only if property selected */}
          {selectedProperty && (
            <>
              <View style={styles.line} />
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
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginHorizontal: adjustSize(10),
                }}
              >
                <Pressable
                  style={[styles.dtButton, { width: "48%" }]}
                  onPress={() => openPicker("start")}
                >
                  <Text style={[styles.dtText]}>
                    {startDate ? formatDate(startDate) : "Start Date"}
                  </Text>
                  <WithLocalSvg asset={Images.calendar} />
                </Pressable>

                <Pressable
                  style={[styles.dtButton, { width: "48%" }]}
                  onPress={() => openPicker("end")}
                >
                  <Text style={[styles.dtText]}>
                    {endDate ? formatDate(endDate) : "End Date"}
                  </Text>
                  <WithLocalSvg asset={Images.calendar} />
                </Pressable>
              </View>
              <Text style={styles.units}>300 units</Text>
              <AnalysisChart data={[300, 170, 130, 200, 150, 217, 50]} />
              {/* Native Date Picker */}
              {showPicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                />
              )}
            </>
          )}
        </ScrollView>
      </CustomTabs>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screenContentContainer: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  dropdown: {
    height: adjustSize(48),
    borderRadius: adjustSize(10),
    backgroundColor: colors.fill,
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
  dropdownContainer: {
    width: adjustSize(120),
  },
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
  units: {
    color: "#6369A4",
    fontSize: adjustSize(24),
    fontFamily: typography.fonts.poppins.semiBold,
    marginHorizontal: adjustSize(10),
    lineHeight: adjustSize(35),
    marginTop: adjustSize(10),
  },
  line: {
    height: adjustSize(0.5),
    backgroundColor: "#B0B0B0",
    marginTop: adjustSize(35),
  },
});
