import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Screen, Text, Button } from "../../Components";
import { FacilityManagerStackParamList } from "../../utils/interfaces";
import { colors, spacing } from "../../theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// interface FacilityManagerScreenProps extends AppStackScreenProps<"FacilityManager"> {}
export type FacilityManagerScreenProps = NativeStackScreenProps<
  FacilityManagerStackParamList,
  "FacilityManager"
>;

export function FacilityManager(props: FacilityManagerScreenProps) {
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
            Facility Manager Dashboard
          </Text>

          <View style={styles.buttonContainer}>
            <Button
              text="Dashboard"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("FacilityManagerDashboard")}
            />

            <Button
              text="Maintenance Requests"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("FacilityMaintenanceRequests")}
            />

            <Button
              text="Work Orders"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("FacilityWorkOrders")}
            />

            <Button
              text="Vendor Management"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("FacilityVendorManagement")}
            />

            <Button
              text="Inventory Management"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("FacilityInventoryManagement")}
            />

            <Button
              text="Facility Reports"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("FacilityReports")}
            />

            <Button
              text="Asset Management"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("FacilityAssetManagement")}
            />

            <Button
              text="Preventive Maintenance"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("FacilityPreventiveMaintenance")}
            />

            <Button
              text="Settings"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("FacilityManagerSettings")}
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
