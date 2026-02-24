import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Text, TextField, Button } from "../../../../Components";
import { colors, typography, adjustSize, spacing } from "../../../../theme";
import * as ImagePicker from "expo-image-picker";
import { Images } from "../../../../assets/Images";
import { WithLocalSvg } from "react-native-svg/css";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileValidations } from "../../../../validations/auth";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export const UpdateProfileTab: React.FC = ({ handleVerifyIdentity }: any) => {
  const [image, setImage] = useState<string | null>(
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
  );

  // 🔹 Form states
  const [userId] = useState("ID-1235567");
  const [saving, setSaving] = useState(false);
const navigation:any = useNavigation()
  // Initialize form with react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(profileValidations),
    defaultValues: {
      fullName: "John Doe",
      email: "johndoe@email.com",
      phone: "03001234567",
      address: "Street 123, City, Country",
    },
    mode: "onChange",
  });

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

  const onSubmit = async (data: FormData) => {
    try {
      setSaving(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      Toast.show({
        type: "success",
        text1: "Profile Updated",
        text2: "Your profile has been updated successfully",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: "Failed to update profile. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: adjustSize(16),
          paddingBottom: adjustSize(100), // Add padding to prevent content from being hidden behind the fixed footer
          paddingTop: adjustSize(10),
        }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.profileMain}
          activeOpacity={0.8}
          onPress={pickImage}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              tintColor={"wgute"}
              style={styles.profile}
            />
          ) : (
            <WithLocalSvg asset={Images.cameraIcon} />
          )}
        </TouchableOpacity>
        <Text style={styles.edit}>Edit Profile Photo</Text>

        {/* User ID */}
        <Text style={styles.inputTitle}>User ID</Text>
        <TextField
          value={userId}
          placeholder="ID-1235567"
          placeholderTextColor={colors.primaryLight}
          editable={false}
          inputWrapperStyle={{ backgroundColor: "white" }}
        />

        {/* Full Name */}
        <Text style={styles.inputTitle}>Full Name*</Text>
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextField
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="John Doe"
                placeholderTextColor={colors.primaryLight}
                inputWrapperStyle={{ backgroundColor: "white" }}

                // style={errors.fullName}
              />
              {errors.fullName && (
                <Text style={styles.errorText}>{errors.fullName.message}</Text>
              )}
            </>
          )}
        />

        {/* Email */}
        <Text style={styles.inputTitle}>Email*</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextField
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter your email"
                placeholderTextColor={colors.primaryLight}
                autoCapitalize="none"
                keyboardType="email-address"
                inputWrapperStyle={{ backgroundColor: "white" }}

                // style={errors.email && styles.inputError}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </>
          )}
        />

        {/* Phone */}
        <Text style={styles.inputTitle}>Phone*</Text>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextField
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="03001234567"
                placeholderTextColor={colors.primaryLight}
                keyboardType="phone-pad"
                inputWrapperStyle={{ backgroundColor: "white" }}
                style={styles.input}
                // style={errors.phone && styles.inputError}
              />
              {errors.phone && (
                <Text style={styles.errorText}>{errors.phone.message}</Text>
              )}
            </>
          )}
        />

        {/* Address */}
        <Text style={styles.inputTitle}>Address*</Text>
        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextField
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                // placeholder="Street 123, City, Country"
                placeholderTextColor={colors.primaryLight}
                multiline
                numberOfLines={3}
                inputWrapperStyle={{ height: 100, backgroundColor: "white" }}
                style={[
                  styles.textArea,
                  // errors.address && styles.inputError,
                ]}
              />
              {errors.address && (
                <Text style={styles.errorText}>{errors.address.message}</Text>
              )}
            </>
          )}
        />
      </ScrollView>
      {/* Footer buttons */}
      <View style={styles.footerRow}>
        <Button onPress={()=>navigation.navigate("Profile")} style={[styles.saveButton]}>
          <Text style={styles.saveButtonText}>Verify Identity</Text>
        </Button>
        <Button
          onPress={handleSubmit(onSubmit)}
          disabled={saving}
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
        >
          {saving ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.saveButtonText}>Save Changes</Text>
          )}
        </Button>
      </View>
    </View>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  inputError: {
    borderColor: colors.error,
    borderWidth: 1,
  },
  errorText: {
    color: colors.error,
    fontSize: adjustSize(11),
    marginTop: -4,
    // marginTop: 4,
    // marginBottom: 8,
  },
  textArea: {
    textAlignVertical: "top",
    minHeight: 100,
    paddingVertical: adjustSize(10),
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: adjustSize(12),
    borderRadius: adjustSize(8),
    alignItems: "center",
    // flex: 1,
    flex: 1,
    minHeight:adjustSize(49)
  },
  saveButtonDisabled: {
    backgroundColor: colors.diabled,
    flex: 1,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.semiBold,
    // fontWeight: "bold",
  },
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
    color: colors.primary,
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
    // marginTop: adjustSize(10),
  },
  footerRow: {
    flexDirection: "row",
    padding: adjustSize(15),
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignSelf: "center",
    gap: 20,
  },

  btnTxt: {
    color: colors.white,
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  input: {
    backgroundColor: colors.white,
  },
});
