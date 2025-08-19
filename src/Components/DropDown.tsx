import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors, typography } from "../theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Define the type for a dropdown item
interface DropdownItem {
  label: string;
  value: string;
}

// Props type (if you want to pass data or label dynamically)
interface DropdownComponentProps {
  data?: DropdownItem[];
  label?: string;
  dropdownStyle?: StyleProp<ViewStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  selectedTextStyle?: StyleProp<TextStyle>;
  placeholder?: string;
}

// Default data
const defaultData: DropdownItem[] = [
  { label: "Landlord", value: "Landlord" },
  { label: "Agent", value: "Agent" },
  { label: "Facility Manager", value: "Facility Manager" },
  { label: "Customer", value: "Customer" },
  { label: "Tenant", value: "Tenant" },
];

export default function DropdownComponent({
  data = defaultData,
  label = "Dropdown label",
  dropdownStyle,
  placeholderStyle,
  selectedTextStyle,
  placeholder
}: DropdownComponentProps) {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <Dropdown
      style={[
        styles.dropdown,
        { backgroundColor: value ? colors.primary : "#292766A3" },
        dropdownStyle,
      ]}
      placeholderStyle={[styles.placeholderStyle, placeholderStyle] as StyleProp<TextStyle>}
      selectedTextStyle={[styles.selectedTextStyle, selectedTextStyle] as StyleProp<TextStyle>}
      renderRightIcon={() => (
        <MaterialIcons
          name="keyboard-arrow-down"
          size={24}
          color={colors.white}
        />
      )}
      data={data}
      labelField="label"
      valueField="value"
      placeholder={placeholder ? placeholder: "Select Your Role"}
      searchPlaceholder="Search..."
      value={value}
      onFocus={() => setIsFocus(true)}
      itemTextStyle={{fontFamily:typography.fonts.poppins.medium}}
      onBlur={() => setIsFocus(false)}
      onChange={(item: DropdownItem) => {
        setValue(item.value);
        setIsFocus(false);
      }}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 55,
    borderRadius: 10,
    paddingHorizontal: 8,
    backgroundColor: "#292766A3",
    paddingLeft: 15,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    // backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
  selectedTextStyle: {
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: colors.white,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
