import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal,TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ServiceDetailsScreen = ({ route }) => {
    console.log(route?.params)
    
    const { booking } = route.params;
  const navigation = useNavigation();
  const [showRejectionModal, setShowRejectionModal] = useState(false);

  const handleStartService = () => {
    navigation.navigate('ServiceAddDetails', { booking });
  };

  const handleReject = () => {
    setShowRejectionModal(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/back-icon.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Booking details</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.bookingCard}>
          <Text style={styles.bookingId}>#{booking.id}</Text>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>Confirmed</Text>
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
            <Text style={styles.weather}>Mostly sunny</Text>
          </View>
          <Text style={styles.date}>{booking.date}</Text>
        </View>
        <View style={styles.vendorCard}>
          <Text style={styles.vendorName}>Digital sky Drone services</Text>
          <View style={styles.vendorDetails}>
            <Text style={styles.vendorExperience}>2 years of experience</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>4.5</Text>
              <Image source={require('../../assets/star_icon.png')} style={styles.starIcon} />
            </View>
          </View>
          <View style={styles.contactContainer}>
            <Text style={styles.contactNumber}>Contact number : ****</Text>
            <TouchableOpacity style={styles.callButton}>
              <Image source={require('../../assets/phone-icon.png')} style={styles.phoneIcon} />
              <Text style={styles.callButtonText}>Call now</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.paymentCard}>
          <Text style={styles.paymentTitle}>Payment Summary</Text>
          <Text style={styles.estimatedTotal}>Estimated Total : ₹2589</Text>
          <View style={styles.paymentDetail}>
            <Text>Estimated Total</Text>
            <Text>₹1999</Text>
          </View>
          <View style={styles.paymentDetail}>
            <Text>Taxes and fee</Text>
            <Text>₹199</Text>
          </View>
          <View style={styles.dashedBorder} />
          <View style={styles.paymentTotal}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalAmount}>₹2198</Text>
          </View>
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
            <Text style={styles.rejectButtonText}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.startServiceButton} onPress={handleStartService}>
            <Text style={styles.startServiceButtonText}>Start the service</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showRejectionModal}
        onRequestClose={() => setShowRejectionModal(false)}
      >
        <RejectionModal onClose={() => setShowRejectionModal(false)} />
      </Modal>
    </ScrollView>
  );
};

const RejectionModal = ({ onClose }) => {
    const [rejectionReason, setRejectionReason] = useState('');
    const navigation = useNavigation();
    const {booking} = useRoute().params;
  
    const handleSubmit = () => {
      navigation.navigate('RejectedServiceDetails', { booking, rejectionReason });
      onClose();
    };
  
    return (
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
          <TouchableOpacity style={styles.modalButton} onPress={handleSubmit}>
            <Text style={styles.modalButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
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
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  bookingId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusContainer: {
    backgroundColor: '#4CAF50',
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
  weather: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 10,
  },
  date: {
    fontSize: 16,
    marginTop: 10,
  },
  vendorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  vendorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  vendorDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  vendorExperience: {
    fontSize: 14,
    color: '#666666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginRight: 5,
  },
  starIcon: {
    width: 16,
    height: 16,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactNumber: {
    fontSize: 14,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  phoneIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  paymentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  estimatedTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  dashedBorder: {
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginVertical: 10,
  },
  paymentTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
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
  startServiceButton: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: 'center',
  },
  startServiceButtonText: {
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
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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
  }
});

export default ServiceDetailsScreen;