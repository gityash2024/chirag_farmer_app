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

const PrivacyPolicyScreen = () => {
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
        <Text style={styles.headerTitle}>{t("Privacy Policy")}</Text>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.lastUpdated}>{t("Last Updated")}: 01 May 2023</Text>

        <Text style={styles.sectionTitle}>{t("1. Introduction")}</Text>
        <Text style={styles.paragraph}>
          {t(
            "Chirag App is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our app."
          )}
        </Text>

        <Text style={styles.sectionTitle}>
          {t("2. Information We Collect")}
        </Text>
        <Text style={styles.paragraph}>
          {t(
            "We collect information you provide directly to us, such as your name, contact information, and farm details when you register for an account or use our services. We may also collect information about your device and app usage."
          )}
        </Text>

        <Text style={styles.sectionTitle}>
          {t("3. How We Use Your Information")}
        </Text>
        <Text style={styles.paragraph}>
          {t(
            "We use the information we collect to provide, maintain, and improve our services, to process your requests, and to send you updates and other information related to the app."
          )}
        </Text>

        <Text style={styles.sectionTitle}>
          {t("4. Data Sharing and Disclosure")}
        </Text>
        <Text style={styles.paragraph}>
          {t(
            "We do not sell your personal information. We may share your information with service providers who assist us in providing our services, or if required by law."
          )}
        </Text>

        <Text style={styles.sectionTitle}>{t("5. Data Security")}</Text>
        <Text style={styles.paragraph}>
          {t(
            "We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing and against accidental loss, destruction, or damage."
          )}
        </Text>

        <Text style={styles.sectionTitle}>{t("6. Your Rights")}</Text>
        <Text style={styles.paragraph}>
          {t(
            "You have the right to access, correct, or delete your personal information. You can manage your information through your account settings or by contacting us directly."
          )}
        </Text>

        <Text style={styles.sectionTitle}>
          {t("7. Changes to This Policy")}
        </Text>
        <Text style={styles.paragraph}>
          {t(
            'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.'
          )}
        </Text>

        <Text style={styles.sectionTitle}>{t("8. Data Retention")}</Text>
        <Text style={styles.paragraph}>
          {t(
            "We retain your personal information for as long as necessary to provide you with our services and as described in this Privacy Policy. We may also retain and use this information to comply with our legal obligations, resolve disputes, and enforce our agreements."
          )}
        </Text>

        <Text style={styles.sectionTitle}>{t("9. Third-Party Services")}</Text>
        <Text style={styles.paragraph}>
          {t(
            "Our app may contain links to third-party websites or services. We are not responsible for the content or privacy practices of these third parties. We encourage you to read the privacy policies of any third-party services you use."
          )}
        </Text>

        <Text style={styles.sectionTitle}>{t("10. Contact Us")}</Text>
        <Text style={styles.paragraph}>
          {t(
            "If you have any questions about this Privacy Policy, please contact us at privacy@chiragapp.com."
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

export default PrivacyPolicyScreen;
