import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Screen, Text, Button } from "../../Components";
import { AppStackScreenProps } from "../../utils/interfaces";
import { colors, spacing } from "../../theme";

interface SecurityScreenProps extends AppStackScreenProps<"Security"> {}

export function Security(props: SecurityScreenProps) {
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
            Security Dashboard
          </Text>
          
          <View style={styles.buttonContainer}>
            <Button
              text="Dashboard"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("SecurityDashboard")}
            />
            
            <Button
              text="Visitor Logs"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("SecurityVisitorLogs")}
            />
            
            <Button
              text="Incident Reports"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("SecurityIncidentReports")}
            />
            
            <Button
              text="Access Control"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("SecurityAccessControl")}
            />
            
            <Button
              text="Emergency Contacts"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("SecurityEmergencyContacts")}
            />
            
            <Button
              text="Security Alerts"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("SecurityAlerts")}
            />
            
            <Button
              text="Patrol Logs"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("SecurityPatrolLogs")}
            />
            
            <Button
              text="Settings"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("SecuritySettings")}
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
