import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Screen, Header } from "../../../../Components";
import { adjustSize, colors, typography } from "../../../../theme";
import { RouteProp, useRoute } from "@react-navigation/native";
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
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

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
            <ActionButton label="Clear" onPress={() => {}} />
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
