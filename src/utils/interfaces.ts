// IUser;

import { NativeStackScreenProps } from "@react-navigation/native-stack";
// Base screens that are common across all user types
export type AuthStackParamList = {
  Splash: undefined;
  Intro: undefined;
  Login: undefined;
  CreateAccount: undefined;
  ForgotPassword: undefined;
};

// Screens specific to Tenant
export type TenantStackParamList = {
  Tenant: undefined;
  TenantDashboard: undefined;
  TenantProfile: undefined;
  TenantMaintenance: undefined;
  TenantRentPayment: undefined;
  TenantLeaseAgreement: undefined;
  TenantNotifications: undefined;
  TenantSupport: undefined;
  TenantSettings: undefined;
};

// Screens specific to Admin
export type AdminStackParamList = {
  Admin: undefined;
  AdminDashboard: undefined;
  AdminUserManagement: undefined;
  AdminPropertyManagement: undefined;
  AdminPropertyDetails: { propertyId: string };
  AdminAddProperty: undefined;
  AdminManageCalendar: { propertyId: string };
  AdminAssignProperties: {
    propertyId: string;
    type: "agent" | "tenant" | "fm";
    title?: string;
  };
  AdminGenerateWorkRequests: { propertyId: string };
  AdminCreateVisitorRequests: { propertyId: string };
  AdminFinancialReports: undefined;
  AdminSystemSettings: undefined;
  AdminAnalytics: undefined;
  AdminAuditLogs: undefined;
  AdminBackupRestore: undefined;
  AdminSupportTickets: undefined;
};

// Screens specific to Agent
export type AgentStackParamList = {
  Agent: undefined;
  AgentDashboard: undefined;
  AgentPropertyListings: undefined;
  AgentClientManagement: undefined;
  AgentScheduleViewing: undefined;
  AgentLeadManagement: undefined;
  AgentCommissionReports: undefined;
  AgentMarketingTools: undefined;
  AgentDocumentManagement: undefined;
  AgentSettings: undefined;
};

// Screens specific to Facility Manager
export type FacilityManagerStackParamList = {
  FacilityManager: undefined;
  FacilityManagerDashboard: undefined;
  FacilityMaintenanceRequests: undefined;
  FacilityWorkOrders: undefined;
  FacilityVendorManagement: undefined;
  FacilityInventoryManagement: undefined;
  FacilityReports: undefined;
  FacilityAssetManagement: undefined;
  FacilityPreventiveMaintenance: undefined;
  FacilityManagerSettings: undefined;
};

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
  subscription_status?: 'active' | 'inactive' | 'trial' | 'cancelled';
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
