import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiService from "../services/api";
import { useApp } from "../context/AppContext";
import { SvgXml } from "react-native-svg";
const SvgComponent = () => {
  const svgMarkup = `<svg width="304" height="57" viewBox="0 0 304 57" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="304" height="57" fill="url(#pattern0_847_19802)"/>
<defs>
<pattern id="pattern0_847_19802" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_847_19802" transform="matrix(0.002 0 0 0.0106689 0 -2.12628)"/>
</pattern>
<image id="image0_847_19802" width="500" height="500" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAACXBIWXMAAC4jAAAuIwF4pT92AABP2UlEQVR4Xu3dCZxN9f/HcffeWRhj36ksUdmXioqytCgtiMqWVn6lX6uUFhGVIqV+7Wkh0q49SUWopBKFiKxR2ZWdmf/7M/+587gzc+895869dxZe5/E4j2HmrM9zzndfihVjQQABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEE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q9ygiVjur1uv7m26/x6jRo1i3PYobdn98BZ45JFHkjWZyNlSeF/rtoDAOKNINbPO9Olzzzs36mFYTVqDuTTTjycUU2cNqpJ5TovcVmi9T9eUbaz1aJ6QMj5Z/dCtWjLnsWbNmlVCpaHZIsJoI3SdI0eEPifbtNQ2jkabNm0sR26t/zNyuvkRocdycpYFCxaUUBWNFalbI+TAqhv/e7NOv39EQwzHquQ0XwaWiToFGcnLmlmf7tUQgoH9NCM5RJHfVgY+pbrTlGOIWUvUIo/CDSAQpYDqqlOfeuopK061ANgyCjYk8xpNNLJK61aFOfb/mCzqspVsw5LqYEdrtcFOLDxbqfr6lWoYt0Xniqp7VeBFKjdcRTn9jHp4NbLdpYlFcvWdVqO10vqbtTjPCM9fffXVDbqGiKf89J9X45CXmTdvnvWfL6aGavsHDRq0WUX/2Y6nhnnJajtQYceOHXZOjxoOblXkZ2OU53lRiUsFdV/2N2zMFT5qutYtmmTHRuyL2aKi8FITJkywZ2mjD1pJqSVSVmnGvDWqw7f3xt+bIqpz6hwpOpc18vPYdKzqKbGxbNmyh208GBUmOyOAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggEDcBP4P3CgZwz2vOAsAAAAASUVORK5CYII="/>
</defs>
</svg>
`;
  const SvgImage = () => <SvgXml xml={svgMarkup} width="200px" />;

  return <SvgImage />;
};

const MyBookingsScreen = () => {
  const [selectedFunc, setSelectedFunc] = useState(null);
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Requested");
  const [bookings, setBookings] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const { showLoader, hideLoader, showToast } = useApp();
  const [loggedInRunnerId, setLoggedInRunnerId] = useState(null);

  useEffect(() => {
    setBookings([]);
    fetchBookings();
    getLoggedInRunnerId();
  }, [activeTab]);

  const getLoggedInRunnerId = async () => {
    const storedUserData = await AsyncStorage.getItem("userData");
    const userData = JSON.parse(storedUserData);
    setLoggedInRunnerId(userData?._id);
  };

  const fetchBookings = async () => {
    showLoader();
    try {
      const response = await ApiService.getBookings({
        role: "runner",
        userId: loggedInRunnerId,
      });
      console.log(loggedInRunnerId, "response------------>>>>>>>>>>>>>>");
      let filteredBookings = [];
      if (activeTab === "Requested") {
        filteredBookings = response.filter(
          (booking) =>
            booking.runner?._id === loggedInRunnerId &&
            !booking.acceptedByRunner &&
            !booking.rejectedByRunnerReason &&
            booking.status === "confirmed"
        );
      } else if (activeTab === "Confirmed") {
        filteredBookings = response.filter(
          (booking) =>
            booking.runner?._id === loggedInRunnerId &&
            booking.acceptedByRunner &&
            (booking.status === "confirmed" || booking.status === "started")
        );
      } else if (activeTab === "Closed") {
        filteredBookings = response.filter(
          (booking) =>
            booking.runner?._id === loggedInRunnerId &&
            booking.status === "closed"
        );
      }
      setBookings(filteredBookings);
    } catch (error) {
      showToast("Error fetching bookings");
    } finally {
      hideLoader();
    }
  };

  const handleAccept = (booking, func) => {
    setSelectedFunc(func);
    setSelectedBooking(booking);
    setModalVisible(true);
  };

  const handleReject = (booking, func) => {
    setSelectedFunc(func);

    setSelectedBooking(booking);
    setRejectReason("");
    setModalVisible(true);
  };

  const confirmAccept = async () => {
    showLoader();
    try {
      await ApiService.updateBooking(selectedBooking._id, {
        acceptedByRunner: true,
        status: "confirmed",
      });
      showToast("Booking accepted successfully");
      setModalVisible(false);
      fetchBookings();
    } catch (error) {
      showToast("Error accepting booking");
    } finally {
      hideLoader();
    }
  };

  const confirmReject = async () => {
    if (!rejectReason) {
      showToast("Please enter a rejection reason", "error");
      return;
    }
    showLoader();
    try {
      await ApiService.updateBooking(selectedBooking._id, {
        acceptedByRunner: false,
        rejectedByRunnerReason: rejectReason,
        status: "confirmed",
      });
      showToast("Booking rejected successfully");
      setModalVisible(false);
      fetchBookings();
    } catch (error) {
      showToast("Error rejecting booking");
    } finally {
      hideLoader();
    }
  };

  const renderBookingItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bookingCard}
      onPress={() => {
        switch (item.status) {
          case "requested":
            navigation.navigate("RequestedBookingDetails", { booking: item });
            break;
          case "confirmed":
            navigation.navigate("ConfirmedBookingDetails", { booking: item });
            break;
          case "closed":
            navigation.navigate("CompletedBookingDetails", { booking: item });
            break;
          case "started":
            showToast("Service already started");
            navigation.navigate("Recommendation", { booking: item });
            break;
          default:
            break;
        }
      }}
    >
      <View style={styles.bookingHeader}>
        <Text style={styles.bookingId}>#{item._id}</Text>
        <Text style={styles.cropName}>{item.cropName}</Text>
      </View>
      <View style={styles.locationContainer}>
        <Image
          source={require("../../assets/location-icon.png")}
          style={styles.locationIcon}
        />
        <Text style={styles.address}>{item.farmLocation}</Text>
      </View>
      <Text style={styles.bookingDetail}>Booking Name: {item.farmerName}</Text>
      <Text style={styles.bookingDetail}>
        Contact number: {item.contactNumber}
      </Text>
      <Text style={styles.bookingDetail}>Farm Area: {item.farmArea} Acres</Text>
      <Text style={styles.bookingDetail}>Price: ₹{item.quotePrice}</Text>
      <View style={styles.weatherContainer}>
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperature}>{item.weather}</Text>
          <Text style={styles.location}>{item.farmLocation}</Text>
          <Text style={styles.weather}>Mostly sunny</Text>
        </View>
        <Text style={styles.date}>
          {new Date(item.date).toLocaleDateString()} {item.time}
        </Text>
      </View>
      {activeTab === "Requested" && (
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.rejectButton}
            onPress={() => handleReject(item, "reject")}
          >
            <Text style={styles.rejectButtonText}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => handleAccept(item, "accept")}
          >
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderNoBookingsMessage = () => (
    <View style={styles.noBookingsContainer}>
      <Image
        source={require("../../assets/no-bookings.png")}
        style={styles.noBookingsImage}
        resizeMode="contain"
      />
      <Text style={styles.noBookingsText}>No bookings available</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Image
        source={require("../../assets/chirag-white-screen-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      /> */}
      <SvgComponent />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../assets/back-icon.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Bookings</Text>
      </View>
      <View style={styles.tabContainer}>
        {["Requested", "Confirmed", "Closed"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {bookings.length > 0 ? (
        <FlatList
          data={bookings}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.bookingList}
        />
      ) : (
        renderNoBookingsMessage()
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {selectedBooking && (
              <>
                {selectedFunc === "accept" ? (
                  <>
                    <Text style={styles.modalText}>
                      Are you sure you want to accept this booking?
                    </Text>
                    <View style={styles.modalButtonContainer}>
                      <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => setModalVisible(false)}
                      >
                        <Text style={styles.modalButtonText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.modalButton, styles.acceptButton]}
                        onPress={confirmAccept}
                      >
                        <Text style={styles.modalButtonText}>Confirm</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <>
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
                        <Text style={styles.modalButtonText}>
                          Confirm Reject
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </>
            )}
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
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    backgroundColor: "#000000",
    borderRadius: 20,
  },
  tabText: {
    fontSize: 16,
    color: "#000000",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  bookingList: {
    padding: 15,
  },
  bookingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  bookingId: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cropName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  address: {
    fontSize: 14,
    color: "#666666",
  },
  bookingDetail: {
    fontSize: 14,
    marginBottom: 5,
  },
  weatherContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 10,
  },
  temperatureContainer: {
    flexDirection: "column",
  },
  temperature: {
    fontSize: 24,
    fontWeight: "bold",
  },
  location: {
    fontSize: 12,
    color: "#666666",
  },
  weather: {
    fontSize: 12,
    color: "#666666",
  },
  date: {
    fontSize: 14,
    fontWeight: "bold",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    alignItems: "center",
  },
  rejectButtonText: {
    color: "#000000",
    fontWeight: "bold",
  },
  acceptButton: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: "center",
  },
  acceptButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  logo: {
    width: 200,
    height: 50,
    marginTop: 10,
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
    color: "#000000",
    fontWeight: "bold",
    textAlign: "center",
  },
  noBookingsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  noBookingsImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  noBookingsText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#666666",
  },
});

export default MyBookingsScreen;
