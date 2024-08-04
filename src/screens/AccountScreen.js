import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AccountScreen = () => {
  const navigation = useNavigation();

  const accountOptions = [
    { icon: require('../../assets/wallet-icon.png'), title: 'Wallet', screen: 'Wallet' },
    { icon: require('../../assets/manage-addresses-icon.png'), title: 'Manage Addresses', screen: 'Addresses' },
    { icon: require('../../assets/my-profile-icon.png'), title: 'My profile', screen: 'EditAccount' },
    { icon: require('../../assets/settings-icon.png'), title: 'Settings', screen: 'Settings' },
    { icon: require('../../assets/terms-conditions-icon.png'), title: 'Terms and conditions', screen: 'TermsConditions' },
    { icon: require('../../assets/privacy-policy-icon.png'), title: 'Privacy Policy', screen: 'PrivacyPolicy' },
    { icon: require('../../assets/rate-app-icon.png'), title: 'Rate app', screen: 'RateApp' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <Text style={styles.name}>Khushi Doe</Text>
          <Text style={styles.phone}>+91 1234567890</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditAccount')}>
            <Image source={require('../../assets/edit-icon.png')} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('BookService')}>
            <Image source={require('../../assets/booking-icon.png')} style={styles.actionIcon} />
            <Text style={styles.actionText}>Bookings and plans</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('CustomerSupport')}>
            <Image source={require('../../assets/help-support-icon.png')} style={styles.actionIcon} />
            <Text style={styles.actionText}>Help & Support</Text>
          </TouchableOpacity>
        </View>
        {accountOptions.map((option, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.optionButton}
            onPress={() => navigation.navigate(option.screen)}
          >
            <Image source={option.icon} style={styles.optionIcon} />
            <Text style={styles.optionText}>{option.title}</Text>
            <Image source={require('../../assets/arrow-right-icon.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
        ))}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => {/* Handle logout */}}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.versionText}>Version 2.00</Text>
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  phone: {
    fontSize: 14,
    color: '#6F6F6F',
    marginLeft: 10,
  },
  editButton: {
    marginLeft: 'auto',
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6FE',
    padding: 10,
    borderRadius: 10,
    width: '48%',
  },
  actionIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  actionText: {
    fontSize: 14,
    color: '#000000',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  optionIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    color: '#000000',
    flex: 1,
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#000000',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  versionText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#6F6F6F',
  },
});

export default AccountScreen;