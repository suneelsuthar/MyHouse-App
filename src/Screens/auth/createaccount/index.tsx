import React, { useState, useRef } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Button, Text, TextField, Screen } from "../../../Components";
import { AuthStackParamList } from "../../../utils/interfaces";
import { adjustSize, colors, spacing } from "../../../theme";
import Toast from "react-native-toast-message";
import { Images } from "../../../assets/Images";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { WithLocalSvg } from "react-native-svg/css";
import { authService } from "../../../services/auth.service";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import Dropdown from "../../../Components/DropDown";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// Define validation schema for signup
const signupValidationSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const defaultValues: SignUpFormData = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

interface CreateAccountProps extends NativeStackScreenProps<AuthStackParamList, "CreateAccount"> {}

export function CreateAccount(props: CreateAccountProps) {
  const [loading, setLoading] = useState(false);
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
  const [checked, setChecked] = useState(false);
  const authPasswordInput = useRef<TextInput>();
  const [keepLoggedIn, setKeeLoggedIn] = useState(false);

  // No need for useToast hook with react-native-toast-message
  const nav = useNavigation<NavigationProp>();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SignUpFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(signupValidationSchema),
    defaultValues,
  });

  const [email, password, confirmPassword] = watch([
    "email",
    "password",
    "confirmPassword",
  ]);
  const isFormValid = Boolean(email && password && confirmPassword && isValid);

  const signup: SubmitHandler<SignUpFormData> = async (formData) => {
    if (!checked) {
      Toast.show({
        type: "error",
        text1: "Terms Not Accepted",
        text2: "Please accept the terms and conditions to continue",
        position: "top",
      });
      return;
    }

    setLoading(true);
    try {
      const { email, password } = formData;

      const { user, error }: any = await authService.signUp({
        email,
        password,
      });

      if (error) {
        Toast.show({
          type: "error",
          text1: "Sign Up Failed",
          text2: error.message,
          position: "top",
        });
        return;
      }

      if (user) {
        nav.navigate("Login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : "An unexpected error occurred. Please try again.";

      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={styles.screenContentContainer}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles._logoview}>
          <WithLocalSvg asset={Images.logo} style={{ marginBottom: 10 }} />
          <WithLocalSvg asset={Images.sublogo} />
        </View>
        <View style={styles._divider} />
        <Text style={styles._heading_light} weight="semiBold">
          Create
          <Text style={styles._heading} weight="semiBold" text=" Account" />
        </Text>

        <Text style={styles._notetext} weight="medium">
          Already have an account?
          <Text
            onPress={() => props.navigation.navigate("Login")}
            style={styles._register}
            weight="semiBold"
            text=" Login"
          />
        </Text>

        <View style={styles._dropdownview}>
          <Dropdown />
        </View>

        <Controller
          name="fullName"
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              value={value}
              onChangeText={(value) => onChange(value)}
              onBlur={onBlur}
              autoCorrect={false}
              placeholder="Enter you full name"
              helper={errors.fullName?.message}
              status={errors.fullName ? "error" : undefined}
              LeftAccessory={() => (
                <WithLocalSvg
                  style={{ marginLeft: 10 }}
                  asset={Images.fullname}
                />
              )}
              onSubmitEditing={() => authPasswordInput.current?.focus()}
              containerStyle={[
                styles.textField,

                // emailFocused ? { borderColor: colors.primary } : null, // Apply border color if focused
              ]}
            />
          )}
        />
        <Controller
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              value={value}
              onChangeText={(value) => onChange(value)}
              onBlur={onBlur}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              keyboardType="email-address"
              placeholder="Enter a valid email address"
              helper={errors.email?.message}
              status={errors.email ? "error" : undefined}
              LeftAccessory={() => (
                <WithLocalSvg style={{ marginLeft: 10 }} asset={Images.email} />
              )}
              onSubmitEditing={() => authPasswordInput.current?.focus()}
              containerStyle={[
                styles.textField,

                // emailFocused ? { borderColor: colors.primary } : null, // Apply border color if focused
              ]}
            />
          )}
          name="email"
          rules={{ required: true }}
          defaultValue=""
        />

        <Controller
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              value={value}
              onChangeText={(value) => onChange(value)}
              onBlur={onBlur}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
              secureTextEntry={isAuthPasswordHidden}
              placeholder="Enter strong password"
              containerStyle={styles.textField}
              helper={errors.password?.message}
              status={errors.password ? "error" : undefined}
              LeftAccessory={() => (
                <WithLocalSvg style={{ marginLeft: 10 }} asset={Images.lock} />
              )}
            />
          )}
          name="password"
          rules={{ required: true }}
          defaultValue=""
        />

        <Controller
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              value={value}
              onChangeText={(value) => onChange(value)}
              onBlur={onBlur}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
              secureTextEntry={isAuthPasswordHidden}
              placeholder="Re-enter password"
              containerStyle={styles.textField}
              helper={errors.confirmPassword?.message}
              status={errors.confirmPassword ? "error" : undefined}
              LeftAccessory={() => (
                <WithLocalSvg style={{ marginLeft: 10 }} asset={Images.lock} />
              )}
            />
          )}
          name="password"
          rules={{ required: true }}
          defaultValue=""
        />

        <Button
          testID="signup-button"
          text="Sign up"
          style={[!isFormValid && styles.disabledButton, { marginTop: 30 }]}
          preset="reversed"
          gradient={false}
          onPress={handleSubmit(signup)}
          textStyle={{ color: colors.white, fontFamily: "bold" }}
          disabled={!isFormValid || loading}
          RightAccessory={() =>
            loading ? (
              <ActivityIndicator
                style={{ position: "absolute", right: 20 }}
                color={colors.white}
              />
            ) : null
          }
        />

        <View style={styles._row}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{ marginTop: 5 }}
            onPress={() => setKeeLoggedIn(!keepLoggedIn)}
          >
            {keepLoggedIn ? (
              <MaterialCommunityIcons
                name="checkbox-marked-outline"
                size={24}
                color={colors.primary}
              />
            ) : (
              <MaterialCommunityIcons
                name="checkbox-blank-outline"
                size={24}
                color="black"
              />
            )}
          </TouchableOpacity>

          <Text style={styles._agree_text}>
            I agree to be bound by these {" "}
            <Text style={styles._underline}>Terms & Condition</Text>   and{"  "}
            <Text style={styles._underline}>User Agreement.</Text>
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  disabledButton: {
    backgroundColor: colors.primary,
  },
  _heading: {
    textAlign: "center",
    fontSize: 24,
    lineHeight: 32,
    color: colors.primary,
  },
  _heading_light: {
    textAlign: "center",
    fontSize: 24,
    lineHeight: 32,
    color: "#29276680",
    marginVertical: 5,
  },

  textField: {
    marginVertical: spacing.md,
  },
  _dropdownview: {
    marginVertical: spacing.md,
  },

  enterDetails: {
    marginBottom: spacing.lg,
    color: "#B0B0B0",
  },
  screenContentContainer: {
    flex: 1,
    marginHorizontal: spacing.md,
    paddingTop: 70,
  },
  _logoview: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  _orview: {
    alignItems: "center",
    marginTop: 35,
  },
  _ortext: {
    fontSize: 16,
    paddingHorizontal: spacing.sm,
    color: colors.primaryLight,
  },
  tapButton: {
    borderRadius: 16,
    marginVertical: spacing.md,
    backgroundColor: colors.fill,
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    marginHorizontal: 1,
    justifyContent: "flex-start",
  },
  _tabbttext: {
    fontFamily: "semiBol",
    paddingLeft: spacing.sm,
    color: colors.primaryLight,
    textAlign: "left",
  },
  _divider: {
    borderBottomWidth: 1,
    borderColor: "#B0B0B0",
    marginVertical: 25,
  },
  _notetext: {
    textAlign: "center",
    color: colors.primary,
    fontSize: 14,
    marginBottom: 20,
  },
  _register: {
    color: "#B0B0B0",
  },
  _row: {
    flexDirection: "row",
    // alignItems: "center",
    gap: 5,
    marginTop: 15,
  },
  _underline: {
    textDecorationLine: "underline",
    marginHorizontal: 3,
    color: colors.primary,
  },
  _agree_text: {
    color: colors.primary,
    marginBottom: 30,
  },
});
