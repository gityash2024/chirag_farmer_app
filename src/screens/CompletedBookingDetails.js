import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import ApiService from "../services/api";
import { useApp } from "../context/AppContext";

const CompletedBookingDetails = ({ route }) => {
  const navigation = useNavigation();
  const { booking, fromRecommendation } = route.params;
  const { showLoader, hideLoader, showToast } = useApp();
  const [showStartService, setShowStartService] = useState(false);
  const [showEditService, setShowEditService] = useState(false);
  const [showKPIDetails, setShowKPIDetails] = useState(false);
  const [formData, setFormData] = useState({
    startFieldImages: [],
    endFieldImages: [],
    liveLocationEnabled: false,
    batterySetAvailable: null,
    droneFlightHours: null,
    droneWaterUsage: null,
    dronePesticideUsage: null,
    conventionalEnergyConsumption: null,
    uavEnergyConsumption: null,
    chargeCycles: null,
    emissionSavedWater: null,
    emissionSavedPesticide: null,
    emissionSavedPerHectare: null,
  });

  useEffect(() => {
    if (!fromRecommendation) {
      setFormData({
        startFieldImages: booking.startFieldImages || [],
        endFieldImages: booking.endFieldImages || [],
        liveLocationEnabled: booking.liveLocationEnabled || false,
        batterySetAvailable: booking.batterySetAvailable || 0,
        droneFlightHours: booking.droneFlightHours || "",
        droneWaterUsage: booking.droneWaterUsage || 0,
        dronePesticideUsage: booking.dronePesticideUsage || 0,
        conventionalEnergyConsumption:
          booking.conventionalEnergyConsumption || 0,
        uavEnergyConsumption: booking.uavEnergyConsumption || 0,
        chargeCycles: booking.chargeCycles || 0,
        emissionSavedWater: booking.emissionSavedWater || 0,
        emissionSavedPesticide: booking.emissionSavedPesticide || 0,
        emissionSavedPerHectare: booking.emissionSavedPerHectare || 0,
      });
    }
  }, [booking, fromRecommendation]);

  const handleImagePick = async (field) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const localUri = result.assets[0].uri;
      const filename = localUri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : "image";

      let formData = new FormData();
      formData.append("file", { uri: localUri, name: filename, type });

      showLoader();
      try {
        const response = await axios.post(
          "http://192.168.172.62:5000/api/files/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data && response.data.fileUrl) {
          setFormData((prev) => ({
            ...prev,
            [field]: [...prev[field], response.data.fileUrl],
          }));
          showToast("Image uploaded successfully");
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (error) {
        showToast("Error uploading image");
      } finally {
        hideLoader();
      }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    showLoader();
    try {
      await ApiService.updateBooking(booking._id, {
        ...formData,
        status: "closed",
      });
      showToast("Booking completed successfully");
      navigation.navigate("MyBookings");
    } catch (error) {
      showToast("Error updating booking");
    } finally {
      hideLoader();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../assets/back-icon.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Booking Details</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.bookingId}>#{booking._id}</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{booking.status}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Image
            source={require("../../assets/location-icon.png")}
            style={styles.icon}
          />
          <Text style={styles.detailText}>{booking.farmLocation}</Text>
        </View>
        <Text style={styles.detailText}>
          Booking Name: {booking.farmerName}
        </Text>
        <Text style={styles.detailText}>
          Contact number: {booking.contactNumber}
        </Text>
        <Text style={styles.detailText}>
          Farm Area: {booking.farmArea} Acres
        </Text>
        <Text style={styles.detailText}>Crop: {booking.cropName}</Text>
        <View style={styles.weatherContainer}>
          <Text style={styles.temperature}>{booking.weather}</Text>
          <Text style={styles.location}>{booking.farmLocation}</Text>
          <Text style={styles.weather}>Mostly sunny</Text>
        </View>
        <Text style={styles.date}>
          {new Date(booking.date).toLocaleDateString()} {booking.time}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={() => setShowStartService(!showStartService)}
      >
        <Text style={styles.accordionTitle}>Start Service</Text>
        <Image
          source={require("../../assets/arrow-down.png")}
          style={[styles.arrowIcon, showStartService && styles.arrowIconUp]}
        />
      </TouchableOpacity>
      {showStartService && (
        <View style={styles.accordionContent}>
          {fromRecommendation ? (
            <TouchableOpacity
              style={styles.button2}
              onPress={() => handleImagePick("startFieldImages")}
            >
              <Text style={styles.buttonText2}>Upload Start Field Images</Text>
            </TouchableOpacity>
          ) : null}
          <View style={styles.imagesContainer}>
            {formData.startFieldImages.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.image} />
            ))}
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.label}>Enable Live Location</Text>
            <Switch
              value={formData.liveLocationEnabled}
              onValueChange={(value) =>
                handleInputChange("liveLocationEnabled", value)
              }
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Battery Sets Available"
            value={formData.batterySetAvailable.toString()}
            onChangeText={(value) =>
              handleInputChange("batterySetAvailable", parseInt(value) || 0)
            }
            keyboardType="numeric"
          />
        </View>
      )}

      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={() => setShowEditService(!showEditService)}
      >
        <Text style={styles.accordionTitle}>Edit Service</Text>
        <Image
          source={require("../../assets/arrow-down.png")}
          style={[styles.arrowIcon, showEditService && styles.arrowIconUp]}
        />
      </TouchableOpacity>
      {showEditService && (
        <View style={styles.accordionContent}>
          {fromRecommendation ? (
            <TouchableOpacity
              style={styles.button2}
              onPress={() => handleImagePick("endFieldImages")}
            >
              <Text style={styles.buttonText2}>Upload End Field Images</Text>
            </TouchableOpacity>
          ) : null}
          <View style={styles.imagesContainer}>
            {formData.endFieldImages.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.image} />
            ))}
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={() => setShowKPIDetails(!showKPIDetails)}
      >
        <Text style={styles.accordionTitle}>KPI Details</Text>
        <Image
          source={require("../../assets/arrow-down.png")}
          style={[styles.arrowIcon, showKPIDetails && styles.arrowIconUp]}
        />
      </TouchableOpacity>
      {showKPIDetails && (
        <View style={styles.accordionContent}>
          <TextInput
            style={styles.input}
            placeholder="Drone Flight Hours"
            value={formData.droneFlightHours}
            onChangeText={(value) =>
              handleInputChange("droneFlightHours", value)
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Drone Water Usage (L)"
            value={formData.droneWaterUsage.toString()}
            onChangeText={(value) =>
              handleInputChange("droneWaterUsage", parseFloat(value) || 0)
            }
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Drone Pesticide Usage (L)"
            value={formData.dronePesticideUsage.toString()}
            onChangeText={(value) =>
              handleInputChange("dronePesticideUsage", parseFloat(value) || 0)
            }
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Conventional Energy Consumption (kWh)"
            value={formData.conventionalEnergyConsumption.toString()}
            onChangeText={(value) =>
              handleInputChange(
                "conventionalEnergyConsumption",
                parseFloat(value) || 0
              )
            }
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="UAV Energy Consumption (kWh)"
            value={formData.uavEnergyConsumption.toString()}
            onChangeText={(value) =>
              handleInputChange("uavEnergyConsumption", parseFloat(value) || 0)
            }
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Charge Cycles"
            value={formData.chargeCycles.toString()}
            onChangeText={(value) =>
              handleInputChange("chargeCycles", parseInt(value) || 0)
            }
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Emission Saved Water (L)"
            value={formData.emissionSavedWater.toString()}
            onChangeText={(value) =>
              handleInputChange("emissionSavedWater", parseFloat(value) || 0)
            }
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Emission Saved Pesticide (L)"
            value={formData.emissionSavedPesticide.toString()}
            onChangeText={(value) =>
              handleInputChange(
                "emissionSavedPesticide",
                parseFloat(value) || 0
              )
            }
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Emission Saved Per Hectare (kg CO2)"
            value={formData.emissionSavedPerHectare.toString()}
            onChangeText={(value) =>
              handleInputChange(
                "emissionSavedPerHectare",
                parseFloat(value) || 0
              )
            }
            keyboardType="numeric"
          />
        </View>
      )}

      {fromRecommendation ? (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Mark as Completed</Text>
        </TouchableOpacity>
      ) : null}
    </ScrollView>
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  section: {
    padding: 20,
  },
  bookingId: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statusContainer: {
    backgroundColor: "#4CAF50",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  statusText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  weatherContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  temperature: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 10,
  },
  location: {
    fontSize: 16,
    color: "#666666",
  },
  weather: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 10,
  },
  date: {
    fontSize: 16,
    marginTop: 10,
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#F6F6FE",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  arrowIconUp: {
    transform: [{ rotate: "180deg" }],
  },
  accordionContent: {
    padding: 15,
  },
  button: {
    backgroundColor: "#000000",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  button2: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonText2: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "bold",
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: "#000000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#000000",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    margin: 20,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CompletedBookingDetails;
