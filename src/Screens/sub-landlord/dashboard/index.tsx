import React from "react";
import { StyleSheet, View } from "react-native";
import { Screen, Text, Button, LogoutButton } from "../../../Components";
import { SubLandlordStackParamList } from "../../../utils/interfaces";
import { colors, spacing } from "../../../theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// interface SubLandlordDashboardProps extends AppStackScreenProps<"SubLandlordDashboard"> {}
export type SubLandlordDashboardProps = NativeStackScreenProps<
  SubLandlordStackParamList,
  "SubLandlordDashboard"
>;

export function SubLandlordDashboard(props: SubLandlordDashboardProps) {
  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title} weight="bold">
            Sub-Landlord Dashboard
          </Text>
          <LogoutButton showUserInfo={true} />
        </View>
        
        <View style={styles.content}>
          <Text style={styles.description}>
            Overview of assigned properties, tenant status, and key performance metrics for your managed portfolio.
          </Text>
        </View>

        <Button
          text="Back to Sub-Landlord Home"
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
});
