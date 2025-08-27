import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen } from '../../../Components';
import { AppStackScreenProps } from '../../../utils/interfaces';

interface AdminPropertyRestrictionProps extends AppStackScreenProps<"AdminPropertyRestriction"> {}

export default function AdminPropertyRestriction() {
  return (
    <Screen
      contentContainerStyle={styles.container}
      preset="fixed"
      safeAreaEdges={["top"]}
    >
      {/* Restriction content will go here */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
