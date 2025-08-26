import React, { useMemo, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from "react-native";
import { Text, TextField } from "./index";
import { adjustSize, colors, typography } from "../theme";
import AntDesign from "@expo/vector-icons/AntDesign";

export type MultiSelectItem = { label: string; value: string };

interface MultiSelectDropdownProps {
  data: MultiSelectItem[];
  placeholder?: string;
  selectedValues: string[]; // array of value strings
  onChangeSelected: (next: string[]) => void;
  containerStyle?: ViewStyle;
  maxDropdownHeight?: number;
}

export default function MultiSelectDropdown({
  data,
  placeholder = "Search services",
  selectedValues,
  onChangeSelected,
  containerStyle,
  maxDropdownHeight = 200,
}: MultiSelectDropdownProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q ? data.filter((d) => d.label.toLowerCase().includes(q)) : data;
    return base.filter((d) => !selectedValues.includes(d.value));
  }, [query, data, selectedValues]);

  const add = (v: string) => {
    if (!selectedValues.includes(v)) onChangeSelected([...selectedValues, v]);
    setQuery("");
  };

  const remove = (v: string) => {
    onChangeSelected(selectedValues.filter((x) => x !== v));
  };

  const selectedChips = useMemo(() => {
    const map = new Map(data.map((d) => [d.value, d.label] as const));
    return selectedValues.map((v) => ({ value: v, label: map.get(v) ?? v }));
  }, [selectedValues, data]);

  return (
    <View style={[styles.wrap, containerStyle]}>
      <View style={{ position: "relative" }}>
        <TextField
          placeholder={placeholder}
          value={query}
          onChangeText={(t) => {
            setQuery(t);
            if (!open) setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
        <TouchableOpacity
          onPress={() => setOpen((s) => !s)}
          style={styles.rightIcon}
          activeOpacity={0.7}
        >
          <AntDesign name={open ? "up" : "down"} size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {selectedChips.length > 0 && (
        <View style={styles.chipsRow}>
          {selectedChips.map((c) => (
            <View key={c.value} style={styles.chip}>
              <Text style={styles.chipText}>{c.label}</Text>
              <TouchableOpacity onPress={() => remove(c.value)} style={styles.chipClose}>
                <AntDesign name="close" size={12} color={colors.white} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {open && (
        <View style={[styles.dropdownPanel, { maxHeight: adjustSize(maxDropdownHeight) }]}>
          {filtered.length === 0 ? (
            <View style={styles.dropdownRow}>
              <Text style={{ color: colors.primary, opacity: 0.7 }}>No results</Text>
            </View>
          ) : (
            filtered.slice(0, 20).map((d) => (
              <TouchableOpacity
                key={d.value}
                onPress={() => add(d.value)}
                style={styles.dropdownRow}
                activeOpacity={0.7}
              >
                <Text style={{ color: colors.primary }}>{d.label}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
  },
  rightIcon: {
    position: "absolute",
    right: adjustSize(12),
    top: adjustSize(16),
    width: adjustSize(24),
    height: adjustSize(24),
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: colors.primary,
    borderRadius: adjustSize(20),
    paddingVertical: adjustSize(6),
    paddingLeft: adjustSize(12),
    paddingRight: adjustSize(8),
  },
  chipText: {
    color: colors.white,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.medium,
  } as TextStyle,
  chipClose: {
    marginLeft: adjustSize(8),
    width: adjustSize(16),
    height: adjustSize(16),
    borderRadius: adjustSize(8),
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownPanel: {
    backgroundColor: colors.fill,
    borderRadius: adjustSize(10),
    marginTop: adjustSize(8),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.greylight,
    overflow: "hidden",
  },
  dropdownRow: {
    paddingVertical: adjustSize(10),
    paddingHorizontal: adjustSize(12),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.greylight,
  },
});



