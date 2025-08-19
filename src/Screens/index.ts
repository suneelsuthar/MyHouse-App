import { Splash } from "./auth/splash";
import { Intro } from "./auth/intro";
import { CreateAccount } from "./auth/createaccount";
import { LoginScreen } from "./auth/login";
import { Home } from "./global/home";
import { Notification } from "./global/notifications";
import { Favourities } from "./global/favourites";
import { BookNow } from "./global/booknow";
import { Chat } from "./global/chat";

// Global screens exports
export * from "./global";
export * from "./global/home";
export * from "./global/favourites";
export * from "./global/booknow";
export * from "./global/chat";
export * from "./global/notifications";
export * from "./global/terms-conditions";
export * from "./global/about-us";
export * from "./global/faq";
export * from "./global/contact-us";
export * from "./global/help";
export * from "./global/property-filters";

import { Tenant } from "./tenant";
import { TenantDashboard } from "./tenant/dashboard";
import { TenantProfile } from "./tenant/profile";
import { TenantMaintenance } from "./tenant/maintenance";
import { TenantRentPayment } from "./tenant/rent-payment";
import { TenantLeaseAgreement } from "./tenant/lease-agreement";
import { TenantNotifications } from "./tenant/notifications";
import { TenantSupport } from "./tenant/support";
import { TenantSettings } from "./tenant/settings";
import { TenantHome } from "./tenant/home";
import { TenantChat } from "./tenant/chat";
import { TenantWallet } from "./tenant/wallet";
import { Agent } from "./agent";
import { AgentDashboard } from "./agent/dashboard";
import { AgentPropertyListings } from "./agent/property-listings";
import { AgentClientManagement } from "./agent/client-management";
import { AgentScheduleViewing } from "./agent/schedule-viewing";
import { AgentLeadManagement } from "./agent/lead-management";
import { AgentCommissionReports } from "./agent/commission-reports";
import { AgentMarketingTools } from "./agent/marketing-tools";
import { AgentDocumentManagement } from "./agent/document-management";
import { AgentSettings } from "./agent/settings";
import { FacilityManager } from "./facility-manager";
import { FacilityManagerDashboard } from "./facility-manager/dashboard";
import { FacilityMaintenanceRequests } from "./facility-manager/maintenance-requests";
import { FacilityWorkOrders } from "./facility-manager/work-orders";
import { FacilityVendorManagement } from "./facility-manager/vendor-management";
import { FacilityInventoryManagement } from "./facility-manager/inventory-management";
import { FacilityReports } from "./facility-manager/facility-reports";
import { FacilityAssetManagement } from "./facility-manager/asset-management";
import { FacilityPreventiveMaintenance } from "./facility-manager/preventive-maintenance";
import { FacilityManagerSettings } from "./facility-manager/settings";
import { Landlord } from "./landlord";
import { LandlordDashboard } from "./landlord/dashboard";
import { LandlordMyProperties } from "./landlord/my-properties";
import { LandlordTenantManagement } from "./landlord/tenant-management";
import { LandlordRentCollection } from "./landlord/rent-collection";
import { LandlordExpenseTracking } from "./landlord/expense-tracking";
import { LandlordMaintenanceRequests } from "./landlord/maintenance-requests";
import { LandlordFinancialReports } from "./landlord/financial-reports";
import { LandlordPropertyAnalytics } from "./landlord/property-analytics";
import { LandlordSettings } from "./landlord/settings";
import { SubLandlord } from "./sub-landlord";
import { SubLandlordDashboard } from "./sub-landlord/dashboard";
import { SubLandlordAssignedProperties } from "./sub-landlord/assigned-properties";
import { SubLandlordTenantCommunication } from "./sub-landlord/tenant-communication";
import { SubLandlordMaintenanceRequests } from "./sub-landlord/maintenance-requests";
import { SubLandlordRentCollection } from "./sub-landlord/rent-collection";
import { SubLandlordReports } from "./sub-landlord/reports";
import { SubLandlordPropertyInspections } from "./sub-landlord/property-inspections";
import { SubLandlordDocumentManagement } from "./sub-landlord/document-management";
import { SubLandlordSettings } from "./sub-landlord/settings";
import { Security } from "./security";
import { SecurityDashboard } from "./security/dashboard";
import { SecurityVisitorLogs } from "./security/visitor-logs";
import { SecurityIncidentReports } from "./security/incident-reports";
import { SecurityAccessControl } from "./security/access-control";
import { SecurityEmergencyContacts } from "./security/emergency-contacts";
import { SecurityAlerts } from "./security/security-alerts";
import { SecurityPatrolLogs } from "./security/patrol-logs";
import { SecuritySettings } from "./security/settings";
import { Admin } from "./admin";
import { AdminDashboard } from "./admin/dashboard";
import { AdminUserManagement } from "./admin/user-management";
import { AdminPropertyManagement } from "./admin/property-management";
import { AdminFinancialReports } from "./admin/financial-reports";
import { AdminSystemSettings } from "./admin/system-settings";
import { AdminAnalytics } from "./admin/analytics";
import { AdminAuditLogs } from "./admin/audit-logs";
import { AdminBackupRestore } from "./admin/backup-restore";
import { AdminSupportTickets } from "./admin/support-tickets";
export {
  Splash,
  Intro,
  CreateAccount,
  LoginScreen,
  Home,
  Notification,
  Favourities,
  BookNow,
  Chat,
  Tenant,
  TenantDashboard,
  TenantProfile,
  TenantMaintenance,
  TenantRentPayment,
  TenantLeaseAgreement,
  TenantNotifications,
  TenantSupport,
  TenantSettings,
  TenantHome,
  TenantChat,
  TenantWallet,
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
  Landlord,
  LandlordDashboard,
  LandlordMyProperties,
  LandlordTenantManagement,
  LandlordRentCollection,
  LandlordExpenseTracking,
  LandlordMaintenanceRequests,
  LandlordFinancialReports,
  LandlordPropertyAnalytics,
  LandlordSettings,
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
  Security,
  SecurityDashboard,
  SecurityVisitorLogs,
  SecurityIncidentReports,
  SecurityAccessControl,
  SecurityEmergencyContacts,
  SecurityAlerts,
  SecurityPatrolLogs,
  SecuritySettings,
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
};
