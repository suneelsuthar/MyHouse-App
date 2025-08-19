import React from "react";
import { StyleSheet, View } from "react-native";
import { Screen, Text } from "../../../Components";
import { AppStackScreenProps } from "../../../utils/interfaces";
import { colors, spacing } from "../../../theme";

interface ChatScreenProps extends AppStackScreenProps<"Chat"> {}

export function Chat(props: ChatScreenProps) {
  return (
    <Screen
      preset="fixed"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
    >
      <View style={styles._bg}>
        <Text text="Chat" style={styles._subtitle} weight="semiBold" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContentContainer: {
    flex: 1,
  },
  _bg: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
  },
  _subtitle: {
    color: colors.primary,
    fontSize: 24,
    lineHeight: 34,
    textAlign: "center",
    marginVertical: spacing.md,
  },
});
