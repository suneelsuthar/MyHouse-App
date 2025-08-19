import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Screen, Text, Button } from '../../../Components';
import { AppStackScreenProps } from '../../../utils/interfaces';
import { colors, spacing } from '../../../theme';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface FAQScreenProps extends AppStackScreenProps<'FAQ'> {}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "How do I create an account?",
    answer: "You can create an account by clicking the 'Sign Up' button on the login screen and filling in your details."
  },
  {
    id: 2,
    question: "How do I submit a maintenance request?",
    answer: "Go to the Maintenance section in your dashboard and click 'New Request'. Fill in the details and submit."
  },
  {
    id: 3,
    question: "How can I pay my rent?",
    answer: "Navigate to the Payments section where you can pay rent using credit card, bank transfer, or other available payment methods."
  },
  {
    id: 4,
    question: "How do I contact my landlord?",
    answer: "You can contact your landlord through the Messages section or find their contact information in your lease details."
  },
  {
    id: 5,
    question: "Can I view my lease agreement in the app?",
    answer: "Yes, your lease agreement is available in the Documents section of your tenant dashboard."
  },
  {
    id: 6,
    question: "How do I update my profile information?",
    answer: "Go to Settings > Profile to update your personal information, contact details, and preferences."
  },
  {
    id: 7,
    question: "What should I do if I forgot my password?",
    answer: "Click 'Forgot Password' on the login screen and follow the instructions to reset your password."
  },
  {
    id: 8,
    question: "How do I report an emergency?",
    answer: "For emergencies, use the Emergency Contact feature in the app or call the emergency number provided in your lease."
  }
];

export function FAQScreen(props: FAQScreenProps) {
  const navigation = useNavigation();
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <Screen preset="scroll" contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text preset="heading" text="Frequently Asked Questions" style={styles.title} />
        <Text preset="subheading" text="Find answers to common questions" style={styles.subtitle} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {faqData.map((item) => (
          <View key={item.id} style={styles.faqItem}>
            <TouchableOpacity
              style={styles.questionContainer}
              onPress={() => toggleExpanded(item.id)}
            >
              <Text preset="bold" text={item.question} style={styles.question} />
              <Ionicons
                name={expandedItems.includes(item.id) ? "chevron-up" : "chevron-down"}
                size={20}
                color={colors.primary}
              />
            </TouchableOpacity>
            
            {expandedItems.includes(item.id) && (
              <View style={styles.answerContainer}>
                <Text text={item.answer} style={styles.answer} />
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text text="Still have questions? Contact our support team." style={styles.footerText} />
        <Button
          text="Back"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  header: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  title: {
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textDim,
  },
  content: {
    flex: 1,
  },
  faqItem: {
    marginBottom: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  question: {
    flex: 1,
    color: colors.text,
    marginRight: spacing.sm,
  },
  answerContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  answer: {
    color: colors.textDim,
    lineHeight: 20,
    marginTop: spacing.sm,
  },
  footer: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  footerText: {
    color: colors.textDim,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: colors.primary,
  },
});
