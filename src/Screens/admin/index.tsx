import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Screen, Text, Button } from "../../Components";
import { AppStackScreenProps } from "../../utils/interfaces";
import { colors, spacing } from "../../theme";

interface AdminScreenProps extends AppStackScreenProps<"Admin"> {}

export function Admin(props: AdminScreenProps) {
  const navigateToScreen = (screenName: string) => {
    props.navigation.navigate(screenName as any);
  };

  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title} weight="bold">
            Admin Dashboard
          </Text>
          
          <View style={styles.buttonContainer}>
            <Button
              text="Dashboard"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("AdminDashboard")}
            />
            
            <Button
              text="User Management"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("AdminUserManagement")}
            />
            
            <Button
              text="Property Management"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("AdminPropertyManagement")}
            />
            
            <Button
              text="Financial Reports"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("AdminFinancialReports")}
            />
            
            <Button
              text="System Settings"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("AdminSystemSettings")}
            />
            
            <Button
              text="Analytics"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("AdminAnalytics")}
            />
            
            <Button
              text="Audit Logs"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("AdminAuditLogs")}
            />
            
            <Button
              text="Backup & Restore"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("AdminBackupRestore")}
            />
            
            <Button
              text="Support Tickets"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("AdminSupportTickets")}
            />
          </View>
        </View>
      </ScrollView>
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
    fontSize: 28,
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.xl,
    marginTop: spacing.lg,
  },
  buttonContainer: {
    gap: spacing.md,
  },
  navButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.md,
    marginVertical: spacing.xs,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
