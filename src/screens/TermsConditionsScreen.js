import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { typography } from '../styles/Typography';

const TermsConditionsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={[styles.backButtonText, typography['sans-medium']]}>← Back</Text>
      </TouchableOpacity>
      <Text style={[styles.title, typography['sans-bold']]}>Terms and Conditions</Text>
      <ScrollView style={styles.content}>
        <Text style={[styles.paragraph, typography['sans-regular']]}>
          Welcome to Chirag App. By using our app, you agree to comply with and be bound by the following terms and conditions:
        </Text>
        <Text style={[styles.sectionTitle, typography['sans-medium']]}>1. Acceptance of Terms</Text>
        <Text style={[styles.paragraph, typography['sans-regular']]}>
          By accessing or using the Chirag App, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our app.
        </Text>
        <Text style={[styles.sectionTitle, typography['sans-medium']]}>2. Use of Services</Text>
        <Text style={[styles.paragraph, typography['sans-regular']]}>
          The Chirag App provides drone-based farming services. You agree to use these services only for lawful purposes and in accordance with these Terms and Conditions.
        </Text>
        <Text style={[styles.sectionTitle, typography['sans-medium']]}>3. User Accounts</Text>
        <Text style={[styles.paragraph, typography['sans-regular']]}>
          To use certain features of the app, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
        </Text>
        <Text style={[styles.sectionTitle, typography['sans-medium']]}>4. Privacy Policy</Text>
        <Text style={[styles.paragraph, typography['sans-regular']]}>
          Your use of the Chirag App is also governed by our Privacy Policy, which can be found in the app settings.
        </Text>
        <Text style={[styles.sectionTitle, typography['sans-medium']]}>5. Modifications</Text>
        <Text style={[styles.paragraph, typography['sans-regular']]}>
          We reserve the right to modify or replace these Terms and Conditions at any time. It is your responsibility to check these Terms periodically for changes.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#000000',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000000',
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 10,
    color: '#000000',
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 10,
    color: '#333333',
    lineHeight: 20,
  },
});

export default TermsConditionsScreen;