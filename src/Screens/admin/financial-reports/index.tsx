import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { Screen, Text, Header2, CustomTabs } from "../../../Components";
import {
  AdminStackParamList,
  TenantStackParamList,
} from "../../../utils/interfaces";
import { colors, spacing, adjustSize, typography } from "../../../theme";
import { MyAccountIcon, TransactionHistoryIcon } from "../../../assets/svg";
import { MyAccount } from "./components/my-account";
import { TransactionHistory } from "./components/transaction-history";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Images } from "../../../assets/Images";
export type FinancialReportsProps =
  | NativeStackScreenProps<AdminStackParamList, "FinancialReports">
  | NativeStackScreenProps<TenantStackParamList, "FinancialReports">;
export function FinancialReports(props: FinancialReportsProps) {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("My Account"); // 🔹 string state
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [showBalance, setShowBalance] = useState(true);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header2 title="Wallet" onNotificationPress={() => {}} />

      <CustomTabs
        tabs={[
          {
            label: "My Account",
            activeIcon: (
              <Image
                source={Images.account}
                style={{
                  height: adjustSize(24),
                  width: adjustSize(24),
                  tintColor: colors.white,
                }}
              />
            ),
            inactiveIcon: (
              <Image
                source={Images.account}
                style={{
                  height: adjustSize(24),
                  width: adjustSize(24),
                  tintColor: colors.white,
                }}
              />
            ),
          },
          {
            label: "Transaction History",
            activeIcon: (
              <Image
                source={Images.transaction}
                style={{
                  tintColor: colors.white,
                  height: adjustSize(24),
                  width: adjustSize(24),
                }}
              />
            ),
            inactiveIcon: (
              <Image
                source={Images.transaction}
                style={{
                  tintColor: colors.white,
                  height: adjustSize(24),
                  width: adjustSize(24),
                }}
              />
            ),
          },
        ]}
        activeTab={activeTab}
        onTabChange={(label) => setActiveTab(label)}
      >
        <ScrollView>
          <View style={styles.priceBox}>
            <Text style={styles.priceBoxHeading}>
              Your current account balance:
            </Text>
            <Text style={styles.price}>
              {showBalance ? "₦ 15,00,000" : "*********"}
            </Text>
            {activeTab === "My Account" && (
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.showBalanceBTn}
                onPress={() => setShowBalance(!showBalance)}
              >
                <Feather
                  name={showBalance ? "eye-off" : "eye"}
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            )}
          </View>
          {activeTab === "My Account" ? (
            <View
              style={[
                styles.box,
                {
                  backgroundColor: colors.primaryLight,
                  padding: 0,
                  paddingHorizontal: 0,
                },
              ]}
            >
              <Text
                style={[
                  styles.boxTitle,
                  {
                    color: colors.white,
                    paddingBottom: 20,
                    fontFamily: typography.fonts.poppins.semiBold,
                  },
                ]}
                text="USD Virtual Wallet"
              />
              <TouchableOpacity disabled={true} style={styles.commintBtn}>
                <Text style={styles.commintBtnTxt}>Coming Soon</Text>
              </TouchableOpacity>
            </View>
          ) : user?.role === "admin" ? (
            <TouchableOpacity activeOpacity={0.2} style={styles.box}>
              <Ionicons
                name="add-circle"
                size={adjustSize(53)}
                color={colors.primary}
                style={{ alignSelf: "center", marginBottom: adjustSize(15) }}
              />
              <Text style={styles.boxTitle}>Tap to Add account</Text>
            </TouchableOpacity>
          ) : null}

          {activeTab === "My Account" ? <MyAccount /> : <TransactionHistory />}
        </ScrollView>
      </CustomTabs>
      <View style={styles.footerRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.addMoneyBtn]}
          onPress={() => setShowAddMoneyModal(true)}
        >
          <Text style={styles.addMoneyBtnText}>Add Money</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.sendMoneyBtn}
          onPress={() => navigation.navigate("SendMoney")}
        >
          <Text style={styles.sendMoneyBtnText}>Send Money</Text>
        </TouchableOpacity>
      </View>

      {/* Add Money Modal */}
      <Modal
        visible={showAddMoneyModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddMoneyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowAddMoneyModal(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.modalTitle}>Fund your account</Text>

            {/* Description */}
            <Text style={styles.modalDescription}>
              Send money to the bank details below to fund your account. Your
              bank limits may apply.
            </Text>

            {/* Bank Details Card */}
            <View style={styles.bankDetailsCard}>
              {/* Account Number */}
              <View style={styles.detailRow}>
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Account number</Text>
                  <Text style={styles.detailValue}>1463067827</Text>
                </View>
                <TouchableOpacity style={styles.copyButton}>
                  <Text style={styles.copyButtonText}>Copy</Text>
                </TouchableOpacity>
              </View>

              {/* Bank Name */}
              <View style={styles.detailRow}>
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Bank Name</Text>
                  <Text style={styles.detailValue}>Paga</Text>
                </View>
                <TouchableOpacity style={styles.copyButton}>
                  <Text style={styles.copyButtonText}>Copy</Text>
                </TouchableOpacity>
              </View>

              {/* Account Name */}
              <View style={styles.detailRow}>
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Account name</Text>
                  <Text style={styles.detailValue}>OGHENEBRUME Djebah</Text>
                </View>
                <TouchableOpacity style={styles.copyButton}>
                  <Text style={styles.copyButtonText}>Copy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContentContainer: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  footerRow: {
    flexDirection: "row",
    gap: spacing.md,
    paddingHorizontal: adjustSize(10),
    marginVertical: adjustSize(13),
    backgroundColor: colors.fill,
  },
  addMoneyBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: adjustSize(10),
    alignItems: "center",
    justifyContent: "center",
    height: adjustSize(41),
  },
  addMoneyBtnText: {
    color: colors.primary,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
  },
  sendMoneyBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: adjustSize(10),
    alignItems: "center",
    height: adjustSize(41),
    justifyContent: "center",
  },
  sendMoneyBtnText: {
    color: colors.white,
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  priceBox: {
    backgroundColor: colors.primary,
    marginHorizontal: adjustSize(10),
    marginTop: adjustSize(15),
    borderRadius: adjustSize(10),
    padding: adjustSize(15),
  },
  priceBoxHeading: {
    color: colors.white,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.normal,
    textAlign: "center",
  },
  price: {
    textAlign: "center",
    color: colors.white,
    fontSize: adjustSize(24),
    fontFamily: typography.fonts.poppins.semiBold,
    lineHeight: 40,
  },
  showBalanceBTn: {
    alignSelf: "center",
  },
  box: {
    borderWidth: adjustSize(0.5),
    borderColor: colors.primary,
    backgroundColor: colors.fill,
    marginHorizontal: adjustSize(10),
    borderRadius: adjustSize(7.48),
    marginTop: adjustSize(15),
    paddingHorizontal: adjustSize(15),
    height: adjustSize(154),
    justifyContent: "center",
    marginBottom: adjustSize(5),
    elevation: 1,
  },
  boxTitle: {
    color: colors.primary,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
    textAlign: "center",
  },
  commintBtn: {
    backgroundColor: colors.primary,
    height: adjustSize(47),
    // borderRadius: adjustSize(10),
    alignItems: "center",
    justifyContent: "center",
    marginTop: adjustSize(40),
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignSelf: "center",
  },
  commintBtnTxt: {
    color: colors.white,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: adjustSize(20),
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: adjustSize(12),
    padding: adjustSize(24),
    width: "100%",
    maxWidth: adjustSize(400),
  },
  closeButton: {
    position: "absolute",
    top: adjustSize(16),
    right: adjustSize(16),
    width: adjustSize(30),
    height: adjustSize(30),
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: adjustSize(18),
    color: colors.greylight,
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: adjustSize(18),
    fontFamily: typography.fonts.poppins.semiBold,
    color: colors.primary,
    textAlign: "center",
    marginBottom: adjustSize(12),
    marginTop: adjustSize(8),
  },
  modalDescription: {
    fontSize: adjustSize(13),
    fontFamily: typography.fonts.poppins.normal,
    color: colors.black,
    textAlign: "center",
    marginBottom: adjustSize(24),
    lineHeight: 20,
  },
  bankDetailsCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: adjustSize(10),
    padding: adjustSize(16),
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: adjustSize(16),
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.medium,
    color: "#666666",
    marginBottom: adjustSize(4),
  },
  detailValue: {
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.semiBold,
    color: colors.black,
  },
  copyButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: adjustSize(6),
    paddingHorizontal: adjustSize(12),
    paddingVertical: adjustSize(6),
    backgroundColor: colors.white,
  },
  copyButtonText: {
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.medium,
    color: colors.primary,
    textDecorationLine: "underline",
  },
});
