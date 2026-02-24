import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme';

interface MaintenanceRequest {
  id: string;
  title: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'submitted' | 'in_progress' | 'completed' | 'cancelled';
  description: string;
  dateSubmitted: string;
  estimatedCompletion?: string;
}

export const TenantMaintenance = () => {
  const [activeTab, setActiveTab] = useState<'new' | 'existing'>('existing');
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    description: '',
  });

  const [requests] = useState<MaintenanceRequest[]>([
    {
      id: '1',
      title: 'Leaky Faucet in Kitchen',
      category: 'Plumbing',
      priority: 'medium',
      status: 'in_progress',
      description: 'Kitchen sink faucet has been dripping constantly',
      dateSubmitted: '2024-01-15',
      estimatedCompletion: '2024-01-18',
    },
    {
      id: '2',
      title: 'Air Conditioning Not Working',
      category: 'HVAC',
      priority: 'high',
      status: 'submitted',
      description: 'AC unit not cooling properly, very warm in apartment',
      dateSubmitted: '2024-01-10',
    },
    {
      id: '3',
      title: 'Broken Light Fixture',
      category: 'Electrical',
      priority: 'low',
      status: 'completed',
      description: 'Bathroom light fixture needs replacement',
      dateSubmitted: '2024-01-05',
    },
  ]);

  const categories = [
    'Plumbing', 'Electrical', 'HVAC', 'Appliances', 'Flooring', 'Windows/Doors', 'Other'
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#F44336';
      case 'high': return '#FF9800';
      case 'medium': return '#2196F3';
      case 'low': return '#4CAF50';
      default: return colors.textDim;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'in_progress': return '#2196F3';
      case 'submitted': return '#FF9800';
      case 'cancelled': return '#F44336';
      default: return colors.textDim;
    }
  };

  const handleSubmitRequest = () => {
    if (!formData.title || !formData.category || !formData.description) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    Alert.alert('Success', 'Maintenance request submitted successfully!');
    setFormData({ title: '', category: '', priority: 'medium', description: '' });
    setActiveTab('existing');
  };

  const renderNewRequestForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Submit New Request</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Title *</Text>
        <TextInput
          style={styles.input}
          value={formData.title}
          onChangeText={(text) => setFormData({ ...formData, title: text })}
          placeholder="Brief description of the issue"
          placeholderTextColor={colors.textDim}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Category *</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                formData.category === category && styles.categoryChipSelected
              ]}
              onPress={() => setFormData({ ...formData, category })}
            >
              <Text style={[
                styles.categoryText,
                formData.category === category && styles.categoryTextSelected
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Priority</Text>
        <View style={styles.priorityContainer}>
          {['low', 'medium', 'high', 'urgent'].map((priority) => (
            <TouchableOpacity
              key={priority}
              style={[
                styles.priorityButton,
                formData.priority === priority && { backgroundColor: getPriorityColor(priority) }
              ]}
              onPress={() => setFormData({ ...formData, priority: priority as any })}
            >
              <Text style={[
                styles.priorityText,
                formData.priority === priority && styles.priorityTextSelected
              ]}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          placeholder="Detailed description of the maintenance issue"
          placeholderTextColor={colors.textDim}
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitRequest}>
        <Text style={styles.submitButtonText}>Submit Request</Text>
      </TouchableOpacity>
    </View>
  );

  const renderExistingRequests = () => (
    <View style={styles.requestsList}>
      <Text style={styles.sectionTitle}>Your Requests</Text>
      {requests.map((request) => (
        <View key={request.id} style={styles.requestCard}>
          <View style={styles.requestHeader}>
            <Text style={styles.requestTitle}>{request.title}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(request.status) }]}>
              <Text style={styles.statusText}>{request.status.replace('_', ' ')}</Text>
            </View>
          </View>
          
          <View style={styles.requestMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="folder-outline" size={14} color={colors.textDim} />
              <Text style={styles.metaText}>{request.category}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="flag-outline" size={14} color={getPriorityColor(request.priority)} />
              <Text style={[styles.metaText, { color: getPriorityColor(request.priority) }]}>
                {request.priority}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={14} color={colors.textDim} />
              <Text style={styles.metaText}>
                {new Date(request.dateSubmitted).toLocaleDateString()}
              </Text>
            </View>
          </View>
          
          <Text style={styles.requestDescription}>{request.description}</Text>
          
          {request.estimatedCompletion && (
            <View style={styles.estimatedCompletion}>
              <Ionicons name="time-outline" size={14} color={colors.primary} />
              <Text style={styles.estimatedText}>
                Est. completion: {new Date(request.estimatedCompletion).toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Maintenance</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Ionicons name="help-circle-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'existing' && styles.activeTab]}
          onPress={() => setActiveTab('existing')}
        >
          <Text style={[styles.tabText, activeTab === 'existing' && styles.activeTabText]}>
            My Requests
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'new' && styles.activeTab]}
          onPress={() => setActiveTab('new')}
        >
          <Text style={[styles.tabText, activeTab === 'new' && styles.activeTabText]}>
            New Request
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'new' ? renderNewRequestForm() : renderExistingRequests()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  helpButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.fill,
    margin: 16,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textDim,
  },
  activeTabText: {
    color: colors.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  formContainer: {
    paddingBottom: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.text,
    backgroundColor: colors.white,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoryScroll: {
    marginTop: 4,
  },
  categoryChip: {
    backgroundColor: colors.fill,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  categoryChipSelected: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: colors.white,
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.fill,
    alignItems: 'center',
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
  },
  priorityTextSelected: {
    color: colors.white,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  requestsList: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  requestCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.white,
    textTransform: 'capitalize',
  },
  requestMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: colors.textDim,
    textTransform: 'capitalize',
  },
  requestDescription: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 8,
  },
  estimatedCompletion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  estimatedText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
});
