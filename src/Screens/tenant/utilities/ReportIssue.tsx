import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Screen, Header2, TextField, Text, Button } from "../../../Components";
import { colors, typography, adjustSize } from "../../../theme";
import DropdownComponent from "../../../Components/DropDown";
import { TenantUtilitiesTabs } from "./Components/TenantUtilitiesTabs";
import moment from "moment";

// 🔹 Static dropdown data
const typeOptions = [
  { label: "Property", value: "Property" },
  { label: "Property Group", value: "Property Group" },
];

const issueTypeOptions = [
  { label: "Payment", value: "Payment" },
  { label: "Power", value: "Power" },
  { label: "Transactions", value: "Transactions" },
  { label: "Suggestion", value: "Suggestion" },
  { label: "Others", value: "Others" },
];

export const TenantUtilitiesReportIssue: React.FC = ({ navigation }: any) => {
  // 🔹 Tabs
  const [activeTab] = useState("Report issue");

  // 🔹 Dropdown States
  const [propertyType, setPropertyType] = useState<string | null>(null);
  const [issueType, setIssueType] = useState<string | null>(null);

  // 🔹 Textfield State
  const [issueDescription, setIssueDescription] = useState("");

  const handleSubmit = () => {
    const payload = {
      propertyType,
      issueType,
      propertyName: "Brume Villa",
      dateCreated: moment().format("MMMM DD YYYY, h:mm:ss a"),
      description: issueDescription,
    };
    console.log("Form Submitted:", payload);
    // 🔹 Add API call or navigation here
  };

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header2 title="Report an Issue" onNotificationPress={() => {}} />

      {/* <TenantUtilitiesTabs activeTab={activeTab} navigation={navigation}> */}
        <ScrollView>
          {/* First Dropdown (Property Type) */}
          <DropdownComponent
            data={typeOptions}
            placeholder="Select Properties"
            value={propertyType}
            onChangeValue={setPropertyType}
            dropdownStyle={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelected}
            rightIconColor={colors.white}
          />

          <Text style={styles.title}>Issue type*</Text>
          <DropdownComponent
            data={issueTypeOptions}
            placeholder="Select Issue type"
            value={issueType}
            onChangeValue={setIssueType}
            dropdownStyle={styles.dropdown2}
            placeholderStyle={[
              styles.dropdownPlaceholder,
              { color: colors.primaryLight },
            ]}
            selectedTextStyle={[
              styles.dropdownSelected,
              { color: colors.primary },
            ]}
            rightIconColor={colors.primaryLight}
          />

          {/* <Text style={styles.title}>Property</Text>
          <View style={{ marginHorizontal: adjustSize(10) }}>
            <TextField
              placeholderTextColor={colors.primaryLight}
              inputWrapperStyle={{ backgroundColor: colors.white }}
              value="Brume Villa"
              editable={false}
            />
          </View> */}

          <Text style={styles.title}>Date Created</Text>
          <View style={{ marginHorizontal: adjustSize(10) }}>
            <TextField
              placeholderTextColor={colors.primaryLight}
              inputWrapperStyle={{ backgroundColor: colors.white }}
              value={moment().format("MMMM DD YYYY, h:mm:ss a")}
              editable={false}
            />
          </View>

          <Text style={styles.title}>Issue Description*</Text>
          <View style={{ marginHorizontal: adjustSize(10) }}>
            <TextField
              placeholderTextColor={colors.primaryLight}
              placeholder="Write your issue here..."
              inputWrapperStyle={[
                {
                  height: adjustSize(158),
                  alignItems: "flex-start",
                  backgroundColor: colors.white,
                },
              ]}
              style={{ height: adjustSize(155) }}
              value={issueDescription}
              onChangeText={setIssueDescription}
              multiline
            />
          </View>

          <View style={styles.btn}>
            <Button text="Submit" preset="reversed" onPress={handleSubmit} />
          </View>
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
    marginBottom: adjustSize(7),
    marginHorizontal: adjustSize(10),
    marginTop: adjustSize(25),
  },
  dropdown2: {
    height: adjustSize(49),
    borderRadius: adjustSize(10),
    backgroundColor: colors.white,
    marginBottom: adjustSize(3),
    marginHorizontal: adjustSize(10),
    marginTop: adjustSize(2),
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
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
  title: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    marginHorizontal: adjustSize(10),
    marginTop: adjustSize(10),
    marginBottom: adjustSize(2),
  },
  btn: {
    marginHorizontal: adjustSize(15),
    marginVertical: adjustSize(15),
  },
});
