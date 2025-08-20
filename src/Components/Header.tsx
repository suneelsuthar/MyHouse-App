import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, typography, adjustSize } from "../theme";
import { Text } from "./Text";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export interface HeaderProps {
  title?: string;
  leftAccessory?: React.ReactNode;
  rightAccessory?: React.ReactNode;
  centerAccessory?: React.ReactNode;
  showBackOnNoLeft?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title = "",
  leftAccessory,
  rightAccessory,
  centerAccessory,
  showBackOnNoLeft = true,
}) => {
  const navigation = useNavigation();

  const renderLeft = () => {
    // Left area contains: back OR custom leftAccessory, and by default the title inline
    return (
      <View style={[styles.leftArea]}>
        {leftAccessory ? (
          <View style={styles.leftSlot}>{leftAccessory}</View>
        ) : showBackOnNoLeft ? (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={22} color={colors.primary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.leftSlot} />
        )}

        {/* Show the title on the left only when no centerAccessory is provided */}
        {!centerAccessory && !!title && (
          <Text style={styles.leftTitle} weight="semiBold" numberOfLines={1}>
            {title}
          </Text>
        )}
      </View>
    );
  };

  const renderRight = () => {
    if (rightAccessory)
      return <View style={styles.right}>{rightAccessory}</View>;
    return <View style={styles.right} />;
  };

  return (
    <View style={styles.container}>
      {renderLeft()}
      {/* Center content only when provided */}
      {centerAccessory ? (
        <View style={styles.center} pointerEvents="box-none">
          <View pointerEvents="auto">{centerAccessory}</View>
        </View>
      ) : null}
      {renderRight()}
    </View>
  );
};

const SIDE_WIDTH = adjustSize(60);

const styles = StyleSheet.create({
  container: {
    // height: adjustSize(48),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    backgroundColor: colors.fill,
    borderBottomWidth: 0.4,
    borderColor: colors.primary,
    paddingVertical: adjustSize(10),
  },
  leftArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: SIDE_WIDTH,
  },
  leftSlot: {
    width: SIDE_WIDTH,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  right: {
    alignItems: "flex-end",
    width: SIDE_WIDTH,
    justifyContent: "center",
  },
  center: {
    position: "absolute",
    left: SIDE_WIDTH,
    right: SIDE_WIDTH,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  leftTitle: {
    fontSize: adjustSize(15),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  backBtn: {
    paddingVertical: adjustSize(4),
    paddingRight: adjustSize(6),
  },
});
