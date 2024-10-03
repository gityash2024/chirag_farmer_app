import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ServiceAddDetails = ({ route }) => {
  const { booking } = route.params;
  const navigation = useNavigation();
  const [serviceStarted, setServiceStarted] = useState(false);
  const [serviceEnded, setServiceEnded] = useState(false);
  const [locationSharing, setLocationSharing] = useState(false);
  const [batteryCount, setBatteryCount] = useState('');
  const [currentImages, setCurrentImages] = useState([]);
  const [endImages, setEndImages] = useState([]);

  const handleStartService = () => {
    setServiceStarted(true);
  };

  const handleEndService = () => {
    setServiceEnded(true);
  };

  const handleProceed = () => {
    navigation.navigate('CompletedBookingDetails', { booking });
  };

  const renderServiceStarted = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Service started</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enable location sharing*</Text>
        <Switch
          value={locationSharing}
          onValueChange={setLocationSharing}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={locationSharing ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Set of battery available*</Text>
        <TextInput
          style={styles.input}
          value={batteryCount}
          onChangeText={setBatteryCount}
          keyboardType="numeric"
          placeholder="Enter number of batteries"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Current Image of the field*</Text>
        <TouchableOpacity style={styles.imageUploadButton}>
          <Text style={styles.imageUploadText}>+ Add image of the field</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderServiceEnded = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Service ended</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Image of the field after the service*</Text>
        <TouchableOpacity style={styles.imageUploadButton}>
          <Text style={styles.imageUploadText}>+ Add image of the field</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/back-icon.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Add details</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.bookingId}>#{booking.id}</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{serviceStarted ? 'Service in progress' : 'Service started'}</Text>
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
        {!serviceStarted && (
          <TouchableOpacity style={styles.startServiceButton} onPress={handleStartService}>
            <Text style={styles.startServiceButtonText}>Start the service</Text>
          </TouchableOpacity>
        )}
        {serviceStarted && renderServiceStarted()}
        {serviceStarted && !serviceEnded && (
          <TouchableOpacity style={styles.endServiceButton} onPress={handleEndService}>
            <Text style={styles.endServiceButtonText}>End Service</Text>
          </TouchableOpacity>
        )}
        {serviceEnded && renderServiceEnded()}
        {serviceEnded && (
          <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
            <Text style={styles.proceedButtonText}>Proceed</Text>
          </TouchableOpacity>
        )}
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
  startServiceButton: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  startServiceButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 10,
  },
  imageUploadButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  imageUploadText: {
    color: '#666666',
  },
  endServiceButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  endServiceButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  proceedButton: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  proceedButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ServiceAddDetails;