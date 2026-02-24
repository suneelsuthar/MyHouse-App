import React from 'react';
import { ScrollView, View, StyleSheet, Image } from 'react-native';
import { Screen, Text, Button } from '../../../Components';
import { AppStackScreenProps } from '../../../utils/interfaces';
import { colors, spacing } from '../../../theme';
import { useNavigation } from '@react-navigation/native';

interface AboutUsScreenProps extends AppStackScreenProps<'AboutUs'> {}

export function AboutUsScreen(props: AboutUsScreenProps) {
  const navigation = useNavigation();

  return (
    <Screen preset="scroll" contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text preset="heading" text="About MyHomes" style={styles.title} />
        <Text preset="subheading" text="Your trusted property partner" style={styles.subtitle} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.section}>
          <Text preset="bold" text="Our Mission" style={styles.sectionTitle} />
          <Text text="To revolutionize the property management experience by providing innovative, user-friendly solutions that connect tenants, landlords, agents, and property managers in one seamless platform." style={styles.sectionText} />
        </View>

        <View style={styles.section}>
          <Text preset="bold" text="What We Do" style={styles.sectionTitle} />
          <Text text="MyHomes is a comprehensive property management platform that streamlines rental processes, maintenance requests, payment collection, and communication between all stakeholders in the property ecosystem." style={styles.sectionText} />
        </View>

        <View style={styles.section}>
          <Text preset="bold" text="Our Values" style={styles.sectionTitle} />
          <Text text="• Transparency in all transactions" style={styles.valueText} />
          <Text text="• Exceptional customer service" style={styles.valueText} />
          <Text text="• Innovation in property technology" style={styles.valueText} />
          <Text text="• Building lasting relationships" style={styles.valueText} />
          <Text text="• Commitment to quality" style={styles.valueText} />
        </View>

        <View style={styles.section}>
          <Text preset="bold" text="Why Choose MyHomes?" style={styles.sectionTitle} />
          <Text text="With years of experience in property management and technology, we understand the challenges faced by property owners, tenants, and managers. Our platform is designed to solve real-world problems with practical, efficient solutions." style={styles.sectionText} />
        </View>

        <View style={styles.section}>
          <Text preset="bold" text="Contact Information" style={styles.sectionTitle} />
          <Text text="Email: support@myhomes.com" style={styles.contactText} />
          <Text text="Phone: +1 (555) 123-4567" style={styles.contactText} />
          <Text text="Address: 123 Property Street, City, State 12345" style={styles.contactText} />
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
    marginBottom: spacing.sm,
  },
  valueText: {
    color: colors.textDim,
    lineHeight: 22,
    marginLeft: spacing.sm,
  },
  contactText: {
    color: colors.textDim,
    lineHeight: 22,
    marginBottom: spacing.xs,
  },
  footer: {
    paddingVertical: spacing.md,
  },
  backButton: {
    backgroundColor: colors.primary,
  },
});
