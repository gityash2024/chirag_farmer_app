import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Switch } from 'react-native';
const CompletedBookingDetails = ({ route }) => {
  const { booking } = route.params;
  const navigation = useNavigation();
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);
  const [showServiceStarted, setShowServiceStarted] = useState(false);
  const [showServiceEnded, setShowServiceEnded] = useState(false);
  const [showKPI, setShowKPI] = useState(false);
  const [rating, setRating] = useState(0);
  const [kpis, setKpis] = useState({
    flightHours: '',
    droneWaterUsage: '',
    dronePesticideUsage: '',
    conventionalEnergy: '',
    uavEnergy: '',
    chargeCycles: '',
    emissionWaterReduction: '',
    emissionPesticideReduction: '',
    emissionPerHectare: '',
  });

  const handleInputChange = (key, value) => {
    setKpis({ ...kpis, [key]: value });
  };

  const handleCloseBooking = () => {
    navigation.navigate('MyBookings');
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Image
            source={i <= rating ? require('../../assets/star-filled.png') : require('../../assets/star-outline.png')}
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
          <Image source={require('../../assets/back-icon.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Completed Booking</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.bookingId}>#{booking.id}</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Completed</Text>
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
        
        <TouchableOpacity style={styles.accordionHeader} onPress={() => setShowPaymentSummary(!showPaymentSummary)}>
          <Text style={styles.accordionTitle}>Payment Summary</Text>
          <Image source={require('../../assets/arrow-down.png')} style={[styles.accordionIcon, showPaymentSummary && styles.accordionIconUp]} />
        </TouchableOpacity>
        {showPaymentSummary && (
          <View style={styles.accordionContent}>
            <Text style={styles.paymentTotal}>Estimated Total: ₹2589 • Paid</Text>
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
              <Text>Total</Text>
              <Text>₹2198</Text>
            </View>
          </View>
        )}
        
        <TouchableOpacity style={styles.accordionHeader} onPress={() => setShowServiceStarted(!showServiceStarted)}>
          <Text style={styles.accordionTitle}>Service started</Text>
          <Image source={require('../../assets/arrow-down.png')} style={[styles.accordionIcon, showServiceStarted && styles.accordionIconUp]} />
        </TouchableOpacity>
        {showServiceStarted && (
  <View style={styles.accordionContent}>
    <View style={styles.serviceDetail}>
      <Text style={styles.serviceLabel}>Enable location sharing*</Text>
      <View style={styles.switchContainer}>
        <Switch
          value={true}
          disabled={true}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>
    </View>
    <View style={styles.serviceDetail}>
      <Text style={styles.serviceLabel}>Set of battery available:</Text>
      <Text style={styles.serviceValue}>3</Text>
    </View>
    <View style={styles.serviceDetail}>
      <Text style={styles.serviceLabel}>Current Image of the field*</Text>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/field-image.png')} style={styles.fieldImage} />
        <Image source={require('../../assets/field-image.png')} style={styles.fieldImage} />
      </View>
    </View>
  </View>
)}
        
        <TouchableOpacity style={styles.accordionHeader} onPress={() => setShowServiceEnded(!showServiceEnded)}>
          <Text style={styles.accordionTitle}>Service ended</Text>
          <Image source={require('../../assets/arrow-down.png')} style={[styles.accordionIcon, showServiceEnded && styles.accordionIconUp]} />
        </TouchableOpacity>
        {showServiceEnded && (
  <View style={styles.accordionContent}>
    <View style={styles.serviceDetail}>
      <Text style={styles.serviceLabel}>Image of the field after service ended</Text>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/field-image.png')} style={styles.fieldImage} />
        <Image source={require('../../assets/field-image.png')} style={styles.fieldImage} />
      </View>
    </View>
  </View>
)}
        <TouchableOpacity style={styles.accordionHeader} onPress={() => setShowKPI(!showKPI)}>
          <Text style={styles.accordionTitle}>Add KPIs</Text>
          <Image source={require('../../assets/arrow-down.png')} style={[styles.accordionIcon, showKPI && styles.accordionIconUp]} />
        </TouchableOpacity>
        {showKPI && (
          <View style={styles.accordionContent}>
            <View style={styles.kpiInputContainer}>
              <Text style={styles.kpiLabel}>Flight Hours*</Text>
              <View style={styles.flightHoursContainer}>
                <TextInput style={styles.flightHoursInput} keyboardType="numeric" maxLength={2} />
                <Text style={styles.flightHoursSeparator}>:</Text>
                <TextInput style={styles.flightHoursInput} keyboardType="numeric" maxLength={2} />
              </View>
            </View>
            {Object.keys(kpis).map((key) => (
              key !== 'flightHours' && (
                <View key={key} style={styles.kpiInputContainer}>
                  <Text style={styles.kpiLabel}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}*</Text>
                  <TextInput
                    style={styles.kpiInput}
                    value={kpis[key]}
                    onChangeText={(value) => handleInputChange(key, value)}
                    placeholder="Add Description"
                  />
                  {['emissionWaterReduction', 'emissionPesticideReduction'].includes(key) && (
                    <Text style={styles.kpiSubLabel}>
                      {key === 'emissionWaterReduction' ? 'Water saved per hectare x Emission factor for water' : 'Pesticide saved per hectare x Emission factor for Pesticides'}
                    </Text>
                  )}
                  {key === 'emissionPerHectare' && (
                    <Text style={styles.kpiSubLabel}>
                      Emission saved from Pesticide Reduction + Emission saved from Pesticide Reduction
                    </Text>
                  )}
                </View>
              )
            ))}
          </View>
        )}
        
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingTitle}>Your Rating</Text>
          <View style={styles.starsContainer}>{renderStars()}</View>
        </View>
        
        <TouchableOpacity style={styles.closeBookingButton} onPress={handleCloseBooking}>
          <Text style={styles.closeBookingButtonText}>Close Booking</Text>
        </TouchableOpacity>
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
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F6F6FE',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  accordionIcon: {
    width: 20,
    height: 20,
  },
  accordionIconUp: {
    transform: [{ rotate: '180deg' }],
  },
  accordionContent: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
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
  dashedBorder: {
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginVertical: 10,
  },
  kpiInputContainer: {
    marginBottom: 15,
  },
  kpiLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  kpiInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 10,
  },
  kpiSubLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 5,
  },
  flightHoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flightHoursInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 10,
    width: 50,
    textAlign: 'center',
  },
  flightHoursSeparator: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  ratingContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
  closeBookingButton: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeBookingButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  serviceDetail: {
    marginBottom: 15,
  },
  serviceLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  serviceValue: {
    fontSize: 14,
  },
  switchContainer: {
    alignItems: 'flex-start',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  fieldImage: {
    width: '48%',
    height: 100,
    borderRadius: 5,
  },
});

export default CompletedBookingDetails;