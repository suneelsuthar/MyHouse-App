import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "./Text";
import { colors, adjustSize } from "../theme";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../assets/Images";

interface HeaderProps {
  title: string;
  onNotificationPress?: () => void;
  onPress?: () => void; // optional custom handler
}

export function Header2({ title, onNotificationPress, onPress }: HeaderProps) {
  const navigation = useNavigation();

  const handleDrawerOpen = () => {
    if (onPress) {
      onPress(); // use custom handler if passed
    } else {
      // fallback: open AdminDrawer OR TenantDrawer if available
      const parentNav: any =
        (navigation as any).getParent?.("AdminDrawer") ||
        (navigation as any).getParent?.("TenantDrawer");

      parentNav?.dispatch(DrawerActions.openDrawer());
    }
  };

  return (
    <View style={styles.header}>
      {/* Drawer Button */}
      <TouchableOpacity activeOpacity={0.5} onPress={handleDrawerOpen}>
        <WithLocalSvg
          asset={Images.user}
          style={{
            height: adjustSize(42),
            width: adjustSize(42),
          }}
        />
      </TouchableOpacity>

      {/* Title */}
      <View style={styles.headerInfo}>
        <Text weight="semiBold" style={styles.username}>
          {title}
        </Text>
      </View>

      {/* Notification Button */}
      <TouchableOpacity
        style={styles.headerIcons}
        activeOpacity={0.6}
        onPress={onNotificationPress}
      >
        <WithLocalSvg asset={Images.notofication} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: adjustSize(8),
    borderBottomWidth: 0.5,
    borderColor: colors.primary,
    paddingHorizontal: adjustSize(10),
  },
  headerInfo: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  username: {
    fontSize: adjustSize(15),
    color: colors.primary,
    lineHeight: adjustSize(20),
    textAlign: "center",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    height: adjustSize(42),
    width: adjustSize(42),
    justifyContent: "flex-end",
  },
});
