import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Screen, Text, Header2, CustomTabs, Button } from "../../../Components";
import { AppStackScreenProps } from "../../../utils/interfaces";
import { colors, spacing, adjustSize, typography } from "../../../theme";
import { MyAccountIcon, TransactionHistoryIcon } from "../../../assets/svg";
import { MyAccount } from "./components/my-account";
import { TransactionHistory } from "./components/transaction-history";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
interface AdminFinancialReportsProps
  extends AppStackScreenProps<"AdminFinancialReports"> {}
export function AdminFinancialReports(props: AdminFinancialReportsProps) {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("My Account"); // 🔹 string state
  const [showBalance, setShowBalance] = useState(true);
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
            activeIcon: <MyAccountIcon color={colors.primary} />,
            inactiveIcon: <MyAccountIcon color={colors.white} />,
          },
          {
            label: "Transaction History",
            activeIcon: <TransactionHistoryIcon color={colors.primary} />,
            inactiveIcon: <TransactionHistoryIcon color={colors.white} />,
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
              {showBalance ? "$ 15,00,000" : "*********"}
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
            <View style={styles.box}>
              <Text style={styles.boxTitle}>USD Virtual Wallet</Text>
              <TouchableOpacity disabled={true} style={styles.commintBtn}>
                <Text style={styles.commintBtnTxt}>Coming Soon</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity activeOpacity={0.2} style={styles.box}>
              <Ionicons
                name="add-circle"
                size={adjustSize(53)}
                color={colors.primary}
                style={{ alignSelf: "center", marginBottom: adjustSize(15) }}
              />
              <Text style={styles.boxTitle}>Tap to Add account</Text>
            </TouchableOpacity>
          )}

          {activeTab === "My Account" ? <MyAccount /> : <TransactionHistory />}
        </ScrollView>
      </CustomTabs>
      <View style={styles.footerRow}>
        <TouchableOpacity activeOpacity={0.7} style={[styles.addMoneyBtn]}>
          <Text style={styles.addMoneyBtnText}>Add Money</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.sendMoneyBtn}>
          <Text style={styles.sendMoneyBtnText}>Send Money</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: colors.primaryLight,
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
    backgroundColor: colors.primaryLight,
    height: adjustSize(47),
    borderRadius: adjustSize(10),
    alignItems: "center",
    justifyContent: "center",
    marginTop: adjustSize(40),
  },
  commintBtnTxt: {
    color: colors.white,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.semiBold,
  },
});
