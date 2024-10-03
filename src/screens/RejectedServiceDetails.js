import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RejectedServiceDetails = ({ route }) => {
  const { booking, rejectionReason } = route.params;
  const navigation = useNavigation();

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
          <Text style={styles.statusText}>Service Rejected</Text>
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
        <View style={styles.paymentCard}>
          <Text style={styles.paymentTitle}>Payment Summary</Text>
          <Text style={styles.estimatedTotal}>Estimated Total: ₹2589</Text>
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
        <View style={styles.rejectionContainer}>
          <Text style={styles.rejectionTitle}>Service rejected!</Text>
          <Text style={styles.rejectionReason}>{rejectionReason}</Text>
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
    backgroundColor: '#FF6B6B',
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
    marginBottom: 20,
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
  rejectionContainer: {
    backgroundColor: '#FFF0F0',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  rejectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 10,
  },
  rejectionReason: {
    fontSize: 16,
    color: '#666666',
  },
});

export default RejectedServiceDetails;