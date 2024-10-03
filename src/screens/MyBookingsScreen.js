import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyBookingsScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Requested');

  const bookings = [
    { id: 'AB123456', status: 'Requested', address: 'Lorem ipsum dolor sit amet, street , Area, City, 560066', name: 'Sachin Doe', contact: '****', farmArea: '21 Acres', crop: 'Crop name', temperature: '24°', location: 'Pratapgarh, Uttarpradesh', date: '24/08/2024 2:00 PM' },
    { id: 'AB123451', status: 'Requested', address: 'Lorem ipsum dolor sit amet, street , Area, City, 560066', name: 'Sachin Doe', contact: '****', farmArea: '21 Acres', crop: 'Crop name', temperature: '24°', location: 'Pratapgarh, Uttarpradesh', date: '24/08/2024 2:00 PM' },
    { id: 'AB123457', status: 'Confirmed', address: 'Lorem ipsum dolor sit amet, street , Area, City, 560066', name: 'John Smith', contact: '1234567890', farmArea: '15 Acres', crop: 'Wheat', temperature: '22°', location: 'Lucknow, Uttarpradesh', date: '25/08/2024 3:00 PM' },
    { id: 'AB123453', status: 'Confirmed', address: 'Lorem ipsum dolor sit amet, street , Area, City, 560066', name: 'John Smith', contact: '1234567890', farmArea: '15 Acres', crop: 'Wheat', temperature: '22°', location: 'Lucknow, Uttarpradesh', date: '25/08/2024 3:00 PM' },
    { id: 'AB123458', status: 'Closed', address: 'Lorem ipsum dolor sit amet, street , Area, City, 560066', name: 'Emma Brown', contact: '9876543210', farmArea: '18 Acres', crop: 'Rice', temperature: '26°', location: 'Varanasi, Uttarpradesh', date: '23/08/2024 1:00 PM' },
    { id: 'AB123459', status: 'Closed', address: 'Lorem ipsum dolor sit amet, street , Area, City, 560066', name: 'Emma Brown', contact: '9876543210', farmArea: '18 Acres', crop: 'Rice', temperature: '26°', location: 'Varanasi, Uttarpradesh', date: '23/08/2024 1:00 PM' },
  ];

  const filteredBookings = bookings.filter(booking => booking.status === activeTab);

  const renderBookingItem = ({ item }) => (
    
    <TouchableOpacity
      style={styles.bookingCard}
      onPress={() => {
        switch (item.status) {
          case 'Requested':
            navigation.navigate('RequestedBookingDetails', { booking: item });
            break;
          case 'Confirmed':
            navigation.navigate('ConfirmedBookingDetails', { booking: item });
            break;
          case 'Closed':
            navigation.navigate('CompletedBookingDetails', { booking: item });
            break;
          default:
            // Handle other statuses if needed
            break;
        }
      }}    >
      <Text style={styles.bookingId}>#{item.id}</Text>
      <View style={styles.locationContainer}>
        <Image source={require('../../assets/location-icon.png')} style={styles.locationIcon} />
        <Text style={styles.address}>{item.address}</Text>
      </View>
      <Text style={styles.bookingDetail}>Booking Name : {item.name}</Text>
      <Text style={styles.bookingDetail}>Contact number : {item.contact}</Text>
      <Text style={styles.bookingDetail}>Farm Area : {item.farmArea}</Text>
      <Text style={styles.bookingDetail}>Crop : {item.crop}</Text>
      <View style={styles.weatherContainer}>
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperature}>{item.temperature}</Text>
          <Text style={styles.location}>{item.location}</Text>
          <Text style={styles.weather}>Mostly sunny</Text>
        </View>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      {activeTab === 'Requested' && (
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.rejectButton}>
            <Text style={styles.rejectButtonText}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton}>
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/chirag-white-screen-logo.png')} style={styles.logo} resizeMode="contain" />
      <View style={styles.header}>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/back-icon.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Bookings</Text>
      </View>
      <View style={styles.tabContainer}>
        {['Requested', 'Confirmed', 'Closed'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredBookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.bookingList}
      />
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    backgroundColor: '#000000',
    borderRadius: 20,
  },
  tabText: {
    fontSize: 16,
    color: '#000000',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  bookingList: {
    padding: 15,
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookingId: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  address: {
    fontSize: 14,
    color: '#666666',
  },
  bookingDetail: {
    fontSize: 14,
    marginBottom: 5,
  },
  weatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  temperatureContainer: {
    flexDirection: 'column',
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 12,
    color: '#666666',
  },
  weather: {
    fontSize: 12,
    color: '#666666',
  },
  date: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
    padding: 10,
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
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  logo: {
    width: 200,
    height: 50,
    marginTop: 10,
  },
});

export default MyBookingsScreen;