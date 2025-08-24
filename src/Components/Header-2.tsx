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
}

export function Header2({ title, onNotificationPress }: HeaderProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {/* Drawer Button */}
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          (navigation as any)
            .getParent?.("AdminDrawer")
            ?.dispatch(DrawerActions.openDrawer())
        }
      >
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
    // marginBottom: adjustSize(3),
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
