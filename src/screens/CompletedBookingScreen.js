import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { typography } from '../styles/Typography';

const CompletedBookingScreen = ({ route }) => {
  const navigation = useNavigation();
  const { booking } = route.params;
  const [rating, setRating] = useState(0);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Image
            source={i <= rating ? require('../../assets/star-filled.png') : require('../../assets/rate-app-icon.png')}
            style={styles.starIcon}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

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
        <Text style={[styles.statusText, typography['sans-bold']]}>Booking Completed</Text>
      </View>
      <View style={styles.ratingContainer}>
        <Text style={[styles.ratingTitle, typography['sans-bold']]}>Your Rating</Text>
        <View style={styles.starsContainer}>{renderStars()}</View>
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
      <View style={styles.impactContainer}>
        <Text style={[styles.impactTitle, typography['sans-bold']]}>Environmental Impact</Text>
        <View style={styles.impactItem}>
          <Image source={require('../../assets/water-saved-icon.png')} style={styles.impactIcon} />
          <View>
            <Text style={[styles.impactValue, typography['sans-bold']]}>400 Ltrs</Text>
            <Text style={[styles.impactLabel, typography['sans-regular']]}>Water saved</Text>
          </View>
          <Image source={require('../../assets/water-saved-graph.png')} style={styles.impactGraph} />
        </View>
        <View style={styles.impactItem}>
          <Image source={require('../../assets/pesticide-saved-icon.png')} style={styles.impactIcon} />
          <View>
            <Text style={[styles.impactValue, typography['sans-bold']]}>40%</Text>
            <Text style={[styles.impactLabel, typography['sans-regular']]}>Pesticide saved</Text>
          </View>
          <Image source={require('../../assets/pesticide-saved-graph.png')} style={styles.impactGraph} />
        </View>
        <View style={styles.impactItem}>
          <Image source={require('../../assets/carbon-footprint-icon.png')} style={styles.impactIcon} />
          <View>
            <Text style={[styles.impactValue, typography['sans-bold']]}>40%</Text>
            <Text style={[styles.impactLabel, typography['sans-regular']]}>Carbon footprint</Text>
          </View>
          <Image source={require('../../assets/carbon-footprint-graph.png')} style={styles.impactGraph} />
        </View>
      </View>
      <View style={styles.vendorCard}>
        <Text style={[styles.vendorTitle, typography['sans-bold']]}>Vendor details</Text>
        <Text style={[styles.vendorName, typography['sans-medium']]}>Digital sky Drone services</Text>
        <Text style={[styles.vendorExperience, typography['sans-regular']]}>2 years of experience</Text>
        <View style={styles.vendorRating}>
          <Text style={[styles.vendorRatingText, typography['sans-bold']]}>4.5</Text>
          <Image source={require('../../assets/star-filled.png')} style={styles.vendorRatingIcon} />
        </View>
      </View>
      <View style={styles.paymentCard}>
        <Text style={[styles.paymentTitle, typography['sans-bold']]}>Payment Summary</Text>
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
        <Text style={[styles.paidText, typography['sans-bold']]}>Paid</Text>
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
  ratingContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
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
  impactContainer: {
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
  impactTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
  impactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  impactIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  impactValue: {
    fontSize: 16,
  },
  impactLabel: {
    fontSize: 14,
    color: '#808080',
  },
  impactGraph: {
    width: 100,
    height: 50,
    marginLeft: 'auto',
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
    marginBottom: 10,
  },
  vendorName: {
    fontSize: 16,
    marginBottom: 5,
  },
  vendorExperience: {
    fontSize: 14,
    color: '#808080',
    marginBottom: 10,
  },
  vendorRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vendorRatingText: {
    fontSize: 16,
    marginRight: 5,
  },
  vendorRatingIcon: {
    width: 20,
    height: 20,
  },
  paymentCard: {
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
  paymentTitle: {
    fontSize: 18,
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
  paidText: {
    color: '#4CAF50',
    fontSize: 16,
    marginTop: 10,
  },
});

export default CompletedBookingScreen;