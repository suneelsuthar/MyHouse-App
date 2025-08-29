import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen ,Text} from '../../../Components';

export const TenantUtilitiesReportIssue = () => {
  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={styles.container}>
      <View>
        <Text text="Report Issue screen" />
        {/* Add your report issue form here */}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
