import React, { ReactNode } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Text } from "./Text";
import { colors, adjustSize, typography } from "../theme";
import { Images } from "../assets/Images";

interface TabItem {
  label: string;
  activeIcon: ReactNode;
  inactiveIcon: ReactNode;
}

interface CustomTabsProps {
  tabs: TabItem[];
  activeTab: string; // label
  onTabChange: (label: string) => void;
  children: ReactNode[]; // tab contents as children
}

export function CustomTabs({
  tabs,
  activeTab,
  onTabChange,
  children,
}: CustomTabsProps) {
  const activeIndex = tabs.findIndex((t) => t.label === activeTab);

  return (
    <View style={{ flex: 1 }}>
      {/* Tab Bar */}
      <ImageBackground source={Images.tabsBgImage} style={styles.tabBgImage}>
        {tabs.length > 3 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollTabBar}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.label;
              return (
                <TouchableOpacity
                  key={tab.label}
                  activeOpacity={0.6}
                  onPress={() => onTabChange(tab.label)}
                  style={[
                    styles.tabButtonScrollable,
                    isActive && styles.activeTab,
                   
                  ]}
                >
                  <View style={styles.iconWrapper}>
                    {isActive ? tab.activeIcon : tab.inactiveIcon}
                  </View>
                  <Text
                    style={[
                      styles.label,
                      {
                        fontFamily: isActive
                          ? typography.fonts.poppins.semiBold
                          : typography.fonts.poppins.normal,
                        color: isActive ? colors.white : colors.white,
                        fontSize: adjustSize(14),
                      },
                    ]}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          <View style={styles.tabBar}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.label;
              return (
                <TouchableOpacity
                  key={tab.label}
                  activeOpacity={0.6}
                  onPress={() => onTabChange(tab.label)}
                  style={[styles.tabButton, isActive && styles.activeTab]}
                >
                  <View style={styles.iconWrapper}>
                    {isActive ? tab.activeIcon : tab.inactiveIcon}
                  </View>
                  <Text
                    style={[
                      styles.label,
                      {
                        fontFamily: isActive
                          ? typography.fonts.poppins.semiBold
                          : typography.fonts.poppins.normal,
                        color: isActive ? colors.white : colors.white,
                      },
                    ]}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ImageBackground>

      {/* Render children by active index */}
      <View style={styles.page}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  scrollTabBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    borderBottomWidth: adjustSize(2),
    borderColor: "transparent",
    opacity:0.6
  },
  tabButtonScrollable: {
    // minWidth: adjustSize(100), // fixed width so they don’t shrink
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    borderBottomWidth: adjustSize(2),
    borderColor: "transparent",
    paddingHorizontal: adjustSize(15),
  },
  activeTab: {
    borderColor: colors.white,
    opacity:1
  },
  iconWrapper: { marginBottom: adjustSize(3) },
  label: { fontSize: adjustSize(12) },
  tabBgImage: { height: adjustSize(62), backgroundColor: colors.primary },
  page: {
    flex: 1,
  },
});
