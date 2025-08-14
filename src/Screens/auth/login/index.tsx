import React, { useRef, useState, useContext } from "react";
import {
  TextInput,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Button, Screen, Text, TextField } from "../../../Components";
import { AppStackScreenProps } from "../../../utils/interfaces";
import { colors, spacing } from "../../../theme";
import { Images } from "../../../assets/Images";
import { loginValidations } from "../../../validations/auth";
import { ILogin } from "../../../types/app.types";
import { authService } from "../../../services/auth.service";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { WithLocalSvg } from "react-native-svg/css";
import Dropdown from "../../../Components/DropDown";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { UserContext } from "../../../context/UserContext";
interface LoginScreenProps extends AppStackScreenProps<"Login"> {}
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
  const { user, setUser } = useContext(UserContext);
  const login: SubmitHandler<ILogin> = async (formData: ILogin) => {
    setLoading(true);

    const user = {
      email: email,
      role: "test@gmali.com",
      id: "1",
    };

    setUser(user);
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
            <Dropdown />
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
            text="Login"
            style={[!isFormValid && styles.disabledButton]}
            preset="reversed"
            gradient={false}
            onPress={handleSubmit(login)}
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

            <Text text="Keep me logged in" />
          </View>
          <View style={styles._orview}>
            <Text
              // weight="medium"
              text="OR"
              style={styles._ortext}
            />
          </View>
          <Button
            text="Continue with Google"
            onPress={() => authService.signInWithGoogle()}
            LeftAccessory={() => (
              <Image source={Images.google} style={{ height: 23, width: 23 }} />
            )}
            style={styles.tapButton}
            textStyle={styles._tabbttext}
          />

          <Button
            text="Continue with Facebook"
            onPress={() => authService.signInWithGoogle()}
            LeftAccessory={() => (
              <Image
                source={Images.facebookicon}
                style={{ height: 22, width: 11 }}
              />
            )}
            style={[styles.tapButton, { marginBottom: 50 }]}
            textStyle={styles._tabbttext}
          />
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
});
