import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme';
import { TransactionCard } from '../../../Components/tenant/TransactionCard';

interface Transaction {
  id: string;
  type: 'rent' | 'deposit' | 'refund' | 'fee';
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
}

export const TenantWallet = () => {
  const [balance] = useState(2450.00);
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'rent',
      amount: -1200.00,
      date: '2024-01-01',
      status: 'completed',
      description: 'Monthly Rent - January',
    },
    {
      id: '2',
      type: 'deposit',
      amount: 500.00,
      date: '2023-12-28',
      status: 'completed',
      description: 'Security Deposit Refund',
    },
    {
      id: '3',
      type: 'fee',
      amount: -25.00,
      date: '2023-12-15',
      status: 'completed',
      description: 'Late Payment Fee',
    },
    {
      id: '4',
      type: 'rent',
      amount: -1200.00,
      date: '2023-12-01',
      status: 'completed',
      description: 'Monthly Rent - December',
    },
  ]);


  const renderTransaction = (transaction: Transaction) => (
    <TransactionCard
      key={transaction.id}
      type={transaction.type}
      amount={transaction.amount}
      date={transaction.date}
      description={transaction.description}
      status={transaction.status}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Wallet</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="settings-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
          <View style={styles.balanceActions}>
            <TouchableOpacity style={styles.balanceButton}>
              <Ionicons name="add-circle-outline" size={20} color={colors.white} />
              <Text style={styles.balanceButtonText}>Add Money</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.balanceButton, styles.secondaryButton]}>
              <Ionicons name="send-outline" size={20} color={colors.primary} />
              <Text style={[styles.balanceButtonText, styles.secondaryButtonText]}>Pay Rent</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="card-outline" size={24} color={colors.primary} />
              <Text style={styles.actionText}>Pay Rent</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="receipt-outline" size={24} color={colors.primary} />
              <Text style={styles.actionText}>View Bills</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="time-outline" size={24} color={colors.primary} />
              <Text style={styles.actionText}>Payment History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="document-text-outline" size={24} color={colors.primary} />
              <Text style={styles.actionText}>Statements</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.transactionsList}>
            {transactions.map(renderTransaction)}
          </View>
        </View>

        {/* Upcoming Payments */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Payments</Text>
          <View style={styles.upcomingCard}>
            <View style={styles.upcomingItem}>
              <Ionicons name="calendar-outline" size={20} color="#FF9800" />
              <View style={styles.upcomingDetails}>
                <Text style={styles.upcomingText}>Rent Payment Due</Text>
                <Text style={styles.upcomingDate}>February 1, 2024</Text>
              </View>
              <Text style={styles.upcomingAmount}>$1,200.00</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerButton: {
    padding: 8,
  },
  balanceCard: {
    backgroundColor: colors.primary,
    margin: 16,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.8,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 20,
  },
  balanceActions: {
    flexDirection: 'row',
    gap: 12,
  },
  balanceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  secondaryButton: {
    backgroundColor: colors.white,
  },
  balanceButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  secondaryButtonText: {
    color: colors.primary,
  },
  section: {
    margin: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  transactionsList: {
    backgroundColor: 'transparent',
  },
  upcomingCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
  },
  upcomingItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upcomingDetails: {
    flex: 1,
    marginLeft: 12,
  },
  upcomingText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  upcomingDate: {
    fontSize: 12,
    color: colors.textDim,
  },
  upcomingAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF9800',
  },
});
