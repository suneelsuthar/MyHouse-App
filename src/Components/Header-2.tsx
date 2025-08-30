import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "./Text";
import { colors, adjustSize } from "../theme";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { WithLocalSvg } from "react-native-svg/css";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store";
import { Images } from "../assets/Images";
interface HeaderProps {
  title: string;
  onNotificationPress?: () => void;
  onPress?: () => void;
}

export function Header2({ title, onNotificationPress, onPress }: HeaderProps) {
  const navigation = useNavigation();
  const { user } = useAppSelector((state: RootState) => state.auth);

  // const { user } = useAppSelector((state: RootState) => state.auth);
  // Map route names to drawer names
  const routeToDrawerMap: Record<string, string> = {
    tenant: "TenantDrawer",
    admin: "AdminDrawer",
    agent: "AgentDrawer",
    landlord: "LandlordDrawer",
    subLandlord: "SubLandlordDrawer",
    security: "SecurityDrawer",
    facilityManager: "FacilityManagerDrawer",
  };

  // console.log(user.role)
  // Function to get drawer name based on user role
  const getDrawerName = () => {
    // This is a simplified example - you should replace this with your actual role detection logic
    // For example, you might get this from your auth context or global state
    const path = (navigation as any).getState()?.routes?.[0]?.name || "";
    console.log(path);
    // Default to AdminDrawer if no match found
    return routeToDrawerMap[user?.role as string] || "AdminDrawer";
  };

  console.log("=====>", getDrawerName());

  const handleDrawerOpen = () => {
    const drawerName = getDrawerName();

    (navigation as any)
      .getParent?.(drawerName)
      ?.dispatch(DrawerActions.openDrawer());
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
