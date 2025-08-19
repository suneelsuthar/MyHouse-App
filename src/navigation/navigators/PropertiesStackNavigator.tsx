import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PropertiesStackParamList } from '../types';
import { PropertyListScreen, PropertyDetailsScreen, AddPropertyScreen, EditPropertyScreen } from '../../../screens/properties';

const Stack = createNativeStackNavigator<PropertiesStackParamList>();

export const PropertiesStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="PropertyList" component={PropertyListScreen} />
      <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
      <Stack.Screen name="AddProperty" component={AddPropertyScreen} />
      <Stack.Screen name="EditProperty" component={EditPropertyScreen} />
    </Stack.Navigator>
  );
};
