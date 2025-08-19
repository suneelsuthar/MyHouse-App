import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, UserRole } from '../slices/authSlice';

// Mock API service - replace with your actual API calls
interface LoginCredentials {
  email: string;
  password: string;
  role?: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

// Mock login function - replace with actual API call
const mockLogin = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Use selected role if provided, otherwise determine from email
  const getUserRole = (email: string): UserRole => {
    if (email.includes('admin')) return 'admin';
    if (email.includes('agent')) return 'agent';
    if (email.includes('facility')) return 'facility_manager';
    if (email.includes('landlord') && email.includes('sub')) return 'sub_landlord';
    if (email.includes('landlord')) return 'landlord';
    if (email.includes('security')) return 'security';
    return 'tenant'; // default
  };

  const userRole = credentials.role ? credentials.role as UserRole : getUserRole(credentials.email);

  const mockUser: User = {
    id: '1',
    email: credentials.email,
    firstname: 'John',
    lastname: 'Doe',
    role: userRole,
    email_verified: true,
    subscription_status: 'active',
    created_at: new Date().toISOString(),
  };

  return {
    user: mockUser,
    token: 'mock-jwt-token-' + Date.now(),
  };
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await mockLogin(credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      // Add any logout API calls here
      // await api.logout();
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: Omit<User, 'id' | 'created_at'> & { password: string }, { rejectWithValue }) => {
    try {
      // Mock registration - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };

      return {
        user: newUser,
        token: 'mock-jwt-token-' + Date.now(),
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      // Mock update - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return userData;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Profile update failed');
    }
  }
);
