import React from "react";
import { StyleSheet, View } from "react-native";
import { Screen, Text } from "../../../Components";
import { spacing } from "../../../theme";

export const AdminPanicAlerts: React.FC = () => {
  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={styles.container}>
      <Text weight="semiBold" style={styles.title}>Panic Alerts</Text>
      <View style={styles.card}>
        <Text style={styles.muted}>Render Panic Alerts here.</Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  title: {
    fontSize: 18,
    marginBottom: spacing.md,
  },
  card: {
    padding: spacing.md,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  muted: {
    color: "#666",
  },
});
