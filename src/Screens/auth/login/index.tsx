import React, { useRef, useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button, Screen, Text, TextField } from "../../../Components";
import { AuthStackParamList } from "../../../utils/interfaces";
import { adjustSize, colors, spacing } from "../../../theme";
import { Images } from "../../../assets/Images";
import { loginValidations } from "../../../validations/auth";
import { ILogin } from "../../../types/app.types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { WithLocalSvg } from "react-native-svg/css";
import Dropdown from "../../../Components/DropDown";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectAuthLoading, selectAuthError } from "../../../store/selectors";
import { loginUser } from "../../../store/thunks/authThunks";
import Toast from "react-native-toast-message";
interface LoginScreenProps extends NativeStackScreenProps<AuthStackParamList, "Login"> {}
export function LoginScreen(props: LoginScreenProps) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const authPasswordInput = useRef<TextInput>();
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<ILogin>({
    resolver: yupResolver(loginValidations),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "suneelsuther@gmail.com",
      password: "112233",
    },
  });

  const [email, password] = watch(["email", "password"]);
  const isFormValid = Boolean(email && password && isValid);
  const [keepLoggedIn, setKeeLoggedIn] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("admin");

  // Redux hooks
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAuthLoading);
  const authError = useAppSelector(selectAuthError);

  // Role options for dropdown
  const roleOptions = [
    { label: "Admin", value: "admin" },
    { label: "Tenant", value: "tenant" },
    { label: "Agent", value: "agent" },
    { label: "Facility Manager", value: "facility_manager" },
    { label: "Landlord", value: "landlord" },
    { label: "Sub-Landlord", value: "sub_landlord" },
    { label: "Security", value: "security" },
  ];
  const login: SubmitHandler<ILogin> = async (formData: ILogin) => {
    try {
      const result = await dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
          role: selectedRole, // Pass selected role to login
        })
      );

      if (loginUser.fulfilled.match(result)) {
        Toast.show({
          type: "success",
          text1: "Login Successful",
          text2: `Welcome back! Logged in as ${result.payload.user.role}`,
        });
        
        // Navigation will be handled automatically by the AppNavigator
        // when isAuthenticated becomes true in the Redux store
      } else {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: authError || "Please check your credentials",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login Error",
        text2: "An unexpected error occurred",
      });
    }
    setLoading(false);
  };

  return (
    <>
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
            Login
            <Text
              style={styles._heading}
              weight="semiBold"
              text=" To Your Account"
            />
          </Text>

          <Text style={styles._notetext} weight="medium">
            Don’t have an account?
            <Text
              onPress={() => props.navigation.navigate("CreateAccount")}
              style={styles._register}
              weight="semiBold"
              text=" Register"
            />
          </Text>

          <View style={styles._dropdownview}>
            <Text style={styles._roleLabel} weight="medium">
              Select Role
            </Text>
            <View style={styles._roleDropdown}>
              <Dropdown
                dropdownStyle={styles._dropdownInner}
                placeholderStyle={styles._placeholderStyle}
                selectedTextStyle={styles._selectedTextStyle}
                data={roleOptions}
                placeholder="Choose your role"
                value={selectedRole}
                onChangeValue={(val: string) => {
                  setSelectedRole(val);
                }}
              />
            </View>
          </View>

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
                placeholder="Email"
                helper={errors.email?.message}
                status={errors.email ? "error" : undefined}
                LeftAccessory={() => (
                  <WithLocalSvg
                    style={{ marginLeft: 10 }}
                    asset={Images.email}
                  />
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
                placeholder="Password"
                containerStyle={styles.textField}
                helper={errors.password?.message}
                status={errors.password ? "error" : undefined}
                LeftAccessory={() => (
                  <WithLocalSvg
                    style={{ marginLeft: 10 }}
                    asset={Images.password}
                  />
                )}
              />
            )}
            name="password"
            rules={{ required: true }}
            defaultValue=""
          />

          <TouchableOpacity
          // onPress={() => props.navigation.navigate("ForgotPassword")}
          // style={{ alignSelf: "center" }}
          >
            <Text
              text="Forgot Password?"
              preset="formHelper"
              weight="medium"
              style={styles.enterDetails}
            />
          </TouchableOpacity>

          <Button
            testID="login-button"
            preset="reversed"
            disabled={!isFormValid || isLoading}
            onPress={handleSubmit(login)}
            text={isLoading ? "Logging in..." : "Login"}
            style={[
              !isFormValid && styles.disabledButton,
              {
                backgroundColor: isFormValid ? colors.primary : colors.border,
              },
            ]}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginVertical: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => setKeeLoggedIn(!keepLoggedIn)}
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
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

            <Text text="Keep me logged in" />
          </View>
          <View style={{ marginBottom: 50 }} />
        </ScrollView>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  disabledButton: {
    backgroundColor: colors.diabled,
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
    color: colors.primary,
    textAlign: "left",
    fontSize: 14,
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
    alignItems: "center",
    gap: 5,
    marginTop: 15,
  },
  _dropdownview: {
    marginVertical: spacing.md,
  },
  _roleLabel: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 8,
  },
  _roleDropdown: {
    marginBottom: 10,
  },
  _dropdownInner: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    backgroundColor: "#292766A3",
    height: adjustSize(49),
  },
  _placeholderStyle: {
    color: "#6C757D",
  },
  _selectedTextStyle: {
    fontSize: adjustSize(12),
    color: colors.white,
  },
});
