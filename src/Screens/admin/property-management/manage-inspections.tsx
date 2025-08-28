import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { Screen, Text, Header, Button } from "../../../Components";
import { colors, spacing, typography, adjustSize } from "../../../theme";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { INSEPECTION_MOCK_DATA } from "../../../utils/data";

export default function AdminManageInspections() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const [visitorList, setVisitorList] = useState(INSEPECTION_MOCK_DATA);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null
  );

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
  const handleStatusChange = () => {
    if (selectedItem === null || actionType === null) return;

    const updatedList = visitorList.map((visitor) =>
      visitor.id === selectedItem
        ? {
            ...visitor,
            status: actionType === "approve" ? "responding" : "resolved",
          }
        : visitor
    );

    setVisitorList(updatedList);
    setShowConfirmationModal(false);
    setDropdownVisible(null);

    Alert.alert(
      "Success",
      `Inspection has been ${
        actionType === "approve" ? "approved" : "rejected"
      } successfully.`,
      [{ text: "OK" }]
    );
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
            Manage Inspection
          </Text>
        }
        rightAccessory={
          <TouchableOpacity activeOpacity={0.5}>
            <WithLocalSvg asset={Images.notofication} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.listHeader}>
          <Text style={styles.propertyGroupLabel} weight="semiBold">
            Manage Inspections
          </Text>
        </View>
        {visitorList.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              dropdownVisible === item.id && styles.cardWithDropdown,
            ]}
            activeOpacity={0.8}
          >
            <Text
              weight="medium"
              style={[styles.statusText, statusLabelColor(item.status)]}
            >
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
            <View style={styles.cardHeaderRow}>
              <View style={styles.cardHeaderRow}>
                <Text weight="semiBold" style={styles.cardTitle}>
                  {item.name}
                </Text>

                {item.property ? (
                  <Text style={styles.subtitle}>{"  (P001)"}</Text>
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
                  color={colors.primary}
                />
              </TouchableOpacity>

              {dropdownVisible === item.id && (
                <View style={styles.dropdownMenu}>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      navigation.navigate("InspectionDetails", {
                        inspectionId: item.id,
                        type: "Details",
                      });
                      setDropdownVisible(null);
                    }}
                  >
                    <Text style={styles.dropdownText}>View Details</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedItem(item.id);
                      setActionType("approve");
                      setShowConfirmationModal(true);
                    }}
                  >
                    <Text style={styles.dropdownText}>Mark as Approved</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedItem(item.id);
                      setActionType("reject");
                      setShowConfirmationModal(true);
                    }}
                  >
                    <Text style={styles.dropdownText}>Reject</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      navigation.navigate("InspectionDetails", {
                        inspectionId: item.id,
                        type: "Download",
                      });
                      setDropdownVisible(null);
                    }}
                  >
                    <Text style={styles.dropdownText}>Download</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View style={styles.rowBetween}>
              <View>
                <Text weight="medium" style={styles.address}>
                  {item.address}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmationModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowConfirmationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              activeOpacity={0.7}
              onPress={() => setShowConfirmationModal(false)}
            >
              <Ionicons name="close" color={colors.error} />
            </TouchableOpacity>
            <Text weight="semiBold" style={styles.modalTitle}>
              Confirm {actionType === "approve" ? "Approval" : "Rejection"}
            </Text>

            <Text style={styles.modalMessage}>
              Are you sure you want to {actionType} this inspection property
              (Greenwood Villa)??
            </Text>

            <View style={styles.modalButtons}>
              <Button
                text="Cancel"
                preset={actionType === "approve" ? "reversed" : "reversed"}
                textStyle={styles.cancelButtonText}
                onPress={() => setShowConfirmationModal(false)}
                style={[styles.modalButtons, styles.cancelButton]}
              />
              <Button
                text={actionType === "approve" ? "Approve" : "Cancel"}
                onPress={handleStatusChange}
                preset="reversed"
                style={[styles.modalButtons, styles.confirmButton]}
              />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.fill,
  },

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
    minWidth: adjustSize(300),
    position: "relative",
    width: "80%",
  },
  closeButton: {
    top: adjustSize(16),
    right: adjustSize(16),
    zIndex: 1,
    position: "absolute",
    borderWidth: 1,
    borderColor: colors.error,
    height: adjustSize(18),
    width: adjustSize(18),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
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
    paddingVertical: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    height: adjustSize(47),
    backgroundColor: colors.error,
  },
  cancelButtonText: {
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.medium,
  },

  confirmButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: adjustSize(10),
    paddingVertical: spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },

  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: adjustSize(10),
    paddingVertical: spacing.sm,
  },
  propertyGroupLabel: {
    fontSize: adjustSize(16),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    marginTop: adjustSize(15),
  },

  listContainer: {
    flex: 1,
  },

  statusText: {
    fontSize: adjustSize(10),
    color: "#FF6B35",
    fontFamily: typography.fonts.poppins.medium,
  },

  card: {
    backgroundColor: colors.fill,
    padding: adjustSize(10),
    minHeight: adjustSize(96),
    zIndex: 1,
    shadowColor: "#000",
    borderBottomWidth: 0.4,
    borderColor: colors.grey,
    paddingVertical: adjustSize(15),
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
  },
  dropdownText: {
    marginLeft: adjustSize(8),
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
  },
  address: {
    color: colors.primaryLight,
  },
});
