import React from "react";
import { StyleSheet, View } from "react-native";
import { Screen, Text, Button } from "../../../Components";
import {
  AppStackScreenProps,
  FacilityManagerStackParamList,
} from "../../../utils/interfaces";
import { colors, spacing } from "../../../theme";

export const Reviews: React.FC = () => {
  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <View style={styles.container}>
        <Text style={styles.title} weight="bold">
          View Reviews
        </Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screenContentContainer: {
    flex: 1,
    // backgroundColor: colors.fill,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  title: {
    fontSize: 24,
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.xl,
    marginTop: spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: 16,
    color: colors.text,
    textAlign: "center",
    lineHeight: 24,
  },
  backButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.md,
    marginTop: spacing.xl,
  },
  backButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
