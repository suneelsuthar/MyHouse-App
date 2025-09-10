import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
  Image
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { adjustSize, colors, typography } from "../theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// Define the type for a dropdown item
interface DropdownItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

// Props type (if you want to pass data or label dynamically)
interface DropdownComponentProps {
  data?: DropdownItem[];
  label?: string;
  dropdownStyle?: StyleProp<ViewStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  selectedTextStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  rightIconColor?: string; // optional color override for chevron
  rightIconStyle?: StyleProp<ViewStyle>; // optional style override for chevron container/icon
  value?: string | null; // controlled selected value
  onChangeValue?: (value: string) => void; // notify parent when selection changes
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
  placeholder,
  rightIconColor,
  rightIconStyle,
  value: controlledValue,
  onChangeValue,
}: DropdownComponentProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState<string | null>(
    controlledValue ?? null
  );
  const [isFocus, setIsFocus] = useState<boolean>(false);

  // keep internal state in sync if used in controlled mode
  useEffect(() => {
    if (controlledValue !== undefined) {
      setUncontrolledValue(controlledValue);
    }
  }, [controlledValue]);

  return (
    <Dropdown
      style={[
        styles.dropdown,
        {
          backgroundColor:
            controlledValue ?? uncontrolledValue ? colors.primary : "#292766A3",
        },
        dropdownStyle,
      ]}
      placeholderStyle={
        [styles.placeholderStyle, placeholderStyle] as StyleProp<TextStyle>
      }
      selectedTextStyle={
        [styles.selectedTextStyle, selectedTextStyle] as StyleProp<TextStyle>
      }
      renderRightIcon={() => (
        <MaterialIcons
          name="keyboard-arrow-down"
          size={24}
          color={rightIconColor ?? colors.white}
          style={[styles.icon, rightIconStyle]}
        />
      )}
      data={data}
      labelField="label"
      valueField="value"
      placeholder={placeholder ? placeholder : "Select Your Role"}
      searchPlaceholder="Search..."
      value={controlledValue ?? uncontrolledValue}
      onFocus={() => setIsFocus(true)}
      itemTextStyle={{
        fontFamily: typography.fonts.poppins.normal,
        fontSize: adjustSize(14),
      }}
      renderItem={(item: DropdownItem, selected) => (
        <View style={styles.item}>
          {'image' in item && item.image ? (
            <Image
              source={item.image}
              style={styles.dropdownImage}
              resizeMode="contain"
            />
          ) : item.icon ? (
            <View style={{ marginRight: 8 }}>
              {item.icon}
            </View>
          ) : null}
          <Text style={styles.itemText}>
            {item.label}
          </Text>
        </View>
      )}
      onBlur={() => setIsFocus(false)}
      onChange={(item: DropdownItem) => {
        if (onChangeValue) {
          onChangeValue(item.value);
        } else {
          setUncontrolledValue(item.value);
        }
        setIsFocus(false);
      }}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: adjustSize(49),
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
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#292766',
    fontFamily: typography.fonts.poppins.normal,
  },
  dropdownImage: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
});
