import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import { useTranslation } from "react-i18next";

const TermsConditionsScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const backIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.53125 15.625L3.90625 10L9.53125 4.375M4.6875 10L16.0938 10" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <SvgXml xml={backIcon} width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("Terms and Conditions")}</Text>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.lastUpdated}>{t("Last Updated")}: 01 May 2023</Text>

        <Text style={styles.sectionTitle}>{t("1. Acceptance of Terms")}</Text>
        <Text style={styles.paragraph}>
          {t(
            "By accessing or using the Chirag app, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our app."
          )}
        </Text>

        <Text style={styles.sectionTitle}>{t("2. Use of Services")}</Text>
        <Text style={styles.paragraph}>
          {t(
            "Our app provides drone-based farming services. You agree to use these services only for lawful purposes and in accordance with these Terms and Conditions."
          )}
        </Text>

        <Text style={styles.sectionTitle}>{t("3. User Accounts")}</Text>
        <Text style={styles.paragraph}>
          {t(
            "To use certain features of the app, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account."
          )}
        </Text>

        <Text style={styles.sectionTitle}>{t("4. Privacy Policy")}</Text>
        <Text style={styles.paragraph}>
          {t(
            "Your use of the Chirag app is also governed by our Privacy Policy, which can be found in the app settings."
          )}
        </Text>

        <Text style={styles.sectionTitle}>{t("5. Intellectual Property")}</Text>
        <Text style={styles.paragraph}>
          {t(
            "All content, features, and functionality of the Chirag app are owned by us or our licensors and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws."
          )}
        </Text>

        <Text style={styles.sectionTitle}>
          {t("6. Limitation of Liability")}
        </Text>
        <Text style={styles.paragraph}>
          {t(
            "We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the app."
          )}
        </Text>

        <Text style={styles.sectionTitle}>{t("7. Changes to Terms")}</Text>
        <Text style={styles.paragraph}>
          {t(
            "We reserve the right to modify these Terms and Conditions at any time. We will notify users of any significant changes. Your continued use of the app after such modifications constitutes your acceptance of the new terms."
          )}
        </Text>

        <Text style={styles.sectionTitle}>{t("8. Termination")}</Text>
        <Text style={styles.paragraph}>
          {t(
            "We may terminate or suspend your account and access to the app at our sole discretion, without prior notice, for conduct that we believe violates these Terms and Conditions or is harmful to other users, us, or third parties, or for any other reason."
          )}
        </Text>

        <Text style={styles.sectionTitle}>{t("9. Governing Law")}</Text>
        <Text style={styles.paragraph}>
          {t(
            "These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions."
          )}
        </Text>

        <Text style={styles.sectionTitle}>{t("10. Contact Us")}</Text>
        <Text style={styles.paragraph}>
          {t(
            "If you have any questions about these Terms and Conditions, please contact us at support@chiragapp.com."
          )}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  lastUpdated: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: "#333333",
    lineHeight: 24,
    marginBottom: 16,
  },
});

export default TermsConditionsScreen;
