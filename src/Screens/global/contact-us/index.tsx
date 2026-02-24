import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Screen, Text, Button, TextField } from '../../../Components';
import { AppStackScreenProps } from '../../../utils/interfaces';
import { colors, spacing } from '../../../theme';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';

interface ContactUsScreenProps extends AppStackScreenProps<'ContactUs'> {}

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactUsScreen(props: ContactUsScreenProps) {
  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      Toast.show({
        type: 'success',
        text1: 'Message Sent',
        text2: 'We\'ll get back to you within 24 hours!',
      });
      reset();
      setIsSubmitting(false);
    }, 1500);
  };

  const openEmail = () => {
    Linking.openURL('mailto:support@myhomes.com');
  };

  const openPhone = () => {
    Linking.openURL('tel:+15551234567');
  };

  return (
    <Screen preset="scroll" contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text preset="heading" text="Contact Us" style={styles.title} />
        <Text preset="subheading" text="We're here to help you" style={styles.subtitle} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Quick Contact Options */}
        <View style={styles.section}>
          <Text preset="bold" text="Get in Touch" style={styles.sectionTitle} />
          
          <TouchableOpacity style={styles.contactOption} onPress={openEmail}>
            <Ionicons name="mail" size={24} color={colors.primary} />
            <View style={styles.contactInfo}>
              <Text preset="bold" text="Email Support" style={styles.contactTitle} />
              <Text text="support@myhomes.com" style={styles.contactDetail} />
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textDim} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactOption} onPress={openPhone}>
            <Ionicons name="call" size={24} color={colors.primary} />
            <View style={styles.contactInfo}>
              <Text preset="bold" text="Phone Support" style={styles.contactTitle} />
              <Text text="+1 (555) 123-4567" style={styles.contactDetail} />
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textDim} />
          </TouchableOpacity>

          <View style={styles.contactOption}>
            <Ionicons name="time" size={24} color={colors.primary} />
            <View style={styles.contactInfo}>
              <Text preset="bold" text="Business Hours" style={styles.contactTitle} />
              <Text text="Mon-Fri: 9AM-6PM EST" style={styles.contactDetail} />
            </View>
          </View>
        </View>

        {/* Contact Form */}
        <View style={styles.section}>
          <Text preset="bold" text="Send us a Message" style={styles.sectionTitle} />
          
          <Controller
            control={control}
            name="name"
            rules={{ required: 'Name is required' }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Full Name"
                value={value}
                onChangeText={onChange}
                placeholder="Enter your full name"
                style={styles.textField}
                status={errors.name ? 'error' : undefined}
                helper={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{ 
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address'
              }
            }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Email Address"
                value={value}
                onChangeText={onChange}
                placeholder="Enter your email"
                keyboardType="email-address"
                style={styles.textField}
                status={errors.email ? 'error' : undefined}
                helper={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="subject"
            rules={{ required: 'Subject is required' }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Subject"
                value={value}
                onChangeText={onChange}
                placeholder="What's this about?"
                style={styles.textField}
                status={errors.subject ? 'error' : undefined}
                helper={errors.subject?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="message"
            rules={{ required: 'Message is required' }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Message"
                value={value}
                onChangeText={onChange}
                placeholder="Tell us how we can help..."
                multiline
                numberOfLines={4}
                style={[styles.textField, styles.messageField]}
                status={errors.message ? 'error' : undefined}
                helper={errors.message?.message}
              />
            )}
          />

          <Button
            text={isSubmitting ? "Sending..." : "Send Message"}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            style={styles.submitButton}
          />
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
    marginBottom: spacing.md,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  contactInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  contactTitle: {
    color: colors.text,
    marginBottom: spacing.xs,
  },
  contactDetail: {
    color: colors.textDim,
  },
  textField: {
    marginBottom: spacing.md,
  },
  messageField: {
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: colors.primary,
    marginTop: spacing.sm,
  },
  footer: {
    paddingVertical: spacing.md,
  },
  backButton: {
    backgroundColor: colors.border,
  },
});
