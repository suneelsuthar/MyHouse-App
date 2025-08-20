import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "./Text";
import { adjustSize, colors } from "../theme";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../assets/Images";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch } from "../store/hooks";
import { logoutUser } from "../store/thunks/authThunks";
export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const [active, setactive] = useState(0);
  const [openId, setOpenId] = useState<number | null>(null); // which dropdown is open
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
    } finally {
      // Ensure drawer closes and navigate to Login screen
      props.navigation.closeDrawer?.();
      props.navigation.reset({ index: 0, routes: [{ name: "Login" as never }] });
    }
  };

  const propertiesItems = [
    {
      id: 0,
      title: "Dashboard",
      type: "item",
      icon: Images.dashborad,
      onPress: () => console.log(""),
    },
    {
      id: 1,
      title: "Manage Properties",
      type: "dropdown",
      icon: Images.manageprop,
      menueItems: [
        {
          id: 0,
          title: "Rental Properties",
          onPress: () => console.log(""),
        },
        {
          id: 1,
          title: "Managed Properties",
          onPress: () => console.log(""),
        },
        {
          id: 2,
          title: "Property Requests",
          onPress: () => console.log(""),
        },
        {
          id: 3,
          title: "Services",
          onPress: () => console.log(""),
        },
        {
          id: 4,
          title: "Features",
          onPress: () => console.log(""),
        },
        {
          id: 5,
          title: "Restrictions",
          onPress: () => console.log(""),
        },
        {
          id: 6,
          title: "Manage Inspections",
          onPress: () => console.log(""),
        },
      ],
    },
    {
      id: 2,
      title: "Manage Bookings",
      type: "item",
      icon: Images.managebooking,
      onPress: () => console.log(""),
    },
    {
      id: 3,
      title: "Facility Management",
      type: "dropdown",
      icon: Images.facilitymanag,
      menueItems: [
        {
          id: 0,
          title: "Work Requests",
          onPress: () => console.log(""),
        },
        {
          id: 1,
          title: "Work Orders",
          onPress: () => console.log(""),
        },
        {
          id: 2,
          title: "Completed",
          onPress: () => console.log(""),
        },
      ],
    },
    {
      id: 4,
      title: "Visitor Management",
      type: "dropdown",
      icon: Images.visitormanagement,
      nestedItems: [
        {
          id: 0,
          title: "Visitor Requests",
          onPress: () => console.log(""),
        },
        {
          id: 1,
          title: "Visitors List",
          onPress: () => console.log(""),
        },
        {
          id: 2,
          title: "Revoked Invitations",
          onPress: () => console.log(""),
        },
        {
          id: 3,
          title: "Access Alerts",
          onPress: () => console.log(""),
        },
        {
          id: 4,
          title: "Panic Alerts",
          onPress: () => console.log(""),
        },
      ],
    },
    {
      id: 5,
      title: "Tenants",
      type: "item",
      icon: Images.tenants,
      onPress: () => console.log(""),
    },
    {
      id: 6,
      title: "Community Area",
      type: "dropdown",
      icon: Images.community,
      nestedItems: [
        {
          id: 0,
          title: "Amenities",
          onPress: () => console.log(""),
        },
        {
          id: 1,
          title: "Reservations",
          onPress: () => console.log(""),
        },
      ],
    },

    {
      id: 7,
      title: "Communications",
      type: "item",
      icon: Images.communication,
      onPress: () => console.log(""),
    },

    {
      id: 8,
      title: "Wallet",
      type: "item",
      icon: Images.wallet,
      onPress: () => console.log(""),
    },

    {
      id: 9,
      title: "Emergency",
      type: "item",
      icon: Images.emergency,
      onPress: () => console.log(""),
    },
    {
      id: 10,
      title: "Chat",
      type: "item",
      icon: Images.chat,
      onPress: () => console.log(""),
    },
  ];

  const utilitesItems = [
    {
      id: 0,
      title: "Dashboard",
      type: "item",
      icon: Images.dashborad,
      onPress: () => console.log(""),
    },
    {
      id: 1,
      title: "Sim Data Management",
      type: "item",
      icon: Images.simdata,
      onPress: () => console.log(""),
    },
    {
      id: 2,
      title: "Manage Meters",
      type: "item",
      icon: Images.meters,
      onPress: () => console.log(""),
    },
    {
      id: 3,
      title: "Manage Transactions",
      type: "item",
      icon: Images.managetrans,
      onPress: () => console.log(""),
    },
    {
      id: 4,
      title: "Manage property group",
      type: "item",
      icon: Images.managegroups,
      onPress: () => console.log(""),
    },
    {
      id: 5,
      title: "Manage Vending History",
      type: "item",
      icon: Images.managehistory,
      onPress: () => console.log(""),
    },
    {
      id: 6,
      title: "Analysis",
      type: "item",
      icon: Images.analysis,
      onPress: () => console.log(""),
    },
    {
      id: 7,
      title: "Settings",
      type: "item",
      icon: Images.settings,
      onPress: () => console.log(""),
    },
  ];

  const items = active === 0 ? propertiesItems : utilitesItems;

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: colors.primary }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.5}>
            <WithLocalSvg asset={Images.user} />
          </TouchableOpacity>
          <View style={styles.headerinfo}>
            <Text style={styles._welcomtext}>Welcome!</Text>
            <Text weight="semiBold" style={styles.username}>
              Brume Djbah
            </Text>
            <Text style={styles.role}>Admin</Text>
          </View>
          <TouchableOpacity style={styles.headerIcons} activeOpacity={0.6}>
            <WithLocalSvg asset={Images.notofication} />
          </TouchableOpacity>
        </View>

        {/* tabs */}

        <View style={styles.tab_row}>
          <TouchableOpacity
            onPress={() => setactive(0)}
            activeOpacity={0.6}
            style={[active === 0 ? styles.active_tabitem : styles._tabitem]}
          >
            <Text
              weight="medium"
              text="Properties"
              style={[active === 0 ? styles.active_text : styles.tabtext]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setactive(1)}
            activeOpacity={0.6}
            style={[active === 1 ? styles.active_tabitem : styles._tabitem]}
          >
            <Text
              weight="medium"
              text="Utilities"
              style={[active === 1 ? styles.active_text : styles.tabtext]}
            />
          </TouchableOpacity>
        </View>

        {items.map((val, i) => {
          return (
            <TouchableOpacity
              key={val.id ?? i}
              style={[styles.menuItem]}
              activeOpacity={0.8}
              onPress={() => {
                if (val.type === "dropdown") {
                  setOpenId((prev) => (prev === val.id ? null : val.id));
                } else {
                  props.navigation.navigate("Home");
                }
              }}
            >
              <View style={styles.menuItemContent}>
                <View style={styles._mainitem}>
                  <WithLocalSvg asset={val.icon} height={20} width={20} />
                  <Text
                    weight="semiBold"
                    text={val.title}
                    style={[styles.menuText]}
                  />
                  {val.type === "dropdown" && (
                    <MaterialIcons
                      name={
                        openId === val.id
                          ? "keyboard-arrow-up"
                          : "keyboard-arrow-down"
                      }
                      size={20}
                      color={colors.white}
                    />
                  )}
                </View>
                {val.type === "dropdown" &&
                  openId === val.id &&
                  (() => {
                    const children =
                      (val as any).nestedItems || (val as any).menueItems;
                    if (!children) return null;
                    return (
                      <View style={styles._nestedmenu}>
                        {children.map((nested: any, index: number) => (
                          <TouchableOpacity
                            activeOpacity={0.7}
                            key={nested.id ?? index}
                            style={styles._nested_items}
                          >
                            <Text
                              weight="semiBold"
                              text={nested.title}
                              style={[
                                styles.menuText,
                                { color: colors.primary },
                              ]}
                            />
                          </TouchableOpacity>
                        ))}
                      </View>
                    );
                  })()}
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={styles._divider} />
        <TouchableOpacity style={styles.logoutbtn} onPress={handleLogout}>
          <WithLocalSvg asset={Images.logout} />
          <Text weight="semiBold" text="Logout" style={styles.menuText} />
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
  },

  menuItem: {
    paddingVertical: adjustSize(5),
    marginVertical: adjustSize(5),
  },
  menuItemContent: {
    flexDirection: "column",
  },

  menuText: {
    fontSize: adjustSize(12),
    color: colors.white,
    marginLeft: adjustSize(10),
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: adjustSize(15),
    borderBottomWidth: adjustSize(0.4),
    borderColor: colors.white,
    marginBottom: adjustSize(15),
    paddingHorizontal: adjustSize(10),
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 16,
  },

  headerinfo: {
    flex: 1,
    paddingHorizontal: 10,
  },
  _welcomtext: {
    color: colors.grey,
    fontSize: adjustSize(14),
    lineHeight: adjustSize(16),
  },
  username: {
    fontSize: adjustSize(15),
    color: "#B0B0B0",
    lineHeight: adjustSize(20),
  },
  role: {
    fontSize: adjustSize(10),
    lineHeight: adjustSize(14),
    color: colors.white,
  },
  tab_row: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: adjustSize(1),
    borderColor: colors.white,
    height: adjustSize(30),
    borderRadius: adjustSize(7),
    overflow: "hidden",
    marginVertical: adjustSize(10),
  },
  active_tabitem: {
    backgroundColor: colors.white,
    flex: 1,
    height: adjustSize(30),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: adjustSize(7),
  },
  _tabitem: {
    flex: 1,
    height: adjustSize(30),
    justifyContent: "center",
    alignItems: "center",
  },
  active_text: {
    fontSize: adjustSize(10),
  },
  tabtext: {
    color: colors.white,
    fontSize: adjustSize(10),
  },
  _mainitem: {
    flexDirection: "row",
    alignItems: "center",
  },
  _nestedmenu: {
    padding: adjustSize(10),
    backgroundColor: colors.white,
    borderRadius: adjustSize(7),
    marginTop: adjustSize(15),
    gap: adjustSize(10),
  },
  _nested_items: {
    borderWidth: 1,
    borderRadius: adjustSize(10),
    borderColor: colors.primary,
    padding: adjustSize(8),
    justifyContent: "center",
  },
  logoutbtn: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: adjustSize(10),
  },
  _divider: {
    borderBottomWidth: adjustSize(0.5),
    borderColor: colors.white,
    marginTop: 80,
    marginBottom: adjustSize(10),
  },
});
