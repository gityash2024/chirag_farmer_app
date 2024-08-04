import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BookServiceScreen = () => {
  const navigation = useNavigation();
  const [farmLocation, setFarmLocation] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [cropType, setCropType] = useState('');
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleNext = () => {
    navigation.navigate('AdditionalDetails');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Book a service</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Farm Location</Text>
        <TextInput
          style={styles.input}
          value={farmLocation}
          onChangeText={setFarmLocation}
          placeholder="Pratapgarh, Uttar pradesh"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Farm Size in Acres</Text>
        <TextInput
          style={styles.input}
          value={farmSize}
          onChangeText={setFarmSize}
          placeholder="Enter Your Farm area in acres"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Crop Type</Text>
        <TextInput
          style={styles.input}
          value={cropType}
          onChangeText={setCropType}
          placeholder="Enter"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter Full Name"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contact Number</Text>
        <TextInput
          style={styles.input}
          value={contactNumber}
          onChangeText={setContactNumber}
          placeholder="+91 Enter Contact Number"
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
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
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D5D5D5',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookServiceScreen;