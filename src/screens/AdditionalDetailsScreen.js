import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AdditionalDetailsScreen = () => {
  const navigation = useNavigation();
  const [cropName, setCropName] = useState('');
  const [cropOutput, setCropOutput] = useState('');
  const [additionalService, setAdditionalService] = useState(null);

  const handleDone = () => {
    navigation.navigate('SelectLocation');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Details of previous yield</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Crop name</Text>
        <TextInput
          style={styles.input}
          value={cropName}
          onChangeText={setCropName}
          placeholder="Enter crop name"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Crop Output per acre of land</Text>
        <TextInput
          style={styles.input}
          value={cropOutput}
          onChangeText={setCropOutput}
          placeholder="Enter crop output"
          keyboardType="numeric"
        />
      </View>

      <Text style={styles.label}>Have you used fertilizer or Additional Service</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[styles.radioButton, additionalService === 'yes' && styles.radioButtonSelected]}
          onPress={() => setAdditionalService('yes')}
        >
          <Text style={styles.radioButtonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioButton, additionalService === 'no' && styles.radioButtonSelected]}
          onPress={() => setAdditionalService('no')}
        >
          <Text style={styles.radioButtonText}>No</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneButtonText}>Done</Text>
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
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: '#D5D5D5',
    borderRadius: 5,
    padding: 10,
    width: '45%',
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: '#000000',
  },
  radioButtonText: {
    fontSize: 16,
  },
  doneButton: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdditionalDetailsScreen;