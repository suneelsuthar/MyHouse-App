import { NavigationContainer } from "@react-navigation/native";
import { Navigation } from "./src/navigation/StackNavigator";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import React from "react";
import Config from "./src/config";
import { ErrorBoundary } from "./src/Screens/error/ErrorBoundary";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "@expo-google-fonts/poppins";
import {
  LogBox,
  StatusBar,
  Platform,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/store";
import Toast, { BaseToast, BaseToastProps } from "react-native-toast-message";
import { colors } from "./src/theme";
import { Feather } from "@expo/vector-icons";
import { typography } from "./src/theme";
import { ActivityIndicator } from "react-native";

// Define our custom toast types
type ToastType = "success" | "error" | "info";

// Extend the BaseToastProps to include our custom props
interface CustomToastProps extends BaseToastProps {
  type: ToastType;
}

// Custom Toast Component
const CustomToast = (props: CustomToastProps) => {
  const getBackgroundColor = () => {
    switch (props.type) {
      case "success":
        return colors.palette.primary;
      case "error":
        return colors.error;
      case "info":
      default:
        return colors.palette.neutral800;
    }
  };

  const getIcon = () => {
    switch (props.type) {
      case "success":
        return <Feather name="check-circle" size={20} color={colors.white} />;
      case "error":
        return <Feather name="alert-circle" size={20} color={colors.white} />;
      case "info":
      default:
        return <Feather name="info" size={20} color={colors.white} />;
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: getBackgroundColor(),
        padding: 16,
        borderRadius: 8,
        marginHorizontal: 16,
        marginTop: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        minHeight: 60,
      }}
    >
      <View style={{ marginRight: 12 }}>{getIcon()}</View>
      <View style={{ flex: 1 }}>
        {props.text1 && (
          <Text
            style={{
              color: colors.white,
              fontFamily: typography.fonts.poppins.bold,
              fontSize: 14,
              marginBottom: 4,
            }}
          >
            {props.text1}
          </Text>
        )}
        {props.text2 && (
          <Text
            style={{
              color: colors.white,
              fontFamily: typography.fonts.poppins.medium,
              fontSize: 13,
              opacity: 0.9,
            }}
          >
            {props.text2}
          </Text>
        )}
      </View>
    </View>
  );
};

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

// Loading component for PersistGate
const LoadingComponent = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={colors.palette.primary} />
  </View>
);

const App = () => {
  let [fontsLoaded] = useFonts({
    light: require("./assets/fonts/Poppins-Light.ttf"),
    normal: require("./assets/fonts/Poppins-Regular.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    semiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingComponent />} persistor={persistor}>
        <StatusBar
          barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
          backgroundColor="#FFFFFF"
          translucent={false}
        />
        <SafeAreaProvider
          initialMetrics={initialWindowMetrics}
          style={{ flex: 1 }}
        >
          <ErrorBoundary catchErrors="dev">
            <NavigationContainer
              theme={{
                dark: false,
                colors: {
                  primary: colors.palette.primary,
                  background: colors.background,
                  card: colors.background,
                  text: colors.text,
                  border: colors.border,
                  notification: colors.palette.primary,
                },
              }}
            >
              <GestureHandlerRootView style={{ flex: 1 }}>
                <Navigation />
              </GestureHandlerRootView>
            </NavigationContainer>
          </ErrorBoundary>
        </SafeAreaProvider>
      </PersistGate>
      <Toast
        config={{
          success: (props) => {
            const { text1, text2, ...rest } = props;
            return (
              <CustomToast
                {...rest}
                type="success"
                text1={text1}
                text2={text2}
              />
            );
          },
          error: (props) => {
            const { text1, text2, ...rest } = props;
            return (
              <CustomToast {...rest} type="error" text1={text1} text2={text2} />
            );
          },
          info: (props) => {
            const { text1, text2, ...rest } = props;
            return (
              <CustomToast {...rest} type="info" text1={text1} text2={text2} />
            );
          },
        }}
        topOffset={50}
        autoHide={true}
        visibilityTime={4000}
      />
    </Provider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});

export default App;
