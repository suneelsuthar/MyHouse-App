import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TenantUtilitiesStackParamList } from "../types";
import { TenantUtilitiesSummary } from "../../Screens/tenant/utilities/Summary";
import { TenantUtilitiesMyMeter } from "../../Screens/tenant/utilities/MyMeter";
import { TenantUtilitiesCharges } from "../../Screens/tenant/utilities/Charges";
import { TenantUtilitiesTransactions } from "../../Screens/tenant/utilities/Transactions";
import { TenantUtilitiesVendingHistory } from "../../Screens/tenant/utilities/VendingHistory";
import { TenantUtilitiesReportIssue } from "../../Screens/tenant/utilities/ReportIssue";
import { TenantUtilitiesUpdateProfile } from "../../Screens/tenant/utilities";
const Stack = createNativeStackNavigator<TenantUtilitiesStackParamList>();

export const TenantUtilitiesStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="TenantUtilitiesSummary" component={TenantUtilitiesSummary} />
      <Stack.Screen name="TenantUtilitiesMyMeter" component={TenantUtilitiesMyMeter} />
      <Stack.Screen name="TenantUtilitiesCharges" component={TenantUtilitiesCharges} />
      <Stack.Screen name="TenantUtilitiesTransactions" component={TenantUtilitiesTransactions} />
      <Stack.Screen name="TenantUtilitiesVendingHistory" component={TenantUtilitiesVendingHistory} />
      <Stack.Screen name="TenantUtilitiesReportIssue" component={TenantUtilitiesReportIssue} />
      <Stack.Screen name="TenantUtilitiesUpdateProfile" component={TenantUtilitiesUpdateProfile} />
    </Stack.Navigator>
  );
};
