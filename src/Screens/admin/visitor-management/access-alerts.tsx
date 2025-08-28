import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Screen, Text, Header, TextField } from "../../../Components";
import { colors, spacing, typography, adjustSize } from "../../../theme";
import DropdownComponent from "../../../Components/DropDown";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
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
    name: "Jane Smith",
    property: "Greenwood Apartments",
    status: "pending",
    alert: "Kidnap",
    avatar: "E",
    backgroundColor: "#E8E8E8",
    textColor: "#333",
  },
  {
    id: 2,
    name: "Jane Smith",
    property: "Greenwood Apartments",
    status: "new",
    alert: "Kidnap",
    avatar: "B",
    backgroundColor: "#292766",
    textColor: "#FFF",
  },
  {
    id: 3,
    name: "Jane Smith",
    property: "Greenwood Apartments",
    status: "responding",
    alert: "Kidnap",
    avatar: "E",
    backgroundColor: "#E8E8E8",
    textColor: "#333",
  },
  {
    id: 4,
    name: "Jane Smith",
    property: "Greenwood Apartments",
    status: "Acknowledged",
    alert: "Kidnap",
    avatar: "B",
    backgroundColor: "#292766",
    textColor: "#FFF",
  },
  {
    id: 5,
    name: "Jane Smith",
    property: "Greenwood Apartments",
    status: "resolved",
    alert: "Kidnap",
    avatar: "E",
    backgroundColor: "#E8E8E8",
    textColor: "#333",
  },
  {
    id: 6,
    name: "Jane Smith",
    property: "Greenwood Apartments",
    status: "escalated",
    alert: "Kidnap",
    avatar: "B",
    backgroundColor: "#292766",
    textColor: "#FFF",
  },
];

export const AdminAccessAlerts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Active");
  const [propertyGroup, setPropertyGroup] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name_asc");
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const [visitorList, setVisitorList] = useState(visitorData);
  const navigation = useNavigation();

  const statusLabelColor = (status: any) => {
    switch (status) {
      case "pending":
        return { color: "#F26938" };
      case "new":
        return { color: colors.primary };
      case "responding":
        return { color: "#DEB446" };
      case "acknowledged":
        return { color: colors.primaryLight };
      case "resolved":
        return { color: "#0AD029" };
      case "escalated":
        return { color: "#D80027" };
    }
  };
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header
        leftAccessory={
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              (navigation as any)
                .getParent?.("AdminDrawer")
                ?.dispatch(DrawerActions.openDrawer())
            }
          >
            <WithLocalSvg asset={Images.user} />
          </TouchableOpacity>
        }
        centerAccessory={
          <Text
            weight="semiBold"
            style={{ fontSize: adjustSize(15), color: colors.primary }}
          >
            Visitor management
          </Text>
        }
        rightAccessory={
          <TouchableOpacity activeOpacity={0.5}>
            <WithLocalSvg asset={Images.notofication} />
          </TouchableOpacity>
        }
      />

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
      </View>

      {/* Property Group Label and Sort */}
      <View style={styles.listHeader}>
        <Text style={styles.propertyGroupLabel} weight="semiBold">
          Access Alerts
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
        {visitorList.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              dropdownVisible === item.id && styles.cardWithDropdown,
            ]}
            activeOpacity={0.8}
          >
            <View style={styles.cardHeaderRow}>
              <View style={styles.cardHeaderRow}>
                <Text weight="semiBold" style={styles.cardTitle}>
                  {item.name}
                </Text>

                {item.property ? (
                  <Text style={styles.subtitle}>
                    {"  "}({item.property})
                  </Text>
                ) : null}
              </View>

              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() =>
                  setDropdownVisible(
                    dropdownVisible === item.id ? null : item.id
                  )
                }
              >
                <Entypo
                  name="dots-three-vertical"
                  size={adjustSize(18)}
                  color="black"
                />
              </TouchableOpacity>

              {dropdownVisible === item.id && (
                <View style={styles.dropdownMenu}>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      const updatedList = visitorList.map((visitor) =>
                        visitor.id === item.id
                          ? { ...visitor, status: "acknowledged" }
                          : visitor
                      );
                      setVisitorList(updatedList);
                      setDropdownVisible(null);
                    }}
                  >
                    <MaterialIcons
                      name="check-circle"
                      size={adjustSize(16)}
                      color="#4CAF50"
                    />
                    <Text style={styles.dropdownText}>Acknowledge</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      const updatedList = visitorList.map((visitor) =>
                        visitor.id === item.id
                          ? { ...visitor, status: "responding" }
                          : visitor
                      );
                      setVisitorList(updatedList);
                      setDropdownVisible(null);
                    }}
                  >
                    <MaterialIcons
                      name="autorenew"
                      size={adjustSize(16)}
                      color="#FF9800"
                    />
                    <Text style={styles.dropdownText}>Responding</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      const updatedList = visitorList.map((visitor) =>
                        visitor.id === item.id
                          ? { ...visitor, status: "resolved" }
                          : visitor
                      );
                      setVisitorList(updatedList);
                      setDropdownVisible(null);
                    }}
                  >
                    <MaterialIcons
                      name="assignment-turned-in"
                      size={adjustSize(16)}
                      color="#2196F3"
                    />
                    <Text style={styles.dropdownText}>Mark as Resolved</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      const updatedList = visitorList.map((visitor) =>
                        visitor.id === item.id
                          ? { ...visitor, status: "resolved" }
                          : visitor
                      );
                      setVisitorList(updatedList);
                      setDropdownVisible(null);
                    }}
                  >
                    <Ionicons
                      name="checkmark-done"
                      size={adjustSize(16)}
                      color="#4CAF50"
                    />
                    <Text style={styles.dropdownText}>Resolve</Text>
                  </TouchableOpacity>
                </View>
              )}
              {/* <Text
                weight="medium"
                style={[styles.statusText, statusLabelColor(item.status)]}
              >
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Text> */}
            </View>
            <View style={styles.rowBetween}>
              <View>
                <Text weight="medium" style={styles.label}>
                  Time:
                  <Text style={styles.labelValue}>
                    {"  "}
                    10:00 am
                  </Text>
                </Text>
                <Text weight="medium" style={[styles.label]}>
                  Date:
                  {"  "}
                  <Text style={styles.labelValue}>26 Sep,2024</Text>
                </Text>
              </View>
              <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
                <Text
                  weight="medium"
                  style={[styles.statusText, statusLabelColor(item.status)]}
                >
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>
                <Text weight="medium" style={[styles.label]}>
                  Alert:
                  <Text style={[styles.labelValue, { color: "#D51E1E" }]}>
                    {" "}
                    {item.alert}
                  </Text>
                </Text>
              </View>
            </View>
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
    padding: spacing.md,
    borderRadius: adjustSize(10),
    backgroundColor: colors.fill,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: adjustSize(10),
    marginVertical: adjustSize(5),
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
    fontSize: adjustSize(10),
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
  card: {
    backgroundColor: colors.fill,
    padding: adjustSize(10),
    borderRadius: adjustSize(7),
    // shadowColor: "#000",
    // boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
    elevation: 2,
    marginHorizontal: adjustSize(10),
    minHeight: adjustSize(96),
    marginVertical: adjustSize(8),
    zIndex: 1,
    shadowColor: "#000",
    borderWidth: 0.4,
    borderColor: colors.grey,
  },
  cardWithDropdown: {
    zIndex: 9999,
    elevation: 0,
    shadowOpacity: 0,
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    zIndex: 1,
  },
  cardTitle: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    fontSize: adjustSize(15),
  },
  subtitle: {
    color: colors.grey,
    fontSize: adjustSize(10),
    // marginBottom: spacing.sm,
  },

  label: {
    color: colors.primary,
    fontSize: adjustSize(10),
    zIndex: -1,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: spacing.sm,
    zIndex: -1,
  },
  labelValue: {
    color: colors.primary,
    fontSize: adjustSize(10),
    zIndex: -1,
  },
  dropdown: {
    minWidth: adjustSize(120),
    height: adjustSize(33),
    borderRadius: 100,
    backgroundColor: colors.primaryLight,
  },
  dropdownMenu: {
    position: "absolute",
    top: adjustSize(25),
    shadowColor: "transparent",
    right: 0,
    backgroundColor: colors.white,
    borderRadius: adjustSize(8),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 30,
    zIndex: 10000,
    minWidth: adjustSize(160),
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: adjustSize(12),
    paddingVertical: adjustSize(10),
    borderBottomWidth: 0.5,
    borderBottomColor: "#E0E0E0",
  },
  dropdownText: {
    marginLeft: adjustSize(8),
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
  },
});
