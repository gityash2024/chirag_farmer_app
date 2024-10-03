import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MyBookingsScreen from '../screens/MyBookingsScreen';
import AccountScreen from '../screens/AccountScreen';
import CustomTabBar from '../components/CustomTabBar';
import Header from '../components/Header';
import Recommendations from '../screens/Recommendations';


const Tab = createBottomTabNavigator();

const HomeScreenWithHeader = ({ navigation }) => (
  <>
    <Header navigation={navigation} />
    <HomeScreen />
  </>
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreenWithHeader}
        options={{
          tabBarIcon: require('../../assets/home-icon.png')
        }}
      />
      <Tab.Screen 
        name="Bookings" 
        component={MyBookingsScreen}
        options={{
          tabBarIcon: require('../../assets/bookings-icon.png')
        }}
      />
       <Tab.Screen 
        name="Spray Assist" 
        component={Recommendations}
        options={{
          tabBarIcon: require('../../assets/recommendation.png')
        }}
      />
      <Tab.Screen 
        name="My Account" 
        component={AccountScreen}
        options={{
          tabBarIcon: require('../../assets/account-icon.png')
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;