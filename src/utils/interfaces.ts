// IUser;

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IStocks } from "./data";
export type AppStackParamList = {
  GettingStart: undefined;
  Splash: undefined;
  Login: undefined;
  Intro: undefined;
  CreateAccount: undefined;
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
