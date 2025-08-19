import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Screen, Text, Button } from "../../Components";
import { AppStackScreenProps } from "../../utils/interfaces";
import { colors, spacing } from "../../theme";

interface SubLandlordScreenProps extends AppStackScreenProps<"SubLandlord"> {}

export function SubLandlord(props: SubLandlordScreenProps) {
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
            Sub-Landlord Dashboard
          </Text>
          
          <View style={styles.buttonContainer}>
            <Button
              text="Dashboard"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("SubLandlordDashboard")}
            />
            
            <Button
              text="Assigned Properties"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("SubLandlordAssignedProperties")}
            />
            
            <Button
              text="Tenant Communication"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("SubLandlordTenantCommunication")}
            />
            
            <Button
              text="Maintenance Requests"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("SubLandlordMaintenanceRequests")}
            />
            
            <Button
              text="Rent Collection"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("SubLandlordRentCollection")}
            />
            
            <Button
              text="Reports"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("SubLandlordReports")}
            />
            
            <Button
              text="Property Inspections"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("SubLandlordPropertyInspections")}
            />
            
            <Button
              text="Document Management"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("SubLandlordDocumentManagement")}
            />
            
            <Button
              text="Settings"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("SubLandlordSettings")}
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
