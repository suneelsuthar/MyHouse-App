import React from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Screen, Text, Button } from "../../Components";
import { AppStackScreenProps } from "../../utils/interfaces";
import { colors, spacing } from "../../theme";

interface TenantScreenProps extends AppStackScreenProps<"Tenant"> {}

export function Tenant(props: TenantScreenProps) {
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
            Tenant Dashboard
          </Text>
          
          <View style={styles.buttonContainer}>
            <Button
              text="Dashboard"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("TenantDashboard")}
            />
            
            <Button
              text="Profile"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("TenantProfile")}
            />
            
            <Button
              text="Maintenance Request"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("TenantMaintenance")}
            />
            
            <Button
              text="Rent Payment"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("TenantRentPayment")}
            />
            
            <Button
              text="Lease Agreement"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("TenantLeaseAgreement")}
            />
            
            <Button
              text="Notifications"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("TenantNotifications")}
            />
            
            <Button
              text="Support/Help"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("TenantSupport")}
            />
            
            <Button
              text="Settings"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("TenantSettings")}
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
