import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from './Text';
import { colors, spacing } from '../theme';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logoutUser } from '../store/thunks/authThunks';
import { selectUser } from '../store/selectors';
import { Ionicons } from '@expo/vector-icons';

interface LogoutButtonProps {
  style?: any;
  showUserInfo?: boolean;
}

export function LogoutButton({ style, showUserInfo = false }: LogoutButtonProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      {showUserInfo && user && (
        <Text 
          text={`${user.role} | ${user.email}`} 
          style={styles.userInfoText} 
        />
      )}
      <TouchableOpacity 
        style={[styles.logoutBtn, style]}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={20} color={colors.white} />
        <Text text="Logout" style={styles.logoutText} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    gap: spacing.xs,
  },
  logoutText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  userInfoText: {
    color: colors.textDim,
    fontSize: 10,
    textAlign: 'center',
    marginBottom: spacing.xs,
    textTransform: 'capitalize',
  },
});
