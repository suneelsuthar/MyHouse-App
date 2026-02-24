import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';

interface TransactionCardProps {
  type: 'rent' | 'deposit' | 'refund' | 'fee' | 'maintenance';
  amount: number;
  date: string;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  onPress?: () => void;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  type,
  amount,
  date,
  description,
  status,
  onPress,
}) => {
  const getTransactionIcon = () => {
    switch (type) {
      case 'rent':
        return 'home-outline';
      case 'deposit':
        return 'shield-checkmark-outline';
      case 'refund':
        return 'arrow-down-circle-outline';
      case 'fee':
        return 'warning-outline';
      case 'maintenance':
        return 'build-outline';
      default:
        return 'card-outline';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'pending':
        return '#FF9800';
      case 'failed':
        return '#F44336';
      default:
        return colors.textDim;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons 
          name={getTransactionIcon() as any} 
          size={20} 
          color={colors.primary} 
        />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text>
      </View>
      
      <View style={styles.amountContainer}>
        <Text style={[
          styles.amount,
          { color: amount > 0 ? '#4CAF50' : '#F44336' }
        ]}>
          {amount > 0 ? '+' : ''}${Math.abs(amount).toFixed(2)}
        </Text>
        <Text style={[styles.status, { color: getStatusColor() }]}>
          {status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.fill,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  description: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: colors.textDim,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  status: {
    fontSize: 12,
    textTransform: 'capitalize',
  },
});
