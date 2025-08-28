import React, { useState } from "react";
import { Modal, Platform, View, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Text, Button } from "../../../Components";
import { colors, spacing, adjustSize, typography } from "../../../theme";

interface Props {
  visible: boolean;
  mode: "date" | "time"; // pass mode from screen
  tempDate: Date;
  onCancel: () => void;
  onConfirm: (date: Date) => void;
}

export function CustomDateTimePicker({
  visible,
  mode,
  tempDate,
  onCancel,
  onConfirm,
}: Props) {
  const [currentDate, setCurrentDate] = useState(tempDate);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <Text weight="semiBold" style={styles.modalTitle}>
            {mode === "date" ? "Select Date" : "Select Time"}
          </Text>

          <View style={styles.modalPickerWrap}>
            <DateTimePicker
              value={currentDate}
              mode={mode} // use mode prop
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(_, d) => {
                if (d) setCurrentDate(d);
              }}
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
              onPress={() => onConfirm(currentDate)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    fontFamily: typography.fonts.poppins.semiBold,
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
