import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Share,
  Alert,
} from "react-native";
import { Screen, Header2, Text, Button, TextField } from "../../../Components";
import { colors, typography, adjustSize } from "../../../theme";
import DropdownComponent from "../../../Components/DropDown";
import { TenantUtilitiesTabs } from "./Components/TenantUtilitiesTabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { CustomModal } from "./Components/CustomModal";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Clipboard from "expo-clipboard"; // ✅ for copy

// 🔹 Dropdown Option type
interface Option {
  label: string;
  value: string;
}

// 🔹 Meter detail type
interface MeterDetail {
  title: string;
  value: string;
}

// 🔹 Props type (adjust according to your navigation setup)
type RootStackParamList = {
  TenantUtilitiesMyMeter: undefined;
  // add other screens if needed
};

type TenantUtilitiesMyMeterProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "TenantUtilitiesMyMeter"
  >;
  route: RouteProp<RootStackParamList, "TenantUtilitiesMyMeter">;
};

const formatAmount = (num: number) =>
  new Intl.NumberFormat("en-IN").format(num);

// 🔹 Static dropdown data
const typeOptions: Option[] = [
  { label: "Downtown Tower", value: "Downtown Tower" },
  { label: "Park View Apartments", value: "Park View Apartments" },
  { label: "Lakeside Commons", value: "Lakeside Commons" },
  { label: "Heritage Square", value: "Heritage Square" },
];

// 🔹 Static list data
const list: MeterDetail[] = [
  { title: "Meter Number", value: "01238238878374" },
  { title: "Meter ID", value: "13202" },
  { title: "Phase Number", value: "3" },
  { title: "Current Specification", value: "012345678901" },
  { title: "Energy", value: "250" },
  { title: "Energy Type", value: "kwh" },
  { title: "Estate", value: "4321" },
];

// 🔹 Local reusable component for repeated account rows
const AccountDetailRow: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(value);
    setCopied(true);
    // setTimeout(() => setCopied(false), 2000); // reset after 2s
  };

  return (
    <View style={styles.accountDetailMain}>
      <Text style={styles.accountTitle}>{title}</Text>
      <View style={styles.accountDetailInner}>
        <Text style={styles.accountVal}>{value}</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={handleCopy}>
          {copied ? (
            <Ionicons
              name="checkmark-done-outline"
              size={adjustSize(16)}
              color={colors.primary}
            />
          ) : (
            <MaterialIcons
              name="content-copy"
              size={adjustSize(16)}
              color={colors.primary}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const TenantUtilitiesMyMeter: React.FC<TenantUtilitiesMyMeterProps> = ({
  navigation,
}) => {
  // 🔹 Tabs
  const [activeTab] = useState<string>("My meter");

  // 🔹 Dropdown State
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [topUpModal, setTopUpModal] = useState<boolean>(false);
  const [fundYourAccountModal, setFundYourAccountModal] =
    useState<boolean>(false);
  const [activateEmergencyCreditModal, setActivateEmergencyCreditModal] =
    useState<boolean>(false);
  const onShare = async () => {
    try {
      const message = `
🏦 Bank Name: Paga
🔢 Account Number: 1463067827
👤 Account Name: John Doe
`;

      const result = await Share.share({ message });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with specific activity
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header2 title="My Meter" onNotificationPress={() => {}} />
      <TenantUtilitiesTabs activeTab={activeTab} navigation={navigation}>
        {/* First Dropdown (Property Type) */}
        <DropdownComponent
          data={typeOptions}
          label="Choose type"
          placeholder="Select Properties"
          value={selectedType}
          onChangeValue={setSelectedType}
          dropdownStyle={styles.dropdown}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelected}
          rightIconColor={colors.white}
        />
        {selectedType ? (
          <ScrollView>
            <Text style={styles.heading}>Meter Details - {selectedType}</Text>
            {list.map((val, index) => (
              <View
                key={index}
                style={[
                  styles.list,
                  {
                    backgroundColor:
                      index % 2 === 0 ? "#dedff0" : "transparent",
                  },
                ]}
              >
                <Text style={styles.listTitle}>{val.title}</Text>
                <Text style={styles.listValue}>{val.value}</Text>
              </View>
            ))}
            <View
              style={{
                paddingHorizontal: adjustSize(10),
                marginTop: adjustSize(35),
              }}
            >
              <Button
                text="Top Up"
                preset="reversed"
                onPress={() => setTopUpModal(true)}
              />
              <TouchableOpacity
                style={styles.activateBtn}
                onPress={() => setActivateEmergencyCreditModal(true)}
              >
                <Text style={styles.activateBtnTxt}>
                  Activate Emergency Credit
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <Text style={styles.message}>
            Please select a property to view meter details.
          </Text>
        )}
      </TenantUtilitiesTabs>

      {/* Pay Now Modal */}
      <CustomModal visible={topUpModal} onClose={() => setTopUpModal(false)}>
        <Text style={styles.modalHeading}>Top Up Units</Text>
        <View style={styles.outstandingHeader}>
          <Text style={styles.outstandingAmountPaid}>
            ₦ {formatAmount(1500000)}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.fundWalletBtn}
            onPress={() => {
              setTopUpModal(false);
              setFundYourAccountModal(true);
            }}
          >
            <Text style={styles.fundWalletBtnTxt}>Fund Wallet</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginHorizontal: adjustSize(10),
            marginVertical: adjustSize(15),
            marginTop: adjustSize(20),
          }}
        >
          <TextField
            placeholderTextColor={colors.primaryLight}
            inputWrapperStyle={{ backgroundColor: colors.fill }}
            placeholder={`Enter amount`}
            keyboardType="numeric"
            style={{ textAlign: "center" }}
          />
        </View>
        <View style={styles.btnMain}>
          <Button
            text="Continue"
            preset="reversed"
            onPress={() => {
              setTopUpModal(false);
              setFundYourAccountModal(true);
            }}
          />
        </View>
      </CustomModal>

      {/* Fund Your Account Modal */}
      <CustomModal
        visible={fundYourAccountModal}
        onClose={() => setFundYourAccountModal(false)}
      >
        <Text style={styles.modalHeading}>Fund your Account</Text>
        <Text style={styles.modalTxt}>
          Send money to the bank details below to fund your account. Your Bank
          limits may apply:
        </Text>

        {/* ✅ Using local component */}
        <AccountDetailRow title="Account number:" value="1463067827" />
        <AccountDetailRow title="Bank Name:" value="Paga" />
        <AccountDetailRow title="Account name:" value="John Doe" />

        <View style={[styles.btnMain, { marginTop: adjustSize(35) }]}>
          <Button
            text="Share Details"
            preset="reversed"
            onPress={() => {
              setFundYourAccountModal(false);
              onShare();
            }}
          />
        </View>
      </CustomModal>
      <CustomModal
        visible={activateEmergencyCreditModal}
        onClose={() => setActivateEmergencyCreditModal(false)}
      >
        <Text style={styles.modalHeading}>Activate Emergency Credit</Text>
        <View
          style={{
            marginHorizontal: adjustSize(10),
            marginTop: adjustSize(20),
          }}
        >
          <Text style={styles.inputTitle}>Emergency title</Text>
          <TextField
            placeholderTextColor={colors.primaryLight}
            inputWrapperStyle={{ backgroundColor: colors.fill }}
            placeholder={`Emergency title`}
          />
        </View>
        <View
          style={{
            marginHorizontal: adjustSize(10),
          }}
        >
          <Text style={styles.inputTitle}>Emergency Credit Amount</Text>
          <TextField
            placeholderTextColor={colors.primaryLight}
            inputWrapperStyle={{ backgroundColor: colors.fill }}
            placeholder={`Enter amount`}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.btnMain}>
          <Button
            text="Activate Emergency Credit"
            preset="reversed"
            onPress={() => {
              setActivateEmergencyCreditModal(false);
            }}
          />
        </View>
      </CustomModal>
    </Screen>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  screenContentContainer: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  dropdown: {
    height: adjustSize(47),
    borderRadius: adjustSize(10),
    backgroundColor: "#6369A4",
    marginBottom: adjustSize(3),
    marginHorizontal: adjustSize(10),
    marginTop: adjustSize(25),
  },
  dropdownPlaceholder: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.normal,
  },
  dropdownSelected: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.normal,
  },
  message: {
    fontSize: adjustSize(13),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    margin: adjustSize(10),
  },
  heading: {
    fontSize: adjustSize(15),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    margin: adjustSize(10),
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: adjustSize(12),
  },
  listTitle: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  listValue: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
    opacity: 0.5,
  },
  activateBtn: {
    marginBottom: adjustSize(25),
    height: 47,
    alignItems: "center",
    justifyContent: "center",
  },
  activateBtnTxt: {
    fontSize: adjustSize(14),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
    marginTop: adjustSize(5),
  },
  modalHeading: {
    fontSize: adjustSize(15),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    textAlign: "center",
  },
  outstandingHeader: {
    flexDirection: "row",
    paddingHorizontal: adjustSize(15),
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: adjustSize(20),
    marginTop: adjustSize(30),
  },
  outstandingAmountPaid: {
    fontSize: adjustSize(15),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  fundWalletBtn: {
    backgroundColor: colors.white,
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 0.5,
    borderWidth: adjustSize(0.5),
    borderColor: "#F2F3FF",
    height: adjustSize(40),
    borderRadius: adjustSize(10),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: adjustSize(15),
  },
  fundWalletBtnTxt: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
    opacity: 0.7,
  },
  btnMain: {
    marginHorizontal: adjustSize(10),
    marginVertical: adjustSize(15),
  },
  modalTxt: {
    fontSize: adjustSize(12),
    color: "#7E7E7E",
    fontFamily: typography.fonts.poppins.normal,
    marginHorizontal: adjustSize(10),
    textAlign: "center",
    marginVertical: adjustSize(10),
    marginBottom: adjustSize(25),
  },
  accountDetailMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: adjustSize(10),
    paddingVertical: adjustSize(3),
  },
  accountTitle: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
  },
  accountDetailInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  accountVal: {
    fontSize: adjustSize(12),
    color: "#7E7E7E",
    fontFamily: typography.fonts.poppins.normal,
    marginRight: adjustSize(15),
  },
  inputTitle: {
    fontSize: adjustSize(14),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
    marginBottom: adjustSize(4),
    marginTop: adjustSize(10),
  },
});
