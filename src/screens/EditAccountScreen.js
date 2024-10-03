import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header from "../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiService from "../services/api";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { useApp } from "../context/AppContext";

const EditAccountScreen = () => {
  const { t } = useTranslation();
  const { showLoader, hideLoader, showToast } = useApp();
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      showLoader();
      const storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        const runnerDetails = await ApiService.getRunnerDetailsByMobileNumber({
          mobileNumber: parsedUserData.mobileNumber,
        });
        setName(runnerDetails.name || "");
        setPhone(runnerDetails.mobileNumber || "");
        setEmail(runnerDetails.email || "");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      showToast(t("Error fetching user data"), "error");
    } finally {
      hideLoader();
    }
  };

  const handleEdit = async () => {
    if (isEditing) {
      try {
        showLoader();
        await ApiService.updateRunnerProfile({ name });
        showToast(t("Profile updated successfully"), "success");
        setIsEditing(false);
        fetchUserData();
      } catch (error) {
        console.error("Error updating profile:", error);
        showToast(t("Failed to update profile"), "error");
      } finally {
        hideLoader();
      }
    } else {
      setIsEditing(true);
    }
  };

  return (
    <View style={styles.container}>
      <Header title={t("Edit Account")} />
      <ScrollView style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t("NAME")}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              editable={isEditing}
            />
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Text style={styles.editButtonText}>
                {isEditing ? t("DONE") : t("EDIT")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t("PHONE NUMBER")}</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} value={phone} editable={false} />
          </View>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t("EMAIL ADDRESS")}</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} value={email} editable={false} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#6F6F6F",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D5D5D5",
    borderRadius: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    color: "#000000",
  },
  editButton: {
    padding: 10,
  },
  editButtonText: {
    color: "#000000",
    fontWeight: "bold",
  },
});

export default EditAccountScreen;
