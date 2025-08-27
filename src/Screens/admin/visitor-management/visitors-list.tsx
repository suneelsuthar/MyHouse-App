// import React from "react";
// import { StyleSheet, View } from "react-native";
// import { Screen, Text } from "../../../Components";
// import { spacing } from "../../../theme";

// export const AdminVisitorsList: React.FC = () => {
//   return (
//     <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={styles.container}>
//       <Text weight="semiBold" style={styles.title}>Visitors List</Text>
//       <View style={styles.card}>
//         <Text style={styles.muted}>Render Visitors list here.</Text>
//       </View>
//     </Screen>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: spacing.lg,
//   },
//   title: {
//     fontSize: 18,
//     marginBottom: spacing.md,
//   },
//   card: {
//     padding: spacing.md,
//     borderRadius: 8,
//     backgroundColor: "#fff",
//   },
//   muted: {
//     color: "#666",
//   },
// });

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { Screen, Text, Header, TextField } from "../../../Components";
import { colors, spacing, typography, adjustSize } from "../../../theme";
import DropdownComponent from "../../../Components/DropDown";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AdminStackParamList } from "../../../utils/interfaces";

type NavigationProp = NativeStackNavigationProp<AdminStackParamList>;
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

export const AdminVisitorsList: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState<TabType>("Active");
  const [propertyGroup, setPropertyGroup] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name_asc");
  const [searchQuery, setSearchQuery] = useState("");

  const handleVisitorPress = (visitorId: number) => {
    navigation.navigate("AdminVisitorDetails", {
      visitorId: visitorId.toString(),
    });
  };

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header
        leftAccessory={
          <TouchableOpacity activeOpacity={0.5}>
            <WithLocalSvg asset={Images.user} />
          </TouchableOpacity>
        }
        centerAccessory={
          <Text
            weight="semiBold"
            style={{ fontSize: adjustSize(15), color: colors.primary }}
          >
            Visitor Management
          </Text>
        }
        rightAccessory={
          <View style={styles.headerRightContainer}>
            <TouchableOpacity activeOpacity={0.5}>
              <WithLocalSvg asset={Images.notofication} />
            </TouchableOpacity>
          </View>
        }
      />

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Active" && styles.activeTab]}
          onPress={() => setActiveTab("Active")}
        >
          <Image
            source={Images.activevisit}
            style={{
              height: adjustSize(24),
              width: adjustSize(24),
              tintColor: activeTab === "Active" ? colors.primary : colors.white,
            }}
          />
          <Text
            style={[
              styles.tabText,
              {
                color: activeTab === "Active" ? colors.primary : colors.white,
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
          <Image
            source={Images.visithistory}
            style={{
              height: adjustSize(24),
              width: adjustSize(24),
              tintColor:
                activeTab === "History" ? colors.primary : colors.white,
            }}
          />
          <Text
            style={[
              styles.tabText,
              {
                color: activeTab === "History" ? colors.primary : colors.white,
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

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate("AdminGenerateVisitorRequest");
          }}
        >
          <WithLocalSvg asset={Images.addprop} />
        </TouchableOpacity>
      </View>

      {/* Property Group Label and Sort */}
      <View style={styles.listHeader}>
        <Text style={styles.propertyGroupLabel} weight="semiBold">
          Visitor List
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

      <TextField
        placeholder="Search"
        inputWrapperStyle={{
          backgroundColor: colors.white,
          margin: adjustSize(10),
          width: "94%",
          alignSelf: "center",
        }}
      />

      {/* Visitor List */}
      <ScrollView
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {visitorData.map((visitor, index) => (
          <TouchableOpacity
            key={visitor.id}
            style={[
              styles.visitorItem,
              {
                backgroundColor: index % 2 === 0 ? "#cacae0" : colors.fill,
              },
            ]}
            onPress={() => handleVisitorPress(visitor.id)}
          >
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
              <Text style={styles.statusText}>{visitor.status}</Text>

              <Text style={styles.visitorName} weight="semiBold">
                {visitor.name}
              </Text>
              <Text style={styles.visitorProperty} weight="medium">
                Property:
                <Text style={{ color: colors.white }}>
                  {` `}
                  {visitor.property}
                </Text>
              </Text>
            </View>

            <View style={styles.statusContainer}></View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Screen>
  );
};

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
    backgroundColor: "#dedfef",

    // padding: spacing.xs,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.sm,
    // gap: spacing.xs,
  },
  activeTab: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderBottomWidth: 3,
    borderColor: colors.primary,
  },
  tabText: {
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.medium,
  },
  filtersContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: adjustSize(10),
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  searchDropdownContainer: {
    flex: 1,
  },
  searchDropdown: {
    height: adjustSize(48),
    borderRadius: adjustSize(10),
    backgroundColor: "#6369A4",
    paddingHorizontal: spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dropdownPlaceholder: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
  dropdownSelected: {
    fontSize: adjustSize(12),
    color: colors.white,
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
    height: adjustSize(35),
    borderRadius: adjustSize(100),
    backgroundColor: "#6369A4",
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
    // paddingHorizontal: spacing.lg,
  },
  visitorItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: spacing.md,
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
    color: colors.white,
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
  headerinfo: {
    flex: 1,
    paddingHorizontal: 10,
  },
  _welcomtext: {
    color: colors.grey,
    fontSize: adjustSize(10),
    lineHeight: adjustSize(12),
  },
  username: {
    fontSize: adjustSize(15),
    color: colors.primary,
    lineHeight: adjustSize(20),
  },
  role: {
    fontSize: adjustSize(10),
    lineHeight: adjustSize(14),
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 16,
  },
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  generateButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: adjustSize(6),
  },
  generateButtonText: {
    color: colors.white,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.medium,
  },
});
