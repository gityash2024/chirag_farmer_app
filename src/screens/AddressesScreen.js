import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import Header from "../components/Header";
import ApiService from "../services/api";
import { useTranslation } from "react-i18next";
import { Svg, Path } from "react-native-svg";
import { useApp } from "../context/AppContext";

const AddressesScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [addresses, setAddresses] = useState([]);
  const { showLoader, hideLoader, showToast } = useApp();

  const [modalVisible, setModalVisible] = useState(false);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      showLoader();
      const response = await ApiService.getRunnerAddresses();
      setAddresses(response);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      showToast(t("Failed to fetch addresses"), "error");
    } finally {
      hideLoader();
    }
  };

  const handleAddAddress = async () => {
    try {
      showLoader();
      if (editingAddress) {
        await ApiService.updateRunnerAddress({
          addressId: editingAddress._id,
          street,
          city,
          state,
          postalCode,
          country,
        });
        showToast(t("Address updated successfully"), "success");
      } else {
        await ApiService.addRunnerAddress({
          street,
          city,
          state,
          postalCode,
          country,
        });
        showToast(t("Address added successfully"), "success");
      }
      setModalVisible(false);
      clearForm();
      fetchAddresses();
    } catch (error) {
      console.error("Error adding/updating address:", error);
      showToast(t("Failed to add/update address"), "error");
    } finally {
      hideLoader();
    }
  };

  const handleDeleteAddress = (address) => {
    setAddressToDelete(address);
    setDeleteModalVisible(true);
  };

  const confirmDeleteAddress = async () => {
    try {
      showLoader();
      await ApiService.deleteRunnerAddress({ addressId: addressToDelete._id });
      setDeleteModalVisible(false);
      fetchAddresses();
      showToast(t("Address deleted successfully"), "success");
    } catch (error) {
      console.error("Error deleting address:", error);
      showToast(t("Failed to delete address"), "error");
    } finally {
      hideLoader();
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setStreet(address.street);
    setCity(address.city);
    setState(address.state);
    setPostalCode(address.postalCode);
    setCountry(address.country);
    setModalVisible(true);
  };

  const clearForm = () => {
    setStreet("");
    setCity("");
    setState("");
    setPostalCode("");
    setCountry("");
    setEditingAddress(null);
  };

  const EmptyAddressIcon = () => (
    <Svg width="100" height="100" viewBox="0 0 24 24">
      <Path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
        fill="#000000"
      />
    </Svg>
  );

  return (
    <View style={styles.container}>
      <Header title={t("My Addresses")} />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>{t("Add Address")}</Text>
      </TouchableOpacity>
      <ScrollView style={styles.content}>
        {addresses.length === 0 ? (
          <View style={styles.emptyContainer}>
            <EmptyAddressIcon />
            <Text style={styles.emptyText}>{t("No addresses found")}</Text>
          </View>
        ) : (
          addresses.map((address) => (
            <View key={address._id} style={styles.addressCard}>
              <Text
                style={styles.addressText}
              >{`${address.street}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleEditAddress(address)}
                >
                  <Text style={styles.actionButtonText}>{t("EDIT")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDeleteAddress(address)}
                >
                  <Text style={styles.actionButtonText}>{t("DELETE")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          clearForm();
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingAddress ? t("Edit Address") : t("Add New Address")}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={t("Street")}
              value={street}
              onChangeText={setStreet}
            />
            <TextInput
              style={styles.input}
              placeholder={t("City")}
              value={city}
              onChangeText={setCity}
            />
            <TextInput
              style={styles.input}
              placeholder={t("State")}
              value={state}
              onChangeText={setState}
            />
            <TextInput
              style={styles.input}
              placeholder={t("Postal Code")}
              value={postalCode}
              onChangeText={setPostalCode}
            />
            <TextInput
              style={styles.input}
              placeholder={t("Country")}
              value={country}
              onChangeText={setCountry}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleAddAddress}
            >
              <Text style={styles.modalButtonText}>
                {editingAddress ? t("Update") : t("Add")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => {
                setModalVisible(false);
                clearForm();
              }}
            >
              <Text style={styles.modalCancelButtonText}>{t("Cancel")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t("Confirm Delete")}</Text>
            <Text style={styles.modalText}>
              {t("Are you sure you want to delete this address?")}
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={confirmDeleteAddress}
            >
              <Text style={styles.modalButtonText}>{t("Delete")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setDeleteModalVisible(false)}
            >
              <Text style={styles.modalCancelButtonText}>{t("Cancel")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  addressCard: {
    backgroundColor: "#F6F6FE",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  addressText: {
    fontSize: 14,
    color: "#000000",
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: "row",
  },
  actionButton: {
    marginRight: 15,
  },
  actionButtonText: {
    color: "#000000",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#000000",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 20,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#000000",
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D5D5D5",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: "#000000",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalCancelButton: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#000000",
  },
  modalCancelButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default AddressesScreen;
