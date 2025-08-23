import React from "react";
import { StyleSheet, View } from "react-native";
import { Screen, Text } from "../../../Components";
import { colors, spacing, typography, adjustSize } from "../../../theme";
import { AppStackScreenProps } from "../../../utils/interfaces";

type Props = AppStackScreenProps<"AdminCommunityArea">;

export function AdminCommunityArea({ route }: Props) {
  const tab = route?.params?.tab ?? "amenities";

  const title = tab === "reservations" ? "Reservations" : "Amenities";

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={styles.container}>
      <Text weight="semiBold" style={styles.title}>Community Area — {title}</Text>
      <View style={styles.card}>
        <Text style={styles.muted}>Active tab: {tab}</Text>
        <Text style={styles.muted}>Render community area UI based on the tab prop.</Text>
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
