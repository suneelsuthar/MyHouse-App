import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { IRoutes, AppStackParamList } from "../utils/interfaces";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, spacing, typography } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "../Components";
import { UserContext } from "../context/UserContext";

import {
  Splash,
  Intro,
  CreateAccount,
  LoginScreen,
  Home,
  Notification,
  Favourities,
  BookNow,
  Chat,
} from "../Screens";
import { HistoryIcon, HomeIcon, ProfileIcon } from "../assets/svg";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../assets/Images";
const Stack = createNativeStackNavigator<AppStackParamList>();
const Tab = createBottomTabNavigator<AppStackParamList>();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.primary },
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarLabelStyle: {
          fontFamily: typography.fonts.poppins.normal,
          fontSize: 12,
          color: colors.white,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <View style={{ marginTop: 5 }}>
              <WithLocalSvg asset={Images.homeIocn} />
              {focused && <View style={styles._activebar} />}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Favourities"
        component={Favourities}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <View style={{ marginTop: 5 }}>
              <WithLocalSvg asset={Images.favourite} />
              {focused && <View style={styles._activebar} />}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="BookNow"
        component={BookNow}
        options={{
          title: "Book now",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <View style={{ marginTop: 5 }}>
              <WithLocalSvg asset={Images.booknow} />
              {focused && <View style={styles._activebar} />}
            </View>
          ),
        }}
      />

      {/* Requests */}
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <View style={{ marginTop: 5 }}>
              <WithLocalSvg asset={Images.notification} />
              {focused && <View style={styles._activebar} />}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <View style={{ marginTop: 5 }}>
              <WithLocalSvg asset={Images.chat} />
              {focused && <View style={styles._activebar} />}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const userRoutes: IRoutes[] = [
  {
    name: "Main",
    component: Tabs,
    showHeader: false,
  },
];

const authRoutes: IRoutes[] = [
  {
    name: "Splash",
    component: Splash,
    showHeader: false,
  },
  {
    name: "Login",
    component: LoginScreen,
    showHeader: false,
    title: "Login",
  },

  {
    name: "CreateAccount",
    component: CreateAccount,
    showHeader: false,
    title: "",
  },

  {
    name: "Intro",
    component: Intro,
    showHeader: false,
    title: "Intro",
  },
];

export const Navigation = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [initialRoute, setInitialRoute] =
    React.useState<keyof AppStackParamList>("Splash");
  const [isLoading, setIsLoading] = React.useState(true);

  AsyncStorage.removeItem("hasLaunched");
  // Check if it's the first app launch
  React.useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem("hasLaunched");

        if (hasLaunched === "true") {
          setInitialRoute("GettingStart");
        } else {
          setInitialRoute("Splash");
        }
      } catch (error) {
        console.error("Error checking first launch:", error);
        setInitialRoute("Splash");
      } finally {
        setIsLoading(false);
      }
    };

    checkFirstLaunch();
  }, []);
  // Determine which routes to use based on authentication state
  const routes = user ? userRoutes : authRoutes;
  // Show loading indicator while checking first launch
  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      {routes?.map(({ name, component, showHeader, title }: any) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={{
            headerStyle: { backgroundColor: colors.white },
            headerLeft: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>
                <Text weight="semiBold" text={title} style={styles._title} />
              </View>
            ),
            headerTitle: "",
            headerShown: showHeader,
            headerShadowVisible: false,
            // headerShadowVisible: false,
            headerTitleStyle: {
              fontFamily: typography.fonts.poppins.semiBold,
              fontSize: 18,
              color: colors.primary,
            },
          }}
        />
      ))}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  _title: {
    fontSize: 20,
    paddingLeft: spacing.xs,
  },
  _activebar: {
    backgroundColor: colors.white,
    height: 3,
    borderRadius: 10,
    position: "absolute",
    zIndex: 10,
    bottom: -24,
    width: 20,
    alignSelf: "center",
    // zIndex:10
  },
});
