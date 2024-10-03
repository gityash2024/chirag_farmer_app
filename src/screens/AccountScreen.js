import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiService from "../services/api";
import { useTranslation } from "react-i18next";
import { SvgXml } from "react-native-svg";
import { useGlobalRefresh } from "../components/GlobalRefreshContext";

const AccountScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    useState(false);
  const { refreshing, onRefresh } = useGlobalRefresh();

  const accountOptions = [
    { icon: locationIcon, title: t("Manage Addresses"), screen: "Addresses" },
    { icon: profileIcon, title: t("My profile"), screen: "EditAccount" },
    {
      icon: settingIcon,
      title: t("Delete Account"),
      onPress: () => setDeleteAccountModalVisible(true),
    },
    {
      icon: termsIcon,
      title: t("Terms and conditions"),
      screen: "TermsConditions",
    },
    { icon: privacyIcon, title: t("Privacy Policy"), screen: "PrivacyPolicy" },
    { icon: rateIcon, title: t("Rate app"), screen: "RateApp" },
  ];

  const handleRefresh = async () => {
    await fetchUserData();
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        const runnerDetails = await ApiService.getRunnerDetailsByMobileNumber({
          mobileNumber: parsedUserData.mobileNumber,
        });
        setUserData(runnerDetails);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("isLoggedIn");
      navigation.reset({
        index: 0,
        routes: [{ name: "Splash" }],
      });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <SvgXml xml={backIcon} width={24} height={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{userData?.name || t("User")}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("EditAccount")}>
          <SvgXml xml={editIcon} width={24} height={24} />
        </TouchableOpacity>
      </View>
      <Text style={styles.phone}>
        {userData?.mobileNumber || t("Not available")}
      </Text>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh(handleRefresh)}
          />
        }
        style={styles.content}
      >
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("CustomerSupport")}
          >
            <SvgXml
              xml={contactIcon}
              width={24}
              height={24}
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>{t("Help & Support")}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        {accountOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={
              option.onPress || (() => navigation.navigate(option.screen))
            }
          >
            <SvgXml
              xml={option.icon}
              width={24}
              height={24}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>{option.title}</Text>
            <SvgXml
              xml={rightArrowIcon}
              width={24}
              height={24}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setLogoutModalVisible(true)}
        >
          <Text style={styles.logoutText}>{t("Logout")}</Text>
        </TouchableOpacity>
        <Text style={styles.versionText}>{t("Version")} 1.0</Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t("Confirm Logout")}</Text>
            <Text style={styles.modalText}>
              {t("Are you sure you want to logout?")}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>{t("Cancel")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleLogout}
              >
                <Text style={styles.confirmButtonText}>{t("Confirm")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteAccountModalVisible}
        onRequestClose={() => setDeleteAccountModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t("Confirm Delete Account")}</Text>
            <Text style={styles.modalText}>
              {t(
                "Are you sure you want to delete your account? This action cannot be undone."
              )}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setDeleteAccountModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>{t("Cancel")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={() => setDeleteAccountModalVisible(false)}
              >
                <Text style={styles.confirmButtonText}>{t("Confirm")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  phone: {
    fontSize: 14,
    color: "#6F6F6F",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: "#12121233",
    borderRadius: 10,
    width: "48%",
    height: 80,
  },
  actionIcon: {
    marginRight: 10,
  },
  actionText: {
    fontSize: 14,
    color: "#000000",
  },
  separator: {
    height: 10,
    backgroundColor: "#F5F5F5",
    marginVertical: 20,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  optionIcon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    color: "#000000",
    flex: 1,
  },
  arrowIcon: {
    marginLeft: "auto",
  },
  footer: {
    padding: 20,
  },
  logoutButton: {
    backgroundColor: "#000000",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  versionText: {
    textAlign: "center",
    color: "#6F6F6F",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#E0E0E0",
  },
  confirmButton: {
    backgroundColor: "#000000",
  },
  cancelButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

const locationIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 5C9.38193 5 8.77775 5.18328 8.26384 5.52666C7.74994 5.87004 7.3494 6.3581 7.11288 6.92911C6.87635 7.50013 6.81447 8.12847 6.93505 8.73466C7.05562 9.34085 7.35325 9.89767 7.79029 10.3347C8.22733 10.7717 8.78415 11.0694 9.39034 11.19C9.99653 11.3105 10.6249 11.2486 11.1959 11.0121C11.7669 10.7756 12.255 10.3751 12.5983 9.86116C12.9417 9.34725 13.125 8.74307 13.125 8.125C13.125 7.2962 12.7958 6.50134 12.2097 5.91529C11.6237 5.32924 10.8288 5 10 5ZM10 10C9.62916 10 9.26665 9.89003 8.95831 9.68401C8.64996 9.47798 8.40964 9.18514 8.26773 8.84253C8.12581 8.49992 8.08868 8.12292 8.16103 7.75921C8.23337 7.39549 8.41195 7.0614 8.67417 6.79917C8.9364 6.53695 9.27049 6.35837 9.63421 6.28603C9.99792 6.21368 10.3749 6.25081 10.7175 6.39273C11.0601 6.53464 11.353 6.77496 11.559 7.08331C11.765 7.39165 11.875 7.75416 11.875 8.125C11.875 8.62228 11.6775 9.09919 11.3258 9.45083C10.9742 9.80246 10.4973 10 10 10ZM10 1.25C8.17727 1.25207 6.42979 1.97706 5.14092 3.26592C3.85206 4.55479 3.12707 6.30227 3.125 8.125C3.125 10.5781 4.25859 13.1781 6.40625 15.6445C7.37127 16.759 8.45739 17.7626 9.64453 18.6367C9.74962 18.7103 9.87482 18.7498 10.0031 18.7498C10.1314 18.7498 10.2566 18.7103 10.3617 18.6367C11.5467 17.7622 12.6307 16.7587 13.5938 15.6445C15.7383 13.1781 16.875 10.5781 16.875 8.125C16.8729 6.30227 16.1479 4.55479 14.8591 3.26592C13.5702 1.97706 11.8227 1.25207 10 1.25ZM10 17.3438C8.70859 16.3281 4.375 12.5977 4.375 8.125C4.375 6.63316 4.96763 5.20242 6.02252 4.14752C7.07742 3.09263 8.50816 2.5 10 2.5C11.4918 2.5 12.9226 3.09263 13.9775 4.14752C15.0324 5.20242 15.625 6.63316 15.625 8.125C15.625 12.5961 11.2914 16.3281 10 17.3438Z" fill="#121212"/>
</svg>`;

const profileIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_86_65940)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.0003 11.2497C10.8844 11.2497 11.7322 10.8985 12.3573 10.2734C12.9825 9.64824 13.3337 8.8004 13.3337 7.91634C13.3337 7.03229 12.9825 6.18444 12.3573 5.55932C11.7322 4.9342 10.8844 4.58301 10.0003 4.58301C9.11627 4.58301 8.26842 4.9342 7.6433 5.55932C7.01818 6.18444 6.66699 7.03229 6.66699 7.91634C6.66699 8.8004 7.01818 9.64824 7.6433 10.2734C8.26842 10.8985 9.11627 11.2497 10.0003 11.2497ZM10.0003 10.4163C10.3286 10.4163 10.6537 10.3517 10.957 10.226C11.2603 10.1004 11.5359 9.91625 11.7681 9.68411C12.0002 9.45196 12.1844 9.17636 12.31 8.87305C12.4357 8.56974 12.5003 8.24465 12.5003 7.91634C12.5003 7.58804 12.4357 7.26295 12.31 6.95963C12.1844 6.65632 12.0002 6.38072 11.7681 6.14857C11.5359 5.91643 11.2603 5.73228 10.957 5.60664C10.6537 5.48101 10.3286 5.41634 10.0003 5.41634C9.33728 5.41634 8.7014 5.67973 8.23256 6.14857C7.76372 6.61742 7.50033 7.2533 7.50033 7.91634C7.50033 8.57938 7.76372 9.21527 8.23256 9.68411C8.7014 10.1529 9.33728 10.4163 10.0003 10.4163Z" fill="#121212"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.3337 10.0003C18.3337 14.6028 14.6028 18.3337 10.0003 18.3337C5.39783 18.3337 1.66699 14.6028 1.66699 10.0003C1.66699 5.39783 5.39783 1.66699 10.0003 1.66699C14.6028 1.66699 18.3337 5.39783 18.3337 10.0003ZM14.0128 16.3378C12.8134 17.0996 11.4213 17.503 10.0003 17.5003C8.54547 17.503 7.1216 17.0801 5.90408 16.2837C5.80408 16.1587 5.70269 16.0295 5.59991 15.8962C5.4807 15.74 5.4164 15.5489 5.41699 15.3524C5.41699 14.9037 5.73949 14.5274 6.17074 14.4645C9.02283 14.0478 10.9866 14.0837 13.8424 14.4791C14.0491 14.5093 14.238 14.6132 14.3742 14.7716C14.5104 14.93 14.5848 15.1323 14.5837 15.3412C14.5837 15.5412 14.5149 15.7353 14.3907 15.887C14.2627 16.0428 14.1367 16.1931 14.0128 16.3378ZM15.4107 15.1945C15.3441 14.4145 14.752 13.7637 13.9566 13.6537C11.0332 13.2491 8.98991 13.2103 6.05033 13.6399C5.25033 13.7566 4.66074 14.4132 4.59074 15.1953C3.24713 13.7999 2.49768 11.9374 2.50033 10.0003C2.50033 5.85824 5.85824 2.50033 10.0003 2.50033C14.1424 2.50033 17.5003 5.85824 17.5003 10.0003C17.503 11.937 16.7539 13.7992 15.4107 15.1945Z" fill="#121212"/>
</g>
<defs>
<clipPath id="clip0_86_65940">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>`;

const settingIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_86_65950)">
<path d="M10.0559 6.11133C7.88921 6.11133 6.16699 7.83355 6.16699 10.0002C6.16699 12.1669 7.88921 13.8891 10.0559 13.8891C12.2225 13.8891 13.9448 12.1669 13.9448 10.0002C13.9448 7.83355 12.2225 6.11133 10.0559 6.11133ZM10.0559 12.778C8.50033 12.778 7.2781 11.5558 7.2781 10.0002C7.2781 8.44466 8.50033 7.22244 10.0559 7.22244C11.6114 7.22244 12.8337 8.44466 12.8337 10.0002C12.8337 11.5558 11.6114 12.778 10.0559 12.778Z" fill="#121212"/>
<path d="M18.2224 8.16688L16.6669 7.66688L16.3336 6.83355L17.1113 5.38911C17.278 5.05577 17.2224 4.61133 16.9447 4.33355L15.6113 3.00022C15.3336 2.72244 14.8891 2.66688 14.5558 2.83355L13.1113 3.61133L12.278 3.27799L11.778 1.72244C11.6669 1.38911 11.3336 1.11133 10.9447 1.11133H9.05577C8.66688 1.11133 8.33355 1.38911 8.278 1.77799L7.778 3.33355C7.44466 3.38911 7.16688 3.50022 6.88911 3.66688L5.44466 2.88911C5.11133 2.72244 4.66688 2.77799 4.38911 3.05577L3.05577 4.38911C2.77799 4.66688 2.72244 5.11133 2.88911 5.44466L3.61133 6.83355C3.50022 7.11133 3.38911 7.44466 3.27799 7.72244L1.72244 8.22244C1.38911 8.33355 1.11133 8.66688 1.11133 9.05577V10.9447C1.11133 11.3336 1.38911 11.6669 1.77799 11.778L3.33355 12.278L3.66688 13.1113L2.88911 14.5558C2.72244 14.8891 2.77799 15.3336 3.05577 15.6113L4.38911 16.9447C4.66688 17.2224 5.11133 17.278 5.44466 17.1113L6.88911 16.3336L7.72244 16.6669L8.22244 18.278C8.33355 18.6113 8.66688 18.8891 9.05577 18.8891H10.9447C11.3336 18.8891 11.6669 18.6113 11.778 18.278L12.278 16.6669L13.1113 16.3336L14.5558 17.1113C14.8891 17.278 15.3336 17.2224 15.6113 16.9447L16.9447 15.6113C17.2224 15.3336 17.278 14.8891 17.1113 14.5558L16.3336 13.1113L16.6669 12.278L18.278 11.778C18.6113 11.6669 18.8891 11.3336 18.8891 10.9447V9.05577C18.8891 8.66688 18.6113 8.278 18.2224 8.16688ZM17.778 10.778L15.778 11.3891L15.7224 11.6669L15.2224 12.8336L15.0558 13.1113L16.0558 14.9447L14.9447 16.0558L13.1113 15.0558L12.8336 15.2224C12.4447 15.4447 12.0558 15.6113 11.6669 15.7224L11.3891 15.778L10.778 17.778H9.22244L8.61133 15.778L8.33355 15.7224L7.16688 15.2224L6.88911 15.0558L5.05577 16.0558L3.94466 14.9447L4.94466 13.1113L4.778 12.8336C4.55577 12.4447 4.38911 12.0558 4.27799 11.6669L4.22244 11.3891L2.22244 10.778V9.22244L4.11133 8.66688L4.22244 8.38911C4.33355 7.94466 4.50022 7.55577 4.72244 7.16688L4.88911 6.88911L3.94466 5.05577L5.05577 3.94466L6.83355 4.94466L7.11133 4.778C7.50022 4.55577 7.88911 4.38911 8.33355 4.27799L8.61133 4.16688L9.22244 2.22244H10.778L11.3891 4.16688L11.6669 4.27799C12.0558 4.38911 12.4447 4.55577 12.8336 4.778L13.1113 4.94466L14.9447 3.94466L16.0558 5.05577L15.0558 6.88911L15.2224 7.16688C15.4447 7.55577 15.6113 7.94466 15.7224 8.33355L15.778 8.61133L17.778 9.22244V10.778Z" fill="#121212"/>
</g>
<defs>
<clipPath id="clip0_86_65950">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>`;

const termsIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.19089 9.99967H10.9528M6.19089 11.9044H12.8576M6.19089 13.8092H9.04804M15.7147 14.7616V8.09491L10.9528 3.33301H6.19089C5.68572 3.33301 5.20124 3.53369 4.84402 3.8909C4.48681 4.24811 4.28613 4.7326 4.28613 5.23777V14.7616C4.28613 15.2668 4.48681 15.7512 4.84402 16.1084C5.20124 16.4657 5.68572 16.6663 6.19089 16.6663H13.8099C14.3151 16.6663 14.7996 16.4657 15.1568 16.1084C15.514 15.7512 15.7147 15.2668 15.7147 14.7616Z" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.9531 3.33301V6.19015C10.9531 6.69532 11.1538 7.17981 11.511 7.53702C11.8682 7.89423 12.3527 8.09491 12.8579 8.09491H15.715" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const privacyIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.417 16.667C15.417 16.7775 15.3731 16.8835 15.295 16.9616C15.2168 17.0398 15.1108 17.0837 15.0003 17.0837H10.0003V17.917C10.0003 18.0598 9.98644 18.1987 9.95866 18.3337H15.0003C15.4424 18.3337 15.8663 18.1581 16.1788 17.8455C16.4914 17.5329 16.667 17.109 16.667 16.667V8.19033C16.6669 7.74833 16.4912 7.32448 16.1787 7.01199L11.3212 2.15533L11.2803 2.12199L11.2503 2.09699C11.1931 2.04274 11.1321 1.99261 11.0678 1.94699C11.0462 1.93376 11.0239 1.92153 11.0012 1.91033L10.9612 1.89033L10.9195 1.86616C10.8745 1.84033 10.8287 1.81366 10.7812 1.79366C10.6151 1.7277 10.4395 1.68887 10.2612 1.67866C10.2445 1.67755 10.2281 1.675610.212 1.67283L10.1437 1.66699H5.00033C4.5583 1.66699 4.13437 1.84259 3.82181 2.15515C3.50925 2.46771 3.33366 2.89163 3.33366 3.33366V9.62533C3.67966 9.27204 4.1098 9.01252 4.58366 8.87116V3.33366C4.58366 3.22315 4.62756 3.11717 4.7057 3.03903C4.78384 2.96089 4.88982 2.91699 5.00033 2.91699H10.0003V6.66699C10.0003 7.10902 10.1759 7.53294 10.4885 7.8455C10.801 8.15806 11.225 8.33366 11.667 8.33366H15.417V16.667ZM11.2503 3.85116L14.482 7.08366H11.667C11.5565 7.08366 11.4505 7.03976 11.3724 6.96162C11.2942 6.88348 11.2503 6.7775 11.2503 6.66699V3.85116ZM3.33366 12.5003H2.91699C2.58547 12.5003 2.26753 12.632 2.03311 12.8664C1.79869 13.1009 1.66699 13.4188 1.66699 13.7503V17.917C1.66699 18.2485 1.79869 18.5665 2.03311 18.8009C2.26753 19.0353 2.58547 19.167 2.91699 19.167H7.91699C8.24851 19.167 8.56646 19.0353 8.80088 18.8009C9.0353 18.5665 9.16699 18.2485 9.16699 17.917V13.7503C9.16699 13.4188 9.0353 13.1009 8.80088 12.8664C8.56646 12.632 8.24851 12.5003 7.91699 12.5003H7.50033V11.667C7.50033 11.1145 7.28083 10.5846 6.89013 10.1939C6.49943 9.80315 5.96953 9.58366 5.41699 9.58366C4.86446 9.58366 4.33455 9.80315 3.94385 10.1939C3.55315 10.5846 3.33366 11.1145 3.33366 11.667V12.5003ZM4.58366 11.667C4.58366 11.446 4.67146 11.234 4.82774 11.0777C4.98402 10.9215 5.19598 10.8337 5.41699 10.8337C5.63801 10.8337 5.84997 10.9215 6.00625 11.0777C6.16253 11.234 6.25033 11.446 6.25033 11.667V12.5003H4.58366V11.667ZM6.25033 15.8337C6.25033 16.0547 6.16253 16.2666 6.00625 16.4229C5.84997 16.5792 5.63801 16.667 5.41699 16.667C5.19598 16.667 4.98402 16.5792 4.82774 16.4229C4.67146 16.2666 4.58366 16.0547 4.58366 15.8337C4.58366 15.6126 4.67146 15.4007 4.82774 15.2444C4.98402 15.0881 5.19598 15.0003 5.41699 15.0003C5.63801 15.0003 5.84997 15.0881 6.00625 15.2444C6.16253 15.4007 6.25033 15.6126 6.25033 15.8337Z" fill="#121212"/>
</svg>`;

const rateIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_86_65975)">
<path d="M11.4397 2.87012L12.9063 5.82762C13.1063 6.23928 13.6397 6.63428 14.0897 6.70928L16.7472 7.15512C18.4472 7.44095 18.8472 8.68428 17.6222 9.91095L15.5555 11.9943C15.2055 12.3468 15.0138 13.0276 15.1222 13.5151L15.7138 16.0943C16.1805 18.136 15.1055 18.9251 13.3138 17.8585L10.8222 16.371C10.3722 16.1026 9.63051 16.1026 9.17217 16.371L6.68217 17.8585C4.89884 18.9251 3.81551 18.1268 4.28217 16.0943L4.87384 13.5151C4.98217 13.0276 4.79051 12.3468 4.44051 11.9943L2.37384 9.91095C1.15801 8.68345 1.54967 7.44095 3.24884 7.15512L5.90717 6.70928C6.34884 6.63428 6.88217 6.23928 7.08217 5.82762L8.54884 2.87012C9.34884 1.26595 10.6488 1.26595 11.4405 2.87012" stroke="#121212" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_86_65975">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>`;

const editIcon = `<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.8165 3.62231L14.5553 0.344536C14.3398 0.130128 14.0482 0.00976562 13.7442 0.00976562C13.4402 0.00976563 13.1486 0.130128 12.9331 0.344536L1.37201 11.889L0.316454 16.4445C0.280041 16.6111 0.281289 16.7836 0.320108 16.9496C0.358926 17.1156 0.434334 17.2708 0.540823 17.4039C0.647311 17.537 0.782191 17.6447 0.935608 17.719C1.08902 17.7933 1.2571 17.8324 1.42757 17.8334C1.50696 17.842 1.58706 17.842 1.66645 17.8334L6.27201 16.7779L17.8165 5.24454C18.0309 5.02904 18.1512 4.73742 18.1512 4.43343C18.1512 4.12944 18.0309 3.83781 17.8165 3.62231ZM5.71645 15.7779L1.39979 16.6834L2.38312 12.4501L11.0331 3.83343L14.3665 7.16676L5.71645 15.7779ZM15.1109 6.3612L11.7776 3.02787L13.7109 1.10565L16.9887 4.43898L15.1109 6.3612Z" fill="#121212"/>
</svg>`;

const bookingIcon = `<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.55496 17.9728H12.4442C14.1771 17.9728 15.0392 17.1024 15.0392 15.3528V2.65458C15.0392 0.91351 14.1771 0.0263672 12.4442 0.0263672H3.55496C1.83068 0.0263672 0.959961 0.91351 0.959961 2.65494V15.3528C0.959961 17.1021 1.83068 17.9728 3.55496 17.9728ZM3.62175 16.6253C2.7596 16.6253 2.30746 16.1646 2.30746 15.3278V2.67994C2.30746 1.85137 2.7596 1.37387 3.63032 1.37387H12.3775C13.2478 1.37387 13.6917 1.8428 13.6917 2.67994V15.3278C13.6917 16.1646 13.2478 16.6253 12.3857 16.6253H3.62175ZM4.83568 4.8728H11.1803C11.4732 4.8728 11.6992 4.63851 11.6992 4.34565C11.6992 4.06101 11.4735 3.84351 11.1803 3.84351H4.83568C4.52568 3.84351 4.30818 4.06101 4.30818 4.34565C4.30818 4.63851 4.52603 4.8728 4.83568 4.8728ZM4.83568 7.79422H11.1803C11.4732 7.79422 11.6992 7.55994 11.6992 7.26672C11.6992 6.98244 11.4735 6.76458 11.1803 6.76458H4.83568C4.52568 6.76458 4.30818 6.98244 4.30818 7.26672C4.30818 7.55958 4.52603 7.79422 4.83568 7.79422ZM4.83568 10.7157H7.84068C8.13353 10.7157 8.3596 10.4896 8.3596 10.2049C8.3596 9.91208 8.13353 9.68601 7.84068 9.68601H4.83532C4.52532 9.68601 4.30782 9.91208 4.30782 10.2049C4.30782 10.4896 4.52568 10.7157 4.83532 10.7157" fill="#121212"/>
</svg>`;

const contactIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.33366 9.58333L2.92949 9.68417C2.56893 9.7743 2.24883 9.98235 2.02008 10.2753C1.79133 10.5682 1.66705 10.9292 1.66699 11.3008V12.865C1.66705 13.2367 1.79133 13.5976 2.02008 13.8906C2.24883 14.1835 2.56893 14.3915 2.92949 14.4817L4.37949 14.8442C4.45317 14.8625 4.53006 14.8638 4.60433 14.8481C4.6786 14.8323 4.7483 14.7998 4.80814 14.753C4.86797 14.7063 4.91638 14.6465 4.94968 14.5783C4.98298 14.51 5.0003 14.4351 5.00032 14.3592V9.80667C5.00033 9.73065 4.983 9.65563 4.94965 9.58731C4.9163 9.51899 4.86782 9.45918 4.80788 9.41242C4.74794 9.36566 4.67813 9.33318 4.60375 9.31745C4.52938 9.30173 4.45239 9.30317 4.37866 9.32167L3.33366 9.58333ZM3.33366 9.58333V9.16667C3.33366 7.39856 4.03604 5.70286 5.28628 4.45262C6.53652 3.20238 8.23221 2.5 10.0003 2.5C11.7684 2.5 13.4641 3.20238 14.7144 4.45262C15.9646 5.70286 16.667 7.39856 16.667 9.16667V9.58333M16.667 9.58333L17.0712 9.68417C17.4317 9.7743 17.7518 9.98235 17.9806 10.2753C18.2093 10.5682 18.3336 10.9292 18.3337 11.3008V12.865C18.3336 13.2367 18.2093 13.5976 17.9806 13.8906C17.7518 14.1835 17.4317 14.3915 17.0712 14.4817L16.667 14.5833M16.667 9.58333L15.6212 9.32167C15.5475 9.30332 15.4706 9.30199 15.3963 9.31778C15.322 9.33358 15.2523 9.36608 15.1925 9.41283C15.1327 9.45957 15.0843 9.51933 15.051 9.58757C15.0177 9.65581 15.0004 9.73074 15.0003 9.80667V14.3592C15.0004 14.4351 15.0177 14.51 15.051 14.5783C15.0843 14.6465 15.1327 14.7063 15.1925 14.753C15.2523 14.7998 15.322 14.8323 15.3963 14.8481C15.4706 14.8638 15.5475 14.8625 15.6212 14.8442L16.667 14.5833M16.667 14.5833V15.4167C16.667 15.8587 16.4914 16.2826 16.1788 16.5952C15.8663 16.9077 15.4424 17.0833 15.0003 17.0833H12.5003M12.5003 17.0833C12.5003 16.7518 12.3686 16.4339 12.1342 16.1995C11.8998 15.965 11.5818 15.8333 11.2503 15.8333H8.75032C8.4188 15.8333 8.10086 15.965 7.86644 16.1995C7.63202 16.4339 7.50032 16.7518 7.50032 17.0833C7.50032 17.4149 7.63202 17.7328 7.86644 17.9672C8.10086 18.2016 8.4188 18.3333 8.75032 18.3333H11.2503C11.5818 18.3333 11.8998 18.2016 12.1342 17.9672C12.3686 17.7328 12.5003 17.4149 12.5003 17.0833Z" stroke="#121212" stroke-width="1.5"/>
</svg>`;

const rightArrowIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.33301 14.167L12.4997 10.0003L8.33301 5.83366" stroke="#121212"/>
</svg>`;

const backIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.53125 15.625L3.90625 10L9.53125 4.375M4.6875 10L16.0938 10" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export default AccountScreen;
