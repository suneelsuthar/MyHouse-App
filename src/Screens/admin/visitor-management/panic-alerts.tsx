import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert
} from "react-native";
import { Screen, Text, Header, TextField } from "../../../Components";
import { colors, spacing, typography, adjustSize } from "../../../theme";
import DropdownComponent from "../../../Components/DropDown";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

import { DrawerActions, useNavigation } from "@react-navigation/native";
type TabType = "Active" | "History";

const propertyGroupOptions = [
  { label: "Select Estate", value: "all" },
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
    status: "Pending",
    alert: "Kidnap",
    avatar: "E",
    backgroundColor: "#F26938",
    textColor: "#fff",
  },
  {
    id: 2,
    name: "Jane Smith",
    property: "Greenwood Apartments",
    status: "Acknowledged",
    alert: "Kidnap",
    avatar: "B",
    backgroundColor: "#A1A1A1",
    textColor: "#FFF",
  },
  {
    id: 3,
    name: "Jane Smith",
    property: "Greenwood Apartments",
    status: "Responding",
    alert: "Kidnap",
    avatar: "E",
    backgroundColor: "#292766",
    textColor: "#fff",
  },
  {
    id: 4,
    name: "Jane Smith",
    property: "Greenwood Apartments",
    status: "Escalate",
    alert: "Kidnap",
    avatar: "B",
    backgroundColor: "#D62828",
    textColor: "#FFF",
  },
  {
    id: 5,
    name: "Jane Smith",
    property: "Greenwood Apartments",
    status: "Mark as resolved",
    alert: "Kidnap",
    avatar: "E",
    backgroundColor: "#0AD029",
    textColor: "#fff",
  },
  {
    id: 6,
    name: "Jane Smith",
    property: "Greenwood Apartments",
    status: "Pending",
    alert: "Kidnap",
    avatar: "B",
    backgroundColor: "#F26938",
    textColor: "#FFF",
  },
];

export const AdminPanicAlerts: React.FC = () => {
  const [propertyGroup, setPropertyGroup] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name_asc");
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const [visitorList, setVisitorList] = useState(visitorData);
  const navigation = useNavigation();
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [pendingAction, setPendingAction] = useState<"acknowledge" | "responding" | "resolved" | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const statusLabelColor = (status: any) => {
    switch (status) {
      case "pending":
        return { color: "#F26938" };
      case "new":
        return { color: colors.primary };
      case "responding":
        return { color: "#DEB446" };
      case "acknowledged":
        return { color: colors.primary };
      case "resolved":
        return { color: "#0AD029" };
      case "escalated":
        return { color: "#D80027" };
    }
  };
    const handleConfirmAction = () => {
      if (!selectedItemId || !pendingAction) {
        setConfirmModalVisible(false);
        return;
      }
      const statusMap: Record<string, string> = {
        acknowledge: "acknowledged",
        responding: "responding",
        resolved: "resolved",
      };
      const nextStatus = statusMap[pendingAction];
      if (nextStatus) {
        const updatedList = visitorList.map((v) =>
          v.id === selectedItemId ? { ...v, status: nextStatus } : v
        );
        setVisitorList(updatedList);
      }
      setConfirmModalVisible(false);
      setPendingAction(null);
      setSelectedItemId(null);
      setDropdownVisible(null);
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
            placeholder="Select Estate"
            dropdownStyle={styles.searchDropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelected}
          />
        </View>
      </View>

      {/* Property Group Label and Sort */}
      <View style={styles.listHeader}>
        <Text style={styles.propertyGroupLabel} weight="semiBold">
          Panic Alerts
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
            {/* Top row: Avatar, Name, Status pill */}
            <View style={styles.cardRowTop}>
              <View
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              >
                <View style={styles.visitorAvatar}>
                  <WithLocalSvg asset={Images.profile} />
                </View>
                <Text weight="semiBold" style={styles.cardTitle}>
                  {item.name}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={[styles.statusPill,{
                  backgroundColor:item.backgroundColor
                }]}>
                  <Text style={styles.statusPillText}>{item.status}</Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() =>
                    setDropdownVisible(
                      dropdownVisible === item.id ? null : item.id,
                    )
                  }
                  style={{ marginLeft: adjustSize(8) }}
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
                        setSelectedItemId(item.id);
                        setPendingAction("acknowledge");
                        setConfirmModalVisible(true);
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
                        setSelectedItemId(item.id);
                        setPendingAction("responding");
                        setConfirmModalVisible(true);
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
                        setSelectedItemId(item.id);
                        setPendingAction("resolved");
                        setConfirmModalVisible(true);
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
                        setSelectedItemId(item.id);
                        setPendingAction("resolved");
                        setConfirmModalVisible(true);
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
              </View>
            </View>

            {/* Bottom row: Property and Date */}
            <View style={[styles.cardRowBottom, { marginLeft: 70 }]}>
              <Text style={styles.visitorProperty} weight="medium">
                <Text style={styles.propValue}> {item.property}</Text>
              </Text>
              <Text style={styles.visitorProperty} weight="medium">
                <Text style={styles.propValue}> 26 Sep 2024 - 10:00am</Text>
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal
        visible={confirmModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setConfirmModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setConfirmModalVisible(false)}
            >
              <AntDesign name="closecircleo" size={24} color={"#D62828"} />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Confirmation</Text>
            <Text style={styles.modalMessage}>
              {`Are you sure you want to ${
                pendingAction === "responding"
                  ? "mark as responding"
                  : pendingAction === "resolved"
                  ? "mark as resolved"
                  : "acknowledge"
              } this panic alert?`}
            </Text>

            <View
              style={{
                backgroundColor: colors.white,
                borderRadius: adjustSize(12),
                padding: spacing.lg,
                marginBottom: spacing.lg,
              }}
            >
              <Text weight="semiBold" style={{ color: colors.primary, marginBottom: spacing.sm }}>
                Alert Details
              </Text>
              {(() => {
                const sel = visitorList.find((v) => v.id === selectedItemId);
                return (
                  <View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Resident:</Text><Text style={styles.detailValue}>{sel?.name || "-"}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Property:</Text><Text style={styles.detailValue}>{sel?.property || "-"}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Alert Type:</Text><Text style={styles.detailValue}>{sel?.alert || "-"}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Date:</Text><Text style={styles.detailValue}>2024-11-12</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Time:</Text><Text style={styles.detailValue}>11:00 AM</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Current Status:</Text><Text style={styles.detailValue}>{sel?.status || "-"}</Text></View>
                  </View>
                );
              })()}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setConfirmModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirmAction}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.sm,
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
    backgroundColor: colors.primary,
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
    fontSize: adjustSize(15),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  sortContainer: {
    minWidth: 140,
  },
  sortDropdown: {
    height: adjustSize(35),
    borderRadius: adjustSize(120),
    backgroundColor: colors.primary,
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
    marginRight: spacing.sm,
    backgroundColor: colors.primary,
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
    flex: 1,
  },
  propValue: { color: colors.primary, fontSize: adjustSize(10) },
  statusPill: {
    backgroundColor: "#F26938",
    borderRadius: adjustSize(100),
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusPillText: {
    color: colors.white,
    fontSize: adjustSize(11),
    fontFamily: typography.fonts.poppins.medium,
    textTransform:"capitalize",
  },
  cardRowTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardRowBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    backgroundColor: colors.white,
    padding: adjustSize(10),
    borderRadius: adjustSize(10),
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
    minHeight: adjustSize(89),
    zIndex: 1,
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
    backgroundColor: colors.primary,
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
    borderWidth: 0.3,
    borderColor: colors.grey,
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
  // Details rows inside modal
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: adjustSize(8),
  },
  detailLabel: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
    fontSize: adjustSize(12),
  },
  detailValue: {
    color: colors.grey,
    fontFamily: typography.fonts.poppins.normal,
    fontSize: adjustSize(12),
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: colors.fill,
    borderRadius: adjustSize(16),
    padding: spacing.xl,
    marginHorizontal: spacing.lg,
    position: "relative",
    width:"90%"
  },
  closeButton: {
    position: "absolute",
    top: adjustSize(16),
    right: adjustSize(16),
    zIndex: 1,
  },
  modalTitle: {
    fontSize: adjustSize(18),
    fontFamily: typography.fonts.poppins.semiBold,
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.md,
    marginTop: adjustSize(50),
  },
  modalMessage: {
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.xl,
    lineHeight: adjustSize(20),
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
    height: adjustSize(47),
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#FF6B6B",
    borderRadius: adjustSize(10),
    alignItems: "center",
    justifyContent: "center",
    height: adjustSize(47),
  },
  cancelButtonText: {
    fontSize: adjustSize(14),
    color: "#FF6B6B",
    fontFamily: typography.fonts.poppins.medium,
  },
  alertCancelButtonText: {
    fontSize: adjustSize(14),
    color: "#FF6B6B",
    fontFamily: typography.fonts.poppins.medium,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: adjustSize(10),
    alignItems: "center",
    justifyContent: "center",
    height: adjustSize(47),
  },
  confirmButtonText: {
    fontSize: adjustSize(14),
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
});
