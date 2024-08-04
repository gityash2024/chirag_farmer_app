import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { typography } from '../styles/Typography';

const SettingsScreen = () => {
  const navigation = useNavigation();

  const settingsOptions = [
    { title: 'Notifications', screen: 'Notifications' },
   
    { title: 'Delete Account', screen: 'DeleteAccount' },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={[styles.backButtonText, typography['sans-medium']]}>← Back</Text>
      </TouchableOpacity>
      <Text style={[styles.title, typography['sans-bold']]}>Settings</Text>
      <ScrollView style={styles.optionsList}>
        {settingsOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionItem}
            onPress={() => navigation.navigate(option.screen)}
          >
            <Text style={[styles.optionTitle, typography['sans-medium']]}>{option.title}</Text>
            <Text style={styles.optionArrow}>→</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#000000',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000000',
  },
  optionsList: {
    flex: 1,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  optionTitle: {
    fontSize: 16,
    color: '#000000',
  },
  optionArrow: {
    fontSize: 18,
    color: '#666666',
  },
});

export default SettingsScreen;