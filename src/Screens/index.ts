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

import { TenantMaintenance } from "./tenant/maintenance";
import { RentPayment } from "./tenant/rent-payment";
import { TenantNotifications } from "./tenant/notifications";
import { TenantHome } from "./tenant/home";
import { TenantAssignedProp } from "./tenant/assignemd-properties";
import TenantViewRequests from './tenant/assignemd-properties/view-requests';
import { TenantNewRequests } from "./tenant/assignemd-properties/new-requests";

import { Agent } from "./agent";
import { AgentDashboard } from "./agent/dashboard";
import { AgentPropertyListings } from "./agent/property-listings";
import { AgentClientManagement } from "./agent/client-management";
import { AgentScheduleViewing } from "./agent/schedule-viewing";
import { AgentLeadManagement } from "./agent/lead-management";
import { AgentCommissionReports } from "./agent/commission-reports";
import { AgentMarketingTools } from "./agent/marketing-tools";
import { AgentDocumentManagement } from "./agent/document-management";
import { AgentAssignedProp } from "./agent/assigned-properties";
import { AgentHome } from "./agent/home";

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
import { AddTeamMember } from "./facility-manager/team/add-team";
import { SelectPropGroup } from "./facility-manager/team/select-prop-group";
import { ViewTeam } from "./facility-manager/team/view-team";

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
import { Message } from "./global/chat/messages";
import { AdminDashboard } from "./admin/dashboard";
import { AdminUtilitiesDashboard } from "./admin/dashboard/utilities-dashboard";


import { AdminUserManagement } from "./admin/user-management";
import { AdminPropertyManagement } from "./admin/property-management";
import { FinancialReports } from "./admin/financial-reports";
import { AdminSystemSettings } from "./admin/system-settings";

import { AdminAnalytics } from "./admin/analytics";
import { AdminAuditLogs } from "./admin/audit-logs";
import { AdminBackupRestore } from "./admin/backup-restore";
import { Commuication } from "./admin/support-tickets";
import { TicketDetials } from "./admin/support-tickets/ticket-detials";

import { PropertyDetails } from "./admin/property-details";
import { AdminAddProperty } from "./admin/add-property";
import { AdminManageCalendar } from "./admin/manage-calendar";
import { AdminAssignProperties } from "./admin/assign-properties";
import { AdminGenerateWorkRequests } from "./admin/generate-work-requests";
import { AdminCreateVisitorRequests } from "./admin/create-visitor-requests";
import { AdminManageBookings } from "./admin/manage-bookings";
import { FacilityManagement } from "./admin/facility-management";
import { AdminBookingDetails } from "./admin/manage-bookings/details";
import { AdminVisitorManagement } from "./admin/visitor-management";
import { Tenants } from "./admin/tenants";
import { TenantsRequests } from "./admin/tenants/tenent-requests";
import AdminAddEditCharges  from "./admin/utilities/manage-charges/AddEditCharges";
import { CommunityArea } from "./admin/community-area";
import { VisitorRequests } from "./admin/visitor-management/visitor-requests";
import { AdminVisitorsList } from "./admin/visitor-management/visitors-list";
import { RevokedInvitations } from "./admin/visitor-management/revoked-invitations";
import { AdminAccessAlerts } from "./admin/visitor-management/access-alerts";
import { AdminPanicAlerts } from "./admin/visitor-management/panic-alerts";
import { TenantDetails } from "./admin/tenants/tenant-details";
import { FMViewDetails } from "./admin/facility-management/view-details";
import { FMEdit } from "./admin/facility-management/edit";
import { FMGenerateWorkOrder } from "./admin/facility-management/generate-work-order";
import { FMViewWorkOrder } from "./admin/facility-management/view-work-order";
import { FMOrderView } from "./admin/facility-management/order-view";
import { FMOrderUpdate } from "./admin/facility-management/order-update";
import { FMOrderExport } from "./admin/facility-management/order-export";
import { AdminAmenityView } from "./admin/community-area/amenity-view";
import { AdminAmenityEdit } from "./admin/community-area/amenity-edit";
import { AdminAmenityMakeReservation } from "./admin/community-area/amenity-make-reservation";
import { AdminAmenityManageCalendar } from "./admin/community-area/amenity-manage-calendar";
import { AdminReservationView } from "./admin/community-area/reservation-view";
import { AdminAddNewAmenity } from "./admin/community-area/add-new-amenity";
import { Emergency } from "./admin/emergency";
import { AdminProfile } from "./admin/profile";
import { AdminVisitorDetails } from "./admin/visitor-management/visitor-details";
import { AdminGenerateVisitorRequest } from "./admin/visitor-management/generate-visitor-request";
import { AdminEditProfile } from "./admin/profile/edit-profile";
import { AdminProfileSettings } from "./admin/profile/profile-settings";
import { AdminSignAgreement } from "./admin/sign-agreement";
import { PanicEmergency } from "./admin/emergency/panic";
import { AdminPropertyRequests } from "./admin/property-requests";
import { AdminManageInspections } from "./admin/manage-inspections";
import { AdminSimDataManagement } from "./admin/utilities/sim-data-management";
import { ManageMeters } from "./admin/utilities/manage-meters";
import { ManageTransactions } from "./admin/utilities/manage-transactions";
import { AdminManagePropertyGroup } from "./admin/utilities/manage-property-group";
import { AdminManageVendingHistory } from "./admin/utilities/manage-vending-history";
import { Analysis } from "./admin/utilities/analysis";
import { AdminUtilitiesSettings } from "./admin/utilities/settings";
import ViewMeterDetails from "./admin/utilities/manage-meters/ViewMeterDetails";
import EditCreateMeter from "./admin/utilities/manage-meters/EditCreateMeter";
import { ViewPropertiesGroups } from "./admin/utilities/view-properties-groups";
import { AddGroup } from "./admin/utilities/add-group";
import { EditGroup } from "./admin/utilities/edit-group"; 
import { SendMoney } from "./tenant/sendmoney";
import { AddBeneficiary } from "./tenant/addbeneficiary";
import { Profile } from "./global/profile";
import { Verify } from "./global/profile/verify";
import { EditProfile } from "./global/profile/edit-profile";
import { ProfileSettings } from "./global/profile/profile-settings";
import { MessageHistory } from "./global/message-history";
import { Reviews } from "./global/profile/reviews";
import { Subscription } from "./global/profile/subscription";
import { SelectSubscriptionplans } from "./global/profile/components/SelectSubscriptionplans";
import { AdminUtilitiesCharges } from "./admin/utilities/manage-charges";
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
  MessageHistory,
  Message,
  // Tenant,
  TenantMaintenance,
  RentPayment,
  TenantNotifications,
  TenantHome,
  TenantAssignedProp,
  TenantViewRequests,
  TenantNewRequests,
  Agent,
  AgentHome,
  AgentDashboard,
  AgentPropertyListings,
  AgentClientManagement,
  AgentScheduleViewing,
  AgentLeadManagement,
  AgentCommissionReports,
  AgentMarketingTools,
  AgentDocumentManagement,
  AgentSettings,
  AgentAssignedProp,
  FacilityManager,
  AddTeamMember,
  SelectPropGroup,
  ViewTeam,
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
  AdminUtilitiesDashboard,
  AdminUserManagement,
  AdminPropertyManagement,
  FinancialReports,
  AdminSystemSettings,
  AdminAnalytics,
  AdminAuditLogs,
  AdminBackupRestore,
  Commuication,
  PropertyDetails,
  AdminAddProperty,
  AdminManageCalendar,
  AdminAssignProperties,
  AdminGenerateWorkRequests,
  AdminCreateVisitorRequests,
  AdminManageBookings,
  AdminBookingDetails,
  AdminSignAgreement,
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
  TenantDetails,
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
  AdminAmenityManageCalendar,
  AdminReservationView,
  AdminAddNewAmenity,
  Emergency,
  AdminProfile,
  AdminVisitorDetails,
  AdminGenerateVisitorRequest,
  AdminEditProfile,
  AdminProfileSettings,
  PanicEmergency,
  AdminPropertyRequests,
  AdminUtilitiesCharges,
  AdminAddEditCharges,
  AdminManageInspections,
  AdminSimDataManagement,
  ManageMeters,
  ManageTransactions,
  AdminManagePropertyGroup,
  ViewPropertiesGroups,
  AdminManageVendingHistory,
  Analysis,
  AdminUtilitiesSettings,
  ViewMeterDetails,
  EditCreateMeter,
  AddGroup,
  EditGroup,
  SendMoney,
  AddBeneficiary,
  Profile,
  Verify,
  EditProfile,
  ProfileSettings,
  Reviews,
  Subscription,
  SelectSubscriptionplans
};
