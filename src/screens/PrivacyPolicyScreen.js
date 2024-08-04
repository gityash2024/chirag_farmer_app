import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { typography } from '../styles/Typography';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={[styles.backButtonText, typography['sans-medium']]}>← Back</Text>
      </TouchableOpacity>
      <Text style={[styles.title, typography['sans-bold']]}>Privacy Policy</Text>
      <ScrollView style={styles.content}>
        <Text style={[styles.paragraph, typography['sans-regular']]}>
          Chirag App is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.
        </Text>
        <Text style={[styles.sectionTitle, typography['sans-medium']]}>1. Information We Collect</Text>
        <Text style={[styles.paragraph, typography['sans-regular']]}>
          We collect information you provide directly to us, such as your name, contact information, and farm details when you register for an account or use our services.
        </Text>
        <Text style={[styles.sectionTitle, typography['sans-medium']]}>2. How We Use Your Information</Text>
        <Text style={[styles.paragraph, typography['sans-regular']]}>
          We use the information we collect to provide, maintain, and improve our services, to process your requests, and to send you updates and other information related to the app.
        </Text>
        <Text style={[styles.sectionTitle, typography['sans-medium']]}>3. Data Security</Text>
        <Text style={[styles.paragraph, typography['sans-regular']]}>
          We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing and against accidental loss, destruction, or damage.
        </Text>
        <Text style={[styles.sectionTitle, typography['sans-medium']]}>4. Sharing of Information</Text>
        <Text style={[styles.paragraph, typography['sans-regular']]}>
          We do not sell or rent your personal information to third parties. We may share your information with service providers who assist us in providing our services.
        </Text>
        <Text style={[styles.sectionTitle, typography['sans-medium']]}>5. Your Rights</Text>
        <Text style={[styles.paragraph, typography['sans-regular']]}>
          You have the right to access, correct, or delete your personal information. You can manage your information through your account settings or by contacting us directly.
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

export default PrivacyPolicyScreen;