import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen } from '../../../Components';
import { AppStackScreenProps } from '../../../utils/interfaces';

interface AdminManageInspectionsProps extends AppStackScreenProps<"AdminManageInspections"> {}

export default function AdminManageInspections() {
  return (
    <Screen
      contentContainerStyle={styles.container}
      preset="fixed"
      safeAreaEdges={["top"]}
    >
      {/* Manage Inspections content will go here */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
