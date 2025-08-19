import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';

interface NotificationCardProps {
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead?: boolean;
  onPress?: () => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  message,
  time,
  type,
  isRead = false,
  onPress,
}) => {
  const getIconAndColor = () => {
    switch (type) {
      case 'success':
        return { icon: 'checkmark-circle' as const, color: '#4CAF50' };
      case 'warning':
        return { icon: 'warning' as const, color: '#FF9800' };
      case 'error':
        return { icon: 'close-circle' as const, color: '#F44336' };
      default:
        return { icon: 'information-circle' as const, color: colors.primary };
    }
  };

  const { icon, color } = getIconAndColor();

  return (
    <TouchableOpacity 
      style={[styles.container, !isRead && styles.unread]} 
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.title, !isRead && styles.unreadText]}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      
      {!isRead && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  unread: {
    backgroundColor: '#F8F9FF',
  },
  iconContainer: {
    marginRight: 12,
    paddingTop: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  unreadText: {
    fontWeight: '600',
  },
  message: {
    fontSize: 14,
    color: colors.textDim,
    marginBottom: 8,
    lineHeight: 20,
  },
  time: {
    fontSize: 12,
    color: colors.textDim,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginTop: 8,
  },
});
