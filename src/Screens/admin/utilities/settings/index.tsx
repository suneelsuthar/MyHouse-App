import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextStyle,
  Switch,
} from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import {
  Screen,
  Text,
  Header2,
  TextField,
  Button,
} from "../../../../Components";
import { colors, typography, adjustSize } from "../../../../theme";
import DropdownComponent from "../../../../Components/DropDown";
import { useNavigation } from "@react-navigation/native";
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
  showInfo,
  tooltipContent,
  tooltipVisible,
  onTooltipToggle,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  showInfo?: boolean;
  tooltipContent?: string;
  tooltipVisible?: boolean;
  onTooltipToggle?: () => void;
}) => {
  return (
    <View style={styles.toggleRow}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text weight="semiBold" style={styles.toggleLabel}>
          {label}
        </Text>

        {showInfo && (
          <View style={{ position: "relative", marginLeft: 4 }}>
            {/* <Tooltip
              isVisible={tooltipVisible}
              content={
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 10,
                    lineHeight: 14,
                    textAlign: "center",
                  }}
                  text={tooltipContent || "Information not available"}
                />
              }
              placement="top"
              useInteractionManager={true}
              showChildInTooltip={false}
              onClose={onTooltipToggle}
              contentStyle={{
                backgroundColor: colors.black,
                padding: 8,
                borderRadius: 4,
                width: "80%",
              }}
              backgroundColor="transparent"
              arrowStyle={{
                borderTopColor: colors.black,
              }}
              tooltipStyle={{
                // position: "absolute",
                alignItems: "center",
                marginTop: -40,
              }}
              arrowSize={{ width: 10, height: 5 }}
            >
              <View style={{ width: 0, height: 0 }} />
            </Tooltip> */}
            {/* <TouchableOpacity
              style={styles._info}
              onPress={onTooltipToggle}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text
                weight="semiBold"
                style={{
                  color: colors.white,
                  fontSize: 10,
                  lineHeight: 12,
                }}
              >
                ?
              </Text>
            </TouchableOpacity> */}
          </View>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: colors.greylight, true: colors.primary }}
        thumbColor={colors.white}
        style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
      />
    </View>
  );
};

export const AdminUtilitiesSettings: React.FC = () => {
  // dropdown states
  const [propertyGroup, setPropertyGroup] = useState<string | undefined>();
  const [unitOfMeasurement, setUnitOfMeasurement] = useState<string>("₦");
  const [grandPeriodBasis, setGrandPeriodBasis] =
    useState<string>("Calendar Day");

  // counters
  const [ratePerUnit, setRatePerUnit] = useState(0);

  // toggles
  const [enablePeriodThreshold, setEnablePeriodThreshold] = useState(false);
  const [enableLimitPerPayment, setEnableLimitPerPayment] = useState(false);
  const [allowEmergencyCredit, setAllowEmergencyCredit] = useState(false);

  // text fields
  const [dayOfMonth, setDayOfMonth] = useState("");
  const [minQty, setMinQty] = useState<any>("");
  const [minAmount, setMinAmount] = useState("");
  const [maxQty, setMaxQty] = useState<any>("");
  const [maxAmount, setMaxAmount] = useState("");
  const [emergencyQty, setEmergencyQty] = useState("");

  // Tooltip visibility states
  const [periodThresholdTooltip, setPeriodThresholdTooltip] = useState(false);
  const [emergencyCreditTooltip, setEmergencyCreditTooltip] = useState(false);
  const [limitPerPaymentTooltip, setLimitPerPaymentTooltip] = useState(false);

  const navigation = useNavigation();

  // dynamic unit symbol
  const unitSymbol = unitOfMeasurement === "₦" ? "₦" : "₦";

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={styles.container}
    >
      <Header2 title="Settings" onNotificationPress={() => {}} />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: adjustSize(10),
          paddingBottom: adjustSize(40),
        }}
      >
        <Text style={[styles.heading, { marginTop: 40 }]}>
          Utility Settings
        </Text>

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
            {/* <Text style={styles.title}>Utility type</Text>
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
            /> */}

            <View style={{ marginTop: adjustSize(20) }}>
              <CounterRow
                label="Rate Per Unit"
                value={ratePerUnit}
                setValue={setRatePerUnit}
                min={0}
              />
            </View>

            {/* Unit of Measurement */}
            <Text style={styles.title}>Unit of measurement</Text>
            <DropdownComponent
              data={[{ label: "₦", value: "₦" }]}
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
              showInfo={true}
              tooltipContent="Enable Period Threshold is a setting that automatically disconnects electricity when a tenant's unpaid balance exceeds a defined limit after a grace period."
              tooltipVisible={periodThresholdTooltip}
              onTooltipToggle={() =>
                setPeriodThresholdTooltip(!periodThresholdTooltip)
              }
            />

            {enablePeriodThreshold && (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={[styles.title, { marginTop: adjustSize(10) }]}>
                    Grace Period Basis:
                  </Text>
                  {/* <Tooltip
                    isVisible={gracePeriodTooltip}
                    content={
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: 10,
                          lineHeight: 14,
                          textAlign: "center",
                        }}
                      >
                        Set limit for the amount paid for each purchase of this
                        utility type.
                      </Text>
                    }
                    placement="top"
                    onClose={() => setGracePeriodTooltip(false)}
                    contentStyle={{
                      backgroundColor: colors.black,
                      padding: 8,
                      borderRadius: 4,
                      width: "80%",
                    }}
                    backgroundColor="transparent"
                    arrowStyle={{ borderTopColor: colors.black }}
                    tooltipStyle={{ alignItems: "center", marginTop: -40 }}
                    arrowSize={{ width: 10, height: 5 }}
                    showChildInTooltip={false}
                  >
                    <TouchableOpacity
                      onPress={() => setGracePeriodTooltip(true)}
                      style={styles._info}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Text
                        weight="semiBold"
                        style={{
                          color: colors.white,
                          fontSize: 10,
                          lineHeight: 12,
                        }}
                      >
                        ?
                      </Text>
                    </TouchableOpacity>
                  </Tooltip> */}
                </View>
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

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <Text style={styles.title}>
                    {grandPeriodBasis === "Calendar Day"
                      ? "Day of the Month"
                      : "No. of Days"}
                  </Text>
                  {/* <Tooltip
                    isVisible={dayOfMonthTooltip}
                    content={
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: 10,
                          lineHeight: 14,
                          textAlign: "center",
                        }}
                      >
                        Calendar day specifies a day in the month after which a
                        debt can be overdue
                      </Text>
                    }
                    placement="top"
                    onClose={() => setDayOfMonthTooltip(false)}
                    contentStyle={{
                      backgroundColor: colors.black,
                      padding: 8,
                      borderRadius: 4,
                      width: "80%",
                    }}
                    backgroundColor="transparent"
                    arrowStyle={{ borderTopColor: colors.black }}
                    tooltipStyle={{ alignItems: "center", marginTop: -40 }}
                    arrowSize={{ width: 10, height: 5 }}
                    showChildInTooltip={false}
                  >
                    <TouchableOpacity
                      onPress={() => setDayOfMonthTooltip(true)}
                      style={styles._info}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Text
                        weight="semiBold"
                        style={{
                          color: colors.white,
                          fontSize: 10,
                          lineHeight: 12,
                        }}
                      >
                        ?
                      </Text>
                    </TouchableOpacity>
                  </Tooltip> */}
                </View>
                <TextField
                  placeholder={`Enter Day${
                    grandPeriodBasis === "Calendar Day" ? "" : "s"
                  }`}
                  value={dayOfMonth}
                  onChangeText={setDayOfMonth}
                  placeholderTextColor={colors.primaryLight}
                  keyboardType="numeric"
                  style={styles.input}
                  inputWrapperStyle={{ backgroundColor: colors.white }}
                />
              </>
            )}

            {/* Limit Per Payment */}
            <ToggleRow
              label="Enable Limit Per Payment"
              value={enableLimitPerPayment}
              onChange={setEnableLimitPerPayment}
              showInfo={true}
              tooltipContent="Set limit for the amount paid for each purchase of thisutility type."
              tooltipVisible={limitPerPaymentTooltip}
              onTooltipToggle={() =>
                setLimitPerPaymentTooltip(!limitPerPaymentTooltip)
              }
            />

            {enableLimitPerPayment && (
              <>
                {/* <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    position:"relative"
                  }}
                >
                  <Text style={styles.title}>
                    Minimum Quantity Per Period ({unitSymbol}):
                  </Text>
                  <Tooltip
                    isVisible={minQtyTooltip}
                    content={
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: 10,
                          lineHeight: 14,
                          textAlign: "center",
                        }}
                      >
                        Minimum quantity required per billing period
                      </Text>
                    }
                    placement="top"
                    useInteractionManager={true}
                    showChildInTooltip={true}
                    onClose={() => setMinQtyTooltip(false)}
                    contentStyle={{
                      backgroundColor: colors.black,
                      padding: 8,
                      borderRadius: 4,
                      width: "80%",
                    }}
                    backgroundColor="transparent"
                    arrowStyle={{
                      borderTopColor: colors.black,
                    }}
                    tooltipStyle={{
                      alignItems: "center",
                      marginTop: -40,
                    }}
                    arrowSize={{ width: 10, height: 5 }}
                  >
                    <View style={{ width: 0, height: 0 }} />
                  </Tooltip>
                  <TouchableOpacity
                    onPress={() => setMinQtyTooltip(true)}
                    style={styles._info}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Text
                      weight="semiBold"
                      style={{
                        color: colors.white,
                        fontSize: 10,
                        lineHeight: 12,
                      }}
                    >
                      ?
                    </Text>
                  </TouchableOpacity>
                </View> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <Text style={styles.title}>
                    Minimum Quantity Per Period ({unitSymbol}):
                  </Text>

                  {/* <Tooltip
                    isVisible={minQtyTooltip}
                    content={
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: 10,
                          lineHeight: 14,
                          textAlign: "center",
                        }}
                      >
                        Specify the minimum quantity that can be purchased in a
                        single transaction
                      </Text>
                    }
                    placement="top"
                    onClose={() => setMinQtyTooltip(false)}
                    contentStyle={{
                      backgroundColor: colors.black,
                      padding: 8,
                      borderRadius: 4,
                      width: "80%",
                    }}
                    backgroundColor="transparent"
                    arrowStyle={{ borderTopColor: colors.black }}
                    tooltipStyle={{ alignItems: "center", marginTop: -40 }}
                    arrowSize={{ width: 10, height: 5 }}
                    showChildInTooltip={false}
                  >
                    <TouchableOpacity
                      onPress={() => setMinQtyTooltip(true)}
                      style={styles._info}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Text
                        weight="semiBold"
                        style={{
                          color: colors.white,
                          fontSize: 10,
                          lineHeight: 12,
                        }}
                      >
                        ?
                      </Text>
                    </TouchableOpacity>
                  </Tooltip> */}
                </View>

                <TextField
                  placeholder="Enter amount"
                  value={minQty}
                  onChangeText={setMinQty}
                  placeholderTextColor={colors.primaryLight}
                  keyboardType="numeric"
                  style={styles.input}
                  inputWrapperStyle={{ backgroundColor: colors.white }}
                />

                {/* <Text style={styles.title}>Minimum Amount Per Period (₦):</Text> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <Text style={styles.title}>
                    Minimum Amount Per Period (₦):
                  </Text>
                  {/* <Tooltip
                    isVisible={minAmountTooltip}
                    content={
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: 10,
                          lineHeight: 14,
                          textAlign: "center",
                        }}
                      >
                        This is calculated by minimum quantity per period
                        multiplied by rate per unit
                      </Text>
                    }
                    placement="top"
                    onClose={() => setMinAmountTooltip(false)}
                    contentStyle={{
                      backgroundColor: colors.black,
                      padding: 8,
                      borderRadius: 4,
                      width: "80%",
                    }}
                    backgroundColor="transparent"
                    arrowStyle={{ borderTopColor: colors.black }}
                    tooltipStyle={{ alignItems: "center", marginTop: -40 }}
                    arrowSize={{ width: 10, height: 5 }}
                    showChildInTooltip={false}
                  >
                    <TouchableOpacity
                      onPress={() => setMinAmountTooltip(true)}
                      style={styles._info}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Text
                        weight="semiBold"
                        style={{
                          color: colors.white,
                          fontSize: 10,
                          lineHeight: 12,
                        }}
                      >
                        ?
                      </Text>
                    </TouchableOpacity>
                  </Tooltip> */}
                </View>
                <TextField
                  placeholder=""
                  value={minQty ? `₦${(minQty * 5).toFixed(2)}` : ""}
                  onChangeText={setMinAmount}
                  placeholderTextColor={colors.primaryLight}
                  keyboardType="numeric"
                  style={styles.input}
                  editable={false}
                  inputWrapperStyle={{ backgroundColor: colors.white }}
                />

                {/* <Text style={styles.title}>
                  Maximum Quantity Per Period ({unitSymbol}):
                </Text> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <Text style={styles.title}>
                    Maximum Quantity Per Period ({unitSymbol}):
                  </Text>
                  {/* <Tooltip
                    isVisible={maxQtyTooltip}
                    content={
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: 10,
                          lineHeight: 14,
                          textAlign: "center",
                        }}
                      >
                        Specify the maximum quantity that can be purchased in a
                        single transaction
                      </Text>
                    }
                    placement="top"
                    onClose={() => setMaxQtyTooltip(false)}
                    contentStyle={{
                      backgroundColor: colors.black,
                      padding: 8,
                      borderRadius: 4,
                      width: "80%",
                    }}
                    backgroundColor="transparent"
                    arrowStyle={{ borderTopColor: colors.black }}
                    tooltipStyle={{ alignItems: "center", marginTop: -40 }}
                    arrowSize={{ width: 10, height: 5 }}
                    showChildInTooltip={false}
                  >
                    <TouchableOpacity
                      onPress={() => setMaxQtyTooltip(true)}
                      style={styles._info}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Text
                        weight="semiBold"
                        style={{
                          color: colors.white,
                          fontSize: 10,
                          lineHeight: 12,
                        }}
                      >
                        ?
                      </Text>
                    </TouchableOpacity>
                  </Tooltip> */}
                </View>
                <TextField
                  placeholder="Enter amount"
                  value={maxQty}
                  onChangeText={setMaxQty}
                  placeholderTextColor={colors.primaryLight}
                  keyboardType="numeric"
                  style={styles.input}
                  inputWrapperStyle={{ backgroundColor: colors.white }}
                />

                {/* <Text style={styles.title}></Text> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <Text style={styles.title}>
                    Maximum Amount Per Period (₦):
                  </Text>
                  {/* <Tooltip
                    isVisible={maxAmountTooltip}
                    content={
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: 10,
                          lineHeight: 14,
                          textAlign: "center",
                        }}
                      >
                        This is calculated by maximum quantity per period
                        multiplied by rate per unit
                      </Text>
                    }
                    placement="top"
                    onClose={() => setMaxAmountTooltip(false)}
                    contentStyle={{
                      backgroundColor: colors.black,
                      padding: 8,
                      borderRadius: 4,
                      width: "80%",
                    }}
                    backgroundColor="transparent"
                    arrowStyle={{ borderTopColor: colors.black }}
                    tooltipStyle={{ alignItems: "center", marginTop: -40 }}
                    arrowSize={{ width: 10, height: 5 }}
                    showChildInTooltip={false}
                  >
                    <TouchableOpacity
                      onPress={() => setMaxAmountTooltip(true)}
                      style={styles._info}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Text
                        weight="semiBold"
                        style={{
                          color: colors.white,
                          fontSize: 10,
                          lineHeight: 12,
                        }}
                      >
                        ?
                      </Text>
                    </TouchableOpacity>
                  </Tooltip> */}
                </View>
                <TextField
                  placeholder=""
                  value={maxQty ? `₦${(maxQty * 5).toFixed(2)}` : ""}
                  onChangeText={setMaxAmount}
                  placeholderTextColor={colors.primaryLight}
                  keyboardType="numeric"
                  style={styles.input}
                  inputWrapperStyle={{ backgroundColor: colors.white }}
                />
              </>
            )}

            {/* Emergency Credit */}
            <ToggleRow
              label="Allow Emergency Credit"
              value={allowEmergencyCredit}
              onChange={setAllowEmergencyCredit}
              showInfo={false}
              tooltipContent="Enable to allow emergency credit when user's balance is low"
              tooltipVisible={emergencyCreditTooltip}
              onTooltipToggle={() =>
                setEmergencyCreditTooltip(!emergencyCreditTooltip)
              }
            />
            {allowEmergencyCredit && (
              <>
                <View style={{ marginTop: adjustSize(10) }}>
                  <CounterRow
                    label={`Set Emergency Quantity (${unitSymbol}):`}
                    value={Number(emergencyQty) || 0}
                    setValue={(n: number) => setEmergencyQty(String(n))}
                    min={0}
                  />
                </View>
              </>
            )}

            {/* Low Credit Warning */}
            {/* <ToggleRow
              label="Low Credit Warning"
              value={lowCreditWarning}
              onChange={setLowCreditWarning}
              showInfo={false}
              tooltipContent="Enable to receive notifications when credit balance is low"
              tooltipVisible={lowCreditTooltip}
              onTooltipToggle={() => setLowCreditTooltip(!lowCreditTooltip)}
            />
            {lowCreditWarning && (
              <>
                <View style={{ marginTop: adjustSize(10) }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.title}>Low Credit Warning 1 (₦):</Text>
                  </View>
                  <TextField
                    placeholder="Enter amount"
                    value={lowCredit1}
                    onChangeText={setLowCredit1}
                    placeholderTextColor={colors.primaryLight}
                    keyboardType="numeric"
                    style={styles.input}
                  />
                </View>

                <View style={{ marginTop: adjustSize(10) }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.title}>Low Credit Warning 2 (₦) :</Text>
                  </View>
                  <TextField
                    placeholder="Enter amount"
                    value={lowCredit2}
                    onChangeText={setLowCredit2}
                    placeholderTextColor={colors.primaryLight}
                    keyboardType="numeric"
                    style={styles.input}
                  />
                </View>
              </>
              )} */}
          </>
        )}
      </ScrollView>
      <Button
        text="Save"
        preset="reversed"
        onPress={() => {
          navigation.goBack();
        }}
        style={{ width: "95%", alignSelf: "center", marginBottom: 30 }}
      />
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
    backgroundColor: colors.white,
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
    // marginTop: adjustSize(20),
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
    backgroundColor: colors.white,
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
    marginVertical: adjustSize(5),
  },
  toggleLabel: {
    color: colors.primary,
    fontSize: adjustSize(12),
    flexShrink: 1,
    fontFamily: typography.fonts.poppins.normal,
  },
  _info: {
    backgroundColor: colors.primary,
    borderRadius: 9,
    height: 18,
    width: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
    zIndex: 1,
  },
});
