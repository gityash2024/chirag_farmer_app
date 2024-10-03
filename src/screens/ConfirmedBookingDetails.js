import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ConfirmedBookingDetails = ({ route }) => {
  const { booking } = route.params;
  const navigation = useNavigation();
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);

  const handleStartService = () => {
    navigation.navigate('Recommendation', { booking });
    // Handle start service logic
  };

  const handleReject = () => {
    // Handle reject logic
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/back-icon.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Booking Details</Text>
      </View>
      <View style={styles.content}>
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
        <TouchableOpacity 
          style={styles.paymentSummaryHeader} 
          onPress={() => setShowPaymentSummary(!showPaymentSummary)}
        >
          <Text style={styles.paymentSummaryTitle}>Payment Summary</Text>
          <Image 
            source={require('../../assets/arrow-down.png')} 
            style={[styles.arrowIcon, showPaymentSummary && styles.arrowIconUp]} 
          />
        </TouchableOpacity>
        {showPaymentSummary && (
          <View style={styles.paymentSummaryContent}>
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
        )}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
            <Text style={styles.rejectButtonText}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.startServiceButton} onPress={handleStartService}>
            <Text style={styles.startServiceButtonText}>Start the service</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  logo: {
    width: 200,
    height: 50,
    marginTop: 10,
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
  paymentSummaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F6F6FE',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  paymentSummaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  arrowIconUp: {
    transform: [{ rotate: '180deg' }],
  },
  paymentSummaryContent: {
    backgroundColor: '#F6F6FE',
    padding: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
});

export default ConfirmedBookingDetails;