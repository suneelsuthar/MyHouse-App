import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen } from '../../../Components';
import { AppStackScreenProps } from '../../../utils/interfaces';

interface AdminPropertyFeaturesProps extends AppStackScreenProps<"AdminPropertyFeatures"> {}

export default function AdminPropertyFeatures() {
  return (
    <Screen
      contentContainerStyle={styles.container}
      preset="fixed"
      safeAreaEdges={["top"]}
    >
      {/* Features content will go here */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
