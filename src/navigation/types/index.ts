import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  Splash: undefined;
};\n
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  VerifyOTP: { email: string };
};

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  PropertiesTab: NavigatorScreenParams<PropertiesStackParamList>;
  TenantsTab: NavigatorScreenParams<TenantsStackParamList>;
  MaintenanceTab: NavigatorScreenParams<MaintenanceStackParamList>;
  MoreTab: NavigatorScreenParams<MoreStackParamList>;
};

export type HomeStackParamList = {
  Dashboard: undefined;
  Notifications: undefined;
  Profile: undefined;
};

export type PropertiesStackParamList = {
  PropertyList: undefined;
  PropertyDetails: { propertyId: string };
  AddProperty: undefined;
  EditProperty: { propertyId: string };
};

export type TenantsStackParamList = {
  TenantList: undefined;
  TenantDetails: { tenantId: string };
  AddTenant: undefined;
  EditTenant: { tenantId: string };
};

export type MaintenanceStackParamList = {
  MaintenanceList: undefined;
  MaintenanceDetails: { requestId: string };
  CreateRequest: undefined;
  VendorList: undefined;
};

export type MoreStackParamList = {
  Settings: undefined;
  Support: undefined;
  About: undefined;
  Logout: undefined;
};

// User role types
export type UserRole = 'admin' | 'tenant' | 'agent' | 'facility_manager' | 'landlord' | 'sub_landlord' | 'security';

// Screen groups based on roles
export type ScreenGroup = {
  [key in UserRole]: {
    tabs: (keyof MainTabParamList)[];
    screens: {
      [key in keyof MainTabParamList]?: string[];
    };
  };
};

// Define which tabs and screens are visible for each role
export const SCREEN_GROUPS: ScreenGroup = {
  admin: {
    tabs: ['HomeTab', 'PropertiesTab', 'TenantsTab', 'MaintenanceTab', 'MoreTab'],
    screens: {
      HomeTab: ['Dashboard', 'Notifications', 'Profile'],
      PropertiesTab: ['PropertyList', 'PropertyDetails', 'AddProperty', 'EditProperty'],
      TenantsTab: ['TenantList', 'TenantDetails', 'AddTenant', 'EditTenant'],
      MaintenanceTab: ['MaintenanceList', 'MaintenanceDetails', 'CreateRequest', 'VendorList'],
      MoreTab: ['Settings', 'Support', 'About', 'Logout']
    }
  },
  tenant: {
    tabs: ['HomeTab', 'MaintenanceTab', 'MoreTab'],
    screens: {
      HomeTab: ['Dashboard', 'Notifications', 'Profile'],
      MaintenanceTab: ['MaintenanceList', 'MaintenanceDetails', 'CreateRequest'],
      MoreTab: ['Settings', 'Support', 'About', 'Logout']
    }
  },
  agent: {
    tabs: ['HomeTab', 'PropertiesTab', 'MoreTab'],
    screens: {
      HomeTab: ['Dashboard', 'Notifications', 'Profile'],
      PropertiesTab: ['PropertyList', 'PropertyDetails'],
      MoreTab: ['Settings', 'Support', 'About', 'Logout']
    }
  },
  facility_manager: {
    tabs: ['HomeTab', 'MaintenanceTab', 'MoreTab'],
    screens: {
      HomeTab: ['Dashboard', 'Notifications'],
      MaintenanceTab: ['MaintenanceList', 'MaintenanceDetails', 'VendorList'],
      MoreTab: ['Settings', 'Support', 'About', 'Logout']
    }
  },
  landlord: {
    tabs: ['HomeTab', 'PropertiesTab', 'TenantsTab', 'MoreTab'],
    screens: {
      HomeTab: ['Dashboard', 'Notifications'],
      PropertiesTab: ['PropertyList', 'PropertyDetails'],
      TenantsTab: ['TenantList', 'TenantDetails'],
      MoreTab: ['Settings', 'Support', 'About', 'Logout']
    }
  },
  sub_landlord: {
    tabs: ['HomeTab', 'PropertiesTab', 'TenantsTab', 'MoreTab'],
    screens: {
      HomeTab: ['Dashboard', 'Notifications'],
      PropertiesTab: ['PropertyList', 'PropertyDetails'],
      TenantsTab: ['TenantList', 'TenantDetails'],
      MoreTab: ['Settings', 'Support', 'About', 'Logout']
    }
  },
  security: {
    tabs: ['HomeTab', 'MaintenanceTab', 'MoreTab'],
    screens: {
      HomeTab: ['Dashboard', 'Notifications'],
      MaintenanceTab: ['MaintenanceList', 'MaintenanceDetails'],
      MoreTab: ['Settings', 'Support', 'About', 'Logout']
    }
  }
};
