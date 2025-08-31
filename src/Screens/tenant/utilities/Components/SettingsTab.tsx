import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Text, TextField } from "../../../../Components";
import { colors, typography, adjustSize, spacing } from "../../../../theme";
import { CustomModal } from "./CustomModal";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";
import SwipeButton from "rn-swipe-button"; // 🔹 npm install rn-swipe-button
import Toast from "react-native-toast-message";
export const SettingsTab: React.FC = () => {
  // 🔹 Form states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedBack] = useState("");
  const [feedbackMessage, setFeedBackMessage] = useState("");
  const [deactivateAccModal, setDeactivateAccModal] = useState(false);
  const [deactivateAccConfrimModal, setDeactivateAccConfrimModal] =
    useState(false);

  // 🔹 Error states
  const [errors, setErrors] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // 🔹 Loading & Success states
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // 🔹 Swipe confirmation state
  const [isConfirmed, setIsConfirmed] = useState(false);

  const validate = () => {
    let valid = true;
    let tempErrors = { current: "", new: "", confirm: "" };

    if (!currentPassword.trim()) {
      tempErrors.current = "Current password is required!";
      valid = false;
    }
    if (!newPassword.trim()) {
      tempErrors.new = "New password is required!";
      valid = false;
    }
    if (!confirmPassword.trim()) {
      tempErrors.confirm = "Confirm password is required!";
      valid = false;
    }

    if (newPassword.trim() && confirmPassword.trim()) {
      if (newPassword.length < 6) {
        tempErrors.new = "Password must be at least 6 characters!";
        valid = false;
      }
      if (newPassword !== confirmPassword) {
        tempErrors.confirm = "Passwords do not match!";
        valid = false;
      }
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSave = () => {
    if (!validate()) return;

    setSaving(true);
    setSuccess(false);

    setTimeout(() => {
      setSaving(false);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 2500);
    }, 2000);
  };

  const handleChange = (
    field: "current" | "new" | "confirm",
    value: string
  ) => {
    if (field === "current") setCurrentPassword(value);
    if (field === "new") setNewPassword(value);
    if (field === "confirm") setConfirmPassword(value);

    setErrors((prev) => ({
      ...prev,
      [field]: value.trim() ? "" : prev[field],
    }));
  };

  // 🔹 Final confirm logic
  const confimHandler = () => {
    if (feedback.trim() === "") {
      setFeedBackMessage("Please enter a reason before confirming");
    } else {
      setFeedBackMessage("");
      setDeactivateAccConfrimModal(false)
      Toast.show({
        type: "success",
        text1: "Accont deactivitaed successfully.",
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: adjustSize(10),
          paddingBottom: adjustSize(20),
          marginTop: adjustSize(15),
        }}
      >
        {/* Current Password */}
        <Text style={styles.inputTitle}>Current Password*</Text>
        <TextField
          value={currentPassword}
          onChangeText={(val) => handleChange("current", val)}
          placeholder="Current Password"
          placeholderTextColor={colors.primaryLight}
          secureTextEntry={true}
          autoCapitalize="none"
          status={errors.current ? "error" : undefined}
          helper={errors.current}
        />

        {/* New Password */}
        <Text style={styles.inputTitle}>New Password*</Text>
        <TextField
          value={newPassword}
          onChangeText={(val) => handleChange("new", val)}
          placeholder="New password"
          placeholderTextColor={colors.primaryLight}
          secureTextEntry={true}
          autoCapitalize="none"
          status={errors.new ? "error" : undefined}
          helper={errors.new}
        />

        {/* Confirm Password */}
        <Text style={styles.inputTitle}>Confirm Password*</Text>
        <TextField
          value={confirmPassword}
          onChangeText={(val) => handleChange("confirm", val)}
          placeholder="Confirm Password"
          placeholderTextColor={colors.primaryLight}
          secureTextEntry={true}
          autoCapitalize="none"
          status={errors.confirm ? "error" : undefined}
          helper={errors.confirm}
        />

        {success && (
          <Text style={styles.successMsg}>
            Password updated successfully 🎉
          </Text>
        )}
      </ScrollView>

      {/* Footer buttons */}
      <View style={styles.footerRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.btn]}
          onPress={() => setDeactivateAccModal(true)}
        >
          <Text style={styles.btnTxt}>Deactivate Acc</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btn}
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={styles.btnTxt}>
            {saving ? "Saving..." : "Save changes"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* First Deactivate Modal */}
      <CustomModal
        visible={deactivateAccModal}
        onClose={() => setDeactivateAccModal(false)}
      >
        <Text style={styles.modalHeading}>Deactivate Account</Text>
        <AntDesign
          name="warning"
          size={adjustSize(60)}
          color="#D51E1E"
          style={{ alignSelf: "center", marginBottom: adjustSize(20) }}
        />
        <Text style={styles.modalTxt}>
          Are you sure you want to deactivate your account?
        </Text>
        <Text style={styles.modalTxt}>This action cannot be undone.</Text>
        <View style={styles.modalBtnMain}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.modalLeftBtn}
            onPress={() => setDeactivateAccModal(false)}
          >
            <Text style={styles.modalLeftBtnTxt}>No, keep my account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.modalRightBtn}
            onPress={() => {
              setDeactivateAccModal(false);
              setDeactivateAccConfrimModal(true);
            }}
          >
            <Text style={styles.modalRightBtnTxt}>Yes, deactivate</Text>
          </TouchableOpacity>
        </View>
      </CustomModal>

      {/* Final Confirmation Modal */}
      <CustomModal
        visible={deactivateAccConfrimModal}
        onClose={() => {
          setDeactivateAccConfrimModal(false);
          setIsConfirmed(false);
        }}
      >
        <Text style={styles.modalHeading}>Deactivate Account</Text>

        <View style={{ marginHorizontal: adjustSize(10) }}>
          <Text
            style={[
              styles.inputTitle,
              { fontSize: adjustSize(10), marginBottom: adjustSize(3) },
            ]}
          >
            Please tell us why you're deactivating your account
          </Text>
          <TextField
            value={feedback}
            onChangeText={(val) => {
              setFeedBack(val);
              if (val.trim()) setFeedBackMessage("");
            }}
            placeholder="Your feedback helps us improve..."
            placeholderTextColor={colors.primaryLight}
            status={feedbackMessage ? "error" : undefined}
            helper={feedbackMessage}
            inputWrapperStyle={[
              {
                height: adjustSize(120),
                alignItems: "flex-start",
                backgroundColor: colors.fill,
              },
            ]}
            style={{ height: adjustSize(120) }}
            multiline
          />
        </View>

        {/* 🔹 Slide button */}
        <View
          style={{
            marginHorizontal: adjustSize(10),
            marginTop: adjustSize(10),
          }}
        >
          <SwipeButton
            // height={45}
            // width={"100%"}
            disabled={isConfirmed} // lock after confirmed
            title={
              isConfirmed ? "Confirmed ✅" : "Slide to Confirm Deactivation"
            }
            titleColor={colors.white}
            railBackgroundColor={colors.grey}
            railFillBackgroundColor={"#4CAF50"}
            thumbIconBackgroundColor={colors.white}
            thumbIconBorderColor="transparent"
            thumbIconComponent={() => (
              <Ionicons
                name={isConfirmed ? "checkmark" : "arrow-forward"}
                size={24}
                color={isConfirmed ? "#4CAF50" : "#D51E1E"}
              />
            )}
            onSwipeSuccess={() => setIsConfirmed(true)}
            containerStyles={{ borderColor: "transparent" }}
            thumbIconStyles={{ borderColor: "transparent" }}
            railStyles={{ borderColor: "transparent" }}
            titleStyles={{ boborderColor: "transparent" }}
          />
        </View>

        <View style={styles.modalBtnMain}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.modalLeftBtn}
            onPress={() => {
              setDeactivateAccConfrimModal(false);
              setIsConfirmed(false);
              setDeactivateAccModal(true);
            }}
          >
            <Text style={styles.modalLeftBtnTxt}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.modalRightBtn,
              {
                opacity: isConfirmed ? 1 : 0.5,
              },
            ]}
            onPress={confimHandler}
            disabled={!isConfirmed}
          >
            <Text style={styles.modalRightBtnTxt}>Confirm Deactivation</Text>
          </TouchableOpacity>
        </View>
      </CustomModal>
    </View>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  inputTitle: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    marginTop: adjustSize(10),
  },
  successMsg: {
    marginTop: adjustSize(15),
    color: "green",
    fontSize: adjustSize(13),
    fontFamily: typography.fonts.poppins.medium,
  },
  footerRow: {
    flexDirection: "row",
    gap: spacing.md,
    paddingHorizontal: adjustSize(10),
    marginVertical: adjustSize(15),
    backgroundColor: colors.fill,
  },
  btn: {
    flex: 1,
    borderRadius: adjustSize(10),
    alignItems: "center",
    justifyContent: "center",
    height: adjustSize(49),
    backgroundColor: colors.primary,
  },
  btnTxt: {
    color: colors.white,
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  modalHeading: {
    fontSize: adjustSize(15),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    textAlign: "center",
    marginBottom: adjustSize(20),
  },
  modalTxt: {
    fontSize: adjustSize(12),
    color: "#7E7E7E",
    fontFamily: typography.fonts.poppins.normal,
    marginHorizontal: adjustSize(10),
    textAlign: "center",
  },
  modalBtnMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginHorizontal: adjustSize(10),
    marginTop: adjustSize(25),
  },
  modalLeftBtn: {
    borderRadius: adjustSize(10),
    alignItems: "center",
    justifyContent: "center",
    height: adjustSize(41),
    borderWidth: adjustSize(0.5),
    borderColor: colors.grey,
    paddingHorizontal: adjustSize(15),
    marginRight: adjustSize(15),
  },
  modalRightBtn: {
    borderRadius: adjustSize(10),
    alignItems: "center",
    justifyContent: "center",
    height: adjustSize(41),
    backgroundColor: "#D51E1E",
    paddingHorizontal: adjustSize(15),
  },
  modalLeftBtnTxt: {
    fontSize: adjustSize(12),
    color: colors.grey,
    fontFamily: typography.fonts.poppins.normal,
  },
  modalRightBtnTxt: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.semiBold,
  },
});
