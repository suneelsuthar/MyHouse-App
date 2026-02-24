import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, ViewStyle, TextStyle } from "react-native";
import CustomModal from "./CustomModal";
import { Text, Button } from "./index";
import { adjustSize, colors, typography } from "../theme";

interface Props {
  visible: boolean;
  title?: string;
  initialDate?: Date; // date part preserved, only time edited
  onClose: () => void;
  onConfirm: (date: Date) => void;
}

const twoDigit = (n: number) => n.toString().padStart(2, "0");

const TimeInputModal: React.FC<Props> = ({ visible, title = "Select time", initialDate, onClose, onConfirm }) => {
  const init = useMemo(() => {
    const d = initialDate ?? new Date();
    let hours = d.getHours();
    const minutes = d.getMinutes();
    const isPM = hours >= 12;
    hours = hours % 12;
    if (hours === 0) hours = 12;
    return { hours, minutes, period: isPM ? "PM" : "AM" as "AM" | "PM" };
  }, [initialDate]);

  const [hour, setHour] = useState<string>(twoDigit(init.hours));
  const [minute, setMinute] = useState<string>(twoDigit(init.minutes));
  const [period, setPeriod] = useState<"AM" | "PM">(init.period);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!visible) return;
    setHour(twoDigit(init.hours));
    setMinute(twoDigit(init.minutes));
    setPeriod(init.period);
    setError("");
  }, [visible, init.hours, init.minutes, init.period]);

  const handleConfirm = () => {
    const hNum = parseInt(hour, 10);
    const mNum = parseInt(minute, 10);

    if (isNaN(hNum) || isNaN(mNum)) {
      setError("Please enter valid numbers");
      return;
    }
    if (hNum < 1 || hNum > 12) {
      setError("Hour must be between 1 and 12");
      return;
    }
    if (mNum < 0 || mNum > 59) {
      setError("Minutes must be between 00 and 59");
      return;
    }

    // combine with initial date (or today) preserving date part
    const base = initialDate ? new Date(initialDate) : new Date();
    let hour24 = hNum % 12;
    if (period === "PM") hour24 += 12;
    if (period === "AM" && hNum === 12) hour24 = 0;
    base.setHours(hour24, mNum, 0, 0);

    onConfirm(base);
  };

  return (
    <CustomModal visible={visible} onClose={onClose} title={title}>
      <Text style={styles.label}>Enter time</Text>
      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.small}>Hour</Text>
          <TextInput
            value={hour}
            onChangeText={(t) => setHour(t.replace(/[^0-9]/g, "").slice(0, 2))}
            keyboardType="number-pad"
            placeholder="HH"
            style={styles.input}
            maxLength={2}
          />
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.box}>
          <Text style={styles.small}>Minute</Text>
          <TextInput
            value={minute}
            onChangeText={(t) => setMinute(t.replace(/[^0-9]/g, "").slice(0, 2))}
            keyboardType="number-pad"
            placeholder="MM"
            style={styles.input}
            maxLength={2}
          />
        </View>
        <View style={[styles.box, { width: adjustSize(90) }]}>
          <Text style={styles.small}>AM/PM</Text>
          <View style={styles.periodRow}>
            <TouchableOpacity
              style={[styles.periodBtn, period === "AM" && styles.periodActive]}
              onPress={() => setPeriod("AM")}
              activeOpacity={0.8}
            >
              <Text style={[styles.periodText, period === "AM" && styles.periodTextActive]}>AM</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.periodBtn, period === "PM" && styles.periodActive]}
              onPress={() => setPeriod("PM")}
              activeOpacity={0.8}
            >
              <Text style={[styles.periodText, period === "PM" && styles.periodTextActive]}>PM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {!!error && (
        <Text style={styles.error}>{error}</Text>
      )}

      <View style={{ paddingVertical: adjustSize(12) }}>
        <Button text="Confirm" onPress={handleConfirm} />
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  label: {
    color: colors.primary,
    fontSize: adjustSize(12),
    marginBottom: adjustSize(8),
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  box: {
    width: adjustSize(110),
  } as ViewStyle,
  input: {
    height: adjustSize(44),
    borderRadius: adjustSize(10),
    backgroundColor: colors.fill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.greylight,
    paddingHorizontal: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
    fontSize: adjustSize(14),
  } as TextStyle,
  colon: {
    marginHorizontal: adjustSize(8),
    color: colors.primary,
    fontSize: adjustSize(20),
  },
  small: {
    color: colors.primaryLight,
    fontSize: adjustSize(10),
    marginBottom: adjustSize(6),
  },
  periodRow: {
    flexDirection: "row",
    gap: adjustSize(8),
  },
  periodBtn: {
    flex: 1,
    height: adjustSize(44),
    borderRadius: adjustSize(10),
    backgroundColor: colors.fill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.greylight,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  periodActive: {
    backgroundColor: colors.white,
    borderColor: colors.primary,
  },
  periodText: {
    color: colors.primaryLight,
    fontFamily: typography.fonts.poppins.normal,
    fontSize: adjustSize(12),
  },
  periodTextActive: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  error: {
    color: colors.error,
    marginTop: adjustSize(8),
  },
});

export default TimeInputModal;
