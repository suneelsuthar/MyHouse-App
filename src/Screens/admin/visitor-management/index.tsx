import React from "react";
import { StyleSheet, View } from "react-native";
import { Screen, Text } from "../../../Components";
import { colors, spacing, typography, adjustSize } from "../../../theme";
import { AppStackScreenProps } from "../../../utils/interfaces";

type Props = AppStackScreenProps<"AdminVisitorManagement">;

export function AdminVisitorManagement({ route }: Props) {
  const view = route?.params?.view ?? "visitor_requests";

  const titleMap: Record<string, string> = {
    visitor_requests: "Visitor Requests",
    visitors_list: "Visitors List",
    revoked: "Revoked Invitations",
    access_alerts: "Access Alerts",
    panic_alerts: "Panic Alerts",
  };

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Text weight="semiBold" style={styles.title}>
        Visitor Management — {titleMap[view] || "Visitor Requests"}
      </Text>
      <View style={styles.card}>
        <Text style={styles.muted}>View: {view}</Text>
        <Text style={styles.muted}>Render list/UI based on the view prop.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.fill,
  },
  title: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    fontSize: adjustSize(16),
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: adjustSize(12),
  },
  muted: {
    color: colors.primaryLight,
  },
});
