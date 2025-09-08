import React from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { adjustSize, colors, typography } from "../theme";
import { StyleSheet } from "react-native";
// Import all screens
import {
  TenantRentPayment,
  TenantAssignedProp,
  TenantHome,
  Chat,
  // Agent screens
  AgentDashboard,
  AgentSettings,

  // Facility Manager screens
  FacilityManager,
  FacilityManagerDashboard,
  // Landlord screens
  LandlordDashboard,
  LandlordMyProperties,
  LandlordTenantManagement,
  LandlordRentCollection,

  // Sub-Landlord screens
  SubLandlord,
  SubLandlordDashboard,

  // Security screens
  Security,
  SecurityDashboard,
  SecurityVisitorLogs,

  // Import admin screens from the admin directory
  AdminDashboard,
  AdminPropertyManagement,
  PropertyDetails,
  AdminAddProperty,
  AdminManageCalendar,
  AdminAssignProperties,
  AdminGenerateWorkRequests,
  AdminCreateVisitorRequests,
  AdminBookingDetails,
  // Property management screens are imported directly from their files
  // Other admin screens
  FacilityManagement,
  AdminVisitorManagement,
  AdminTenants,
  CommunityArea,
  VisitorRequests,
  AdminVisitorsList,
  RevokedInvitations,
  AdminAccessAlerts,
  AdminPanicAlerts,
  FMViewDetails,
  FMEdit,
  FMGenerateWorkOrder,
  FMViewWorkOrder,
  FMOrderView,
  FMOrderUpdate,
  FMOrderExport,
  AdminAmenityView,
  AdminAmenityEdit,
  AdminAmenityMakeReservation,
  AdminReservationView,
  AdminAddNewAmenity,
  AdminAmenityManageCalendar,
  Emergency,
  AdminVisitorDetails,
  AdminGenerateVisitorRequest,
  PanicEmergency,
  AdminPropertyRequests,
  AdminSimDataManagement,
  AdminManageMeters,
  AdminManageTransactions,
  AdminManagePropertyGroup,
  AdminManageVendingHistory,
  Analysis,
  AdminUtilitiesSettings,
  ViewMeterDetails,
  EditCreateMeter,
  ViewPropertiesGroups,
  AddEditGroup,
  AdminManageBookings,
  AdminTenantDetails,
  Commuication,
  FinancialReports,
  SendMoney,
  AddBeneficiary,
  Profile,
  Verify,
  EditProfile,
  ProfileSettings,
  SecurityIncidentReports,
} from "../Screens";

// Import property management screens from their respective files
import AdminPropertyServices from "../Screens/admin/property-management/services";
import AdminPropertyFeatures from "../Screens/admin/property-management/features";
import AdminPropertyRestriction from "../Screens/admin/property-management/restriction";
import AdminManageInspections from "../Screens/admin/property-management/manage-inspections";
import InspectionDetails from "../Screens/admin/property-management/inspection-details";

import {
  TenantStackParamList,
  AgentStackParamList,
  FacilityManagerStackParamList,
  LandlordStackParamList,
  SubLandlordStackParamList,
  SecurityStackParamList,
  AdminStackParamList,
} from "../utils/interfaces";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../assets/Images";
import { View } from "react-native";
import { CustomDrawerContent } from "../Components/drawer/CustomDrawer";

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
const AdminHomeStack = createNativeStackNavigator<AdminStackParamList>();
const AdminBookingStack = createNativeStackNavigator<AdminStackParamList>();
const AdminPropertiesStack = createNativeStackNavigator<AdminStackParamList>();
const AdminWalletStack = createNativeStackNavigator<AdminStackParamList>();
const AdminChatStack = createNativeStackNavigator<AdminStackParamList>();
const TenantWalletStack = createNativeStackNavigator<TenantStackParamList>();

import { UtilitiesSummary } from "../Screens/tenant/utilities/Summary";
import { TenantUtilitiesMyMeter } from "../Screens/tenant/utilities/MyMeter";
import { TenantUtilitiesCharges } from "../Screens/tenant/utilities/Charges";
import { TenantUtilitiesTransactions } from "../Screens/tenant/utilities/Transactions";
import { TenantUtilitiesVendingHistory } from "../Screens/tenant/utilities/VendingHistory";
import { TenantUtilitiesReportIssue } from "../Screens/tenant/utilities/ReportIssue";
import { TenantUtilitiesUpdateProfile } from "../Screens/tenant/utilities";

// Agent Stack Navigator
const AgentStackNavigator = () => (
  <AgentStack.Navigator screenOptions={{ headerShown: false }}>
    <AgentStack.Screen name="AgentDashboard" component={AgentDashboard} />
    <AgentStack.Screen name="AgentSettings" component={AgentSettings} />
  </AgentStack.Navigator>
);

// Facility Manager Stack Navigator
const FacilityManagerStackNavigator = () => {
  return (
    <FacilityManagerStack.Navigator screenOptions={{ headerShown: false }}>
      <FacilityManagerStack.Screen
        name="FacilityManager"
        component={FacilityManager}
      />
      <FacilityManagerStack.Screen
        name="FacilityManagerDashboard"
        component={FacilityManagerDashboard}
      />
    </FacilityManagerStack.Navigator>
  );
};

// Sub-Landlord Stack Navigator
const SubLandlordStackNavigator = () => (
  <SubLandlordStack.Navigator screenOptions={{ headerShown: false }}>
    <SubLandlordStack.Screen name="SubLandlord" component={SubLandlord} />
    <SubLandlordStack.Screen
      name="SubLandlordDashboard"
      component={SubLandlordDashboard}
    />
  </SubLandlordStack.Navigator>
);

// Landlord Stack Navigator
const LandlordStackNavigator = () => (
  <LandlordStack.Navigator screenOptions={{ headerShown: false }}>
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
  </LandlordStack.Navigator>
);

// Security Stack Navigator
const SecurityStackNavigator = () => (
  <SecurityStack.Navigator screenOptions={{ headerShown: false }}>
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
  </SecurityStack.Navigator>
);

// Admin Stacks per tab
const AdminHomeStackNavigator = () => (
  <AdminHomeStack.Navigator screenOptions={{ headerShown: false }}>
    <AdminHomeStack.Screen name="AdminDashboard" component={AdminDashboard} />
    {/* Register cross-section Admin screens here for global access */}
    <AdminHomeStack.Screen name="PropertyDetails" component={PropertyDetails} />
    <AdminHomeStack.Screen
      name="FacilityManagement"
      component={FacilityManagement}
    />
    <AdminHomeStack.Screen
      name="AdminVisitorManagement"
      component={AdminVisitorManagement}
    />
    <AdminHomeStack.Screen name="AdminTenants" component={AdminTenants} />
    <AdminHomeStack.Screen
      name="AdminTenantDetails"
      component={AdminTenantDetails}
    />

    <AdminHomeStack.Screen name="CommunityArea" component={CommunityArea} />
    {/* Separate Visitor Management pages */}
    <AdminHomeStack.Screen name="VisitorRequests" component={VisitorRequests} />
    <AdminHomeStack.Screen
      name="AdminVisitorsList"
      component={AdminVisitorsList}
    />
    <AdminHomeStack.Screen
      name="RevokedInvitations"
      component={RevokedInvitations}
    />
    <AdminHomeStack.Screen
      name="AdminAccessAlerts"
      component={AdminAccessAlerts}
    />
    <AdminHomeStack.Screen
      name="AdminPanicAlerts"
      component={AdminPanicAlerts}
    />
    {/* Facility Management action pages */}
    <AdminHomeStack.Screen name="FMViewDetails" component={FMViewDetails} />
    <AdminHomeStack.Screen name="FMEdit" component={FMEdit} />
    <AdminHomeStack.Screen
      name="FMGenerateWorkOrder"
      component={FMGenerateWorkOrder}
    />
    <AdminHomeStack.Screen name="FMViewWorkOrder" component={FMViewWorkOrder} />
    {/* Facility Management Order action pages */}
    <AdminHomeStack.Screen name="FMOrderView" component={FMOrderView} />
    <AdminHomeStack.Screen name="FMOrderUpdate" component={FMOrderUpdate} />
    <AdminHomeStack.Screen name="FMOrderExport" component={FMOrderExport} />
    {/* Community Area action pages */}
    <AdminHomeStack.Screen
      name="AdminAmenityView"
      component={AdminAmenityView}
    />
    <AdminHomeStack.Screen
      name="AdminAmenityEdit"
      component={AdminAmenityEdit}
    />
    <AdminHomeStack.Screen
      name="AdminAmenityMakeReservation"
      component={AdminAmenityMakeReservation}
    />
    <AdminHomeStack.Screen
      name="AdminAmenityManageCalendar"
      component={AdminAmenityManageCalendar}
    />
    <AdminHomeStack.Screen
      name="AdminAddNewAmenity"
      component={AdminAddNewAmenity}
    />
    <AdminHomeStack.Screen
      name="AdminReservationView"
      component={AdminReservationView}
    />
    <AdminHomeStack.Screen name="Emergency" component={Emergency} />
    <AdminHomeStack.Screen name="PanicEmergency" component={PanicEmergency} />
    <AdminHomeStack.Screen name="Profile" component={Profile} />
    <AdminHomeStack.Screen name="EditProfile" component={EditProfile} />
    <AdminHomeStack.Screen name="ProfileSettings" component={ProfileSettings} />
    <AdminHomeStack.Screen
      name="AdminVisitorDetails"
      component={AdminVisitorDetails}
    />
    <AdminHomeStack.Screen
      name="AdminGenerateVisitorRequest"
      component={AdminGenerateVisitorRequest}
    />
    <AdminHomeStack.Screen
      name="AdminPropertyRequests"
      component={AdminPropertyRequests}
    />
    <AdminHomeStack.Screen
      name="AdminManageInspections"
      component={AdminManageInspections}
    />
    <AdminHomeStack.Screen
      name="AdminSimDataManagement"
      component={AdminSimDataManagement}
    />
    <AdminHomeStack.Screen
      name="AdminManageMeters"
      component={AdminManageMeters}
    />
    <AdminHomeStack.Screen
      name="AdminManageTransactions"
      component={AdminManageTransactions}
    />
    <AdminHomeStack.Screen
      name="AdminManagePropertyGroup"
      component={AdminManagePropertyGroup}
    />
    <AdminHomeStack.Screen
      name="AdminManageVendingHistory"
      component={AdminManageVendingHistory}
    />
    <AdminHomeStack.Screen name="Analysis" component={Analysis} />
    <AdminHomeStack.Screen
      name="AdminUtilitiesSettings"
      component={AdminUtilitiesSettings}
    />
    <AdminHomeStack.Screen
      name="ViewMeterDetails"
      component={ViewMeterDetails}
    />
    <AdminHomeStack.Screen name="EditCreateMeter" component={EditCreateMeter} />
    <AdminHomeStack.Screen
      name="ViewPropertiesGroups"
      component={ViewPropertiesGroups}
    />
    <AdminHomeStack.Screen name="AddEditGroup" component={AddEditGroup} />
    <AdminHomeStack.Screen name="Commuication" component={Commuication} />
  </AdminHomeStack.Navigator>
);

const AdminBookingStackNavigator = () => (
  <AdminBookingStack.Navigator screenOptions={{ headerShown: false }}>
    <AdminBookingStack.Screen
      name="AdminManageBookings"
      component={AdminManageBookings}
    />

    <AdminBookingStack.Screen
      name="AdminBookingDetails"
      component={AdminBookingDetails}
    />
  </AdminBookingStack.Navigator>
);

const AdminPropertiesStackNavigator = () => (
  <AdminPropertiesStack.Navigator screenOptions={{ headerShown: false }}>
    <AdminPropertiesStack.Screen
      name="AdminPropertyManagement"
      component={AdminPropertyManagement}
    />
    <AdminPropertiesStack.Screen
      name="PropertyDetails"
      component={PropertyDetails}
    />
    <AdminPropertiesStack.Screen
      name="AdminPropertyServices"
      component={AdminPropertyServices}
    />
    <AdminPropertiesStack.Screen
      name="AdminPropertyFeatures"
      component={AdminPropertyFeatures}
    />
    <AdminPropertiesStack.Screen
      name="AdminPropertyRestriction"
      component={AdminPropertyRestriction}
    />
    <AdminPropertiesStack.Screen
      name="AdminManageInspections"
      component={AdminManageInspections}
    />
    <AdminPropertiesStack.Screen
      name="AdminAddProperty"
      component={AdminAddProperty}
    />
    <AdminPropertiesStack.Screen
      name="AdminManageCalendar"
      component={AdminManageCalendar}
    />
    <AdminPropertiesStack.Screen
      name="AdminAssignProperties"
      component={AdminAssignProperties}
    />
    <AdminPropertiesStack.Screen
      name="AdminGenerateWorkRequests"
      component={AdminGenerateWorkRequests}
    />
    <AdminPropertiesStack.Screen
      name="AdminCreateVisitorRequests"
      component={AdminCreateVisitorRequests}
    />
    <AdminPropertiesStack.Screen
      name="InspectionDetails"
      component={InspectionDetails}
    />
  </AdminPropertiesStack.Navigator>
);

const TenantWalletStackNavigator = () => (
  <TenantWalletStack.Navigator screenOptions={{ headerShown: false }}>
    <TenantWalletStack.Screen
      name="FinancialReports"
      component={FinancialReports}
    />
    <TenantWalletStack.Screen name="SendMoney" component={SendMoney} />
    <TenantWalletStack.Screen
      name="AddBeneficiary"
      component={AddBeneficiary}
    />
  </TenantWalletStack.Navigator>
);

const AdminWalletStackNavigator = () => (
  <AdminWalletStack.Navigator screenOptions={{ headerShown: false }}>
    <AdminWalletStack.Screen
      name="FinancialReports"
      component={FinancialReports}
    />

    <AdminWalletStack.Screen name="SendMoney" component={SendMoney} />

    <AdminWalletStack.Screen name="AddBeneficiary" component={AddBeneficiary} />
  </AdminWalletStack.Navigator>
);

// Tab navigators for each role
const Tab = createBottomTabNavigator();

import { NavigatorScreenParams } from "@react-navigation/native";

// Define a param list for the Tenant Drawer
export type TenantDrawerParamList = {
  Tenant: NavigatorScreenParams<TenantStackParamList>;
  TenantAssignedProp: undefined;
  AdminVisitorDetails: { visitorId: string };
  AdminGenerateVisitorRequest: undefined;
  AdminAmenityMakeReservation: undefined;
  AdminReservationView: undefined;
  AdminAddNewAmenity: undefined;
  AdminAmenityView: undefined;
  Agent: undefined;
  FacilityManager: undefined;
  Landlord: undefined;
  SubLandlord: undefined;
  Security: undefined;
  Admin: undefined;
};

const HomeStack = createNativeStackNavigator<TenantStackParamList>();
const Drawer = createDrawerNavigator<TenantDrawerParamList>();

// Home Stack Navigator for Tenant
const TenantHomeStack = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="TenantHome" component={TenantHome} />
    {/* Facility Management action pages */}
    <HomeStack.Screen name="FMViewDetails" component={FMViewDetails} />
    <HomeStack.Screen name="FMEdit" component={FMEdit} />
    <HomeStack.Screen
      name="FMGenerateWorkOrder"
      component={FMGenerateWorkOrder}
    />
    <HomeStack.Screen name="FMViewWorkOrder" component={FMViewWorkOrder} />
    {/* Facility Management Order action pages */}
    <HomeStack.Screen name="FMOrderView" component={FMOrderView} />
    <HomeStack.Screen name="FMOrderUpdate" component={FMOrderUpdate} />
    <HomeStack.Screen name="FMOrderExport" component={FMOrderExport} />

    <HomeStack.Screen name="VisitorRequests" component={VisitorRequests} />

    <HomeStack.Screen
      name="RevokedInvitations"
      component={RevokedInvitations}
    />

    <HomeStack.Screen
      name="FacilityManagement"
      component={FacilityManagement}
    />
    <HomeStack.Screen name="UtilitiesSummary" component={UtilitiesSummary} />
    <HomeStack.Screen
      name="TenantUtilitiesMyMeter"
      component={TenantUtilitiesMyMeter}
    />
    <HomeStack.Screen
      name="TenantUtilitiesCharges"
      component={TenantUtilitiesCharges}
    />
    <HomeStack.Screen
      name="TenantUtilitiesTransactions"
      component={TenantUtilitiesTransactions}
    />
    <HomeStack.Screen
      name="TenantUtilitiesVendingHistory"
      component={TenantUtilitiesVendingHistory}
    />
    <HomeStack.Screen
      name="TenantUtilitiesUpdateProfile"
      component={TenantUtilitiesUpdateProfile}
    />
    <HomeStack.Screen
      name="TenantUtilitiesReportIssue"
      component={TenantUtilitiesReportIssue}
    />

    <HomeStack.Screen name="CommunityArea" component={CommunityArea} />
    <HomeStack.Screen name="Analysis" component={Analysis} />
    <HomeStack.Screen name="Emergency" component={Emergency} />
    <HomeStack.Screen name="PanicEmergency" component={PanicEmergency} />
    <HomeStack.Screen name="TenantRentPayment" component={TenantRentPayment} />
    <HomeStack.Screen name="SendMoney" component={SendMoney} />
    <HomeStack.Screen name="AddBeneficiary" component={AddBeneficiary} />
    <HomeStack.Screen name="Profile" component={Profile} />
    <HomeStack.Screen name="EditProfile" component={EditProfile} />
    <HomeStack.Screen name="ProfileSettings" component={ProfileSettings} />
    <HomeStack.Screen name="Verify" component={Verify} />
    <HomeStack.Screen name="Commuication" component={Commuication} />
  </HomeStack.Navigator>
);

// Tenant Tab Navigator (internal tabs)
const TenantTabs = () => (
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
      tabBarHideOnKeyboard: true,
    })}
  >
    <Tab.Screen name="Home" component={TenantHomeStack} />
    <Tab.Screen name="Chat" component={Chat} />
    <Tab.Screen name="Wallet" component={TenantWalletStackNavigator} />
  </Tab.Navigator>
);

// Drawer-wrapped navigators per role (exported)
export const TenantTabNavigator = () => (
  <Drawer.Navigator
    id="TenantDrawer"
    screenOptions={{ headerShown: false }}
    drawerContent={(props: DrawerContentComponentProps) => (
      <CustomDrawerContent {...props} />
    )}
  >
    <Drawer.Screen name="Tenant" component={TenantTabs} />
    <Drawer.Screen name="TenantAssignedProp" component={TenantAssignedProp} />
    <Drawer.Screen name="AdminVisitorDetails" component={AdminVisitorDetails} />
    <Drawer.Screen
      name="AdminGenerateVisitorRequest"
      component={AdminGenerateVisitorRequest}
    />

    <Drawer.Screen
      name="AdminAmenityMakeReservation"
      component={AdminAmenityMakeReservation}
    />
    <Drawer.Screen
      name="AdminReservationView"
      component={AdminReservationView}
    />
    <Drawer.Screen name="AdminAddNewAmenity" component={AdminAddNewAmenity} />
    <Drawer.Screen name="AdminAmenityView" component={AdminAmenityView} />
    {/* <HomeStack.Screen
      name="AdminVisitorDetails"
      component={AdminVisitorDetails}
    /> */}
  </Drawer.Navigator>
);

export const AgentTabNavigator = () => (
  <Drawer.Navigator
    id="AgentDrawer"
    screenOptions={{ headerShown: false }}
    drawerContent={(props: DrawerContentComponentProps) => (
      <CustomDrawerContent {...props} />
    )}
  >
    <Drawer.Screen name="Agent" component={AgentTabs} />
  </Drawer.Navigator>
);

export const FacilityManagerTabNavigator = () => (
  <Drawer.Navigator
    id="FacilityManagerDrawer"
    screenOptions={{ headerShown: false }}
    drawerContent={(props: DrawerContentComponentProps) => (
      <CustomDrawerContent {...props} />
    )}
  >
    <Drawer.Screen name="FacilityManager" component={FacilityManagerTabs} />
  </Drawer.Navigator>
);

export const LandlordTabNavigator = () => (
  <Drawer.Navigator
    id="LandlordDrawer"
    screenOptions={{ headerShown: false }}
    drawerContent={(props: DrawerContentComponentProps) => (
      <CustomDrawerContent {...props} />
    )}
  >
    <Drawer.Screen name="Landlord" component={LandlordTabs} />
  </Drawer.Navigator>
);

export const SubLandlordTabNavigator = () => (
  <Drawer.Navigator
    id="SubLandlordDrawer"
    screenOptions={{ headerShown: false }}
    drawerContent={(props: DrawerContentComponentProps) => (
      <CustomDrawerContent {...props} />
    )}
  >
    <Drawer.Screen name="SubLandlord" component={SubLandlordTabs} />
  </Drawer.Navigator>
);

export const SecurityTabNavigator = () => (
  <Drawer.Navigator
    id="SecurityDrawer"
    drawerContent={(props: DrawerContentComponentProps) => (
      <CustomDrawerContent {...props} />
    )}
  >
    <Drawer.Screen name="Security" component={SecurityTabs} />
  </Drawer.Navigator>
);

export const AdminTabNavigator = () => (
  <Drawer.Navigator
    id="AdminDrawer"
    screenOptions={{ headerShown: false, drawerType: "front" }}
    drawerContent={(props: DrawerContentComponentProps) => (
      <CustomDrawerContent {...props} />
    )}
  >
    <Drawer.Screen name="Admin" component={AdminTabs} />
  </Drawer.Navigator>
);

// Agent Tab Navigator (internal tabs)
const AgentTabs = () => (
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
      tabBarHideOnKeyboard: true,
    })}
  >
    <Tab.Screen name="Dashboard" component={AgentStackNavigator} />
    <Tab.Screen name="Properties" component={AgentStackNavigator} />
    <Tab.Screen name="Clients" component={AgentStackNavigator} />
    <Tab.Screen name="Leads" component={AgentStackNavigator} />
    <Tab.Screen name="Reports" component={AgentStackNavigator} />
  </Tab.Navigator>
);

// Facility Manager Tab Navigator (internal tabs)
const FacilityManagerTabs = () => (
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
      tabBarHideOnKeyboard: true,
    })}
  >
    <Tab.Screen name="Dashboard" component={FacilityManagerStackNavigator} />
    <Tab.Screen name="Maintenance" component={FacilityManagerStackNavigator} />
    <Tab.Screen name="Work Orders" component={FacilityManagerStackNavigator} />
    <Tab.Screen name="Inventory" component={FacilityManagerStackNavigator} />
    <Tab.Screen name="Reports" component={FacilityManagerStackNavigator} />
  </Tab.Navigator>
);

// Landlord Tab Navigator (internal tabs)
const LandlordTabs = () => (
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
      tabBarHideOnKeyboard: true,
    })}
  >
    <Tab.Screen name="Dashboard" component={LandlordStackNavigator} />
    <Tab.Screen name="Properties" component={LandlordStackNavigator} />
    <Tab.Screen name="Tenants" component={LandlordStackNavigator} />
    <Tab.Screen name="Finances" component={LandlordStackNavigator} />
    <Tab.Screen name="Analytics" component={LandlordStackNavigator} />
  </Tab.Navigator>
);

// Sub-Landlord Tab Navigator (internal tabs)
const SubLandlordTabs = () => (
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
      tabBarHideOnKeyboard: true,
    })}
  >
    <Tab.Screen name="Dashboard" component={SubLandlordStackNavigator} />
    <Tab.Screen name="Properties" component={SubLandlordStackNavigator} />
    <Tab.Screen name="Communication" component={SubLandlordStackNavigator} />
    <Tab.Screen name="Maintenance" component={SubLandlordStackNavigator} />
    <Tab.Screen name="Reports" component={SubLandlordStackNavigator} />
  </Tab.Navigator>
);

// Security Tab Navigator (internal tabs)
const SecurityTabs = () => (
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
      tabBarHideOnKeyboard: true,
    })}
  >
    <Tab.Screen name="Dashboard" component={SecurityStackNavigator} />
    <Tab.Screen name="Visitors" component={SecurityStackNavigator} />
    <Tab.Screen name="Incidents" component={SecurityStackNavigator} />
    <Tab.Screen name="Access" component={SecurityStackNavigator} />
    <Tab.Screen name="Alerts" component={SecurityStackNavigator} />
  </Tab.Navigator>
);

// Admin Tab Navigator (internal tabs)
const AdminTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarStyle: {
        backgroundColor: "#292766",
      },
      tabBarLabelStyle: {
        fontFamily: typography.fonts.poppins.medium,
      },
      tabBarIcon: ({ focused, color, size }) => {
        switch (route.name) {
          case "Home":
            return (
              <View>
                <WithLocalSvg asset={Images.homeIocn} />
                {focused && <View style={styles._indicator} />}
              </View>
            );
          case "Booking":
            return (
              <View>
                <WithLocalSvg asset={Images.booknow} />
                {focused && <View style={styles._indicator} />}
              </View>
            );

          case "Properties":
            return (
              <View>
                <WithLocalSvg asset={Images.manageprop} />
                {focused && <View style={styles._indicator} />}
              </View>
            );
          case "Wallet":
            return (
              <View>
                <WithLocalSvg asset={Images.wallet} />
                {focused && <View style={styles._indicator} />}
              </View>
            );
          case "Chat":
            return (
              <View>
                <WithLocalSvg asset={Images.chat} />
                {focused && <View style={styles._indicator} />}
              </View>
            );
          default:
            return null;
        }
      },
      tabBarActiveTintColor: colors.white,
      tabBarInactiveTintColor: colors.white,
      headerShown: false,
      tabBarHideOnKeyboard: true,
    })}
  >
    <Tab.Screen
      name="Home"
      component={AdminHomeStackNavigator}
      options={({ route }) => {
        const routeName =
          getFocusedRouteNameFromRoute(route) ?? "AdminDashboard";
        const baseTabBarStyle = {
          backgroundColor: "#292766",
        } as const;

        // Hide on Facility-Management detail screens (keep visible on FacilityManagement index)
        const hideOnFacilityScreens = [
          "FMViewDetails",
          "FMEdit",
          "FMGenerateWorkOrder",
          "FMViewWorkOrder",
          "FMOrderView",
          "FMOrderUpdate",
          "FMOrderExport",
          "AdminVisitorDetails",
          "Emergency",
          "Profile",
          "EditProfile",
          "ProfileSettings",
          "PanicEmergency",
          "AdminPropertyRequests",
          "AdminManageInspections",
          "AdminSimDataManagement",
          "AdminManageMeters",
          "AdminManageTransactions",
          "AdminManagePropertyGroup",
          "AdminManageVendingHistory",
          "Analysis",
          "AdminUtilitiesSettings",
        ];

        if (hideOnFacilityScreens.includes(routeName)) {
          return {
            tabBarStyle: [{ ...baseTabBarStyle }, { display: "none" }],
          } as const;
        }

        return { tabBarStyle: baseTabBarStyle } as const;
      }}
    />
    <Tab.Screen
      name="Booking"
      component={AdminBookingStackNavigator}
      options={({ route }) => {
        const routeName =
          getFocusedRouteNameFromRoute(route) ?? "AdminManageBookings";
        const baseTabBarStyle = {
          backgroundColor: "#292766",
        } as const;
        if (routeName === "AdminBookingDetails") {
          return {
            title: "Booking",
            tabBarStyle: [{ ...baseTabBarStyle }, { display: "none" }],
          };
        }
        return {
          title: "Booking",
          tabBarStyle: baseTabBarStyle,
        };
      }}
    />
    <Tab.Screen
      name="Properties"
      component={AdminPropertiesStackNavigator}
      options={({ route }) => {
        const routeName =
          getFocusedRouteNameFromRoute(route) ?? "AdminPropertyManagement";
        // Base tab bar style for Admin tabs
        const baseTabBarStyle = {
          backgroundColor: "#292766",
        } as const;
        // Hide tab bar on Add Property and other full-screen property flows
        if (
          routeName === "AdminAddProperty" ||
          routeName === "AdminManageCalendar" ||
          routeName === "AdminAssignProperties" ||
          routeName === "AdminGenerateWorkRequests" ||
          routeName === "AdminTenantDetails" ||
          routeName === "AdminCreateVisitorRequests"
        ) {
          return {
            title: "Properties",
            tabBarStyle: [{ ...baseTabBarStyle }, { display: "none" }],
          };
        }
        return {
          title: "Properties",
          tabBarStyle: baseTabBarStyle,
        };
      }}
    />
    <Tab.Screen name="Wallet" component={AdminWalletStackNavigator} />
    <Tab.Screen name="Chat" component={Chat} />
  </Tab.Navigator>
);

import { Route } from "@react-navigation/native";

const getTabBarVisibility = (route: Route<string, object | undefined>) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "AdminDashboard";
  const screensToHideTabBar = ["EditCreateMeter", "ViewMeterDetails"];
  if (screensToHideTabBar.includes(routeName)) {
    return { display: "none" };
  }
  return {};
};

const styles = StyleSheet.create({
  _indicator: {
    width: adjustSize(20),
    height: 3,
    borderRadius: 4,
    backgroundColor: colors.white,
    position: "absolute",
    alignSelf: "center",
    zIndex: 1,
    bottom: adjustSize(-22),
  },
});
