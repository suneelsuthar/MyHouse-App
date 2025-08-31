export type TenantUtilitiesStackParamList = {
  TenantUtilitiesSummary: undefined;
  TenantUtilitiesMyMeter: undefined;
  TenantUtilitiesCharges: undefined;
  TenantUtilitiesTransactions: undefined;
  TenantUtilitiesVendingHistory: undefined;
  TenantUtilitiesReportIssue: undefined;
  TenantUtilitiesUpdateProfile: undefined;
};

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
  TenantAssignedProp: undefined;
  TenantFacilityManagement: { status?: string }; // Add this line
  // Tenant Utilities Screens
  TenantUtilitiesSummary: undefined;
  TenantUtilitiesMyMeter: undefined;
  TenantUtilitiesCharges: undefined;
  TenantUtilitiesTransactions: undefined;
  TenantUtilitiesVendingHistory: undefined;
  TenantUtilitiesReportIssue: undefined;
  TenantUtilitiesUpdateProfile: undefined;
};

export type AdminStackParamList = {
  AdminPropertyDetails: {
    propertyId: string;
  };
  InspectionDetails: {
    inspectionId: string;
  };
  MeterDetail: {
    mode: "view" | "edit" | "add";
    meterData?: {
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
    onSave?: (data: any) => void;
  };
  // Add other screens and their params here as needed
};
