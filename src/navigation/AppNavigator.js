import React from "react";
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthWrapper from "../components/AuthWrapper";
import SplashScreen from "../screens/SplashScreen";
import AuthScreens from "../screens/AuthScreens";
import BottomTabNavigator from "./BottomTabNavigator";
import AddressesScreen from "../screens/AddressesScreen";
import EditAccountScreen from "../screens/EditAccountScreen";
import DeleteAccountScreen from "../screens/DeleteAccountScreen";
import CustomerSupportScreen from "../screens/CustomerSupportScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import RateAppScreen from "../screens/RateApp";
import SettingsScreen from "../screens/SettingsScreen";
import TermsConditionsScreen from "../screens/TermsConditionsScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import MyBookingsScreen from "../screens/MyBookingsScreen";
import RequestedBookingDetails from "../screens/RequestedBookingDetails";
import AcceptServiceScreen from "../screens/AcceptServiceScreen";
import RecommendationScreen from "../screens/RecommendationScreen";
import ServiceDetailsScreen from "../screens/ServiceDetailsScreen";
import ConfirmedBookingDetails from "../screens/ConfirmedBookingDetails";
import CompletedBookingDetails from "../screens/CompletedBookingDetails";
import RejectedServiceDetails from "../screens/RejectedServiceDetails";
import ServiceAddDetails from "../screens/ServiceAddDetails";

const Stack = createStackNavigator();

const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="Main"
      component={BottomTabNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Addresses" component={AddressesScreen} />
    <Stack.Screen name="EditAccount" component={EditAccountScreen} />
    <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
    <Stack.Screen name="CustomerSupport" component={CustomerSupportScreen} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="TermsConditions" component={TermsConditionsScreen} />
    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
    <Stack.Screen name="RateApp" component={RateAppScreen} />
    <Stack.Screen name="MyBookings" component={MyBookingsScreen} />
    <Stack.Screen
      name="RequestedBookingDetails"
      component={RequestedBookingDetails}
    />
    <Stack.Screen
      name="ConfirmedBookingDetails"
      component={ConfirmedBookingDetails}
    />
    <Stack.Screen
      name="CompletedBookingDetails"
      component={CompletedBookingDetails}
    />
    <Stack.Screen name="AcceptService" component={AcceptServiceScreen} />
    <Stack.Screen name="Recommendation" component={RecommendationScreen} />
    <Stack.Screen name="ServiceDetails" component={ServiceDetailsScreen} />
    <Stack.Screen
      name="RejectedServiceDetails"
      component={RejectedServiceDetails}
    />
    <Stack.Screen name="ServiceAddDetails" component={ServiceAddDetails} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthScreens} />
        <Stack.Screen name="AuthenticatedScreens">
          {() => (
            <AuthWrapper>
              <MainStack />
            </AuthWrapper>
          )}
        </Stack.Screen>
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
