import React, { useState } from "react";
import { StyleSheet, View, Switch } from "react-native";
import { Screen, Text, Button, Header2, TextField } from "../../../Components";
import { AppStackScreenProps } from "../../../utils/interfaces";
import { adjustSize, colors, spacing, typography } from "../../../theme";
import DropdownComponent from "../../../Components/DropDown";
interface TenantAddBeneficiaryProps
  extends AppStackScreenProps<"TenantAddBeneficiary"> {}

export function TenantAddBeneficiary(props: TenantAddBeneficiaryProps) {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header2 title="Add New Beneficiary" />
      <View style={styles.container}>
        <Text
          weight="semiBold"
          text="Enter bank details"
          style={styles._heading}
        />
        <Text
          text="Fill in the recipient's bank account information"
          style={styles._sub_heading}
        />

        <Text weight="medium" text="Select Bank Name*" style={styles._label} />
        <DropdownComponent
          placeholder="Select"
          rightIconColor={colors.primary}
          data={[
            {
              label: "National Bank",
              value: "national_bank",
            },
            {
              label: "MCB Bank",
              value: "mcb_bank",
            },
          ]}
          dropdownStyle={{
            backgroundColor: colors.fill,
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
            elevation: 2,
          }}
          selectedTextStyle={{
            color: colors.text,
            fontSize: adjustSize(12),
          }}
          placeholderStyle={{
            color: colors.grey,
            fontSize: adjustSize(12),
          }}
        />
        <Text weight="medium" text="Account Number*" style={styles._label} />

        <TextField
          placeholder="lorem ipsum"
          style={{
            fontSize: adjustSize(12),
            fontFamily: typography.fonts.poppins.medium,
          }}
        />

        <View style={styles.manageRow}>
          <Text style={styles.manageLabel}>Save Beneficiary</Text>
          <Switch
            trackColor={{ false: colors.white, true: colors.primary }}
            thumbColor={colors.white}
            ios_backgroundColor="#B0B0B0"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <Button
        text="Add"
        preset="reversed"
        style={{
          marginVertical: adjustSize(20),
          width: "92%",
          alignSelf: "center",
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContentContainer: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  title: {
    fontSize: 24,
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.xl,
    marginTop: spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: 16,
    color: colors.text,
    textAlign: "center",
    lineHeight: 24,
  },
  backButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.md,
    marginTop: spacing.xl,
  },
  backButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  _heading: {
    fontSize: adjustSize(18),
    color: colors.primary,
  },
  _sub_heading: {
    fontSize: adjustSize(14),
    color: colors.primary,
  },
  _label: {
    fontSize: adjustSize(12),
    paddingTop: adjustSize(30),
    paddingBottom: adjustSize(5),
    color: colors.primary,
  },
  manageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: adjustSize(10),
  },
  manageLabel: {
    fontSize: adjustSize(12),
    color: colors.primary,
  },
});
