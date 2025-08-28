import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TenantsStackParamList } from "../types";
import {
  TenantListScreen,
  TenantDetailsScreen,
  AddTenantScreen,
  EditTenantScreen,
} from "../../../screens/tenants";
TenantListScreen
const Stack = createNativeStackNavigator<TenantsStackParamList>();

export const TenantsStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="TenantList" component={TenantListScreen} />
      <Stack.Screen name="TenantDetails" component={TenantDetailsScreen} />
      <Stack.Screen name="AddTenant" component={AddTenantScreen} />
      <Stack.Screen name="EditTenant" component={EditTenantScreen} />
    </Stack.Navigator>
  );
};
