import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RequestedBookingDetails = ({ route }) => {
  const { booking } = route.params;
  const navigation = useNavigation();
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleAccept = () => {
    navigation.navigate('AcceptService', { booking });
  };

  const handleReject = () => {
    setRejectModalVisible(true);
  };

  const submitRejection = () => {
    // Handle rejection submission
    setRejectModalVisible(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
              <Image source={require('../../assets/chirag-white-screen-logo.png')} style={styles.logo} resizeMode="contain" />

      <View style={styles.header}>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/back-icon.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Booking Details</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.bookingId}>#{booking.id}</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Requested</Text>
        </View>
        <View style={styles.detailContainer}>
          <Image source={require('../../assets/location-icon.png')} style={styles.icon} />
          <Text style={styles.detailText}>{booking.address}</Text>
        </View>
        <Text style={styles.detailText}>Booking Name: {booking.name}</Text>
        <Text style={styles.detailText}>Contact number: {booking.contact}</Text>
        <Text style={styles.detailText}>Farm Area: {booking.farmArea}</Text>
        <Text style={styles.detailText}>Crop: {booking.crop}</Text>
        <View style={styles.weatherContainer}>
          <Text style={styles.temperature}>{booking.temperature}</Text>
          <Text style={styles.location}>{booking.location}</Text>
        </View>
        <Text style={styles.date}>{booking.date}</Text>
        <View style={styles.paymentContainer}>
          <Text style={styles.paymentTitle}>Payment Summary</Text>
          <Text style={styles.paymentTotal}>Estimated Total: ₹2589</Text>
          <View style={styles.paymentDetail}>
            <Text>Estimated Total</Text>
            <Text>₹1999</Text>
          </View>
          <View style={styles.paymentDetail}>
            <Text>Taxes and fee</Text>
            <Text>₹199</Text>
          </View>
          <View style={styles.paymentTotal}>
            <Text>Total</Text>
            <Text>₹2198</Text>
          </View>
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
            <Text style={styles.rejectButtonText}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={rejectModalVisible}
        onRequestClose={() => setRejectModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rejection Reason</Text>
            <TextInput
              style={styles.rejectionInput}
              multiline
              numberOfLines={4}
              onChangeText={setRejectionReason}
              value={rejectionReason}
              placeholder="Enter reason for rejection"
            />
            <TouchableOpacity style={styles.submitButton} onPress={submitRejection}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 50,
        marginTop: 10,
      },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  content: {
    padding: 20,
  },
  bookingId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusContainer: {
    backgroundColor: '#FFA500',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  statusText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
  },
  location: {
    fontSize: 16,
    color: '#666666',
  },
  date: {
    fontSize: 16,
    marginTop: 10,
  },
  paymentContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F6F6FE',
    borderRadius: 10,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
    padding: 15,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  rejectButtonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  rejectionInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default RequestedBookingDetails;