import React, { useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Text, Button } from "./index";
import { adjustSize, colors, typography } from "../theme";

interface Props {
  initialDate?: Date;
  onCancel: () => void;
  onConfirm: (date: Date) => void;
}

const twoDigit = (n: number) => n.toString().padStart(2, "0");

const TimeInlinePicker: React.FC<Props> = ({
  initialDate,
  onCancel,
  onConfirm,
}) => {
  const init = useMemo(() => {
    const d = initialDate ?? new Date();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    return { hours, minutes };
  }, [initialDate]);

  const [hour, setHour] = useState<string>(twoDigit(init.hours));
  const [minute, setMinute] = useState<string>(twoDigit(init.minutes));
  const [error, setError] = useState<string>("");

  const handleConfirm = () => {
    const hNum = parseInt(hour, 10);
    const mNum = parseInt(minute, 10);

    if (isNaN(hNum) || isNaN(mNum)) {
      setError("Enter valid numbers");
      return;
    }
    if (hNum < 0 || hNum > 23) {
      setError("Hour 00-23");
      return;
    }
    if (mNum < 0 || mNum > 59) {
      setError("Minute 00-59");
      return;
    }

    const base = initialDate ? new Date(initialDate) : new Date();
    base.setHours(hNum, mNum, 0, 0);

    onConfirm(base);
  };

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onCancel}
      />
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.box}>
            <Text style={styles.small}>Hour</Text>
            <TextInput
              value={hour}
              onChangeText={(t) =>
                setHour(t.replace(/[^0-9]/g, "").slice(0, 2))
              }
              keyboardType="number-pad"
              placeholder="00-23"
              style={styles.input}
              maxLength={2}
            />
          </View>
          <Text style={styles.colon}>:</Text>
          <View style={styles.box}>
            <Text style={styles.small}>Minute</Text>
            <TextInput
              value={minute}
              onChangeText={(t) =>
                setMinute(t.replace(/[^0-9]/g, "").slice(0, 2))
              }
              keyboardType="number-pad"
              placeholder="00-59"
              style={styles.input}
              maxLength={2}
            />
          </View>
        </View>

        {!!error && <Text style={styles.error}>{error}</Text>}

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={onCancel}
            style={[styles.actionBtn, styles.cancel]}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleConfirm}
            style={[styles.actionBtn, styles.confirm]}
            activeOpacity={0.8}
          >
            <Text style={styles.confirmText}>Set</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  backdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  card: {
    marginTop: 0,
    padding: adjustSize(12),
    borderRadius: adjustSize(12),
    backgroundColor: colors.fill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.greylight,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  box: {
    width: adjustSize(110),
  } as ViewStyle,
  input: {
    height: adjustSize(44),
    borderRadius: adjustSize(10),
    backgroundColor: colors.white,
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
  error: {
    color: colors.error,
    marginTop: adjustSize(8),
  },
  actions: {
    marginTop: adjustSize(12),
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: adjustSize(8),
  },
  actionBtn: {
    paddingHorizontal: adjustSize(12),
    height: adjustSize(36),
    borderRadius: adjustSize(8),
    alignItems: "center",
    justifyContent: "center",
  },
  cancel: {
    backgroundColor: colors.fill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.greylight,
  },
  confirm: {
    backgroundColor: colors.primary,
  },
  cancelText: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
  },
  confirmText: {
    color: colors.white,
    fontFamily: typography.fonts.poppins.semiBold,
  },
});

export default TimeInlinePicker;
