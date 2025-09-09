// IUser;

import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type MeterData = {
  id: string;
  meterName: string;
  tenent: string;
  status: string;
  manufacturer: string | number;
  meterType: string;
  groupId: string;
  propertyId: string;
  meterId: string;
};

// Base screens that are common across all user types
export type AuthStackParamList = {
  Splash: undefined;
  Intro: undefined;
  Login: undefined;
  CreateAccount: any;
  ForgotPassword: undefined;
};

// Screens specific to Tenant
export type TenantStackParamList = {
  Tenant: undefined;
  TenantHome: undefined;
  TenantDashboard: undefined;
  TenantProfile: undefined;
  TenantMaintenance: undefined;
  RentPayment: undefined;
  TenantLeaseAgreement: undefined;
  TenantNotifications: undefined;
  TenantSupport: undefined;
  TenantSettings: undefined;
  SendMoney: undefined;
  AddBeneficiary: undefined;
  FinancialReports: undefined;
  FMViewDetails: undefined;
  FMEdit: undefined;
  FMGenerateWorkOrder: undefined;
  FMViewWorkOrder: undefined;
  FMOrderView: undefined;
  FMOrderUpdate: undefined;
  FMOrderExport: undefined;
  VisitorRequests: undefined;
  RevokedInvitations: undefined;
  FacilityManagement: undefined;
  TenantUtilitiesUpdateProfile: undefined;
  CommunityArea: undefined;
  Analysis: undefined;
  Emergency: undefined;
  PanicEmergency: undefined;
  Profile: undefined;
  EditProfile: undefined;
  ProfileSettings: undefined;
  Verify: undefined;
  Commuication: undefined;
  // Tenant Utilities Screens
  UtilitiesSummary: undefined;
  TenantUtilitiesMyMeter: undefined;
  TenantUtilitiesCharges: undefined;
  TenantUtilitiesTransactions: undefined;
  TenantUtilitiesVendingHistory: undefined;
  TenantUtilitiesReportIssue: undefined;
  TenantAssignedProp: undefined;
  FacilityManager: undefined;
  FacilityManagerDashboard: undefined;
};

// Screens specific to Admin
export type AdminStackParamList = {
  Admin: undefined;
  AdminDashboard: undefined;
  AdminUserManagement: undefined;
  AdminPropertyManagement: { propertyType?: "rental" | "managed" };
  PropertyDetails: { propertyId: string };
  AdminPropertyServices: undefined;
  AdminPropertyFeatures: undefined;
  AdminPropertyRestriction: undefined;
  AdminAddProperty: undefined;
  AdminManageCalendar: { propertyId: string };
  AdminAssignProperties: {
    propertyId: string;
    type: "agent" | "tenant" | "fm";
    title?: string;
  };
  AdminGenerateWorkRequests: { propertyId: string };
  AdminCreateVisitorRequests: { propertyId: string };
  InspectionDetails: { inspectionId: string };
  AdminManageBookings: {
    bookingType?: "reserved" | "active" | "history" | "cancelled";
  };
  AdminBookingDetails: { bookingId: string };
  FacilityManagement: {
    status: "work_requests" | "work_orders" | "completed";
  };
  AdminVisitorManagement: {
    view:
      | "visitor_requests"
      | "visitors_list"
      | "revoked"
      | "access_alerts"
      | "panic_alerts";
  };
  AdminTenants: undefined;
  CommunityArea: { tab: "amenities" | "reservations" };
  // Admin Community Area action pages
  AdminAmenityView: undefined;
  AdminAmenityEdit: undefined;
  AdminAmenityMakeReservation: undefined;
  AdminAmenityManageCalendar: undefined;
  AdminAddNewAmenity: undefined;
  AdminReservationView: undefined;
  // Separate Visitor Management pages
  VisitorRequests: undefined;
  AdminVisitorsList: undefined;
  RevokedInvitations: undefined;
  AdminAccessAlerts: undefined;
  AdminPanicAlerts: undefined;
  FinancialReports: undefined;
  SendMoney: undefined;
  AddBeneficiary: undefined;
  AdminSystemSettings: undefined;
  AdminAnalytics: undefined;
  AdminAuditLogs: undefined;
  AdminBackupRestore: undefined;
  Commuication: undefined;
  // Admin Facility Management action screens
  FMViewDetails: undefined;
  FMEdit: undefined;
  FMGenerateWorkOrder: undefined;
  FMViewWorkOrder: undefined;
  AdminTenantDetails: undefined;
  // Admin Facility Management Order action screens
  FMOrderView: undefined;
  FMOrderUpdate: undefined;
  FMOrderExport: undefined;
  // Admin Emergency and Profile screens
  Emergency: undefined;
  AdminProfile: undefined;
  // Admin Visitor Details screen
  AdminVisitorDetails: { visitorId: string };
  // Admin Generate Visitor Request screen
  AdminGenerateVisitorRequest: undefined;
  EditProfile: undefined;
  ProfileSettings: undefined;
  PanicEmergency: undefined;
  Profile: undefined;
  AdminPropertyRequests: undefined;
  AdminManageInspections: undefined;
  AdminSimDataManagement: undefined;
  AdminManageMeters: undefined;
  AdminManageTransactions: undefined;
  AdminManagePropertyGroup: undefined;
  AdminManageVendingHistory: undefined;
  Analysis: undefined;
  AdminUtilitiesSettings: undefined;
  ViewMeterDetails: { meter: MeterData };
  EditCreateMeter: { mode: "add" | "edit"; meterId?: string };
  ViewPropertiesGroups: undefined;
  AddEditGroup: {
    mode: "add" | "edit";
    group?: {
      id: string;
      title: string;
      groupId: string;
      noOfProp?: string;
      noOfTenents?: string;
      noOfMeters?: string;
      date?: string;
    };
  };
};

// Screens specific to Agent
export type AgentStackParamList = {
  // Main screens
  Agent: undefined;
  AgentTabs: undefined;
  AgentHome: undefined;
  AgentDashboard: undefined;
  AgentPropertyListings: undefined;
  AgentClientManagement: undefined;
  AgentScheduleViewing: undefined;
  AgentLeadManagement: undefined;
  AgentCommissionReports: undefined;
  AgentMarketingTools: undefined;
  AgentDocumentManagement: undefined;
  AgentSettings: undefined;

  // Shared property screens
  PropertyDetails: { id: string };
  AdminTenantDetails: { id: string };
  AdminVisitorDetails: { id: string };
  AdminGenerateVisitorRequest: { id?: string };

  // Profile screens
  Profile: { userId: string };
  EditProfile: { userId: string };

  // Other shared screens
  FacilityManagement: { status: "work_requests" | "work_orders" | "completed" };
  CommunityArea: { tab: "amenities" | "reservations" };
  Emergency: undefined;
  FinancialReports: undefined;
  SendMoney: undefined;
  AddBeneficiary: undefined;
  Commuication: undefined;

  // Add other shared screens as needed
};

// Screens specific to Facility Manager
export type FacilityManagerStackParamList = {
  FacilityManager: undefined;
  FacilityManagerDashboard: undefined;
  TeamList: undefined;
  SelectPropertyGroup: undefined;
  ViewTeamMember: undefined;
  AddTeamMember: undefined;
  FacilityReports: undefined;
  FacilityAssetManagement: undefined;
  FacilityPreventiveMaintenance: undefined;
  FacilityManagerSettings: undefined;
  Emergency: undefined;
  PanicEmergency: undefined;
  Profile: undefined;
  EditProfile: undefined;
  ProfileSettings: undefined;
  Subscription: undefined;
  Reviews: undefined;
  Verify: undefined;
  RentPayment: undefined;
  SendMoney: undefined;
  AddBeneficiary: undefined;
  FinancialReports:undefined
};

export type FacilityManagerDashboardProps = NativeStackScreenProps<
  FacilityManagerStackParamList,
  "FacilityManagerDashboard"
>;

// Screens specific to Landlord
export type LandlordStackParamList = {
  Landlord: undefined;
  LandlordDashboard: undefined;
  LandlordMyProperties: undefined;
  LandlordTenantManagement: undefined;
  LandlordRentCollection: undefined;
  LandlordExpenseTracking: undefined;
  LandlordMaintenanceRequests: undefined;
  LandlordFinancialReports: undefined;
  LandlordPropertyAnalytics: undefined;
  LandlordSettings: undefined;
  Dashboard: undefined;
  Properties: undefined;
  Tenants: undefined;
  Finances: undefined;
  Analytics: undefined;
};

// Screens specific to Sub-Landlord
export type SubLandlordStackParamList = {
  SubLandlord: undefined;
  SubLandlordDashboard: undefined;
  SubLandlordAssignedProperties: undefined;
  SubLandlordTenantCommunication: undefined;
  SubLandlordMaintenanceRequests: undefined;
  SubLandlordRentCollection: undefined;
  SubLandlordReports: undefined;
  SubLandlordPropertyInspections: undefined;
  SubLandlordDocumentManagement: undefined;
  SubLandlordSettings: undefined;
};

// Screens specific to Security
export type SecurityStackParamList = {
  Security: undefined;
  SecurityDashboard: undefined;
  SecurityVisitorLogs: undefined;
  SecurityIncidentReports: undefined;
  SecurityAccessControl: undefined;
  SecurityEmergencyContacts: undefined;
  SecurityAlerts: undefined;
  SecurityPatrolLogs: undefined;
  SecuritySettings: undefined;
  Dashboard: undefined;
  Visitors: undefined;
  Incidents: undefined;
  Access: undefined;
};

export type TenantUtilitiesStackParamList = {
  UtilitiesSummary: undefined;
  TenantUtilitiesMyMeter: undefined;
  TenantUtilitiesCharges: undefined;
  TenantUtilitiesTransactions: undefined;
  TenantUtilitiesVendingHistory: undefined;
  TenantUtilitiesReportIssue: undefined;
  TenantUtilitiesUpdateProfile: undefined;
};

// Global screens available to all users
export type GlobalStackParamList = {
  Global: undefined;
  PropertyFilters: undefined;
  Help: undefined;
  ContactUs: undefined;
  FAQ: undefined;
  AboutUs: undefined;
  TermsConditions: undefined;
};

// Main app param list that combines all stacks
export type AppStackParamList = AuthStackParamList &
  TenantStackParamList &
  AdminStackParamList &
  AgentStackParamList &
  FacilityManagerStackParamList &
  LandlordStackParamList &
  SubLandlordStackParamList &
  SecurityStackParamList &
  GlobalStackParamList & {
    Main: undefined;
    Home: undefined;
    Notification: undefined;
    Favourities: undefined;
    BookNow: undefined;
    Chat: undefined;
  };

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

export type IRoutes = {
  name: keyof AppStackParamList;
  component: React.ComponentType<any>;
  title?: string;
  showHeader?: boolean;
};

export interface IUser {
  id: string;
  email: string;
  firstname?: string;
  lastname?: string;
  profilepic?: string;
  phonenumber?: string;
  address?: string;
  email_verified?: boolean;
  created_at?: string;
  updated_at?: string;
  last_login?: string;
  is_trial_active?: boolean;
  trial_ends_at?: string;
  subscription_status?: "active" | "inactive" | "trial" | "cancelled";
}

export interface AuthResponse {
  user: IUser | null;
  session: any | null;
  error: Error | null;
}

export interface SignUpData {
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  phonenumber?: string;
}

export interface UpdateProfileData {
  firstname?: string;
  lastname?: string;
  profilepic?: string;
  phonenumber?: string;
  address?: string;
}
