import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaintenanceStackParamList } from '../types';
import { MaintenanceListScreen, MaintenanceDetailsScreen, CreateRequestScreen, VendorListScreen } from '../../../screens/maintenance';

const Stack = createNativeStackNavigator<MaintenanceStackParamList>();

export const MaintenanceStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="MaintenanceList" component={MaintenanceListScreen} />
      <Stack.Screen name="MaintenanceDetails" component={MaintenanceDetailsScreen} />
      <Stack.Screen name="CreateRequest" component={CreateRequestScreen} />
      <Stack.Screen name="VendorList" component={VendorListScreen} />
    </Stack.Navigator>
  );
};
