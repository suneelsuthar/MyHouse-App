import { NavigatorScreenParams } from '@react-navigation/native';

export type AgentStackParamList = {
  AgentTabs: undefined;
  AgentSettings: undefined;
  // Shared screens
  PropertyDetails: { id: string };
  TenantDetails: { id: string };
  AdminVisitorDetails: { id: string };
  AdminGenerateVisitorRequest: { id?: string };
  Profile: { userId: string };
  EditProfile: { userId: string };
  // Add other shared screens as needed
};

// Export all navigation param types
export type RootStackParamList = AgentStackParamList;

// Declare the global type for React Navigation
declare global {
  namespace ReactNavigation {
    interface RootParamList extends AgentStackParamList {}
  }
}
