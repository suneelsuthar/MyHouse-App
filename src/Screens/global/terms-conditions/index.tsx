import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Screen, Text, Button } from '../../../Components';
import { AppStackScreenProps } from '../../../utils/interfaces';
import { colors, spacing } from '../../../theme';
import { useNavigation } from '@react-navigation/native';

interface TermsConditionsScreenProps extends AppStackScreenProps<'TermsConditions'> {}

export function TermsConditionsScreen(props: TermsConditionsScreenProps) {
  const navigation = useNavigation();

  return (
    <Screen preset="scroll" contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text preset="heading" text="Terms & Conditions" style={styles.title} />
        <Text preset="subheading" text="Last updated: January 2024" style={styles.subtitle} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.section}>
          <Text preset="bold" text="1. Acceptance of Terms" style={styles.sectionTitle} />
          <Text text="By accessing and using this application, you accept and agree to be bound by the terms and provision of this agreement." style={styles.sectionText} />
        </View>

        <View style={styles.section}>
          <Text preset="bold" text="2. Use License" style={styles.sectionTitle} />
          <Text text="Permission is granted to temporarily download one copy of the materials on MyHomes App for personal, non-commercial transitory viewing only." style={styles.sectionText} />
        </View>

        <View style={styles.section}>
          <Text preset="bold" text="3. Disclaimer" style={styles.sectionTitle} />
          <Text text="The materials on MyHomes App are provided on an 'as is' basis. MyHomes makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights." style={styles.sectionText} />
        </View>

        <View style={styles.section}>
          <Text preset="bold" text="4. Privacy Policy" style={styles.sectionTitle} />
          <Text text="Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service." style={styles.sectionText} />
        </View>

        <View style={styles.section}>
          <Text preset="bold" text="5. Property Listings" style={styles.sectionTitle} />
          <Text text="All property information is provided by third parties and MyHomes does not guarantee the accuracy, completeness, or reliability of such information." style={styles.sectionText} />
        </View>

        <View style={styles.section}>
          <Text preset="bold" text="6. User Responsibilities" style={styles.sectionTitle} />
          <Text text="Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account." style={styles.sectionText} />
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
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    color: colors.text,
    marginBottom: spacing.sm,
  },
  sectionText: {
    color: colors.textDim,
    lineHeight: 22,
  },
  footer: {
    paddingVertical: spacing.md,
  },
  backButton: {
    backgroundColor: colors.primary,
  },
});
