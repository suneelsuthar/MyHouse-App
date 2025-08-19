import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

// Import all screens
import {
  // Tenant screens
  Tenant,
  TenantDashboard,
  TenantProfile,
  TenantMaintenance,
  TenantRentPayment,
  TenantLeaseAgreement,
  TenantNotifications,
  TenantSupport,
  TenantSettings,

  // New Tenant Tab Screens
  TenantHome,
  TenantChat,
  TenantWallet,

  // Agent screens
  Agent,
  AgentDashboard,
  AgentPropertyListings,
  AgentClientManagement,
  AgentScheduleViewing,
  AgentLeadManagement,
  AgentCommissionReports,
  AgentMarketingTools,
  AgentDocumentManagement,
  AgentSettings,

  // Facility Manager screens
  FacilityManager,
  FacilityManagerDashboard,
  FacilityMaintenanceRequests,
  FacilityWorkOrders,
  FacilityVendorManagement,
  FacilityInventoryManagement,
  FacilityReports,
  FacilityAssetManagement,
  FacilityPreventiveMaintenance,
  FacilityManagerSettings,

  // Landlord screens
  Landlord,
  LandlordDashboard,
  LandlordMyProperties,
  LandlordTenantManagement,
  LandlordRentCollection,
  LandlordExpenseTracking,

  // Global screens
  GlobalScreen,
  TermsConditionsScreen,
  AboutUsScreen,
  FAQScreen,
  ContactUsScreen,
  HelpScreen,
  PropertyFiltersScreen,
  LandlordMaintenanceRequests,
  LandlordFinancialReports,
  LandlordPropertyAnalytics,
  LandlordSettings,

  // Sub-Landlord screens
  SubLandlord,
  SubLandlordDashboard,
  SubLandlordAssignedProperties,
  SubLandlordTenantCommunication,
  SubLandlordMaintenanceRequests,
  SubLandlordRentCollection,
  SubLandlordReports,
  SubLandlordPropertyInspections,
  SubLandlordDocumentManagement,
  SubLandlordSettings,

  // Security screens
  Security,
  SecurityDashboard,
  SecurityVisitorLogs,
  SecurityIncidentReports,
  SecurityAccessControl,
  SecurityEmergencyContacts,
  SecurityAlerts,
  SecurityPatrolLogs,
  SecuritySettings,

  // Admin screens
  Admin,
  AdminDashboard,
  AdminUserManagement,
  AdminPropertyManagement,
  AdminFinancialReports,
  AdminSystemSettings,
  AdminAnalytics,
  AdminAuditLogs,
  AdminBackupRestore,
  AdminSupportTickets,
} from "../Screens";

import {
  TenantStackParamList,
  AgentStackParamList,
  FacilityManagerStackParamList,
  LandlordStackParamList,
  SubLandlordStackParamList,
  SecurityStackParamList,
  AdminStackParamList,
} from "../utils/interfaces";

// Create stack navigators for each role
const TenantStack = createNativeStackNavigator<TenantStackParamList>();
const AgentStack = createNativeStackNavigator<AgentStackParamList>();
const FacilityManagerStack =
  createNativeStackNavigator<FacilityManagerStackParamList>();
const LandlordStack = createNativeStackNavigator<LandlordStackParamList>();
const SubLandlordStack =
  createNativeStackNavigator<SubLandlordStackParamList>();
const SecurityStack = createNativeStackNavigator<SecurityStackParamList>();
const AdminStack = createNativeStackNavigator<AdminStackParamList>();

// Tenant Stack Navigator
const TenantStackNavigator = () => (
  <TenantStack.Navigator screenOptions={{ headerShown: false }}>
    <TenantStack.Screen name="Tenant" component={Tenant} />
    <TenantStack.Screen name="TenantDashboard" component={TenantDashboard} />
    <TenantStack.Screen name="TenantProfile" component={TenantProfile} />
    <TenantStack.Screen
      name="TenantMaintenance"
      component={TenantMaintenance}
    />
    <TenantStack.Screen
      name="TenantRentPayment"
      component={TenantRentPayment}
    />
    <TenantStack.Screen
      name="TenantLeaseAgreement"
      component={TenantLeaseAgreement}
    />
    <TenantStack.Screen
      name="TenantNotifications"
      component={TenantNotifications}
    />
    <TenantStack.Screen name="TenantSupport" component={TenantSupport} />
    <TenantStack.Screen name="TenantSettings" component={TenantSettings} />
  </TenantStack.Navigator>
);

// Agent Stack Navigator
const AgentStackNavigator = () => (
  <AgentStack.Navigator screenOptions={{ headerShown: false }}>
    <AgentStack.Screen name="Agent" component={Agent} />
    <AgentStack.Screen name="AgentDashboard" component={AgentDashboard} />
    <AgentStack.Screen
      name="AgentPropertyListings"
      component={AgentPropertyListings}
    />
    <AgentStack.Screen
      name="AgentClientManagement"
      component={AgentClientManagement}
    />
    <AgentStack.Screen
      name="AgentScheduleViewing"
      component={AgentScheduleViewing}
    />
    <AgentStack.Screen
      name="AgentLeadManagement"
      component={AgentLeadManagement}
    />
    <AgentStack.Screen
      name="AgentCommissionReports"
      component={AgentCommissionReports}
    />
    <AgentStack.Screen
      name="AgentMarketingTools"
      component={AgentMarketingTools}
    />
    <AgentStack.Screen
      name="AgentDocumentManagement"
      component={AgentDocumentManagement}
    />
    <AgentStack.Screen name="AgentSettings" component={AgentSettings} />
  </AgentStack.Navigator>
);

// Facility Manager Stack Navigator
const FacilityManagerStackNavigator = () => (
  <FacilityManagerStack.Navigator screenOptions={{ headerShown: false }}>
    <FacilityManagerStack.Screen
      name="FacilityManager"
      component={FacilityManager}
    />
    <FacilityManagerStack.Screen
      name="FacilityManagerDashboard"
      component={FacilityManagerDashboard}
    />
    <FacilityManagerStack.Screen
      name="FacilityMaintenanceRequests"
      component={FacilityMaintenanceRequests}
    />
    <FacilityManagerStack.Screen
      name="FacilityWorkOrders"
      component={FacilityWorkOrders}
    />
    <FacilityManagerStack.Screen
      name="FacilityVendorManagement"
      component={FacilityVendorManagement}
    />
    <FacilityManagerStack.Screen
      name="FacilityInventoryManagement"
      component={FacilityInventoryManagement}
    />
    <FacilityManagerStack.Screen
      name="FacilityReports"
      component={FacilityReports}
    />
    <FacilityManagerStack.Screen
      name="FacilityAssetManagement"
      component={FacilityAssetManagement}
    />
    <FacilityManagerStack.Screen
      name="FacilityPreventiveMaintenance"
      component={FacilityPreventiveMaintenance}
    />
    <FacilityManagerStack.Screen
      name="FacilityManagerSettings"
      component={FacilityManagerSettings}
    />
  </FacilityManagerStack.Navigator>
);

// Landlord Stack Navigator
const LandlordStackNavigator = () => (
  <LandlordStack.Navigator screenOptions={{ headerShown: false }}>
    <LandlordStack.Screen name="Landlord" component={Landlord} />
    <LandlordStack.Screen
      name="LandlordDashboard"
      component={LandlordDashboard}
    />
    <LandlordStack.Screen
      name="LandlordMyProperties"
      component={LandlordMyProperties}
    />
    <LandlordStack.Screen
      name="LandlordTenantManagement"
      component={LandlordTenantManagement}
    />
    <LandlordStack.Screen
      name="LandlordRentCollection"
      component={LandlordRentCollection}
    />
    <LandlordStack.Screen
      name="LandlordExpenseTracking"
      component={LandlordExpenseTracking}
    />
    <LandlordStack.Screen
      name="LandlordMaintenanceRequests"
      component={LandlordMaintenanceRequests}
    />
    <LandlordStack.Screen
      name="LandlordFinancialReports"
      component={LandlordFinancialReports}
    />
    <LandlordStack.Screen
      name="LandlordPropertyAnalytics"
      component={LandlordPropertyAnalytics}
    />
    <LandlordStack.Screen
      name="LandlordSettings"
      component={LandlordSettings}
    />
  </LandlordStack.Navigator>
);

// Sub-Landlord Stack Navigator
const SubLandlordStackNavigator = () => (
  <SubLandlordStack.Navigator screenOptions={{ headerShown: false }}>
    <SubLandlordStack.Screen name="SubLandlord" component={SubLandlord} />
    <SubLandlordStack.Screen
      name="SubLandlordDashboard"
      component={SubLandlordDashboard}
    />
    <SubLandlordStack.Screen
      name="SubLandlordAssignedProperties"
      component={SubLandlordAssignedProperties}
    />
    <SubLandlordStack.Screen
      name="SubLandlordTenantCommunication"
      component={SubLandlordTenantCommunication}
    />
    <SubLandlordStack.Screen
      name="SubLandlordMaintenanceRequests"
      component={SubLandlordMaintenanceRequests}
    />
    <SubLandlordStack.Screen
      name="SubLandlordRentCollection"
      component={SubLandlordRentCollection}
    />
    <SubLandlordStack.Screen
      name="SubLandlordReports"
      component={SubLandlordReports}
    />
    <SubLandlordStack.Screen
      name="SubLandlordPropertyInspections"
      component={SubLandlordPropertyInspections}
    />
    <SubLandlordStack.Screen
      name="SubLandlordDocumentManagement"
      component={SubLandlordDocumentManagement}
    />
    <SubLandlordStack.Screen
      name="SubLandlordSettings"
      component={SubLandlordSettings}
    />
  </SubLandlordStack.Navigator>
);

// Security Stack Navigator
const SecurityStackNavigator = () => (
  <SecurityStack.Navigator screenOptions={{ headerShown: false }}>
    <SecurityStack.Screen name="Security" component={Security} />
    <SecurityStack.Screen
      name="SecurityDashboard"
      component={SecurityDashboard}
    />
    <SecurityStack.Screen
      name="SecurityVisitorLogs"
      component={SecurityVisitorLogs}
    />
    <SecurityStack.Screen
      name="SecurityIncidentReports"
      component={SecurityIncidentReports}
    />
    <SecurityStack.Screen
      name="SecurityAccessControl"
      component={SecurityAccessControl}
    />
    <SecurityStack.Screen
      name="SecurityEmergencyContacts"
      component={SecurityEmergencyContacts}
    />
    <SecurityStack.Screen name="SecurityAlerts" component={SecurityAlerts} />
    <SecurityStack.Screen
      name="SecurityPatrolLogs"
      component={SecurityPatrolLogs}
    />
    <SecurityStack.Screen
      name="SecuritySettings"
      component={SecuritySettings}
    />
  </SecurityStack.Navigator>
);

// Admin Stack Navigator
const AdminStackNavigator = () => (
  <AdminStack.Navigator screenOptions={{ headerShown: false }}>
    <AdminStack.Screen name="Admin" component={Admin} />
    <AdminStack.Screen name="AdminDashboard" component={AdminDashboard} />
    <AdminStack.Screen
      name="AdminUserManagement"
      component={AdminUserManagement}
    />
    <AdminStack.Screen
      name="AdminPropertyManagement"
      component={AdminPropertyManagement}
    />
    <AdminStack.Screen
      name="AdminFinancialReports"
      component={AdminFinancialReports}
    />
    <AdminStack.Screen
      name="AdminSystemSettings"
      component={AdminSystemSettings}
    />
    <AdminStack.Screen name="AdminAnalytics" component={AdminAnalytics} />
    <AdminStack.Screen name="AdminAuditLogs" component={AdminAuditLogs} />
    <AdminStack.Screen
      name="AdminBackupRestore"
      component={AdminBackupRestore}
    />
    <AdminStack.Screen
      name="AdminSupportTickets"
      component={AdminSupportTickets}
    />
  </AdminStack.Navigator>
);

// Tab navigators for each role
const Tab = createBottomTabNavigator();

// Tenant Tab Navigator
export const TenantTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap;

        switch (route.name) {
          case "Home":
            iconName = focused ? "home" : "home-outline";
            break;
          case "Chat":
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
            break;
          case "Wallet":
            iconName = focused ? "wallet" : "wallet-outline";
            break;
          default:
            iconName = "home-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.white,
      tabBarInactiveTintColor: colors.white,
      tabBarStyle: {
        backgroundColor: colors.primary,
        borderTopWidth: 0,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      tabBarIndicatorStyle: {
        backgroundColor: colors.white,
        height: 3,
        width: 50,
      },
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={TenantHome} />
    <Tab.Screen name="Chat" component={TenantChat} />
    <Tab.Screen name="Wallet" component={TenantWallet} />
  </Tab.Navigator>
);

// Agent Tab Navigator
export const AgentTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap;

        switch (route.name) {
          case "Dashboard":
            iconName = focused ? "grid" : "grid-outline";
            break;
          case "Properties":
            iconName = focused ? "business" : "business-outline";
            break;
          case "Clients":
            iconName = focused ? "people" : "people-outline";
            break;
          case "Leads":
            iconName = focused ? "trending-up" : "trending-up-outline";
            break;
          case "Reports":
            iconName = focused ? "bar-chart" : "bar-chart-outline";
            break;
          default:
            iconName = "grid-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textDim,
      headerShown: false,
    })}
  >
    <Tab.Screen name="Dashboard" component={AgentStackNavigator} />
    <Tab.Screen name="Properties" component={AgentStackNavigator} />
    <Tab.Screen name="Clients" component={AgentStackNavigator} />
    <Tab.Screen name="Leads" component={AgentStackNavigator} />
    <Tab.Screen name="Reports" component={AgentStackNavigator} />
  </Tab.Navigator>
);

// Facility Manager Tab Navigator
export const FacilityManagerTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap;

        switch (route.name) {
          case "Dashboard":
            iconName = focused ? "grid" : "grid-outline";
            break;
          case "Maintenance":
            iconName = focused ? "build" : "build-outline";
            break;
          case "Work Orders":
            iconName = focused ? "clipboard" : "clipboard-outline";
            break;
          case "Inventory":
            iconName = focused ? "cube" : "cube-outline";
            break;
          case "Reports":
            iconName = focused ? "bar-chart" : "bar-chart-outline";
            break;
          default:
            iconName = "grid-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textDim,
      headerShown: false,
    })}
  >
    <Tab.Screen name="Dashboard" component={FacilityManagerStackNavigator} />
    <Tab.Screen name="Maintenance" component={FacilityManagerStackNavigator} />
    <Tab.Screen name="Work Orders" component={FacilityManagerStackNavigator} />
    <Tab.Screen name="Inventory" component={FacilityManagerStackNavigator} />
    <Tab.Screen name="Reports" component={FacilityManagerStackNavigator} />
  </Tab.Navigator>
);

// Landlord Tab Navigator
export const LandlordTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap;

        switch (route.name) {
          case "Dashboard":
            iconName = focused ? "grid" : "grid-outline";
            break;
          case "Properties":
            iconName = focused ? "business" : "business-outline";
            break;
          case "Tenants":
            iconName = focused ? "people" : "people-outline";
            break;
          case "Finances":
            iconName = focused ? "card" : "card-outline";
            break;
          case "Analytics":
            iconName = focused ? "analytics" : "analytics-outline";
            break;
          default:
            iconName = "grid-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textDim,
      headerShown: false,
    })}
  >
    <Tab.Screen name="Dashboard" component={LandlordStackNavigator} />
    <Tab.Screen name="Properties" component={LandlordStackNavigator} />
    <Tab.Screen name="Tenants" component={LandlordStackNavigator} />
    <Tab.Screen name="Finances" component={LandlordStackNavigator} />
    <Tab.Screen name="Analytics" component={LandlordStackNavigator} />
  </Tab.Navigator>
);

// Sub-Landlord Tab Navigator
export const SubLandlordTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap;

        switch (route.name) {
          case "Dashboard":
            iconName = focused ? "grid" : "grid-outline";
            break;
          case "Properties":
            iconName = focused ? "business" : "business-outline";
            break;
          case "Communication":
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
            break;
          case "Maintenance":
            iconName = focused ? "build" : "build-outline";
            break;
          case "Reports":
            iconName = focused ? "bar-chart" : "bar-chart-outline";
            break;
          default:
            iconName = "grid-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textDim,
      headerShown: false,
    })}
  >
    <Tab.Screen name="Dashboard" component={SubLandlordStackNavigator} />
    <Tab.Screen name="Properties" component={SubLandlordStackNavigator} />
    <Tab.Screen name="Communication" component={SubLandlordStackNavigator} />
    <Tab.Screen name="Maintenance" component={SubLandlordStackNavigator} />
    <Tab.Screen name="Reports" component={SubLandlordStackNavigator} />
  </Tab.Navigator>
);

// Security Tab Navigator
export const SecurityTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap;

        switch (route.name) {
          case "Dashboard":
            iconName = focused ? "grid" : "grid-outline";
            break;
          case "Visitors":
            iconName = focused ? "people" : "people-outline";
            break;
          case "Incidents":
            iconName = focused ? "warning" : "warning-outline";
            break;
          case "Access":
            iconName = focused ? "key" : "key-outline";
            break;
          case "Alerts":
            iconName = focused ? "notifications" : "notifications-outline";
            break;
          default:
            iconName = "grid-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textDim,
      headerShown: false,
    })}
  >
    <Tab.Screen name="Dashboard" component={SecurityStackNavigator} />
    <Tab.Screen name="Visitors" component={SecurityStackNavigator} />
    <Tab.Screen name="Incidents" component={SecurityStackNavigator} />
    <Tab.Screen name="Access" component={SecurityStackNavigator} />
    <Tab.Screen name="Alerts" component={SecurityStackNavigator} />
  </Tab.Navigator>
);

// Admin Tab Navigator
export const AdminTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap;

        switch (route.name) {
          case "Dashboard":
            iconName = focused ? "grid" : "grid-outline";
            break;
          case "Users":
            iconName = focused ? "people" : "people-outline";
            break;
          case "Properties":
            iconName = focused ? "business" : "business-outline";
            break;
          case "Analytics":
            iconName = focused ? "analytics" : "analytics-outline";
            break;
          case "Settings":
            iconName = focused ? "settings" : "settings-outline";
            break;
          default:
            iconName = "grid-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textDim,
      headerShown: false,
    })}
  >
    <Tab.Screen name="Dashboard" component={AdminStackNavigator} />
    <Tab.Screen name="Users" component={AdminStackNavigator} />
    <Tab.Screen name="Properties" component={AdminStackNavigator} />
    <Tab.Screen name="Analytics" component={AdminStackNavigator} />
    <Tab.Screen name="Settings" component={AdminStackNavigator} />
  </Tab.Navigator>
);
