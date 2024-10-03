import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AcceptServiceScreen = ({ route }) => {
  const { booking } = route.params;
  const navigation = useNavigation();

  const handleGoToBookings = () => {
    navigation.navigate('MyBookings');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/booking-accepted.png')} style={styles.image} />
      <Text style={styles.title}>Booking Accepted</Text>
      <Text style={styles.message}>You have accepted the booking successfully</Text>
      <TouchableOpacity style={styles.button} onPress={handleGoToBookings}>
        <Text style={styles.buttonText}>Go to Bookings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000000',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666666',
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AcceptServiceScreen;