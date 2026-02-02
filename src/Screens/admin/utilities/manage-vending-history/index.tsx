import React, { useState } from "react";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  ScrollView,
  Share,
  Alert,
  Platform,
} from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { adjustSize, colors, spacing, typography } from "../../../../theme";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../../assets/Images";
import {
  Text,
  Screen,
  TextField,
  Header,
  Button,
} from "../../../../Components";
import DropdownComponent from "../../../../Components/DropDown";
import { AppStackScreenProps } from "../../../../utils/interfaces";
import Entypo from "@expo/vector-icons/Entypo";
import { AdminStackParamList } from "../../../../utils/interfaces";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type NavigationProp = {
  navigate: (screen: keyof AdminStackParamList, params?: any) => void;
  goBack: () => void;
};

type TrnasData = {
  id: string;
  date: string;
  amount: string;
  type: string;
  status: string;
  token: string;
  units: string;
};

const transactionData = [
  {
    id: "1",
    date: "20 Feb , 2025",
    amount: "₦ 15,00,000",
    type: "Utility Bill Payment",
    status: "Active",
    token: "T0001",
    units: "250Kwh",
  },
  {
    id: "2",
    date: "20 Feb , 2025",
    amount: "₦ 15,00,000",
    type: "Utility Bill Payment",
    status: "Active",
    token: "T0001",
    units: "250Kwh",
  },
  {
    id: "3",
    date: "20 Feb , 2025",
    amount: "₦ 15,00,000",
    type: "Utility Bill Payment",
    status: "Active",
    token: "T0001",
    units: "250Kwh",
  },
  {
    id: "4",
    date: "20 Feb , 2025",
    amount: "₦ 15,00,000",
    type: "Utility Bill Payment",
    status: "Active",
    token: "T0001",
    units: "250Kwh",
  },
  {
    id: "5",
    date: "20 Feb , 2025",
    amount: "₦ 15,00,000",
    type: "Utility Bill Payment",
    status: "Active",
    token: "T0001",
    units: "250Kwh",
  },
];

interface AdminPropertyManagementProps extends NativeStackScreenProps<
  AdminStackParamList,
  "AdminManageVendingHistory"
> {}
export const AdminManageVendingHistory = ({
  route,
}: AdminPropertyManagementProps) => {
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState("");
  const [transactionList, setTransactionList] =
    useState<TrnasData[]>(transactionData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [type, settype] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TrnasData | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  // Handle search functionality
  const filteredTransactions = transactionList.filter(
    (transaction) =>
      transaction.date.toLowerCase().includes(search.toLowerCase()) ||
      (transaction.amount &&
        transaction.amount.toLowerCase().includes(search.toLowerCase())) ||
      (transaction.type &&
        transaction.type.toLowerCase().includes(search.toLowerCase())),
  );

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const showToastMessage = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    // You can implement a toast notification here if needed
  };

  const generateReceiptHTML = (transaction: TrnasData) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              max-width: 400px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .title {
              font-size: 24px;
              font-weight: bold;
              color: #333;
            }
            .divider {
              height: 1px;
              background-color: #eee;
              margin: 15px 0;
            }
            .row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 8px;
            }
            .label {
              color: #666;
            }
            .value {
              font-weight: 600;
            }
            .total {
              font-size: 18px;
              font-weight: bold;
              margin: 20px 0;
              display: flex;
              justify-content: space-between;
            }
            .footer {
              margin-top: 30px;
              text-align: center;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">Vending Receipt</div>
            <div>${new Date().toLocaleDateString()}</div>
          </div>
          
          <div class="divider"></div>
          
          <div class="details">
            <div class="row">
              <span class="label">Transaction ID:</span>
              <span class="value">${transaction.id}</span>
            </div>
            <div class="row">
              <span class="label">Date:</span>
              <span class="value">${transaction.date}</span>
            </div>
            <div class="row">
              <span class="label">Amount:</span>
              <span class="value">${transaction.amount}</span>
            </div>
            <div class="row">
              <span class="label">Token:</span>
              <span class="value">${transaction.token}</span>
            </div>
            <div class="row">
              <span class="label">Units:</span>
              <span class="value">${transaction.units}</span>
            </div>
          </div>
          
          <div class="divider"></div>
          
          <div class="total">
            <span>Total Amount: </span>
            <span>${transaction.amount}</span>
          </div>
          
          <div class="footer">
            Thank you for using our service!<br>
            For any inquiries, please contact support@example.com
          </div>
        </body>
      </html>
    `;
  };

  const generateAndSharePDF = async (
    action: "share" | "download" = "download",
  ) => {
    if (!selectedTransaction) return;

    try {
      // Set the appropriate loading state
      if (action === "share") {
        setIsSharing(true);
      } else {
        setIsDownloading(true);
      }

      const html = generateReceiptHTML(selectedTransaction);

      // Generate PDF
      const { uri } = await Print.printToFileAsync({
        html,
        base64: false,
        width: 612, // 8.5in in points (72 dpi)
        height: 792, // 11in in points (72 dpi)
      });

      // Small delay to ensure the PDF is fully generated
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (action === "share") {
        try {
          await Share.share({
            title: "Vending Receipt",
            message: "Here is your vending receipt",
            url: `file://${uri}`,
          });
          showToastMessage("Receipt shared successfully!");
        } catch (error) {
          showToastMessage("Sharing was cancelled", "error");
          throw error; // Re-throw to prevent modal from closing on cancel
        }
      } else {
        // For download, we'll use the system's save dialog
        await Share.share({
          title: "Save Vending Receipt",
          message: "Save your vending receipt",
          url: `file://${uri}`,
        });
        showToastMessage("Receipt is ready to be saved!");
      }

      // Close the modal after successful operation
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error handling PDF:", error);
      showToastMessage(
        `Failed to ${action} receipt. Please try again.`,
        "error",
      );
    } finally {
      // Reset the appropriate loading state
      if (action === "share") {
        setIsSharing(false);
      } else {
        setIsDownloading(false);
      }
    }
  };

  const handleDownloadReceipt = () => generateAndSharePDF("download");
  const handleShareReceipt = () => generateAndSharePDF("share");

  return (
    <Screen
      contentContainerStyle={styles.container}
      preset="fixed"
      safeAreaEdges={["top"]}
    >
      <Header
        leftAccessory={
          <TouchableOpacity
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
            text="Vending History"
            weight="semiBold"
            style={{ fontSize: adjustSize(15), color: colors.primary }}
          />
        }
        rightAccessory={
          <TouchableOpacity style={styles.headerIcons} activeOpacity={0.6}>
            <WithLocalSvg asset={Images.notofication} />
          </TouchableOpacity>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles._topdropdown}>
          <DropdownComponent
            data={[
              { label: "102", value: "102" },
              { label: "103", value: "103" },
              { label: "104", value: "104" },
            ]}
            label="Select Period"
            placeholder="Sort by"
            dropdownStyle={{ backgroundColor: colors.primary }}
          />
        </View>

        {/* Recent Notifications */}
        <View style={styles.section}>
          <View style={styles._seciton_row}>
            <Text weight="semiBold" style={styles.sectionTitle}>
              Vending History
            </Text>
            <View style={styles.dropdownContainer}>
              <DropdownComponent
                data={[
                  { label: "A", value: "A" },
                  { label: "B", value: "B" },
                  { label: "C", value: "C" },
                ]}
                label="Select Period"
                placeholder="Sort by"
                dropdownStyle={styles.customDropdownStyle}
                placeholderStyle={styles.customPlaceholderStyle}
                selectedTextStyle={styles.customSelectedTextStyle}
              />
            </View>
          </View>
          {/* ÷÷ */}
        </View>

        {/* Search Bar */}
        <View style={styles._searchrow}>
          <View style={styles._inputview}>
            <TextField
              placeholderTextColor={colors.primaryLight}
              placeholder="Search"
              style={styles._input}
              value={search}
              onChangeText={(text) => setSearch(text as string)}
              inputWrapperStyle={{ backgroundColor: colors.white }}
            />
          </View>
        </View>

        {/* Transaction List */}
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles._card}>
              <View style={styles._cardinfo}>
                <Text
                  weight="semiBold"
                  text="Electricity"
                  style={styles._price}
                />
                <Text text="20 Feb , 2025" style={styles._date} />
              </View>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() =>
                  setDropdownVisible(
                    dropdownVisible === parseInt(item.id)
                      ? null
                      : parseInt(item.id),
                  )
                }
              >
                <Entypo
                  name="dots-three-vertical"
                  size={16}
                  color={colors.primary}
                />
                <Text
                  weight="semiBold"
                  text="15,00,000"
                  style={styles._price}
                />
              </TouchableOpacity>
              {dropdownVisible === parseInt(item.id) && (
                <View style={styles.menuBox}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => {
                      settype("view");
                      setDropdownVisible(null);
                      setIsModalVisible(true);
                    }}
                  >
                    <Text style={styles.menuText}>View Details</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => {
                      setSelectedTransaction(item);
                      settype("download");
                      setDropdownVisible(null);
                      setIsModalVisible(true);
                    }}
                  >
                    <Text style={styles.menuText}>Download</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <Ionicons
                name="close-circle"
                size={adjustSize(40)}
                color={colors.error}
              />
            </TouchableOpacity>
            <Text style={styles.modalText}>
              {type === "view" ? "Vending Information" : "Vending Receipt"}
              {/* Vending Information */}
            </Text>
            <Text
              text="On February 20, 2025 at 09:06 am"
              style={styles._subtitle}
            />
            <View style={styles._divider} />
            <Text text="Amount" style={styles._label} />
            <Text
              weight="semiBold"
              text="₦ 15,00,000"
              style={[styles.amount, { lineHeight: 26 }]}
            />

            <View style={styles._divider} />
            <View style={styles._row}>
              <Text text="Token: " style={styles._rowlabel} />
              <Text text="T0001" style={styles._rowvalue} />
            </View>
            <View style={styles._row}>
              <Text text="Units: " style={styles._rowlabel} />
              <Text text="250Kwh" style={styles._rowvalue} />
            </View>

            <View style={styles._row}>
              <Text text="Utility Type:" style={styles._rowlabel} />
              <Text text="Electric" style={styles._rowvalue} />
            </View>

            <View style={styles._row}>
              <Text text="Tenant:" style={styles._rowlabel} />
              <Text text="John Doe" style={styles._rowvalue} />
            </View>

            <View style={styles._row}>
              <Text text="Property Group:" style={styles._rowlabel} />
              <Text text="Apartment" style={styles._rowvalue} />
            </View>

            <View style={styles._row}>
              <Text text="Property Name/ ID:" style={styles._rowlabel} />
              <Text text="B1234556" style={styles._rowvalue} />
            </View>

            <View
              style={[
                styles._row,
                {
                  marginBottom: type === "view" ? 20 : 10,
                },
              ]}
            >
              <Text text="Meter Number:" style={styles._rowlabel} />
              <Text text="MTR34556" style={styles._rowvalue} />
            </View>

            {type === "download" && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 10,
                  gap: 10,
                }}
              >
                <Button
                  text={isDownloading ? "Processing..." : "Download Receipt"}
                  preset="reversed"
                  style={{ flex: 1 }}
                  onPress={handleDownloadReceipt}
                  disabled={isDownloading}
                />

                {/* <Button
                  text={isSharing ? "Sharing..." : "Share"}
                  preset="reversed"
                  style={{ flex: 1 }}
                  onPress={handleShareReceipt}
                  disabled={isSharing}
                /> */}
              </View>
            )}
          </View>
        </View>
      </Modal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: adjustSize(15),
    borderBottomWidth: 0.5,
    borderColor: colors.primary,
    marginBottom: adjustSize(3),
    paddingHorizontal: adjustSize(10),
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 16,
  },

  section: {
    marginHorizontal: adjustSize(10),
  },
  sectionTitle: {
    fontSize: adjustSize(15),
    color: colors.primary,
  },

  headerinfo: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  _welcomtext: {
    color: colors.grey,
    fontSize: adjustSize(10),
    lineHeight: adjustSize(12),
  },

  _seciton_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownContainer: {
    width: adjustSize(120),
  },
  customDropdownStyle: {
    height: adjustSize(33),
    borderRadius: adjustSize(100),
    backgroundColor: colors.primary,
  },
  customPlaceholderStyle: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
  customSelectedTextStyle: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
  _searchrow: {
    flexDirection: "row",
    marginHorizontal: adjustSize(10),
    marginVertical: adjustSize(15),
  },
  _addbtn: {
    backgroundColor: colors.primary,
    width: adjustSize(40),
    height: adjustSize(40),
    borderRadius: adjustSize(8),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: adjustSize(10),
  },
  _input: {
    margin: 0,
    fontFamily: typography.fonts.poppins.medium,
    fontSize: adjustSize(14),
  },
  _inputview: {
    flex: 1,
  },
  list: {
    marginTop: adjustSize(12),
  },
  listContent: {
    paddingBottom: 50,
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
  statusContainer: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  statusText: {
    fontSize: adjustSize(10),
    color: "#FF6B35",
    fontFamily: typography.fonts.poppins.medium,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  modalText: {
    textAlign: "center",
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
    color: colors.primary,
    padding: adjustSize(20),
    marginTop: adjustSize(30),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: "100%",
  },
  input: {
    flex: 1,
    fontSize: adjustSize(16),
    color: colors.text,
    height: adjustSize(47),
  },
  copyButton: {
    width: "90%",
    margin: adjustSize(20),
    alignSelf: "center",
  },
  _card: {
    borderBottomWidth: 0.6,
    borderColor: colors.grey,
    padding: adjustSize(10),
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: colors.white,
    marginHorizontal: adjustSize(10),
    borderRadius: 10,
    marginBottom: 15,
  },
  _cardinfo: {
    flex: 1,
    paddingHorizontal: adjustSize(10),
  },
  _date: {
    color: "#7E7E7E",
    fontSize: adjustSize(10),
  },
  _price: {
    color: "#292766",
    paddingVertical: adjustSize(5),
    fontSize: adjustSize(14),
  },
  _type: {
    color: colors.primary,
    fontSize: adjustSize(10),
  },
  menuButton: {
    padding: adjustSize(4),
    alignItems: "flex-end",
  },
  menuBox: {
    position: "absolute",
    right: 10,
    top: 0,
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
    alignSelf: "flex-end",
  },
  menuItem: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderBottomColor: colors.border,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuText: {
    fontSize: adjustSize(14),
    color: colors.text,
  },
  _subtitle: {
    color: "#4CAF50",
    fontSize: adjustSize(12),
    textAlign: "center",
  },
  _divider: {
    borderBottomWidth: 0.5,
    borderColor: colors.grey,
    marginVertical: adjustSize(20),
  },
  _label: {
    color: "#7E7E7E",
    fontSize: adjustSize(12),
    textAlign: "center",
    paddingVertical: adjustSize(5),
  },
  amount: {
    textAlign: "center",
    fontSize: adjustSize(20),
  },
  _row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: adjustSize(20),
  },
  _rowlabel: {
    color: colors.primary,
    fontSize: adjustSize(12),
    textAlign: "center",
    paddingVertical: adjustSize(5),
  },
  _rowvalue: {
    color: "#7E7E7E",
    fontSize: adjustSize(12),
    textAlign: "center",
    paddingVertical: adjustSize(5),
  },
  _topdropdown: {
    padding: adjustSize(10),
  },
});
