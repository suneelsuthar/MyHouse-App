import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const AssignedAgent = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Assigned Agent</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
