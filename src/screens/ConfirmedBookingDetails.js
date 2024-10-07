import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ApiService from "../services/api";
import { useApp } from "../context/AppContext";

const ConfirmedBookingDetails = ({ route }) => {
  const { booking } = route.params;
  const navigation = useNavigation();
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const { showLoader, hideLoader, showToast } = useApp();

  const handleStartService = async () => {
    showLoader();
    try {
      await ApiService.updateBooking(booking._id, { status: "started" });
      showToast("Service started successfully");
      navigation.navigate("Recommendation", { booking });
    } catch (error) {
      showToast("Error starting service");
    } finally {
      hideLoader();
    }
  };

  const handleReject = () => {
    setModalVisible(true);
  };

  const confirmReject = async () => {
    showLoader();
    try {
      await ApiService.updateBooking(booking._id, {
        acceptedByRunner: false,
        rejectedByRunnerReason: rejectReason,
        status: "confirmed",
      });
      showToast("Booking rejected successfully");
      setModalVisible(false);
      navigation.goBack();
    } catch (error) {
      showToast("Error rejecting booking");
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
      <View style={styles.content}>
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
        <TouchableOpacity
          style={styles.paymentSummaryHeader}
          onPress={() => setShowPaymentSummary(!showPaymentSummary)}
        >
          <Text style={styles.paymentSummaryTitle}>Payment Summary</Text>
          <Image
            source={require("../../assets/arrow-down.png")}
            style={[styles.arrowIcon, showPaymentSummary && styles.arrowIconUp]}
          />
        </TouchableOpacity>
        {showPaymentSummary && (
          <View style={styles.paymentSummaryContent}>
            <Text style={styles.paymentTotal}>
              Estimated Total: ₹{booking.quotePrice}
            </Text>
            <View style={styles.paymentDetail}>
              <Text>Estimated Total</Text>
              <Text>₹{booking.quotePrice}</Text>
            </View>
            <View style={styles.paymentDetail}>
              <Text>Taxes and fee</Text>
              <Text>₹{Math.round(booking.quotePrice * 0.18)}</Text>
            </View>
            <View style={styles.paymentTotal}>
              <Text>Total</Text>
              <Text>
                ₹{booking.quotePrice + Math.round(booking.quotePrice * 0.18)}
              </Text>
            </View>
          </View>
        )}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
            <Text style={styles.rejectButtonText}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.startServiceButton}
            onPress={handleStartService}
          >
            <Text style={styles.startServiceButtonText}>Start the service</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Please provide a reason for rejection:
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={setRejectReason}
              value={rejectReason}
              placeholder="Enter reason for rejection"
              multiline
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.rejectButton]}
                onPress={confirmReject}
              >
                <Text style={styles.modalButtonText}>Confirm Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  content: {
    padding: 20,
  },
  bookingId: {
    fontSize: 18,
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
  paymentSummaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F6F6FE",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  paymentSummaryTitle: {
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
  paymentSummaryContent: {
    backgroundColor: "#F6F6FE",
    padding: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  paymentTotal: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paymentDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    padding: 15,
    borderRadius: 5,
    marginRight: 10,
    alignItems: "center",
  },
  rejectButtonText: {
    color: "#000000",
    fontWeight: "bold",
  },
  startServiceButton: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 15,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: "center",
  },
  startServiceButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 100,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
    flex: 1,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ConfirmedBookingDetails;
