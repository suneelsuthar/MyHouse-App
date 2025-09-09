import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const RenegotiateCommission = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Renegotiate Commission</Text>
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
