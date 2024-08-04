import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';

const DateTimeSelectionScreen = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = ['09:00 AM', '12:00 PM', '03:00 PM', '06:00 PM'];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      navigation.navigate('SelectVendor');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book a service</Text>
      
      <CalendarPicker
        onDateChange={handleDateSelect}
        selectedDayColor="#000000"
        selectedDayTextColor="#FFFFFF"
      />

      <Text style={styles.subtitle}>Select time</Text>
      <View style={styles.timeContainer}>
        {timeSlots.map((time, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeButton,
              selectedTime === time && styles.selectedTimeButton,
            ]}
            onPress={() => handleTimeSelect(time)}
          >
            <Text style={[
              styles.timeButtonText,
              selectedTime === time && styles.selectedTimeButtonText,
            ]}>
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.nextButton, (!selectedDate || !selectedTime) && styles.disabledButton]}
        onPress={handleNext}
        disabled={!selectedDate || !selectedTime}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
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
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeButton: {
    width: '48%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#D5D5D5',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedTimeButton: {
    backgroundColor: '#000000',
  },
  timeButtonText: {
    fontSize: 16,
  },
  selectedTimeButtonText: {
    color: '#FFFFFF',
  },
  nextButton: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#D5D5D5',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DateTimeSelectionScreen;