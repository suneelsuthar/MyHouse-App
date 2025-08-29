import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen ,Text} from '../../../Components';

export const TenantUtilitiesMyMeter = () => {
  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={styles.container}>
      <View>
        <Text text="My Meter screen" />
        {/* Add your meter content here */}
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
