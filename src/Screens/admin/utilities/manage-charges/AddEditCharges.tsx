import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
  Modal,
  Platform,
} from "react-native";
import { colors, spacing, typography, adjustSize } from "../../../../theme";
import { Header, Screen, Text, TextField } from "../../../../Components";
import DropdownComponent from "../../../../Components/DropDown";
import DateTimePicker from "@react-native-community/datetimepicker";

type Mode = "add" | "edit";

type ChargePayload = {
  title?: string;
  amount?: number;
  status?: string;
  createdDate?: string;
  dueDate?: string;
  comment?: string;
};

type Props = {
  navigation: any;
  route: { params?: { mode?: Mode; charge?: ChargePayload } };
};

const chargeTypeOptions = [
  { label: "Electricity", value: "electricity" },
  { label: "Water", value: "water" },
  { label: "Gas", value: "gas" },
  { label: "Maintenance Fee", value: "maintenance" },
];

const AdminAddEditCharges: React.FC<Props> = ({ navigation, route }) => {
  const mode: Mode = (route.params?.mode as Mode) || "add";
  const isEditMode = mode === "edit";
  const initial = route.params?.charge || {};

  const todayStart = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const parseDate = (input: string): Date | null => {
    if (!input) return null;
    const mmddyyyy = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const m = input.match(mmddyyyy);
    if (!m) return null;
    const month = Number(m[1]) - 1;
    const day = Number(m[2]);
    const year = Number(m[3]);
    const date = new Date(year, month, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month ||
      date.getDate() !== day
    )
      return null;
    return date;
  };

  const formatDate = (d: Date) => {
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  const [duePickerVisible, setDuePickerVisible] = useState(false);
  const [tempDueDate, setTempDueDate] = useState<Date>(new Date());

  const openDuePicker = () => {
    const current = parseDate(form.dueDate);
    setTempDueDate(current ?? todayStart);
    setDuePickerVisible(true);
  };

  const closeDuePicker = () => setDuePickerVisible(false);

  const confirmDuePicker = () => {
    onChange("dueDate", formatDate(tempDueDate));
    setDuePickerVisible(false);
  };

  const [allowPartial, setAllowPartial] = useState(false);
  const [form, setForm] = useState({
    recipients: "",
    amount: initial.amount ? String(initial.amount) : "",
    chargeType: initial.title || "",
    comment: initial.comment || "",
    createdDate: initial.createdDate || "",
    dueDate: initial.dueDate || "",
    status: initial.status || (isEditMode ? "Partially paid" : ""),
  });

  const onChange = (k: keyof typeof form, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const onSubmit = () => {
    if (isEditMode) {
      // minimal validation for edit
      if (!form.amount || !form.chargeType)
        return Alert.alert("Error", "Amount and Charge type are required");
      Alert.alert("Success", "Charge updated", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } else {
      if (!form.recipients || !form.amount || !form.chargeType || !form.dueDate)
        return Alert.alert("Error", "Please fill all required fields");
      Alert.alert("Success", "Charge added", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    }
  };

  const onDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete this charge?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header title={isEditMode ? "Update Charge" : "Add New Charge"} />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {isEditMode ? (
          <>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Amount</Text>
              <TextField
                placeholder="N150000"
                value={form.amount}
                onChangeText={(t) => onChange("amount", t)}
                inputWrapperStyle={styles.textInput}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Charge type</Text>
              <TextField
                placeholder="Utility overuse"
                value={form.chargeType}
                onChangeText={(t) => onChange("chargeType", t)}
                inputWrapperStyle={styles.textInput}
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Date Created</Text>
              <TextField
                placeholder="01/05/2025"
                value={form.createdDate}
                onChangeText={(t) => onChange("createdDate", t)}
                inputWrapperStyle={styles.textInput}
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Due Date</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={openDuePicker}>
                <View pointerEvents="none">
                  <TextField
                    placeholder="mm/dd/yyyy"
                    value={form.dueDate}
                    editable={false}
                    inputWrapperStyle={styles.textInput}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Status</Text>
              <TextField
                placeholder="Partially paid"
                value={form.status}
                onChangeText={(t) => onChange("status", t)}
                inputWrapperStyle={styles.textInput}
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Comment</Text>
              {/* <TextField
                placeholder="Add Comment"
                value={form.comment}
                onChangeText={(t) => onChange("comment", t)}
                inputWrapperStyle={[styles.textInput, { height: adjustSize(110), alignItems: "flex-start" }]}
                style={{ textAlignVertical: "top" }}
                multiline
              /> */}
              <TextField
                placeholder="Write a detailed description"
                value={form.comment}
                onChangeText={(t) => onChange("comment", t)}
                placeholderTextColor={"#737373"}
                inputWrapperStyle={[
                  styles.textInput,
                  { height: adjustSize(120), alignItems: "flex-start" },
                ]}
                style={{ textAlignVertical: "top", height: adjustSize(110) }}
                multiline
              />
            </View>

            <View style={styles.rowButtons}>
              <TouchableOpacity
                style={styles.deleteBtn}
                activeOpacity={0.8}
                onPress={onDelete}
              >
                <Text style={styles.deleteBtnTxt}>Delete Charge</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.primaryBtn}
                activeOpacity={0.8}
                onPress={onSubmit}
              >
                <Text style={styles.primaryBtnTxt}>Update Charge</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Charge to</Text>
              <TextField
                placeholder="Select charge recipients"
                value={form.recipients}
                onChangeText={(t) => onChange("recipients", t)}
                inputWrapperStyle={styles.textInput}
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Amount</Text>
              <TextField
                placeholder="Enter amount"
                value={form.amount}
                onChangeText={(t) => onChange("amount", t)}
                inputWrapperStyle={styles.textInput}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Charge type</Text>
              <DropdownComponent
                data={chargeTypeOptions}
                value={form.chargeType}
                onChangeValue={(v) => onChange("chargeType", String(v))}
                placeholder="Electricity"
                dropdownStyle={styles.dropdown}
                placeholderStyle={styles.dropdownPlaceholder}
                selectedTextStyle={styles.dropdownSelected}
                rightIconColor={colors.primary}
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Comment</Text>
              <TextField
                placeholder="Add comment"
                value={form.comment}
                onChangeText={(t) => onChange("comment", t)}
                inputWrapperStyle={[
                  styles.textInput,
                  { height: adjustSize(110), alignItems: "flex-start" },
                ]}
                style={{ textAlignVertical: "top",height: adjustSize(100)}}
                multiline
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Due Date</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={openDuePicker}>
                <View pointerEvents="none">
                  <TextField
                    placeholder="mm/dd/yyyy"
                    value={form.dueDate}
                    editable={false}
                    inputWrapperStyle={styles.textInput}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.switchRow}>
              <Text style={styles.label}>Allow Partial Payment</Text>
              <Switch
                trackColor={{ false: "#767577", true: colors.primary }}
                thumbColor={colors.white}
                onValueChange={setAllowPartial}
                value={allowPartial}
              />
            </View>
            <TouchableOpacity
              style={[styles.primaryBtn, { marginTop: adjustSize(20) }]}
              activeOpacity={0.8}
              onPress={onSubmit}
            >
              <Text style={styles.primaryBtnTxt}>Add Charge</Text>
            </TouchableOpacity>
          </>
        )}

        {Platform.OS === "ios" ? (
          <Modal visible={duePickerVisible} transparent animationType="fade">
            <View style={styles.pickerBackdrop}>
              <View style={styles.pickerCard}>
                <Text weight="semiBold" style={styles.pickerTitle}>
                  Select Date
                </Text>
                <View style={styles.pickerWrap}>
                  <DateTimePicker
                    value={tempDueDate}
                    mode="date"
                    display="spinner"
                    minimumDate={todayStart}
                    onChange={(_, d) => d && setTempDueDate(d)}
                  />
                </View>
                <View style={styles.pickerActions}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.pickerBtn}
                    onPress={closeDuePicker}
                  >
                    <Text style={styles.pickerBtnText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.pickerBtn, styles.pickerBtnPrimary]}
                    onPress={confirmDuePicker}
                  >
                    <Text
                      style={[styles.pickerBtnText, { color: colors.white }]}
                    >
                      Done
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        ) : (
          duePickerVisible && (
            <DateTimePicker
              value={tempDueDate}
              mode="date"
              display="default"
              minimumDate={todayStart}
              onChange={(event, d) => {
                if (event?.type === "dismissed") {
                  closeDuePicker();
                  return;
                }
                if (d) {
                  onChange("dueDate", formatDate(d));
                }
                closeDuePicker();
              }}
            />
          )
        )}
      </ScrollView>
    </Screen>
  );
};

export default AdminAddEditCharges;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: adjustSize(10),
    paddingTop: adjustSize(30),
  },
  scrollContent: { paddingBottom: spacing.xl },
  fieldContainer: { marginBottom: spacing.lg },
  label: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
    marginBottom: spacing.xs,
  },
  textInput: {
    borderRadius: adjustSize(12),
    borderWidth: 1,
    borderColor: colors.border,
    height: adjustSize(50),
    backgroundColor: colors.white,
  },
  dropdown: {
    backgroundColor: colors.white,
    borderRadius: adjustSize(12),
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: adjustSize(50),
  },
  dropdownPlaceholder: {
    fontSize: adjustSize(14),
    color: colors.textDim,
    fontFamily: typography.fonts.poppins.normal,
  },
  dropdownSelected: {
    fontSize: adjustSize(14),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
  },
  pickerBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  pickerCard: {
    width: "100%",
    backgroundColor: colors.white,
    borderTopLeftRadius: adjustSize(16),
    borderTopRightRadius: adjustSize(16),
    padding: adjustSize(16),
  },
  pickerTitle: {
    fontSize: adjustSize(16),
    color: colors.primary,
    marginBottom: adjustSize(12),
  },
  pickerWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: adjustSize(12),
  },
  pickerActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: adjustSize(10),
  },
  pickerBtn: {
    minWidth: adjustSize(110),
    height: adjustSize(42),
    borderRadius: adjustSize(10),
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  pickerBtnPrimary: {
    backgroundColor: colors.primary,
  },
  pickerBtnText: {
    color: colors.primary,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.medium,
  },
  rowButtons: {
    flexDirection: "row",
    gap: adjustSize(10),
    marginTop: adjustSize(10),
  },
  deleteBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D62828",
    backgroundColor: colors.white,
    borderRadius: adjustSize(12),
    height: adjustSize(50),
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBtnTxt: {
    color: "#D62828",
    fontFamily: typography.fonts.poppins.medium,
    fontSize: adjustSize(13),
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: adjustSize(12),
    height: adjustSize(50),
    justifyContent: "center",
    alignItems: "center",
  },
  primaryBtnTxt: {
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
    fontSize: adjustSize(13),
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: adjustSize(10),
  },
});
