import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Screen, Text } from "../../../Components";
import { colors, spacing, typography, adjustSize } from "../../../theme";
import { AdminStackParamList } from "../../../utils/interfaces";
import { Ionicons } from "@expo/vector-icons";
import DropdownComponent from "../../../Components/DropDown";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type TabType = "Active" | "History";

const propertyGroupOptions = [
  { label: "All Properties", value: "all" },
  { label: "Farm House", value: "farm_house" },
  { label: "Town House", value: "town_house" },
  { label: "Villa", value: "villa" },
];

const sortOptions = [
  { label: "Name A-Z", value: "name_asc" },
  { label: "Name Z-A", value: "name_desc" },
  { label: "Date Added", value: "date_added" },
  { label: "Status", value: "status" },
];

const visitorData = [
  {
    id: 1,
    name: "Ethan Baker",
    property: "Farm House",
    status: "Pending",
    avatar: "E",
    backgroundColor: "#E8E8E8",
    textColor: "#333",
  },
  {
    id: 2,
    name: "Brume Djbah",
    property: "Farm House",
    status: "Pending",
    avatar: "B",
    backgroundColor: "#292766",
    textColor: "#FFF",
  },
  {
    id: 3,
    name: "Ethan Baker",
    property: "Farm House",
    status: "Pending",
    avatar: "E",
    backgroundColor: "#E8E8E8",
    textColor: "#333",
  },
  {
    id: 4,
    name: "Brume Djbah",
    property: "Farm House",
    status: "Pending",
    avatar: "B",
    backgroundColor: "#292766",
    textColor: "#FFF",
  },
  {
    id: 5,
    name: "Ethan Baker",
    property: "Farm House",
    status: "Pending",
    avatar: "E",
    backgroundColor: "#E8E8E8",
    textColor: "#333",
  },
  {
    id: 6,
    name: "Brume Djbah",
    property: "Farm House",
    status: "Pending",
    avatar: "B",
    backgroundColor: "#292766",
    textColor: "#FFF",
  },
];

type Props = NativeStackScreenProps<
  AdminStackParamList,
  "AdminVisitorManagement"
>;

export function AdminVisitorManagement({ route }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("Active");
  const [propertyGroup, setPropertyGroup] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name_asc");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.profileAvatar}>
            <Image
              source={{
                uri: "https://via.placeholder.com/40x40/333/fff?text=U",
              }}
              style={styles.avatarImage}
            />
          </View>
          <Text style={styles.headerTitle} weight="semiBold">
            Visitor Management
          </Text>
        </View>
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Active" && styles.activeTab]}
          onPress={() => setActiveTab("Active")}
        >
          <Ionicons
            name="people"
            size={20}
            color={
              activeTab === "Active" ? colors.primary : colors.primaryLight
            }
          />
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === "Active" ? colors.primary : colors.primaryLight,
              },
            ]}
            weight={activeTab === "Active" ? "semiBold" : "medium"}
          >
            Active
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "History" && styles.activeTab]}
          onPress={() => setActiveTab("History")}
        >
          <Ionicons
            name="time-outline"
            size={20}
            color={
              activeTab === "History" ? colors.primary : colors.primaryLight
            }
          />
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === "History"
                    ? colors.primary
                    : colors.primaryLight,
              },
            ]}
            weight={activeTab === "History" ? "semiBold" : "medium"}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search and Filters */}
      <View style={styles.filtersContainer}>
        <View style={styles.searchDropdownContainer}>
          <DropdownComponent
            data={propertyGroupOptions}
            value={propertyGroup}
            onChangeValue={setPropertyGroup}
            placeholder="Search Property Group"
            dropdownStyle={styles.searchDropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelected}
          />
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Property Group Label and Sort */}
      <View style={styles.listHeader}>
        <Text style={styles.propertyGroupLabel} weight="semiBold">
          Property Group
        </Text>
        <View style={styles.sortContainer}>
          <DropdownComponent
            data={sortOptions}
            value={sortBy}
            onChangeValue={setSortBy}
            placeholder="Sort by"
            dropdownStyle={styles.sortDropdown}
            placeholderStyle={styles.sortPlaceholder}
            selectedTextStyle={styles.sortSelected}
          />
        </View>
      </View>

      {/* Visitor List */}
      <ScrollView
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {visitorData.map((visitor) => (
          <TouchableOpacity key={visitor.id} style={styles.visitorItem}>
            <View
              style={[
                styles.visitorAvatar,
                { backgroundColor: visitor.backgroundColor },
              ]}
            >
              <Text
                style={[styles.avatarText, { color: visitor.textColor }]}
                weight="semiBold"
              >
                {visitor.avatar}
              </Text>
            </View>

            <View style={styles.visitorInfo}>
              <Text style={styles.visitorName} weight="semiBold">
                {visitor.name}
              </Text>
              <Text style={styles.visitorProperty}>
                Property: {visitor.property}
              </Text>
            </View>

            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>{visitor.status}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.fill,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileAvatar: {
    width: adjustSize(40),
    height: adjustSize(40),
    borderRadius: adjustSize(20),
    marginRight: spacing.sm,
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  headerTitle: {
    fontSize: adjustSize(18),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  notificationIcon: {
    padding: spacing.xs,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: colors.primary + "15",
    marginHorizontal: spacing.lg,
    borderRadius: adjustSize(8),
    padding: spacing.xs,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.sm,
    borderRadius: adjustSize(6),
    gap: spacing.xs,
  },
  activeTab: {
    backgroundColor: colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.medium,
  },
  filtersContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  searchDropdownContainer: {
    flex: 1,
  },
  searchDropdown: {
    height: adjustSize(48),
    borderRadius: adjustSize(10),
    backgroundColor: colors.white,
    paddingHorizontal: spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dropdownPlaceholder: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
  },
  dropdownSelected: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
  },
  addButton: {
    width: adjustSize(48),
    height: adjustSize(48),
    borderRadius: adjustSize(10),
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  propertyGroupLabel: {
    fontSize: adjustSize(16),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  sortContainer: {
    minWidth: 120,
  },
  sortDropdown: {
    height: adjustSize(36),
    borderRadius: adjustSize(8),
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
  },
  sortPlaceholder: {
    fontSize: adjustSize(11),
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
  sortSelected: {
    fontSize: adjustSize(11),
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  visitorItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: adjustSize(12),
    marginBottom: spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  visitorAvatar: {
    width: adjustSize(50),
    height: adjustSize(50),
    borderRadius: adjustSize(25),
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: adjustSize(18),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  visitorInfo: {
    flex: 1,
  },
  visitorName: {
    fontSize: adjustSize(14),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    marginBottom: 2,
  },
  visitorProperty: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
  },
  statusContainer: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  statusText: {
    fontSize: adjustSize(11),
    color: "#FF6B35",
    fontFamily: typography.fonts.poppins.medium,
  },
});
