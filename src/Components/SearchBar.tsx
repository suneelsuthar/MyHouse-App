import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { colors, adjustSize, typography } from "../theme";
import { TextField } from "./TextField";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../assets/Images";

interface SearchBarProps {
  hideBtn: boolean;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onAddPress?: () => void; // optional right-side action
}

export function SearchBar({
  hideBtn,
  value,
  onChangeText,
  placeholder = "Search...",
  onAddPress,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextField
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.grey}
          inputWrapperStyle={{ backgroundColor: colors.white,height:adjustSize(47) }}
          style={styles.input}
        />
      </View>

      {!hideBtn && onAddPress && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.addBtn}
          onPress={onAddPress}
        >
          <WithLocalSvg asset={Images.addprop} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: adjustSize(10),
    marginHorizontal: adjustSize(10),
    marginTop: adjustSize(17),
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    margin: 0,
    fontFamily: typography.fonts.poppins.medium,
    fontSize: adjustSize(14),
  },
  addBtn: {
    backgroundColor: colors.primary,
    height: adjustSize(47),
    width: adjustSize(47),
    borderRadius: adjustSize(10),
    justifyContent: "center",
    alignItems: "center",
  },
});
