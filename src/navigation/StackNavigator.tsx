import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { colors, spacing, typography } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../Components";
import { useAppSelector } from "../store/hooks";
import { selectNavigationState } from "../store/selectors";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppStackParamList, AuthStackParamList } from "../utils/interfaces";

// Import tab navigators
import {
  TenantTabNavigator,
  AgentTabNavigator,
  FacilityManagerTabNavigator,
  LandlordTabNavigator,
  SubLandlordTabNavigator,
  SecurityTabNavigator,
  AdminTabNavigator,
} from "./TabNavigator";

// Import all screens
import {
  Splash,
  Intro,
  CreateAccount,
  LoginScreen,
  // Global screens
  GlobalScreen,
  TermsConditionsScreen,
  AboutUsScreen,
  FAQScreen,
  ContactUsScreen,
  HelpScreen,
  PropertyFiltersScreen,
} from "../Screens";

// Create stack navigators
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Stack = createNativeStackNavigator<AppStackParamList>();

// Auth Stack Navigator
const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Splash" component={Splash} />
    <AuthStack.Screen name="Intro" component={Intro} />
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="CreateAccount" component={CreateAccount} />
  </AuthStack.Navigator>
);

// Main App Navigation
const AppNavigator = () => {
  const { isAuthenticated, userRole } = useAppSelector(selectNavigationState);

  if (!isAuthenticated) {
    return <AuthNavigator />;
  }

  const getNavigator = () => {
    switch (userRole) {
      case "admin":
        return AdminTabNavigator;
      case "tenant":
        return TenantTabNavigator;
      case "agent":
        return AgentTabNavigator;
      case "facility_manager":
        return FacilityManagerTabNavigator;
      case "landlord":
        return LandlordTabNavigator;
      case "sub_landlord":
        return SubLandlordTabNavigator;
      case "security":
        return SecurityTabNavigator;
      default:
        return TenantTabNavigator; // Fallback to tenant navigator
    }
  };

  const MainNavigator = getNavigator();

  // Return appropriate tab navigator based on user role with global screens
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Role-based main navigator */}
      {userRole === "admin" && (
        <Stack.Screen name="Main" component={AdminTabNavigator} />
      )}
      {userRole === "tenant" && (
        <Stack.Screen name="Main" component={TenantTabNavigator} />
      )}
      {userRole === "agent" && (
        <Stack.Screen name="Main" component={AgentTabNavigator} />
      )}
      {userRole === "facility_manager" && (
        <Stack.Screen name="Main" component={FacilityManagerTabNavigator} />
      )}
      {userRole === "landlord" && (
        <Stack.Screen name="Main" component={LandlordTabNavigator} />
      )}
      {userRole === "sub_landlord" && (
        <Stack.Screen name="Main" component={SubLandlordTabNavigator} />
      )}
      {userRole === "security" && (
        <Stack.Screen name="Main" component={SecurityTabNavigator} />
      )}
      {!userRole && <Stack.Screen name="Main" component={TenantTabNavigator} />}

      {/* Global screens accessible from any role */}
      <Stack.Screen name="Global" component={GlobalScreen} />
      <Stack.Screen name="PropertyFilters" component={PropertyFiltersScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
      <Stack.Screen name="FAQ" component={FAQScreen} />
      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
      <Stack.Screen name="TermsConditions" component={TermsConditionsScreen} />
    </Stack.Navigator>
  );
};

const userRoutes: any[] = [
  {
    name: "Main",
    component: AppNavigator,
    showHeader: false,
  },
];

const authRoutes: any[] = [
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
  const { isAuthenticated } = useAppSelector(
    selectNavigationState
  );
  const [initialRoute, setInitialRoute] =
    React.useState<keyof AppStackParamList>("Splash");
  const [isLoading, setIsLoading] = React.useState(true);

  // Check if it's the first app launch
  React.useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem("hasLaunched");

        if (hasLaunched === "true") {
          setInitialRoute("Splash");
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
  const routes = isAuthenticated ? userRoutes : authRoutes;
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
