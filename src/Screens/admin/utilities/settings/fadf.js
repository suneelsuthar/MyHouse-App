import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextStyle,
  Switch,
} from "react-native";
import { Screen, Text, Header2, TextField } from "../../../../Components";
import { colors, typography, adjustSize } from "../../../../theme";
import DropdownComponent from "../../../../Components/DropDown";

const CounterRow = ({
  label,
  value,
  setValue,
  min = 0,
}: {
  label: string;
  value: number;
  setValue: (n: number) => void;
  min?: number;
}) => {
  const dec = () => setValue(Math.max(min, value - 1));
  const inc = () => setValue(value + 1);
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <View style={styles.rowRight}>
        <TouchableOpacity
          style={styles.boxBtn}
          activeOpacity={0.7}
          onPress={dec}
        >
          <Text weight="semiBold" style={styles.boxBtnText}>
            -
          </Text>
        </TouchableOpacity>
        <Text weight="semiBold" style={styles.countValue}>
          {value}
        </Text>
        <TouchableOpacity
          style={styles.boxBtn}
          activeOpacity={0.7}
          onPress={inc}
        >
          <Text weight="semiBold" style={styles.boxBtnText}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ToggleRow = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) => {
  return (
    <View style={styles.toggleRow}>
      <Text weight="semiBold" style={styles.toggleLabel}>
        {label}
      </Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: colors.greylight, true: colors.primary }}
        thumbColor={colors.white}
      />
    </View>
  );
};

export const AdminUtilitiesSettings: React.FC = () => {
  // dropdown states
  const [propertyGroup, setPropertyGroup] = useState<string | undefined>();
  const [utilityType, setUtilityType] = useState<string | undefined>();
  const [unitOfMeasurement, setUnitOfMeasurement] = useState<string>("KWH");
  const [grandPeriodBasis, setGrandPeriodBasis] =
    useState<string>("Calendar Day");

  // counters
  const [ratePerUnit, setRatePerUnit] = useState(0);

  // toggles
  const [enablePeriodThreshold, setEnablePeriodThreshold] = useState(false);
  const [enableLimitPerPayment, setEnableLimitPerPayment] = useState(false);
  const [allowEmergencyCredit, setAllowEmergencyCredit] = useState(false);
  const [lowCreditWarning, setLowCreditWarning] = useState(false);

  // text fields
  const [dayOfMonth, setDayOfMonth] = useState("");
  const [minQty, setMinQty] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxQty, setMaxQty] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [emergencyQty, setEmergencyQty] = useState("");
  const [lowCredit1, setLowCredit1] = useState("");
  const [lowCredit2, setLowCredit2] = useState("");

  // dynamic unit symbol
  const unitSymbol = unitOfMeasurement === "₦" ? "₦" : "KWH";

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header2 title="Settings" onNotificationPress={() => {}} />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: adjustSize(10),
          paddingBottom: adjustSize(40),
        }}
      >
        <Text style={styles.heading}>Utility Settings</Text>

        {/* Property Group (Required First) */}
        <Text style={styles.title}>Select by property group</Text>
        <DropdownComponent
          data={[
            { label: "Property Group 1", value: "Property Group 1" },
            { label: "Property Group 2", value: "Property Group 2" },
          ]}
          label="Choose type"
          placeholder="Select "
          value={propertyGroup}
          onChangeValue={setPropertyGroup}
          dropdownStyle={styles.dropdown}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelected}
          rightIconColor={colors.primary}
        />

        {/* Show everything else only if property group selected */}
        {propertyGroup && (
          <>
            {/* Utility Type */}
            <Text style={styles.title}>Utility type</Text>
            <DropdownComponent
              data={[{ label: "Electricity", value: "Electricity" }]}
              label="Choose type"
              placeholder="Select type"
              value={utilityType}
              onChangeValue={setUtilityType}
              dropdownStyle={styles.dropdown}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownSelected}
              rightIconColor={colors.primary}
            />

            <CounterRow
              label="Rate Per Unit"
              value={ratePerUnit}
              setValue={setRatePerUnit}
            />

            {/* Unit of Measurement */}
            <Text style={styles.title}>Unit of measurement</Text>
            <DropdownComponent
              data={[
                { label: "KWH", value: "KWH" },
                { label: "₦", value: "₦" },
              ]}
              label="Choose type"
              placeholder="Select Unit"
              value={unitOfMeasurement}
              onChangeValue={setUnitOfMeasurement}
              dropdownStyle={[
                styles.dropdown,
                { marginBottom: adjustSize(10) },
              ]}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownSelected}
              rightIconColor={colors.primary}
            />

            {/* Period Threshold */}
            <ToggleRow
              label="Enable Period Threshold"
              value={enablePeriodThreshold}
              onChange={setEnablePeriodThreshold}
            />

            {enablePeriodThreshold && (
              <>
                <Text style={[styles.title, { marginTop: adjustSize(10) }]}>
                  Grand period Basis:
                </Text>
                <DropdownComponent
                  data={[
                    { label: "Calendar Day", value: "Calendar Day" },
                    { label: "Grace Duration", value: "Grace Duration" },
                  ]}
                  label="Choose type"
                  placeholder="Select Basis"
                  value={grandPeriodBasis}
                  onChangeValue={setGrandPeriodBasis}
                  dropdownStyle={styles.dropdown}
                  placeholderStyle={styles.dropdownPlaceholder}
                  selectedTextStyle={styles.dropdownSelected}
                  rightIconColor={colors.primary}
                />
                <Text style={styles.title}>
                  {grandPeriodBasis === "Calendar Day"
                    ? "Day of the Month"
                    : "No. of Days"}
                </Text>
                <TextField
                  placeholder={`Enter Day${
                    grandPeriodBasis === "Calendar Day" ? "" : "s"
                  }`}
                  value={dayOfMonth}
                  onChangeText={setDayOfMonth}
                  placeholderTextColor={colors.primaryLight}
                  keyboardType="numeric"
                  style={styles.input}
                />
              </>
            )}

            {/* Limit Per Payment */}
            <ToggleRow
              label="Enable Limit Per Payment"
              value={enableLimitPerPayment}
              onChange={setEnableLimitPerPayment}
            />

            {enableLimitPerPayment && (
              <>
                <Text style={styles.title}>
                  Minimum Quantity Per Period ({unitSymbol}):
                </Text>
                <TextField
                  placeholder="Enter amount"
                  value={minQty}
                  onChangeText={setMinQty}
                  placeholderTextColor={colors.primaryLight}
                  keyboardType="numeric"
                  style={styles.input}
                />

                <Text style={styles.title}>Minimum Amount Per Period (₦):</Text>
                <TextField
                  placeholder=""
                  value={minQty ? `₦${(minQty * 5).toFixed(2)}` : ""}
                  onChangeText={setMinAmount}
                  placeholderTextColor={colors.primaryLight}
                  keyboardType="numeric"
                  style={styles.input}
                  editable={false}
                />

                <Text style={styles.title}>
                  Maximum Quantity Per Period ({unitSymbol}):
                </Text>
                <TextField
                  placeholder="Enter amount"
                  value={maxQty}
                  onChangeText={setMaxQty}
                  placeholderTextColor={colors.primaryLight}
                  keyboardType="numeric"
                  style={styles.input}
                />

                <Text style={styles.title}>Maximum Amount Per Period (₦):</Text>
                <TextField
                  placeholder=""
                  value={maxQty ? `₦${(maxQty * 5).toFixed(2)}` : ""}
                  onChangeText={setMaxAmount}
                  placeholderTextColor={colors.primaryLight}
                  keyboardType="numeric"
                  style={styles.input}
                />
              </>
            )}

            {/* Emergency Credit */}
            <ToggleRow
              label="Allow Emergency Credit"
              value={allowEmergencyCredit}
              onChange={setAllowEmergencyCredit}
            />
            {allowEmergencyCredit && (
              <>
                <Text style={[styles.title, { marginTop: adjustSize(10) }]}>
                  Set Emergency Quantity ({unitSymbol}):
                </Text>
                <TextField
                  placeholder="Enter amount"
                  value={emergencyQty}
                  onChangeText={setEmergencyQty}
                  placeholderTextColor={colors.primaryLight}
                  keyboardType="numeric"
                  style={styles.input}
                />
              </>
            )}

            {/* Low Credit Warning */}
            <ToggleRow
              label="Low Credit Warning"
              value={lowCreditWarning}
              onChange={setLowCreditWarning}
            />
            {lowCreditWarning && (
              <>
                <Text style={[styles.title, { marginTop: adjustSize(10) }]}>
                  Low Credit Warning 1 (₦) :
                </Text>
                <TextField
                  placeholder="Enter amount"
                  value={lowCredit1}
                  onChangeText={setLowCredit1}
                  placeholderTextColor={colors.primaryLight}
                  keyboardType="numeric"
                  style={styles.input}
                />

                <Text style={styles.title}>Low Credit Warning 2 (₦) :</Text>
                <TextField
                  placeholder="Enter amount"
                  value={lowCredit2}
                  onChangeText={setLowCredit2}
                  placeholderTextColor={colors.primaryLight}
                  keyboardType="numeric"
                  style={styles.input}
                />
              </>
            )}
          </>
        )}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  heading: {
    fontSize: adjustSize(15),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    marginTop: adjustSize(20),
  },
  dropdown: {
    height: adjustSize(49),
    borderRadius: adjustSize(10),
    backgroundColor: colors.fill,
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    marginBottom: adjustSize(3),
  },
  input: {
    color: colors.primary,
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
    marginBottom: adjustSize(3),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: adjustSize(20),
    marginBottom: adjustSize(3),
  },
  rowLabel: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
    flexShrink: 1,
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: adjustSize(10),
  },
  boxBtn: {
    width: adjustSize(21),
    height: adjustSize(21),
    borderRadius: adjustSize(5),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: adjustSize(0.5),
    borderColor: colors.primary,
  },
  boxBtnText: {
    color: colors.primaryLight,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.bold,
  } as TextStyle,
  countValue: {
    minWidth: adjustSize(20),
    textAlign: "center",
    color: colors.primaryLight,
    fontSize: adjustSize(16),
    fontFamily: typography.fonts.poppins.bold,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toggleLabel: {
    color: colors.primary,
    fontSize: adjustSize(12),
    flexShrink: 1,
    fontFamily: typography.fonts.poppins.normal,
  },
});
