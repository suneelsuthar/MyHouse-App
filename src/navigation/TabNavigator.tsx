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
  RentPayment,
  TenantAssignedProp,

  // Agent screens
  AgentDashboard,
  AgentSettings,

  // Facility Manager screens
  FacilityManager,
  FacilityManagerDashboard,
  AddTeamMember,
  SelectPropGroup,
  ViewTeam,
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
  AdminUtilitiesDashboard,
  AdminPropertyManagement,
  PropertyDetails,
  AdminAddProperty,
  AdminManageCalendar,
  AdminAssignProperties,
  AdminGenerateWorkRequests,
  AdminCreateVisitorRequests,
  AdminBookingDetails,
  AdminAddEditCharges,
  // Property management screens are imported directly from their files
  // Other admin screens
  FacilityManagement,
  AdminVisitorManagement,
  Tenants,
  TenantsRequests,
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
  ManageMeters,
  ManageTransactions,
  AdminManagePropertyGroup,
  AdminManageVendingHistory,
  Analysis,
  AdminUtilitiesSettings,
  ViewMeterDetails,
  EditCreateMeter,
  ViewPropertiesGroups,
  EditGroup,
  AddGroup,
  AdminManageBookings,
  TenantDetails,
  Commuication,
  FinancialReports,
  SendMoney,
  AddBeneficiary,
  Profile,
  Verify,
  EditProfile,
  CreateNewPin,
  ProfileSettings,
  SecurityIncidentReports,
  AgentAssignedProp,
  AgentHome,
  Subscription,
  Reviews,
  SelectSubscriptionplans,
  AdminSignAgreement,
  AdminUtilitiesCharges,
  TenantViewRequests,
  TenantNewRequests,
} from "../Screens";

import { AgentDrawerParamList } from "./types/agent";
import {
  ViewAssignedDetails,
  AssignedAgent,
  RenegotiateCommission,
} from "../Screens/agent/assigned-properties";

// Import property management screens from their respective files
import AdminPropertyServices from "../Screens/admin/property-management/services";
import AdminPropertyFeatures from "../Screens/admin/property-management/features";
import AdminPropertyRestriction from "../Screens/admin/property-management/restriction";
import AdminManageInspections from "../Screens/admin/property-management/manage-inspections";
import InspectionDetails from "../Screens/admin/property-management/inspection-details";
import { AdminWallet } from "../Screens/admin/wallet/AdminWallet";

import {
  TenantStackParamList,
  FacilityManagerStackParamList,
  LandlordStackParamList,
  SubLandlordStackParamList,
  SecurityStackParamList,
  AdminStackParamList,
  AgentStackParamList,
} from "../utils/interfaces";
import { CustomDrawerContent } from "../Components/drawer/CustomDrawer";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../assets/Images";
import { View } from "react-native";

// Create stack navigators for each role
const TenantStack = createNativeStackNavigator<TenantStackParamList>();
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
import { UtilitiesMyMeter } from "../Screens/tenant/utilities/MyMeter";
import { UtilitiesCharges } from "../Screens/tenant/utilities/Charges";

import { TenantUtilitiesTransactions } from "../Screens/tenant/utilities/Transactions";
import { TenantUtilitiesVendingHistory } from "../Screens/tenant/utilities/VendingHistory";
import { TenantUtilitiesReportIssue } from "../Screens/tenant/utilities/ReportIssue";
import { TenantUtilitiesUpdateProfile } from "../Screens/tenant/utilities";
import { Chat } from "../Screens/global/chat";
import { TenantHome } from "../Screens/tenant/home";

// Import agent screens

// Create stack navigators with proper typing
const AgentStack = createNativeStackNavigator<AgentStackParamList>();
const AgentHomeStack = createNativeStackNavigator<AgentStackParamList>();
const AgentPropertiesStack = createNativeStackNavigator<AgentStackParamList>();
const AgentClientsStack = createNativeStackNavigator<AgentStackParamList>();
const AgentLeadsStack = createNativeStackNavigator<AgentStackParamList>();
const AgentReportsStack = createNativeStackNavigator<AgentStackParamList>();
const AgentBookingStack = createNativeStackNavigator<AgentStackParamList>();
const AgentHomeStackNavigator = () => {
  return (
    <AgentHomeStack.Navigator screenOptions={{ headerShown: false }}>
      <AgentHomeStack.Screen name="AgentHome" component={AgentTabs} />
      {/* <AgentHomeStack.Screen
        name="PropertyDetails"
        component={PropertyDetails as React.ComponentType<any>}
      />
   
      <AgentHomeStack.Screen
        name="AdminVisitorDetails"
        component={AdminVisitorDetails as React.ComponentType<any>}
      />
      <AgentHomeStack.Screen
        name="AdminGenerateVisitorRequest"
        component={AdminGenerateVisitorRequest as React.ComponentType<any>}
      />
      <AgentHomeStack.Screen
        name="Profile"
        component={Profile as React.ComponentType<any>}
      />
      <AgentHomeStack.Screen
        name="EditProfile"
        component={EditProfile as React.ComponentType<any>}
      />
      <AgentHomeStack.Screen
        name="FacilityManagement"
        component={FacilityManagement as React.ComponentType<any>}
      />
      <AgentHomeStack.Screen
        name="CommunityArea"
        component={CommunityArea as React.ComponentType<any>}
      />
      <AgentHomeStack.Screen
        name="Emergency"
        component={Emergency as React.ComponentType<any>}
      />
      <AgentHomeStack.Screen
        name="FinancialReports"
        component={FinancialReports as React.ComponentType<any>}
      />
      <AgentHomeStack.Screen
        name="SendMoney"
        component={SendMoney as React.ComponentType<any>}
      />
      <AgentHomeStack.Screen
        name="AddBeneficiary"
        component={AddBeneficiary as React.ComponentType<any>}
      />
      <AgentHomeStack.Screen
        name="Commuication"
        component={Commuication as React.ComponentType<any>}
      /> */}
    </AgentHomeStack.Navigator>
  );
};

const AgentPropertiesStackNavigator = () => {
  return (
    <AgentPropertiesStack.Navigator screenOptions={{ headerShown: false }}>
      <AgentPropertiesStack.Screen
        name="Profile"
        component={Profile as React.ComponentType<any>}
      />
      <AgentPropertiesStack.Screen
        name="EditProfile"
        component={EditProfile as React.ComponentType<any>}
      />
    </AgentPropertiesStack.Navigator>
  );
};

const AgentClientsStackNavigator = () => {
  return (
    <AgentClientsStack.Navigator screenOptions={{ headerShown: false }}>
      <AgentClientsStack.Screen name="Profile" component={Profile} />
    </AgentClientsStack.Navigator>
  );
};

const AgentLeadsStackNavigator = () => {
  return (
    <AgentLeadsStack.Navigator screenOptions={{ headerShown: false }}>
      <AgentLeadsStack.Screen
        name="AdminGenerateVisitorRequest"
        component={AdminGenerateVisitorRequest as React.ComponentType<any>}
      />
    </AgentLeadsStack.Navigator>
  );
};

const AgentReportsStackNavigator = () => {
  return (
    <AgentReportsStack.Navigator screenOptions={{ headerShown: false }}>
      <AgentReportsStack.Screen
        name="AdminVisitorDetails"
        component={AdminVisitorDetails as React.ComponentType<any>}
      />
      <AgentReportsStack.Screen
        name="AdminGenerateVisitorRequest"
        component={AdminGenerateVisitorRequest as React.ComponentType<any>}
      />
    </AgentReportsStack.Navigator>
  );
};

// Agent Stack Navigator
const AgentStackNavigator = () => {
  return (
    <AgentStack.Navigator screenOptions={{ headerShown: false }}>
      <AgentStack.Screen name="Agent" component={AgentTabs} />
      <AgentStack.Screen
        name="AgentSettings"
        component={AgentSettings as React.ComponentType<any>}
      />
      <AgentStack.Screen
        name="PropertyDetails"
        component={PropertyDetails as React.ComponentType<any>}
      />
      <AgentStack.Screen
        name="TenantDetails"
        component={TenantDetails as React.ComponentType<any>}
      />
      <AgentStack.Screen
        name="AdminVisitorDetails"
        component={AdminVisitorDetails as React.ComponentType<any>}
      />
      <AgentStack.Screen
        name="AdminGenerateVisitorRequest"
        component={AdminGenerateVisitorRequest as React.ComponentType<any>}
      />
      <AgentStack.Screen
        name="Profile"
        component={Profile as React.ComponentType<any>}
      />
      <AgentStack.Screen
        name="EditProfile"
        component={EditProfile as React.ComponentType<any>}
      />
      <AgentStack.Screen
        name="FacilityManagement"
        component={FacilityManagement as React.ComponentType<any>}
      />
      <AgentStack.Screen
        name="CommunityArea"
        component={CommunityArea as React.ComponentType<any>}
      />
      <AgentStack.Screen
        name="Emergency"
        component={Emergency as React.ComponentType<any>}
      />
      <AgentStack.Screen
        name="FinancialReports"
        component={FinancialReports as React.ComponentType<any>}
      />
      <AgentStack.Screen
        name="SendMoney"
        component={SendMoney as React.ComponentType<any>}
      />
      <AgentStack.Screen
        name="AddBeneficiary"
        component={AddBeneficiary as React.ComponentType<any>}
      />
      <AgentStack.Screen
        name="Commuication"
        component={Commuication as React.ComponentType<any>}
      />
    </AgentStack.Navigator>
  );
};

// Create the stack navigator with proper typing

// Facility Manager Stack Navigator
const FacilityManagerStackNavigator = () => {
  return (
    <FacilityManagerStack.Navigator screenOptions={{ headerShown: false }}>
      <FacilityManagerStack.Screen
        name="FacilityManagerDashboard"
        component={FacilityManagerDashboard}
      />
      <FacilityManagerStack.Screen name="ViewTeamMember" component={ViewTeam} />
      <FacilityManagerStack.Screen
        name="AddTeamMember"
        component={AddTeamMember}
      />
      <FacilityManagerStack.Screen
        name="SelectPropertyGroup"
        component={SelectPropGroup}
      />
      <FacilityManagerStack.Screen name="Emergency" component={Emergency} />
      <FacilityManagerStack.Screen
        name="PanicEmergency"
        component={PanicEmergency}
      />
      <FacilityManagerStack.Screen name="Profile" component={Profile} />
      <FacilityManagerStack.Screen name="EditProfile" component={EditProfile} />
      <FacilityManagerStack.Screen
        name="ProfileSettings"
        component={ProfileSettings}
      />
      <FacilityManagerStack.Screen
        name="Subscription"
        component={Subscription}
      />
      <FacilityManagerStack.Screen
        name="SelectSubscriptionplans"
        component={SelectSubscriptionplans}
      />
      <FacilityManagerStack.Screen name="Verify" component={Verify} />

      <FacilityManagerStack.Screen name="Reviews" component={Reviews} />
      <FacilityManagerStack.Screen name="RentPayment" component={RentPayment} />
      <FacilityManagerStack.Screen name="SendMoney" component={SendMoney} />
      <FacilityManagerStack.Screen
        name="AddBeneficiary"
        component={AddBeneficiary}
      />

      <FacilityManagerStack.Screen
        name="FinancialReports"
        component={FinancialReports}
      />

      <FacilityManagerStack.Screen
        name="Commuication"
        component={Commuication}
      />

      <FacilityManagerStack.Screen name="Tenants" component={Tenants} />
      <FacilityManagerStack.Screen
        name="TenantDetails"
        component={TenantDetails}
      />
      <FacilityManagerStack.Screen
        name="TenantsRequests"
        component={TenantsRequests}
      />
      <FacilityManagerStack.Screen
        name="CommunityArea"
        component={CommunityArea}
      />
      <FacilityManagerStack.Screen
        name="AdminAmenityView"
        component={AdminAmenityView}
      />
      <FacilityManagerStack.Screen
        name="AdminAmenityEdit"
        component={AdminAmenityEdit}
      />
      <FacilityManagerStack.Screen
        name="AdminAmenityMakeReservation"
        component={AdminAmenityMakeReservation}
      />
      <FacilityManagerStack.Screen
        name="AdminAmenityManageCalendar"
        component={AdminAmenityManageCalendar}
      />
      <FacilityManagerStack.Screen
        name="AdminAddNewAmenity"
        component={AdminAddNewAmenity}
      />
      <FacilityManagerStack.Screen
        name="AdminReservationView"
        component={AdminReservationView}
      />

      <FacilityManagerStack.Screen name="Analysis" component={Analysis} />
      <FacilityManagerStack.Screen
        name="ManageMeters"
        component={ManageMeters}
      />

      <FacilityManagerStack.Screen
        name="UtilitiesSummary"
        component={UtilitiesSummary}
      />
      <FacilityManagerStack.Screen
        name="UtilitiesMyMeter"
        component={UtilitiesMyMeter}
      />

      <FacilityManagerStack.Screen
        name="ViewMeterDetails"
        component={ViewMeterDetails}
      />

      <FacilityManagerStack.Screen
        name="ManageTransactions"
        component={ManageTransactions}
      />

      <FacilityManagerStack.Screen
        name="UtilitiesCharges"
        component={UtilitiesCharges}
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
// Admin Stacks per tab
const AdminHomeStackNavigator = () => (
  <AdminHomeStack.Navigator screenOptions={{ headerShown: false }}>
    <AdminHomeStack.Screen name="AdminDashboard" component={AdminDashboard} />
    <AdminHomeStack.Screen
      name="AdminUtilitiesDashboard"
      component={AdminUtilitiesDashboard}
    />
    <AdminHomeStack.Screen
      name="AdminUtilitiesCharges"
      component={AdminUtilitiesCharges}
    />
    <AdminHomeStack.Screen
      name="AdminAddEditCharges"
      component={AdminAddEditCharges}
    />

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
    <AdminHomeStack.Screen name="Tenants" component={Tenants} />
    <AdminHomeStack.Screen name="TenantDetails" component={TenantDetails} />

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
    <AdminHomeStack.Screen name="ManageMeters" component={ManageMeters} />
    <AdminHomeStack.Screen
      name="ManageTransactions"
      component={ManageTransactions}
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
    <AdminHomeStack.Screen name="EditGroup" component={EditGroup} />
    <AdminHomeStack.Screen name="AddGroup" component={AddGroup} />
    <AdminHomeStack.Screen name="Commuication" component={Commuication} />
    <AdminHomeStack.Screen name="TicketDetails" component={TicketDetials} />
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
    <AdminBookingStack.Screen
      name="AdminSignAgreement"
      component={AdminSignAgreement}
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
    <AdminWalletStack.Screen name="AdminWallet" component={AdminWallet} />
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
const Drawer = createDrawerNavigator<AgentDrawerParamList>();

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
    <HomeStack.Screen name="UtilitiesMyMeter" component={UtilitiesMyMeter} />
    <HomeStack.Screen name="UtilitiesCharges" component={UtilitiesCharges} />
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
    <HomeStack.Screen name="RentPayment" component={RentPayment} />
    <HomeStack.Screen name="SendMoney" component={SendMoney} />
    <HomeStack.Screen name="AddBeneficiary" component={AddBeneficiary} />
    <HomeStack.Screen name="Profile" component={Profile} />
    <HomeStack.Screen name="EditProfile" component={EditProfile} />
    <HomeStack.Screen name="CreateNewPin" component={CreateNewPin} />

    <HomeStack.Screen name="ProfileSettings" component={ProfileSettings} />
    <HomeStack.Screen name="Verify" component={Verify} />
    <HomeStack.Screen name="Commuication" component={Commuication} />
  </HomeStack.Navigator>
);

// const AgentBookingStackNavigator = () => (
//   <AgentBookingStack.Navigator screenOptions={{ headerShown: false }}>
//     <AgentBookingStack.Screen
//       name="AgentBooking"
//       component={AdminBookingStack}
//     />
//     <AgentBookingStack.Screen
//       name="AgentBookingDetails"
//       component={AgentBookingDetails}
//     />
//   </AgentBookingStack.Navigator>
// );

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
    <Tab.Screen
      name="Home"
      component={TenantHomeStack}
      options={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? "TenantHome";

        const baseTabBarStyle = {
          backgroundColor: colors.primary,
          borderTopWidth: 0,
          elevation: 8,
        } as const;

        const screensToHideTabBar = [
          "FMViewDetails",
          "FMEdit",
          "FMGenerateWorkOrder",
          "FMViewWorkOrder",
          "FMOrderView",
          "FMOrderUpdate",
          "FMOrderExport",
          "CreateNewPin",
          // "UtilitiesSummary",
          "UtilitiesMyMeter",
          "UtilitiesCharges",
          "TenantUtilitiesTransactions",
          "TenantUtilitiesVendingHistory",
          "TenantUtilitiesUpdateProfile",
          "TenantUtilitiesReportIssue",
          "Emergency",
          "PanicEmergency",
          "Profile",
          "EditProfile",
          "ProfileSettings",
          "Verify",
        ];

        if (screensToHideTabBar.includes(routeName)) {
          return {
            tabBarStyle: [{ ...baseTabBarStyle }, { display: "none" }],
          };
        }

        return {
          tabBarStyle: baseTabBarStyle,
        };
      }}
    />
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
    <Drawer.Screen name="TenantViewRequests" component={TenantViewRequests} />
    <Drawer.Screen name="TenantNewRequests" component={TenantNewRequests} />

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
    <Drawer.Screen name="ViewAssignedDetails" component={ViewAssignedDetails} />
    <Drawer.Screen name="AssignedAgent" component={AssignedAgent} />
    <Drawer.Screen
      name="RenegotiateCommission"
      component={RenegotiateCommission}
    />
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
    <Drawer.Screen name="AdminAddProperty" component={AdminAddProperty} />
  </Drawer.Navigator>
);

// Import agent screens

// Agent Tab Navigator (internal tabs)
const AgentTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarStyle: {
        backgroundColor: colors.primary,
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
      component={AgentHome}
      options={{
        tabBarIcon: ({ focused }) => (
          <View>
            <WithLocalSvg asset={Images.homeIocn} />
            {focused && <View style={styles._indicator} />}
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Booking"
      component={AdminBookingStackNavigator}
      options={{
        tabBarIcon: ({ focused }) => (
          <View>
            <WithLocalSvg asset={Images.booknow} />
            {focused && <View style={styles._indicator} />}
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Properties"
      component={AgentAssignedProp}
      options={{
        tabBarLabel: "My Properties",
        tabBarIcon: ({ focused }) => (
          <View>
            <WithLocalSvg asset={Images.manageprop} />
            {focused && <View style={styles._indicator} />}
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Wallet"
      component={AdminWalletStackNavigator}
      options={{
        tabBarIcon: ({ focused }) => (
          <View>
            <WithLocalSvg asset={Images.wallet} />
            {focused && <View style={styles._indicator} />}
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Chat"
      component={Chat}
      options={{
        tabBarIcon: ({ focused }) => (
          <View>
            <WithLocalSvg asset={Images.chat} />
            {focused && <View style={styles._indicator} />}
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);

// Facility Manager Tab Navigator (internal tabs)
const FacilityManagerTabs = () => (
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

          case "Properties":
            return (
              <View>
                <WithLocalSvg asset={Images.manageprop} />
                {focused && <View style={styles._indicator} />}
              </View>
            );
            ``;
          case "FacilityManagement":
            return (
              <View>
                <WithLocalSvg asset={Images.facilitymanag} />
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
      component={FacilityManagerStackNavigator}
      options={({ route }) => {
        const routeName =
          getFocusedRouteNameFromRoute(route) ?? "FacilityManagerDashboard";
        const baseTabBarStyle = {
          backgroundColor: "#292766",
        } as const;

        return { tabBarStyle: baseTabBarStyle } as const;
      }}
    />

    <Tab.Screen
      name="Properties"
      component={null}
      options={({ route }) => {
        const routeName =
          getFocusedRouteNameFromRoute(route) ?? "AdminPropertyManagement";
        const baseTabBarStyle = {
          backgroundColor: "#292766",
        } as const;
        if (
          routeName === "AdminAddProperty" ||
          routeName === "AdminManageCalendar" ||
          routeName === "AdminAssignProperties" ||
          routeName === "AdminGenerateWorkRequests" ||
          routeName === "TenantDetails" ||
          routeName === "AdminSignAgreement" ||
          routeName === "AdminCreateVisitorRequests"
        ) {
          return {
            title: "Assigned Properties",
            tabBarStyle: [{ ...baseTabBarStyle }, { display: "none" }],
          };
        }
        return {
          title: "Assigned Properties",
          tabBarStyle: baseTabBarStyle,
        };
      }}
    />
    <Tab.Screen
      name="FacilityManagement"
      component={AdminWalletStackNavigator}
    />
    <Tab.Screen name="Chat" component={Chat} />
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
        // marginBottom: 3,
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
          // height: 55,
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
          "AdminSignAgreement",
          "AdminSimDataManagement",
          "ManageMeters",
          "ManageTransactions",
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
          // height: 55,
        } as const;
        if (routeName === "AdminBookingDetails") {
          return {
            title: "Booking",
            tabBarStyle: [{ ...baseTabBarStyle }, { display: "none" }],
          };
        } else if (routeName === "AdminSignAgreement") {
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
          // height: 55,
        } as const;
        // Hide tab bar on Add Property and other full-screen property flows
        if (
          routeName === "AdminAddProperty" ||
          routeName === "AdminManageCalendar" ||
          routeName === "AdminAssignProperties" ||
          routeName === "AdminGenerateWorkRequests" ||
          routeName === "TenantDetails" ||
          routeName === "AdminCreateVisitorRequests" ||
          routeName === "AdminSignAgreement" ||
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
    <Tab.Screen
      name="Chat"
      component={Chat}
      listeners={({ navigation }) => ({
        tabPress: (e) => {
          e.preventDefault(); // stop default tab behavior

          navigation.navigate("Chat", {
            userId: 123,
            fromTab: true,
          });
        },
      })}
    />
  </Tab.Navigator>
);

import { Route } from "@react-navigation/native";
import { TicketDetials } from "../Screens/admin/support-tickets/ticket-detials";

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
