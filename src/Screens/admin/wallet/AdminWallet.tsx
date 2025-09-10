import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  TextInput,
  Platform,
} from "react-native";
import { Screen, Text, Button, SearchBar } from "../../../Components";
import { Header2 as Header } from "../../../Components/Header-2";
import { adjustSize, colors, spacing, typography } from "../../../theme";
import { Images } from "../../../assets/Images";
import { Ionicons } from "@expo/vector-icons";
import DropdownComponent from "../../../Components/DropDown";

// Sample transaction data
const transactionsData = [
  {
    id: "T2025001",
    type: "debit",
    amount: 1000,
    date: "2025-06-24",
    description: "Booking Payment",
    status: "pending",
    userType: "Agent",
    userId: "U123",
    activity: "Booking",
  },
  {
    id: "T2025002",
    type: "credit",
    amount: 1500,
    date: "2025-06-20",
    description: "Rent Payment",
    status: "Successfull",
    userType: "Tenant",
    userId: "U124",
    activity: "Rent",
  },
  {
    id: "T2025003",
    type: "debit",
    amount: 1000,
    date: "2025-06-24",
    description: "Booking Payment",
    status: "pending",
    userType: "Agent",
    userId: "U125",
    activity: "Booking",
  },
  {
    id: "T2025004",
    type: "credit",
    amount: 2000,
    date: "2025-06-22",
    description: "Service Fee",
    status: "Successfull",
    userType: "Tenant",
    userId: "U126",
    activity: "Service",
  },
];

const { width } = Dimensions.get("window");

export const AdminWallet = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<View>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [transactions] = useState(transactionsData);

  // Filter transactions based on search and selected filter
  const filteredTransactions = transactions.filter(transaction => {
    const searchTerm = search.toLowerCase();
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchTerm) ||
      transaction.id.toLowerCase().includes(searchTerm) ||
      transaction.amount.toString().includes(search) ||
      transaction.userType.toLowerCase().includes(searchTerm) ||
      transaction.activity.toLowerCase().includes(searchTerm);
    
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "credit" && transaction.type === "credit") ||
                         (selectedFilter === "debit" && transaction.type === "debit");
    
    return matchesSearch && matchesFilter;
  });

  const handleViewTransaction = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowTransactionModal(true);
  };

  const renderTransactionMenu = (transactionId: string) => {
    const transaction = transactions.find((t) => t.id === transactionId);
    return (
      <View style={{ position: "relative" }}>
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            setShowTransactionMenu(
              showTransactionMenu === transactionId ? null : transactionId
            );
          }}
        >
          <Ionicons
            name="ellipsis-vertical"
            size={20}
            color={colors.palette.neutral600}
          />
        </TouchableOpacity>
        {showTransactionMenu === transactionId && (
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setShowTransactionMenu(null);
                if (transaction) {
                  handleViewTransaction(transaction);
                }
              }}
            >
              <Text>View Details</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const [showTransactionMenu, setShowTransactionMenu] = useState<string | null>(
    null
  );
  const menuRefs = useRef<{ [key: string]: any }>({});

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Successfull":
        return { bg: "#91c68f", text: "#008001" };
      case "pending":
        return { bg: "#f4e4dc", text: "#ff7903" };
      case "failed":
        return { bg: "#f5c67d", text: "#FF4757" };
      default:
        return { bg: "rgba(206, 214, 224, 0.2)", text: "#CED6E0" };
    }
  };

  const handleTransactionMenu = (transactionId: string, event: any) => {
    event.stopPropagation();
    setShowTransactionMenu(
      showTransactionMenu === transactionId ? null : transactionId
    );
  };

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top", "bottom"]}
    >
      <TouchableWithoutFeedback
        onPress={() => setShowTransactionMenu(null)}
        style={StyleSheet.absoluteFill}
      >
        <View style={{ flex: 1 }}>
          {/* This empty view is needed for the touchable to work */}
        </View>
      </TouchableWithoutFeedback>
      <Header title="Wallet" />

      <SearchBar
        placeholder="Search transactions..."
        value={search}
        onChangeText={setSearch}
        hideBtn={true}
      />

      <DropdownComponent
        data={[
          { label: "All Transactions", value: "all" },
          { label: "Credits", value: "credit" },
          { label: "Debits", value: "debit" },
        ]}
        placeholder="Filter transactions"
        dropdownStyle={styles.dropdown}
        value={selectedFilter}
        onChangeValue={setSelectedFilter}
      />

      {showMenu && (
        <TouchableWithoutFeedback onPress={() => setShowMenu(false)}>
          <Animated.View
            style={[styles.menuOverlay, { opacity: fadeAnim }]}
            pointerEvents={showMenu ? "auto" : "none"}
          >
            <View
              ref={menuRef}
              style={[
                styles.menuContainer,
                {
                  top: menuPosition.y,
                  left:
                    menuPosition.x > width - 200 ? width - 220 : menuPosition.x,
                  opacity: fadeAnim,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  // Handle view statement
                  setShowMenu(false);
                }}
              >
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color={colors.palette.primary}
                />
                <Text style={styles.menuText}>View Statement</Text>
              </TouchableOpacity>
              <View style={styles.menuDivider} />
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}

      <ScrollView style={styles.container}>
        {/* Recent Transactions */}
        <View style={styles.section}>
          {filteredTransactions.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="search" size={48} color={colors.palette.neutral400} />
              <Text style={styles.emptyStateText}>No transactions found</Text>
              <Text style={styles.emptyStateSubtext}>Try adjusting your search or filter</Text>
            </View>
          ) : (
            filteredTransactions.map((transaction) => {
            const statusColor = getStatusColor(transaction.status);
            return (
              <TouchableOpacity
              activeOpacity={0.7}
                key={transaction.id}
                style={styles.transactionItem}
                onPress={() => handleViewTransaction(transaction)}
              >
                <View
                  style={[
                    styles.transactionIcon,
                    {
                      backgroundColor:
                        transaction.type === "credit"
                          ? "rgba(76, 209, 55, 0.1)"
                          : "rgba(255, 71, 87, 0.1)",
                    },
                  ]}
                >
                  <Ionicons
                    name={
                      transaction.type === "credit" ? "arrow-down" : "arrow-up"
                    }
                    size={20}
                    color={
                      transaction.type === "credit" ? "#4CD137" : "#FF4757"
                    }
                  />
                </View>
                <View style={styles.transactionDetails}>
                  <View style={styles.transactionHeader}>
                    <Text style={styles.transactionTitle} numberOfLines={1}>
                      {transaction.description}
                    </Text>
                    <Text
                      style={[
                        styles.transactionAmount,
                        {
                          color:
                            transaction.type === "credit"
                              ? "#4CD137"
                              : "#FF4757",
                        },
                      ]}
                    >
                      {transaction.type === "credit" ? "+" : "-"}₦
                      {transaction.amount.toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                      })}
                    </Text>
                  </View>
                  <View style={styles.transactionFooter}>
                    <Text style={styles.transactionDate}>
                      {new Date(transaction.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Text>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor: statusColor.bg,
                        },
                      ]}
                    >
                      <Text
                        style={[styles.statusText, { color: statusColor.text }]}
                      >
                        {transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)}
                      </Text>
                    </View>
                  </View>
                </View>
                {renderTransactionMenu(transaction.id)}
              </TouchableOpacity>
            );
          }))}
        </View>
      </ScrollView>

      {/* Transaction Details Modal */}
      <Modal
        visible={showTransactionModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowTransactionModal(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: "90%",
              maxWidth: 400,
              backgroundColor: "white",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text
                weight="semiBold"
                style={{
                  fontSize: 18,
                }}
              >
                Transaction Details
              </Text>
              <TouchableOpacity onPress={() => setShowTransactionModal(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {selectedTransaction && (
              <ScrollView>
                <View style={{ marginBottom: 15 }}>
                  <Text style={{ fontWeight: "600", marginBottom: 10 }}>
                    Transaction Information
                  </Text>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Transaction ID:</Text>
                    <Text style={styles.detailValue}>
                      {selectedTransaction.id}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Date:</Text>
                    <Text style={styles.detailValue}>
                      {new Date(selectedTransaction.date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Activity:</Text>
                    <Text style={styles.detailValue}>
                      {selectedTransaction.activity}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Amount:</Text>
                    <Text
                      style={[
                        { fontWeight: "600" },
                        {
                          color:
                            selectedTransaction.type === "credit"
                              ? "#4CD137"
                              : "#FF4757",
                        },
                      ]}
                    >
                      {selectedTransaction.type === "credit" ? "+" : "-"}₦
                      {selectedTransaction.amount.toLocaleString("en-NG")}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Status:</Text>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor: getStatusColor(
                            selectedTransaction.status
                          ).bg,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          color: getStatusColor(selectedTransaction.status)
                            .text,
                          fontSize: 12,
                          fontWeight: "600",
                        }}
                      >
                        {selectedTransaction.status}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{ marginBottom: 15 }}>
                  <Text style={{ fontWeight: "600", marginBottom: 10 }}>
                    User Information
                  </Text>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>User Type:</Text>
                    <Text style={styles.detailValue}>
                      {selectedTransaction.userType}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>User ID:</Text>
                    <Text style={styles.detailValue}>
                      {selectedTransaction.userId}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 20,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      padding: 12,
                      borderWidth: 1,
                      borderColor: "#ddd",
                      borderRadius: 8,
                      marginRight: 10,
                      alignItems: "center",
                      backgroundColor: colors.primary,
                    }}
                    onPress={() => setShowTransactionModal(false)}
                  >
                    <Text style={{ color: colors.white }}>Close</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screenContentContainer: {
    // flex: 1,
  },
  container: {
    padding: 10,
    // flex: 1,
  },

  balanceLabel: {
    fontSize: 14,
    color: colors.palette.neutral500,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
  },
  balanceFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: colors.palette.neutral200,
  },
  balanceChange: {
    flex: 1,
    alignItems: "center",
  },
  balanceChangeText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },
  balanceChangeLabel: {
    fontSize: 12,
    color: colors.palette.neutral500,
    marginTop: 2,
  },
  balanceDivider: {
    width: 1,
    backgroundColor: colors.palette.neutral200,
  },

  transactionDetails: {
    flex: 1,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
    flex: 1,
  },

  transactionFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionDate: {
    fontSize: 12,
    color: colors.palette.neutral500,
  },

  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.palette.neutral300,
  },

  searchBar: {
    margin: spacing.md,
    marginBottom: 0,
  },
  dropdown: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.palette.neutral300,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    marginTop: spacing.xl,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.palette.neutral500,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  menuOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  menuContainer: {
    position: "absolute",
    backgroundColor: colors.palette.neutral100,
    borderRadius: 8,
    // paddingVertical: 8,
    width: 140,
    shadowColor: colors.palette.neutral800,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1001,
    top: -10,
    right: 18,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    zIndex: -1,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.palette.neutral300,
    marginVertical: 4,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 14,
    color: colors.palette.neutral800,
  },

  balanceContainer: {
    backgroundColor: colors.palette.primary,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },

  balanceActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 10,
    borderRadius: 8,
  },
  withdrawButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.palette.primary,
  },
  actionButtonText: {
    color: colors.white,
    marginLeft: 6,
    fontWeight: "600",
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  seeAllText: {
    color: colors.palette.primary,
    fontSize: 14,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  transactionAmountContainer: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    // alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  centeredModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  centeredModalContent: {
    backgroundColor: colors.fill,
    borderRadius: 16,
    padding: spacing.lg,
    width: "100%",
    maxWidth: 480,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
  },
  transactionDetailsContent: {
    flex: 1,
    marginBottom: spacing.lg,
  },
  detailSection: {
    marginBottom: spacing.lg,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 12,
    padding: spacing.md,
  },
  detailSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.palette.primary,
    marginBottom: spacing.md,
  },
  menuButton: {
    padding: 8,
    marginLeft: 8,
    position: "relative",
  },
  transactionMenu: {
    position: "absolute",
    top: "100%",
    backgroundColor: colors.palette.neutral100,
    borderRadius: 8,
    paddingVertical: 4,
    minWidth: 160,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 100,
  },
  transactionMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  transactionMenuText: {
    marginLeft: 12,
    fontSize: 14,
    color: colors.palette.neutral800,
  },
  amountValue: {
    fontSize: 18,
    fontWeight: "600",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.md,
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 14,
    color: colors.palette.neutral600,
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
  },
  modalActions: {
    flexDirection: "row",
    marginTop: spacing.xl,
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    backgroundColor: colors.palette.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    flexDirection: "row",
  },

  primaryButtonText: {
    color: colors.white,
    fontWeight: "600",
  },
  secondaryButtonText: {
    color: colors.text,
    fontWeight: "600",
  },
});

export default AdminWallet;
