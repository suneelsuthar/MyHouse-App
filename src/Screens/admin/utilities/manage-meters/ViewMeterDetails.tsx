import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
  TextInput,
} from "react-native";
import { Screen, Header, Button } from "../../../../Components";
import { adjustSize, colors, typography, spacing } from "../../../../theme";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
// import Clipboard from "@react-native-clipboard/clipboard";
import { AdminStackParamList } from "../../../../utils/interfaces";

type DetailRowProps = {
  label: string;
  value: string | number;
};

const DetailRow = ({ label, value }: DetailRowProps) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

type ActionButtonProps = {
  label: string;
  onPress: () => void;
};

const ActionButton = ({ label, onPress }: ActionButtonProps) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <Text style={styles.actionButtonText}>{label}</Text>
  </TouchableOpacity>
);

type ViewMeterDetailsScreenRouteProp = RouteProp<
  AdminStackParamList,
  "ViewMeterDetails"
>;

const ViewMeterDetails = () => {
  const route = useRoute<ViewMeterDetailsScreenRouteProp>();
  const { meter } = route.params;
  const [isEnabled, setIsEnabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [temperToken, setTemperToken] = useState("1234 5678 9101 1121");

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const copyToClipboard = () => {
    // Clipboard.setString(temperToken);
    setIsModalVisible(false);
  };

  const handleClearTemper = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleRecharge = () => {
    console.log("Recharge button pressed");
    // Navigate to recharge screen or show modal
  };

  const handleViewTenants = () => {
    console.log("View Tenants button pressed");
    // Navigate to tenants screen
  };

  const handleUnassign = () => {
    console.log("Un-assign button pressed");
    // Show confirmation alert and handle un-assignment
  };

  const handleViewConsumption = () => {
    console.log("View Consumption button pressed");
    // Navigate to consumption screen
  };

  return (
    <Screen
      contentContainerStyle={styles.container}
      preset="fixed"
      safeAreaEdges={["top"]}
    >
      <Header title="View Meter Details" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meter Details</Text>
          <DetailRow label="Meter ID:" value={meter.meterId} />
          <DetailRow label="Meter Number:" value="Lorem Ipsum" />
          <DetailRow label="Sim Card:" value="Lorem Ipsum" />
          <DetailRow label="Manufacturer:" value={meter.manufacturer} />
          <View style={{ paddingVertical: adjustSize(10) }} />
          <DetailRow label="Terminal number:" value="Lorem Ipsum" />
          <DetailRow label="Terminal ID:" value="Lorem Ipsum" />
          <DetailRow label="Terminal type:" value="Lorem Ipsum" />
          <View style={{ paddingVertical: adjustSize(10) }} />
          <DetailRow label="Phase Number:" value="Lorem Ipsum" />
          <DetailRow label="Property Group:" value={meter.groupId} />
          <DetailRow label="Property Name:" value="Lorem Ipsum" />
          <DetailRow label="Property ID:" value={meter.propertyId} />
          <View
            style={{
              paddingVertical: adjustSize(10),
              borderBottomWidth: 0.7,
              borderColor: colors.grey,
            }}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Manage</Text>
          <View style={styles.manageRow}>
            <Text style={styles.manageLabel}>Clear Temper</Text>
            <ActionButton label="Clear" onPress={handleClearTemper} />
          </View>
          <View style={styles.manageRow}>
            <Text style={styles.manageLabel}>Send token</Text>
            <ActionButton label="Send" onPress={() => {}} />
          </View>
          <View style={styles.manageRow}>
            <Text style={styles.manageLabel}>Clear Credit</Text>
            <ActionButton label="Clear" onPress={() => {}} />
          </View>
          <View style={styles.manageRow}>
            <Text style={styles.manageLabel}>Switch</Text>
            <Switch
              trackColor={{ false: colors.white, true: colors.primary }}
              thumbColor={colors.white}
              ios_backgroundColor="#B0B0B0"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>

        <View
          style={{
            marginVertical: adjustSize(10),
            borderBottomWidth: 0.7,
            borderColor: colors.grey,
          }}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stat</Text>
          <DetailRow label="Assigned:" value="Lorem Ipsum" />
          <DetailRow label="Last Recharged:" value="Lorem Ipsum" />
          <DetailRow label="Current Units:" value="Lorem Ipsum" />
          <View style={{ paddingVertical: adjustSize(10) }} />

          <DetailRow label="Last Recharge Amount:" value="Lorem Ipsum" />
          <DetailRow label="Total Spent:" value="Lorem Ipsum" />
          <View style={{ paddingVertical: adjustSize(10) }} />

          <View style={styles.manageRow}>
            <Text style={styles.manageLabel}>Transactions</Text>
            <ActionButton label="View" onPress={() => {}} />
          </View>
          <View style={styles.manageRow}>
            <Text style={styles.manageLabel}>Logs</Text>
            <ActionButton label="View" onPress={() => {}} />
          </View>
        </View>
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
              <Ionicons name="close-circle" size={24} color={colors.error} />
            </TouchableOpacity>
            <Text style={styles.modalText}>Clear Temper</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={temperToken}
                editable={false}
              />
              <TouchableOpacity onPress={copyToClipboard}>
                <Ionicons
                  name="copy-outline"
                  size={24}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
            <Button
              text="Copy"
              preset="reversed"
              onPress={copyToClipboard}
              style={styles.copyButton}
            />
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
  content: {
    padding: adjustSize(20),
    paddingBottom: 50,
  },
  section: {
    // marginBottom: adjustSize(20),
  },
  sectionTitle: {
    fontSize: adjustSize(16),
    fontFamily: typography.fonts.poppins.semiBold,
    color: colors.primary,
    marginVertical: adjustSize(15),
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: adjustSize(10),
  },
  detailLabel: {
    fontSize: adjustSize(14),
    color: colors.primary,
  },
  detailValue: {
    fontSize: adjustSize(12),
    color: colors.textDim,
  },
  manageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: adjustSize(10),
  },
  manageLabel: {
    fontSize: adjustSize(14),
    color: colors.primary,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  modalText: {
    fontSize: adjustSize(16),
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: colors.primary,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "100%",
  },
  input: {
    flex: 1,
    fontSize: adjustSize(16),
    color: colors.text,
    height: adjustSize(47),
  },
  copyButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  copyButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: adjustSize(5),
    height: adjustSize(28),
    minWidth: adjustSize(114),
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonText: {
    color: colors.white,
    fontSize: adjustSize(12),
  },
});

export default ViewMeterDetails;
