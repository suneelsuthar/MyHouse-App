import React from "react";
import { View, StyleSheet } from "react-native";
import { Screen, Text } from "../../../Components";

export const TenantUtilitiesSummary = () => {
  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={styles.container}>
      <View>
        <Text text="Summary screen" />
        {/* Add your summary content here */}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
