// import React from "react";
// import { StyleSheet, View } from "react-native";
// import { Screen, Text, Header2 } from "../../../Components";
// import { colors, typography, adjustSize } from "../../../theme";

// export const AdminPropertyRequests: React.FC = () => {
//   return (
//     <Screen
//       preset="fixed"
//       safeAreaEdges={["top"]}
//       contentContainerStyle={styles.container}
//     >
//       <Header2 title="Property Requests" onNotificationPress={() => {}} />
//       <View style={styles.content}>
//         <Text style={styles.pageTitle}>Property Requests</Text>
//         <Text style={styles.description}>
//           This screen will show all property requests from tenants and agents.
//         </Text>
//       </View>
//     </Screen>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.fill,
//   },
//   content: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: adjustSize(20),
//   },
//   pageTitle: {
//     fontSize: adjustSize(24),
//     color: colors.primary,
//     fontFamily: typography.fonts.poppins.semiBold,
//     marginBottom: adjustSize(16),
//     textAlign: "center",
//   },
//   description: {
//     fontSize: adjustSize(16),
//     color: colors.grey,
//     fontFamily: typography.fonts.poppins.normal,
//     textAlign: "center",
//     lineHeight: adjustSize(24),
//   },
// });

// import React from "react";
// import { StyleSheet, View } from "react-native";
// import { Screen, Text } from "../../../Components";
// import { spacing } from "../../../theme";

// export const AdminAccessAlerts: React.FC = () => {
//   return (
//     <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={styles.container}>
//       <Text weight="semiBold" style={styles.title}>Access Alerts</Text>
//       <View style={styles.card}>
//         <Text style={styles.muted}>Render Access Alerts here.</Text>
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
  FlatList,
} from "react-native";
import { Screen, Text, Header, TextField } from "../../../Components";
import { colors, spacing, typography, adjustSize } from "../../../theme";
import DropdownComponent from "../../../Components/DropDown";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { rentalProperties } from "../../../utils/data";
import { RentalCard } from "../../../Components/RentalCard";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AdminStackParamList } from "../../../navigation/types";
import { TextInput } from "react-native";
import { Modal as RNModal } from "react-native";

type PropertyRequestsScreenNavigationProp = NativeStackNavigationProp<
  AdminStackParamList,
  "PropertyDetails"
>;
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

const propertyRequestsData = [
  {
    id: "123456",
    title: "Brume Villa",
    location: "Shortlet - Lagos, Nigeria",
    status: "pending",
    price: "$30000",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop",
  },
  {
    id: "123457",
    title: "Brume Villa",
    location: "Shortlet - Lagos, Nigeria",
    status: "approved",
    price: "$30000",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=200&fit=crop",
  },
  {
    id: "123458",
    title: "Brume Villa",
    location: "Shortlet - Lagos, Nigeria",
    status: "approved",
    price: "$30000",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop",
  },
  {
    id: "123459",
    title: "Brume Villa",
    location: "Shortlet - Lagos, Nigeria",
    status: "approved",
    price: "$30000",
    image:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=300&h=200&fit=crop",
  },
  {
    id: "123460",
    title: "Brume Villa",
    location: "Shortlet - Lagos, Nigeria",
    status: "approved",
    price: "$30000",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&h=200&fit=crop",
  },
  {
    id: "123461",
    title: "Brume Villa",
    location: "Shortlet - Lagos, Nigeria",
    status: "approved",
    price: "$30000",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop",
  },
];

interface ActionModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string | React.ReactNode;
  confirmText?: string;
  confirmColor?: string;
  children?: React.ReactNode;
  setRejectModalVisible: (visible: boolean) => void;
  setApproveModalVisible: (visible: boolean) => void;
}

const ActionModal: React.FC<ActionModalProps> = ({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  confirmColor = colors.primary,
  children,
  setRejectModalVisible,
  setApproveModalVisible,
}) => (
  <RNModal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <TouchableOpacity
          style={styles._closebtn}
          onPress={() => {
            setRejectModalVisible(false);
            setApproveModalVisible(false);
          }}
        >
          <Ionicons name="close" color={colors.error} size={16} />
        </TouchableOpacity>
        <Text weight="semiBold" style={styles.modalTitle}>
          {title}
        </Text>
        {typeof message === "string" ? (
          <Text style={styles.modalMessage}>{message}</Text>
        ) : (
          message
        )}
        {children}
        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: confirmColor }]}
            onPress={onConfirm}
          >
            <Text style={styles.confirmButtonText}>{confirmText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </RNModal>
);

export const AdminPropertyRequests: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>("name_asc");
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const [propertyRequests, setPropertyRequests] =
    useState(propertyRequestsData);
  const [selectedRequest, setSelectedRequest] = useState<{
    id: string;
    propertyId: string;
  } | null>(null);
  const [approveModalVisible, setApproveModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const navigation = useNavigation<PropertyRequestsScreenNavigationProp>();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "#F26938";
      case "approved":
        return "#0AD029";
      case "rejected":
        return "#D80027";
      default:
        return colors.primary;
    }
  };

  const handleApprove = () => {
    if (selectedRequest) {
      // Update the status of the selected request
      setPropertyRequests((prev) =>
        prev.map((req) =>
          req.id === selectedRequest.id
            ? { ...req, status: "approved" as const }
            : req
        )
      );
      setApproveModalVisible(false);
      setDropdownVisible(null);
    }
  };

  const handleReject = () => {
    if (selectedRequest && rejectionReason.trim()) {
      // Update the status and add rejection reason
      setPropertyRequests((prev) =>
        prev.map((req) =>
          req.id === selectedRequest.id
            ? {
                ...req,
                status: "rejected" as const,
                rejectionReason: rejectionReason.trim(),
              }
            : req
        )
      );
      setRejectModalVisible(false);
      setDropdownVisible(null);
      setRejectionReason("");
    }
  };

  const renderPropertyRequestCard = ({ item }: { item: any }) => (
    <View style={{ position: "relative" }}>
      <View style={styles.propertyCard}>
        <Image source={{ uri: item.images[0] }} style={styles.propertyImage} />
        <View style={styles.propertyContent}>
          <View style={styles.propertyHeader}>
            <View style={styles.propertyInfo}>
              <Text style={styles.propertyTitle}>
                {item.name}
                <Text style={styles.propertyId}>
                  {` `}({item.agents[0].code})
                </Text>
              </Text>
              <Text style={styles.propertyLocation}>{item.location}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={styles.statusRow}>
                  <Text style={styles.statusLabel}>Status: </Text>
                  <Text
                    style={[
                      styles.statusValue,
                      { color: getStatusColor(item.status) },
                    ]}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Text>
                </View>
                <Text style={styles.propertyPrice}>$30000</Text>
              </View>
            </View>
            <View style={styles.propertyActions}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() =>
                  setDropdownVisible(
                    dropdownVisible === parseInt(item.id)
                      ? null
                      : parseInt(item.id)
                  )
                }
              >
                <Entypo
                  name="dots-three-vertical"
                  size={16}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {dropdownVisible === parseInt(item.id) && (
        <View style={styles.menuBox}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              navigation.navigate("PropertyDetails", {
                propertyId: item.propertyId,
              });
              setDropdownVisible(null);
            }}
          >
            <Text style={styles.menuText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setDropdownVisible(null);
              setSelectedRequest(item);
              setApproveModalVisible(true);
            }}
          >
            <Text style={[styles.menuText]}>Mark as approved</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setSelectedRequest(item);
              setRejectModalVisible(true);
            }}
          >
            <Text style={[styles.menuText]}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
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
            Manage Properties Requests
          </Text>
        }
        rightAccessory={
          <TouchableOpacity activeOpacity={0.5}>
            <WithLocalSvg asset={Images.notofication} />
          </TouchableOpacity>
        }
      />

      {/* Property Group Label and Sort */}
      <View style={styles.listHeader}>
        <Text style={styles.propertyGroupLabel} weight="semiBold">
          Properties Requests
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
        placeholder="search property"
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
        {/* Property Requests List */}
        <FlatList
          data={rentalProperties}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={renderPropertyRequestCard}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>

      <ActionModal
        visible={approveModalVisible}
        onClose={() => setApproveModalVisible(false)}
        onConfirm={handleApprove}
        title="Are you Sure?"
        message="Are you sure you want to Approve this Property Request?"
        confirmText="Yes"
        confirmColor="#292766"
        setRejectModalVisible={setRejectModalVisible}
        setApproveModalVisible={setApproveModalVisible}
      />

      <ActionModal
        visible={rejectModalVisible}
        onClose={() => setRejectModalVisible(false)}
        onConfirm={handleReject}
        title="Reject Property Request"
        message="Please provide a reason for rejecting this property request:"
        confirmText="Reject"
        setRejectModalVisible={setRejectModalVisible}
        setApproveModalVisible={setApproveModalVisible}
      >
        <Text weight="semiBold" text="Reason of Rejection" />
        <TextInput
          style={styles.reasonInput}
          value={rejectionReason}
          onChangeText={setRejectionReason}
          placeholder="Describe Reason of Rejection"
          multiline
        />
      </ActionModal>
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
    fontSize: adjustSize(15),
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
  _input: {
    margin: 0,
    fontFamily: typography.fonts.poppins.medium,
    fontSize: adjustSize(14),
  },
  _inputview: {
    flex: 1,
    padding: 0,
  },
  list: {
    marginTop: adjustSize(12),
  },
  listContent: {
    paddingHorizontal: adjustSize(10),
    paddingBottom: adjustSize(20),
  },
  propertyCard: {
    flexDirection: "row",
    backgroundColor: colors.white,
    alignItems: "center",
    borderRadius: adjustSize(12),
    marginVertical: adjustSize(6),
    marginHorizontal: adjustSize(10),
    padding: adjustSize(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    minHeight: adjustSize(85),
    borderWidth: 0.4,
    borderColor: colors.grey,
    overflow: "visible",
    position: "relative",
    zIndex: 1,
  },
  propertyImage: {
    width: adjustSize(85),
    height: adjustSize(85),
    borderRadius: adjustSize(8),
    marginRight: adjustSize(12),
  },
  propertyContent: {
    flex: 1,
  },
  propertyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  propertyInfo: {
    flex: 1,
  },
  propertyTitle: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    marginBottom: adjustSize(2),
  },
  propertyId: {
    fontSize: adjustSize(12),
    color: colors.grey,
    fontFamily: typography.fonts.poppins.normal,
    marginBottom: adjustSize(4),
  },
  propertyLocation: {
    fontSize: adjustSize(11),
    color: colors.grey,
    fontFamily: typography.fonts.poppins.normal,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusLabel: {
    fontSize: adjustSize(10),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
  },
  statusValue: {
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.normal,
  },
  propertyActions: {
    marginLeft: "auto",
    padding: spacing.xs,
    zIndex: 2,
  },
  propertyPrice: {
    fontSize: adjustSize(15),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.bold,
  },
  menuButton: {
    padding: adjustSize(4),
  },
  menuBox: {
    position: "absolute",
    right: 10,
    top: 40,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: spacing.xs,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
    minWidth: 180,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomColor: colors.border,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuText: {
    fontSize: 14,
    color: colors.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContent: {
    backgroundColor: colors.fill,
    borderRadius: adjustSize(15),
    padding: 24,
    width: "90%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: adjustSize(18),
    marginBottom: 16,
    color: colors.text,
    textAlign: "center",
    marginTop: adjustSize(50),
  },
  modalMessage: {
    fontSize: adjustSize(14),
    marginBottom: adjustSize(22),
    color: "#292766",
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
    gap: 8,
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
    flex: 1,
  },
  cancelButton: {
    // backgroundColor: colors.#D51E1E,
    borderWidth: 1,
    borderColor: "#D51E1E",
  },
  cancelButtonText: {
    color: "#D51E1E",
  },
  confirmButtonText: {
    color: colors.white,
  },
  reasonInput: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 8,
    padding: adjustSize(12),
    minHeight: adjustSize(100),
    textAlignVertical: "top",
    marginVertical: adjustSize(5),
  },
  _closebtn: {
    height: adjustSize(20),
    width: adjustSize(20),
    borderRadius: 100,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.error,
    position: "absolute",
    right: adjustSize(15),
    top: adjustSize(15),
  },
});
