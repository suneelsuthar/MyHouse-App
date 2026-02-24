import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import { Header, Screen, Text, Button, TextField } from "../../../Components";
import DropdownComponent from "../../../Components/DropDown";
import { colors, spacing, typography, adjustSize } from "../../../theme";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AdminStackParamList } from "../../../utils/interfaces";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Images } from "../../../assets/Images";
import Feather from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import SignatureCanvas from "react-native-signature-canvas";
export type AdminSignAgreementProps = NativeStackScreenProps<
  AdminStackParamList,
  "AdminSignAgreement"
>;

export function AdminSignAgreement({ route }: AdminSignAgreementProps) {
  // const { bookingId } = route?.params;
  const navigation = useNavigation();

  const [agree, setAgree] = React.useState(false);
  const [allowNegotiable, setAllowNegotiable] = React.useState(true);
  const [allowActual, setAllowActual] = React.useState(false);
  const [refundDeposit, setRefundDeposit] = React.useState(false);
  const [reject, setReject] = React.useState(false);
  const [cancelModalVisible, setCancelModalVisible] = React.useState(false);

  // Form state
  const [landlordName, setLandlordName] = React.useState("");
  const [customerName, setCustomerName] = React.useState("");
  const [agreementDate, setAgreementDate] = React.useState("");
  const [landlordAddress, setLandlordAddress] = React.useState("");
  const [customerAddress, setCustomerAddress] = React.useState("");
  const [propertyName, setPropertyName] = React.useState("");
  const [propertyAddress, setPropertyAddress] = React.useState("");
  const [leaseDuration, setLeaseDuration] = React.useState("");
  const [leaseStartDate, setLeaseStartDate] = React.useState("");
  const [leaseEndDate, setLeaseEndDate] = React.useState("");
  const [leaseAmount, setLeaseAmount] = React.useState("");
  const [noticeMonths, setNoticeMonths] = React.useState("");
  const [powerDeposit, setPowerDeposit] = React.useState("");
  const [agencyFee, setAgencyFee] = React.useState("");
  const [legalFee, setLegalFee] = React.useState("");
  const [cautionDeposit, setCautionDeposit] = React.useState("");
  const [serviceCharge, setServiceCharge] = React.useState("");
  const [electricityDeadline, setElectricityDeadline] = React.useState("");
  const [agreementNote, setAgreementNote] = React.useState("");
  const [leaseType, setLeaseType] = React.useState<string | null>(null);
  const [signatureFileName, setSignatureFileName] = React.useState<string>("");
  const [signatureUri, setSignatureUri] = React.useState<string | null>(null);
  const sigRef = React.useRef<any>(null);
  const [sigLoading, setSigLoading] = React.useState(false);
  const [isSigning, setIsSigning] = React.useState(false);

  const LEASE_TYPES = [
    { label: "Fixed Term", value: "fixed" },
    { label: "Periodic", value: "periodic" },
    { label: "Short-let", value: "shortlet" },
  ];

  const clearAll = () => {
    setLandlordName("");
    setCustomerName("");
    setAgreementDate("");
    setLandlordAddress("");
    setCustomerAddress("");
    setPropertyName("");
    setPropertyAddress("");
    setLeaseDuration("");
    setLeaseStartDate("");
    setLeaseEndDate("");
    setLeaseAmount("");
    setNoticeMonths("");
    setPowerDeposit("");
    setAgencyFee("");
    setLegalFee("");
    setCautionDeposit("");
    setServiceCharge("");
    setElectricityDeadline("");
    setAgreementNote("");
    setLeaseType(null);
    setSignatureFileName("");
    setSignatureUri(null);
  };

  const pickSignature = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.8,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setSignatureUri(asset.uri);
      const name =
        (asset as any).fileName ||
        asset.uri.split("/").pop() ||
        "signature.jpg";
      setSignatureFileName(name);
    }
  };

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header title="Sign Agreement" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={!isSigning}
        contentContainerStyle={{
          paddingBottom: spacing.xl,
          padding: spacing.md,
          paddingTop: 0,
        }}
      >
        <Text
          weight="medium"
          style={{
            color: colors.primary,
            fontSize: adjustSize(14),
            marginVertical: spacing.md,
          }}
        >
          Please sign and fill out the agreement form below
        </Text>

        <Text text="Landlord’s Name (Or Company Name)" style={styles.label} />
        <TextField
          placeholder="Landlord’s name"
          value={landlordName}
          onChangeText={setLandlordName}
          inputWrapperStyle={{ backgroundColor: colors.white }}
        />
        {/* <View style={{ height: adjustSize(10) }} /> */}
        <Text text="Customer Name (Or Company Name)" style={styles.label} />
        <TextField
          placeholder="Customer name"
          value={customerName}
          onChangeText={setCustomerName}
          inputWrapperStyle={{ backgroundColor: colors.white }}
        />
        {/* <View style={{ height: adjustSize(10) }} /> */}
        <Text text="Agreement Date" style={styles.label} weight="semiBold" />
        <TextField
          placeholder="dd/mm/yyyy"
          value={agreementDate}
          onChangeText={setAgreementDate}
          inputWrapperStyle={{ backgroundColor: colors.white }}
        />
        {/* <View style={{ height: adjustSize(10) }} /> */}
        <Text
          text="Landlord's Address (Or Company Address)"
          style={styles.label}
        />
        <TextField
          placeholder="Landlord's Address"
          value={landlordAddress}
          onChangeText={setLandlordAddress}
          inputWrapperStyle={{ backgroundColor: colors.white }}
        />
        {/* <View style={{ height: adjustSize(10) }} /> */}
        <Text
          text="Customer's Address (Or Company Address)"
          style={styles.label}
        />
        <TextField
          placeholder="Customer's Address"
          value={customerAddress}
          onChangeText={setCustomerAddress}
          inputWrapperStyle={{ backgroundColor: colors.white }}
        />

        {/* <View style={{ height: adjustSize(10) }} /> */}
        <Text text="Property Name" style={styles.label} />
        <TextField
          placeholder="Property name"
          value={propertyName}
          onChangeText={setPropertyName}
          inputWrapperStyle={{ backgroundColor: colors.white }}
        />
        {/* <View style={{ height: adjustSize(10) }} /> */}
        <Text text="Property Address" style={styles.label} />
        <TextField
          placeholder="Property address"
          value={propertyAddress}
          onChangeText={setPropertyAddress}
          inputWrapperStyle={{ backgroundColor: colors.white }}
        />

        {/* <View style={{ height: adjustSize(10) }} /> */}
        <Text text="Lease Duration (Years and Months)" style={styles.label} />
        <TextField
          placeholder="e.g, 2 years , 5 months"
          value={leaseDuration}
          onChangeText={setLeaseDuration}
          inputWrapperStyle={{ backgroundColor: colors.white }}
        />

        {/* <View style={{ height: adjustSize(10) }} /> */}
        <Text text="Lease Start Date" style={styles.label} />
        <TextField
          placeholder="dd/mm/yyyy"
          value={leaseStartDate}
          onChangeText={setLeaseStartDate}
          inputWrapperStyle={{ backgroundColor: colors.white }}
        />

        {/* <View style={{ height: adjustSize(10) }} /> */}
        <Text text="Lease End Date" style={styles.label} />
        <TextField
          placeholder="dd/mm/yyyy"
          value={leaseEndDate}
          onChangeText={setLeaseEndDate}
          inputWrapperStyle={{ backgroundColor: colors.white }}
        />

        {/* <View style={{ height: adjustSize(10) }} /> */}
        <Text text="Lease Amount" style={styles.label} />
        <TextField
          placeholder="Lease amount"
          keyboardType="numeric"
          value={leaseAmount}
          onChangeText={setLeaseAmount}
          inputWrapperStyle={{ backgroundColor: colors.white }}
        />

        {/* <View style={{ height: adjustSize(10) }} /> */}
        <DropdownComponent
          data={LEASE_TYPES}
          value={leaseType}
          onChangeValue={setLeaseType}
          placeholder="Select Type"
          dropdownStyle={
            {
              backgroundColor: colors.white,
              boxShadow: "0px 1px 4px rgba(0,0,0,0.15)",
              height: adjustSize(49),
              marginBottom: adjustSize(10),
            } as any
          }
          rightIconColor={colors.primary}
          placeholderStyle={{ color: colors.grey }}
        />

        <Text
          text="Notice of Evacuation Time (Months)"
          style={styles.label}
          weight="semiBold"
        />
        <TextField
          placeholder="In months"
          keyboardType="numeric"
          value={noticeMonths}
          onChangeText={setNoticeMonths}
          inputWrapperStyle={{ backgroundColor: colors.white }}
        />
        {/* <View style={{ height: adjustSize(10) }} /> */}
        <Text text="Power Deposit" style={styles.label} />
        <TextField
          placeholder="Power deposit amount"
          keyboardType="numeric"
          value={powerDeposit}
          onChangeText={setPowerDeposit}
          inputWrapperStyle={{ backgroundColor: colors.white }}
        />
        {/* <View style={{ height: adjustSize(10) }} /> */}
        <Text text="Agency Fee" style={styles.label} />
        <TextField
          placeholder="Agency fee"
          keyboardType="numeric"
          value={agencyFee}
          onChangeText={setAgencyFee}
          inputWrapperStyle={{ backgroundColor: colors.white }}
        />
        {/* <View style={{ height: adjustSize(10) }} /> */}
        <Text text="Legal Fee" style={styles.label} />
        <TextField
          placeholder="Legal fee"
          keyboardType="numeric"
          value={legalFee}
          onChangeText={setLegalFee}
          inputWrapperStyle={{ backgroundColor: colors.white }}
        />
        {/* <View style={{ height: adjustSize(10) }} /> */}
        <Text text="Caution Deposit" style={styles.label} />
        <TextField
          placeholder="Caution deposit"
          keyboardType="numeric"
          value={cautionDeposit}
          onChangeText={setCautionDeposit}
          inputWrapperStyle={{ backgroundColor: colors.white }}
        />
        {/* <View style={{ height: adjustSize(10) }} /> */}
        <Text text="Service Charge" style={styles.label} />
        <TextField
          placeholder="Service charge"
          keyboardType="numeric"
          value={serviceCharge}
          onChangeText={setServiceCharge}
          inputWrapperStyle={{ backgroundColor: colors.white }}
        />
        {/* <View style={{ height: adjustSize(10) }} /> */}
        <Text
          text="Electricity Payment Deadline (hours)"
          style={styles.label}
        />
        <TextField
          placeholder="Electricity payment deadline"
          keyboardType="numeric"
          value={electricityDeadline}
          onChangeText={setElectricityDeadline}
          inputWrapperStyle={{ backgroundColor: colors.white }}
        />

        {/* <View style={{ height: adjustSize(16) }} /> */}
        <Text
          style={{
            color: colors.primary,
            fontSize: adjustSize(12),
            marginBottom: spacing.xs,
          }}
        >
          Please sign below to confirm that you have read and agree to the terms
          and conditions of the lease agreement. Fill out the following form to
          complete the lease agreement.
        </Text>
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: adjustSize(10),
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: colors.greylight,
            minHeight: adjustSize(120),
            paddingHorizontal: adjustSize(12),
            paddingVertical: adjustSize(10),
          }}
        >
          {/* {signatureUri ? (
            <Image
              source={{ uri: signatureUri }}
              resizeMode="contain"
              style={{ width: "100%", height: adjustSize(100), borderRadius: 6 }}
            />
          ) : null} */}
          <SignatureCanvas
            ref={sigRef}
            onBegin={() => setIsSigning(true)}
            onEnd={() => {
              // Do not save on every stroke end; allow multiple strokes
              setIsSigning(false);
            }}
            onOK={(sig) => {
              setSignatureUri(sig);
              setSigLoading(false);
              setIsSigning(false);
            }}
            onEmpty={() => {
              setSigLoading(false);
              setIsSigning(false);
            }}
            onClear={() => {
              setSignatureUri(null);
              setIsSigning(false);
            }}
            onError={() => {
              setSigLoading(false);
              setIsSigning(false);
            }}
            autoClear={true}
            descriptionText="Sign here"
            clearText="Clear"
            confirmText={sigLoading ? "Processing..." : "Save"}
            penColor="#000000"
            backgroundColor="rgba(255,255,255,0)"
            webviewProps={{ cacheEnabled: true }}
            // Size the canvas without changing surrounding layout
            style={{ width: "100%", height: adjustSize(100) }}
            webStyle={`
              .m-signature-pad {
                box-shadow: none; border: none; margin: 0;
              }
              .m-signature-pad--body { border: none; }
              canvas { width: 100% !important; height: ${adjustSize(100)}px !important; }
            `}
          />
        </View>

        {/* <View style={{ height: adjustSize(12) }} /> */}
        <Text
          style={{
            color: colors.primary,
            textAlign: "center",
            marginBottom: adjustSize(8),
            marginTop: 20,
          }}
        >
          OR
        </Text>
        <Text style={styles.label} text="Upload Signature image" />
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            height: adjustSize(49),
            borderRadius: adjustSize(10),
            backgroundColor: colors.white,
            borderWidth: 1,
            borderColor: colors.greylight,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
          onPress={pickSignature}
        >
          {signatureUri ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                justifyContent: "flex-start",
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{ color: colors.grey, textAlign: "left", flex: 1 }}
                numberOfLines={1}
              >
                Choose file
              </Text>
            </View>
          ) : (
            <Text style={{ color: colors.grey }}>Choose file</Text>
          )}
        </TouchableOpacity>

        {/* <View style={{ height: adjustSize(20) }} /> */}
        <View
          style={{
            flexDirection: "row",
            gap: adjustSize(12),
            marginVertical: 40,
          }}
        >
          <View style={{ flex: 1 }}>
            <Button
              text="Clear"
              style={{
                borderWidth: 1,
                borderColor: "#D62828",
                backgroundColor: colors.white,
                minHeight: adjustSize(41),
              }}
              textStyle={{ color: "#D62828" }}
              onPress={clearAll}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              text="Confirm"
              preset="reversed"
              onPress={() => navigation.goBack()}
              style={{
                minHeight: adjustSize(41),
              }}
            />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  backBtn: {
    width: adjustSize(36),
    height: adjustSize(36),
    borderRadius: adjustSize(18),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  title: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    fontSize: adjustSize(16),
  },
  stepsBar: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.md,
    minHeight: adjustSize(84),
  },
  stepsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xs,
    width: adjustSize(84),
  },
  stepBox: {
    width: adjustSize(20),
    height: adjustSize(20),
    borderRadius: adjustSize(4),
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  stepBoxActive: {
    backgroundColor: colors.white,
    borderColor: colors.white,
  },
  stepLabel: {
    fontSize: adjustSize(10),
    color: colors.white,
    textAlign: "center",
    lineHeight: adjustSize(14),
  },
  stepLabelActive: {
    color: colors.white,
  },
  connectorImg: {
    width: adjustSize(56),
    height: adjustSize(8),
    marginHorizontal: spacing.xs,
    position: "absolute",
    alignSelf: "center",
    bottom: 15,
  },
  connectorImgActive: {
    opacity: 1,
    tintColor: colors.white,
  },
  connectorImgInactive: {
    opacity: 0.4,
    tintColor: colors.primary,
  },
  connectorImgPlaceholder: {
    height: adjustSize(8),
    opacity: 0,
    marginHorizontal: spacing.xs,
  },
  card: {
    // backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: adjustSize(12),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  propTitle: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    fontSize: adjustSize(18),
    lineHeight: adjustSize(20),
  },
  muted: {
    color: colors.grey,
  },
  kvRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: spacing.xs,
  },
  kvKey: {
    color: colors.primary,
    flex: 1,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.medium,

    // width: "45%",
  },
  kvVal: {
    color: colors.primary,
    flex: 1.5,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.primaryLight,
    marginVertical: spacing.md,
  },
  sectionTitle: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    fontSize: adjustSize(16),
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusGreen: {
    color: "#00A878",
    flex: 1.5,
  },
  statusOrange: {
    color: "#F7A400",
    flex: 1.3,
  },
  datesBox: {
    padding: spacing.md,
    borderRadius: adjustSize(10),
    borderWidth: 1,
    borderColor: colors.grey,
    marginVertical: adjustSize(5),
  },
  totalPill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: adjustSize(10),
    backgroundColor: colors.primary,
  },
  totalLabel: {
    color: colors.white,
    fontSize: adjustSize(15),
  },
  totalValue: {
    color: colors.white,
    fontSize: adjustSize(15),
  },
  agreeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxBox: {
    width: adjustSize(18),
    height: adjustSize(18),
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxBoxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  primaryBtn: {
    height: adjustSize(46),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: adjustSize(10),
    backgroundColor: colors.primary,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginVertical: adjustSize(10),
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: adjustSize(5),
  },
  dangerBtn: {
    height: adjustSize(46),
    borderWidth: 2,
    borderColor: "#E15241",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: adjustSize(10),
    marginHorizontal: adjustSize(15),
  },
  // Inline Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.palette.overlay50,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  modalCard: {
    width: "100%",
    borderRadius: adjustSize(12),
    backgroundColor: colors.fill,
    padding: spacing.lg,
    paddingVertical: adjustSize(50),
  },
  modalTitle: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    fontSize: adjustSize(16),
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  modalMessage: {
    color: colors.primary,
    textAlign: "center",
  },
  modalCloseBtn: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    width: adjustSize(28),
    height: adjustSize(28),
    borderRadius: adjustSize(14),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.error,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  // Modal styles
  modalActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    marginTop: adjustSize(50),
  },
  modalBtnSecondary: {
    flex: 1,
    backgroundColor: colors.white,
    borderColor: colors.primary,
    minHeight: adjustSize(47),
  },
  modalBtnSecondaryText: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
  },
  modalBtnPrimary: {
    flex: 1,
    backgroundColor: "#D51E1E",
    borderColor: colors.palette.angry500,
    minHeight: adjustSize(47),
  },
  modalBtnPrimaryText: {
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
  label: {
    color: colors.primary,
    fontSize: adjustSize(12),
    paddingBottom: 4,
    paddingLeft: 3,
    fontFamily: typography.fonts.poppins.medium,
  },
});
