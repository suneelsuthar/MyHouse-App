import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Screen, Text, Header, TextField } from "../../../Components";
import { colors, spacing, typography, adjustSize } from "../../../theme";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

const profileData = {
  name: "Brume Djbah",
  email: "brume.djbah@example.com",
  phone: "+1 (555) 123-4567",
  role: "Admin",
  department: "Property Management",
  joinDate: "January 15, 2023",
  employeeId: "EMP001",
  address: "123 Main Street, City, State 12345",
};

const menuItems = [
  {
    id: 1,
    title: "Edit Profile",
    icon: "edit",
    onPress: () => console.log("Edit Profile"),
  },
  {
    id: 2,
    title: "Change Password",
    icon: "lock",
    onPress: () => console.log("Change Password"),
  },
  {
    id: 3,
    title: "Notification Settings",
    icon: "notifications",
    onPress: () => console.log("Notification Settings"),
  },
  {
    id: 4,
    title: "Privacy Settings",
    icon: "privacy-tip",
    onPress: () => console.log("Privacy Settings"),
  },
  {
    id: 5,
    title: "Help & Support",
    icon: "help",
    onPress: () => console.log("Help & Support"),
  },
  {
    id: 6,
    title: "About",
    icon: "info",
    onPress: () => console.log("About"),
  },
];

export const AdminProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileInfo, setProfileInfo] = useState(profileData);

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert("Success", "Profile updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileInfo(profileData);
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
            Profile
          </Text>
        }
        rightAccessory={
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setIsEditing(!isEditing)}
          >
            <MaterialIcons
              name={isEditing ? "close" : "edit"}
              size={adjustSize(20)}
              color={colors.primary}
            />
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
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: spacing.xl,
    backgroundColor: colors.white,
    marginBottom: spacing.md,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: spacing.md,
  },
  avatar: {
    width: adjustSize(100),
    height: adjustSize(100),
    borderRadius: adjustSize(50),
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: adjustSize(36),
    color: colors.white,
  },
});
