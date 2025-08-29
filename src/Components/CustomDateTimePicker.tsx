import React, { useState } from "react";
import { View, Modal, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Text, Button } from "../Components"; // adjust path
import { colors, spacing, adjustSize, typography } from "../theme";

type PickerMode = "date" | "time";

interface CustomDateTimePickerProps {
  mode: PickerMode;
  value: Date | null;
  visible: boolean; // externally control visibility
  onChange: (date: Date) => void;
  onCancel: () => void; // called when user cancels
  onConfirm: () => void; // called when user confirms
}

export const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({
  mode,
  value,
  visible,
  onChange,
  onCancel,
  onConfirm,
}) => {
  const [tempDate, setTempDate] = useState<Date>(value ?? new Date());

  // keep tempDate synced with value when opened
  React.useEffect(() => {
    if (visible) setTempDate(value ?? new Date());
  }, [visible, value]);

  const handleAndroidChange = (event: any, selectedDate?: Date) => {
    if (event.type === "dismissed") {
      onCancel();
      return;
    }
    if (selectedDate) {
      onChange(selectedDate);
      onCancel();
    }
  };

  return Platform.OS === "ios" ? (
    <Modal visible={visible} transparent animationType="fade">
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
              onPress={onCancel}
            />
            <Button
              text="Done"
              preset="reversed"
              style={styles.modalBtn}
              onPress={() => {
                onChange(tempDate);
                onConfirm();
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  ) : (
    visible && (
      <DateTimePicker
        value={tempDate}
        mode={mode}
        display="default"
        onChange={handleAndroidChange}
      />
    )
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
