import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { typography } from '../styles/Typography';

const QuoteReceivedScreen = ({ route }) => {
  const navigation = useNavigation();
  const { booking } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/arrow-right-icon.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={[styles.title, typography['sans-bold']]}>Booking</Text>
      </View>
      <View style={styles.statusContainer}>
        <Image source={require('../../assets/star_check.png')} style={styles.checkIcon} />
        <Text style={[styles.statusText, typography['sans-bold']]}>Quote received</Text>
      </View>
      <View style={styles.bookingCard}>
        <View style={styles.locationRow}>
          <Image source={require('../../assets/manage-addresses-icon.png')} style={styles.locationIcon} />
          <Text style={[styles.locationText, typography['sans-regular']]}>{booking.address}</Text>
        </View>
        <Text style={[styles.detailText, typography['sans-regular']]}>Booking Name: {booking.name}</Text>
        <Text style={[styles.detailText, typography['sans-regular']]}>Contact number: {booking.contact}</Text>
        <View style={styles.infoRow}>
          <Text style={[styles.detailText, typography['sans-regular']]}>Farm Area: {booking.farmArea}</Text>
          <Text style={[styles.detailText, typography['sans-regular']]}>Crop: {booking.crop}</Text>
        </View>
        <View style={styles.weatherRow}>
          <Text style={[styles.temperature, typography['sans-bold']]}>{booking.temperature}</Text>
          <Text style={[styles.humidity, typography['sans-regular']]}>{booking.humidity}% humidity</Text>
          <Text style={[styles.location, typography['sans-regular']]}>{booking.location}</Text>
        </View>
        <Text style={[styles.date, typography['sans-regular']]}>{booking.date}</Text>
      </View>
      <View style={styles.vendorCard}>
        <Text style={[styles.vendorTitle, typography['sans-bold']]}>Vendor assigned</Text>
        <Text style={[styles.vendorName, typography['sans-medium']]}>Digital sky Drone services</Text>
        <View style={styles.vendorInfoRow}>
          <Text style={[styles.vendorExperience, typography['sans-regular']]}>2 years of experience</Text>
          <View style={styles.ratingContainer}>
            <Text style={[styles.ratingText, typography['sans-bold']]}>4.5</Text>
            <Image source={require('../../assets/star-filled.png')} style={styles.starIcon} />
          </View>
        </View>
        <View style={styles.vendorContactRow}>
          <Text style={[styles.vendorContact, typography['sans-regular']]}>Contact number : 0987654321</Text>
          <TouchableOpacity style={styles.callButton}>
            <Image source={require('../../assets/phone_icon.png')} style={styles.phoneIcon} />
            <Text style={[styles.callButtonText, typography['sans-medium']]}>Call now</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.quoteCard}>
        <Text style={[styles.quoteTitle, typography['sans-bold']]}>You've Received Quotation from our vendor for your Request</Text>
        <Text style={[styles.estimatedTotal, typography['sans-medium']]}>Estimated Total : ₹12585</Text>
        <Text style={[styles.paymentSummary, typography['sans-medium']]}>Payment Summary</Text>
        <View style={styles.paymentRow}>
          <Text style={[styles.paymentLabel, typography['sans-regular']]}>Estimated Total</Text>
          <Text style={[styles.paymentAmount, typography['sans-regular']]}>₹11500</Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={[styles.paymentLabel, typography['sans-regular']]}>Taxes and Fee</Text>
          <Text style={[styles.paymentAmount, typography['sans-regular']]}>₹1085</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.paymentRow}>
          <Text style={[styles.totalLabel, typography['sans-bold']]}>Total</Text>
          <Text style={[styles.totalAmount, typography['sans-bold']]}>₹12585</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.rejectButton}>
            <Text style={[styles.rejectButtonText, typography['sans-bold']]}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton}>
            <Text style={[styles.acceptButtonText, typography['sans-bold']]}>Accept</Text>
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
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    color: '#000000',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  checkIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  statusText: {
    color: '#000000',
    fontSize: 16,
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  locationText: {
    fontSize: 14,
    color: '#000000',
    flex: 1,
  },
  detailText: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  weatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  temperature: {
    fontSize: 18,
    color: '#000000',
    marginRight: 10,
  },
  humidity: {
    fontSize: 12,
    color: '#808080',
    marginRight: 10,
  },
  location: {
    fontSize: 12,
    color: '#808080',
  },
  date: {
    fontSize: 12,
    color: '#808080',
    marginTop: 5,
  },
  vendorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  vendorTitle: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 10,
  },
  vendorName: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 5,
  },
  vendorInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  vendorExperience: {
    fontSize: 14,
    color: '#808080',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#0BBA12',
    marginRight: 5,
  },
  starIcon: {
    width: 16,
    height: 16,
  },
  vendorContactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vendorContact: {
    fontSize: 14,
    color: '#000000',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingVertical: 8,
    paddingHorizontal: 12,
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
  },
  quoteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quoteTitle: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 10,
  },
  estimatedTotal: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 10,
  },
  paymentSummary: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 10,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#000000',
  },
  paymentAmount: {
    fontSize: 14,
    color: '#000000',
  },
  separator: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    color: '#000000',
  },
  totalAmount: {
    fontSize: 16,
    color: '#000000',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  rejectButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  rejectButtonText: {
    color: '#000000',
    fontSize: 16,
  },
  acceptButton: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default QuoteReceivedScreen;