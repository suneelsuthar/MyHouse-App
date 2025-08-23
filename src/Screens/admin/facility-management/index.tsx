import React from "react";
import { StyleSheet, View } from "react-native";
import { Screen, Text } from "../../../Components";
import { colors, spacing, typography, adjustSize } from "../../../theme";
import { AppStackScreenProps } from "../../../utils/interfaces";

type Props = AppStackScreenProps<"AdminFacilityManagement">;

export function AdminFacilityManagement({ route }: Props) {
  const status = route?.params?.status ?? "work_requests";

  const titleMap: Record<string, string> = {
    work_requests: "Work Requests",
    work_orders: "Work Orders",
    completed: "Completed",
  };

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Text weight="semiBold" style={styles.title}>
        Facility Management — {titleMap[status] || "Work Requests"}
      </Text>
      <View style={styles.card}>
        <Text style={styles.muted}>Status: {status}</Text>
        <Text style={styles.muted}>Render list/UI based on the status prop.</Text>
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
