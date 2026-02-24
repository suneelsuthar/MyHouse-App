import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Screen, Text, Button } from "../../Components";
import { AppStackScreenProps } from "../../utils/interfaces";
import { colors, spacing } from "../../theme";

interface LandlordScreenProps extends AppStackScreenProps<"Landlord"> {}

export function Landlord(props: LandlordScreenProps) {
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
            Landlord Dashboard
          </Text>
          
          <View style={styles.buttonContainer}>
            <Button
              text="Dashboard"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("LandlordDashboard")}
            />
            
            <Button
              text="My Properties"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("LandlordMyProperties")}
            />
            
            <Button
              text="Tenant Management"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("LandlordTenantManagement")}
            />
            
            <Button
              text="Rent Collection"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("LandlordRentCollection")}
            />
            
            <Button
              text="Expense Tracking"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("LandlordExpenseTracking")}
            />
            
            <Button
              text="Maintenance Requests"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("LandlordMaintenanceRequests")}
            />
            
            <Button
              text="Financial Reports"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("LandlordFinancialReports")}
            />
            
            <Button
              text="Property Analytics"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("LandlordPropertyAnalytics")}
            />
            
            <Button
              text="Settings"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("LandlordSettings")}
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
