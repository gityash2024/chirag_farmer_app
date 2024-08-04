import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Header from '../components/Header';

const AddressesScreen = ({ navigation }) => {
  const addresses = [
    {
      id: 1,
      address: 'Lorem ipsum dolor sit amet, Lorem ipsum sit Bengaluru, 560034, India',
    },
    {
      id: 2,
      address: 'Lorem ipsum dolor sit amet, Lorem ipsum sit Bengaluru, 560034, India',
    },
  ];

  return (
    <View style={styles.container}>
      <Header title="My Addresses" />
      <ScrollView style={styles.content}>
        {addresses.map((address) => (
          <View key={address.id} style={styles.addressCard}>
            <Text style={styles.addressText}>{address.address}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>EDIT</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>DELETE</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add New Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  addressCard: {
    backgroundColor: '#F6F6FE',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  addressText: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 15,
  },
  actionButtonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#000000',
    padding: 15,
    margin: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddressesScreen;