import React, { useState } from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Screen, Text, Header2, TextField, Button } from "../../../Components";
import { colors, typography, adjustSize } from "../../../theme";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
import { useNavigation } from "@react-navigation/native";

export const AdminProfileSettings: React.FC = () => {
  const navigation = useNavigation();

  // ✅ States for passwords
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ Loading state
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    // simulate API call
    setTimeout(() => {
      setLoading(false);
      navigation.goBack(); // 👈 move back after save
    }, 2000);
  };

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header2 title="Settings" onNotificationPress={() => {}} />

      <ScrollView contentContainerStyle={{ paddingHorizontal: adjustSize(15) }}>
        <Text style={styles.heading}>Change Password</Text>

        {/* Current Password */}
        <Text style={styles.title}>Current password</Text>
        <TextField
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder="Enter current password"
          placeholderTextColor={colors.primaryLight}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry
          LeftAccessory={() => (
            <WithLocalSvg style={{ marginLeft: 10 }} asset={Images.lock2} />
          )}
          containerStyle={[styles.input]}
        />

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>

        {/* New Password */}
        <Text style={styles.title}>Create new password</Text>
        <TextField
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Enter strong password"
          placeholderTextColor={colors.primaryLight}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry
          LeftAccessory={() => (
            <WithLocalSvg style={{ marginLeft: 10 }} asset={Images.lock2} />
          )}
          containerStyle={[styles.input]}
        />

        {/* Confirm Password */}
        <TextField
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Re-enter password"
          placeholderTextColor={colors.primaryLight}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry
          LeftAccessory={() => (
            <WithLocalSvg style={{ marginLeft: 10 }} asset={Images.lock2} />
          )}
          containerStyle={[styles.input]}
        />

        {/* Save Button */}
        <Button
          text={loading ? "Saving ..." : "Save Changes"}
          preset="reversed"
          style={styles.btn}
          textStyle={styles.btnTxt}
          onPress={handleSave}
          disabled={loading}
        />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  input: {
    marginTop: adjustSize(10),
  },
  btn: {
    marginTop: adjustSize(50),
    height: adjustSize(50),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: adjustSize(20),
  },
  btnTxt: {
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  heading: {
    color: colors.primary,
    fontSize: adjustSize(24),
    fontFamily: typography.fonts.poppins.semiBold,
    lineHeight: adjustSize(40),
    marginTop: adjustSize(40),
  },
  title: {
    color: colors.primary,
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
    marginTop: adjustSize(35),
  },
  forgotPassword: {
    color: "#7E7E7E",
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.normal,
    textAlign: "right",
  },
});
