import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';

const CustomerSupportScreen = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [subject, setSubject] = useState('');

  return (
    <View style={styles.container}>
      <Header title="Customer support" />
      <ScrollView style={styles.content}>
        <Image
          source={require('../../assets/customer-support-image.png')}
          style={styles.supportImage}
        />
        <Text style={styles.supportText}>
          Customer support?
        </Text>
        <Text style={styles.descriptionText}>
          Lorem ipsum is simply dummy text of the printing and typesetting industry.
        </Text>
        <TouchableOpacity style={styles.chatButton}>
          <Text style={styles.chatButtonText}>Chat with us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.requestButton}>
          <Text style={styles.requestButtonText}>Request a callback</Text>
        </TouchableOpacity>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Name*"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile Number*"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
          />
          <TextInput
            style={[styles.input, styles.subjectInput]}
            placeholder="Subject*"
            value={subject}
            onChangeText={setSubject}
            multiline
          />
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
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
    supportImage: {
      width: '100%',
      height: 200,
      resizeMode: 'contain',
      marginBottom: 20,
    },
    supportText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000000',
      marginBottom: 10,
    },
    descriptionText: {
      fontSize: 14,
      color: '#6F6F6F',
      marginBottom: 20,
    },
    chatButton: {
      backgroundColor: '#000000',
      paddingVertical: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginBottom: 10,
    },
    chatButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    requestButton: {
      backgroundColor: '#FFFFFF',
      paddingVertical: 15,
      borderRadius: 5,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#000000',
      marginBottom: 20,
    },
    requestButtonText: {
      color: '#000000',
      fontSize: 16,
      fontWeight: 'bold',
    },
    form: {
      marginTop: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#D5D5D5',
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
    },
    subjectInput: {
      height: 100,
      textAlignVertical: 'top',
    },
    submitButton: {
      backgroundColor: '#000000',
      paddingVertical: 15,
      borderRadius: 5,
      alignItems: 'center',
    },
    submitButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
  export default CustomerSupportScreen;