import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen,Text } from '../../../Components';

export const TenantUtilitiesTransactions = () => {
  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={styles.container}>
      <View>
        <Text text="Transactions screen" />
        {/* Add your transactions content here */}
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
