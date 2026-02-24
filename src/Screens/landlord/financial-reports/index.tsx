import React from "react";
import { StyleSheet, View } from "react-native";
import { Screen, Text, Button } from "../../../Components";
import { AppStackScreenProps } from "../../../utils/interfaces";
import { colors, spacing } from "../../../theme";

interface LandlordFinancialReportsProps extends AppStackScreenProps<"LandlordFinancialReports"> {}

export function LandlordFinancialReports(props: LandlordFinancialReportsProps) {
  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <View style={styles.container}>
        <Text style={styles.title} weight="bold">
          Financial Reports
        </Text>
        
        <View style={styles.content}>
          <Text style={styles.description}>
            Generate financial reports, profit/loss statements, and tax documents for your properties.
          </Text>
        </View>

        <Button
          text="Back to Landlord Home"
          style={styles.backButton}
          textStyle={styles.backButtonText}
          onPress={() => props.navigation.goBack()}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContentContainer: {
    flex: 1,
    backgroundColor: colors.fill,
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
