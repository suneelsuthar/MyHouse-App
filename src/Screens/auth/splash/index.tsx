import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { Screen, Text } from "../../../Components";
import { AppStackScreenProps } from "../../../utils/interfaces";
import { colors, spacing } from "../../../theme";
import { Images } from "../../../assets/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WithLocalSvg } from "react-native-svg/css";

interface SplashScreenProps extends AppStackScreenProps<"Splash"> {}

export function Splash(props: SplashScreenProps) {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateBounce = () => {
      // One bounce cycle
      return Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -20, // Move up
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0, // Move down
          duration: 600,
          useNativeDriver: true,
        }),
      ]);
    };

    // Repeat bounce 3 times
    Animated.sequence([
      animateBounce(),
      animateBounce(),
      animateBounce(),
    ]).start(async () => {
      await AsyncStorage.setItem("hasLaunched", "true");
      props.navigation.replace("Login");
    });
  }, [bounceAnim, props.navigation]);

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
    >
      <View style={styles._bg}>
        <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
          <WithLocalSvg asset={Images.logo} />
        </Animated.View>
        <Text text="myhomesng.com" style={styles._subtitle} weight="semiBold" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContentContainer: {
    flex: 1,
  },
  _bg: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
  },
  _subtitle: {
    color: colors.primary,
    fontSize: 24,
    lineHeight: 24,
    textAlign: "center",
    marginVertical: spacing.md,
  },
});
