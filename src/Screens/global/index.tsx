import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Screen, Text, Button } from '../../Components';
import { AppStackScreenProps } from '../../utils/interfaces';
import { colors, spacing } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface GlobalScreenProps extends AppStackScreenProps<'Global'> {}

export function GlobalScreen(props: GlobalScreenProps) {
  const navigation = useNavigation();

  const globalOptions = [
    {
      title: 'Property Filters',
      description: 'Filter and sort properties',
      icon: 'filter' as keyof typeof Ionicons.glyphMap,
      screen: 'PropertyFilters'
    },
    {
      title: 'Help Center',
      description: 'Get help and support',
      icon: 'help-circle' as keyof typeof Ionicons.glyphMap,
      screen: 'Help'
    },
    {
      title: 'Contact Us',
      description: 'Get in touch with support',
      icon: 'mail' as keyof typeof Ionicons.glyphMap,
      screen: 'ContactUs'
    },
    {
      title: 'FAQ',
      description: 'Frequently asked questions',
      icon: 'chatbubble-ellipses' as keyof typeof Ionicons.glyphMap,
      screen: 'FAQ'
    },
    {
      title: 'About Us',
      description: 'Learn about MyHomes',
      icon: 'information-circle' as keyof typeof Ionicons.glyphMap,
      screen: 'AboutUs'
    },
    {
      title: 'Terms & Conditions',
      description: 'Legal terms and policies',
      icon: 'document-text' as keyof typeof Ionicons.glyphMap,
      screen: 'TermsConditions'
    }
  ];

  return (
    <Screen preset="scroll" contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text preset="heading" text="Global Features" style={styles.title} />
        <Text preset="subheading" text="Common features available to all users" style={styles.subtitle} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {globalOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionCard}
            onPress={() => navigation.navigate(option.screen as never)}
          >
            <View style={styles.optionIcon}>
              <Ionicons
                name={option.icon}
                size={24}
                color={colors.primary}
              />
            </View>
            <View style={styles.optionContent}>
              <Text preset="bold" text={option.title} style={styles.optionTitle} />
              <Text text={option.description} style={styles.optionDescription} />
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textDim}
            />
          </TouchableOpacity>
        ))}
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
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.palette.neutral100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    color: colors.text,
    marginBottom: spacing.xs,
  },
  optionDescription: {
    color: colors.textDim,
    fontSize: 14,
  },
  footer: {
    paddingVertical: spacing.md,
  },
  backButton: {
    backgroundColor: colors.border,
  },
});
