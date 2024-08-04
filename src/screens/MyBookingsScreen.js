import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { typography } from '../styles/Typography';

const MyBookingsScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('All');

  const bookings = [
    { id: '1', status: 'Confirmed', address: 'Lorem ipsum dolor sit amet, street , Area, City, 560066', name: 'Sachin Doe', contact: '0987654321', farmArea: '21 Acres', crop: 'Crop name', temperature: '24°', humidity: '2%', location: 'Pratapgarh, Uttarpradesh', date: '24/08/2024 2:00 Pm' },
    { id: '2', status: 'Quote received', address: 'Lorem ipsum dolor sit amet, street , Area, City, 560066', name: 'Sachin Doe', contact: '0987654321', farmArea: '21 Acres', crop: 'Crop name', temperature: '24°', humidity: '2%', location: 'Pratapgarh, Uttarpradesh', date: '24/08/2024 2:00 Pm' },
    { id: '3', status: 'Completed', address: 'Lorem ipsum dolor sit amet, street , Area, City, 560066', name: 'Sachin Doe', contact: '0987654321', farmArea: '21 Acres', crop: 'Crop name', temperature: '24°', humidity: '2%', location: 'Pratapgarh, Uttarpradesh', date: '24/08/2024 2:00 Pm' },
    { id: '4', status: 'Requested', address: 'Lorem ipsum dolor sit amet, street , Area, City, 560066', name: 'Sachin Doe', contact: '0987654321', farmArea: '21 Acres', crop: 'Crop name', temperature: '24°', humidity: '2%', location: 'Pratapgarh, Uttarpradesh', date: '24/08/2024 2:00 Pm' },
    { id: '5', status: 'Rejected', address: 'Lorem ipsum dolor sit amet, street , Area, City, 560066', name: 'Sachin Doe', contact: '0987654321', farmArea: '21 Acres', crop: 'Crop name', temperature: '24°', humidity: '2%', location: 'Pratapgarh, Uttarpradesh', date: '24/08/2024 2:00 Pm' },
  ];

  const filteredBookings = activeTab === 'All' ? bookings : bookings.filter(booking => {
    if (activeTab === 'Ongoing') return ['Confirmed', 'Quote received', 'Requested'].includes(booking.status);
    if (activeTab === 'Closed') return ['Completed', 'Rejected'].includes(booking.status);
    return false;
  });

  const renderBookingItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bookingItem}
      onPress={() => {
        switch (item.status) {
          case 'Requested':
            navigation.navigate('RequestedBooking', { booking: item });
            break;
          case 'Quote received':
            navigation.navigate('QuoteReceived', { booking: item });
            break;
          case 'Confirmed':
            navigation.navigate('ConfirmedBooking', { booking: item });
            break;
          case 'Completed':
            navigation.navigate('CompletedBooking', { booking: item });
            break;
          case 'Rejected':
            // Handle rejected booking navigation if needed
            break;
        }
      }}
    >
      <View style={styles.bookingHeader}>
        <View style={styles.addressContainer}>
          <Image source={require('../../assets/location-icon.png')} style={styles.locationIcon} />
          <Text style={[styles.bookingAddress, typography['sans-regular']]}>{item.address}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusBgColor(item.status) }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }, typography['sans-medium']]}>{item.status}</Text>
        </View>
      </View>
      <Text style={[styles.bookingInfo, typography['sans-regular']]}>Booking Name: {item.name}</Text>
      <Text style={[styles.bookingInfo, typography['sans-regular']]}>Contact number: {item.contact}</Text>
      <View style={styles.infoRow}>
        <Text style={[styles.bookingInfo, typography['sans-regular']]}>Farm Area: {item.farmArea}</Text>
        <Text style={[styles.bookingInfo, typography['sans-regular']]}>Crop: {item.crop}</Text>
      </View>
      <View style={styles.bookingFooter}>
        <View style={styles.weatherContainer}>
          <Text style={[styles.temperature, typography['sans-bold']]}>{item.temperature}</Text>
          <Text style={[styles.humidity, typography['sans-regular']]}>{item.humidity} humidity</Text>
          <Text style={[styles.location, typography['sans-regular']]}>{item.location}</Text>
        </View>
        <Text style={[styles.date, typography['sans-regular']]}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
      case 'Quote received':
      case 'Requested':
        return '#000000';
      case 'Completed':
        return '#51B123';
      case 'Rejected':
        return '#E40B0B';
      default:
        return '#000000';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'Confirmed':
      case 'Quote received':
      case 'Requested':
        return '#B1B1B1';
      case 'Completed':
        return '#E8F5E9';
      case 'Rejected':
        return '#FFEBEE';
      default:
        return '#B1B1B1';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, typography['sans-bold']]}>My Bookings</Text>
      <View style={styles.tabContainer}>
        {['All', 'Ongoing', 'Closed'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText, typography['sans-medium']]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {filteredBookings.length > 0 ? (
        <FlatList
          data={filteredBookings}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.bookingList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Image source={require('../../assets/no-bookings.png')} style={styles.emptyImage} />
          <Text style={[styles.emptyText, typography['sans-bold']]}>No Bookings Yet</Text>
          <Text style={[styles.emptySubtext, typography['sans-regular']]}>You don't have any bookings right now. Book Your first service</Text>
          <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('BookService')}>
            <Text style={[styles.bookButtonText, typography['sans-bold']]}>Book your first service</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#000000',
    borderRadius: 5,
  },
  tabText: {
    fontSize: 16,
    color: '#808080',
  },
  activeTabText: {
    color: '#E8E8E8',
    fontWeight: 'bold',
  },
  bookingList: {
    paddingBottom: 20,
  },
  bookingItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  bookingAddress: {
    fontSize: 14,
    color: '#000000',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
  },
  bookingInfo: {
    fontSize: 14,
    marginBottom: 5,
    color: '#000000',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  weatherContainer: {
    flexDirection: 'column',
  },
  temperature: {
    fontSize: 18,
    color: '#000000',
  },
  humidity: {
    fontSize: 12,
    color: '#808080',
  },
  location: {
    fontSize: 12,
    color: '#808080',
  },
  date: {
    fontSize: 12,
    color: '#808080',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000000',
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#808080',
  },
  bookButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default MyBookingsScreen;