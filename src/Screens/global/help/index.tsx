import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Screen, Text, Button } from '../../../Components';
import { AppStackScreenProps } from '../../../utils/interfaces';
import { colors, spacing } from '../../../theme';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface HelpScreenProps extends AppStackScreenProps<'Help'> {}

interface HelpCategory {
  id: number;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  action: () => void;
}

export function HelpScreen(props: HelpScreenProps) {
  const navigation = useNavigation();

  const helpCategories: HelpCategory[] = [
    {
      id: 1,
      title: 'Getting Started',
      description: 'Learn the basics of using MyHomes',
      icon: 'rocket',
      action: () => {
        // Navigate to getting started guide
      }
    },
    {
      id: 2,
      title: 'Account & Profile',
      description: 'Manage your account settings and profile',
      icon: 'person-circle',
      action: () => {
        // Navigate to account help
      }
    },
    {
      id: 3,
      title: 'Property Management',
      description: 'Help with managing properties and listings',
      icon: 'home',
      action: () => {
        // Navigate to property help
      }
    },
    {
      id: 4,
      title: 'Payments & Billing',
      description: 'Information about payments and billing',
      icon: 'card',
      action: () => {
        // Navigate to payment help
      }
    },
    {
      id: 5,
      title: 'Maintenance Requests',
      description: 'How to submit and track maintenance requests',
      icon: 'construct',
      action: () => {
        // Navigate to maintenance help
      }
    },
    {
      id: 6,
      title: 'Communication',
      description: 'Using messages and notifications',
      icon: 'chatbubbles',
      action: () => {
        // Navigate to communication help
      }
    },
    {
      id: 7,
      title: 'Troubleshooting',
      description: 'Common issues and solutions',
      icon: 'bug',
      action: () => {
        // Navigate to troubleshooting
      }
    },
    {
      id: 8,
      title: 'Contact Support',
      description: 'Get in touch with our support team',
      icon: 'headset',
      action: () => {
        navigation.navigate('ContactUs' as never);
      }
    }
  ];

  return (
    <Screen preset="scroll" contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text preset="heading" text="Help Center" style={styles.title} />
        <Text preset="subheading" text="Find answers and get support" style={styles.subtitle} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.searchContainer}>
          <Text text="What can we help you with?" style={styles.searchLabel} />
        </View>

        <View style={styles.categoriesContainer}>
          {helpCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={category.action}
            >
              <View style={styles.categoryIcon}>
                <Ionicons
                  name={category.icon}
                  size={24}
                  color={colors.primary}
                />
              </View>
              <View style={styles.categoryContent}>
                <Text preset="bold" text={category.title} style={styles.categoryTitle} />
                <Text text={category.description} style={styles.categoryDescription} />
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textDim}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quickLinks}>
          <Text preset="bold" text="Quick Links" style={styles.sectionTitle} />
          
          <TouchableOpacity
            style={styles.quickLink}
            onPress={() => navigation.navigate('FAQ' as never)}
          >
            <Ionicons name="help-circle" size={20} color={colors.primary} />
            <Text text="Frequently Asked Questions" style={styles.quickLinkText} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickLink}
            onPress={() => navigation.navigate('TermsConditions' as never)}
          >
            <Ionicons name="document-text" size={20} color={colors.primary} />
            <Text text="Terms & Conditions" style={styles.quickLinkText} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickLink}
            onPress={() => navigation.navigate('AboutUs' as never)}
          >
            <Ionicons name="information-circle" size={20} color={colors.primary} />
            <Text text="About MyHomes" style={styles.quickLinkText} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
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
  searchContainer: {
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  searchLabel: {
    color: colors.textDim,
    fontSize: 16,
  },
  categoriesContainer: {
    marginBottom: spacing.lg,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.palette.neutral100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    color: colors.text,
    marginBottom: spacing.xs,
  },
  categoryDescription: {
    color: colors.textDim,
    fontSize: 14,
  },
  quickLinks: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    color: colors.text,
    marginBottom: spacing.md,
  },
  quickLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    marginBottom: spacing.xs,
  },
  quickLinkText: {
    color: colors.text,
    marginLeft: spacing.sm,
  },
  footer: {
    paddingVertical: spacing.md,
  },
  backButton: {
    backgroundColor: colors.border,
  },
});
