// CustomDateTimePicker.tsx
import React, { useState } from "react";
import { View, Pressable, Modal, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { Text, Button } from "../../../../Components"; // adjust path
import { colors, spacing, adjustSize, typography } from "../../../../theme";

type PickerMode = "date" | "time";

interface CustomDateTimePickerProps {
  mode: PickerMode;
  value: Date | null;
  onChange: (date: Date) => void;
  label: string;
  required?: boolean;
}

export const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({
  mode,
  value,
  onChange,
  label,
  required = false,
}) => {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(value ?? new Date());

  const fmt = (d: Date | null) =>
    d ? moment(d).format("DD/MM/YYYY") : "Select Date";
  const fmtTime = (d: Date | null) =>
    d ? moment(d).format("hh:mm A") : "Select Time";

  const openPicker = () => {
    setTempDate(value ?? new Date());
    setPickerVisible(true);
  };

  const cancelPicker = () => setPickerVisible(false);
  const confirmPicker = () => {
    onChange(tempDate);
    setPickerVisible(false);
  };

  const handleAndroidChange = (event: any, selectedDate?: Date) => {
    if (event.type === "dismissed") {
      cancelPicker();
      return;
    }
    if (selectedDate) {
      onChange(selectedDate);
      setPickerVisible(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text weight="semiBold" style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <Pressable onPress={openPicker} style={styles.dtButton}>
        <Text
          style={[
            styles.dtText,
            { color: value ? colors.primary : colors.primaryLight },
          ]}
        >
          {mode === "date" ? fmt(value) : fmtTime(value)}
        </Text>
      </Pressable>

      {Platform.OS === "ios" ? (
        <Modal visible={pickerVisible} transparent animationType="fade">
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <Text weight="semiBold" style={styles.modalTitle}>
                {mode === "date" ? "Select Date" : "Select Time"}
              </Text>
              <View style={styles.modalPickerWrap}>
                <DateTimePicker
                  value={tempDate}
                  mode={mode}
                  display="spinner"
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
                  onPress={confirmPicker}
                />
              </View>
            </View>
          </View>
        </Modal>
      ) : (
        pickerVisible && (
          <DateTimePicker
            value={tempDate}
            mode={mode}
            display="default"
            onChange={handleAndroidChange}
          />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  required: { color: colors.primary },
  dtButton: {
    height: adjustSize(48),
    borderRadius: adjustSize(10),
    backgroundColor: colors.fill,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    justifyContent: "center",
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
  modalBtn: { minWidth: 110 },
});
