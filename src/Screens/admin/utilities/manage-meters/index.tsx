import React from "react";
import { StyleSheet, View } from "react-native";
import { Screen, Text, Header2 } from "../../../../Components";
import { colors, typography, adjustSize } from "../../../../theme";

export const AdminManageMeters: React.FC = () => {
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header2 title="Manage Meters" onNotificationPress={() => {}} />
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Manage Meters</Text>
        <Text style={styles.description}>
          This screen will manage utility meters and readings.
        </Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: adjustSize(20),
  },
  pageTitle: {
    fontSize: adjustSize(24),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    marginBottom: adjustSize(16),
    textAlign: "center",
  },
  description: {
    fontSize: adjustSize(16),
    color: colors.grey,
    fontFamily: typography.fonts.poppins.normal,
    textAlign: "center",
    lineHeight: adjustSize(24),
  },
});
