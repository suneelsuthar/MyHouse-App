import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Text, TextField } from "../../../../Components";
import { colors, typography, adjustSize, spacing } from "../../../../theme";
import * as ImagePicker from "expo-image-picker";
import { Images } from "../../../../assets/Images";
import { WithLocalSvg } from "react-native-svg/css";
export const UpdateProfileTab: React.FC = ({ handleVerifyIdentity }: any) => {
  const [image, setImage] = useState<string | null>(
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
  );

  // 🔹 Form states
  const [userId, setUserId] = useState("ID-1235567");
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@email.com");
  const [phone, setPhone] = useState("03001234567");
  const [address, setAddress] = useState("Street 123, City, Country");

  // 🔹 Loading state for Save button
  const [saving, setSaving] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 3000); // ⏳ reset after 5 seconds
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: adjustSize(10),
          paddingBottom: adjustSize(10),
        }}
      >
        <TouchableOpacity
          style={styles.profileMain}
          activeOpacity={0.8}
          onPress={pickImage}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.profile} />
          ) : (
            <WithLocalSvg asset={Images.cameraIcon} />
          )}
        </TouchableOpacity>
        <Text style={styles.edit}>Edit Profile Picture</Text>

        {/* User ID */}
        <Text style={styles.inputTitle}>User ID</Text>
        <TextField
          value={userId}
          onChangeText={setUserId}
          placeholder="ID-1235567"
          placeholderTextColor={colors.primaryLight}
          editable={false}
        />

        {/* Full Name */}
        <Text style={styles.inputTitle}>Full Name*</Text>
        <TextField
          value={fullName}
          onChangeText={setFullName}
          placeholder="John Doe"
          placeholderTextColor={colors.primaryLight}
        />

        {/* Email */}
        <Text style={styles.inputTitle}>Email*</Text>
        <TextField
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor={colors.primaryLight}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* Phone */}
        <Text style={styles.inputTitle}>Phone Number*</Text>
        <TextField
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter phone number"
          placeholderTextColor={colors.primaryLight}
          keyboardType="number-pad"
        />

        {/* Address */}
        <Text style={styles.inputTitle}>Address*</Text>
        <TextField
          value={address}
          onChangeText={setAddress}
          placeholder="Enter address"
          placeholderTextColor={colors.primaryLight}
        />
      </ScrollView>
      {/* Footer buttons */}
      <View style={styles.footerRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.btn]}
          onPress={handleVerifyIdentity}
        >
          <Text style={styles.btnTxt}>Verify Identity</Text>
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
    </View>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  profileMain: {
    height: adjustSize(110),
    width: adjustSize(110),
    borderRadius: 100,
    alignSelf: "center",
    marginTop: adjustSize(30),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
  },
  edit: {
    textAlign: "center",
    color: colors.primaryLight,
    fontFamily: typography.fonts.poppins.normal,
    marginTop: adjustSize(10),
    marginBottom: adjustSize(15),
    fontSize: adjustSize(12),
  },
  profile: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  inputTitle: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    marginTop: adjustSize(10),
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
});
