import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Screen, Text, Button } from "../../Components";
import { AppStackScreenProps } from "../../utils/interfaces";
import { colors, spacing } from "../../theme";

interface AgentScreenProps extends AppStackScreenProps<"Agent"> {}

export function Agent(props: AgentScreenProps) {
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
            Agent Dashboard
          </Text>
          
          <View style={styles.buttonContainer}>
            <Button
              text="Dashboard"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("AgentDashboard")}
            />
            
            <Button
              text="Property Listings"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("AgentPropertyListings")}
            />
            
            <Button
              text="Client Management"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("AgentClientManagement")}
            />
            
            <Button
              text="Schedule Viewing"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("AgentScheduleViewing")}
            />
            
            <Button
              text="Lead Management"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("AgentLeadManagement")}
            />
            
            <Button
              text="Commission Reports"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("AgentCommissionReports")}
            />
            
            <Button
              text="Marketing Tools"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("AgentMarketingTools")}
            />
            
            <Button
              text="Document Management"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("AgentDocumentManagement")}
            />
            
            <Button
              text="Settings"
              style={styles.navButton}
              textStyle={styles.buttonText}
              onPress={() => navigateToScreen("AgentSettings")}
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
