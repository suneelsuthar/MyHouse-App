import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainTabParamList, SCREEN_GROUPS } from "../types";
import { AuthContext } from "../../../context/AuthContext";
import { HomeStackNavigator } from "./HomeStackNavigator";
import { PropertiesStackNavigator } from "./PropertiesStackNavigator";
import { TenantsStackNavigator } from "./TenantsStackNavigator";
import { MaintenanceStackNavigator } from "./MaintenanceStackNavigator";
import { MoreStackNavigator } from "./MoreStackNavigator";
import { TabBarIcon } from "../../Components/TabBarIcon";
import { colors, spacing, typography } from "../../../theme";

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  const { user } = useContext(AuthContext);
  const userRole = user?.role || "tenant"; // Default to tenant if no role
  const { tabs } = SCREEN_GROUPS[userRole];

  const tabBarOptions = (label: string) => ({
    tabBarLabel: label,
    tabBarLabelStyle: {
      fontFamily: typography.fonts.poppins.medium,
      fontSize: 11,
      marginTop: 4,
    },
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.textSecondary,
  });

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          elevation: 0,
          shadowOpacity: 0,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
        },
      }}
    >
      {tabs.includes("HomeTab") && (
        <Tab.Screen
          name="HomeTab"
          component={HomeStackNavigator}
          options={{
            ...tabBarOptions("Home"),
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name="HomeTab" color={color} focused={focused} />
            ),
          }}
        />
      )}

      {tabs.includes("PropertiesTab") && (
        <Tab.Screen
          name="PropertiesTab"
          component={PropertiesStackNavigator}
          options={{
            ...tabBarOptions("Properties"),
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name="PropertiesTab"
                color={color}
                focused={focused}
              />
            ),
          }}
        />
      )}

      {tabs.includes("TenantsTab") && (
        <Tab.Screen
          name="TenantsTab"
          component={TenantsStackNavigator}
          options={{
            ...tabBarOptions("Tenants"),
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name="TenantsTab" color={color} focused={focused} />
            ),
          }}
        />
      )}

      {tabs.includes("MaintenanceTab") && (
        <Tab.Screen
          name="MaintenanceTab"
          component={MaintenanceStackNavigator}
          options={{
            ...tabBarOptions("Maintenance"),
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name="MaintenanceTab"
                color={color}
                focused={focused}
              />
            ),
          }}
        />
      )}

      {tabs.includes("MoreTab") && (
        <Tab.Screen
          name="MoreTab"
          component={MoreStackNavigator}
          options={{
            ...tabBarOptions("More"),
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name="MoreTab" color={color} focused={focused} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};
