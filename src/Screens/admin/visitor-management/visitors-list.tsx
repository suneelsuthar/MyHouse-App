import React from "react";
import { StyleSheet, View } from "react-native";
import { Screen } from "../../../Components/Screen";
import { Text } from "../../../Components/Text";
import { spacing } from "../../../Styles/baseStyles";

export const AdminVisitorsList: React.FC = () => {
  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={styles.container}>
      <Text weight="semiBold" style={styles.title}>Visitors List</Text>
      <View style={styles.card}>
        <Text style={styles.muted}>Render Visitors list here.</Text>
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
