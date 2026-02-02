import React, { useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  StyleProp,
  ScrollView,
} from "react-native";
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
  showSelectedChips?: boolean;
  multiSelect?: boolean;
  itemStyle?: StyleProp<ViewStyle>;
}

export default function MultiSelectDropdown({
  data,
  placeholder = "Search services",
  selectedValues,
  onChangeSelected,
  containerStyle,
  maxDropdownHeight = 200,
  showSelectedChips,
  multiSelect = true,
  itemStyle,
}: MultiSelectDropdownProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    // In single select mode, we want to show all options when searching
    const items = multiSelect
      ? data.filter((d) => !selectedValues.includes(d.value))
      : data;

    return q ? items.filter((d) => d.label.toLowerCase().includes(q)) : items;
  }, [query, data, selectedValues, multiSelect]);

  // Get the selected item for display in single select mode
  const selectedItem = useMemo(() => {
    if (!multiSelect && selectedValues.length > 0) {
      return data.find((item) => item.value === selectedValues[0])?.label || "";
    }
    return "";
  }, [selectedValues, data, multiSelect]);

  const add = (v: string) => {
    if (multiSelect) {
      if (!selectedValues.includes(v)) {
        onChangeSelected([...selectedValues, v]);
      }
    } else {
      onChangeSelected([v]);
      setOpen(false);
    }
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
          value={!multiSelect && selectedItem ? selectedItem : query}
          onChangeText={(t) => {
            setQuery(t);
            if (!open) setOpen(true);
          }}
          onFocus={() => {
            if (multiSelect || !selectedItem) {
              setOpen(true);
            }
          }}
          onPressIn={() => {
            if (!multiSelect && selectedItem) {
              // Clear selection when clicking on input in single select mode
              onChangeSelected([]);
              setQuery("");
            }
            if (!open) setOpen(true);
          }}
          inputWrapperStyle={{backgroundColor:colors.white}}
        />
        <TouchableOpacity
          onPress={() => setOpen((s) => !s)}
          style={styles.rightIcon}
          activeOpacity={0.7}
        >
          <AntDesign
            name={open ? "up" : "down"}
            size={16}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      {!showSelectedChips && selectedChips.length > 0 && (
        <View style={styles.chipsRow}>
          {selectedChips.map((c) => (
            <View key={c.value} style={styles.chip}>
              <Text style={styles.chipText}>{c.label}</Text>
              <TouchableOpacity
                onPress={() => remove(c.value)}
                style={styles.chipClose}
              >
                <AntDesign name="close" size={12} color={colors.white} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {open && (
        <View
          style={[
            styles.dropdownPanel,
            { maxHeight: adjustSize(maxDropdownHeight) },
          ]}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={[
                    styles.dropdownItem,
                    itemStyle,
                    selectedValues.includes(item.value) && styles.selectedItem,
                  ]}
                  onPress={() => add(item.value)}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      selectedValues.includes(item.value) &&
                        styles.selectedItemText,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.noResults}>
                <Text style={styles.noResultsText}>No properties found</Text>
              </View>
            )}
          </ScrollView>
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
    backgroundColor: colors.white,
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
  dropdownItem: {
    padding: adjustSize(12),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.greylight,
  },
  dropdownItemText: {
    fontSize: adjustSize(14),
    color: colors.text,
  },
  noResults: {
    padding: adjustSize(16),
    alignItems: "center",
  },
  noResultsText: {
    color: colors.text,
    fontSize: adjustSize(14),
    opacity: 0.7,
  },
  selectedItem: {
    backgroundColor: colors.primaryLight,
  },
  selectedItemText: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
});
