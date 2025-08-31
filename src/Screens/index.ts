import { Splash } from "./auth/splash";
import { Intro } from "./auth/intro";
import { CreateAccount } from "./auth/createaccount";
import { LoginScreen } from "./auth/login";
import { Home } from "./global/home";
import { Notification } from "./global/notifications";
import { Favourities } from "./global/favourites";
import { BookNow } from "./global/booknow";
import { Chat } from "./global/chat/index";
import { Message } from "./global/chat/messages";

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

// import { Tenant } from "./tenant";
import { TenantDashboard } from "./tenant/dashboard";
import { TenantProfile } from "./tenant/profile";
import { TenantMaintenance } from "./tenant/maintenance";
import { TenantRentPayment } from "./tenant/rent-payment";
import { TenantLeaseAgreement } from "./tenant/lease-agreement";
import { TenantNotifications } from "./tenant/notifications";
import { TenantSupport } from "./tenant/support";
import { TenantSettings } from "./tenant/settings";
import { TenantHome } from "./tenant/home";
// import { TenantChat } from "./tenant/chat";
import { TenantWallet } from "./tenant/wallet";
import { TenantAssignedProp } from "./tenant/assignemd-properties";
import { TenantSendMoney } from "./tenant/sendmoney";
import { TenantAddBeneficiary } from "./tenant/addbeneficiary";

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
// import { Admin  } from "./admin";
import { AdminDashboard } from "./admin/dashboard";
import { AdminUserManagement } from "./admin/user-management";
import { AdminPropertyManagement } from "./admin/property-management";
import { AdminFinancialReports } from "./admin/financial-reports";
import { AdminSystemSettings } from "./admin/system-settings";
import { AdminAnalytics } from "./admin/analytics";
import { AdminAuditLogs } from "./admin/audit-logs";
import { AdminBackupRestore } from "./admin/backup-restore";
import { AdminCommuication } from "./admin/support-tickets";
import { AdminPropertyDetails } from "./admin/property-details";
import { AdminAddProperty } from "./admin/add-property";
import { AdminManageCalendar } from "./admin/manage-calendar";
import { AdminAssignProperties } from "./admin/assign-properties";
import { AdminGenerateWorkRequests } from "./admin/generate-work-requests";
import { AdminCreateVisitorRequests } from "./admin/create-visitor-requests";
import { AdminManageBookings } from "./admin/manage-bookings";
import { AdminFacilityManagement } from "./admin/facility-management";
import { AdminBookingDetails } from "./admin/manage-bookings/details";
import { AdminVisitorManagement } from "./admin/visitor-management";
import { AdminTenants } from "./admin/tenants";
import { AdminCommunityArea } from "./admin/community-area";
import { AdminVisitorRequests } from "./admin/visitor-management/visitor-requests";
import { AdminVisitorsList } from "./admin/visitor-management/visitors-list";
import { AdminRevokedInvitations } from "./admin/visitor-management/revoked-invitations";
import { AdminAccessAlerts } from "./admin/visitor-management/access-alerts";
import { AdminPanicAlerts } from "./admin/visitor-management/panic-alerts";
import { AdminTenantDetails } from "./admin/tenants/tenant-details";
import { AdminFMViewDetails } from "./admin/facility-management/view-details";
import { AdminFMEdit } from "./admin/facility-management/edit";
import { AdminFMGenerateWorkOrder } from "./admin/facility-management/generate-work-order";
import { AdminFMViewWorkOrder } from "./admin/facility-management/view-work-order";
import { AdminFMOrderView } from "./admin/facility-management/order-view";
import { AdminFMOrderUpdate } from "./admin/facility-management/order-update";
import { AdminFMOrderExport } from "./admin/facility-management/order-export";
import { AdminAmenityView } from "./admin/community-area/amenity-view";
import { AdminAmenityEdit } from "./admin/community-area/amenity-edit";
import { AdminAmenityMakeReservation } from "./admin/community-area/amenity-make-reservation";
import { AdminAmenityManageCalendar } from "./admin/community-area/amenity-manage-calendar";
import { AdminReservationView } from "./admin/community-area/reservation-view";
import { AdminAddNewAmenity } from "./admin/community-area/add-new-amenity";
import { AdminEmergency } from "./admin/emergency";
import { Profile } from "./global/profile";
import { AdminVisitorDetails } from "./admin/visitor-management/visitor-details";
import { AdminGenerateVisitorRequest } from "./admin/visitor-management/generate-visitor-request";
import { EditProfile } from "./global/profile/edit-profile";
import { ProfileSettings } from "./global/profile/profile-settings";
import { Verify } from "./global/profile/verify";
import { AdminPanicEmergency } from "./admin/emergency/panic";
import { AdminPropertyRequests } from "./admin/property-requests";
import { AdminManageInspections } from "./admin/manage-inspections";
import { AdminSimDataManagement } from "./admin/utilities/sim-data-management";
import { AdminManageMeters } from "./admin/utilities/manage-meters";
import { AdminManageTransactions } from "./admin/utilities/manage-transactions";
import { AdminManagePropertyGroup } from "./admin/utilities/manage-property-group";
import { AdminManageVendingHistory } from "./admin/utilities/manage-vending-history";
import { AdminAnalysis } from "./admin/utilities/analysis";
import { AdminUtilitiesSettings } from "./admin/utilities/settings";
import ViewMeterDetails from "./admin/utilities/manage-meters/ViewMeterDetails";
import EditCreateMeter from "./admin/utilities/manage-meters/EditCreateMeter";
import { ViewPropertiesGroups } from "./admin/utilities/view-properties-groups";
import { AddEditGroup } from "./admin/utilities/add-edit-group";
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
  Message,
  // Tenant,
  TenantDashboard,
  TenantProfile,
  TenantMaintenance,
  TenantRentPayment,
  TenantLeaseAgreement,
  TenantNotifications,
  TenantSupport,
  TenantSettings,
  TenantHome,
  // TenantChat,
  TenantWallet,
  TenantAssignedProp,
  TenantSendMoney,
  TenantAddBeneficiary,
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
  // Admin,
  AdminDashboard,
  AdminUserManagement,
  AdminPropertyManagement,
  AdminFinancialReports,
  AdminSystemSettings,
  AdminAnalytics,
  AdminAuditLogs,
  AdminBackupRestore,
  AdminCommuication,
  AdminPropertyDetails,
  AdminAddProperty,
  AdminManageCalendar,
  AdminAssignProperties,
  AdminGenerateWorkRequests,
  AdminCreateVisitorRequests,
  AdminManageBookings,
  AdminBookingDetails,
  AdminFacilityManagement,
  AdminVisitorManagement,
  AdminTenants,
  AdminCommunityArea,
  AdminVisitorRequests,
  AdminVisitorsList,
  AdminRevokedInvitations,
  AdminAccessAlerts,
  AdminPanicAlerts,
  AdminTenantDetails,
  AdminFMViewDetails,
  AdminFMEdit,
  AdminFMGenerateWorkOrder,
  AdminFMViewWorkOrder,
  AdminFMOrderView,
  AdminFMOrderUpdate,
  AdminFMOrderExport,
  AdminAmenityView,
  AdminAmenityEdit,
  AdminAmenityMakeReservation,
  AdminAmenityManageCalendar,
  AdminReservationView,
  AdminAddNewAmenity,
  AdminEmergency,
  Profile,
  Verify,
  AdminVisitorDetails,
  AdminGenerateVisitorRequest,
  EditProfile,
  ProfileSettings,
  AdminPanicEmergency,
  AdminPropertyRequests,
  AdminManageInspections,
  AdminSimDataManagement,
  AdminManageMeters,
  AdminManageTransactions,
  AdminManagePropertyGroup,
  ViewPropertiesGroups,
  AdminManageVendingHistory,
  AdminAnalysis,
  AdminUtilitiesSettings,
  ViewMeterDetails,
  EditCreateMeter,
  AddEditGroup,
};
