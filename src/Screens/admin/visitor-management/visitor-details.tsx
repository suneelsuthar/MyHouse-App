import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
  Modal,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AdminStackParamList } from "../../../utils/interfaces";
import { colors, spacing, typography, adjustSize } from "../../../theme";
import { Header, Screen } from "../../../Components";
import { WithLocalSvg } from "react-native-svg/css";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Images } from "../../../assets/Images";
type Props = NativeStackScreenProps<AdminStackParamList, "AdminVisitorDetails">;

interface VisitorDetailsData {
  id: string;
  name: string;
  type: string;
  propertyGroup: string;
  accessCode: string;
  fromDateTime: string;
  toDateTime: string;
  requestedBy: string;
  checkInDateTime: string;
  checkOutDateTime: string;
  property: string;
  qrCode: string;
}

export const AdminVisitorDetails: React.FC<Props> = ({
  navigation,
  route,
}: Props) => {
  const { visitorId, type }: any = route.params || {};
  const [revokeModalVisible, setRevokeModalVisible] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);

  // Mock data - in real app, fetch based on visitorId
  const visitorData: VisitorDetailsData = {
    id: visitorId || "1",
    name: "Brume Djbah",
    type: type || "lorem ipsum",
    propertyGroup: "lorem ipsum",
    accessCode: "lorem ipsum",
    fromDateTime: "lorem ipsum",
    toDateTime: "lorem ipsum",
    requestedBy: "lorem ipsum",
    checkInDateTime: "lorem ipsum",
    checkOutDateTime: "lorem ipsum",
    property: "lorem ipsum",
    qrCode: `visitor_${visitorId || "1"}_access_code`,
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Visitor Details:\nName: ${visitorData.name}\nAccess Code: ${visitorData.accessCode}\nProperty: ${visitorData.property}`,
        title: "Visitor Details",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleAlertSecurity = () => {
    setAlertModalVisible(true);
  };

  const confirmAlertSecurity = () => {
    setAlertModalVisible(false);
    Alert.alert(
      "Security Alerted",
      "Security has been cancelled about this visitor.",
    );
  };

  const handleRevoke = () => {
    setRevokeModalVisible(true);
  };

  const confirmRevoke = () => {
    setRevokeModalVisible(false);
    Alert.alert("Access Revoked", "Visitor access has been revoked.");
    navigation.goBack();
  };

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.infoRow}>
      <Text
        style={[
          styles.label,
          {
            fontSize: label === "Name" ? adjustSize(15) : adjustSize(12),
            lineHeight: label === "Name" ? adjustSize(27) : adjustSize(14),
          },
        ]}
      >
        {label}
      </Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  console.log("type", type);
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
       
      
      {/* Header */}
      <Header title={type === "requests" ? "Visitor Request Details" : "Visitor Details"} />
      {type === "requests" && (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* QR Code Section */}
          <View style={styles.qrSection}>
            <View style={styles.qrPlaceholder}>
              <WithLocalSvg asset={Images.visitorcode} color={colors.primary} />
            </View>
            {/* <TouchableOpacity style={styles.downloadButton} onPress={handleShare}>
            <Text style={styles.downloadText}>Download QR Code</Text>
          </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity> */}
             <TouchableOpacity
              style={[styles.revokeButton,{
                width:"100%"
              }]}
              // onPress={handleRevoke}
              onPress={handleShare}
            >
              <Text style={styles.revokeButtonText}>Share</Text>
            </TouchableOpacity>
          </View>

          {/* Visitor Information */}
          <View style={styles.section}>
            <InfoRow label="Name" value={visitorData.name} />
            <InfoRow label="Access Code" value={visitorData.accessCode} />
            <InfoRow label="Property" value={visitorData.property} />
            <InfoRow label="Property Group" value={visitorData.propertyGroup} />
            <InfoRow label="Type" value={visitorData.type} />
          </View>

          <View style={styles.section}>
            <InfoRow label="From" value={visitorData.fromDateTime} />
            <InfoRow label="To" value={visitorData.toDateTime} />
          </View>

          <View style={styles.section}>
            <InfoRow label="Requested By" value={visitorData.requestedBy} />
            <InfoRow label="Check-In" value={visitorData.checkInDateTime} />
            <InfoRow label="Check-Out" value={visitorData.checkOutDateTime} />
          </View>

          {/* <View style={[styles.section, { borderBottomWidth: 0 }]}>
          <InfoRow label="Property" value={visitorData.property} />
        </View> */}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.alertButton}
              onPress={handleAlertSecurity}
            >
              <Text style={styles.alertButtonText}>Alert Security</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.revokeButton}
              onPress={handleRevoke}
            >
              <Text style={styles.revokeButtonText}>Revoke</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
     

       {type === "visitors" && (
        <ScrollView style={[styles.content,{paddingTop:30}]} showsVerticalScrollIndicator={false}>
          {/* QR Code Section */}

          {/* Visitor Information */}
          <View style={styles.section}>
            <InfoRow label="Visitor Name" value={visitorData.name} />
            <InfoRow label="Visitor ID" value={visitorData.id} />
            <InfoRow label="Visit Date" value={visitorData.fromDateTime} />
            <InfoRow label="Visit Time" value={visitorData.toDateTime} />
          </View>

          <View style={styles.section}>
            <InfoRow label="Validated Code" value={visitorData.accessCode} />
            <InfoRow label="Property Name" value={visitorData.property} />
          </View>

          <View style={styles.section}>
            <InfoRow label="Status" value={visitorData.requestedBy} />
          </View>

          {/* <View style={[styles.section, { borderBottomWidth: 0 }]}>
          <InfoRow label="Property" value={visitorData.property} />
        </View> */}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.alertButton}
              onPress={handleAlertSecurity}
            >
              <Text style={styles.alertButtonText}>Alert Security</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.revokeButton}
              onPress={handleRevoke}
            >
              <Text style={styles.revokeButtonText}>Revoke</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* Revoke Modal */}
      <Modal
        visible={revokeModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setRevokeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setRevokeModalVisible(false)}
            >
              <AntDesign name="closecircleo" size={24} color={"#D62828"} />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Are you Sure?</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to You want to revoke this invitation?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setRevokeModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Yes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmRevoke}
              >
                <Text style={styles.confirmButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Alert Security Modal */}
      <Modal
        visible={alertModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setAlertModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setAlertModalVisible(false)}
            >
              <AntDesign name="closecircleo" size={24} color={"#D62828"} />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Are you Sure?</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to You want to Alert Security?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setAlertModalVisible(false);
                  Alert.alert(
                    "Security Alerted",
                    "Security has been alerted about this visitor.",
                  );
                }}
              >
                <Text style={styles.alertCancelButtonText}>Alert</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmAlertSecurity}
              >
                <Text style={styles.confirmButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: adjustSize(18),
    fontFamily: typography.fonts.poppins.semiBold,
    color: colors.primary,
  },
  placeholder: {
    width: adjustSize(32),
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  qrSection: {
    alignItems: "center",
    // paddingVertical: spacing.xl,
    borderRadius: adjustSize(12),
  },
  qrContainer: {
    padding: spacing.lg,
    backgroundColor: colors.background,
    borderRadius: adjustSize(12),
  },
  downloadButton: {
    marginBottom: spacing.sm,
  },
  downloadText: {
    fontSize: adjustSize(12),
    color: colors.grey,
    fontFamily: typography.fonts.poppins.medium,
    textDecorationLine: "underline",
  },
  shareButton: {
    paddingHorizontal: spacing.lg,
  },
  shareText: {
    fontSize: adjustSize(14),
    color: colors.primary,
  },
  section: {
    // padding: spacing.lg,
    marginBottom: spacing.md,
    borderBottomWidth: 1,
    borderColor: colors.grey,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  label: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
    flex: 1,
    lineHeight: adjustSize(14),
  },
  value: {
    color: colors.textDim,
    fontFamily: typography.fonts.poppins.normal,
    flex: 1,
    textAlign: "right",
    lineHeight: adjustSize(14),
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.lg,
    // paddingHorizontal: spacing.sm,
  },
  alertButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: adjustSize(10),
    marginRight: spacing.sm,
    alignItems: "center",
    height: adjustSize(47),
    justifyContent: "center",
  },
  alertButtonText: {
    fontSize: adjustSize(14),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
  },
  revokeButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: adjustSize(10),
    alignItems: "center",
    height: adjustSize(47),
    justifyContent: "center",
  },
  revokeButtonText: {
    fontSize: adjustSize(14),
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
  qrPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  // Modal styles
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
  },
  closeButton: {
    position: "absolute",
    top: adjustSize(16),
    right: adjustSize(16),
    zIndex: 1,
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
    alignItems: "center",
    justifyContent: "center",
    height: adjustSize(47),
  },
  cancelButtonText: {
    fontSize: adjustSize(14),
    color: "#FF6B6B",
    fontFamily: typography.fonts.poppins.medium,
  },
  alertCancelButtonText: {
    fontSize: adjustSize(14),
    color: "#FF6B6B",
    fontFamily: typography.fonts.poppins.medium,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: adjustSize(10),
    alignItems: "center",
    justifyContent: "center",
    height: adjustSize(47),
  },
  confirmButtonText: {
    fontSize: adjustSize(14),
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
});
