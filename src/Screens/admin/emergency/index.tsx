import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Screen, Text, Header } from "../../../Components";
import { colors, spacing, typography, adjustSize } from "../../../theme";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

const emergencyContacts = [
  {
    id: 1,
    name: "Police Department",
    number: "911",
    type: "police",
    icon: "local-police",
    color: "#2196F3",
  },
  {
    id: 2,
    name: "Fire Department",
    number: "911",
    type: "fire",
    icon: "local-fire-department",
    color: "#F44336",
  },
  {
    id: 3,
    name: "Medical Emergency",
    number: "911",
    type: "medical",
    icon: "local-hospital",
    color: "#4CAF50",
  },
  {
    id: 4,
    name: "Security Office",
    number: "+1 (555) 123-4567",
    type: "security",
    icon: "security",
    color: "#FF9800",
  },
  {
    id: 5,
    name: "Property Management",
    number: "+1 (555) 987-6543",
    type: "management",
    icon: "business",
    color: "#9C27B0",
  },
];

export const AdminEmergency: React.FC = () => {
  const [activeAlert, setActiveAlert] = useState<string | null>(null);

  const handleEmergencyCall = (contact: (typeof emergencyContacts)[0]) => {
    Alert.alert(
      "Emergency Call",
      `Are you sure you want to call ${contact.name} at ${contact.number}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Call",
          style: "destructive",
          onPress: () => {
            // Here you would implement actual calling functionality
            console.log(`Calling ${contact.number}`);
          },
        },
      ]
    );
  };

  const handlePanicAlert = () => {
    Alert.alert(
      "Panic Alert",
      "This will send an emergency alert to all security personnel and management. Continue?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Send Alert",
          style: "destructive",
          onPress: () => {
            setActiveAlert("panic");
            // Here you would implement panic alert functionality
            console.log("Panic alert sent");
            setTimeout(() => setActiveAlert(null), 3000);
          },
        },
      ]
    );
  };

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header
        leftAccessory={
          <TouchableOpacity activeOpacity={0.5}>
            <WithLocalSvg asset={Images.user} />
          </TouchableOpacity>
        }
        centerAccessory={
          <Text
            weight="semiBold"
            style={{ fontSize: adjustSize(15), color: colors.primary }}
          >
            Emergency
          </Text>
        }
        rightAccessory={
          <TouchableOpacity activeOpacity={0.5}>
            <WithLocalSvg asset={Images.notofication} />
          </TouchableOpacity>
        }
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
});
