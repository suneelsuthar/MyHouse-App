import React, { useMemo } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Text } from "../../../../Components";
import { adjustSize, colors, typography } from "../../../../theme";

export type MultiSelectItem = { label: string; value: string };

interface MultiSelectDropdownProps {
  data: MultiSelectItem[];
  selectedValues: string[];
  onChangeSelected: (next: string[]) => void;
  containerStyle?: ViewStyle;
}

export default function MultiSelect({
  data,
  selectedValues,
  onChangeSelected,
  containerStyle,
}: MultiSelectDropdownProps) {
  const toggle = (v: string) => {
    const lower = v.toLowerCase();

    const allDays = data
      .map((d) => d.value.toLowerCase())
      .filter((val) => val !== "everyday");

    const allSelected =
      allDays.length > 0 &&
      allDays.every((day) =>
        selectedValues.map((x) => x.toLowerCase()).includes(day)
      );

    if (lower === "everyday") {
      if (allSelected) {
        // ✅ Case: all days already selected → unselect all
        onChangeSelected([]);
      } else {
        // ✅ Case: everyday clicked → select all days
        onChangeSelected(allDays);
      }
    } else {
      // ✅ Normal toggle for individual days
      let next: string[];
      if (selectedValues.includes(v)) {
        next = selectedValues.filter((x) => x !== v);
      } else {
        next = [...selectedValues, v];
      }
      onChangeSelected(next);
    }
  };

  const chips = useMemo(() => {
    const map = new Map(
      data.map((d) => [d.value.toLowerCase(), d.label] as const)
    );

    const allDays = data
      .map((d) => d.value.toLowerCase())
      .filter((val) => val !== "everyday");

    const allSelected =
      allDays.length > 0 &&
      allDays.every((day) =>
        selectedValues.map((x) => x.toLowerCase()).includes(day)
      );

    return data.map((d) => ({
      value: d.value,
      label: map.get(d.value.toLowerCase()) ?? d.value,
      selected:
        d.value.toLowerCase() === "everyday"
          ? allSelected // highlight everyday when all days selected
          : selectedValues.includes(d.value),
    }));
  }, [selectedValues, data]);

  return (
    <View style={[styles.wrap, containerStyle]}>
      <View style={styles.chipsRow}>
        {chips.map((c) => (
          <TouchableOpacity
            key={c.value}
            style={[
              styles.chip,
              c.selected && { backgroundColor: colors.primary },
            ]}
            onPress={() => toggle(c.value)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.chipText,
                { color: c.selected ? colors.white : colors.text },
              ]}
            >
              {c.label === "Everyday" ? c.label : c.label.slice(0, 3)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    marginBottom: adjustSize(10),
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: adjustSize(8),
    marginTop: adjustSize(8),
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.fill,
    borderRadius: adjustSize(5),
    paddingVertical: adjustSize(6),
    paddingHorizontal: adjustSize(12),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.greylight,
  },
  chipText: {
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.medium,
  } as TextStyle,
});
