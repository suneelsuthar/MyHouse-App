import { RootState } from './index';
import { createSelector } from '@reduxjs/toolkit';

// Auth selectors
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUserRole = (state: RootState) => state.auth.user?.role;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthToken = (state: RootState) => state.auth.token;

// App selectors
export const selectApp = (state: RootState) => state.app;
export const selectIsFirstLaunch = (state: RootState) => state.app.isFirstLaunch;
export const selectTheme = (state: RootState) => state.app.theme;
export const selectLanguage = (state: RootState) => state.app.language;
export const selectNotificationSettings = (state: RootState) => state.app.notifications;

// Memoized selectors
export const selectUserInfo = createSelector(
  [selectUser],
  (user) => user ? {
    fullName: `${user.firstname || ''} ${user.lastname || ''}`.trim(),
    initials: `${user.firstname?.[0] || ''}${user.lastname?.[0] || ''}`,
    isVerified: user.email_verified || false,
    hasActiveSubscription: user.subscription_status === 'active',
  } : null
);

export const selectNavigationState = createSelector(
  [selectIsAuthenticated, selectUserRole, selectIsFirstLaunch],
  (isAuthenticated, userRole, isFirstLaunch) => ({
    isAuthenticated,
    userRole,
    isFirstLaunch,
    shouldShowAuth: !isAuthenticated,
    shouldShowOnboarding: isFirstLaunch && !isAuthenticated,
  })
);
