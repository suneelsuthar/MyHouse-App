import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { Screen, Text, Header2, SearchBar } from "../../../../Components";
import { colors, spacing, typography, adjustSize } from "../../../../theme";
import moment from "moment";
import Entypo from "@expo/vector-icons/Entypo";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import DropdownComponent from "../../../../Components/DropDown";
// import DropdownComponent from "react-native-element-dropdown/lib/typescript/components/Dropdown";
interface TenantRequest {
  id: number;
  name: string;
  property: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
  type: string;
  rejectionReason?: string;
}

export function TenantsRequests() {
  const navigation = useNavigation();

  // State management
  const [visibleMenuIndex, setVisibleMenuIndex] = useState<number | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<TenantRequest | null>(
    null
  );
  const [rejectionReason, setRejectionReason] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState<TenantRequest[]>([
    {
      id: 1,
      name: "John Doe",
      property: "123 Main St",
      date: "2025-08-20T09:15:32+05:00",
      status: "Pending",
      type: "Move In",
    },
    {
      id: 2,
      name: "Jane Smith",
      property: "456 Oak Ave",
      date: "2025-08-18T14:42:11+05:00",
      status: "Approved",
      type: "Move Out",
    },
    {
      id: 3,
      name: "Bob Johnson",
      property: "789 Pine St",
      date: "2025-08-16T19:08:45+05:00",
      status: "Rejected",
      type: "Maintenance",
      rejectionReason: "Maintenance not covered",
    },
    {
      id: 4,
      name: "Liam Johnson",
      property: "Villa",
      date: "2025-08-16T19:08:45+05:00",
      status: "Pending",
      type: "Move Out",
    },
    {
      id: 5,
      name: "Olivia Brown",
      property: "Town House",
      date: "2025-08-14T08:27:59+05:00",
      status: "Pending",
      type: "Maintenance",
    },
    {
      id: 6,
      name: "Noah Wilson",
      property: "Cottage",
      date: "2025-08-12T16:54:22+05:00",
      status: "Pending",
      type: "Move In",
    },
    {
      id: 7,
      name: "Ava Smith",
      property: "Farm House",
      date: "2025-08-10T11:36:07+05:00",
      status: "Pending",
      type: "Move In",
    },
  ]);

  // Handle menu visibility toggle
  const handleManageRequest = (request: TenantRequest, index: number) => {
    setSelectedRequest(request);
    setShowRequestModal(true);
    setVisibleMenuIndex(null);
  };

  const handleApprove = () => {
    if (!selectedRequest) return;

    // Update the status in the data array
    setData((prevData) =>
      prevData.map((item) =>
        item.id === selectedRequest.id ? { ...item, status: "Approved" } : item
      )
    );
    setShowRequestModal(false);
    setSelectedRequest(null);
  };

  const handleReject = () => {
    if (!selectedRequest) {
      Alert.alert("Error", "Please provide a reason for rejection");
      return;
    }

    // Update the status and rejection reason in the data array
    setData((prevData) =>
      prevData.map((item) =>
        item.id === selectedRequest.id
          ? {
              ...item,
              status: "Rejected",
              rejectionReason: rejectionReason.trim(),
            }
          : item
      )
    );
    setRejectionReason("");
    setSelectedRequest(null);
    setShowRequestModal(false);
  };

  // Get status color based on status value
  const getStatusColor = (status: string) => {
    switch ((status || "").toLowerCase()) {
      case "approved":
        return "#4CAF50";
      case "rejected":
        return "#F44336";
      case "pending":
        return "#FFC107";
      default:
        return colors.textDim;
    }
  };

  // Filter data based on search input
  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    const searchTerm = search.toLowerCase();
    return data.filter(
      (item) =>
        item.name?.toLowerCase().includes(searchTerm) ||
        item.property?.toLowerCase().includes(searchTerm) ||
        item.status?.toLowerCase().includes(searchTerm) ||
        item.type?.toLowerCase().includes(searchTerm)
    );
  }, [data, search]);

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header2 title="Tenants" onNotificationPress={() => {}} />
      <SearchBar
        value={search}
        onChangeText={setSearch}
        hideBtn
        placeholder="Search by name, property, or status"
      />
      <View style={styles.section}>
        <View style={styles._seciton_row}>
          <Text weight="semiBold" style={styles.sectionTitle}>
            Tenants Requests
          </Text>
          <View style={styles.dropdownContainer}>
            <DropdownComponent
              data={[
                { label: "A", value: "A" },
                { label: "B", value: "B" },
                { label: "C", value: "C" },
              ]}
              placeholder="Sort by"
              dropdownStyle={styles.customDropdownStyle}
              placeholderStyle={styles.customPlaceholderStyle}
              selectedTextStyle={styles.customSelectedTextStyle}
            />
          </View>
        </View>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          const isMenuVisible = visibleMenuIndex === index;

          return (
            <View
              style={[
                styles.card,
                {
                  backgroundColor: index % 2 === 0 ? "#dedff0" : "transparent",
                },
              ]}
            >
              <View style={styles.profileMain}>
                <Text style={styles.profileName}>{item.name.slice(0, 1)}</Text>
              </View>

              <View style={styles.data}>
                <Text style={styles.name} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.property} numberOfLines={1}>
                  Property:{" "}
                  <Text
                    style={[
                      styles.property,
                      { fontFamily: typography.fonts.poppins.normal },
                    ]}
                  >
                    {item.property}
                  </Text>
                </Text>

                <Text style={styles.date} numberOfLines={1}>
                  Status:{" "}
                  <Text
                    style={[
                      styles.date,
                      {
                        fontFamily: typography.fonts.poppins.normal,
                        color: getStatusColor(item.status),
                      },
                    ]}
                  >
                    {item.status}
                  </Text>
                </Text>
              </View>

              <View>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() =>
                    setVisibleMenuIndex(
                      isMenuVisible ? null : index // toggle
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

              {isMenuVisible && (
                <>
                  {/* Transparent overlay */}
                  <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={() => setVisibleMenuIndex(null)}
                  />

                  {/* Menu box */}
                  <View style={styles.menuBox}>
                    {["Manage Requests"].map((a, i) => (
                      <TouchableOpacity
                        key={a}
                        onPress={() => handleManageRequest(item, i)}
                        style={styles.menuItem}
                        activeOpacity={0.6}
                      >
                        <Text style={styles.menuText}>{a}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}
            </View>
          );
        }}
      />

      <Modal
        visible={showRequestModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowRequestModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Manage Request</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowRequestModal(false)}
              >
                <Ionicons name="close" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.requestInfo}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Resident Name:</Text>
                <Text style={styles.infoValue}>Jane Smith</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Resident ID:</Text>
                <Text style={styles.infoValue}>AG67890</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Property Name:</Text>
                <Text style={styles.infoValue}>456 Oak Avenue</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Property ID:</Text>
                <Text style={styles.infoValue}>R1234</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Property Group:</Text>
                <Text style={styles.infoValue}>Brume Group</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Status:</Text>
                <Text
                  style={[
                    styles.statusValue,
                    {
                      color: getStatusColor(
                        selectedRequest?.status || "Pending"
                      ),
                    },
                  ]}
                >
                  {selectedRequest?.status || "Pending"}
                </Text>
              </View>
            </View>

            <View style={styles.actionButtons}>
              {(selectedRequest?.status === "Pending" ||
                selectedRequest?.status === "Rejected") && (
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    { backgroundColor: colors.primary },
                  ]}
                  onPress={handleApprove}
                >
                  <Text style={styles.buttonText}>Approve</Text>
                </TouchableOpacity>
              )}

              {(selectedRequest?.status === "Pending" ||
                selectedRequest?.status === "Approved") && (
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: "#F44336" }]}
                  onPress={() => {
                    if (rejectionReason === "") {
                      setRejectionReason(" "); // Set to space to show the input
                    } else {
                      handleReject();
                    }
                  }}
                >
                  <Text style={styles.buttonText}>
                    {rejectionReason === "" ? "Reject" : "Confirm Reject"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  section: {
    marginHorizontal: adjustSize(10),
    marginTop: adjustSize(8),
  },
  sectionTitle: {
    fontSize: adjustSize(15),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  _seciton_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: adjustSize(10),
    marginBottom: adjustSize(20),
  },
  dropdownContainer: {
    width: adjustSize(120),
  },
  customDropdownStyle: {
    height: adjustSize(33),
    borderRadius: adjustSize(100),
    backgroundColor: "#6369A4",
  },
  customPlaceholderStyle: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.normal,
  },
  customSelectedTextStyle: {
    fontSize: adjustSize(12),
    color: colors.grey,
    fontFamily: typography.fonts.poppins.normal,
  },
  card: {
    paddingVertical: adjustSize(15),
    paddingHorizontal: adjustSize(10),
    flexDirection: "row",
    position: "relative",
  },
  profileMain: {
    backgroundColor: colors.white,
    height: adjustSize(40),
    width: adjustSize(40),
    borderRadius: 100,
    elevation: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileName: {
    color: colors.black,
    fontSize: adjustSize(26),
    fontFamily: typography.fonts.poppins.semiBold,
    lineHeight: adjustSize(36),
  },
  data: {
    flex: 1,
    marginHorizontal: adjustSize(15),
  },
  name: {
    color: colors.primaryLight,
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
    marginTop: adjustSize(5),
  },
  property: {
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.semiBold,
    marginTop: adjustSize(7),
  },
  date: {
    color: colors.primary,
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.medium,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    zIndex: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: adjustSize(20),
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: adjustSize(10),
    padding: adjustSize(20),
    width: "100%",
    maxWidth: adjustSize(400),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: adjustSize(20),
  },
  modalTitle: {
    fontSize: adjustSize(18),
    fontFamily: typography.fonts.poppins.semiBold,
    color: colors.primary,
  },
  closeButton: {
    padding: adjustSize(5),
  },
  requestInfo: {
    marginBottom: adjustSize(20),
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: adjustSize(10),
  },
  infoLabel: {
    fontSize: adjustSize(13),
    fontFamily: typography.fonts.poppins.medium,
    color: colors.primary,
  },
  infoValue: {
    fontSize: adjustSize(13),
    fontFamily: typography.fonts.poppins.normal,
    color: colors.primary,
    textAlign: "right",
    flex: 1,
    marginLeft: adjustSize(10),
  },
  statusValue: {
    fontSize: adjustSize(13),
    fontFamily: typography.fonts.poppins.medium,
  },

  menuBox: {
    position: "absolute",
    right: adjustSize(10),
    top: adjustSize(36),
    backgroundColor: colors.white,
    borderRadius: adjustSize(8),
    elevation: 5,
    padding: adjustSize(10),
    zIndex: 10,
  },
  menuItem: {
    paddingVertical: adjustSize(8),
    paddingHorizontal: adjustSize(15),
  },
  menuText: {
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
    color: colors.primary,
  },
  sectionContainer: {
    borderRadius: adjustSize(8),
    padding: adjustSize(12),
    backgroundColor: colors.white,
    marginBottom: adjustSize(10),
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: adjustSize(15),
    gap: adjustSize(10),
  },
  actionButton: {
    flex: 1,
    padding: adjustSize(12),
    borderRadius: adjustSize(8),
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colors.white,
    fontFamily: typography.fonts.poppins.semiBold,
    fontSize: adjustSize(14),
  },
  rejectionContainer: {
    marginTop: adjustSize(15),
  },
  rejectionLabel: {
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.medium,
    color: colors.primary,
    marginBottom: adjustSize(5),
  },
  rejectionInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: adjustSize(5),
    padding: adjustSize(10),
    minHeight: adjustSize(80),
    textAlignVertical: "top",
    fontFamily: typography.fonts.poppins.normal,
    fontSize: adjustSize(14),
    backgroundColor: colors.background,
  },
  cancelButton: {
    marginTop: adjustSize(15),
    padding: adjustSize(10),
    alignItems: "center",
  },
  cancelButtonText: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    fontSize: adjustSize(14),
  },
});
