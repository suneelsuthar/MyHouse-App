import React, { useState } from "react";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Alert,
  Platform,
  Share,
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
    type: "Electric",
    status: "Active",
    token: "T0001",
    units: "250Kwh",
  },
  {
    id: "2",
    date: "20 Feb , 2025",
    amount: "₦ 15,00,000",
    type: "Electric",
    status: "Active",
    token: "T0001",
    units: "250Kwh",
  },
  {
    id: "3",
    date: "20 Feb , 2025",
    amount: "₦ 15,00,000",
    type: "Electric",
    status: "Active",
    token: "T0001",
    units: "250Kwh",
  },
  {
    id: "4",
    date: "20 Feb , 2025",
    amount: "₦ 15,00,000",
    type: "Electric",
    status: "Active",
    token: "T0001",
    units: "250Kwh",
  },
  {
    id: "5",
    date: "20 Feb , 2025",
    amount: "₦ 15,00,000",
    type: "Electric",
    status: "Active",
    token: "T0001",
    units: "250Kwh",
  },
];

interface AdminPropertyManagementProps extends NativeStackScreenProps<
  AdminStackParamList,
  "ManageTransactions"
> {}
export const ManageTransactions = ({ route }: AdminPropertyManagementProps) => {
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState("");
  const [selectedTransaction, setSelectedTransaction] =
    useState<TrnasData | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [transactionList, setTransactionList] =
    useState<TrnasData[]>(transactionData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const [actionType, setActionType] = useState<string>("");
  const generateReceiptHTML = (transaction: any) => {
    // Format date for receipt
    const receiptDate = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              padding: 25px;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
            }
            .header { 
              text-align: center; 
              margin-bottom: 25px;
              padding-bottom: 15px;
              border-bottom: 2px solid #f0f0f0;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #2c3e50;
              margin-bottom: 5px;
            }
            .title { 
              font-size: 20px; 
              font-weight: bold; 
              margin: 15px 0 5px;
              color: #2c3e50;
            }
            .receipt-number {
              color: #7f8c8d;
              margin-bottom: 20px;
              font-size: 14px;
            }
            .section {
              margin: 20px 0;
            }
            .section-title {
              font-weight: bold;
              font-size: 16px;
              margin-bottom: 10px;
              color: #2c3e50;
              border-bottom: 1px solid #eee;
              padding-bottom: 5px;
            }
            .row { 
              display: flex; 
              justify-content: space-between; 
              margin: 8px 0;
              font-size: 14px;
            }
            .label { 
              color: #7f8c8d;
              min-width: 180px;
            }
            .value { 
              font-weight: 500;
              text-align: right;
              flex: 1;
            }
            .divider { 
              border-top: 1px dashed #ddd; 
              margin: 20px 0;
            }
            .total {
              font-size: 18px;
              font-weight: bold;
              color: #2c3e50;
              margin: 15px 0;
            }
            .footer { 
              margin-top: 40px; 
              text-align: center; 
              color: #7f8c8d; 
              font-size: 12px;
              border-top: 1px solid #eee;
              padding-top: 15px;
            }
            .status {
              display: inline-block;
              padding: 4px 10px;
              border-radius: 4px;
              font-weight: 500;
              font-size: 12px;
              margin-left: 10px;
            }
            .status-paid {
              background-color: #d4edda;
              color: #155724;
            }
            .signature {
              margin-top: 40px;
              text-align: right;
            }
            .signature-line {
              display: inline-block;
              width: 200px;
              border-top: 1px solid #333;
              margin-top: 30px;
              padding-top: 5px;
              text-align: center;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">MyHomes</div>
            <div>123 Property Street, City, Country</div>
            <div>Phone: (123) 456-7890 | Email: info@myhomes.app</div>
            
            <div class="title">TRANSACTION RECEIPT</div>
            <div class="receipt-number">Receipt #${"TXN123456"} | ${"20 Feb , 2025"}</div>
          </div>
          
          <div class="section">
            <div class="row">
              <span class="label">Transaction ID:</span>
              <span class="value">${"TXN123456"}</span>
            </div>
            <div class="row">
              <span class="label">Transaction Date:</span>
              <span class="value">${"20 Feb , 2025"}</span>
            </div>
            <div class="row">
              <span class="label">Transaction Type:</span>
              <span class="value">${"Electric"}</span>
            </div>
            <div class="row">
              <span class="label">Status:</span>
              <span class="value">
                ${"Paid"}
                <span class="status status-paid">PAID</span>
              </span>
            </div>
          </div>
          
          <div class="divider"></div>
          
          <div class="section">
            <div class="section-title">Payment Details</div>
            <div class="row">
              <span class="label">Amount Paid:</span>
              <span class="value">₦ ${"₦ 15,00,000"}</span>
            </div>
            <div class="row">
              <span class="label">Payment Method:</span>
              <span class="value">Credit/Debit Card</span>
            </div>
            <div class="row">
              <span class="label">Reference Number:</span>
              <span class="value">REF-${Math.floor(
                100000 + Math.random() * 900000,
              )}</span>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Utility Information</div>
            <div class="row">
              <span class="label">Utility Type:</span>
              <span class="value">${"Electric"}</span>
            </div>
            
           
          </div>
          
          <div class="section">
            <div class="section-title">Property & Tenant</div>
            <div class="row">
              <span class="label">Tenant Name:</span>
              <span class="value">John Doe</span>
            </div>
            <div class="row">
              <span class="label">Property Group:</span>
              <span class="value">Apartment</span>
            </div>
            <div class="row">
              <span class="label">Property ID:</span>
              <span class="value">PROP-${Math.floor(
                1000 + Math.random() * 9000,
              )}</span>
            </div>
            <div class="row">
              <span class="label">Meter Number:</span>
              <span class="value">MTR-${Math.floor(
                10000 + Math.random() * 90000,
              )}</span>
            </div>
          </div>
          
          <div class="divider"></div>
          
          <div class="total">
            <span>Total Amount: </span>
            <span>₦ ${"₦ 15,00,000"}</span>
          </div>
          
          <div class="signature">
            <div class="signature-line">Authorized Signature</div>
          </div>
          
          <div class="footer">
            Thank you for choosing MyHomes!
            <br>
            For any inquiries, please contact support@myhomes.app or call (123) 456-7890
            <br><br>
            This is an automated receipt. No signature required.
            <br>
            Generated on 20 Feb , 2025
          </div>
        </body>
      </html>
    `;
  };

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const showToastMessage = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide after 3 seconds
  };

  const generateAndSharePDF = async (
    action: "share" | "download" = "download",
  ) => {
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
            title: "Transaction Receipt",
            message: "Here is your transaction receipt",
            url: `file://${uri}`,
          });

          showToastMessage("Receipt shared successfully!");
        } catch (shareError) {
          console.error("Error sharing:", shareError);
          showToastMessage(
            "Failed to share receipt. Please try again.",
            "error",
          );
        }
      } else {
        // For download, we'll use the system's save dialog
        await Share.share({
          title: "Save Transaction Receipt",
          message: "Save your transaction receipt",
          url: `file://${uri}`,
        });
        showToastMessage("Receipt is ready to be saved!");
      }
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

  // Handle search functionality
  const filteredTransactions = transactionData.filter(
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
            text="Transactions"
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
      {/* Search Bar */}
      {/* Recent Notifications */}
      <View style={styles.section}>
        <View style={styles._seciton_row}>
          <Text weight="semiBold" style={styles.sectionTitle}>
            Transaction
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
        {/* ÷÷ */}
      </View>

      {/* Transaction List */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles._card}
            activeOpacity={0.5}
            onLongPress={() => {
              setDropdownVisible(null);
              setIsModalVisible(true);
            }}
          >
            <WithLocalSvg asset={Images.thistory} />
            <View style={styles._cardinfo}>
              <Text
                text={"Utility Bill Payment"}
                style={styles._type}
                weight="semiBold"
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text text="20 Feb , 2025" style={styles._date} />
                <Text
                  weight="semiBold"
                  text="15,00,000"
                  style={styles._price}
                />
              </View>
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
            </TouchableOpacity>
            {dropdownVisible === parseInt(item.id) && (
              <View style={styles.menuBox}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setDropdownVisible(null);
                    setIsModalVisible(true);
                    setActionType("view");
                  }}
                >
                  <Text style={styles.menuText}>View Receipt</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setActionType("download");
                    setDropdownVisible(null);
                    setIsModalVisible(true);
                  }}
                >
                  <Text style={[styles.menuText]}>Download</Text>
                </TouchableOpacity> */}
              </View>
            )}
          </TouchableOpacity>
        )}
      />
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
            <Text style={styles.modalText}>Transaction Details</Text>
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
            <View style={[styles._row, { marginBottom: 10 }]}>
              <Text text="Transaction ID: " style={styles._rowlabel} />
              <Text
                text="TXN123456"
                style={[styles._rowvalue, { fontFamily: "Poppins-Medium" }]}
              />
            </View>
            <View style={styles._row}>
              <Text text="Units: " style={styles._rowlabel} />
              <Text text="250Kwh" style={styles._rowvalue} />
            </View>

            <View style={styles._row}>
              <Text text="Transaction Type:" style={styles._rowlabel} />
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

            <View style={styles._row}>
              <Text text="Meter Number:" style={styles._rowlabel} />
              <Text text="MTR34556" style={styles._rowvalue} />
            </View>

            <View
              style={[
                styles._row,
                {
                  marginBottom: actionType === "download" ? 0 : 30,
                },
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  text="Token "
                  style={[styles._rowlabel, { marginRight: 5 }]}
                />
              </View>
              <Text text="234556" style={styles._rowvalue} />
            </View>
            {/* {actionType === "download" && ( */}
            <View style={[styles._row, { gap: 10 }]}>
              <Button
                text={isDownloading ? "Generating..." : "Download"}
                preset="reversed"
                style={styles.copyButton}
                onPress={handleDownloadReceipt}
                disabled={isDownloading || isSharing}
              />
              {/* <Button
                  text={isSharing ? "Preparing..." : "Share"}
                  preset="reversed"
                  style={styles.copyButton}
                  onPress={handleShareReceipt}
                  disabled={isSharing || isDownloading}
                /> */}
            </View>
            {/* )} */}
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
    marginTop: 20,
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
    justifyContent: "space-between",
    marginVertical: 5,
    alignItems: "center",
    marginTop: 15,
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
    backgroundColor: colors.white,
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
    // width: "90%",
    marginVertical: adjustSize(20),
    alignSelf: "center",
    flex: 1,
  },
  _card: {
    padding: adjustSize(10),
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: colors.white,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 7,
    height: adjustSize(82),
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
    fontSize: adjustSize(15),
  },
  menuButton: {
    padding: adjustSize(4),
  },
  menuBox: {
    position: "absolute",
    right: 30,
    top: 20,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: spacing.xs,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
    minWidth: 150,
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
  copyIcon: {
    padding: adjustSize(4),
    borderRadius: adjustSize(8),
    alignItems: "center",
    justifyContent: "center",
    marginLeft: adjustSize(10),
  },
  toastContainer: {
    position: "absolute",
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  toastText: {
    color: "white",
    fontSize: adjustSize(14),
    fontWeight: "500",
  },
});
