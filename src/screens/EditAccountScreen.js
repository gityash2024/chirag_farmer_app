import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';

const EditAccountScreen = () => {
  const [name, setName] = useState('Khushi Doe');
  const [phone, setPhone] = useState('+91 0987654321');
  const [email, setEmail] = useState('khushidoe@gmail.com');

  return (
    <View style={styles.container}>
      <Header title="Edit Account" />
      <ScrollView style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>NAME</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>EDIT</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>PHONE NUMBER</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>EDIT</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>EDIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#6F6F6F',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D5D5D5',
    borderRadius: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    color: '#000000',
  },
  editButton: {
    padding: 10,
  },
  editButtonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default EditAccountScreen;