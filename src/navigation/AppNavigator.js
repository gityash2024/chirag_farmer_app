import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import SplashScreen from '../screens/SplashScreen';
import AuthScreens from '../screens/AuthScreens';
import BookServiceScreen from '../screens/BookServiceScreen';
import SelectVendorScreen from '../screens/SelectVendorScreen';
import BookingDetailsScreen from '../screens/BookingDetailsScreen';
import AddressesScreen from '../screens/AddressesScreen';
import EditAccountScreen from '../screens/EditAccountScreen';
import DeleteAccountScreen from '../screens/DeleteAccountScreen';
import CustomerSupportScreen from '../screens/CustomerSupportScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

import Header from '../components/Header';
import RateAppScreen from '../screens/RateApp';
import WalletScreen from '../screens/WalletScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TermsConditionsScreen from '../screens/TermsConditionsScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import AdditionalDetailsScreen from '../screens/AdditionalDetailsScreen';
import SelectLocationScreen from '../screens/SelectLocationScreen';
import DateTimeSelectionScreen from '../screens/DateTimeSelectionScreen';
import RequestedBookingScreen from '../screens/RequestedBookingScreen';
import QuoteReceivedScreen from '../screens/QuoteReceivedScreen';
import ConfirmedBookingScreen from '../screens/ConfirmedBookingScreen';
import CompletedBookingScreen from '../screens/CompletedBookingScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthScreens} />
        <Stack.Screen 
  name="Main" 
  component={BottomTabNavigator}
  options={{ headerShown: false }}
/>

        <Stack.Screen name="BookService" component={BookServiceScreen} />
        <Stack.Screen name="SelectVendor" component={SelectVendorScreen} />
        <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
        <Stack.Screen name="Addresses" component={AddressesScreen} />
        <Stack.Screen name="EditAccount" component={EditAccountScreen} />
        <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
        <Stack.Screen name="CustomerSupport" component={CustomerSupportScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="TermsConditions" component={TermsConditionsScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="RateApp" component={RateAppScreen} />
        <Stack.Screen name="AdditionalDetails" component={AdditionalDetailsScreen} />
        <Stack.Screen name="SelectLocation" component={SelectLocationScreen} />
        <Stack.Screen name="DateTimeSelection" component={DateTimeSelectionScreen} />
        <Stack.Screen name="RequestedBooking" component={RequestedBookingScreen} />
        <Stack.Screen name="QuoteReceived" component={QuoteReceivedScreen} />
        <Stack.Screen name="ConfirmedBooking" component={ConfirmedBookingScreen} />
        <Stack.Screen name="CompletedBooking" component={CompletedBookingScreen} />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppNavigator;