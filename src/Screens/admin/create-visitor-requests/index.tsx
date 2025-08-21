import React, { useMemo, useState } from "react";
import { StyleSheet, View, Pressable, Modal, Platform } from "react-native";
import { Screen, Text, Button, TextField } from "../../../Components";
import { Header } from "../../../Components/Header";
import { adjustSize, colors, spacing, typography } from "../../../theme";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Images } from "../../../assets/Images";
import { WithLocalSvg } from "react-native-svg/css";
import DropdownComponent from "../../../Components/DropDown";
import { AppStackScreenProps } from "../../../utils/interfaces";
import { rentalProperties } from "../../../utils/data";

type Props = AppStackScreenProps<"AdminCreateVisitorRequests">;

export function AdminCreateVisitorRequests({ route ,navigation}: Props) {
  const preselectId = route?.params?.propertyId;
  const [name, setName] = useState("");
  const [type, setType] = useState<string | null>(null);
  const [accessCode, setAccessCode] = useState("");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  // unified modal picker state
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerStep, setPickerStep] = useState<"date" | "time">("date");
  const [activeTarget, setActiveTarget] = useState<"from" | "to">("from");
  const [tempDate, setTempDate] = useState<Date>(new Date());
  const [propertyId, setPropertyId] = useState<string | null>(
    preselectId ?? null
  );
  const [group, setGroup] = useState<string | null>(null);

  const propertyOptions = useMemo(
    () => rentalProperties.map((p) => ({ label: p.name, value: p.propertyId })),
    []
  );
  const groupOptions = useMemo(
    () =>
      Array.from(new Set(rentalProperties.map((p) => p.group))).map((g) => ({
        label: g,
        value: g,
      })),
    []
  );
  const typeOptions = useMemo(
    () => [
      { label: "Guest", value: "guest" },
      { label: "Contractor", value: "contractor" },
      { label: "Delivery", value: "delivery" },
      { label: "Other", value: "other" },
    ],
    []
  );

  const fmt = (d: Date | null) => (d ? d.toLocaleDateString() : "Select Date");

  const canSubmit =
    name.trim().length > 0 &&
    !!type &&
    accessCode.trim().length > 0 &&
    !!fromDate &&
    !!toDate &&
    !!propertyId &&
    !!group;

  const onGenerate = () => {
    // TODO: Wire API call here
    // For now just log values
    console.log({
      name,
      type,
      accessCode,
      fromDate,
      toDate,
      propertyId,
      group,
    });
    navigation.goBack();
  };

  const openPicker = (target: "from" | "to") => {
    setActiveTarget(target);
    setPickerStep("date");
    const base =
      target === "from" ? fromDate ?? new Date() : toDate ?? new Date();
    setTempDate(base);
    setPickerVisible(true);
  };

  const cancelPicker = () => {
    setPickerVisible(false);
  };

  const confirmPicker = () => {
    if (activeTarget === "from") setFromDate(tempDate);
    else setToDate(tempDate);
    setPickerVisible(false);
  };

  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header title="Generate Visitor Request" />
      <View style={styles.container}>
        {/* Name */}
        <Text weight="semiBold" style={styles.label}>
          Name<Text style={styles.required}>*</Text>
        </Text>
        <TextField
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
          inputWrapperStyle={styles.inputWrapper}
          style={styles.input}
          placeholderTextColor={colors.primaryLight}
        />

        {/* Type */}
        <Text weight="semiBold" style={styles.label}>
          Type<Text style={styles.required}>*</Text>
        </Text>
        <DropdownComponent
          data={typeOptions}
          label="Choose type"
          placeholder="Choose type"
          value={type ?? undefined}
          onChangeValue={(v: string) => setType(v)}
          dropdownStyle={styles.dropdown}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelected}
          rightIconColor={colors.primary}
        />

        {/* Access Code */}
        <Text weight="semiBold" style={styles.label}>
          Access Code<Text style={styles.required}>*</Text>
        </Text>
        <TextField
          placeholder="Enter access code"
          value={accessCode}
          onChangeText={setAccessCode}
          inputWrapperStyle={styles.inputWrapper}
          style={styles.input}
          placeholderTextColor={colors.primaryLight}
        />

        {/* From/To */}
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text weight="semiBold" style={styles.label}>
              From<Text style={styles.required}>*</Text>
            </Text>
            <Pressable
              onPress={() => openPicker("from")}
              style={styles.dtButton}
            >
              <Text
                style={[
                  styles.dtText,
                  { color: fromDate ? colors.primary : colors.primaryLight },
                ]}
              >
                {fmt(fromDate)}
              </Text>
              <WithLocalSvg asset={Images.calendar} />
            </Pressable>
          </View>
          <View style={{ width: spacing.md }} />
          <View style={{ flex: 1 }}>
            <Text weight="semiBold" style={styles.label}>
              To<Text style={styles.required}>*</Text>
            </Text>
            <Pressable onPress={() => openPicker("to")} style={styles.dtButton}>
              <Text
                style={[
                  styles.dtText,
                  { color: toDate ? colors.primary : colors.primaryLight },
                ]}
              >
                {fmt(toDate)}
              </Text>
              <WithLocalSvg asset={Images.calendar} />
            </Pressable>
          </View>
        </View>

        {/* Property */}
        <Text weight="semiBold" style={styles.label}>
          Property<Text style={styles.required}>*</Text>
        </Text>
        <DropdownComponent
          data={propertyOptions}
          label="Select property"
          placeholder="Select property"
          value={propertyId ?? undefined}
          onChangeValue={(v: string) => setPropertyId(v)}
          dropdownStyle={styles.dropdown}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelected}
          rightIconColor={colors.primary}
        />

        {/* Property Group */}
        <Text weight="semiBold" style={styles.label}>
          Property Group<Text style={styles.required}>*</Text>
        </Text>
        <DropdownComponent
          data={groupOptions}
          label="Select property"
          placeholder="Select property"
          value={group ?? undefined}
          onChangeValue={(v: string) => setGroup(v)}
          dropdownStyle={styles.dropdown}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelected}
          rightIconColor={colors.primary}
        />

        <View style={{ height: spacing.xl }} />
        <Button
          text="Generate"
          preset="reversed"
          style={styles.generateBtn}
          textStyle={styles.generateText}
          onPress={onGenerate}
          disabled={!canSubmit}
        />
      </View>

      {/* Modal Date & Time Picker */}
      <Modal
        visible={pickerVisible}
        transparent
        animationType="slide"
        onRequestClose={cancelPicker}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text weight="semiBold" style={styles.modalTitle}>
              {pickerStep === "date" ? "Select Date" : "Select Time"}
            </Text>

            <View style={styles.modalPickerWrap}>
              <DateTimePicker
                value={tempDate}
                mode={pickerStep}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(_, d) => {
                  if (!d) return;
                  setTempDate(d);
                }}
              />
            </View>

            <View style={styles.modalActions}>
              <Button
                text="Cancel"
                preset="default"
                style={styles.modalBtn}
                onPress={cancelPicker}
              />
              {pickerStep === "date" ? (
                <Button
                  text={Platform.OS === "ios" ? "Next" : "Next"}
                  preset="reversed"
                  style={styles.modalBtn}
                  onPress={() => setPickerStep("time")}
                />
              ) : (
                <Button
                  text="Done"
                  preset="reversed"
                  style={styles.modalBtn}
                  onPress={confirmPicker}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
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
  label: {
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  required: {
    color: colors.primary,
  },
  inputWrapper: {
    // backgroundColor: colors.white,
    borderRadius: adjustSize(10),
  },
  input: {
    fontFamily: typography.fonts.poppins.medium,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: spacing.md,
  },
  dtButton: {
    height: adjustSize(48),
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
  },
  dtText: {
    color: colors.primaryLight,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.medium,
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
  },
  dropdownPlaceholder: {
    fontSize: adjustSize(12),
    color: colors.primaryLight,
    fontFamily: typography.fonts.poppins.medium,
  },
  dropdownSelected: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
  },
  generateBtn: {
    height: adjustSize(48),
    borderRadius: adjustSize(12),
    backgroundColor: colors.primary,
  },
  generateText: {
    fontFamily: typography.fonts.poppins.semiBold,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  modalCard: {
    width: "100%",
    backgroundColor: colors.white,
    borderTopLeftRadius: adjustSize(16),
    borderTopRightRadius: adjustSize(16),
    padding: spacing.lg,
  },
  modalTitle: {
    fontSize: adjustSize(16),
    color: colors.primary,
    marginBottom: spacing.md,
  },
  modalPickerWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.sm,
  },
  modalBtn: {
    minWidth: 110,
  },
});
