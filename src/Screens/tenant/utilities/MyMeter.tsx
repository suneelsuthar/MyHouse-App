import React, { useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Screen, Header2, Text } from "../../../Components";
import { colors, typography, adjustSize } from "../../../theme";
import DropdownComponent from "../../../Components/DropDown";
import { TenantUtilitiesTabs } from "./Components/TenantUtilitiesTabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

// 🔹 Dropdown Option type
interface Option {
  label: string;
  value: string;
}

// 🔹 Meter detail type
interface MeterDetail {
  title: string;
  value: string;
}

// 🔹 Props type (adjust according to your navigation setup)
type RootStackParamList = {
  TenantUtilitiesMyMeter: undefined;
  // add other screens if needed
};

type TenantUtilitiesMyMeterProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "TenantUtilitiesMyMeter"
  >;
  route: RouteProp<RootStackParamList, "TenantUtilitiesMyMeter">;
};

// 🔹 Static dropdown data
const typeOptions: Option[] = [
  { label: "Downtown Tower", value: "Downtown Tower" },
  { label: "Park View Apartments", value: "Park View Apartments" },
  { label: "Lakeside Commons", value: "Lakeside Commons" },
  { label: "Heritage Square", value: "Heritage Square" },
];

// 🔹 Static list data
const list: MeterDetail[] = [
  { title: "Meter Number", value: "01238238878374" },
  { title: "Meter ID", value: "13202" },
  { title: "Phase Number", value: "3" },
  { title: "Current Specification", value: "012345678901" },
  { title: "Energy", value: "250" },
  { title: "Energy Type", value: "kwh" },
  { title: "Estate", value: "4321" },
];

export const TenantUtilitiesMyMeter: React.FC<TenantUtilitiesMyMeterProps> = ({
  navigation,
}) => {
  // 🔹 Tabs
  const [activeTab] = useState<string>("My meter");

  // 🔹 Dropdown State
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header2 title="My Meter" onNotificationPress={() => {}} />
      <TenantUtilitiesTabs activeTab={activeTab} navigation={navigation}>
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
        {selectedType ? (
          <ScrollView>
            <Text>Meter Details - {selectedType}</Text>
            {list.map((val, index) => (
              <View key={index}>
                <Text>{val.title}</Text>
                <Text>{val.value}</Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.message}>
            Please select a property to view meter details.
          </Text>
        )}
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
  message: {
    fontSize: adjustSize(13),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    margin: adjustSize(10),
  },
});
