import React, { useState, useRef } from "react";
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
import * as Clipboard from "expo-clipboard";
import { Images } from "../../../assets/Images";
import { WithLocalSvg } from "react-native-svg/css";

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
  UtilitiesMyMeter: undefined;
  // add other screens if needed
};

type UtilitiesMyMeterProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "UtilitiesMyMeter">;
  route: RouteProp<RootStackParamList, "UtilitiesMyMeter">;
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

export const UtilitiesMyMeter: React.FC<UtilitiesMyMeterProps> = ({
  navigation,
}) => {
  // 🔹 Tabs
  const [activeTab] = useState<string>("My meter");

  // 🔹 Dropdown State
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [topUpModal, setTopUpModal] = useState<boolean>(false);
  const [previewModal, setPreviewModal] = useState<boolean>(false);
  const [pinModal, setPinModal] = useState<boolean>(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [topUpAmount, setTopUpAmount] = useState<string>("");
  const pinRef = useRef(null);
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
      preset="fixed"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header2 title="My Meter" onNotificationPress={() => {}} />
      {/* <TenantUtilitiesTabs activeTab={activeTab} navigation={navigation}> */}
      {/* First Dropdown (Property Type) */}
      <Text
        text="Please select a property to view meter details."
        style={{ paddingHorizontal: 20, marginTop: 20, color: colors.primary }}
      />
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
          <Text style={styles.heading}>Meter Details</Text>
          {list.map((val, index) => (
            <View
              key={index}
              style={[
                styles.list,
                {
                  backgroundColor: index % 2 === 0 ? "#292766" : "transparent",
                },
              ]}
            >
              <Text
                style={[
                  styles.listTitle,
                  {
                    color: index % 2 !== 0 ? "#292766" : "#fff",
                  },
                ]}
              >
                {val.title}
              </Text>
              <Text
                style={[
                  styles.listTitle,
                  {
                    color: index % 2 !== 0 ? "#292766" : "#fff",
                  },
                ]}
              >
                {val.value}
              </Text>
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
      {/* </TenantUtilitiesTabs> */}

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
              setPreviewModal(true);
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
            inputWrapperStyle={{ backgroundColor: colors.white }}
            placeholder={`Enter amount`}
            keyboardType="numeric"
            style={{ textAlign: "center" }}
            value={topUpAmount}
            onChangeText={setTopUpAmount}
          />
        </View>
        <View style={styles.btnMain}>
          <Button
            text="Continue"
            preset="reversed"
            onPress={() => {
              setTopUpModal(false);
              setPreviewModal(true);
            }}
          />
        </View>
      </CustomModal>

      {/* Preview Modal */}
      <CustomModal
        visible={previewModal}
        onClose={() => setPreviewModal(false)}
      >
        <Text style={styles.modalHeading}>Preview</Text>

        <View style={styles.previewRow}>
          <Text style={styles.previewLabel}>Amount:</Text>
          <Text style={styles.previewValue}>₦{topUpAmount || "500"}</Text>
        </View>

        <View style={styles.previewRow}>
          <Text style={styles.previewLabel}>Service Charge</Text>
          <Text style={styles.previewValue}>₦{topUpAmount || "500"}</Text>
        </View>

        <View style={styles.previewRow}>
          <Text style={styles.previewLabel}>VAT</Text>
          <Text style={styles.previewValue}>₦{topUpAmount || "500"}</Text>
        </View>

        <View style={styles.previewRow}>
          <Text style={styles.previewLabel}>VAT Rate</Text>
          <Text style={styles.previewValue}>7%</Text>
        </View>

        <View style={styles.previewRow}>
          <Text style={styles.previewLabel}>Total</Text>
          <Text style={styles.previewValue}>₦{topUpAmount || "500"}</Text>
        </View>

        <View style={styles.previewRow}>
          <Text style={styles.previewLabel}>Expected Units</Text>
          <Text style={styles.previewValue}>20kwh</Text>
        </View>

        <View style={[styles.btnMain, { marginTop: adjustSize(25) }]}>
          <Button
            text="Pay from wallet now"
            preset="reversed"
            onPress={() => {
              setPreviewModal(false);
              setPinModal(true);
            }}
          />
        </View>
      </CustomModal>

      {/* PIN Modal */}
      <CustomModal visible={pinModal} onClose={() => setPinModal(false)}>
        <Text style={styles.modalHeading}>Enter your pin</Text>
        <View
          style={{
            marginHorizontal: adjustSize(10),
            marginVertical: adjustSize(15),
            marginTop: adjustSize(20),
          }}
        >
          <TextField
            ref={pinRef}
            placeholderTextColor={colors.primaryLight}
            inputWrapperStyle={{ backgroundColor: colors.white }}
            placeholder={`Enter Pin`}
            keyboardType="numeric"
            maxLength={4}
            style={{ textAlign: "center" }}
            secureTextEntry={true}
            onChangeText={(text) => {
              if (text.length === 4) {
                pinRef.current?.blur();
              }
            }}
          />
        </View>
        <View style={styles.btnMain}>
          <Button
            text="Continue"
            preset="reversed"
            onPress={() => {
              setPinModal(false);
              setSuccessModal(true);
            }}
          />
        </View>
      </CustomModal>

      {/* Success Modal */}
      <CustomModal
        visible={successModal}
        onClose={() => setSuccessModal(false)}
      >
        <WithLocalSvg
          asset={Images.check}
          style={{
            alignSelf: "center",
            marginTop: adjustSize(10),
            marginBottom: adjustSize(15),
          }}
        />
        <Text style={styles.modalHeading}>Purchase Successful</Text>
        <View style={styles.btnMain}>
          <Button
            text="Continue"
            preset="reversed"
            onPress={() => setSuccessModal(false)}
          />
        </View>
      </CustomModal>
      <CustomModal
        visible={activateEmergencyCreditModal}
        onClose={() => setActivateEmergencyCreditModal(false)}
      >
        <Text style={styles.modalHeading}>Activate Emergency Credit</Text>
        {/* <View
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
        </View> */}
        <View
          style={{
            marginHorizontal: adjustSize(10),
          }}
        >
          <Text style={styles.inputTitle}>Emergency Credit Amount</Text>
          <TextField
            placeholderTextColor={colors.primaryLight}
            inputWrapperStyle={{ backgroundColor: colors.white }}
            placeholder={`Enter amount`}
            keyboardType="numeric"
          />
        </View>
        <View style={[styles.btnMain,{marginTop:50}]}>
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
    backgroundColor: colors.primary,
    marginBottom: adjustSize(3),
    marginHorizontal: adjustSize(10),
    marginTop: adjustSize(15),
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
    // shadowColor: "#000000",
    // shadowOpacity: 0.15,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 3,
    // elevation: 0.5,
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
    // opacity: 0.7,
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
  // Preview Modal Styles
  previewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: adjustSize(15),
    marginVertical: adjustSize(8),
  },
  previewLabel: {
    fontSize: adjustSize(13),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
  },
  previewValue: {
    fontSize: adjustSize(13),
    color: "#7E7E7E",
    fontFamily: typography.fonts.poppins.normal,
  },
});
