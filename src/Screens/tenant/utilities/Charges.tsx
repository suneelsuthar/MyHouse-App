import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Screen, Text, Header2, TextField } from "../../../Components";
import { colors, typography, adjustSize } from "../../../theme";
import DropdownComponent from "../../../Components/DropDown";
import { TenantUtilitiesTabs } from "./Components/TenantUtilitiesTabs";
import { UtilitiesChargesList } from "./Components/TenantUtilitiesChargesList";
// 🔹 Static dropdown data
const typeOptions = [
  { label: "Property", value: "Property" },
  { label: "Property Group", value: "Property Group" },
];

const sortOptions = [
  { label: "Name A-Z", value: "Name A-Z" },
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
];

export const UtilitiesCharges: React.FC = ({ navigation }: any) => {
  // 🔹 Tabs
  const [activeTab] = useState("Charges");

  // 🔹 Dropdown States
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

  return (
    <Screen
      preset="fiexed"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header2 title="Charges" onNotificationPress={() => {}} />
      {/* <TenantUtilitiesTabs activeTab={activeTab} navigation={navigation}> */}
      <ScrollView>
        {/* First Dropdown (Property Type) */}
        <DropdownComponent
          data={typeOptions}
          label="Choose type"
          placeholder="Select Properties"
          value={selectedType}
          onChangeValue={setSelectedType}
          dropdownStyle={styles.dropdown}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelected}
          rightIconColor={colors.white}
        />

        {/* Transaction History Section */}

        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text weight="semiBold" style={styles.sectionTitle}>
              Charges
            </Text>
            <View style={styles.dropdownContainer}>
              <DropdownComponent
                data={sortOptions}
                label="Select Period"
                placeholder="Sort by"
                value={selectedSort}
                onChangeValue={setSelectedSort}
                dropdownStyle={styles.customDropdownStyle}
                placeholderStyle={styles.customPlaceholderStyle}
                selectedTextStyle={styles.customSelectedTextStyle}
              />
            </View>
          </View>
        </View>
        <View style={{ marginHorizontal: adjustSize(10) }}>
          <TextField
            placeholderTextColor={colors.primaryLight}
            inputWrapperStyle={{ backgroundColor: colors.white }}
            placeholder="Search"
          />
        </View>
        <UtilitiesChargesList />
      </ScrollView>
      {/* </TenantUtilitiesTabs> */}
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
    backgroundColor: colors.primary,
    marginBottom: adjustSize(3),
    marginHorizontal: adjustSize(10),
    marginTop: adjustSize(25),
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
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: adjustSize(10),
  },
});
