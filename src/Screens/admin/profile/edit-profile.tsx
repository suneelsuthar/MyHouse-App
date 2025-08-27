import React, { useState } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Screen, Text, Header2, TextField, Button } from "../../../Components";
import { colors, typography, adjustSize } from "../../../theme";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
export const AdminEditProfile: React.FC = () => {
  const navigation = useNavigation();
  // ✅ States for input fields
  const [employeeId, setEmployeeId] = useState("ID-1235567");
  const [fullName, setFullName] = useState("Brume Djbah");
  const [email, setEmail] = useState("brume.djbah@example.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [address, setAddress] = useState("123 Main Street, City, State 12345");
  const [image, setImage] = useState<string | null>(null);

  // ✅ Loading state
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);

    // simulate API call
    setTimeout(() => {
      setLoading(false);
      navigation.goBack(); // 👈 move back after save
    }, 2000);
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header2 title="Profile" onNotificationPress={() => {}} />

      <ScrollView contentContainerStyle={{ paddingHorizontal: adjustSize(15) }}>
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

        {/* Employee ID */}
        <TextField
          value={employeeId}
          onChangeText={setEmployeeId}
          placeholder="ID-1235567"
          placeholderTextColor={colors.primaryLight}
          LeftAccessory={() => (
            <WithLocalSvg style={{ marginLeft: 10 }} asset={Images.userIcon} />
          )}
          containerStyle={[styles.input]}
        />

        {/* Full Name */}
        <TextField
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your full name"
          placeholderTextColor={colors.primaryLight}
          LeftAccessory={() => (
            <WithLocalSvg style={{ marginLeft: 10 }} asset={Images.userIcon} />
          )}
          containerStyle={[styles.input]}
        />

        {/* Email */}
        <TextField
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          placeholder="Enter a valid email address"
          placeholderTextColor={colors.primaryLight}
          LeftAccessory={() => (
            <WithLocalSvg style={{ marginLeft: 10 }} asset={Images.email} />
          )}
          containerStyle={[styles.input]}
        />

        {/* Phone */}
        <TextField
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter phone number"
          placeholderTextColor={colors.primaryLight}
          keyboardType="numeric"
          LeftAccessory={() => (
            <WithLocalSvg style={{ marginLeft: 10 }} asset={Images.callIcon} />
          )}
          containerStyle={[styles.input]}
        />

        {/* Address */}
        <TextField
          value={address}
          onChangeText={setAddress}
          placeholder="Enter your complete address"
          placeholderTextColor={colors.primaryLight}
          LeftAccessory={() => (
            <WithLocalSvg
              style={{ marginLeft: 10 }}
              asset={Images.addressIcon}
            />
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
    marginTop: adjustSize(15),
  },
  btn: {
    marginTop: adjustSize(40),
    height: adjustSize(50),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: adjustSize(20),
  },
  btnTxt: {
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  profileMain: {
    height: adjustSize(102),
    width: adjustSize(102),
    borderRadius: 100,
    borderWidth: 1,
    alignSelf: "center",
    marginTop: adjustSize(30),
    borderStyle: "dashed",
    borderColor: "#B0B0B0",
    alignItems: "center",
    justifyContent: "center",
  },
  edit: {
    textAlign: "center",
    color: colors.primaryLight,
    fontFamily: typography.fonts.poppins.normal,
    marginTop: adjustSize(15),
    marginBottom: adjustSize(15),
  },
  profile: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
});
