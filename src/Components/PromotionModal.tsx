import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Modal,
  Platform,
} from "react-native";
import { Text, TextField, Button, CustomModal } from ".";
import { adjustSize, colors, typography } from "../theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker";

export type Promotion = {
  percent: string; // e.g. "10"
  startDate: string; // e.g. "2025-04-23"
  endDate: string; // e.g. "2025-04-29"
};

type PromotionModalProps = {
  visible: boolean;
  title?: string;
  onClose: () => void;
  initialPromotions?: Promotion[];
  onSubmit: (promotions: Promotion[]) => void;
};

const EmptyPromotion: Promotion = { percent: "", startDate: "", endDate: "" };

const PromotionModal: React.FC<PromotionModalProps> = ({
  visible,
  title = "Add new Promotion",
  onClose,
  onSubmit,
  initialPromotions = [],
}) => {
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);
  const [form, setForm] = useState<Promotion>(EmptyPromotion);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<{
    percent?: string;
    startDate?: string;
    endDate?: string;
  }>({});
  const [formVisible, setFormVisible] = useState<boolean>(false);

  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerField, setPickerField] = useState<
    "startDate" | "endDate" | null
  >(null);
  const [tempDate, setTempDate] = useState<Date>(new Date());

  const todayStart = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const formatDate = (d: Date) => {
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  const openPicker = (field: "startDate" | "endDate") => {
    const current = parseDate(form[field]);
    setPickerField(field);
    setTempDate(current ?? new Date());
    setPickerVisible(true);
  };

  const cancelPicker = () => {
    setPickerVisible(false);
    setPickerField(null);
  };

  const confirmPicker = () => {
    if (!pickerField) return;
    setForm((f) => ({ ...f, [pickerField]: formatDate(tempDate) }));
    setPickerVisible(false);
    setPickerField(null);
  };

  const handleAndroidPickerChange = (event: any, d?: Date) => {
    if (event?.type === "dismissed") {
      cancelPicker();
      return;
    }

    if (!pickerField || !d) return;

    setTempDate(d);
    const nextForm = { ...form, [pickerField]: formatDate(d) } as Promotion;
    setForm(nextForm);
    setPickerVisible(false);
    setPickerField(null);
    validateForm(nextForm);
  };

  useEffect(() => {
    if (!visible) return;
    setPromotions(initialPromotions);
    setForm(EmptyPromotion);
    setEditIndex(null);
    setErrors({});
    setFormVisible(false);
  }, [visible, initialPromotions]);

  const parseDate = (input: string): Date | null => {
    if (!input) return null;
    // Accept mm/dd/yy, mm/dd/yyyy or yyyy-mm-dd
    const mmddyyyy = /^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/;
    const yyyymmdd = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
    let y = 0,
      m = 0,
      d = 0;
    if (mmddyyyy.test(input)) {
      const [, mm, dd, yy] = input.match(mmddyyyy)!;
      m = Number(mm) - 1;
      d = Number(dd);
      const yearNum = Number(yy);
      y = yearNum < 100 ? 2000 + yearNum : yearNum;
    } else if (yyyymmdd.test(input)) {
      const [, yyyy, mm, dd] = input.match(yyyymmdd)!;
      y = Number(yyyy);
      m = Number(mm) - 1;
      d = Number(dd);
    } else {
      return null;
    }
    const date = new Date(y, m, d);
    // Validate that date components didn't overflow (e.g., 02/30)
    if (
      date.getFullYear() !== y ||
      date.getMonth() !== m ||
      date.getDate() !== d
    )
      return null;
    return date;
  };

  const getErrors = (f: Promotion) => {
    const nextErrors: {
      percent?: string;
      startDate?: string;
      endDate?: string;
    } = {};
    const pct = Number(f.percent);
    if (!f.percent) nextErrors.percent = "Required";
    else if (Number.isNaN(pct)) nextErrors.percent = "Enter a number";
    else if (pct <= 0 || pct > 100) nextErrors.percent = "Enter 1-100";

    const sd = parseDate(f.startDate);
    if (!f.startDate) nextErrors.startDate = "Required";
    else if (!sd) nextErrors.startDate = "Invalid date";

    const ed = parseDate(f.endDate);
    if (!f.endDate) nextErrors.endDate = "Required";
    else if (!ed) nextErrors.endDate = "Invalid date";

    if (sd && ed && sd > ed) {
      nextErrors.endDate = "End must be after start";
    }
    return nextErrors;
  };

  const validateForm = (f: Promotion) => {
    const nextErrors = getErrors(f);
    setErrors(nextErrors);
    return nextErrors;
  };

  const canSave = useMemo(() => {
    const e = getErrors(form);
    return !e.percent && !e.startDate && !e.endDate;
  }, [form]);

  const resetForm = () => {
    setForm(EmptyPromotion);
    setEditIndex(null);
  };

  const saveFormIntoList = () => {
    const e = validateForm(form);
    if (e.percent || e.startDate || e.endDate) return;
    setPromotions((prev) => {
      const next = [...prev];
      if (editIndex !== null) next[editIndex] = form;
      else next.push(form);
      onSubmit(next);
      return next;
    });
    resetForm();
    setFormVisible(false); // hide form after add/save
  };

  const removeAt = (idx: number) => {
    setPromotions((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      onSubmit(next);
      return next;
    });
    if (editIndex === idx) resetForm();
  };

  const startEdit = (idx: number) => {
    const p = promotions[idx];
    setForm(p);
    setEditIndex(idx);
    setFormVisible(true);
  };

  return (
    <CustomModal visible={visible} onClose={onClose} title={title}>
      {/* Form (only when no items yet or explicitly visible) */}
      {(formVisible || promotions.length === 0) && (
        <View style={{ marginTop: adjustSize(12) }}>
          <Text style={styles.fieldLabel}>Discount %</Text>
          <TextField
            placeholder="Discount %"
            keyboardType="numeric"
            value={form.percent}
            onChangeText={(t) => {
              setForm((f) => ({ ...f, percent: t }));
            }}
            onBlur={() => validateForm(form)}
            status={errors.percent ? "error" : undefined}
            helper={errors.percent}
            inputWrapperStyle={{ backgroundColor: "white" }}
          />

          <Text style={styles.fieldLabel}>Start date</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => openPicker("startDate")}
          >
            <View pointerEvents="none">
              <TextField
                placeholder="mm/dd/yyyy"
                value={form.startDate}
                editable={false}
                status={errors.startDate ? "error" : undefined}
                helper={errors.startDate}
                inputWrapperStyle={{ backgroundColor: "white" }}
              />
            </View>
          </TouchableOpacity>

          <Text style={styles.fieldLabel}>End date</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => openPicker("endDate")}
          >
            <View pointerEvents="none">
              <TextField
                placeholder="mm/dd/yyyy"
                value={form.endDate}
                editable={false}
                status={errors.endDate ? "error" : undefined}
                helper={errors.endDate}
                inputWrapperStyle={{ backgroundColor: "white" }}
              />
            </View>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: adjustSize(10),
              marginTop: adjustSize(14),
            }}
          >
            <View style={{ flex: 1 }}>
              <Button
                text="Cancel"
                onPress={() => {
                  resetForm();
                  setFormVisible(false);
                }}
                textStyle={{ color: colors.error }}
                style={{
                  borderColor: colors.error,
                  borderWidth: 1,
                  backgroundColor: colors.fill,
                  minHeight: adjustSize(41),
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                text={"Save"}
                preset="reversed"
                onPress={saveFormIntoList}
                disabled={!canSave}
                style={{
                  minHeight: adjustSize(41),
                }}
              />
            </View>
          </View>
        </View>
      )}

      {/* List of saved promotions at bottom */}
      {promotions.length > 0 && (
        <>
          {(formVisible || editIndex !== null) && (
            <View style={styles.divider} />
          )}
          <View style={{ gap: adjustSize(10), marginTop: adjustSize(16) }}>
            {promotions.map((p, idx) => (
              <View
                key={`${p.startDate}-${p.endDate}-${idx}`}
                style={styles.promoCard}
              >
                <View style={styles.cardHeader}>
                  <Text weight="semiBold" style={{ color: colors.primary }}>
                    Discount: {p.percent}%
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: adjustSize(10),
                    }}
                  >
                    <TouchableOpacity onPress={() => startEdit(idx)}>
                      <AntDesign name="edit" size={16} color={colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeAt(idx)}>
                      <AntDesign name="delete" size={16} color={colors.error} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.dateRow}>
                  <View style={{ flex: 1 }}>
                    <Button
                      text={p.startDate || "Start date"}
                      disabled
                      textStyle={{
                        color: colors.white,
                        fontFamily: typography.fonts.poppins.medium,
                      }}
                      style={{
                        backgroundColor: colors.primary,
                        minHeight: adjustSize(36),
                      }}
                    />
                  </View>
                  <View style={{ width: adjustSize(10) }} />
                  <View style={{ flex: 1 }}>
                    <Button
                      text={p.endDate || "End date"}
                      disabled
                      textStyle={{
                        color: colors.white,
                        fontFamily: typography.fonts.poppins.medium,
                      }}
                      style={{
                        backgroundColor: colors.primary,
                        minHeight: adjustSize(36),
                      }}
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </>
      )}

      {/* Add button at the very bottom when form is hidden and there are items */}
      {!formVisible && promotions.length > 0 && (
        <View style={{ marginTop: adjustSize(16) }}>
          <Button
            text="+Add Promotion"
            preset="reversed"
            onPress={() => {
              resetForm();
              setFormVisible(true);
            }}
          />
        </View>
      )}

      {Platform.OS === "ios" ? (
        <Modal visible={pickerVisible} transparent animationType="fade">
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <Text weight="semiBold" style={styles.modalTitle}>
                Select Date
              </Text>
              <View style={styles.modalPickerWrap}>
                <DateTimePicker
                  value={tempDate}
                  mode="date"
                  display="spinner"
                  minimumDate={(() => {
                    if (pickerField === "endDate") {
                      const sd = parseDate(form.startDate);
                      return sd ?? todayStart;
                    }
                    return todayStart;
                  })()}
                  onChange={(_, d) => d && setTempDate(d)}
                />
              </View>
              <View style={styles.modalActions}>
                <Button
                  text="Cancel"
                  preset="default"
                  style={styles.modalBtn}
                  onPress={cancelPicker}
                />
                <Button
                  text="Done"
                  preset="reversed"
                  style={styles.modalBtn}
                  onPress={() => {
                    confirmPicker();
                    validateForm({
                      ...form,
                      ...(pickerField
                        ? { [pickerField]: formatDate(tempDate) }
                        : {}),
                    });
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      ) : (
        pickerVisible && (
          <DateTimePicker
            value={tempDate}
            mode="date"
            display="default"
            minimumDate={(() => {
              if (pickerField === "endDate") {
                const sd = parseDate(form.startDate);
                return sd ?? todayStart;
              }
              return todayStart;
            })()}
            onChange={handleAndroidPickerChange}
          />
        )
      )}
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  promoCard: {
    backgroundColor: colors.fill,
    borderRadius: adjustSize(10),
    padding: adjustSize(10),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.greylight,
    marginTop: adjustSize(20),
  } as ViewStyle,
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  } as ViewStyle,
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: adjustSize(10),
  },
  fieldLabel: {
    marginTop: adjustSize(10),
    marginBottom: adjustSize(6),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
    fontSize: adjustSize(14),
  } as TextStyle,
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.greylight,
    marginTop: adjustSize(12),
  } as ViewStyle,
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
    padding: adjustSize(16),
  },
  modalTitle: {
    fontSize: adjustSize(16),
    color: colors.primary,
    marginBottom: adjustSize(12),
  },
  modalPickerWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: adjustSize(12),
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: adjustSize(10),
  },
  modalBtn: { minWidth: 110 },
});

export default PromotionModal;
